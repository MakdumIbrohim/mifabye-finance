"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";
import { PaymentMethods } from "@/constants/payment-methods";
import SearchableSelect from "@/components/SearchableSelect";
import ConfirmationModal from "@/components/ConfirmationModal";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { Transaction, calculateChartData, formatCurrency, INDONESIAN_MONTHS, getCurrentMonthName } from "@/lib/finance-utils";
import { useFinance } from "@/context/FinanceContext";
import Toast from "@/components/Toast";

function DashboardContent() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  
  const [showLoginToast, setShowLoginToast] = useState(false);
  
  const { transactions, isLoading, lastCount, refreshData } = useFinance();
  const searchParams = useSearchParams();

  // Login Toast Logic
  useEffect(() => {
    const loginStatus = searchParams.get("login");
    const hasShown = sessionStorage.getItem("login_toast_shown");

    if (loginStatus === "success" && !hasShown) {
      setShowLoginToast(true);
      sessionStorage.setItem("login_toast_shown", "true");
    }
  }, [searchParams]);

  // Set initial sync time
  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      const now = new Date();
      setLastUpdated(`${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }
  }, [isLoading, transactions]);

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
    metodePembayaran: "Transfer Bank",
    catatan: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  // Sub-component for dot animation
  const LoadingDots = () => (
    <span className="flex gap-0.5 ml-0.5 inline-flex items-baseline">
      <span className="dot text-current">.</span>
      <span className="dot text-current">.</span>
      <span className="dot text-current">.</span>
    </span>
  );

  // Calculate Financial Statistics
  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    const income = transactions
      .filter(t => t.jenis_transaksi === "Pemasukan")
      .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
    
    const expense = transactions
      .filter(t => t.jenis_transaksi === "Pengeluaran")
      .reduce((sum, t) => sum + (Number(t.nominal) || 0), 0);
      
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

  const dashboardSkeletonSize = transactions.length > 0 ? recentTransactions.length : lastCount;

  const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="space-y-8 pb-10">
      <style jsx global>{`
        @keyframes loadingDots {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .dot {
          animation: loadingDots 1.4s infinite both;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={executeSubmission}
        isLoading={isSubmitting}
        type={transactionType === "in" ? "primary" : "danger"}
        title={`Konfirmasi ${transactionType === "in" ? "Pemasukan" : "Pengeluaran"}`}
        message={
          <div className="space-y-4">
            <p className="text-sm text-text-muted">Harap periksa detail berikut sebelum menyimpan data ke sistem:</p>
            
            <div className="bg-bg-subtle/50 p-5 rounded-3xl space-y-3 border border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-medium text-xs">Tanggal:</span>
                <span className="text-foreground font-black text-xs">
                  {(() => {
                    const [y, m, d] = formData.tanggal.split("-");
                    return `${parseInt(d)} ${INDONESIAN_MONTHS[parseInt(m) - 1]} ${y}`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted font-medium text-xs">Jenis Transaksi:</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${transactionType === "in" ? "bg-primary/10 text-primary" : "bg-red-100 text-red-600"}`}>
                  {transactionType === "in" ? "Pemasukan" : "Pengeluaran"}
                </span>
              </div>
              {transactionType === "in" && (
                <div className="flex justify-between items-center">
                  <span className="text-text-muted font-medium text-xs">Pihak/Klien:</span>
                  <span className="text-foreground font-black text-xs">{formData.namaKlien || "-"}</span>
                </div>
              )}
              <div className="flex justify-between items-start gap-4">
                <span className="text-text-muted font-medium text-xs shrink-0">Catatan:</span>
                <span className="text-foreground font-black text-xs text-right break-words max-w-[180px] italic">{formData.catatan || "-"}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/30">
                <span className="text-text-muted font-medium text-xs">Nominal:</span>
                <span className={`text-lg font-black ${transactionType === "in" ? "text-primary" : "text-red-500"}`}>
                   Rp {formData.jumlah || "0"}
                </span>
              </div>
            </div>

            {/* Balance Simulation Card */}
            <div className={`p-5 rounded-3xl border-2 border-dashed space-y-3 transition-all duration-500 ${transactionType === "in" ? "bg-green-50/50 border-green-200" : "bg-red-50/50 border-red-200"}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${transactionType === "in" ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Estimasi Saldo Kas</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Saldo Sebelum:</span>
                <span className="text-xs font-black text-slate-700">{formatCurrency(totalBalance)}</span>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-slate-200/50">
                <span className="text-xs font-bold text-slate-500">Saldo Sesudah:</span>
                <span className={`text-base font-black ${transactionType === "in" ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(totalBalance + (transactionType === "in" ? (Number(formData.jumlah.replace(/[^0-9]/g, "")) || 0) : -(Number(formData.jumlah.replace(/[^0-9]/g, "")) || 0)))}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-center text-text-muted italic px-4 leading-relaxed">
              *Tindakan ini akan tercatat permanen di Google Sheets. Pastikan data sudah sesuai.
            </p>
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
          <h1 className="text-2xl font-bold text-foreground mb-1">Beranda Dashboard</h1>
          <p className="text-sm text-text-muted">Catat transaksi dan pantau saldo tim Anda secara instan.</p>
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
      <div className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl shadow-primary/10 text-white relative overflow-hidden group border border-white/5">
        {/* Background Decorations - Subtle Blue Glows */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-700" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 border border-white/10 rounded-full -mr-16 -mb-16 pointer-events-none" />
        
        <div className="relative">
          {/* Header Card */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Total Saldo</p>
            </div>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/10 backdrop-blur-sm"
              title={showBalance ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
            >
              {showBalance ? (
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
              )}
            </button>
          </div>

          {/* Balance Amount */}
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold opacity-60">Rp</span>
              {isLoading ? (
                <LoadingDots />
              ) : (
                showBalance ? totalBalance.toLocaleString("id-ID") : "••••••••"
              )}
            </h2>
          </div>

          {/* Income & Expense Row */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-8 border-t border-white/10">
            <div className="space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Pemasukan</p>
              <p className="text-lg font-black text-emerald-400 flex items-center gap-2">
                <span className="text-xs opacity-60">+</span>
                {isLoading ? <LoadingDots /> : (showBalance ? `Rp ${totalIncome.toLocaleString("id-ID")}` : "••••••")}
              </p>
            </div>
            
            <div className="space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Pengeluaran</p>
              <p className="text-lg font-black text-rose-400 flex items-center gap-2">
                <span className="text-xs opacity-60">-</span>
                {isLoading ? <LoadingDots /> : (showBalance ? `Rp ${totalExpense.toLocaleString("id-ID")}` : "••••••")}
              </p>
            </div>
          </div>

          {/* Footer Card */}
          <div className="mt-8 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full w-fit border border-white/5">
            <div className="w-4 h-4 flex items-center justify-center bg-emerald-500/20 rounded-md">
              <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-[9px] font-bold text-white/40 tracking-wider">
              Terakhir sinkron: <span className="text-white/70">{lastUpdated || "Menyinkronkan..."}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="subtle-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-tight">Catat Transaksi</h3>
            <div className="flex bg-subtle p-1 rounded-xl mb-6 border border-border">
              <button
                type="button"
                onClick={() => setTransactionType("in")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "in" ? "bg-card-bg text-primary shadow-sm shadow-primary/10" : "text-text-muted hover:text-foreground"
                }`}
              >
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("out")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "out" ? "bg-card-bg text-red-500 shadow-sm shadow-red-500/10" : "text-text-muted hover:text-foreground"
                }`}
              >
                Pengeluaran
              </button>
            </div>

            <form onSubmit={handlePreSubmit} className="space-y-4">
              {status && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2 ${
                  status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={status.type === "success" ? "M5 13l4 4L19 7" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                    </svg>
                    <span>{status.message}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStatus(null)}
                    className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                    title="Tutup"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Tanggal Transaksi</label>
                <input
                  type="date"
                  className="w-full bg-subtle border border-border rounded-xl p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold cursor-pointer"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                />
              </div>

              {transactionType === "in" ? (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Nama Klien</label>
                    <input
                      type="text"
                      placeholder="Nama Pelanggan"
                      className="w-full bg-subtle border border-border rounded-xl p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
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
                    onChange={(val) => {
                      const selectedService = JokiServices.find(s => s.value === val);
                      setFormData({ 
                        ...formData, 
                        layanan: val,
                        jumlah: selectedService && selectedService.price > 0 ? selectedService.price.toLocaleString("id-ID") : formData.jumlah 
                      });
                    }}
                  />
                </>
              ) : null}

              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Nominal Jumlah</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-bold text-sm">Rp</span>
                  <input
                    type="text"
                    placeholder="0"
                    className="w-full bg-subtle border border-border rounded-xl p-3 pl-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                    value={formData.jumlah}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      const formattedValue = rawValue ? Number(rawValue).toLocaleString("id-ID") : "";
                      setFormData({...formData, jumlah: formattedValue});
                    }}
                  />
                </div>
                {transactionType === "in" && (
                  <div className="mt-3 p-3 rounded-xl border flex items-start gap-3 bg-primary/5 border-primary/10">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[10px] font-bold leading-relaxed text-primary">
                      Harga dapat dikustomisasi sesuai kesepakatan antara penyedia layanan joki dan client.
                    </p>
                  </div>
                )}
              </div>

              <SearchableSelect
                label="Metode Pembayaran"
                placeholder="Pilih Metode..."
                options={PaymentMethods}
                value={formData.metodePembayaran}
                onChange={(val) => setFormData({ ...formData, metodePembayaran: val })}
              />

              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Catatan</label>
                <textarea
                  placeholder={transactionType === "in" ? "Contoh: Order makalah 10 halaman" : "Contoh: Pengeluaran untuk canva pro"}
                  className="w-full bg-subtle border border-border rounded-xl p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium h-20"
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
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Arus Kas (7 Hari Terakhir)</p>
                <h3 className="text-xl font-bold text-foreground">Statistik Operasional</h3>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs font-semibold text-text-muted">Masuk</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold text-text-muted">Keluar</span>
                </div>
              </div>
            </div>

            <div className="relative h-64 w-full group overflow-visible">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl animate-pulse">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Memuat Grafik...</span>
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
                    <div className="absolute z-20 pointer-events-none transition-all duration-200 subtle-card p-3 shadow-2xl bg-card-bg/95 backdrop-blur-sm -translate-x-1/2 -translate-y-full" style={{ left: `${(hoveredDayIndex * 100) / (chartData.length - 1)}%`, top: `-12px` }}>
                      <p className="text-[10px] font-bold text-text-muted uppercase mb-2 border-b border-border pb-1">{chartData[hoveredDayIndex].fullName}</p>
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
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-border -z-10 opacity-40">
                <div className="w-full border-t border-border" />
                <div className="w-full border-t border-border" />
                <div className="w-full border-t border-border" />
              </div>
            </div>
            {!isLoading && (
              <div className="flex justify-between mt-4 px-1">
                {chartData.map((d) => (
                  <span key={d.day} className="text-[10px] font-bold text-text-muted uppercase">{d.day}</span>
                ))}
              </div>
            )}
          </div>

          {/* Table Section */}
          <div className="subtle-card overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">Transaksi Terbaru</h3>
              <Link href="/history" className="text-xs font-bold text-primary hover:underline group flex items-center gap-1">
                Riwayat Lengkap
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-primary/[0.03] border-b border-border">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Tip: Klik baris untuk detail</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <tbody className="divide-y divide-border">
                  {!isMounted ? (
                    Array(3).fill(0).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><div className="h-10 w-40 skeleton-shimmer rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-6 w-20 skeleton-shimmer rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-8 w-24 skeleton-shimmer rounded-lg ml-auto"></div></td>
                      </tr>
                    ))
                  ) : isLoading ? (
                    Array(Math.min(dashboardSkeletonSize, 5)).fill(0).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><div className="h-10 w-40 skeleton-shimmer rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-6 w-20 skeleton-shimmer rounded-lg"></div></td>
                        <td className="px-6 py-4"><div className="h-8 w-24 skeleton-shimmer rounded-lg ml-auto"></div></td>
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
                                <p className="text-sm font-bold text-foreground">{t.nama_klien}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md border ${
                                    t.jenis_transaksi === "Pemasukan" 
                                      ? "bg-primary/10 text-primary border-primary/20" 
                                      : "bg-red-500/10 text-red-500 border-red-500/20"
                                  }`}>
                                    {t.jenis_transaksi === "Pemasukan" ? "Pemasukan" : "Pengeluaran"}
                                  </span>
                                  <p className="text-[10px] text-text-muted font-medium">{t.id} • {t.asal_instansi}</p>
                                </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-[10px] font-bold uppercase py-1 px-2 rounded-lg tracking-tight bg-bg-subtle text-text-muted`}>
                            {isMounted ? new Date(t.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "-"}
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
                      <td colSpan={3} className="px-6 py-10 text-center text-xs text-text-muted italic">Belum ada transaksi tersimpan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Toasts */}
      <Toast 
        show={showLoginToast} 
        message="Login Berhasil! Selamat datang kembali." 
        onClose={() => setShowLoginToast(false)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-main" />}>
      <DashboardContent />
    </Suspense>
  );
}
