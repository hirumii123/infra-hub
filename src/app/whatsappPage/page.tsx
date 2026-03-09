"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

const daftarBulan = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];
const daftarTahun = [2026, 2027, 2028, 2029, 2030];

interface Contact {
  id: string;
  name: string;
  number: string;
  lastMessage: string;
  timestamp: number;
}

function formatContactTime(timestamp: number): string {
  if (!timestamp) return "";
  const d = new Date(timestamp * 1000);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function WhatsappPage() {
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [targetType, setTargetType] = useState<"personal" | "group">("personal");
  const [personalMode, setPersonalMode] = useState<"contacts" | "manual">("contacts");
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactSearch, setContactSearch] = useState("");
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [formData, setFormData] = useState({ number: "", sendAt: "", message: "", tahun: "", bulan: "" });
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
      if (data.status === "success") { alert("Jadwal dibatalkan!"); fetchScheduled(); }
    } catch {}
  };

  useEffect(() => {
    if (formData.bulan && formData.tahun) {
      setFormData(prev => ({
        ...prev,
        message: `Yth. Bapak Ibu Tim Harrisma,

Semoga Bapak/Ibu dalam keadaan baik.
Melalui email ini, kami bermaksud menyampaikan pengajuan terkait LogBook Activity serta SLA Report ke Datacenter, untuk penggunaan Rack 1a0212 Periode ${prev.bulan} Tahun ${prev.tahun}.

Sehubungan dengan hal tersebut, kami memohon kesediaan Bapak/Ibu untuk dapat mengirimkan laporan dimaksud dalam waktu dekat.
Dokumen laporan tersebut kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal.

*Ini adalah pesan otomatis. Apabila Bapak/Ibu telah mengirimkan laporan tersebut sebelumnya, mohon kiranya pesan ini dapat diabaikan.*

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
    } catch { setStatus("error"); }
  }, []);

  useEffect(() => {
    checkStatus(); fetchScheduled();
    const iv = setInterval(() => { checkStatus(); fetchScheduled(); }, 5000);
    return () => clearInterval(iv);
  }, [checkStatus, fetchScheduled]);

  useEffect(() => {
    if (status !== "connected") return;
    fetch("/api/whatsapp/groups").then(r => r.json()).then(r => { if (r.status === "success") setGroups(r.data); }).catch(() => {});
  }, [status]);

  // Fetch contacts saat mode personal+contacts aktif
  useEffect(() => {
    const isConnected = status === "connected" || status === "authenticated";
    if (!isConnected || targetType !== "personal" || personalMode !== "contacts") return;
    setIsLoadingContacts(true);
    fetch("/api/whatsapp/chats")
      .then(r => r.json())
      .then(d => { if (d.status === "success") setContacts(d.data); })
      .catch(() => {})
      .finally(() => setIsLoadingContacts(false));
  }, [status, targetType, personalMode]);

  const handleTestSend = async () => {
    if (!formData.number) { alert("❌ Harap isi nomor tujuan atau pilih kontak/grup!"); return; }
    setIsSending(true);
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: formData.number, message: formData.message, sendAt: formData.sendAt }),
      });
      const result = await res.json();
      if (result.status === "success") {
        alert(formData.sendAt ? `Pesan dijadwalkan: ${new Date(formData.sendAt).toLocaleString()}` : "Pesan berhasil terkirim!");
        setFormData(p => ({ ...p, message: "", number: "", sendAt: "" }));
      } else { alert("Gagal: " + (result.error || result.message)); }
    } catch { alert("Error: Server tidak bisa dihubungi."); }
    finally { setIsSending(false); }
  };

  const handleLogout = async () => {
    if (!confirm("Yakin ingin menghapus sesi?")) return;
    setIsResetting(true);
    try {
      const res = await fetch("/api/whatsapp/logout", { method: "POST" });
      const data = await res.json();
      if (data.status === "success") { alert("Sesi berhasil dihapus!"); setStatus("disconnected"); setQrCode(null); setGroups([]); }
      else alert("Gagal: " + data.message);
    } catch { alert("Gagal menghubungi server"); }
    finally { setIsResetting(false); }
  };

  const isConnected = status === "connected" || status === "authenticated";

  const avatarColor = (name: string) => {
    const colors = ["#63b3ed","#68d391","#f6ad55","#fc8181","#b794f4","#76e4f7"];
    return colors[(name || "A").charCodeAt(0) % colors.length];
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.number.includes(contactSearch)
  );

  // Format nomor untuk display setelah memilih kontak
  const selectedContact = contacts.find(c => c.id === formData.number);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .wp-root { font-family: 'DM Sans', sans-serif; }
        .wp-root * { box-sizing: border-box; }
        .wp-page { min-height: 100vh; background: #0a0c14; color: #e2e8f0; }
        .wp-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; }
        .wp-label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
        .wp-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 14px; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .wp-input:focus { border-color: rgba(99,179,237,0.45); box-shadow: 0 0 0 3px rgba(99,179,237,0.07); }
        .wp-input option { background: #1a1d2e; color: #e2e8f0; }
        .wp-input:disabled { opacity: 0.35; cursor: not-allowed; }
        .wp-input::placeholder { color: rgba(255,255,255,0.2); }
        .wp-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px 14px; font-size: 0.83rem; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.7); outline: none; resize: vertical; line-height: 1.65; transition: border-color 0.2s; }
        .wp-textarea:focus { border-color: rgba(99,179,237,0.4); }
        .wp-textarea::placeholder { color: rgba(255,255,255,0.18); }

        .wp-toggle-group { display: flex; gap: 0; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 4px; }
        .wp-toggle-btn { flex: 1; padding: 9px 16px; border-radius: 9px; font-size: 0.82rem; font-weight: 600; font-family: 'DM Sans', sans-serif; border: none; cursor: pointer; transition: all 0.2s ease; color: rgba(255,255,255,0.35); background: transparent; letter-spacing: 0.01em; }
        .wp-toggle-btn.active { background: rgba(99,179,237,0.15); color: #63b3ed; border: 1px solid rgba(99,179,237,0.25); }
        .wp-toggle-btn:hover:not(.active) { color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.04); }

        /* Sub-toggle (kontak/manual) */
        .wp-sub-toggle { display: flex; gap: 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 9px; padding: 3px; }
        .wp-sub-btn { flex: 1; padding: 6px 12px; border-radius: 7px; font-size: 0.75rem; font-weight: 600; font-family: 'DM Sans', sans-serif; border: none; cursor: pointer; transition: all 0.18s; color: rgba(255,255,255,0.3); background: transparent; }
        .wp-sub-btn.active { background: rgba(167,139,250,0.12); color: #a78bfa; border: 1px solid rgba(167,139,250,0.2); }
        .wp-sub-btn:hover:not(.active) { color: rgba(255,255,255,0.55); }

        /* Contact list (inline, compact) */
        .wp-contact-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; }
        .wp-contact-search { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 9px 14px 9px 36px; font-size: 0.835rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; }
        .wp-contact-search::placeholder { color: rgba(255,255,255,0.2); }
        .wp-contact-scroll { max-height: 200px; overflow-y: auto; }
        .wp-contact-scroll::-webkit-scrollbar { width: 3px; }
        .wp-contact-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 3px; }
        .wp-contact-row { display: flex; align-items: center; gap: 10px; padding: 9px 14px; cursor: pointer; transition: background 0.12s; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .wp-contact-row:last-child { border-bottom: none; }
        .wp-contact-row:hover { background: rgba(255,255,255,0.04); }
        .wp-contact-row.selected { background: rgba(167,139,250,0.08); }
        .wp-contact-av { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; }
        .wp-contact-name { font-size: 0.835rem; font-weight: 500; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wp-contact-num { font-size: 0.68rem; color: rgba(255,255,255,0.25); margin-top: 1px; }
        .wp-contact-time { font-size: 0.65rem; color: rgba(255,255,255,0.18); flex-shrink: 0; }
        .wp-contact-empty { padding: 24px; text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.2); }

        /* Selected contact chip */
        .wp-selected-chip { display: flex; align-items: center; gap: 8px; background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2); border-radius: 10px; padding: 8px 12px; }
        .wp-selected-chip-name { font-size: 0.835rem; font-weight: 500; color: #a78bfa; flex: 1; }
        .wp-selected-chip-clear { background: transparent; border: none; color: rgba(255,255,255,0.3); cursor: pointer; font-size: 0.9rem; padding: 0 2px; transition: color 0.15s; }
        .wp-selected-chip-clear:hover { color: rgba(255,255,255,0.7); }

        /* Spinner */
        .wp-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.06); border-top-color: rgba(99,179,237,0.5); border-radius: 50%; animation: wp-spin 0.7s linear infinite; }
        @keyframes wp-spin { to { transform: rotate(360deg); } }

        .wp-send-btn { width: 100%; padding: 13px; border-radius: 12px; font-size: 0.875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; border: none; cursor: pointer; transition: all 0.2s ease; background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: #fff; box-shadow: 0 4px 20px rgba(37,211,102,0.25); letter-spacing: 0.02em; }
        .wp-send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(37,211,102,0.35); }
        .wp-send-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
        .wp-send-btn.schedule { background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); box-shadow: 0 4px 20px rgba(99,102,241,0.25); }
        .wp-send-btn.schedule:hover:not(:disabled) { box-shadow: 0 6px 28px rgba(99,102,241,0.35); }

        .wp-reset-btn { font-size: 0.75rem; font-weight: 600; font-family: 'DM Sans', sans-serif; padding: 7px 14px; border-radius: 9px; border: 1px solid rgba(240,82,82,0.2); background: rgba(240,82,82,0.07); color: rgba(240,82,82,0.7); cursor: pointer; transition: all 0.15s; }
        .wp-reset-btn:hover:not(:disabled) { color: #f05252; border-color: rgba(240,82,82,0.4); background: rgba(240,82,82,0.12); }
        .wp-reset-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .wp-status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .wp-status-dot.connected { background: #48c78e; box-shadow: 0 0 8px rgba(72,199,142,0.6); animation: pulse-green 2s infinite; }
        .wp-status-dot.scanning { background: #f5a623; box-shadow: 0 0 8px rgba(245,166,35,0.5); animation: pulse-orange 1.5s infinite; }
        .wp-status-dot.disconnected { background: rgba(255,255,255,0.2); }
        @keyframes pulse-green { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        @keyframes pulse-orange { 0%,100%{opacity:1} 50%{opacity:0.5} }

        .wp-qr-box { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 28px; }
        .wp-qr-frame { padding: 16px; background: #fff; border-radius: 16px; box-shadow: 0 0 40px rgba(99,179,237,0.15); }
        .wp-qr-hint { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-align: center; line-height: 1.6; max-width: 260px; }

        .wp-sched-item { background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.15); border-radius: 12px; padding: 12px 14px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .wp-sched-time { font-size: 0.75rem; font-weight: 700; color: #818cf8; margin-bottom: 2px; }
        .wp-sched-to { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
        .wp-sched-msg { font-size: 0.72rem; color: rgba(255,255,255,0.25); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 280px; }
        .wp-cancel-btn { font-size: 0.72rem; font-weight: 600; font-family: 'DM Sans', sans-serif; padding: 4px 10px; border-radius: 7px; border: 1px solid rgba(240,82,82,0.15); background: transparent; color: rgba(240,82,82,0.5); cursor: pointer; transition: all 0.15s; white-space: nowrap; flex-shrink: 0; }
        .wp-cancel-btn:hover { color: #f05252; border-color: rgba(240,82,82,0.35); background: rgba(240,82,82,0.07); }

        .wp-section-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .wp-section-sub { font-size: 0.78rem; color: rgba(255,255,255,0.28); margin-top: 2px; }

        .wp-waiting { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px 24px; color: rgba(255,255,255,0.25); text-align: center; }
        .wp-waiting-spinner { width: 32px; height: 32px; border: 2px solid rgba(255,255,255,0.08); border-top-color: rgba(99,179,237,0.5); border-radius: 50%; animation: wp-spin 1s linear infinite; }
      `}</style>

      <div className="wp-root wp-page">
        <Navbar />
        <Space />

        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px 60px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Status + Reset */}
          <div className="wp-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <div className={`wp-status-dot ${isConnected ? "connected" : status === "scanning" ? "scanning" : "disconnected"}`} />
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: isConnected ? "#48c78e" : status === "scanning" ? "#f5a623" : "rgba(255,255,255,0.4)" }}>
                  {isConnected ? "WhatsApp Terhubung" : status === "scanning" ? "Menunggu Scan QR" : "Belum Terhubung"}
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", marginTop: "1px" }}>
                  {isConnected ? "Siap mengirim pesan" : status === "scanning" ? "Buka WA → Perangkat Tertaut → Scan" : "Klik Aktifkan WA di navbar"}
                </div>
              </div>
            </div>
            <button className="wp-reset-btn" onClick={handleLogout} disabled={isResetting || status === "disconnected"}>
              {isResetting ? "Mereset..." : "↺ Reset Sesi"}
            </button>
          </div>

          {/* QR Code */}
          {status === "scanning" && qrCode && (
            <div className="wp-card">
              <div className="wp-qr-box">
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,166,35,0.7)" }}>Scan QR Code</div>
                <div className="wp-qr-frame">
                  <img src={qrCode} alt="QR Code WhatsApp" width={220} height={220} />
                </div>
                <p className="wp-qr-hint">Buka WhatsApp di HP →<br />Perangkat Tertaut → Tautkan Perangkat → Scan</p>
              </div>
            </div>
          )}

          {/* Waiting */}
          {(status === "disconnected" || status === "error") && !qrCode && (
            <div className="wp-card">
              <div className="wp-waiting">
                <div className="wp-waiting-spinner" />
                <div style={{ fontSize: "0.85rem" }}>Menunggu koneksi WhatsApp...</div>
                <div style={{ fontSize: "0.75rem" }}>Klik <strong style={{ color: "rgba(255,255,255,0.5)" }}>Aktifkan WhatsApp</strong> di navbar untuk memulai</div>
              </div>
            </div>
          )}

          {/* Form Kirim */}
          {isConnected && (
            <div className="wp-card" style={{ padding: "24px" }}>
              <div style={{ marginBottom: "20px" }}>
                <div className="wp-section-title">💬 Kirim Pesan</div>
                <div className="wp-section-sub">Kirim langsung atau jadwalkan pengiriman</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* Toggle Pribadi / Grup */}
                <div>
                  <label className="wp-label">Tujuan</label>
                  <div className="wp-toggle-group">
                    <button type="button" className={`wp-toggle-btn ${targetType === "personal" ? "active" : ""}`}
                      onClick={() => { setTargetType("personal"); setFormData(p => ({ ...p, number: "" })); }}>
                      👤 Pribadi
                    </button>
                    <button type="button" className={`wp-toggle-btn ${targetType === "group" ? "active" : ""}`}
                      onClick={() => { setTargetType("group"); setFormData(p => ({ ...p, number: "" })); }}>
                      👥 Grup
                    </button>
                  </div>
                </div>

                {/* Personal: sub-toggle kontak/manual */}
                {targetType === "personal" && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label className="wp-label" style={{ margin: 0 }}>Nomor Tujuan</label>
                      <div className="wp-sub-toggle">
                        <button className={`wp-sub-btn ${personalMode === "contacts" ? "active" : ""}`}
                          onClick={() => { setPersonalMode("contacts"); setFormData(p => ({ ...p, number: "" })); }}>
                          👥 Kontak
                        </button>
                        <button className={`wp-sub-btn ${personalMode === "manual" ? "active" : ""}`}
                          onClick={() => { setPersonalMode("manual"); setFormData(p => ({ ...p, number: "" })); }}>
                          ✏️ Manual
                        </button>
                      </div>
                    </div>

                    {/* Mode: pilih kontak */}
                    {personalMode === "contacts" && (
                      <>
                        {/* Jika sudah pilih kontak, tampil chip */}
                        {formData.number && selectedContact ? (
                          <div className="wp-selected-chip">
                            <div className="wp-contact-av" style={{ width: 28, height: 28, background: avatarColor(selectedContact.name) + "22", color: avatarColor(selectedContact.name), border: `1px solid ${avatarColor(selectedContact.name)}44`, fontSize: "0.75rem" }}>
                              {selectedContact.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="wp-selected-chip-name">{selectedContact.name || selectedContact.number}</span>
                            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>{selectedContact.number}</span>
                            <button className="wp-selected-chip-clear" onClick={() => setFormData(p => ({ ...p, number: "" }))}>✕</button>
                          </div>
                        ) : (
                          <div className="wp-contact-box">
                            {/* Search */}
                            <div style={{ position: "relative" }}>
                              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", pointerEvents: "none" }} width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                              </svg>
                              <input className="wp-contact-search" placeholder="Cari nama atau nomor..." value={contactSearch} onChange={e => setContactSearch(e.target.value)} />
                            </div>
                            {/* List */}
                            <div className="wp-contact-scroll">
                              {isLoadingContacts ? (
                                <div className="wp-contact-empty" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                  <div className="wp-spin" /><span>Memuat kontak...</span>
                                </div>
                              ) : filteredContacts.length === 0 ? (
                                <div className="wp-contact-empty">{contactSearch ? "Kontak tidak ditemukan" : "Tidak ada kontak"}</div>
                              ) : filteredContacts.map(c => (
                                <div key={c.id} className={`wp-contact-row ${formData.number === c.id ? "selected" : ""}`}
                                  onClick={() => { setFormData(p => ({ ...p, number: c.id })); setContactSearch(""); }}>
                                  <div className="wp-contact-av" style={{ background: avatarColor(c.name) + "22", color: avatarColor(c.name), border: `1px solid ${avatarColor(c.name)}44` }}>
                                    {(c.name || c.number).charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="wp-contact-name">{c.name || c.number}</div>
                                    <div className="wp-contact-num">{c.number}</div>
                                  </div>
                                  <span className="wp-contact-time">{formatContactTime(c.timestamp)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Mode: input manual */}
                    {personalMode === "manual" && (
                      <input className="wp-input" type="text" placeholder="628123456789 atau 08123456789"
                        value={formData.number} onChange={e => setFormData(p => ({ ...p, number: e.target.value }))} />
                    )}
                  </div>
                )}

                {/* Grup */}
                {targetType === "group" && (
                  <div>
                    <label className="wp-label">Pilih Grup</label>
                    <select className="wp-input" value={formData.number} onChange={e => setFormData(p => ({ ...p, number: e.target.value }))}>
                      <option value="">Pilih grup tujuan...</option>
                      {groups.length > 0
                        ? groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)
                        : <option disabled>Mengambil data grup...</option>
                      }
                    </select>
                  </div>
                )}

                {/* Bulan & Tahun */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label className="wp-label">Bulan Laporan</label>
                    <select className="wp-input" value={formData.bulan} onChange={e => setFormData(p => ({ ...p, bulan: e.target.value }))}>
                      <option value="" disabled>Pilih bulan...</option>
                      {daftarBulan.map((b, i) => <option key={i} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="wp-label">Tahun</label>
                    <select className="wp-input" value={formData.tahun} onChange={e => setFormData(p => ({ ...p, tahun: e.target.value }))}>
                      <option value="" disabled>Pilih tahun...</option>
                      {daftarTahun.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Jadwal */}
                <div>
                  <label className="wp-label">Jadwal Kirim <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(255,255,255,0.18)" }}>(kosongkan = kirim sekarang)</span></label>
                  <input className="wp-input" type="datetime-local" value={formData.sendAt} onChange={e => setFormData(p => ({ ...p, sendAt: e.target.value }))} />
                </div>

                {/* Pesan */}
                <div>
                  <label className="wp-label">Isi Pesan</label>
                  <textarea className="wp-textarea" rows={7} placeholder="Tulis pesan di sini..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                </div>

                <button className={`wp-send-btn ${formData.sendAt ? "schedule" : ""}`} onClick={handleTestSend} disabled={isSending}>
                  {isSending ? "⏳ Memproses..." : formData.sendAt ? "📅 Jadwalkan Pesan" : "🚀 Kirim Sekarang"}
                </button>
              </div>
            </div>
          )}

          {/* Pesan Terjadwal */}
          {isConnected && scheduledList.length > 0 && (
            <div className="wp-card" style={{ padding: "20px 24px" }}>
              <div style={{ marginBottom: "14px" }}>
                <div className="wp-section-title">📅 Pesan Terjadwal</div>
                <div className="wp-section-sub">{scheduledList.length} pesan menunggu pengiriman</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {scheduledList.map(s => (
                  <div key={s.id} className="wp-sched-item">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="wp-sched-time">⏰ {s.sendAtFormatted}</div>
                      <div className="wp-sched-to">→ {s.chatId.replace("@c.us", "").replace("@g.us", " (grup)")}</div>
                      <div className="wp-sched-msg">{s.message.slice(0, 70)}...</div>
                    </div>
                    <button className="wp-cancel-btn" onClick={() => cancelSchedule(s.id)}>✕ Batal</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}