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

    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 100 });
    const msg = messages.find((m: any) => m.id._serialized === messageId);

    if (!msg) {
      return NextResponse.json({ status: "error", error: "Pesan tidak ditemukan" }, { status: 404 });
    }

    console.log("[MEDIA] msg type:", msg.type, "hasMedia:", msg.hasMedia);

    if (!msg.hasMedia) {
      return NextResponse.json({ status: "error", error: "Pesan tidak punya media" }, { status: 400 });
    }

    let media;
    try {
      media = await msg.downloadMedia();
    } catch (downloadErr) {
      console.error("[MEDIA] downloadMedia error:", downloadErr);
      return NextResponse.json({ status: "error", error: "Gagal download media: " + String(downloadErr) }, { status: 500 });
    }

    if (!media || !media.data) {
      console.error("[MEDIA] media kosong:", media);
      return NextResponse.json({ status: "error", error: "Media kosong atau tidak tersedia" }, { status: 404 });
    }

    console.log("[MEDIA] berhasil, mimetype:", media.mimetype, "size:", media.data.length);

    return NextResponse.json({
      status: "success",
      data: `data:${media.mimetype};base64,${media.data}`,
      mimetype: media.mimetype,
    });
  } catch (error: any) {
    console.error("[MEDIA] Outer error:", error);
    return NextResponse.json(
      { status: "error", error: error?.message || JSON.stringify(error) || String(error) },
      { status: 500 }
    );
  }
}