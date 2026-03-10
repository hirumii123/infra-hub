// src/app/api/reports/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const reports = await prisma.vendorReport.findMany({
      orderBy: { receivedAt: "desc" },
    });
    return NextResponse.json({ status: "success", data: reports });
  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const report = await prisma.vendorReport.findUnique({ where: { id: Number(id) } });
    if (!report) return NextResponse.json({ status: "error", error: "Tidak ditemukan" }, { status: 404 });

    // Hapus file fisik kalau ada
    if (report.filePath) {
      const fullPath = path.join(process.cwd(), "public", report.filePath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await prisma.vendorReport.delete({ where: { id: Number(id) } });
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}