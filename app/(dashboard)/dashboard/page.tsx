"use client";

import { useState } from "react";
import Link from "next/link";
import { IndonesianUniversities } from "@/constants/universities";
import { JokiServices } from "@/constants/services";
import SearchableSelect from "@/components/SearchableSelect";

export default function DashboardPage() {
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  
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

  // Helper to capitalize first letter of each word
  const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Beranda Dashboard</h1>
        <p className="text-sm text-slate-500">Catat transaksi dan pantau saldo tim Anda secara instan.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Input */}
        <div className="lg:col-span-1 space-y-6">

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

        {/* Info Grid - placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="subtle-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Transaksi Menunggu</h4>
                  <p className="text-xs text-slate-500">3 pesanan belum dikonfirmasi</p>
                </div>
              </div>
              <Link href="/history" className="text-xs font-bold text-primary hover:underline">Lihat Semua →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
