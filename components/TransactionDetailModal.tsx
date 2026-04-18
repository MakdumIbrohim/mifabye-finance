"use client";

import { useEffect } from "react";
import { Transaction, formatCurrency } from "@/lib/finance-utils";

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (transaction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [transaction]);

  if (!transaction) return null;

  const DetailItem = ({ label, value, icon, fullWidth = false }: { label: string; value: string | number; icon: React.ReactNode, fullWidth?: boolean }) => (
    <div className={`p-4 bg-slate-50 border border-slate-100 rounded-2xl ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="text-slate-400">{icon}</div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-bold text-slate-700 break-words">{value || "-"}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 ease-out">
        {/* Header Decor */}
        <div className={`h-2 w-full ${transaction.jenis_transaksi === "Pemasukan" ? 'bg-primary' : 'bg-red-500'}`} />
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Detail Transaksi</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">ID: {transaction.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-colors active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 p-6 bg-slate-900 rounded-[2rem] text-center mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Nominal Transaksi</p>
              <h2 className={`text-3xl font-black ${transaction.jenis_transaksi === "Pemasukan" ? 'text-primary' : 'text-red-400'}`}>
                {transaction.jenis_transaksi === "Pemasukan" ? "+" : "-"} {formatCurrency(transaction.nominal)}
              </h2>
              <div className="mt-4 flex justify-center">
                <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border ${
                  transaction.jenis_transaksi === "Pemasukan" 
                    ? 'border-primary/30 text-primary bg-primary/10' 
                    : 'border-red-500/30 text-red-400 bg-red-500/10'
                }`}>
                  {transaction.jenis_transaksi}
                </span>
              </div>
            </div>

            <DetailItem 
              label="Tanggal" 
              value={new Date(transaction.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })} 
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            
            <DetailItem 
              label="Nama Klien" 
              value={transaction.nama_klien} 
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />

            <DetailItem 
              label="Asal Instansi" 
              value={transaction.asal_instansi} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />

            <DetailItem 
              label="Produk Layanan" 
              value={transaction.produk_layanan} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
            />

            <DetailItem 
              label="Catatan" 
              value={transaction.catatan} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            />
          </div>

          <div className="mt-8">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
