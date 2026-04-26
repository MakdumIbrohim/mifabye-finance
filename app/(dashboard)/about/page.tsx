"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center py-12 space-y-4">
        <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-foreground tracking-tight">Kilas Balik Mifabyte</h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Mengingat kembali perjalanan awal terbentuknya komunitas dan aplikasi manajemen keuangan tim kami.
        </p>
      </section>

      <div className="max-w-2xl mx-auto">
        {/* Timeline Card - Focused on Founding Date */}
        <div className="subtle-card p-10 space-y-8 relative overflow-hidden group border-primary/20 bg-gradient-to-br from-card-bg to-primary/5">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 transform group-hover:scale-110 transition-transform duration-500">
              <span className="text-2xl font-black">19</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">Hari Kelahiran Komunitas</h2>
              <p className="text-primary font-bold tracking-widest uppercase text-xs mt-1">19 April 2026</p>
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
            
            <div className="flex gap-8 relative">
              <div className="w-16 flex-shrink-0 flex justify-center">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
              </div>
              <div className="pb-10">
                <h3 className="text-lg font-bold text-foreground">Mifabyte Resmi Terbentuk</h3>
                <p className="text-text-muted mt-2 leading-relaxed">
                  Titik awal perjalanan komunitas Mifabyte dimulai. Dibangun dengan semangat kolaborasi dan profesionalisme untuk memberikan layanan joki terbaik.
                </p>
              </div>
            </div>

            <div className="flex gap-8 relative">
              <div className="w-16 flex-shrink-0 flex justify-center">
                <div className="w-4 h-4 rounded-full bg-primary/40 ring-4 ring-primary/10 z-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Implementasi Sistem Keuangan</h3>
                <p className="text-text-muted mt-2 leading-relaxed">
                  Bersamaan dengan itu, aplikasi Mifabyte Finance ini dirancang untuk memastikan seluruh alur keuangan tim berjalan dengan jujur dan transparan.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border mt-8 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">Since 2026</span>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-xl font-black text-foreground tracking-tight uppercase tracking-widest">Tim Mifabyte</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Fitri Aulia",
            "Makdum Ibrohim",
            "Muslimah Kurniawati",
            "Tamara Adjuah"
          ].map((name, i) => (
            <div key={i} className="subtle-card p-4 flex items-center gap-4 group hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-bg-subtle flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-black text-foreground uppercase tracking-wider">{name}</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Anggota Tim</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
