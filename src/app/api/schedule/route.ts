// src/app/api/schedule/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function POST(req: Request) {
  try {
    const { to, subject, body, sendAt } = await req.json();

    // Validasi input
    if (!to || !subject || !sendAt) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Simpan ke Database
    const newJob = await prisma.emailQueue.create({
      data: {
        to,
        subject,
        body,
        sendAt: new Date(sendAt),
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

    await prisma.emailQueue.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus' }, { status: 500 });
  }
}