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
    <div className={`p-2.5 bg-bg-subtle border border-border rounded-xl ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className="text-text-muted">{icon}</div>
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-bold text-foreground break-words">{value || "-"}</p>
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
      <div className="relative w-full max-w-sm bg-card-bg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-border">
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-black text-foreground tracking-tight">Detail Transaksi</h3>
              <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-tighter">ID: {transaction.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-bg-subtle text-text-muted hover:text-foreground rounded-2xl transition-colors active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 p-4 bg-slate-950 rounded-2xl text-center mb-1">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5">Nominal Transaksi</p>
              <h2 className={`text-2xl font-black ${transaction.jenis_transaksi === "Pemasukan" ? 'text-primary' : 'text-red-400'}`}>
                {transaction.jenis_transaksi === "Pemasukan" ? "+" : "-"} {formatCurrency(transaction.nominal)}
              </h2>
              <div className="mt-3 flex justify-center">
                <span className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full border ${
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
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />

            <DetailItem 
              label="Produk Layanan" 
              value={transaction.produk_layanan} 
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
            />

            <DetailItem 
              label="Metode Pembayaran" 
              value={transaction.metode_pembayaran} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
            />

            <DetailItem 
              label="Catatan" 
              value={transaction.catatan} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            />

            <DetailItem 
              label="Waktu Input" 
              value={transaction.created_at ? new Date(transaction.created_at).toLocaleString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-"} 
              fullWidth
              icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </div>
          <div className="mt-4">
            <button 
              onClick={onClose}
              className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95 text-xs"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
