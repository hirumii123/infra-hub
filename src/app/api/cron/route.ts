import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date();

//   console.log("--- DEBUG START ---");
//   console.log("Host:", process.env.SMTP_HOST);
//   console.log("User:", process.env.SMTP_USER); 
//   console.log("Pass Loaded?", process.env.SMTP_PASS ? "YES" : "NO");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false 
    }
  });

  try {
    const jobs = await prisma.emailQueue.findMany({
      where: {
        status: 'PENDING',
        sendAt: { lte: now },
      },
    });

    if (jobs.length === 0) {
      console.log("Tidak ada antrean.");
      return NextResponse.json({ message: 'Empty queue' });
    }

    const results = [];

    for (const job of jobs) {
      console.log(`Mencoba kirim ke: ${job.to}`);
      try {
        const header = `<p>Yth. Bapak Ibu Tim Harrisma,</p>`;
        const message = 
        `<p>
        Dengan hormat, <br>
        Semoga Bapak/Ibu dalam keadaan baik. <br><br>
        Email ini kami sampaikan sebagai Pengajuan LogBook Activity ke Datacenter, Rack 1a0212 Periode ${job.body} Tahun 2026.
        <br><br>
        Kami mohon kesediaannya untuk dapat segera menyampaikan laporan dimaksud.
        Laporan ini kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal.
        Atas perhatian dan kerja samanya, kami ucapkan terima kasih. <br><br>
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
        p. +62 21 290 69 516  |   f. +62 21 290 69 516
        </p>`

        const finalBody = header + message ;

        await transporter.sendMail({
          from: `"Infra Team | PT AINO Indonesia" <${process.env.SMTP_USER}>`,
          to: job.to,
          subject: job.subject,
          html: finalBody,
        });

        console.log(`✅ Sukses kirim ke ${job.to}`);
        
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: 'SENT' },
        });
        results.push({ id: job.id, status: 'SENT' });

      } catch (err) {
        console.error("❌ ERROR NODEMAILER:", err); 
        
        await prisma.emailQueue.update({
          where: { id: job.id },
          data: { status: 'FAILED' },
        });
        results.push({ id: job.id, status: 'FAILED' });
      }
    }

    return NextResponse.json({ processed: results });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}