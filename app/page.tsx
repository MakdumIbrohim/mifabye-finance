"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  {
    category: "1. Jasa Tulis",
    color: "bg-blue-600",
    items: [
      { name: "Buku Kecil A5", price: "Rp 3.000/Halaman" },
      { name: "Buku Besar", price: "Rp 5.000/Halaman" },
      { name: "Kertas Folio", price: "Rp 7.000/Halaman" },
    ]
  },
  {
    category: "2. Jasa Tugas",
    color: "bg-blue-600",
    items: [
      { name: "Makalah", price: "Rp 5.000/Halaman" },
      { name: "Esai", price: "Rp 5.000/Halaman" },
      { name: "Artikel", price: "mulai Rp 30.000" },
      { name: "Artikel Jurnal", price: "mulai Rp 50.000" },
      { name: "Proposal", price: "Rp 5.000/Halaman" },
      { name: "Laporan", price: "Rp 5.000/Halaman" },
      { name: "Resume/Review", price: "Rp 5.000/Halaman" },
      { name: "PPT (Tanpa Animasi)", price: "Rp 2.000/Slide" },
      { name: "Pembuatan Kuesioner", price: "Rp 10.000" },
      { name: "Membuat Cerpen (Cust)", price: "Rp 15.000" },
      { name: "Membuat Cerpen (Mifa)", price: "Rp 25.000" },
      { name: "Buat Modul (Word)", price: "Rp 5.000/Halaman" },
      { name: "Buat Modul (Canva)", price: "Rp 10.000/Halaman" },
      { name: "Soal SD-Mahasiswa", price: "Menyesuaikan" },
    ]
  },
  {
    category: "3. Jasa Ketik",
    color: "bg-blue-600",
    items: [
      { name: "Microsoft Word", price: "Rp 3.000/Halaman" },
      { name: "Excel", price: "Rp 3.000/Halaman" },
      { name: "Bahasa Inggris", price: "Rp 3.000/Halaman" },
      { name: "Rumus Matematika (Word)", price: "Rp 3.000/Halaman" },
    ]
  },
  {
    category: "4. Jasa Formatting File",
    color: "bg-blue-600",
    items: [
      { name: "Daftar Isi/Gambar/Tabel", price: "Rp 5.000/Halaman" },
      { name: "Merapikan Isi File", price: "Rp 1.000/Halaman" },
      { name: "Penomoran Halaman", price: "Rp 1.000/2   Halaman" },
      { name: "Koreksi Typo", price: "Rp 1.000/2 Halaman" },
      { name: "Add Dapus (Mendeley)", price: "Rp 2.000/Sumber" },
      { name: "Add Dapus (Manual)", price: "Rp 3.000/Sumber" },
      { name: "Cari Sumber & Dapus", price: "Rp 5.000/Sumber" },
    ]
  },
  {
    category: "5. Jasa Edit",
    color: "bg-blue-600",
    items: [
      { name: "CV Professional", price: "Rp 10.000" },
      { name: "Surat Lamaran Kerja", price: "Rp 10.000 - Rp 20.000" },
      { name: "Buat Poster", price: "Rp 10.000 - Rp 40.000" },
      { name: "Undangan Pernikahan Web", price: "Rp 50.000 - Rp 150.000" },
      { name: "Sertifikat Digital", price: "Rp 10.000/Sertifikat" },
      { name: "Feed IG Menarik", price: "Rp 10.000/Feed" },
      { name: "Mind Map / Flowchart", price: "Rp 5.000 - Rp 10.000" },
      { name: "Edit Foto Sederhana", price: "Rp 5.000/Foto" },
    ]
  }
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ 
             backgroundImage: "radial-gradient(#125EC8 1px, transparent 1px)", 
             backgroundSize: "24px 24px" 
           }} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-border py-3 shadow-sm" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-primary/5 overflow-hidden p-1.5 border border-border">
              <img src="/assets/mifabyte.png" alt="Mifabyte Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-foreground">Mifabyte<span className="text-primary">.id</span></h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#harga" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Pricelist</a>
            <a href="#ketentuan" className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Ketentuan</a>
            <Link href="/login" className="btn-primary text-xs !py-2 !px-4">Admin Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-24 space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Professional Service</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            Solusi Tugas & Desain <br />
            <span className="text-primary">Terpercaya Sejak 2026.</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-medium">
            Mifabyte hadir untuk membantu meringankan beban tugas sekolah, kuliah, hingga kebutuhan desain profesional Anda dengan harga mahasiswa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="#harga" className="btn-primary !px-8 !py-4 shadow-xl shadow-primary/30">Lihat Daftar Harga</a>
            <a href="https://wa.me/6285854894312" target="_blank" className="px-8 py-4 bg-white border border-border rounded-2xl font-bold text-sm hover:bg-bg-subtle transition-all flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.539 2.022 2.067-.541c.937.51 1.999.851 3.215.851 3.181 0 5.765-2.586 5.766-5.764 0-3.18-2.585-5.766-5.766-5.766zm3.365 8.163c-.146.411-.851.764-1.171.815-.296.046-.677.068-1.097-.066-.248-.079-.564-.187-.978-.358-1.766-.729-2.906-2.529-2.994-2.646-.088-.117-.717-.953-.717-1.816 0-.862.453-1.287.614-1.463.161-.176.351-.22.468-.22.117 0 .234.001.336.005.109.004.255-.041.4.307.146.351.5.1.5.219 0 .118-.117.219-.219.336-.102.117-.215.263-.307.351-.102.102-.208.214-.088.423.119.208.53.873 1.139 1.414.783.695 1.442.911 1.646 1.015.205.103.322.088.439-.044.117-.132.5-.585.634-.783.134-.197.268-.166.453-.098.185.068 1.171.552 1.371.65.201.098.334.146.383.23.051.083.051.482-.095.893z"/></svg>
              Chat WhatsApp
            </a>
          </div>
        </section>

        {/* Pricing Grid */}
        <section id="harga" className="max-w-7xl mx-auto space-y-12 mb-32">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black text-2xl tracking-widest shadow-xl shadow-orange-500/20 transform -rotate-1">
              PRICELIST
            </div>
            <p className="text-sm font-bold text-text-muted uppercase tracking-widest pt-2">Layanan Terbaik & Terjangkau</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {services.map((svc, idx) => {
              const isExpanded = expandedCategories.includes(svc.category);
              const itemsToShow = isExpanded ? svc.items : svc.items.slice(0, 3);
              const hasMore = svc.items.length > 3;

              return (
                <div key={idx} className="subtle-card !p-0 overflow-hidden flex flex-col group transition-all duration-300">
                  <div className={`p-5 ${svc.color} text-white`}>
                    <h3 className="text-lg font-black tracking-tight">{svc.category}</h3>
                  </div>
                  <div className="p-6 space-y-4 bg-white">
                    <div className="space-y-4">
                      {itemsToShow.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                          <span className="text-sm font-bold text-slate-600 leading-tight">{item.name}</span>
                          <span className="text-xs font-black text-primary bg-primary/5 px-2.5 py-1 rounded-lg whitespace-nowrap">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    {hasMore && (
                      <button 
                        onClick={() => toggleCategory(svc.category)}
                        className="relative z-20 w-full mt-4 py-4 border-t border-border text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary/5 active:bg-primary/10 transition-all rounded-b-xl group/btn"
                      >
                        {isExpanded ? "Sembunyikan" : `Lihat ${svc.items.length - 3} Lainnya`}
                        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="lg:col-span-1 p-8 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Ketentuan Layanan</h3>
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                  "Melunasi payment sebelum file dikirim atau paling tidak melakukan <span className="text-orange-600 underline underline-offset-4 decoration-2">DP 50%</span> sebagai tanda jadi."
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 border-b border-primary/10 pb-2">Metode Pembayaran</h3>
                <div className="space-y-4">
                  <div className="group/pay">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Bank BCA</p>
                    <p className="text-lg font-black text-foreground font-mono tracking-tighter group-hover:text-primary transition-colors">1921366201</p>
                  </div>
                  <div className="group/pay">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">E-Wallet DANA</p>
                    <p className="text-lg font-black text-foreground font-mono tracking-tighter group-hover:text-orange-500 transition-colors">085854894312</p>
                  </div>
                  <div className="group/pay">
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-1">SeaBank</p>
                    <p className="text-lg font-black text-foreground font-mono tracking-tighter group-hover:text-teal-500 transition-colors">901368029605</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center border-t border-border pt-12">
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/mifabyte" target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-pink-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @mifabyte
            </a>
            <div className="w-1 h-1 rounded-full bg-border" />
            <a href="https://wa.me/6285854894312" target="_blank" className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-green-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.539 2.022 2.067-.541c.937.51 1.999.851 3.215.851 3.181 0 5.765-2.586 5.766-5.764 0-3.18-2.585-5.766-5.766-5.766zm3.365 8.163c-.146.411-.851.764-1.171.815-.296.046-.677.068-1.097-.066-.248-.079-.564-.187-.978-.358-1.766-.729-2.906-2.529-2.994-2.646-.088-.117-.717-.953-.717-1.816 0-.862.453-1.287.614-1.463.161-.176.351-.22.468-.22.117 0 .234.001.336.005.109.004.255-.041.4.307.146.351.5.1.5.219 0 .118-.117.219-.219.336-.102.117-.215.263-.307.351-.102.102-.208.214-.088.423.119.208.53.873 1.139 1.414.783.695 1.442.911 1.646 1.015.205.103.322.088.439-.044.117-.132.5-.585.634-.783.134-.197.268-.166.453-.098.185.068 1.171.552 1.371.65.201.098.334.146.383.23.051.083.051.482-.095.893z"/></svg>
              085854894312
            </a>
          </div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">© 2026 Mifabyteid. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}
