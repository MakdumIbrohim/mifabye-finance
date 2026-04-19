"use client";

import { useEffect, useState } from "react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: "pdf" | "csv" | "excel") => void;
  filterInfo: string;
}

export default function ExportModal({ isOpen, onClose, onExport, filterInfo }: ExportModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-md bg-card-bg rounded-[2rem] shadow-2xl border border-white/20 p-8 transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-foreground">Unduh Data</h3>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1">Pilih format laporan keuangan</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-subtle rounded-xl text-text-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {filterInfo ? (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Filter Aktif:</p>
            <p className="text-xs font-semibold text-foreground">{filterInfo}</p>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
            <div className="text-blue-500 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-blue-700 leading-relaxed">
              <strong>Tips:</strong> Untuk mengunduh data berdasarkan rentang waktu tertentu (Tahun/Bulan/Hari), silakan gunakan fitur <strong>Filter Bertingkat</strong> di halaman utama sebelum menekan tombol unduh.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onExport("pdf")}
            className="flex items-center gap-4 p-5 rounded-2xl bg-subtle border border-border hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">Dokumen PDF (.pdf)</p>
              <p className="text-[10px] text-text-muted font-medium">Format laporan resmi & cetak</p>
            </div>
          </button>

          <button
            onClick={() => onExport("excel")}
            className="flex items-center gap-4 p-5 rounded-2xl bg-subtle border border-border hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">Microsoft Excel (.xlsx)</p>
              <p className="text-[10px] text-text-muted font-medium">Olahan data angka & formula</p>
            </div>
          </button>

          <button
            onClick={() => onExport("csv")}
            className="flex items-center gap-4 p-5 rounded-2xl bg-subtle border border-border hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">Format CSV (.csv)</p>
              <p className="text-[10px] text-text-muted font-medium">Kompatibel universal & teks</p>
            </div>
          </button>
        </div>

        <p className="text-[10px] text-center text-text-muted italic mt-8">
          Data akan diunduh sesuai dengan filter yang aktif saat ini.
        </p>
      </div>
    </div>
  );
}
