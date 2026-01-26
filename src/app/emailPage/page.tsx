"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Space from "../components/atoms/Space/page";

type EmailJob = {
  id: number;
  to: string;
  subject: string;
  body: string;
  bulan: string;
  tahun: string;
  sendAt: string;
  status: string;
};

export default function EmailPage() {
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
    to: "support@harrismaindonesia.com",
    subject: "Request LogBook Activity ke datacenter, Rack 1a0212",
    body: "",
    bulan: "",
    tahun: "",
    sendAt: "",
  });

  useEffect(() => {
    if (formData.bulan && formData.tahun) {
      setFormData((prev) => ({
        ...prev,
        subject: `Request LogBook Activity ke datacenter, Rack 1a0212 Periode ${prev.bulan} Tahun ${prev.tahun}`,
      }));
    }
  }, [formData.bulan, formData.tahun]);

  const [history, setHistory] = useState<EmailJob[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    loadData();

    const intervalId = setInterval(() => {
      console.log("Cron triggered");

      fetch("/api/cron")
        .then((res) => res.json())
        .then((data) => {
          console.log("Hasil Cron:", data);
          loadData();
        });
    }, 60000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Berhasil dijadwalkan!");
      setFormData({ ...formData, body: "", subject: "" });
      loadData();
    } else {
      alert("Gagal menyimpan.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus data ini?")) return;

    const res = await fetch("/api/schedule", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      loadData(); 
    } else {
      alert("Gagal menghapus");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "SENT")
      return "bg-green-100 text-green-800 border-green-200";
    if (status === "FAILED") return "bg-red-100 text-red-800 border-red-200";
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <Space />
      <div className="max-w-5xl mx-auto space-y-8 px-4 md:px-0">
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky">
            <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
              Kirim Email Baru
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500 ">
                  Kirim Ke (Jika penerima lebih dari 1, pisahkan
                  dengan koma). Contoh: hilmy@ainosi.com, nadia@ainosi.com
                </label>
                <input
                  type="email"
                  multiple
                  required
                  className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 ">
                  Subjek Email
                </label>
                <input
                  type="text"
                  disabled
                  className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-300"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">
                  Bulan
                </label>
                <select
                  required
                  className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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

              <div>
                <label className="text-xs font-bold text-slate-500">
                  Tahun
                </label>
                <select
                  required
                  className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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

              <div>
                <label className="text-xs font-bold text-slate-500 ">
                  Waktu Kirim
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full mt-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.sendAt}
                  onChange={(e) =>
                    setFormData({ ...formData, sendAt: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-white py-2 rounded font-semibold hover:bg-blue-900 transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Buat Jadwal"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-lg text-slate-700">
                Riwayat Pengiriman Email
              </h2>
            </div>

            <div className="overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-500 border-b">
                  <tr>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Tujuan</th>
                    <th className="p-4 font-semibold">Jadwal Kirim</th>
                    <th className="p-4 font-semibold">Bulan</th>
                    <th className="p-4 font-semibold">Tahun</th>
                    <th className="p-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-slate-400"
                      >
                        Belum ada jadwal. Yuk buat satu!
                      </td>
                    </tr>
                  ) : (
                    history.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50 transition">
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-slate-900">
                            {job.to}
                          </div>
                          <div className="text-xs text-slate-500">
                            {job.subject}
                          </div>
                        </td>
                        <td className="p-4 text-slate-600">
                          {new Date(job.sendAt).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="p-4 text-slate-500 max-w-xs truncate">
                          {job.bulan}
                        </td>
                        <td className="p-4 text-slate-500 max-w-xs truncate">
                          {job.tahun}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="text-red-600 hover:text-red-800 font-bold"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Space />
      </div>
    </div>
  );
}
