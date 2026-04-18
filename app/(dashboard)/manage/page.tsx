"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Transaction, formatCurrency } from "@/lib/finance-utils";
import ConfirmationModal from "@/components/ConfirmationModal";
import SearchableSelect from "@/components/SearchableSelect";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";

export default function ManagePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  // Modal States
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Transaction | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Fetch Data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/finance");
      const result = await response.json();
      if (result.result === "success") {
        setTransactions(result.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        setStatus({ type: "success", message: "Data berhasil dihapus!" });
        fetchData();
      } else {
        setStatus({ type: "error", message: "Gagal menghapus data." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Kesalahan koneksi saat menghapus." });
    } finally {
      setIsProcessing(false);
      setDeleteId(null);
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
          layanan: editItem.jenis_layanan,
          jumlah: editItem.nominal,
          catatan: editItem.catatan,
          transactionType: editItem.jenis_transaksi === "Uang Masuk" ? "in" : "out"
        }),
      });
      const result = await response.json();
      if (result.result === "success") {
        setStatus({ type: "success", message: "Data berhasil diperbarui!" });
        setEditItem(null);
        fetchData();
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
        (filter === "in" && t.jenis_transaksi === "Uang Masuk") || 
        (filter === "out" && t.jenis_transaksi === "Uang Keluar");
      
      const s = search.toLowerCase();
      const matchesSearch = 
        t.nama_klien?.toLowerCase().includes(s) || 
        t.id?.toLowerCase().includes(s) || 
        t.asal_instansi?.toLowerCase().includes(s) ||
        t.jenis_layanan?.toLowerCase().includes(s);

      return matchesFilter && matchesSearch;
    }).reverse();
  }, [transactions, filter, search]);

  return (
    <div className="space-y-8 pb-10">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Kelola Data Keuangan</h1>
          <p className="text-sm text-slate-500">Halaman khusus untuk mengedit atau menghapus catatan transaksi.</p>
        </div>
        {isLoading && <div className="text-xs font-bold text-primary animate-pulse">Menghubungkan ke Sheets...</div>}
      </section>

      {/* Global Status Notification */}
      {status && (
        <div className={`p-4 rounded-2xl text-sm font-bold flex items-center justify-between animate-in slide-in-from-top-4 ${
          status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
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
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <form onSubmit={handleUpdate} className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Edit Data: <span className="text-primary">{editItem.id}</span></h3>
                <button type="button" onClick={() => setEditItem(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-tight">Nama Klien</label>
                  <input
                    type="text"
                    value={editItem.nama_klien}
                    onChange={(e) => setEditItem({...editItem, nama_klien: e.target.value})}
                    className="w-full bg-subtle border border-border-light rounded-xl p-3 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-tight">Tanggal</label>
                  <input
                    type="date"
                    value={new Date(editItem.tanggal).toISOString().split('T')[0]}
                    onChange={(e) => setEditItem({...editItem, tanggal: e.target.value})}
                    className="w-full bg-subtle border border-border-light rounded-xl p-3 text-sm font-semibold"
                  />
                </div>
                <div className="md:col-span-2">
                   <SearchableSelect
                    label="Asal Instansi"
                    placeholder="Cari Kampus..."
                    options={IndonesianUniversities}
                    value={editItem.asal_instansi}
                    onChange={(val) => setEditItem({ ...editItem, asal_instansi: val })}
                  />
                </div>
                <div className="md:col-span-2">
                  <SearchableSelect
                    label="Jenis Layanan"
                    placeholder="Cari Layanan..."
                    options={JokiServices}
                    value={editItem.jenis_layanan}
                    onChange={(val) => setEditItem({ ...editItem, jenis_layanan: val })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-tight">Nominal</label>
                  <input
                    type="number"
                    value={editItem.nominal}
                    onChange={(e) => setEditItem({...editItem, nominal: Number(e.target.value)})}
                    className="w-full bg-subtle border border-border-light rounded-xl p-3 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block tracking-tight">Status Kas</label>
                  <select
                    value={editItem.jenis_transaksi}
                    onChange={(e) => setEditItem({...editItem, jenis_transaksi: e.target.value})}
                    className="w-full bg-subtle border border-border-light rounded-xl p-3 text-sm font-semibold"
                  >
                    <option value="Uang Masuk">Uang Masuk</option>
                    <option value="Uang Keluar">Uang Keluar</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setEditItem(null)} className="flex-1 py-3 font-bold text-sm text-slate-500 hover:bg-slate-50 rounded-xl">Batal</button>
                <button type="submit" disabled={isProcessing} className="flex-1 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
                   {isProcessing ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="subtle-card p-0 overflow-hidden min-h-[500px]">
        {/* Manage Filter Bar */}
        <div className="p-6 border-b border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex bg-white p-1 rounded-xl w-fit border border-border-light shadow-sm">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "all" ? "bg-primary text-white" : "text-slate-400"}`}>Semua</button>
            <button onClick={() => setFilter("in")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "in" ? "bg-primary text-white" : "text-slate-400"}`}>Pemasukan</button>
            <button onClick={() => setFilter("out")} className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider ${filter === "out" ? "bg-primary text-white" : "text-slate-400"}`}>Pengeluaran</button>
          </div>
          <div className="relative flex-1 max-w-sm">
            <input 
              type="text" 
              placeholder="Cari ID atau Nama Klien..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-border-light rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 transition-all pl-10"
            />
             <svg className="w-4 h-4 text-slate-300 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-light text-slate-400 text-[10px] uppercase font-bold tracking-widest bg-slate-50/30">
                <th className="px-6 py-4">Data Transaksi</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4 text-center">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse"><td colSpan={4} className="px-6 py-8"><div className="h-4 bg-slate-100 rounded w-full"></div></td></tr>
                ))
              ) : filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{t.nama_klien}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t.id} • {t.asal_instansi}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-1 rounded-lg">{t.jenis_layanan}</span>
                    <p className="text-[9px] text-slate-400 mt-1">{new Date(t.tanggal).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm font-bold ${t.jenis_transaksi === "Uang Masuk" ? "text-primary" : "text-red-500"}`}>{formatCurrency(t.nominal)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                         onClick={() => setEditItem(t)}
                         className="p-2 text-slate-400 hover:text-primary hover:bg-primary-light rounded-xl transition-all"
                         title="Edit Data"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => setDeleteId(t.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Hapus Data"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredTransactions.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 text-xs italic">Data tidak ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
