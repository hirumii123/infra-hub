// src/app/api/whatsapp/chats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    let chats;
    try {
      chats = await client.getChats();
    } catch (err: any) {
      // Frame detached = browser crash, reset client state
      if (err.message?.includes("detached Frame") || err.message?.includes("Session closed") || err.message?.includes("Target closed")) {
        global.__wa_client = null;
        global.__wa_status = "disconnected";
        global.__wa_connecting = false;
        return NextResponse.json({ status: "error", error: "Koneksi WhatsApp terputus, silakan hubungkan ulang" }, { status: 503 });
      }
      throw err;
    }

    const formatted = chats
      .filter((chat: any) => !chat.isGroup)
      .slice(0, 50)
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