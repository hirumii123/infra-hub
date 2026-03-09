import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");
    const messageId = searchParams.get("messageId");

    if (!chatId || !messageId) {
      return NextResponse.json({ status: "error", error: "chatId dan messageId diperlukan" }, { status: 400 });
    }

    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    let msg: any = null;

    // Cara 1: getMessageById langsung
    try {
      msg = await client.getMessageById(messageId);
    } catch (e: any) {
      console.warn("[MEDIA] getMessageById error:", e?.message);
    }

    // Cara 2: fallback fetchMessages
    if (!msg) {
      try {
        const chat = await client.getChatById(chatId);
        const messages = await chat.fetchMessages({ limit: 30 });
        msg = messages.find((m: any) => m.id._serialized === messageId);
      } catch (e: any) {
        console.warn("[MEDIA] Fallback error:", e?.message);
      }
    }

    if (!msg) {
      return NextResponse.json({ status: "error", error: "Pesan tidak ditemukan" }, { status: 404 });
    }

    if (!msg.hasMedia) {
      return NextResponse.json({ status: "error", error: "Pesan tidak memiliki media" }, { status: 400 });
    }

    const media = await Promise.race([
      msg.downloadMedia(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout download media (15s)")), 15000)
      ),
    ]) as any;

    if (!media || !media.data) {
      return NextResponse.json({ status: "error", error: "Gagal download media" }, { status: 500 });
    }

    return NextResponse.json({ status: "success", data: `data:${media.mimetype};base64,${media.data}` });

  } catch (error: any) {
    console.error("[MEDIA] Error:", error?.message || error);
    return NextResponse.json({ status: "error", error: error?.message || String(error) }, { status: 500 });
  }
}