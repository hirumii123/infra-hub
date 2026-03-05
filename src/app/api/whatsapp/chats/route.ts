import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    const chats = await client.getChats();
    const personalChats = chats
      .filter((chat) => !chat.isGroup)
      .slice(0, 30) // Batasi 30 chat terbaru
      .map((chat) => ({
        id: chat.id._serialized,
        name: chat.name,
        lastMessage: (chat as any).lastMessage?.body || "",
        lastMessageTime: (chat as any).lastMessage?.timestamp || 0,
        unreadCount: chat.unreadCount,
      }));

    return NextResponse.json({ status: "success", data: personalChats });
  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}