"use client";

import { useState } from "react";
import Link from "next/link";
import { IndonesianUniversities } from "@/constants/universities";

export default function DashboardPage() {
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");
  const [formData, setFormData] = useState({
    namaKlien: "",
    instansi: "",
    instansiLainnya: "",
    layanan: "",
    jumlah: "",
    catatan: ""
  });

  const layananOptions = [
    "Artikel Ilmiah",
    "Penyusunan Makalah",
    "Pembuatan PPT",
    "Web Development (FE/BE)",
    "Aplikasi Mobile",
    "Lisensi Windows",
    "Lainnya"
  ];

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
            <div className="flex bg-slate-50 p-1 rounded-xl mb-6">
              <button
                onClick={() => setTransactionType("in")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "in" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Uang Masuk
              </button>
              <button
                onClick={() => setTransactionType("out")}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  transactionType === "out" ? "bg-white text-red-500 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Uang Keluar
              </button>
            </div>

            <form className="space-y-4">
              {transactionType === "in" ? (
                <>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nama Klien</label>
                    <input
                      type="text"
                      placeholder="Nama Joki"
                      className="w-full bg-slate-50 border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                      value={formData.namaKlien}
                      onChange={(e) => setFormData({...formData, namaKlien: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Asal Instansi</label>
                      <select
                        className="w-full bg-slate-50 border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold appearance-none cursor-pointer"
                        value={formData.instansi}
                        onChange={(e) => setFormData({...formData, instansi: e.target.value})}
                      >
                        <option value="" disabled>Pilih Kampus/Sekolah</option>
                        {IndonesianUniversities.map((uni) => (
                          <option key={uni} value={uni}>{uni}</option>
                        ))}
                      </select>
                    </div>
                    
                    {formData.instansi === "Lainnya" && (
                      <div>
                        <input
                          type="text"
                          placeholder="Ketik Nama Instansi Manual..."
                          className="w-full bg-slate-50 border border-primary/20 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                          value={formData.instansiLainnya}
                          onChange={(e) => setFormData({...formData, instansiLainnya: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Pilih Layanan</label>
                    <select
                      className="w-full bg-slate-50 border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold appearance-none cursor-pointer"
                      value={formData.layanan}
                      onChange={(e) => setFormData({...formData, layanan: e.target.value})}
                    >
                      <option value="" disabled>Pilih Layanan Joki</option>
                      {layananOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : null}

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nominal Jumlah</label>
                <input
                  type="text"
                  placeholder="Rp 0"
                  className="w-full bg-slate-50 border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
                />
              </div>

              {transactionType === "out" && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Catatan</label>
                  <textarea
                    placeholder="Referensi pesanan..."
                    className="w-full bg-slate-50 border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium h-20"
                    value={formData.catatan}
                    onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                  />
                </div>
              )}

              <button type="button" className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all ${
                transactionType === "in" ? "bg-primary text-white hover:opacity-90" : "bg-red-500 text-white hover:bg-red-600"
              }`}>
                Konfirmasi {transactionType === "in" ? "Pemasukan" : "Pengeluaran"}
              </button>
            </form>
          </div>
        </div>

        {/* Grafik dan Riwayat */}
        <div className="lg:col-span-2 space-y-6">
          <div className="subtle-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-tight">Tren Pendapatan</h3>
            <div className="h-48 flex items-end justify-between gap-3 px-2">
              {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-slate-100 rounded-lg transition-all duration-300 group-hover:bg-primary-light" 
                      style={{ height: '100px' }}
                    >
                      <div 
                        className="w-full bg-primary/20 rounded-lg absolute bottom-0 transition-all duration-500 group-hover:bg-primary" 
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold tracking-tighter">OKT {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="subtle-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Log Transaksi Terakhir</h3>
              <Link href="/history" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-1">
              {[
                { label: "Jasa Boost Mythic", date: "Hari ini, 14:20", amount: "+450rb", type: "in" },
                { label: "Langganan Server", date: "Kemarin, 09:12", amount: "-120rb", type: "out" },
                { label: "Paket Master Hero", date: "12 Okt, 21:05", amount: "+85rb", type: "in" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors rounded-lg border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${log.type === "in" ? "bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-red-400"}`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{log.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{log.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${log.type === "in" ? "text-primary" : "text-red-500"}`}>
                    {log.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
