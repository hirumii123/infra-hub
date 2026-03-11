import { connectToWhatsApp, getWAStatus } from "@/lib/whatsapp";
import { NextResponse } from "next/server";
import { startEmailCron } from "@/lib/cron";

// Pastikan cron selalu jalan selama app aktif
startEmailCron();

export async function GET() {
  try {
    connectToWhatsApp().catch((err) =>
      console.error("WA connect error:", err)
    );

    const statusData = getWAStatus();
    return NextResponse.json(statusData);
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}