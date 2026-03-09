// src/app/api/whatsapp/chats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    const chats = await client.getChats();

    const formatted = chats
      .filter((chat: any) => !chat.isGroup) // hanya personal, bukan grup
      .slice(0, 50) // ambil 50 chat terbaru
      .map((chat: any) => ({
        id: chat.id._serialized,
        name: chat.name || chat.id.user,
        number: chat.id.user,
        lastMessage: chat.lastMessage?.body?.slice(0, 40) || "",
        timestamp: chat.timestamp || 0,
        unreadCount: chat.unreadCount || 0,
      }));

    return NextResponse.json({ status: "success", data: formatted });
  } catch (error: any) {
    console.error("[CHATS] Error:", error);
    return NextResponse.json({ status: "error", error: error?.message }, { status: 500 });
  }
}