import { connectToWhatsApp, getWAStatus } from "@/lib/whatsapp";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Auto-start koneksi WA jika belum ada
    connectToWhatsApp().catch((err) =>
      console.error("WA connect error:", err)
    );

    const statusData = getWAStatus();
    return NextResponse.json(statusData);
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}