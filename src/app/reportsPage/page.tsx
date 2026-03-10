"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

type VendorReport = {
  id: number;
  bulan: string;
  tahun: string;
  fileName: string;
  filePath: string;
  emailSubject: string;
  receivedAt: string;
};

const daftarBulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

export default function ReportsPage() {
  const [reports, setReports] = useState<VendorReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastFetch, setLastFetch] = useState<string | null>(null);
  const [fetchResult, setFetchResult] = useState<string | null>(null);
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (data.status === "success") setReports(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadReports(); }, []);

  const handleFetch = async () => {
    setFetching(true);
    setFetchResult(null);
    try {
      const res = await fetch("/api/reports/fetch", { method: "POST" });
      const data = await res.json();
      if (data.status === "success") {
        setFetchResult(data.message);
        setLastFetch(new Date().toLocaleString("id-ID"));
        await loadReports();
      } else {
        setFetchResult("❌ Gagal: " + data.error);
      }
    } catch { setFetchResult("❌ Error koneksi ke server"); }
    finally { setFetching(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus laporan ini?")) return;
    try {
      const res = await fetch("/api/reports", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === "success") loadReports();
      else alert("Gagal menghapus");
    } catch { alert("Error koneksi"); }
  };

  const filtered = reports.filter(r =>
    (!filterBulan || r.bulan === filterBulan) &&
    (!filterTahun || r.tahun === filterTahun)
  );

  const tahunList = [...new Set(reports.map(r => r.tahun))].sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .rp-root { font-family: 'DM Sans', sans-serif; }
        .rp-root * { box-sizing: border-box; }
        .rp-page { min-height: 100vh; background: #0a0c14; color: #e2e8f0; }
        .rp-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; }
        .rp-label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
        .rp-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 9px 14px; font-size: 0.855rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s; }
        .rp-input:focus { border-color: rgba(99,179,237,0.45); }
        .rp-input option { background: #1a1d2e; }

        .rp-fetch-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 11px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: #fff; font-size: 0.855rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(99,102,241,0.25);
          transition: all 0.2s;
        }
        .rp-fetch-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(99,102,241,0.35); }
        .rp-fetch-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

        .rp-spin { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: rp-spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes rp-spin { to { transform: rotate(360deg); } }

        .rp-result-ok { background: rgba(72,199,142,0.08); border: 1px solid rgba(72,199,142,0.2); border-radius: 10px; padding: 10px 14px; font-size: 0.8rem; color: #48c78e; }
        .rp-result-err { background: rgba(240,82,82,0.08); border: 1px solid rgba(240,82,82,0.2); border-radius: 10px; padding: 10px 14px; font-size: 0.8rem; color: #f05252; }

        .rp-section-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .rp-section-sub { font-size: 0.78rem; color: rgba(255,255,255,0.28); margin-top: 2px; }

        .rp-table-wrap { overflow-x: auto; }
        .rp-table { width: 100%; border-collapse: collapse; font-size: 0.845rem; }
        .rp-table th { padding: 12px 16px; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap; }
        .rp-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
        .rp-table tr:last-child td { border-bottom: none; }
        .rp-table tr:hover td { background: rgba(255,255,255,0.02); }

        .rp-chip { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: rgba(99,179,237,0.1); border: 1px solid rgba(99,179,237,0.2); color: #63b3ed; white-space: nowrap; }

        .rp-download-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; font-weight: 600; color: #48c78e; background: rgba(72,199,142,0.08); border: 1px solid rgba(72,199,142,0.2); border-radius: 7px; padding: 5px 10px; text-decoration: none; transition: all 0.15s; white-space: nowrap; }
        .rp-download-btn:hover { background: rgba(72,199,142,0.14); border-color: rgba(72,199,142,0.35); }
        .rp-no-file { font-size: 0.75rem; color: rgba(255,255,255,0.2); }

        .rp-del-btn { font-size: 0.75rem; font-weight: 600; color: rgba(240,82,82,0.6); background: transparent; border: 1px solid rgba(240,82,82,0.15); border-radius: 7px; padding: 5px 12px; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .rp-del-btn:hover { color: #f05252; border-color: rgba(240,82,82,0.4); background: rgba(240,82,82,0.07); }

        .rp-empty { text-align: center; padding: 48px 16px; color: rgba(255,255,255,0.2); font-size: 0.875rem; }
        .rp-empty-icon { font-size: 2rem; margin-bottom: 8px; }

        .rp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .rp-stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 16px; }
        .rp-stat-val { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; }
        .rp-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.28); margin-top: 2px; }
      `}</style>

      <div className="rp-root rp-page">
        <Navbar />
        <Space />

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 20px 60px", display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Header + fetch button */}
          <div className="rp-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <div className="rp-section-title">📥 Laporan Vendor</div>
                <div className="rp-section-sub">Laporan masuk dari support@harrismaindonesia.com</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <button className="rp-fetch-btn" onClick={handleFetch} disabled={fetching}>
                  {fetching ? <><div className="rp-spin" /><span>Mengecek email...</span></> : <><span>🔄</span><span>Cek Email Baru</span></>}
                </button>
                {lastFetch && <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>Terakhir cek: {lastFetch}</span>}
              </div>
            </div>

            {fetchResult && (
              <div className={fetchResult.startsWith("❌") ? "rp-result-err" : "rp-result-ok"} style={{ marginTop: "14px" }}>
                {fetchResult.startsWith("❌") ? fetchResult : `✅ ${fetchResult}`}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="rp-stats">
            <div className="rp-stat-card">
              <div className="rp-stat-val">{reports.length}</div>
              <div className="rp-stat-label">Total Laporan</div>
            </div>
            <div className="rp-stat-card">
              <div className="rp-stat-val">{reports.filter(r => r.filePath).length}</div>
              <div className="rp-stat-label">Ada File</div>
            </div>
            <div className="rp-stat-card">
              <div className="rp-stat-val">{[...new Set(reports.map(r => r.tahun))].length}</div>
              <div className="rp-stat-label">Tahun Tercatat</div>
            </div>
          </div>

          {/* Filter + Table */}
          <div className="rp-card" style={{ overflow: "hidden" }}>
            {/* Filter bar */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div>
                <label className="rp-label">Bulan</label>
                <select className="rp-input" value={filterBulan} onChange={e => setFilterBulan(e.target.value)}>
                  <option value="">Semua bulan</option>
                  {daftarBulan.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="rp-label">Tahun</label>
                <select className="rp-input" value={filterTahun} onChange={e => setFilterTahun(e.target.value)}>
                  <option value="">Semua tahun</option>
                  {tahunList.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {(filterBulan || filterTahun) && (
                <button onClick={() => { setFilterBulan(""); setFilterTahun(""); }}
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "7px 12px", color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                  ✕ Reset
                </button>
              )}
              <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", alignSelf: "center" }}>
                {filtered.length} laporan
              </div>
            </div>

            <div className="rp-table-wrap">
              <table className="rp-table">
                <thead>
                  <tr>
                    <th>Periode</th>
                    <th>Subject Email</th>
                    <th>Tanggal Masuk</th>
                    <th>File</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.2)" }}>Memuat...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={5}>
                      <div className="rp-empty">
                        <div className="rp-empty-icon">📭</div>
                        {reports.length === 0 ? "Belum ada laporan. Klik \"Cek Email Baru\" untuk mulai." : "Tidak ada laporan untuk filter ini."}
                      </div>
                    </td></tr>
                  ) : filtered.map(r => (
                    <tr key={r.id}>
                      <td><span className="rp-chip">{r.bulan} {r.tahun}</span></td>
                      <td>
                        <div style={{ fontSize: "0.83rem", color: "#e2e8f0", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.emailSubject}
                        </div>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>
                        {new Date(r.receivedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                      </td>
                      <td>
                        {r.filePath ? (
                          <a href={r.filePath} download={r.fileName} className="rp-download-btn">
                            ⬇ {r.fileName.length > 20 ? r.fileName.slice(0, 20) + "..." : r.fileName}
                          </a>
                        ) : (
                          <span className="rp-no-file">Tidak ada file</span>
                        )}
                      </td>
                      <td>
                        <button className="rp-del-btn" onClick={() => handleDelete(r.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}