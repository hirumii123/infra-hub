// src/app/api/reports/fetch/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Imap from "imap";
import { simpleParser } from "mailparser";
import fs from "fs";
import path from "path";
import { sendMessage } from "@/lib/whatsapp";

const VENDOR_EMAIL = "adiyatmahilmy2812@gmail.com";
const ALLOWED_EXT = [".pdf", ".xlsx", ".xls", ".png", ".jpg", ".jpeg", ".doc", ".docx"];

function detectBulan(text: string): string {
  const bulanMap: Record<string, string> = {
    januari: "Januari", jan: "Januari",
    februari: "Februari", feb: "Februari",
    maret: "Maret", mar: "Maret",
    april: "April", apr: "April",
    mei: "Mei", may: "Mei",
    juni: "Juni", jun: "Juni",
    juli: "Juli", jul: "Juli",
    agustus: "Agustus", agu: "Agustus", aug: "Agustus",
    september: "September", sep: "September",
    oktober: "Oktober", okt: "Oktober", oct: "Oktober",
    november: "November", nov: "November",
    desember: "Desember", des: "Desember", dec: "Desember",
  };
  const lower = text.toLowerCase();
  for (const [key, val] of Object.entries(bulanMap)) {
    if (lower.includes(key)) return val;
  }
  return "Unknown";
}

function detectTahun(text: string): string {
  const match = text.match(/20\d{2}/);
  return match ? match[0] : new Date().getFullYear().toString();
}

async function fetchFromImap(): Promise<any[]> {
  const uploadDir = path.join(process.cwd(), "public", "reports");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const imap = new Imap({
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASS!,
    host: process.env.IMAP_HOST || process.env.SMTP_HOST!,
    port: Number(process.env.IMAP_PORT || 993),
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  });

  const newReports: any[] = [];

  await new Promise<void>((resolve, reject) => {
    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err) => {
        if (err) return reject(err);

        imap.search([["FROM", VENDOR_EMAIL]], async (err, uids) => {
          if (err) return reject(err);
          console.log("[IMAP] UIDs ditemukan:", uids);
          if (!uids || uids.length === 0) { imap.end(); return resolve(); }

          const recent = uids.slice(-20);
          const fetch = imap.fetch(recent, { bodies: "" });
          const parsePromises: Promise<void>[] = [];

          fetch.on("message", (msg) => {
            const p = new Promise<void>((res) => {
              let rawEmail = "";
              msg.on("body", (stream) => {
                stream.on("data", (chunk: Buffer) => { rawEmail += chunk.toString(); });
                stream.once("end", async () => {
                  try {
                    const parsed = await simpleParser(rawEmail);
                    const from = parsed.from?.text || "";
                    const subject = parsed.subject || "";
                    const receivedAt = parsed.date || new Date();
                    const bulan = detectBulan(subject);
                    const tahun = detectTahun(subject);

                    console.log("[IMAP] From:", from, "| Subject:", subject, "| Bulan:", bulan, "| Tahun:", tahun);

                    if (!from.includes(VENDOR_EMAIL)) {
                      console.log("[IMAP] SKIP - bukan dari vendor");
                      return res();
                    }

                    const existing = await prisma.vendorReport.findFirst({
                      where: { bulan, tahun, emailSubject: subject },
                    });
                    console.log("[IMAP] Duplikat:", !!existing);

                    if (existing) return res();

                    // Filter attachment yang valid
                    const validAtts = (parsed.attachments || []).filter(a => {
                      const ext = path.extname(a.filename || "").toLowerCase();
                      return ALLOWED_EXT.includes(ext);
                    });

                    console.log("[IMAP] Attachments valid:", validAtts.map(a => a.filename));

                    if (validAtts.length > 0) {
                      for (const att of validAtts) {
                        const safeName = `${Date.now()}-${(att.filename || "file").replace(/[^a-zA-Z0-9._-]/g, "_")}`;
                        const filePath = path.join(uploadDir, safeName);
                        fs.writeFileSync(filePath, att.content);

                        const report = await prisma.vendorReport.create({
                          data: {
                            bulan,
                            tahun,
                            fileName: att.filename || safeName,
                            filePath: `/reports/${safeName}`,
                            emailSubject: subject,
                            receivedAt,
                          },
                        });
                        newReports.push(report);
                        console.log("[IMAP] Laporan disimpan:", report.id);
                      }
                    } else {
                      // Tidak ada attachment valid — simpan metadata saja
                      const report = await prisma.vendorReport.create({
                        data: {
                          bulan,
                          tahun,
                          fileName: "-",
                          filePath: "",
                          emailSubject: subject,
                          receivedAt,
                        },
                      });
                      newReports.push(report);
                      console.log("[IMAP] Laporan (tanpa file) disimpan:", report.id);
                    }
                  } catch (e) {
                    console.error("[IMAP] Parse error:", e);
                  }
                  res();
                });
              });
            });
            parsePromises.push(p);
          });

          fetch.once("end", async () => { await Promise.all(parsePromises); imap.end(); resolve(); });
          fetch.once("error", reject);
        });
      });
    });

    imap.once("error", reject);
    imap.connect();
  });

  return newReports;
}

// ─── Background poller ────────────────────────────────────────────────────────
declare global {
  var __report_poller: NodeJS.Timeout | null;
}
global.__report_poller = global.__report_poller ?? null;

export async function startReportPoller() {
  if (global.__report_poller) return;

  const run = async () => {
    console.log("[POLLER] Cek email laporan...");
    try {
      const newReports = await fetchFromImap();
      if (newReports.length > 0) {
        const settings = await prisma.appSettings.findMany();
        const adminNumber = settings.find(s => s.key === "admin_wa_number")?.value;

        if (adminNumber && global.__wa_client) {
          const list = newReports.map(r => `• ${r.bulan} ${r.tahun} — ${r.fileName}`).join("\n");
          const msg = `📥 *Laporan Vendor Masuk*\n\n${list}\n\n_${new Date().toLocaleString("id-ID")}_`;
          try {
            await sendMessage(adminNumber, msg);
            console.log(`[POLLER] Notif WA terkirim ke ${adminNumber}`);
          } catch (e) {
            console.error("[POLLER] Gagal kirim notif WA:", e);
          }
        }
        console.log(`[POLLER] ${newReports.length} laporan baru disimpan`);
      } else {
        console.log("[POLLER] Tidak ada laporan baru");
      }
    } catch (e) {
      console.error("[POLLER] Error:", e);
    }

    const settings = await prisma.appSettings.findMany();
    const intervalMin = Number(settings.find(s => s.key === "poll_interval_minutes")?.value || 60);
    global.__report_poller = setTimeout(run, intervalMin * 60 * 1000);
  };

  global.__report_poller = setTimeout(run, 10_000);
  console.log("[POLLER] Report poller dimulai");
}

export async function stopReportPoller() {
  if (global.__report_poller) {
    clearTimeout(global.__report_poller);
    global.__report_poller = null;
    console.log("[POLLER] Report poller dihentikan");
  }
}

// ─── Manual trigger (POST) ────────────────────────────────────────────────────
export async function POST() {
  try {
    const newReports = await fetchFromImap();

    if (newReports.length > 0) {
      const settings = await prisma.appSettings.findMany();
      const adminNumber = settings.find(s => s.key === "admin_wa_number")?.value;

      if (adminNumber && global.__wa_client) {
        const list = newReports.map((r: any) => `• ${r.bulan} ${r.tahun} — ${r.fileName}`).join("\n");
        const msg = `📥 *Laporan Vendor Masuk*\n\n${list}\n\n_${new Date().toLocaleString("id-ID")}_`;
        try {
          await sendMessage(adminNumber, msg);
        } catch (e) {
          console.error("[FETCH] Gagal kirim notif WA:", e);
        }
      }
    }

    return NextResponse.json({
      status: "success",
      message: `${newReports.length} laporan baru ditemukan`,
      data: newReports,
    });
  } catch (error: any) {
    console.error("[REPORTS FETCH] Error:", error);
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}