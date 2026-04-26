"use client";

import { useState, useEffect, useMemo } from "react";
import { Transaction, formatCurrency, INDONESIAN_MONTHS, getCurrentMonthName } from "@/lib/finance-utils";
import ConfirmationModal from "@/components/ConfirmationModal";
import SearchableSelect from "@/components/SearchableSelect";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import { useFinance } from "@/context/FinanceContext";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";
import { PaymentMethods } from "@/constants/payment-methods";
import Toast from "@/components/Toast";

export default function ManagePage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const { transactions, isLoading, lastCount, refreshData } = useFinance();
  const [isProcessing, setIsProcessing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  // Modal States
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Transaction | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsProcessing(true);
    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: deleteId }),
      });
      const result = await response.json();
      if (result.result === "success") {
        setDeleteId(null);
        setStatus({ type: "success", message: "Data berhasil dihapus!" });
        refreshData();
      } else {
        setStatus({ type: "error", message: "Gagal menghapus data." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Kesalahan koneksi saat menghapus." });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Edit Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setIsProcessing(true);
    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: editItem.id,
          tanggal: editItem.tanggal,
          namaKlien: editItem.nama_klien,
          instansi: editItem.asal_instansi,
          layanan: editItem.produk_layanan,
          jumlah: editItem.nominal,
          catatan: editItem.catatan,
          metodePembayaran: editItem.metode_pembayaran,
          transactionType: editItem.jenis_transaksi === "Pemasukan" ? "in" : "out"
        }),
      });
      const result = await response.json();
      if (result.result === "success") {
        setStatus({ type: "success", message: "Data berhasil diperbarui!" });
        setEditItem(null);
        refreshData();
      } else {
        setStatus({ type: "error", message: "Gagal memperbarui data." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Kesalahan koneksi saat memperbarui." });
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtering Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesFilter = filter === "all" || 
        (filter === "in" && t.jenis_transaksi === "Pemasukan") || 
        (filter === "out" && t.jenis_transaksi === "Pengeluaran");
      
      const s = search.toLowerCase();
      const matchesSearch = 
        t.nama_klien?.toLowerCase().includes(s) || 
        t.id?.toLowerCase().includes(s) || 
        t.asal_instansi?.toLowerCase().includes(s) ||
        t.produk_layanan?.toLowerCase().includes(s);

      return matchesFilter && matchesSearch;
    }).reverse();
  }, [transactions, filter, search]);

  const skeletonSize = transactions.length > 0 ? filteredTransactions.length : lastCount;

  return (
    <div className="space-y-8 pb-10">
      {/* Transaction Detail Modal */}
      <TransactionDetailModal 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />

      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Kelola Data Keuangan</h1>
          <p className="text-sm text-text-muted">Halaman khusus untuk mengedit atau menghapus catatan transaksi.</p>
        </div>
      </section>

      {/* Global Status Notification */}
      {status && (
        <div className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-between animate-in slide-in-from-top-4 ${
          status.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={status.type === "success" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            {status.message}
          </div>
          <button onClick={() => setStatus(null)} className="text-[10px] uppercase underline">Tutup</button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isProcessing}
        type="danger"
        title="Hapus Transaksi?"
        message="Tindakan ini tidak dapat dibatalkan. Baris data di Google Sheets akan dihapus secara permanen."
      />

      {/* Edit Modal (Portal style) */}
      {editItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setEditItem(null)} />
          <div className="relative w-full max-w-2xl bg-card-bg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-border">
            <form onSubmit={handleUpdate} className="p-6">
              <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="text-lg font-black text-foreground">Edit Transaksi <span className="text-primary">#{editItem.id}</span></h3>
                <button type="button" onClick={() => setEditItem(null)} className="p-2 hover:bg-bg-subtle rounded-xl text-text-muted transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              {editItem.jenis_transaksi === "Pengeluaran" && (
                <div className="mx-1 mb-6 p-4 rounded-[1.25rem] border border-primary/10 bg-primary/[0.03] flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-[10px] font-black text-primary/80 leading-relaxed uppercase tracking-widest">
                    Mode Pengeluaran Aktif: Field Nama Klien, Instansi, dan Jenis Layanan dikosongkan & dikunci secara otomatis.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase mb-1.5 block tracking-tight">Tanggal Transaksi</label>
                    <input
                      type="date"
                      value={new Date(editItem.tanggal).toLocaleDateString('en-CA')}
                      onChange={(e) => setEditItem({...editItem, tanggal: e.target.value})}
                      className="w-full bg-bg-subtle border border-border rounded-xl p-2.5 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase mb-1.5 block tracking-tight">Nama Klien</label>
                    <input
                      type="text"
                      value={editItem.nama_klien}
                      disabled={editItem.jenis_transaksi === "Pengeluaran"}
                      onChange={(e) => setEditItem({...editItem, nama_klien: e.target.value})}
                      className={`w-full bg-bg-subtle border border-border rounded-xl p-2.5 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all ${editItem.jenis_transaksi === "Pengeluaran" ? "opacity-50 cursor-not-allowed bg-slate-100/50" : ""}`}
                    />
                  </div>

                  <SearchableSelect
                    label="Asal Instansi"
                    placeholder="Cari Kampus..."
                    options={IndonesianUniversities}
                    value={editItem.asal_instansi}
                    disabled={editItem.jenis_transaksi === "Pengeluaran"}
                    onChange={(val) => setEditItem({ ...editItem, asal_instansi: val })}
                  />
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  <SearchableSelect
                    label="Jenis Layanan"
                    placeholder="Cari Layanan..."
                    options={JokiServices}
                    value={editItem.produk_layanan}
                    disabled={editItem.jenis_transaksi === "Pengeluaran"}
                    onChange={(val) => {
                      const selectedService = JokiServices.find(s => s.value === val);
                      setEditItem({ 
                        ...editItem, 
                        produk_layanan: val,
                        nominal: selectedService && selectedService.price > 0 ? selectedService.price : editItem.nominal
                      });
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-text-muted uppercase mb-1.5 block tracking-tight">Nominal</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted font-bold text-[10px]">Rp</span>
                        <input
                          type="text"
                          value={editItem.nominal ? Number(editItem.nominal).toLocaleString("id-ID") : ""}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/[^0-9]/g, "");
                            setEditItem({...editItem, nominal: rawValue ? Number(rawValue) : 0});
                          }}
                          className="w-full bg-bg-subtle border border-border rounded-xl p-2.5 pl-8 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-text-muted uppercase mb-1.5 block tracking-tight">Status Kas</label>
                      <div className="relative group">
                        <select
                          value={editItem.jenis_transaksi}
                          onChange={(e) => {
                            const newType = e.target.value;
                            if (newType === "Pengeluaran") {
                              setEditItem({
                                ...editItem,
                                jenis_transaksi: newType,
                                nama_klien: "-",
                                asal_instansi: "-",
                                produk_layanan: ""
                              });
                            } else {
                              setEditItem({ ...editItem, jenis_transaksi: newType });
                            }
                          }}
                          className="appearance-none w-full bg-bg-subtle border border-border rounded-xl p-2.5 pr-8 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                          <option value="Pemasukan">Pemasukan</option>
                          <option value="Pengeluaran">Pengeluaran</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>


                  <SearchableSelect
                    label="Metode Pembayaran"
                    placeholder="Pilih Metode..."
                    options={PaymentMethods}
                    value={editItem.metode_pembayaran}
                    onChange={(val) => setEditItem({ ...editItem, metode_pembayaran: val })}
                  />

                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase mb-1.5 block tracking-tight">Catatan Singkat</label>
                    <textarea
                      value={editItem.catatan}
                      onChange={(e) => setEditItem({...editItem, catatan: e.target.value})}
                      className="w-full bg-bg-subtle border border-border rounded-xl p-2.5 text-xs font-medium h-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditItem(null)} 
                  className="flex-1 py-3 font-bold text-[11px] uppercase tracking-wider text-red-500 hover:bg-red-50 border border-red-100 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing} 
                  className="flex-1 py-3 bg-primary text-white font-bold text-[11px] uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                >
                   {isProcessing ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="subtle-card p-0 overflow-hidden w-full max-w-full">
        {/* Manage Filter Bar */}
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-subtle">
          <div className="flex bg-card-bg p-1 rounded-xl w-fit border border-border shadow-sm">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "all" ? "bg-primary text-white" : "text-text-muted"}`}>Semua</button>
            <button onClick={() => setFilter("in")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "in" ? "bg-primary text-white" : "text-text-muted"}`}>Pemasukan</button>
            <button onClick={() => setFilter("out")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "out" ? "bg-primary text-white" : "text-text-muted"}`}>Pengeluaran</button>
          </div>
          <div className="relative flex-1 max-sm:max-w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Cari ID atau Nama Klien..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card-bg border border-border rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all pl-10 text-foreground"
            />
             <svg className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="flex items-center gap-2 px-6 py-3 bg-primary/[0.03] border-b border-border">
          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Tip: Klik baris untuk detail transaksi lengkap</p>
        </div>
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-border text-text-muted text-[10px] uppercase font-black tracking-[0.2em] bg-bg-subtle/50">
                <th className="px-6 py-4">Data Transaksi</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4 text-center">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!isMounted ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-6"><div className="h-10 w-48 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-32 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-24 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-28 skeleton-shimmer rounded-lg mx-auto"></div></td>
                  </tr>
                ))
              ) : isLoading ? (
                Array(skeletonSize).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-6"><div className="h-10 w-48 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-32 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-6 w-24 skeleton-shimmer rounded-lg"></div></td>
                    <td className="px-6 py-6"><div className="h-8 w-28 skeleton-shimmer rounded-lg mx-auto"></div></td>
                  </tr>
                ))
              ) : filteredTransactions.map((t) => (
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
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-xl w-fit">
                        {t.produk_layanan || "-"}
                      </span>
                      <p className="text-[9px] font-bold text-text-muted mt-1 px-1">
                        {isMounted ? new Date(t.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-base font-black ${t.jenis_transaksi === "Pemasukan" ? "text-primary" : "text-red-500"}`}>
                      {t.jenis_transaksi === "Pemasukan" ? "+" : "-"}{formatCurrency(t.nominal)}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setEditItem(t);
                         }}
                         className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 rounded-2xl transition-all border border-transparent hover:border-primary/20"
                         title="Edit Data"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(t.id);
                        }}
                        className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50/50 rounded-2xl transition-all border border-transparent hover:border-red-200"
                        title="Hapus Data"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredTransactions.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-text-muted text-xs italic">Data tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
