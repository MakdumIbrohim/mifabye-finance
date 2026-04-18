"use client";

import { useState } from "react";

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, label: "Jasa Boost Mythic", date: "16 Okt 2026, 14:20", amount: "Rp 450.000", type: "in", category: "Akademik", status: "Selesai" },
    { id: 2, label: "Langganan Server", date: "15 Okt 2026, 09:12", amount: "Rp 120.000", type: "out", category: "Teknologi", status: "Berhasil" },
    { id: 3, label: "Paket Master Hero", date: "12 Okt 2026, 21:05", amount: "Rp 85.000", type: "in", category: "Akademik", status: "Selesai" },
    { id: 4, label: "Pembuatan Website UMKM", date: "10 Okt 2026, 11:30", amount: "Rp 1.500.000", type: "in", category: "Teknologi", status: "Selesai" },
    { id: 5, label: "Biaya Listrik Kantor", date: "05 Okt 2026, 10:00", amount: "Rp 350.000", type: "out", category: "Operasional", status: "Berhasil" },
    { id: 6, label: "Jasa Penulisan Jurnal", date: "02 Okt 2026, 16:45", amount: "Rp 750.000", type: "in", category: "Akademik", status: "Selesai" },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === "all" || t.type === filter;
    const matchesSearch = t.label.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Riwayat Transaksi</h1>
        <p className="text-sm text-slate-500">Daftar lengkap seluruh arus kas masuk dan keluar tim.</p>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="subtle-card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Total Pemasukan (Bulan Ini)</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-primary">Rp 2.785.000</h2>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
        </div>
        <div className="subtle-card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Total Pengeluaran (Bulan Ini)</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-red-500">Rp 470.000</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Stabil</span>
          </div>
        </div>
      </div>

      <div className="subtle-card p-0 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-6 border-b border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-subtle p-1 rounded-xl w-fit border border-border-light">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "all" ? "bg-white text-primary shadow-sm shadow-primary/10" : "text-slate-500 hover:text-slate-700"}`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter("in")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "in" ? "bg-white text-primary shadow-sm shadow-primary/10" : "text-slate-500 hover:text-slate-700"}`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setFilter("out")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "out" ? "bg-white text-red-500 shadow-sm shadow-red-500/10" : "text-slate-500 hover:text-slate-700"}`}
            >
              Pengeluaran
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <input 
              type="text" 
              placeholder="Cari transaksi atau kategori..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-subtle border border-border-light rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-subtle border-b border-border-light">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Keterangan</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-subtle/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">{t.label}</p>
                    <p className="text-[10px] text-slate-400">ID: TRX-{t.id}001X</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-primary px-2 py-1 bg-primary-light rounded">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500">{t.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-tight px-2 py-1 rounded-full ${
                      t.status === "Selesai" || t.status === "Berhasil" 
                        ? "bg-green-50 text-green-600" 
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`text-sm font-bold ${t.type === "in" ? "text-primary" : "text-red-500"}`}>
                      {t.type === "in" ? "+" : "-"}{t.amount}
                    </p>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-sm text-slate-400 font-medium">Tidak ada transaksi yang ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
