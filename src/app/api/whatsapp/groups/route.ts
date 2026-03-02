import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = global.__wa_client;

    if (!client) {
      return NextResponse.json(
        { status: "error", error: "WhatsApp belum terhubung" },
        { status: 400 }
      );
    }

    const chats = await client.getChats();
    const groups = chats
      .filter((chat) => chat.isGroup)
      .map((chat) => ({ id: chat.id._serialized, name: chat.name }));

    return NextResponse.json({ status: "success", data: groups });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}