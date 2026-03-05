import { NextResponse } from "next/server";

// GET - lihat semua jadwal
export async function GET() {
  const scheduled = (global.__wa_scheduled || []).map((s) => ({
    id: s.id,
    chatId: s.chatId,
    message: s.message,
    sendAt: s.sendAt,
    sendAtFormatted: new Date(s.sendAt).toLocaleString("id-ID"),
  }));

  return NextResponse.json({ status: "success", data: scheduled });
}

// DELETE - batalkan jadwal
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const idx = (global.__wa_scheduled || []).findIndex((s) => s.id === id);

    if (idx === -1) {
      return NextResponse.json({ status: "error", error: "Jadwal tidak ditemukan" }, { status: 404 });
    }

    clearTimeout(global.__wa_scheduled[idx].timer);
    global.__wa_scheduled.splice(idx, 1);

    return NextResponse.json({ status: "success", message: "Jadwal dibatalkan" });
  } catch (error: any) {
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
  }
}