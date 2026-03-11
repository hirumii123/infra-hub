import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

declare global {
  var __email_cron: NodeJS.Timeout | null;
}
global.__email_cron = global.__email_cron ?? null;

async function runEmailCron() {
  const now = new Date();
  console.log("[CRON] Cek email queue...", now.toLocaleString("id-ID"));

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    const jobs = await prisma.emailQueue.findMany({
      where: { status: "PENDING", sendAt: { lte: now } },
    });

    if (jobs.length === 0) {
      console.log("[CRON] Tidak ada antrean");
      return;
    }

    for (const job of jobs) {
      console.log(`[CRON] Kirim ke: ${job.to}${job.cc ? ` | CC: ${job.cc}` : ""}`);
      try {
        const header = `<p>Yth. Bapak Ibu Tim Harrisma,</p>`;
        const message = `<p>
        Dengan hormat, <br>
        Semoga Bapak/Ibu dalam keadaan baik. <br><br>
        Melalui email ini, kami bermaksud menyampaikan pengajuan terkait LogBook Activity serta SLA Report ke Datacenter, untuk penggunaan Rack 1a0212 Periode ${job.bulan} Tahun ${job.tahun}.
        <br><br>
        Sehubungan dengan hal tersebut, kami memohon kesediaan Bapak/Ibu untuk dapat mengirimkan laporan dimaksud dalam waktu dekat. <br>
        Dokumen laporan tersebut kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal. <br>

        <b>Ini adalah pesan otomatis. Apabila Bapak/Ibu telah mengirimkan laporan tersebut sebelumnya, mohon kiranya pesan ini dapat diabaikan.</b><br>
        Demikian permohonan ini kami sampaikan. <br>
        Atas perhatian, bantuan, dan kerja sama yang baik, kami ucapkan terima kasih. <br><br>
        Hormat kami, <br>
        Tim Kolektif Laporan<br>
        <b>PT. AINO Indonesia</b><br><br>
        -----------------------------------------
        <br><br>
        Head Office <br>
        Vinolia Building, 3rd Floor <br>
        Jl. Urip Sumoharjo No.35, Klitren, Gondokusuman, Yogyakarta <br>
        www.ainosi.co.id     |  info@ainosi.co.id <br>
        p.62 274 518682 | p. 62 274 554466 | f.62 274 554488 <br>
        <br>
        Jakarta Office <br>
        UGM Samator Building, 10th Floor <br>
        Jl. Dr. Sahardjo no.83 Tebet - Manggarai Jakarta Selatan <br>
        p. +62 21 290 69 516   |   f. +62 21 290 69 516
        </p>`;

        await transporter.sendMail({
          from: `"Infra Team | PT AINO Indonesia" <${process.env.SMTP_USER}>`,
          to: job.to,
          ...(job.cc ? { cc: job.cc } : {}),
          subject: job.subject,
          html: header + message,
        });

        console.log(`[CRON] ✅ Sukses kirim ke ${job.to}`);
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "SENT" },
        });
      } catch (err) {
        console.error(`[CRON] ❌ Gagal kirim ke ${job.to}:`, err);
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: "FAILED" },
        });
      }
    }
  } catch (err) {
    console.error("[CRON] Error query DB:", err);
  }
}

export function startEmailCron() {
  if (global.__email_cron) return;

  runEmailCron();

  global.__email_cron = setInterval(runEmailCron, 60 * 1000);
  console.log("[CRON] Email cron dimulai, interval 60 detik");
}