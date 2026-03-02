import { NextResponse } from "next/server";
import { connectToWhatsApp, sendMessage } from "@/lib/whatsapp";

function formatWhatsAppId(number: string): string {
  // Jika sudah berbentuk grup ID, langsung return
  if (number.endsWith("@g.us")) return number;

  // Bersihkan semua karakter non-digit
  let digits = number.replace(/\D/g, "");

  // ✅ FIX: Cek awalan "0" dari input asli, BUKAN setelah ditambah @s.whatsapp.net
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }

  return digits + "@s.whatsapp.net";
}

export async function POST(req: Request) {
  try {
    const { number, message } = await req.json();
    console.log("[SEND] number:", number, "message:", message?.slice(0, 20));

    await sendMessage(number, message);
    return NextResponse.json({ status: "success", message: "Pesan terkirim" });
  } catch (error: any) {
    console.error("[SEND] Error:", error.message); // ← ini akan muncul di terminal
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}