import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";

declare global {
  var __wa_client: Client | null;
  var __wa_status: string;
  var __wa_qr: string | null;
  var __wa_connecting: boolean;
}

global.__wa_client = global.__wa_client ?? null;
global.__wa_status = global.__wa_status ?? "disconnected";
global.__wa_qr = global.__wa_qr ?? null;
global.__wa_connecting = global.__wa_connecting ?? false;

export const connectToWhatsApp = async (): Promise<void> => {
  if (global.__wa_client || global.__wa_connecting) {
    console.log("[WA] Sudah ada client atau sedang connecting, skip");
    return;
  }

  global.__wa_connecting = true;
  console.log("[WA] Mulai inisialisasi client...");

  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: ".wa_session" }),
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    },
  });

  client.on("qr", async (qr) => {
    console.log("[WA] QR Code diterima, generate image...");
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
  });

  client.on("auth_failure", (msg) => {
    console.error("[WA] Auth failure:", msg);
    global.__wa_status = "disconnected";
    global.__wa_client = null;
    global.__wa_connecting = false;
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
  } catch (err) {
    console.error("[WA] Error initialize:", err);
    global.__wa_connecting = false;
    global.__wa_client = null;
    global.__wa_status = "disconnected";
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

  // Langsung pakai sendMessage bawaan — sudah terbukti works via fallback 3
  await client.sendMessage(chatId, message);
};

export const logoutWhatsApp = async (): Promise<void> => {
  if (global.__wa_client) {
    await global.__wa_client.logout();
    global.__wa_client = null;
  }
  global.__wa_status = "disconnected";
  global.__wa_qr = null;
  global.__wa_connecting = false;
};

export const getWAStatus = () => ({
  status: global.__wa_status,
  qr: global.__wa_qr,
});