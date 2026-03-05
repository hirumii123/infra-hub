import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json({ status: "error", error: "chatId diperlukan" }, { status: 400 });
    }

    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 50 });

    const formatted = messages.map((msg: any) => ({
      id: msg.id._serialized,
      body: msg.body || msg.caption || "",
      fromMe: msg.fromMe,
      timestamp: msg.timestamp,
      type: msg.type, // chat, image, video, audio, sticker, document, ptt
      hasMedia: msg.hasMedia || false,
    })).filter((msg: any) => msg.body || msg.hasMedia);

    return NextResponse.json({ status: "success", data: formatted });
  } catch (error: any) {
    console.error("[MESSAGES GET] Error:", error);
    return NextResponse.json({ status: "error", error: error?.message || String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { chatId, message } = await req.json();

    if (!chatId || !message) {
      return NextResponse.json({ status: "error", error: "chatId dan message wajib diisi" }, { status: 400 });
    }

    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    await client.sendMessage(chatId, message);
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error?.message || String(error) }, { status: 500 });
  }
}