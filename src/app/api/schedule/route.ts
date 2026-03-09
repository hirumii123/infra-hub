import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { to, cc, subject, body, sendAt, bulan, tahun } = await req.json();

    if (!to || !subject || !sendAt || !bulan || !tahun) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const newJob = await prisma.emailQueue.create({
      data: {
        to,
        cc: cc || null,
        subject,
        body,
        sendAt: new Date(sendAt),
        bulan,
        tahun,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, data: newJob });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Gagal simpan database' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.emailQueue.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 });
  }
}