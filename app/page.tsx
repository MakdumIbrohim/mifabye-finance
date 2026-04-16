"use client";

import Link from "next/link";

export default function RootLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Elemen Latar Belakang Halus */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-4">
            <span className="text-white font-extrabold text-xl font-mono">M</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Portal Mifabyte</h1>
          <p className="text-sm text-slate-500">Hanya untuk Personel Resmi</p>
        </div>

        <div className="subtle-card p-10 shadow-2xl shadow-slate-200/50">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">ID Karyawan</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="MFB-XXXX-XX"
                  className="w-full bg-slate-50 border border-border-light rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Kunci Akses</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-border-light rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <label className="flex items-center gap-2 cursor-pointer hover:text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-border-light bg-slate-50 text-primary focus:ring-primary/20" />
                Tetap Masuk
              </label>
              <a href="#" className="text-primary hover:underline">Lupa Kunci?</a>
            </div>

            <Link href="/dashboard" className="w-full btn-primary py-4 text-sm font-bold shadow-md shadow-primary/20 text-center block">
              Masuk ke Dashboard
            </Link>
          </form>
        </div>

        <div className="text-center mt-12 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            Akses Terenkripsi Aman • v2.4.0
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Kebijakan Privasi</a>
            <span className="text-[10px] text-slate-300">|</span>
            <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Bantuan Akses</a>
          </div>
        </div>
      </div>
    </div>
  );
}
