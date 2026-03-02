import { connectToWhatsApp } from "@/lib/whatsapp";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("[CONNECT] Dipanggil");
    connectToWhatsApp().catch((err) => {
      console.error("[CONNECT] Error:", err);
    });
    return NextResponse.json({
      status: "success",
      message: "WhatsApp sedang diinisialisasi...",
    });
  } catch (err: any) {
    console.error("[CONNECT] Catch error:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}