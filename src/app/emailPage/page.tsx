"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

type EmailJob = {
  id: number;
  to: string;
  cc?: string;
  subject: string;
  body: string;
  bulan: string;
  tahun: string;
  sendAt: string;
  status: string;
};

const daftarBulan = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];
const daftarTahun = [2026, 2027, 2028, 2029, 2030];

function buildSendAt(sendAt: string, bulanLaporanIndex: number): string {
  if (!sendAt) return sendAt;
  const date = new Date(sendAt);
  date.setMonth(bulanLaporanIndex + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// Parse CC string jadi array, trim whitespace
function parseCc(cc: string): string[] {
  return cc.split(",").map(s => s.trim()).filter(Boolean);
}

export default function EmailPage() {
  const [formData, setFormData] = useState({ to: "support@harrismaindonesia.com", cc: "", tahun: "", sendAt: "" });
  const [bulanDari, setBulanDari] = useState("");
  const [bulanSampai, setBulanSampai] = useState("");
  const [history, setHistory] = useState<EmailJob[]>([]);
  const [loading, setLoading] = useState(false);

  const getBulanRange = (): string[] => {
    if (!bulanDari || !bulanSampai) return [];
    const a = daftarBulan.indexOf(bulanDari), b = daftarBulan.indexOf(bulanSampai);
    if (a < 0 || b < 0 || a > b) return [];
    return daftarBulan.slice(a, b + 1);
  };
  const bulanDipilih = getBulanRange();

  const buildBody = (bulan: string, tahun: string) =>
    `Yth. Bapak Ibu Tim Harrisma,\n\nSemoga Bapak/Ibu dalam keadaan baik.\nMelalui email ini, kami bermaksud menyampaikan pengajuan terkait LogBook Activity serta SLA Report ke Datacenter, untuk penggunaan Rack 1a0212 Periode ${bulan} Tahun ${tahun}.\n\nSehubungan dengan hal tersebut, kami memohon kesediaan Bapak/Ibu untuk dapat mengirimkan laporan dimaksud dalam waktu dekat.\nDokumen laporan tersebut kami perlukan sebagai bagian dari proses evaluasi dan dokumentasi internal.\n\n*Ini adalah pesan otomatis. Aabila Bapak/Ibu telah mengirimkan laporan tersebut sebelumnya, mohon kiranya pesan ini dapat diabaikan.*\n\nDemikian permohonan ini kami sampaikan. Atas perhatian, bantuan, dan kerja sama yang baik, kami ucapkan terima kasih.\n\nHormat kami,\nTim Kolektif Laporan\nPT. AINO Indonesia`;

  const loadData = async () => {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (Array.isArray(data)) setHistory(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    loadData();
    const id = setInterval(() => fetch("/api/cron").then(r => r.json()).then(() => loadData()), 60000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulanDipilih.length) { alert("Pilih rentang bulan."); return; }
    setLoading(true);
    let ok = 0, fail = 0;
    for (const bulan of bulanDipilih) {
      const idx = daftarBulan.indexOf(bulan);
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.to,
          cc: formData.cc.trim() || null,
          subject: `Request LogBook Activity dan Report SLA ke datacenter, Rack 1a0212 Periode ${bulan} Tahun ${formData.tahun}`,
          body: buildBody(bulan, formData.tahun),
          bulan, tahun: formData.tahun,
          sendAt: buildSendAt(formData.sendAt, idx),
        }),
      });
      res.ok ? ok++ : fail++;
    }
    alert(`✅ ${ok} job berhasil${fail > 0 ? `, ❌ ${fail} gagal` : ""}.`);
    setBulanDari(""); setBulanSampai("");
    setFormData(p => ({ ...p, sendAt: "", cc: "" }));
    loadData(); setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus jadwal ini?")) return;
    const res = await fetch("/api/schedule", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) loadData(); else alert("Gagal menghapus");
  };

  const idxDari = daftarBulan.indexOf(bulanDari);
  const bulanSampaiOptions = idxDari >= 0 ? daftarBulan.slice(idxDari) : daftarBulan;
  const previewJadwal = bulanDipilih.map((bulan) => {
    const idx = daftarBulan.indexOf(bulan);
    const s = buildSendAt(formData.sendAt, idx);
    return { bulan, label: formData.sendAt ? new Date(s).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "—" };
  });

  const statusStyle = (s: string) => {
    if (s === "SENT") return { bg: "rgba(72,199,142,0.12)", color: "#48c78e", border: "rgba(72,199,142,0.3)" };
    if (s === "FAILED") return { bg: "rgba(240,82,82,0.12)", color: "#f05252", border: "rgba(240,82,82,0.3)" };
    return { bg: "rgba(250,202,21,0.12)", color: "#d4a017", border: "rgba(250,202,21,0.3)" };
  };

  const ccList = parseCc(formData.cc);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .ep-root { font-family: 'DM Sans', sans-serif; }
        .ep-root * { box-sizing: border-box; }
        .ep-page { min-height: 100vh; background: #0a0c14; color: #e2e8f0; }
        .ep-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; backdrop-filter: blur(10px); }
        .ep-label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px; }
        .ep-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 14px; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .ep-input:focus { border-color: rgba(99,179,237,0.5); box-shadow: 0 0 0 3px rgba(99,179,237,0.08); }
        .ep-input option { background: #1a1d2e; color: #e2e8f0; }
        .ep-input:disabled { opacity: 0.4; cursor: not-allowed; }
        .ep-select-row { display: flex; gap: 10px; align-items: center; }
        .ep-divider-label { font-size: 0.75rem; color: rgba(255,255,255,0.25); white-space: nowrap; font-weight: 500; }

        /* CC tags */
        .ep-cc-wrap {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 8px 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ep-cc-wrap:focus-within {
          border-color: rgba(167,139,250,0.45);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.07);
        }
        .ep-cc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
        .ep-cc-tag {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(167,139,250,0.12); border: 1px solid rgba(167,139,250,0.25);
          color: #a78bfa; font-size: 0.72rem; font-weight: 500;
          padding: 3px 8px; border-radius: 20px;
        }
        .ep-cc-input {
          width: 100%; background: transparent; border: none; outline: none;
          font-size: 0.855rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0;
          padding: 2px 0;
        }
        .ep-cc-input::placeholder { color: rgba(255,255,255,0.18); }
        .ep-cc-hint { font-size: 0.68rem; color: rgba(255,255,255,0.18); margin-top: 5px; }

        .ep-preview-box { background: rgba(99,179,237,0.04); border: 1px solid rgba(99,179,237,0.12); border-radius: 12px; padding: 14px 16px; }
        .ep-preview-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(99,179,237,0.6); margin-bottom: 10px; }
        .ep-preview-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .ep-preview-row:last-child { border-bottom: none; }
        .ep-chip { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: rgba(99,179,237,0.1); border: 1px solid rgba(99,179,237,0.2); color: #63b3ed; white-space: nowrap; }
        .ep-arrow { color: rgba(255,255,255,0.2); font-size: 0.75rem; }
        .ep-time { font-size: 0.75rem; color: rgba(255,255,255,0.5); white-space: nowrap; font-weight: 500; }
        .ep-textarea { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 14px; font-size: 0.8rem; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.4); outline: none; resize: none; line-height: 1.6; }
        .ep-btn { width: 100%; padding: 12px; border-radius: 12px; font-size: 0.875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; letter-spacing: 0.02em; cursor: pointer; border: none; background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: #fff; transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(99,102,241,0.3); }
        .ep-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.4); }
        .ep-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
        .ep-table-wrap { overflow-x: auto; }
        .ep-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .ep-table th { padding: 12px 16px; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap; }
        .ep-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
        .ep-table tr:last-child td { border-bottom: none; }
        .ep-table tr:hover td { background: rgba(255,255,255,0.02); }
        .ep-status-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
        .ep-status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .ep-del-btn { font-size: 0.75rem; font-weight: 600; color: rgba(240,82,82,0.6); background: transparent; border: 1px solid rgba(240,82,82,0.15); border-radius: 7px; padding: 5px 12px; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .ep-del-btn:hover { color: #f05252; border-color: rgba(240,82,82,0.4); background: rgba(240,82,82,0.07); }
        .ep-empty { text-align: center; padding: 48px 16px; color: rgba(255,255,255,0.2); font-size: 0.875rem; }
        .ep-empty-icon { font-size: 2rem; margin-bottom: 8px; }
        .ep-section-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .ep-section-sub { font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-top: 2px; }
        .ep-form-field { display: flex; flex-direction: column; }
        .ep-grid { display: grid; gap: 16px; }
      `}</style>

      <div className="ep-root ep-page">
        <Navbar />
        <Space />

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 60px" }}>
          <div className="ep-grid" style={{ gridTemplateColumns: "1fr" }}>

            {/* ── Form Card ── */}
            <div className="ep-card" style={{ padding: "28px 28px 32px" }}>
              <div style={{ marginBottom: "24px" }}>
                <div className="ep-section-title">✉ Jadwalkan Email</div>
                <div className="ep-section-sub">Buat jadwal pengiriman request laporan otomatis</div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="ep-grid" style={{ gap: "18px" }}>

                  {/* To */}
                  <div className="ep-form-field">
                    <label className="ep-label">Kirim Ke (To)</label>
                    <input className="ep-input" type="email" multiple required placeholder="email@contoh.com" value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} />
                  </div>

                  {/* CC */}
                  <div className="ep-form-field">
                    <label className="ep-label">CC <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(255,255,255,0.18)" }}>(opsional)</span></label>
                    <div className="ep-cc-wrap">
                      {/* Tag preview */}
                      {ccList.length > 0 && (
                        <div className="ep-cc-tags">
                          {ccList.map((email, i) => (
                            <span key={i} className="ep-cc-tag">
                              {email}
                            </span>
                          ))}
                        </div>
                      )}
                      <input
                        className="ep-cc-input"
                        type="text"
                        placeholder="cc@contoh.com, cc2@contoh.com"
                        value={formData.cc}
                        onChange={e => setFormData({ ...formData, cc: e.target.value })}
                      />
                    </div>
                    <span className="ep-cc-hint">Pisahkan beberapa alamat CC dengan koma</span>
                  </div>

                  {/* Tahun */}
                  <div className="ep-form-field">
                    <label className="ep-label">Tahun Laporan</label>
                    <select className="ep-input" required value={formData.tahun} onChange={e => setFormData({ ...formData, tahun: e.target.value })}>
                      <option value="" disabled>Pilih tahun...</option>
                      {daftarTahun.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* Rentang Bulan */}
                  <div className="ep-form-field">
                    <label className="ep-label">Rentang Bulan Laporan</label>
                    <div className="ep-select-row">
                      <select className="ep-input" required value={bulanDari} onChange={e => { setBulanDari(e.target.value); setBulanSampai(""); }}>
                        <option value="" disabled>Dari...</option>
                        {daftarBulan.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <span className="ep-divider-label">hingga</span>
                      <select className="ep-input" required disabled={!bulanDari} value={bulanSampai} onChange={e => setBulanSampai(e.target.value)}>
                        <option value="" disabled>Sampai...</option>
                        {bulanSampaiOptions.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Waktu Kirim */}
                  <div className="ep-form-field">
                    <label className="ep-label">Tanggal & Jam Kirim</label>
                    <input className="ep-input" type="datetime-local" required value={formData.sendAt} onChange={e => setFormData({ ...formData, sendAt: e.target.value })} />
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", marginTop: "5px" }}>Tanggal & jam ini dipakai untuk semua bulan, hanya bulannya yang disesuaikan otomatis</span>
                  </div>

                  {/* Preview jadwal */}
                  {bulanDipilih.length > 0 && (
                    <div className="ep-preview-box">
                      <div className="ep-preview-title">{bulanDipilih.length} job akan dibuat</div>
                      {previewJadwal.map(({ bulan, label }) => (
                        <div key={bulan} className="ep-preview-row">
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span className="ep-chip">Laporan {bulan} {formData.tahun}</span>
                            <span className="ep-arrow">→</span>
                          </div>
                          <span className="ep-time">{label}</span>
                        </div>
                      ))}
                      {/* Tampilkan CC di preview jika ada */}
                      {ccList.length > 0 && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>CC:</span>
                          {ccList.map((e, i) => (
                            <span key={i} style={{ fontSize: "0.68rem", background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)", color: "#a78bfa", padding: "2px 8px", borderRadius: 20 }}>{e}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Preview body */}
                  {bulanDipilih.length > 0 && formData.tahun && (
                    <div className="ep-form-field">
                      <label className="ep-label">Pratinjau Isi Email ({bulanDipilih[0]})</label>
                      <textarea className="ep-textarea" readOnly rows={7} value={buildBody(bulanDipilih[0], formData.tahun)} />
                    </div>
                  )}

                  <button type="submit" className="ep-btn" disabled={loading || bulanDipilih.length === 0}>
                    {loading ? "⏳ Membuat job..." : bulanDipilih.length > 0 ? `Buat ${bulanDipilih.length} Jadwal` : "Buat Jadwal"}
                  </button>

                </div>
              </form>
            </div>

            {/* ── Riwayat Card ── */}
            <div className="ep-card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="ep-section-title">📋 Riwayat Pengiriman</div>
                <div className="ep-section-sub">{history.length} total jadwal tersimpan</div>
              </div>
              <div className="ep-table-wrap">
                <table className="ep-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Tujuan</th>
                      <th>Jadwal Kirim</th>
                      <th>Periode</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length === 0 ? (
                      <tr><td colSpan={5}><div className="ep-empty"><div className="ep-empty-icon">📭</div>Belum ada jadwal. Buat yang pertama!</div></td></tr>
                    ) : history.map(job => {
                      const s = statusStyle(job.status);
                      return (
                        <tr key={job.id}>
                          <td>
                            <span className="ep-status-badge" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                              <span className="ep-status-dot" />{job.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: 500, color: "#e2e8f0", fontSize: "0.83rem" }}>{job.to}</div>
                            {job.cc && (
                              <div style={{ fontSize: "0.68rem", color: "rgba(167,139,250,0.6)", marginTop: "2px" }}>
                                CC: {job.cc}
                              </div>
                            )}
                            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", marginTop: "2px", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{job.subject}</div>
                          </td>
                          <td style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                            {new Date(job.sendAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                          </td>
                          <td><span className="ep-chip">{job.bulan} {job.tahun}</span></td>
                          <td><button className="ep-del-btn" onClick={() => handleDelete(job.id)}>Hapus</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}