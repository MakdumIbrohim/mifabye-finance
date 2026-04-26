"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Transaction, formatCurrency, INDONESIAN_MONTHS, getCurrentMonthName } from "@/lib/finance-utils";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import ExportModal from "@/components/ExportModal";
import { useFinance } from "@/context/FinanceContext";
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export-utils";
import { exportPremiumPDF } from "@/lib/pdf-export";

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const { transactions, isLoading, lastCount } = useFinance();

  // Tiered Date Filters
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Helper: Get week of month (1-5)
  const getWeekOfMonth = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDayOfMonth) / 7);
  };

  // Local fetching logic removed - now handled by FinanceContext

  // Extract dynamic filter options from transactions
  const filterOptions = useMemo(() => {
    const years = new Set<string>();
    const monthsByYear: Record<string, Set<string>> = {};
    const weeksByMonth: Record<string, Set<string>> = {};
    const daysByWeek: Record<string, Set<string>> = {};

    transactions.forEach(t => {
      // Use string splitting to avoid timezone issues
      const parts = t.tanggal.split("-");
      if (parts.length < 3) return;

      const y = parts[0];
      const m = parseInt(parts[1]) - 1; // 0-indexed
      const d = parseInt(parts[2]);
      
      years.add(y);

      // Months for this year
      if (!monthsByYear[y]) monthsByYear[y] = new Set();
      monthsByYear[y].add(m.toString());

      // Weeks for this month/year combo
      const comboKey = `${y}-${m}`;
      if (!weeksByMonth[comboKey]) weeksByMonth[comboKey] = new Set();
      
      const dateObj = new Date(parseInt(y), m, d);
      const week = getWeekOfMonth(dateObj);
      weeksByMonth[comboKey].add(week.toString());

      // Days for this week combo
      const weekKey = `${y}-${m}-${week}`;
      if (!daysByWeek[weekKey]) daysByWeek[weekKey] = new Set();
      
      const dayName = dateObj.toLocaleDateString("id-ID", { weekday: 'long' });
      // Store as "date|dayName" to keep both pieces of info
      daysByWeek[weekKey].add(`${d}|${dayName}`);
    });

    return {
      years: Array.from(years).sort((a, b) => b.localeCompare(a)),
      monthsByYear
    };
  }, [transactions]);

  // Calculate Monthly Totals
  const { monthlyIncome, monthlyExpense } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter(t => {
      const parts = t.tanggal.split("-");
      if (parts.length < 3) return false;
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });

    const income = monthTransactions
      .filter(t => t.jenis_transaksi === "Pemasukan")
      .reduce((sum, t) => sum + t.nominal, 0);
      
    const expense = monthTransactions
      .filter(t => t.jenis_transaksi === "Pengeluaran")
      .reduce((sum, t) => sum + t.nominal, 0);

    return { monthlyIncome: income, monthlyExpense: expense };
  }, [transactions]);

  // Filtering Logic
  const filteredTransactions = transactions.filter(t => {
    // 1. Transaction Type Filter
    const matchesFilter = 
      filter === "all" || 
      (filter === "in" && t.jenis_transaksi === "Pemasukan") || 
      (filter === "out" && t.jenis_transaksi === "Pengeluaran");
    
    // 2. Search Filter
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      t.nama_klien?.toLowerCase().includes(searchLower) || 
      t.asal_instansi?.toLowerCase().includes(searchLower) || 
      t.produk_layanan?.toLowerCase().includes(searchLower) ||
      t.catatan?.toLowerCase().includes(searchLower) ||
      t.id?.toLowerCase().includes(searchLower);

    // 3. Tiered Date Filter
    const parts = t.tanggal.split("-");
    const tYear = parts[0];
    const tMonth = (parseInt(parts[1]) - 1).toString();
    const tDay = parseInt(parts[2]).toString();
    const tDateObj = new Date(parseInt(tYear), parseInt(tMonth), parseInt(tDay));
    const tWeek = getWeekOfMonth(tDateObj).toString();

    const matchesYear = !selectedYear || tYear === selectedYear;
    const matchesMonth = !selectedMonth || tMonth === selectedMonth;
    const matchesWeek = !selectedWeek || tWeek === selectedWeek;
    const matchesDay = !selectedDay || tDay === selectedDay;
      
    return matchesFilter && matchesSearch && matchesYear && matchesMonth && matchesWeek && matchesDay;
  }).reverse(); // Most recent first

  const skeletonSize = transactions.length > 0 ? filteredTransactions.length : lastCount;

  const resetDateFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedWeek("");
    setSelectedDay("");
  };

  // Construct label for active filters (used in export file name/header)
  const activeFilterLabel = useMemo(() => {
    const parts = [];
    if (selectedYear) parts.push(selectedYear);
    if (selectedMonth) parts.push(MONTHS[parseInt(selectedMonth)]);
    if (selectedWeek) parts.push(`Pekan ${selectedWeek}`);
    if (selectedDay) parts.push(`Tgl ${selectedDay}`);
    return parts.join(" ");
  }, [selectedYear, selectedMonth, selectedWeek, selectedDay, MONTHS]);

  const handleExport = (format: "pdf" | "csv" | "excel" | "premium-pdf") => {
    if (format === "premium-pdf") {
      const now = new Date();
      const month = selectedMonth ? parseInt(selectedMonth) : now.getMonth();
      const year = selectedYear ? parseInt(selectedYear) : now.getFullYear();
      exportPremiumPDF(filteredTransactions, month, year);
    } else {
      if (format === "pdf") exportToPDF(filteredTransactions, activeFilterLabel);
      if (format === "csv") exportToCSV(filteredTransactions, activeFilterLabel);
      if (format === "excel") exportToExcel(filteredTransactions, activeFilterLabel);
    }
    setShowExportModal(false);
  };

  // Sub-component for dot animation (1-4 dots)
  const LoadingDots = () => {
    const [dots, setDots] = useState(".");
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 4 ? "." : prev + ".");
      }, 400);
      return () => clearInterval(interval);
    }, []);
    return <span className="inline-block min-w-[2em]">{dots}</span>;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Transaction Detail Modal */}
      <TransactionDetailModal 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />

      {/* Export Selection Modal */}
      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        filterInfo={activeFilterLabel}
      />

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Riwayat Transaksi</h1>
          <p className="text-sm text-text-muted">Daftar lengkap seluruh arus kas masuk dan keluar tim.</p>
        </div>
        {isLoading && (
          <div className="animate-spin h-5 w-5 text-primary">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        )}
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="subtle-card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Total Pemasukan ({getCurrentMonthName()})</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-primary">
              {isLoading ? <>Rp <LoadingDots /></> : formatCurrency(monthlyIncome)}
            </h2>
            {!isLoading && <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Update Real-time</span>}
          </div>
        </div>
        <div className="subtle-card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Total Pengeluaran ({getCurrentMonthName()})</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-red-500">
              {isLoading ? <>Rp <LoadingDots /></> : formatCurrency(monthlyExpense)}
            </h2>
            {!isLoading && <span className="text-xs font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded">Live Data</span>}
          </div>
        </div>
      </div>

      <div className="subtle-card p-0 overflow-hidden w-full max-w-full">
        {/* Filter Bar */}
        <div className="p-6 border-b border-border space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex bg-bg-subtle p-1 rounded-xl w-fit border border-border">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "all" ? "bg-card-bg text-primary shadow-sm shadow-primary/10" : "text-text-muted hover:text-foreground"}`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter("in")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "in" ? "bg-card-bg text-primary shadow-sm shadow-primary/10" : "text-text-muted hover:text-foreground"}`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setFilter("out")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${filter === "out" ? "bg-card-bg text-red-500 shadow-sm shadow-red-500/10" : "text-text-muted hover:text-foreground"}`}
              >
                Pengeluaran
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 justify-end w-full">
              <div className="relative w-full sm:max-w-xs">
                <input 
                  type="text" 
                  placeholder="Cari klien..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-bg-subtle border border-border rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10"
                />
                <svg className="w-4 h-4 text-text-muted absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                onClick={() => setShowExportModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-sm shadow-primary/10 active:scale-95 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Laporan
              </button>
            </div>
          </div>

          {/* Cascading Date Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Filter Bertingkat:</span>
            </div>
            
            {isMounted ? (
              <>
                {/* Year Select */}
                <div className="relative group">
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      resetDateFilters();
                      setSelectedYear(e.target.value);
                    }}
                    className="appearance-none bg-bg-subtle border border-border rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
                  >
                    <option value="">Pilih Tahun</option>
                    {filterOptions.years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Month Select */}
                <div className="relative group">
                  <select
                    disabled={!selectedYear}
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setSelectedWeek("");
                      setSelectedDay("");
                    }}
                    className={`appearance-none bg-bg-subtle border border-border rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all ${!selectedYear ? "opacity-40 grayscale cursor-not-allowed" : ""}`}
                  >
                    <option value="">Pilih Bulan</option>
                    {selectedYear && filterOptions.monthsByYear[selectedYear] && 
                      Array.from(filterOptions.monthsByYear[selectedYear])
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map(m => (
                          <option key={m} value={m}>{MONTHS[parseInt(m)]}</option>
                        ))
                    }
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Week Select */}
                <div className="relative group">
                  <select
                    disabled={!selectedMonth}
                    value={selectedWeek}
                    onChange={(e) => {
                      setSelectedWeek(e.target.value);
                      setSelectedDay("");
                    }}
                    className={`appearance-none bg-bg-subtle border border-border rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all ${!selectedMonth ? "opacity-40 grayscale cursor-not-allowed" : ""}`}
                  >
                    <option value="">Pilih Pekan</option>
                    {selectedMonth && (
                      [1, 2, 3, 4, 5].map(w => (
                        <option key={w} value={w}>Pekan ke-{w}</option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Day Select */}
                <div className="relative group">
                  <select
                    disabled={!selectedWeek}
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className={`appearance-none bg-bg-subtle border border-border rounded-lg py-1.5 pl-3 pr-8 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all ${!selectedWeek ? "opacity-40 grayscale cursor-not-allowed" : ""}`}
                  >
                    <option value="">Pilih Hari</option>
                    {selectedWeek && (() => {
                      const days = [];
                      const year = parseInt(selectedYear);
                      const month = parseInt(selectedMonth);
                      const week = parseInt(selectedWeek);
                      
                      // Get current time in Jakarta for capping
                      const now = new Date();
                      const jakartaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
                      // Set to end of day to ensure today is included
                      jakartaNow.setHours(23, 59, 59, 999);

                      const lastDay = new Date(year, month + 1, 0).getDate();
                      for (let d = 1; d <= lastDay; d++) {
                        const dObj = new Date(year, month, d);
                        
                        // Rule: Don't show future dates
                        if (dObj > jakartaNow) continue;

                        if (getWeekOfMonth(dObj) === week) {
                          const dayName = dObj.toLocaleDateString("id-ID", { weekday: 'long' });
                          days.push({ d, dayName });
                        }
                      }
                      
                      return days.map(({ d, dayName }) => (
                        <option key={d} value={d.toString()}>{dayName}, {d}</option>
                      ));
                    })()}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-8 w-64 bg-bg-subtle animate-pulse rounded-lg border border-border" />
            )}

            {isMounted && (selectedYear || selectedMonth || selectedWeek || selectedDay) && (
              <button 
                onClick={resetDateFilters}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest px-2"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex items-center gap-2 px-6 py-3 bg-primary/[0.03] border-b border-border">
          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Tip: Klik pada baris tabel untuk melihat detail transaksi lengkap</p>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-border text-text-muted text-[10px] uppercase font-black tracking-[0.2em] bg-bg-subtle/50">
                <th className="px-6 py-4">Data Transaksi</th>
                <th className="px-6 py-4">Layanan & Info</th>
                <th className="px-6 py-4 text-right">Nominal (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!isMounted ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-6"><div className="h-12 w-64 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-40 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-32 skeleton-shimmer rounded-lg ml-auto"></div></td>
                  </tr>
                ))
              ) : isLoading ? (
                Array(skeletonSize).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-6"><div className="h-12 w-64 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-40 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-32 skeleton-shimmer rounded-lg ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr 
                    key={t.id} 
                    onClick={() => setSelectedTransaction(t)}
                    className="hover:bg-primary/[0.04] transition-all group cursor-pointer active:scale-[0.995]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${t.jenis_transaksi === "Pemasukan" ? "bg-primary-light text-primary" : "bg-red-50 text-red-500"}`}>
                          {t.jenis_transaksi === "Pemasukan" ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 17l-4 4m0 0l-4-4m4 4V3" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7l4-4m0 0l4 4m-4-4v18" /></svg>}
                        </div>
                        <div>
                          <p className="text-sm font-black text-foreground mb-1">{t.nama_klien}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${
                              t.jenis_transaksi === "Pemasukan" 
                                ? "bg-primary/10 text-primary border-primary/20" 
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }`}>
                              {t.jenis_transaksi === "Pemasukan" ? "Pemasukan" : "Pengeluaran"}
                            </span>
                            <p className="text-[10px] text-text-muted font-bold tracking-tight">{t.id} • {t.asal_instansi}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-lg">
                            {t.produk_layanan || "Umum"}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted">
                            {isMounted ? new Date(t.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                          </span>
                        </div>
                        <p className="text-[10px] text-text-muted italic max-w-[200px] truncate font-medium">
                          {t.catatan || "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <p className={`text-base font-black ${t.jenis_transaksi === "Pemasukan" ? "text-primary" : "text-red-500"}`}>
                        {t.jenis_transaksi === "Pemasukan" ? "+" : "-"}{formatCurrency(t.nominal)}
                      </p>
                      <p className="text-[10px] font-bold text-text-muted/60 mt-1">{t.metode_pembayaran}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-bg-subtle rounded-full text-text-muted">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-text-muted font-black uppercase tracking-widest">Data Kosong</p>
                    </div>
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
