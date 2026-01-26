"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

export default function WhatsappPage() {  
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [targetType, setTargetType] = useState<"personal" | "group">(
    "personal",
  );
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_WA_API_BASE_URL || "http://localhost:3001";

  const daftarBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const daftarTahun = [2026, 2027, 2028, 2029, 2030];
  const [formData, setFormData] = useState({
    number: "",
    sendAt: "",
    message: "",
    tahun: "",
    bulan: "",
  });

  useEffect(() => {
    if (formData.bulan && formData.tahun) {
      setFormData((prev) => ({
        ...prev,
        message: `Yth. Bapak Ibu Tim Harrisma,

Semoga Bapak/Ibu dalam keadaan baik.
Email ini kami sampaikan sebagai Pengajuan LogBook Activity ke Datacenter, Rack 1a0212 Periode ${formData.bulan} Tahun ${formData.tahun}.

Kami mohon kesediaannya untuk dapat segera menyampaikan laporan dimaksud.
Laporan ini kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal.

Atas perhatian dan kerja samanya, kami ucapkan terima kasih.

Hormat kami,
Tim Kolektif Laporan
*PT. AINO Indonesia*
-----------------------------------------

Head Office
Vinolia Building, 3rd Floor
Jl. Urip Sumoharjo No.35, Klitren, Gondokusuman, Yogyakarta
www.ainosi.co.id | info@ainosi.co.id
p.62 274 518682 | p. 62 274 554466 | f.62 274 554488 

Jakarta Office
UGM Samator Building, 10th Floor
Jl. Dr. Sahardjo no.83 Tebet - Manggarai Jakarta Selatan
p. +62 21 290 69 516 | f. +62 21 290 69 516`,
      }));
    }
  }, [formData.bulan, formData.tahun]);

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/status`);
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

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`${API_BASE}/groups`);
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

  const handleTestSend = async () => {
    if (!formData.number) {
      alert("❌ Harap isi nomor tujuan atau pilih grup!");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(`${API_BASE}/send-message`, {
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
          alert(
            `Pesan berhasil dijadwalkan untuk: ${new Date(formData.sendAt).toLocaleString()}`,
          );
        } else {
          alert("Pesan berhasil terkirim ke Whatsapp!");
        }
        setFormData({ ...formData, message: "", number: "", sendAt: "" });
      } else {
        alert("Gagal: " + result.message);
      }
    } catch (error) {
      alert("Error: Server WA mati atau tidak bisa dihubungi.");
    }
    setIsSending(false);
  };

  const handleLogout = async () => {
    if (!confirm("Yakin ingin menghapus sesi? Bot akan mati dan minta scan QR ulang.")) return;

    setIsResetting(true);
    try {
      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST"
      });
      const data = await res.json();
      
      if (data.status === "success") {
        alert("Sesi berhasil dihapus! Tunggu QR Code baru muncul...");
        setStatus("disconnected");
        setQrCode(null);
        setGroups([]);
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      alert("Gagal menghubungi server");
    }
    setIsResetting(false);
  };

  return (
    <div className="bg-white min-h-screen pb-4">
      <Navbar />
      <Space />
      <div className="bg-white p-6 rounded-xl shadow-md border max-w-5xl mx-auto space-y-8 px-4 md:px-0">
        <div className="flex justify-end px-4">
            <button 
                onClick={handleLogout} 
                disabled={isResetting || status === 'server_off'}
                className="text-xs bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold hover:bg-red-200 transition flex items-center gap-1 disabled:opacity-50"
            >
                {isResetting ? "Mereset..." : "🔄 Reset / Ganti Akun"}
            </button>
        </div>
        {status === "server_off" && (
          <div className="text-red-500 bg-red-50 p-4 rounded-lg border border-red-200">
            ⚠️ <strong>Server Mati</strong> <br />
            Silakan jalankan <code>node server.js</code> di terminal backend.
          </div>
        )}

        {status === "disconnected" && !qrCode && (
          <div className="text-gray-500 text-center py-10">
            <div className="animate-pulse">
              ⏳ Menunggu QR Code dari server...
            </div>
          </div>
        )}

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

        {status === "connected" && (
          <div className="text-gray-800 flex flex-col px-6 animate-in fade-in zoom-in">
            <h2 className="text-xl font-bold text-center text-green-600 mb-6">
              ✅ Whatsapp Terhubung!
            </h2>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  setTargetType("personal");
                  setFormData({ ...formData, number: "" });
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  targetType === "personal"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                👤 Pribadi
              </button>
              <button
                onClick={() => {
                  setTargetType("group");
                  setFormData({ ...formData, number: "" });
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  targetType === "group"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                👥 Grup
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block mb-1">
                {targetType === "personal"
                  ? "Nomor Telepon (Format: 628...)"
                  : "Pilih Grup Whatsapp"}
              </label>

              {targetType === "personal" ? (
                <input
                  type="text"
                  required
                  placeholder="628123456789"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
              ) : (
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                >
                  <option value="">Pilih Grup Tujuan</option>
                  {groups.length > 0 ? (
                    groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Mengambil data grup</option>
                  )}
                </select>
              )}
            </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-slate-500">
                  Bulan
                </label>
                <select
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.bulan}
                  onChange={(e) =>
                    setFormData({ ...formData, bulan: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Pilih Bulan
                  </option>
                  {daftarBulan.map((bulan, index) => (
                    <option key={index} value={bulan}>
                      {bulan}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-slate-500">
                  Tahun
                </label>
                <select
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.tahun}
                  onChange={(e) =>
                    setFormData({ ...formData, tahun: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Pilih Tahun
                  </option>
                  {daftarTahun.map((tahun, index) => (
                    <option key={index} value={tahun}>
                      {tahun}
                    </option>
                  ))}
                </select>
              </div>

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
