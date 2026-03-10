import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";

declare global {
  var __wa_client: Client | null;
  var __wa_status: string;
  var __wa_qr: string | null;
  var __wa_connecting: boolean;
  var __wa_last_error: number; // timestamp ms terakhir error
}

global.__wa_client = global.__wa_client ?? null;
global.__wa_status = global.__wa_status ?? "disconnected";
global.__wa_qr = global.__wa_qr ?? null;
global.__wa_connecting = global.__wa_connecting ?? false;
global.__wa_last_error = global.__wa_last_error ?? 0;

const ERROR_COOLDOWN_MS = 10000; // 10 detik cooldown setelah error

export const connectToWhatsApp = async (): Promise<void> => {
  // Kalau sedang connecting, skip
  if (global.__wa_connecting) {
    console.log("[WA] Sedang connecting, skip");
    return;
  }

  // Kalau sudah ada client, skip
  if (global.__wa_client) {
    console.log("[WA] Client sudah ada, skip");
    return;
  }

  // Cooldown setelah error — jangan langsung retry
  const timeSinceError = Date.now() - global.__wa_last_error;
  if (global.__wa_last_error > 0 && timeSinceError < ERROR_COOLDOWN_MS) {
    console.log(`[WA] Cooldown aktif, tunggu ${Math.ceil((ERROR_COOLDOWN_MS - timeSinceError) / 1000)}s lagi`);
    return;
  }

  global.__wa_connecting = true;
  console.log("[WA] Mulai inisialisasi client...");

  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: ".wa_session" }),
    puppeteer: {
      headless: true,
      executablePath: process.env.CHROME_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    },
  });

  client.on("qr", async (qr) => {
    console.log("[WA] QR Code diterima...");
    try {
      global.__wa_qr = await qrcode.toDataURL(qr);
      global.__wa_status = "scanning";
    } catch (err) {
      console.error("[WA] Gagal generate QR:", err);
    }
  });

  client.on("ready", () => {
    global.__wa_status = "connected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
    global.__wa_last_error = 0;
    console.log("[WA] ✅ WhatsApp Terhubung");
  });

  client.on("message", async (msg) => {
    const text = msg.body.toLowerCase().trim();
    const isCommand = text === "#stiker" || text === "#sticker";
    if (msg.hasMedia && isCommand) {
      await handleStickerUpdate(msg);
    } else if (msg.hasQuotedMsg && isCommand) {
      const quotedMsg = await msg.getQuotedMessage();
      if (quotedMsg.hasMedia) await handleStickerUpdate(quotedMsg, msg);
    }
  });

  async function handleStickerUpdate(mediaMsg: any, replyTarget: any = null) {
    const target = replyTarget || mediaMsg;
    try {
      await target.reply("⏳ Sedang memproses stiker, tunggu sebentar...");
      const media = await mediaMsg.downloadMedia();
      if (media && (mediaMsg.type === "image" || mediaMsg.type === "video")) {
        await global.__wa_client?.sendMessage(target.from, media, {
          sendMediaAsSticker: true,
          stickerName: "",
          stickerAuthor: "",
          stickerCategories: ["🤖"],
        });
      } else {
        await target.reply("❌ Pastikan media yang dikirim adalah gambar atau video pendek.");
      }
    } catch (err) {
      console.error("[WA] Gagal memproses stiker:", err);
      await target.reply("❌ Terjadi kesalahan saat mengonversi stiker.");
    }
  }

  client.on("authenticated", () => {
    console.log("[WA] Authenticated!");
    global.__wa_status = "connected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
    global.__wa_last_error = 0;
  });

  client.on("auth_failure", (msg) => {
    console.error("[WA] Auth failure:", msg);
    global.__wa_status = "disconnected";
    global.__wa_client = null;
    global.__wa_connecting = false;
    global.__wa_last_error = Date.now();
  });

  client.on("disconnected", (reason) => {
    console.log("[WA] Disconnected:", reason);
    global.__wa_status = "disconnected";
    global.__wa_client = null;
    global.__wa_connecting = false;
  });

  global.__wa_client = client;

  try {
    await client.initialize();
  } catch (err: any) {
    console.error("[WA] Error initialize:", err);
    global.__wa_connecting = false;
    global.__wa_client = null;
    global.__wa_status = "disconnected";
    global.__wa_last_error = Date.now(); // set timestamp error
  }
};

function normalizeToId(number: string): string {
  if (number.endsWith("@g.us") || number.endsWith("@c.us")) return number;
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  return digits + "@c.us";
}

export const sendMessage = async (
  number: string,
  message: string,
): Promise<void> => {
  const client = global.__wa_client;
  if (!client) throw new Error("WhatsApp belum terhubung");
  const chatId = normalizeToId(number);
  await client.sendMessage(chatId, message);
};

export const logoutWhatsApp = async (): Promise<void> => {
  if (global.__wa_client) {
    try { await global.__wa_client.logout(); } catch {}
    global.__wa_client = null;
  }
  global.__wa_status = "disconnected";
  global.__wa_qr = null;
  global.__wa_connecting = false;
  global.__wa_last_error = 0;
};

export const getWAStatus = () => ({
  status: global.__wa_status,
  qr: global.__wa_qr,
});