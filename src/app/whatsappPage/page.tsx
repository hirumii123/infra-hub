"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

const daftarBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const daftarTahun = [2026, 2027, 2028, 2029, 2030];

export default function WhatsappPage() {
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [targetType, setTargetType] = useState<"personal" | "group">("personal");
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    number: "",
    sendAt: "",
    message: "",
    tahun: "",
    bulan: "",
  });
  const [scheduledList, setScheduledList] = useState<{ id: string; chatId: string; message: string; sendAt: number; sendAtFormatted: string }[]>([]);

  const fetchScheduled = useCallback(async () => {
    try {
      const res = await fetch("/api/whatsapp/schedule");
      const data = await res.json();
      if (data.status === "success") setScheduledList(data.data);
    } catch {}
  }, []);

  const cancelSchedule = async (id: string) => {
    if (!confirm("Batalkan jadwal ini?")) return;
    try {
      const res = await fetch("/api/whatsapp/schedule", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        alert("Jadwal dibatalkan!");
        fetchScheduled();
      }
    } catch {}
  };

  useEffect(() => {
    if (formData.bulan && formData.tahun) {
      setFormData((prev) => ({
        ...prev,
        message: `Yth. Bapak Ibu Tim Harrisma,

Semoga Bapak/Ibu dalam keadaan baik.
Melalui email ini, kami bermaksud menyampaikan pengajuan terkait LogBook Activity serta SLA Report ke Datacenter, untuk penggunaan Rack 1a0212 Periode ${prev.bulan} Tahun ${prev.tahun}.

Sehubungan dengan hal tersebut, kami memohon kesediaan Bapak/Ibu untuk dapat mengirimkan laporan dimaksud dalam waktu dekat.
Dokumen laporan tersebut kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal.

*Apabila Bapak/Ibu telah mengirimkan laporan tersebut sebelumnya, mohon kiranya pesan ini dapat diabaikan.*

Demikian permohonan ini kami sampaikan. Atas perhatian, bantuan, dan kerja sama yang baik, kami ucapkan terima kasih.

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
      const res = await fetch("/api/whatsapp/status");
      const data = await res.json();
      setStatus(data.status);
      setQrCode(data.qr);
    } catch (error) {
      console.error("Gagal connect ke server WA", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    checkStatus();
    fetchScheduled();
    const interval = setInterval(() => {
      checkStatus();
      fetchScheduled();
    }, 5000);
    return () => clearInterval(interval);
  }, [checkStatus, fetchScheduled]);

  useEffect(() => {
    if (status !== "connected") return;
    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/whatsapp/groups");
        const result = await res.json();
        if (result.status === "success") setGroups(result.data);
      } catch (error) {
        console.error("Gagal ambil data grup", error);
      }
    };
    fetchGroups();
  }, [status]);

  const handleTestSend = async () => {
    if (!formData.number) {
      alert("❌ Harap isi nomor tujuan atau pilih grup!");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/whatsapp/send", {
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
        alert(formData.sendAt
          ? `Pesan dijadwalkan: ${new Date(formData.sendAt).toLocaleString()}`
          : "Pesan berhasil terkirim!"
        );
        setFormData((prev) => ({ ...prev, message: "", number: "", sendAt: "" }));
      } else {
        alert("Gagal: " + (result.error || result.message));
      }
    } catch (error) {
      alert("Error: Server tidak bisa dihubungi.");
    } finally {
      setIsSending(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("Yakin ingin menghapus sesi?")) return;
    setIsResetting(true);
    try {
      const res = await fetch("/api/whatsapp/logout", { method: "POST" });
      const data = await res.json();
      if (data.status === "success") {
        alert("Sesi berhasil dihapus!");
        setStatus("disconnected");
        setQrCode(null);
        setGroups([]);
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      alert("Gagal menghubungi server");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-4">
      <Navbar />
      <Space />
      <div className="bg-white p-6 rounded-xl shadow-md border max-w-5xl mx-auto space-y-8 px-4 md:px-0">
        <div className="flex justify-end px-4">
          <button
            onClick={handleLogout}
            disabled={isResetting || status === "disconnected"}
            className="text-xs bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold hover:bg-red-200 transition flex items-center gap-1 disabled:opacity-50"
          >
            {isResetting ? "Mereset..." : "🔄 Reset / Ganti Akun"}
          </button>
        </div>

        {(status === "disconnected" || status === "error") && !qrCode && (
          <div className="text-gray-500 text-center py-10">
            <div className="animate-pulse">⏳ Menunggu koneksi WhatsApp...</div>
            <p className="text-xs mt-2 text-gray-400">Klik Aktifkan WhatsApp di navbar jika belum</p>
          </div>
        )}

        {/* ✅ QR sekarang pakai <img> karena sudah berupa data URL dari server */}
        {status === "scanning" && qrCode && (
          <div className="flex flex-col items-center animate-in fade-in">
            <p className="mb-4 text-sm text-gray-600 font-medium">
              Buka WhatsApp di HP {">"} Perangkat Tertaut {">"} Scan QR ini
            </p>
            <div className="p-4 bg-white border-2 border-gray-800 rounded-lg shadow-sm">
              <img src={qrCode} alt="QR Code WhatsApp" width={256} height={256} />
            </div>
          </div>
        )}

        {(status === "connected" || status === "authenticated") && (
          <div className="text-gray-800 flex flex-col px-6 animate-in fade-in zoom-in">
            <h2 className="text-xl font-bold text-center text-green-600 mb-6">
              ✅ Whatsapp Terhubung!
            </h2>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => { setTargetType("personal"); setFormData((p) => ({ ...p, number: "" })); }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${targetType === "personal" ? "bg-blue-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                👤 Pribadi
              </button>
              <button
                onClick={() => { setTargetType("group"); setFormData((p) => ({ ...p, number: "" })); }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${targetType === "group" ? "bg-blue-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                👥 Grup
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block mb-1">
                {targetType === "personal" ? "Nomor Telepon (Format: 628...)" : "Pilih Grup Whatsapp"}
              </label>
              {targetType === "personal" ? (
                <input
                  type="text"
                  placeholder="628123456789"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={formData.number}
                  onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))}
                />
              ) : (
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.number}
                  onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))}
                >
                  <option value="">Pilih Grup Tujuan</option>
                  {groups.length > 0
                    ? groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)
                    : <option disabled>Mengambil data grup...</option>
                  }
                </select>
              )}
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500">Bulan</label>
              <select
                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.bulan}
                onChange={(e) => setFormData((p) => ({ ...p, bulan: e.target.value }))}
              >
                <option value="" disabled>Pilih Bulan</option>
                {daftarBulan.map((b, i) => <option key={i} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500">Tahun</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.tahun}
                onChange={(e) => setFormData((p) => ({ ...p, tahun: e.target.value }))}
              >
                <option value="" disabled>Pilih Tahun</option>
                {daftarTahun.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 block">Waktu Pengiriman (Opsional)</label>
              <p className="text-[10px] text-gray-400 mb-1">*Kosongkan jika ingin kirim sekarang</p>
              <input
                type="datetime-local"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                value={formData.sendAt}
                onChange={(e) => setFormData((p) => ({ ...p, sendAt: e.target.value }))}
              />
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 block mb-1">Pesan Whatsapp</label>
              <textarea
                rows={4}
                placeholder="Tulis pesan anda disini..."
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              />
            </div>

            <button
              onClick={handleTestSend}
              disabled={isSending}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                isSending ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl active:scale-95"
              }`}
            >
              {isSending ? <>⏳ Memproses...</> : formData.sendAt ? <>📅 Jadwalkan Pesan</> : <>🚀 Kirim Sekarang</>}
            </button>

            {/* Daftar Jadwal */}
            {scheduledList.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-bold text-slate-500 mb-2">📅 Pesan Terjadwal ({scheduledList.length})</h3>
                <div className="space-y-2">
                  {scheduledList.map((s) => (
                    <div key={s.id} className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-blue-700">⏰ {s.sendAtFormatted}</p>
                        <p className="text-xs text-gray-500 truncate">→ {s.chatId.replace("@c.us", "").replace("@g.us", " (grup)")}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{s.message.slice(0, 60)}...</p>
                      </div>
                      <button
                        onClick={() => cancelSchedule(s.id)}
                        className="text-red-400 hover:text-red-600 text-xs font-bold shrink-0"
                      >
                        ✕ Batal
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}