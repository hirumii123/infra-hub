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
      // executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",``
      ],
    },
  });

  //coba diset jadi browser apa saja akan bisa

  client.on("qr", async (qr) => {
    console.log("[WA] QR Code diterima, generate image...");
    try {
      global.__wa_qr = await qrcode.toDataURL(qr);
      global.__wa_status = "scanning";
      console.log("[WA] QR Code siap ditampilkan!");
    } catch (err) {
      console.error("[WA] Gagal generate QR:", err);
    }
  });

  client.on("ready", () => {
    global.__wa_status = "connected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
    console.log("[WA] ✅ WhatsApp Terhubung!");
  });

  client.on("authenticated", () => {
    console.log("[WA] Authenticated!");
    global.__wa_status = "connected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
  });

  client.on("auth_failure", (msg) => {
    console.error("[WA] Auth failure:", msg);
    global.__wa_status = "disconnected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
    global.__wa_client = null;
  });

  client.on("disconnected", (reason) => {
    console.log("[WA] Disconnected:", reason);
    global.__wa_status = "disconnected";
    global.__wa_qr = null;
    global.__wa_connecting = false;
    global.__wa_client = null;
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

export const sendMessage = async (number: string, message: string): Promise<void> => {
  if (!global.__wa_client) {
    throw new Error("WhatsApp belum terhubung");
  }

  // Format nomor
  let chatId = number.endsWith("@g.us") ? number : "";
  if (!chatId) {
    let digits = number.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "62" + digits.slice(1);
    chatId = digits + "@c.us";
  }

  await global.__wa_client.sendMessage(chatId, message);
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