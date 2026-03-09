import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");
    const limit = parseInt(searchParams.get("limit") || "50");
    const loadMore = searchParams.get("loadMore") === "true";
    // Timestamp unix target — load sampai sebelum tanggal ini
    const beforeTimestamp = searchParams.get("beforeTimestamp")
      ? parseInt(searchParams.get("beforeTimestamp")!)
      : null;

    if (!chatId) {
      return NextResponse.json({ status: "error", error: "chatId diperlukan" }, { status: 400 });
    }

    const client = global.__wa_client;
    if (!client) {
      return NextResponse.json({ status: "error", error: "WhatsApp belum terhubung" }, { status: 400 });
    }

    const chat = await client.getChatById(chatId);

    if (loadMore) {
      // Panggil loadEarlierMessages berulang sampai pesan tertua lebih lama dari target
      const MAX_ATTEMPTS = 10; // Maksimal 10x pemanggilan per request
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        try {
          const before = await chat.fetchMessages({ limit: 1 });
          const oldestTimestamp = before[0]?.timestamp ?? Infinity;

          // Jika sudah melewati target timestamp, berhenti
          if (beforeTimestamp && oldestTimestamp <= beforeTimestamp) break;

          // await chat.loadEarlierMessages();

          // Jeda kecil agar WA Web tidak throttle
          await new Promise((r) => setTimeout(r, 300));
        } catch (e) {
          console.warn("[MESSAGES] loadEarlierMessages attempt", i, "gagal:", e);
          break;
        }
      }
    }

    const messages = await chat.fetchMessages({ limit });

    const formatted = messages
      .map((msg: any) => ({
        id: msg.id._serialized,
        body: msg.body || msg.caption || "",
        fromMe: msg.fromMe,
        timestamp: msg.timestamp,
        type: msg.type,
        hasMedia: msg.hasMedia || false,
      }))
      .filter((msg: any) => msg.body || msg.hasMedia);

    // Kirim timestamp pesan tertua agar frontend bisa kirim sebagai beforeTimestamp berikutnya
    const oldestTimestamp = formatted[0]?.timestamp ?? null;

    return NextResponse.json({
      status: "success",
      data: formatted,
      oldestTimestamp,
      hasMore: formatted.length >= limit,
    });
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