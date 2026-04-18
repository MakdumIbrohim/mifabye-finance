"use client";

import { useState } from "react";
import Link from "next/link";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";
import SearchableSelect from "@/components/SearchableSelect";

export default function DashboardPage() {
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  
  // Get today's date in Jakarta timezone (YYYY-MM-DD)
  const getTodayJakarta = () => {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
  };

  const [formData, setFormData] = useState({
    namaKlien: "",
    instansi: "",
    layanan: "",
    jumlah: "",
    tanggal: getTodayJakarta(),
    catatan: ""
  });

  // Mock data for the chart (last 7 days)
  const chartData = [
    { day: "Sen", income: 40, expense: 15, fullName: "Senin" },
    { day: "Sel", income: 35, expense: 45, fullName: "Selasa" },
    { day: "Rab", income: 65, expense: 30, fullName: "Rabu" },
    { day: "Kam", income: 50, expense: 20, fullName: "Kamis" },
    { day: "Jum", income: 85, expense: 55, fullName: "Jumat" },
    { day: "Sab", income: 70, expense: 10, fullName: "Sabtu" },
    { day: "Min", income: 95, expense: 40, fullName: "Minggu" },
  ];

  // Helper to generate SVG path
  const generatePath = (data: { value: number }[]) => {
    return data.map((d, i) => `${(i * 100) / (data.length - 1)},${100 - d.value}`).join(" ");
  };

  const incomePoints = generatePath(chartData.map(d => ({ value: d.income })));
  const expensePoints = generatePath(chartData.map(d => ({ value: d.expense })));

  // Mock for Recent Transactions
  const recentTransactions = [
    { id: 1, name: "Budi Santoso", instansi: "UNAIR", layanan: "Artikel Ilmiah", type: "in", amount: "Rp 350.000", status: "Selesai" },
    { id: 2, name: "Ani Wijaya", instansi: "ITS", layanan: "Web Dev", type: "in", amount: "Rp 1.200.000", status: "Pending" },
    { id: 3, name: "Sewa Server", instansi: "Internal", layanan: "Cloud", type: "out", amount: "Rp 150.000", status: "Berhasil" },
    { id: 4, name: "Doni Pratama", instansi: "UB", layanan: "Pembuatan PPT", type: "in", amount: "Rp 75.000", status: "Selesai" },
  ];

  // Helper to capitalize first letter of each word
  const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Beranda Dashboard</h1>
        <p className="text-sm text-slate-500">Catat transaksi dan pantau saldo tim Anda secara instan.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Input (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="subtle-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tight">Catat Transaksi</h3>
            <div className="flex bg-subtle p-1 rounded-xl mb-6 border border-border-light">
              <button
                onClick={() => setTransactionType("in")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "in" ? "bg-white text-primary shadow-sm shadow-primary/10" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Uang Masuk
              </button>
              <button
                onClick={() => setTransactionType("out")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "out" ? "bg-white text-red-500 shadow-sm shadow-red-500/10" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Uang Keluar
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tanggal Transaksi</label>
                <input
                  type="date"
                  className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold cursor-pointer"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                />
              </div>

              {transactionType === "in" ? (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nama Klien</label>
                    <input
                      type="text"
                      placeholder="Nama Joki"
                      className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                      value={formData.namaKlien}
                      onChange={(e) => setFormData({...formData, namaKlien: toTitleCase(e.target.value)})}
                    />
                  </div>
                  
                  <SearchableSelect
                    label="Asal Instansi"
                    placeholder="Cari Kampus/Sekolah..."
                    options={IndonesianUniversities}
                    value={formData.instansi}
                    onChange={(val) => setFormData({ ...formData, instansi: val })}
                  />

                  <SearchableSelect
                    label="Pilih Layanan"
                    placeholder="Cari Layanan Joki..."
                    options={JokiServices}
                    value={formData.layanan}
                    onChange={(val) => setFormData({ ...formData, layanan: val })}
                  />
                </>
              ) : null}

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nominal Jumlah</label>
                <input
                  type="text"
                  placeholder="Rp 0"
                  className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Catatan</label>
                <textarea
                  placeholder="Referensi pesanan..."
                  className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium h-20"
                  value={formData.catatan}
                  onChange={(e) => setFormData({...formData, catatan: toTitleCase(e.target.value)})}
                />
              </div>

              <button type="button" className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all ${
                transactionType === "in" ? "bg-primary text-white hover:opacity-90" : "bg-red-500 text-white hover:bg-red-600"
              }`}>
                Konfirmasi {transactionType === "in" ? "Pemasukan" : "Pengeluaran"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Graphic & Transactions (8/12) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Financial Graphic Card */}
          <div className="subtle-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Arus Kas (7 Hari Terakhir)</p>
                <h3 className="text-xl font-bold text-slate-900">Statistik Operasional</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-slate-600">Pemasukan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold text-slate-600">Pengeluaran</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full group overflow-visible">
              {/* SVG Area Chart */}
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                
                {/* Income Area */}
                <path 
                  d={`M 0,100 L ${incomePoints} L 100,100 Z`} 
                  fill="url(#incomeGradient)"
                  className="transition-all duration-300"
                />
                
                {/* Expense Area */}
                <path 
                  d={`M 0,100 L ${expensePoints} L 100,100 Z`} 
                  fill="url(#expenseGradient)"
                  className="transition-all duration-300"
                />
                
                {/* Income Line */}
                <polyline 
                  fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  points={incomePoints}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Expense Line */}
                <polyline 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeDasharray="4 2"
                  points={expensePoints}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Vertical Scanner Line */}
                {hoveredDayIndex !== null && (
                  <line 
                    x1={(hoveredDayIndex * 100) / (chartData.length - 1)} 
                    y1="0" 
                    x2={(hoveredDayIndex * 100) / (chartData.length - 1)} 
                    y2="100" 
                    stroke="var(--primary)" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                    className="opacity-40"
                  />
                )}
              </svg>

              {/* Interaction Layer */}
              <div className="absolute inset-0 flex z-10">
                {chartData.map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-full cursor-crosshair"
                    onMouseEnter={() => setHoveredDayIndex(i)}
                    onMouseLeave={() => setHoveredDayIndex(null)}
                  />
                ))}
              </div>

              {/* Tooltip Card */}
              {hoveredDayIndex !== null && (
                <div 
                  className="absolute z-20 pointer-events-none transition-all duration-200 subtle-card p-3 shadow-2xl bg-white/95 backdrop-blur-sm -translate-x-1/2 -translate-y-full"
                  style={{ 
                    left: `${(hoveredDayIndex * 100) / (chartData.length - 1)}%`,
                    top: `-12px`
                  }}
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 border-b border-slate-100 pb-1">
                    {chartData[hoveredDayIndex].fullName}
                  </p>
                  <div className="space-y-1.5 min-w-[120px]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-semibold text-slate-500">Masuk</span>
                      </div>
                      <span className="text-[11px] font-bold text-primary">Rp {chartData[hoveredDayIndex].income}0.000</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-[10px] font-semibold text-slate-500">Keluar</span>
                      </div>
                      <span className="text-[11px] font-bold text-red-500">Rp {chartData[hoveredDayIndex].expense}0.000</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-border-light -z-10 opacity-40">
                <div className="w-full border-t border-slate-100" />
                <div className="w-full border-t border-slate-100" />
                <div className="w-full border-t border-slate-100" />
              </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-4 px-1">
              {chartData.map((d) => (
                <span key={d.day} className="text-[10px] font-bold text-slate-400 uppercase">{d.day}</span>
              ))}
            </div>
          </div>

          {/* Recent Transactions List */}
          <div className="subtle-card overflow-hidden">
            <div className="p-6 border-b border-border-light flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Transaksi Terbaru</h3>
              <Link href="/history" className="text-xs font-bold text-primary hover:underline group flex items-center gap-1">
                Riwayat Lengkap
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-border-light">
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-subtle/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            t.type === "in" ? "bg-primary-light text-primary" : "bg-red-50 text-red-500"
                          }`}>
                            {t.type === "in" ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{t.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{t.instansi} • {t.layanan}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase py-1 px-2 rounded-lg tracking-tight ${
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
