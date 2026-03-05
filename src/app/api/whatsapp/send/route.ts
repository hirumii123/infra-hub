import { NextResponse } from "next/server";
import { sendMessage } from "@/lib/whatsapp";

// ✅ Simpan jadwal di global agar persisten
declare global {
  var __wa_scheduled: {
    id: string;
    chatId: string;
    message: string;
    sendAt: number; // unix timestamp ms
    timer: NodeJS.Timeout;
  }[];
}

if (!global.__wa_scheduled) global.__wa_scheduled = [];

function formatWhatsAppId(number: string): string {
  if (number.endsWith("@g.us")) return number;
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  return digits + "@c.us";
}

export async function POST(req: Request) {
  try {
    const { number, message, sendAt } = await req.json();

    if (!number || !message) {
      return NextResponse.json(
        { status: "error", error: "number dan message wajib diisi" },
        { status: 400 }
      );
    }

    const chatId = formatWhatsAppId(number);

    // ✅ Jika ada sendAt, jadwalkan
    if (sendAt) {
      const sendAtMs = new Date(sendAt).getTime();
      const now = Date.now();
      const delay = sendAtMs - now;

      if (delay <= 0) {
        return NextResponse.json(
          { status: "error", error: "Waktu pengiriman harus di masa depan" },
          { status: 400 }
        );
      }

      const id = `sched-${Date.now()}`;
      const timer = setTimeout(async () => {
        try {
          await sendMessage(chatId, message);
          console.log(`[SCHEDULE] Pesan terkirim ke ${chatId} pada ${new Date().toLocaleString()}`);
        } catch (err) {
          console.error(`[SCHEDULE] Gagal kirim ke ${chatId}:`, err);
        }
        // Hapus dari daftar setelah terkirim
        global.__wa_scheduled = global.__wa_scheduled.filter((s) => s.id !== id);
      }, delay);

      global.__wa_scheduled.push({ id, chatId, message, sendAt: sendAtMs, timer });

      console.log(`[SCHEDULE] Dijadwalkan ke ${chatId} pada ${new Date(sendAtMs).toLocaleString()}, delay: ${Math.round(delay / 1000)}s`);

      return NextResponse.json({
        status: "success",
        message: `Pesan dijadwalkan pada ${new Date(sendAtMs).toLocaleString("id-ID")}`,
        scheduleId: id,
      });
    }

    // Kirim langsung
    await sendMessage(chatId, message);
    return NextResponse.json({ status: "success", message: "Pesan terkirim" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}