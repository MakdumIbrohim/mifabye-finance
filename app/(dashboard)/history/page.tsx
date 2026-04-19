"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Transaction, formatCurrency } from "@/lib/finance-utils";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { useFinance } from "@/context/FinanceContext";

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const { transactions, isLoading } = useFinance();

  // Local fetching logic removed - now handled by FinanceContext

  // Calculate Monthly Totals
  const { monthlyIncome, monthlyExpense } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.tanggal);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
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
    const matchesFilter = 
      filter === "all" || 
      (filter === "in" && t.jenis_transaksi === "Pemasukan") || 
      (filter === "out" && t.jenis_transaksi === "Pengeluaran");
    
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      t.nama_klien?.toLowerCase().includes(searchLower) || 
      t.asal_instansi?.toLowerCase().includes(searchLower) || 
      t.produk_layanan?.toLowerCase().includes(searchLower) ||
      t.catatan?.toLowerCase().includes(searchLower) ||
      t.id?.toLowerCase().includes(searchLower);
      
    return matchesFilter && matchesSearch;
  }).reverse(); // Most recent first

  return (
    <div className="space-y-8 pb-10">
      {/* Transaction Detail Modal */}
      <TransactionDetailModal 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
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
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Total Pemasukan ({new Date().toLocaleDateString('id-ID', { month: 'long' })})</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-primary">
              {isLoading ? "---" : formatCurrency(monthlyIncome)}
            </h2>
            {!isLoading && <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Update Real-time</span>}
          </div>
        </div>
        <div className="subtle-card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Total Pengeluaran ({new Date().toLocaleDateString('id-ID', { month: 'long' })})</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-red-500">
              {isLoading ? "---" : formatCurrency(monthlyExpense)}
            </h2>
            {!isLoading && <span className="text-xs font-bold text-text-muted bg-bg-subtle px-2 py-1 rounded">Live Data</span>}
          </div>
        </div>
      </div>

      <div className="subtle-card p-0 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          <div className="relative flex-1 max-w-sm">
            <input 
              type="text" 
              placeholder="Cari klien, instansi, atau layanan..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-subtle border border-border rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pl-10"
            />
            <svg className="w-4 h-4 text-text-muted absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-subtle border-b border-border text-text-muted">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Klien & Instansi</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Layanan Joki</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Catatan</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-right">Jumlah (IDR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-6"><div className="h-10 w-48 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-32 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-24 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-40 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-28 skeleton-shimmer rounded-lg ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr 
                    key={t.id} 
                    onClick={() => setSelectedTransaction(t)}
                    className="hover:bg-primary/[0.04] transition-colors group cursor-pointer active:scale-[0.99]"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-foreground">{t.nama_klien}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${
                          t.jenis_transaksi === "Pemasukan" 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}>
                          {t.jenis_transaksi === "Pemasukan" ? "Pemasukan" : "Pengeluaran"}
                        </span>
                        <p className="text-[10px] text-text-muted font-medium">ID: {t.id} | {t.asal_instansi}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-primary px-2.5 py-1 bg-primary-light rounded-lg">
                        {t.produk_layanan || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-text-muted">
                        {new Date(t.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-xs text-text-muted truncate hover:whitespace-normal transition-all" title={t.catatan}>
                        {t.catatan || "-"}
                      </p>
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
                  <td colSpan={5} className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-bg-subtle rounded-full text-text-muted">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-text-muted font-medium">Data transaksi belum tersedia.</p>
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
