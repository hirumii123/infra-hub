"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "../components/Navbar/page";
import Space from "../components/atoms/Space/page";

export default function WhatsappPage() {
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null); // Tambah type string | null biar aman
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    number:"",
  });
  
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3001/status");
      const data = await res.json();

      setStatus(data.status);
      setQrCode(data.qr);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal connect ke server WA", error);
      setStatus("server_off");
    }
  }, []);

  // 3. Update useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, [checkStatus]);

  const handleTestSend = async () => {
    setIsSending(true);
    try {
      const res = await fetch("http://localhost:3001/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: formData.number,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (result.status === "success") {
        alert("✅ Pesan berhasil terkirim ke Whatsapp!");
      } else {
        alert("❌ Gagal: " + result.message);
      }
    } catch (error) {
      alert("❌ Error: Server WA mati atau tidak bisa dihubungi.");
    }
    setIsSending(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Space />
      <div className="bg-white p-6 rounded-xl shadow-md border max-w-5xl mx-auto space-y-8 px-4 md:px-0">
        {status === "server_off" && (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg">
            ⚠️ <strong>Server Mati</strong> <br />
            Silakan jalankan <code>node server.js</code> di terminal.
          </div>
        )}

        {status === "disconnected" && !qrCode && (
          <div className="text-gray-500 text-center">
            <b>⏳ Menunggu QR Code dari server...</b>
          </div>
        )}

        {status === "scanning" && qrCode && (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sm text-gray-600">
              Buka WhatsApp di HP {">"} Perangkat Tertaut {">"} Scan QR ini
            </p>
            <div className="p-4 bg-white border-2 border-gray-800 rounded-lg">
              <QRCodeSVG value={qrCode} size={256} />
            </div>
          </div>
        )}

        {status === "connected" && (
          <div className="text-green-600 flex flex-col px-6 animate-in fade-in zoom-in">
            <h2 className="text-xl font-bold text-center">Terhubung!</h2>
            <div>
              <label className="text-xs font-bold text-slate-500 ">
                Nomor Telepon
              </label>
              <input
                type="text"
                required
                className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </div>
            <Space/>
            <div>
              <label className="text-xs font-bold text-slate-500 ">
                Pesan Whatsapp
              </label>
              <input
                type="text"
                required
                className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none text-black"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleTestSend}
              disabled={isSending}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isSending ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
