"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";
import SearchableSelect from "@/components/SearchableSelect";
import ConfirmationModal from "@/components/ConfirmationModal";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { Transaction, calculateChartData, formatCurrency } from "@/lib/finance-utils";
import { useFinance } from "@/context/FinanceContext";

export default function DashboardPage() {
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { transactions, isLoading, refreshData } = useFinance();

  // Get today's date in Jakarta timezone (YYYY-MM-DD)
  const getTodayJakarta = () => {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
  };

  const initialFormState = {
    namaKlien: "",
    instansi: "",
    layanan: "",
    jumlah: "",
    tanggal: getTodayJakarta(),
    catatan: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  // Local fetching logic removed - now handled by FinanceContext

  // Calculate Financial Statistics
  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    const income = transactions
      .filter(t => t.jenis_transaksi === "Pemasukan")
      .reduce((sum, t) => sum + t.nominal, 0);
    
    const expense = transactions
      .filter(t => t.jenis_transaksi === "Pengeluaran")
      .reduce((sum, t) => sum + t.nominal, 0);
      
    return {
      totalBalance: income - expense,
      totalIncome: income,
      totalExpense: expense
    };
  }, [transactions]);

  // Step 1: Handle Initial Form Submit (Validation & Open Modal)
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jumlah) {
      setStatus({ type: "error", message: "Harap isi nominal jumlah!" });
      return;
    }
    setShowConfirmModal(true);
  };

  // Step 2: Final API Submission (Triggered from Modal)
  const executeSubmission = async () => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, transactionType }),
      });

      const result = await response.json();

      if (result.result === "success") {
        setShowConfirmModal(false); // Close ONLY on success
        setStatus({ type: "success", message: `Berhasil! Data tersimpan dengan ID: ${result.id}` });
        setFormData(initialFormState);
        refreshData();
      } else {
        setStatus({ type: "error", message: result.message || "Gagal menyimpan data." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Terjadi kesalahan koneksi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate real-time chart data
  const chartData = calculateChartData(transactions);

  // Helper to generate SVG path
  const generatePath = (data: { income: number; expense: number }[], key: "income" | "expense") => {
    if (data.length === 0) return "";
    return data.map((d, i) => `${(i * 100) / (data.length - 1)},${100 - d[key]}`).join(" ");
  };

  const incomePoints = generatePath(chartData as any, "income");
  const expensePoints = generatePath(chartData as any, "expense");

  const recentTransactions = [...transactions].reverse().slice(0, 5);

  const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeSubmission}
        isLoading={isSubmitting}
        type={transactionType === "in" ? "primary" : "danger"}
        title={`Konfirmasi ${transactionType === "in" ? "Pemasukan" : "Pengeluaran"}`}
        message={
          <div className="space-y-3">
            <p>Harap periksa detail berikut sebelum menyimpan data ke sistem:</p>
            <div className="bg-subtle p-4 rounded-2xl space-y-2 border border-border-light">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium text-xs">Jenis Transaksi:</span>
                <span className={`text-xs font-bold uppercase ${transactionType === "in" ? "text-primary" : "text-red-500"}`}>
                  {transactionType === "in" ? "Pemasukan" : "Pengeluaran"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium text-xs">Nominal:</span>
                <span className={`font-bold ${transactionType === "in" ? "text-primary" : "text-red-500"}`}>
                   Rp {Number(formData.jumlah.replace(/[^0-9]/g, "")).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium text-xs">Pihak/Klien:</span>
                <span className="text-slate-700 font-bold text-xs">{formData.namaKlien || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium text-xs">Layanan:</span>
                <span className="text-slate-700 font-bold text-xs">{formData.layanan || "Umum"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium text-xs">Instansi:</span>
                <span className="text-slate-700 font-bold text-xs">{formData.instansi || "-"}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic font-medium pt-2">Tindakan ini akan tercatat permanen di Google Sheets.</p>
          </div>
        }
      />

      {/* Transaction Detail Modal */}
      <TransactionDetailModal 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Beranda Dashboard</h1>
          <p className="text-sm text-slate-500">Catat transaksi dan pantau saldo tim Anda secara instan.</p>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-primary">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Sinkronisasi...</span>
          </div>
        )}
      </section>

      {/* Full-Width Balance Card */}
      <div className="bg-gradient-to-br from-slate-900 to-primary p-8 rounded-[2.5rem] shadow-xl shadow-primary/20 text-white relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
        <div className="absolute left-10 -bottom-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3 opacity-80">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Total Saldo Keuangan Mifabyte</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter">
              {isLoading ? "Menghitung..." : formatCurrency(totalBalance)}
            </h2>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-12 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-0.5">Total Pemasukan</p>
                <p className="text-xl font-black text-teal-300">{isLoading ? "---" : formatCurrency(totalIncome)}</p>
              </div>
            </div>
            
            <div className="w-px h-12 bg-white/10 hidden md:block" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-0.5">Total Pengeluaran</p>
                <p className="text-xl font-black text-red-300">{isLoading ? "---" : formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="subtle-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tight">Catat Transaksi</h3>
            <div className="flex bg-subtle p-1 rounded-xl mb-6 border border-border-light">
              <button
                type="button"
                onClick={() => setTransactionType("in")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "in" ? "bg-white text-primary shadow-sm shadow-primary/10" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("out")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "out" ? "bg-white text-red-500 shadow-sm shadow-red-500/10" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Pengeluaran
              </button>
            </div>

            <form onSubmit={handlePreSubmit} className="space-y-4">
              {status && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
                  status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={status.type === "success" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                  </svg>
                  {status.message}
                </div>
              )}

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
                      placeholder="Nama Pelanggan"
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
                  placeholder="Keterangan tambahan..."
                  className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium h-20"
                  value={formData.catatan}
                  onChange={(e) => setFormData({...formData, catatan: toTitleCase(e.target.value)})}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 shadow-primary/20"
                } ${
                  transactionType === "in" ? "bg-primary text-white" : "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20"
                }`}
              >
                {isSubmitting ? (
                  "Menunggu..."
                ) : (
                  `Konfirmasi ${transactionType === "in" ? "Pemasukan" : "Pengeluaran"}`
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {/* Chart Section */}
          <div className="subtle-card p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Arus Kas (7 Hari Terakhir)</p>
                <h3 className="text-xl font-bold text-slate-900">Statistik Operasional</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-slate-600">Masuk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold text-slate-600">Keluar</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full group overflow-visible">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 rounded-2xl animate-pulse">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Memuat Grafik...</span>
                </div>
              ) : (
                <>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
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
                    <path d={`M 0,100 L ${incomePoints} L 100,100 Z`} fill="url(#incomeGradient)" className="transition-all duration-300" />
                    <path d={`M 0,100 L ${expensePoints} L 100,100 Z`} fill="url(#expenseGradient)" className="transition-all duration-300" />
                    <polyline fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={incomePoints} vectorEffect="non-scaling-stroke" />
                    <polyline fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" points={expensePoints} vectorEffect="non-scaling-stroke" />
                    {hoveredDayIndex !== null && (
                      <line x1={(hoveredDayIndex * 100) / (chartData.length - 1)} y1="0" x2={(hoveredDayIndex * 100) / (chartData.length - 1)} y2="100" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex z-10">
                    {chartData.map((_, i) => (
                      <div key={i} className="flex-1 h-full cursor-crosshair" onMouseEnter={() => setHoveredDayIndex(i)} onMouseLeave={() => setHoveredDayIndex(null)} />
                    ))}
                  </div>
                  {hoveredDayIndex !== null && chartData[hoveredDayIndex] && (
                    <div className="absolute z-20 pointer-events-none transition-all duration-200 subtle-card p-3 shadow-2xl bg-white/95 backdrop-blur-sm -translate-x-1/2 -translate-y-full" style={{ left: `${(hoveredDayIndex * 100) / (chartData.length - 1)}%`, top: `-12px` }}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 border-b border-slate-100 pb-1">{chartData[hoveredDayIndex].fullName}</p>
                      <div className="space-y-1.5 min-w-[140px]">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><span className="text-[10px] font-semibold text-slate-500">Masuk</span></div>
                          <span className="text-[11px] font-bold text-primary">{formatCurrency(chartData[hoveredDayIndex].rawIncome)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /><span className="text-[10px] font-semibold text-slate-500">Keluar</span></div>
                          <span className="text-[11px] font-bold text-red-500">{formatCurrency(chartData[hoveredDayIndex].rawExpense)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-border-light -z-10 opacity-40">
                <div className="w-full border-t border-slate-100" />
                <div className="w-full border-t border-slate-100" />
                <div className="w-full border-t border-slate-100" />
              </div>
            </div>
            {!isLoading && (
              <div className="flex justify-between mt-4 px-1">
                {chartData.map((d) => (
                  <span key={d.day} className="text-[10px] font-bold text-slate-400 uppercase">{d.day}</span>
                ))}
              </div>
            )}
          </div>

          {/* Table Section */}
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
              <table className="w-full text-left min-w-[800px]">
                <tbody className="divide-y divide-border-light">
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4"><div className="h-10 w-40 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-6 w-20 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-8 w-24 bg-slate-100 rounded-lg ml-auto"></div></td>
                      </tr>
                    ))
                  ) : recentTransactions.length > 0 ? (
                    recentTransactions.map((t) => (
                      <tr 
                        key={t.id} 
                        onClick={() => setSelectedTransaction(t)}
                        className="hover:bg-primary/[0.04] transition-all group cursor-pointer active:scale-[0.99]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.jenis_transaksi === "Pemasukan" ? "bg-primary-light text-primary" : "bg-red-50 text-red-500"}`}>
                              {t.jenis_transaksi === "Pemasukan" ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" /></svg>}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{t.nama_klien}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${
                                    t.jenis_transaksi === "Pemasukan" 
                                      ? "bg-primary/10 text-primary border-primary/20" 
                                      : "bg-red-500/10 text-red-500 border-red-500/20"
                                  }`}>
                                    {t.jenis_transaksi === "Pemasukan" ? "Pemasukan" : "Pengeluaran"}
                                  </span>
                                  <p className="text-[10px] text-slate-400 font-medium">{t.id} • {t.asal_instansi}</p>
                                </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-[10px] font-bold uppercase py-1 px-2 rounded-lg tracking-tight bg-slate-50 text-slate-500`}>
                            {new Date(t.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className={`text-sm font-bold ${t.jenis_transaksi === "Pemasukan" ? "text-primary" : "text-red-500"}`}>
                            {t.jenis_transaksi === "Pemasukan" ? "+" : "-"}{formatCurrency(t.nominal)}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-xs text-slate-400 italic">Belum ada transaksi tersimpan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
