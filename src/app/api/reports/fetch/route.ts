// src/app/api/reports/fetch/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Imap from "imap";
import { simpleParser } from "mailparser";
import fs from "fs";
import path from "path";

const VENDOR_EMAIL = "support@harrismaindonesia.com";

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

export async function POST() {
  try {
    // Pastikan folder uploads ada
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
        imap.openBox("INBOX", false, (err, box) => {
          if (err) return reject(err);

          // Cari email dari vendor yang belum dibaca
          imap.search(
            [["FROM", VENDOR_EMAIL]],
            async (err, uids) => {
              if (err) return reject(err);
              if (!uids || uids.length === 0) {
                imap.end();
                return resolve();
              }

              // Ambil 20 email terbaru saja
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
                        if (!from.includes(VENDOR_EMAIL)) return res();

                        const subject = parsed.subject || "";
                        const receivedAt = parsed.date || new Date();
                        const bulan = detectBulan(subject);
                        const tahun = detectTahun(subject);

                        // Cek duplikat
                        const existing = await prisma.vendorReport.findFirst({
                          where: { bulan, tahun, emailSubject: subject },
                        });
                        if (existing) return res();

                        // Proses attachment
                        if (parsed.attachments && parsed.attachments.length > 0) {
                          for (const att of parsed.attachments) {
                            const ext = path.extname(att.filename || "").toLowerCase();
                            if (![".pdf", ".xlsx", ".xls"].includes(ext)) continue;

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
                          }
                        } else {
                          // Email tanpa attachment — simpan metadata saja
                          const existing2 = await prisma.vendorReport.findFirst({
                            where: { bulan, tahun, emailSubject: subject },
                          });
                          if (!existing2) {
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
                          }
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

              fetch.once("end", async () => {
                await Promise.all(parsePromises);
                imap.end();
                resolve();
              });

              fetch.once("error", reject);
            }
          );
        });
      });

      imap.once("error", reject);
      imap.connect();
    });

    return NextResponse.json({
      status: "success",
      message: `${newReports.length} laporan baru ditemukan`,
      data: newReports,
    });

  } catch (error: any) {
    console.error("[REPORTS FETCH] Error:", error);
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}