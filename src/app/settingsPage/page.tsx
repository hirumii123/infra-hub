"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

export default function SettingsPage() {
  const [adminNumber, setAdminNumber] = useState("");
  const [intervalMinutes, setIntervalMinutes] = useState("60");
  const [savedAdminNumber, setSavedAdminNumber] = useState("");
  const [savedInterval, setSavedInterval] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const intervalLabel: Record<string, string> = {
    "5": "Setiap 5 menit",
    "15": "Setiap 15 menit",
    "30": "Setiap 30 menit",
    "60": "Setiap 1 jam",
    "120": "Setiap 2 jam",
  };

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        if (data.status === "success") {
          setAdminNumber(data.data.admin_wa_number || "");
          setIntervalMinutes(data.data.poll_interval_minutes || "60");
          setSavedAdminNumber(data.data.admin_wa_number || "");
          setSavedInterval(data.data.poll_interval_minutes || "60");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_wa_number: adminNumber,
          poll_interval_minutes: intervalMinutes,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setSaved(true);
        setSavedAdminNumber(adminNumber);
        setSavedInterval(intervalMinutes);
      } else setError(data.error || "Gagal menyimpan");
    } catch { setError("Error koneksi ke server"); }
    finally { setSaving(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .sp-root { font-family: 'DM Sans', sans-serif; }
        .sp-root * { box-sizing: border-box; }
        .sp-page { min-height: 100vh; background: #0a0c14; color: #e2e8f0; }
        .sp-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 28px; }
        .sp-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .sp-sub { font-size: 0.78rem; color: rgba(255,255,255,0.28); margin-bottom: 24px; }
        .sp-label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
        .sp-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 14px; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s; }
        .sp-input:focus { border-color: rgba(99,179,237,0.45); }
        .sp-input option { background: #1a1d2e; }
        .sp-hint { font-size: 0.72rem; color: rgba(255,255,255,0.2); margin-top: 6px; }
        .sp-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 20px 0; }
        .sp-save-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; border-radius: 11px; border: none; cursor: pointer; background: linear-gradient(135deg, #3b82f6, #6366f1); color: #fff; font-size: 0.875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 20px rgba(99,102,241,0.25); transition: all 0.2s; }
        .sp-save-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.35); }
        .sp-save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sp-success { background: rgba(72,199,142,0.08); border: 1px solid rgba(72,199,142,0.2); border-radius: 10px; padding: 10px 14px; font-size: 0.8rem; color: #48c78e; margin-top: 14px; }
        .sp-error { background: rgba(240,82,82,0.08); border: 1px solid rgba(240,82,82,0.2); border-radius: 10px; padding: 10px 14px; font-size: 0.8rem; color: #f05252; margin-top: 14px; }
        .sp-spin { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: sp-spin 0.7s linear infinite; }
        @keyframes sp-spin { to { transform: rotate(360deg); } }
        .sp-info-box { background: rgba(99,179,237,0.06); border: 1px solid rgba(99,179,237,0.15); border-radius: 12px; padding: 14px 16px; font-size: 0.8rem; color: rgba(99,179,237,0.8); line-height: 1.6; }
        .sp-saved-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; background: rgba(72,199,142,0.07); border: 1px solid rgba(72,199,142,0.18); border-radius: 8px; padding: 7px 12px; font-size: 0.78rem; color: #48c78e; }
        .sp-saved-badge span.label { color: rgba(255,255,255,0.25); margin-right: 2px; }
        .sp-saved-badge span.value { font-weight: 600; color: #48c78e; }
      `}</style>

      <div className="sp-root sp-page">
        <Navbar />
        <Space />

        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 20px 60px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header */}
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>⚙️ Pengaturan</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)", marginTop: "4px" }}>Konfigurasi notifikasi dan polling laporan</div>
          </div>

          {/* Info */}
          <div className="sp-info-box">
            ℹ️ Notifikasi WhatsApp akan dikirim otomatis ke nomor admin setiap kali laporan baru dari vendor ditemukan. Pastikan WhatsApp sudah terhubung di navbar.
          </div>

          {/* Form */}
          <div className="sp-card">
            <div className="sp-title">📱 Notifikasi WhatsApp</div>
            <div className="sp-sub">Nomor yang menerima notifikasi laporan masuk</div>

            {loading ? (
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>Memuat pengaturan...</div>
            ) : (
              <>
                <div style={{ marginBottom: "16px" }}>
                  <label className="sp-label">Nomor Admin WhatsApp</label>
                  <input
                    className="sp-input"
                    type="text"
                    placeholder="Contoh: 08123456789 atau 628123456789"
                    value={adminNumber}
                    onChange={e => { setAdminNumber(e.target.value); setSaved(false); }}
                  />
                  <div className="sp-hint">Format: 08xxx atau 628xxx — tanpa tanda + atau spasi</div>
                  {savedAdminNumber && (
                    <div className="sp-saved-badge">
                      ✓ <span className="label">Tersimpan:</span>
                      <span className="value">{savedAdminNumber}</span>
                    </div>
                  )}
                </div>

                <hr className="sp-divider" />

                <div className="sp-title">⏱️ Interval Polling</div>
                <div className="sp-sub" style={{ marginBottom: "16px" }}>Seberapa sering sistem cek email baru secara otomatis</div>

                <div style={{ marginBottom: "20px" }}>
                  <label className="sp-label">Interval</label>
                  <select className="sp-input" value={intervalMinutes} onChange={e => { setIntervalMinutes(e.target.value); setSaved(false); }}>
                    <option value="5">Setiap 5 menit</option>
                    <option value="15">Setiap 15 menit</option>
                    <option value="30">Setiap 30 menit</option>
                    <option value="60">Setiap 1 jam</option>
                    <option value="120">Setiap 2 jam</option>
                    <option value="1440">Setiap 24 jam</option>
                  </select>
                  <div className="sp-hint">Perubahan interval aktif setelah server restart atau reconnect WA</div>
                  {savedInterval && (
                    <div className="sp-saved-badge">
                      ✓ <span className="label">Tersimpan:</span>
                      <span className="value">{intervalLabel[savedInterval] || `${savedInterval} menit`}</span>
                    </div>
                  )}
                </div>

                <button className="sp-save-btn" onClick={handleSave} disabled={saving}>
                  {saving ? <><div className="sp-spin" /><span>Menyimpan...</span></> : <><span>💾</span><span>Simpan Pengaturan</span></>}
                </button>

                {saved && <div className="sp-success">✅ Pengaturan berhasil disimpan</div>}
                {error && <div className="sp-error">❌ {error}</div>}
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}