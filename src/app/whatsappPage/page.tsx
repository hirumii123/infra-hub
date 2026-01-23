"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "../components/Navbar/page"; // Pastikan path import ini benar
import Space from "../components/atoms/Space/page"; // Pastikan path import ini benar

export default function WhatsappPage() {
  // --- STATE MANAGEMENT ---
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  // State untuk Pilihan (Personal / Group)
  const [targetType, setTargetType] = useState<"personal" | "group">("personal");
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);

  // State Form Data
  const [formData, setFormData] = useState({
    message: "",
    number: "", // Ini bisa berisi Nomor HP atau ID Grup
    sendAt: "", 
  });

  // --- LOGIC: CEK STATUS WA ---
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

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, [checkStatus]);

  // --- LOGIC: AMBIL DAFTAR GRUP ---
  // Dijalankan otomatis saat status berubah jadi "connected"
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:3001/groups");
        const result = await res.json();
        if (result.status === "success") {
          setGroups(result.data);
        }
      } catch (error) {
        console.error("Gagal ambil data grup", error);
      }
    };

    if (status === "connected") {
      fetchGroups();
    }
  }, [status]);

  // --- LOGIC: KIRIM PESAN ---
  const handleTestSend = async () => {
    if (!formData.number) {
        alert("❌ Harap isi nomor tujuan atau pilih grup!");
        return;
    }

    setIsSending(true);
    try {
      const res = await fetch("http://localhost:3001/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: formData.number,
          message: formData.message,
          sendAt: formData.sendAt,
        }),
      });

      const result = await res.json();

      if (result.status === "success") {
        if (formData.sendAt) {
             alert(`✅ Pesan berhasil dijadwalkan untuk: ${new Date(formData.sendAt).toLocaleString()}`);
        } else {
             alert("✅ Pesan berhasil terkirim ke Whatsapp!");
        }
        // Reset form (kecuali tipe target)
        setFormData({ ...formData, message: "", number: "", sendAt: "" });
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
        
        {/* --- STATUS: SERVER MATI --- */}
        {status === "server_off" && (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
            ⚠️ <strong>Server Mati</strong> <br />
            Silakan jalankan <code>node server.js</code> di terminal backend.
          </div>
        )}

        {/* --- STATUS: MENUNGGU QR --- */}
        {status === "disconnected" && !qrCode && (
          <div className="text-gray-500 text-center py-10">
            <div className="animate-pulse">⏳ Menunggu QR Code dari server...</div>
          </div>
        )}

        {/* --- STATUS: SCANNING QR --- */}
        {status === "scanning" && qrCode && (
          <div className="flex flex-col items-center animate-in fade-in">
            <p className="mb-4 text-sm text-gray-600 font-medium">
              Buka WhatsApp di HP {">"} Perangkat Tertaut {">"} Scan QR ini
            </p>
            <div className="p-4 bg-white border-2 border-gray-800 rounded-lg shadow-sm">
              <QRCodeSVG value={qrCode} size={256} />
            </div>
          </div>
        )}

        {/* --- STATUS: TERHUBUNG (FORM UTAMA) --- */}
        {status === "connected" && (
          <div className="text-gray-800 flex flex-col px-6 animate-in fade-in zoom-in">
            <h2 className="text-xl font-bold text-center text-green-600 mb-6">
              ✅ Terhubung! Kirim Pesan
            </h2>

            {/* 1. TOMBOL PILIHAN (Personal vs Group) */}
            <div className="flex justify-center gap-4 mb-6">
                <button 
                    onClick={() => { setTargetType("personal"); setFormData({...formData, number: ""}); }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        targetType === 'personal' 
                        ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    👤 Personal
                </button>
                <button 
                    onClick={() => { setTargetType("group"); setFormData({...formData, number: ""}); }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        targetType === 'group' 
                        ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                    👥 Grup
                </button>
            </div>

            {/* 2. INPUT TUJUAN (Dinamis: Input Text atau Dropdown) */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block mb-1">
                {targetType === 'personal' ? "Nomor Telepon (Format: 628...)" : "Pilih Grup Whatsapp"}
              </label>
              
              {targetType === 'personal' ? (
                  <input
                    type="text"
                    required
                    placeholder="628123456789"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
              ) : (
                  <select
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  >
                    <option value="">-- Pilih Grup Tujuan --</option>
                    {groups.length > 0 ? (
                        groups.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>Mengambil data grup...</option>
                    )}
                  </select>
              )}
            </div>

            {/* 3. INPUT TANGGAL (Jadwal) */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block">
                Waktu Pengiriman (Opsional)
              </label>
              <p className="text-[10px] text-gray-400 mb-1">
                *Kosongkan jika ingin kirim sekarang juga
              </p>
              <input
                type="datetime-local"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                value={formData.sendAt}
                onChange={(e) =>
                  setFormData({ ...formData, sendAt: e.target.value })
                }
              />
            </div>

            {/* 4. INPUT PESAN */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Pesan Whatsapp
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tulis pesan anda disini..."
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {/* 5. TOMBOL KIRIM */}
            <button
              onClick={handleTestSend}
              disabled={isSending}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                isSending 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform active:scale-95"
              }`}
            >
              {isSending ? (
                <>⏳ Memproses...</>
              ) : formData.sendAt ? (
                <>📅 Jadwalkan Pesan</>
              ) : (
                <>🚀 Kirim Sekarang</>
              )}
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}