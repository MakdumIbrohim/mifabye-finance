"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  {
    category: "1. Jasa Tulis",
    color: "bg-primary",
    items: [
      { name: "Buku Kecil A5", price: "Rp 3.000/Halaman" },
      { name: "Buku Besar", price: "Rp 5.000/Halaman" },
      { name: "Kertas Folio", price: "Rp 7.000/Halaman" },
    ]
  },
  {
    category: "2. Jasa Tugas",
    color: "bg-primary",
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
    color: "bg-primary",
    items: [
      { name: "Microsoft Word", price: "Rp 3.000/Halaman" },
      { name: "Excel", price: "Rp 3.000/Halaman" },
      { name: "Bahasa Inggris", price: "Rp 3.000/Halaman" },
      { name: "Rumus Matematika (Word)", price: "Rp 3.000/Halaman" },
    ]
  },
  {
    category: "4. Jasa Formatting File",
    color: "bg-primary",
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
    color: "bg-primary",
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
  },
  {
    category: "6. IT Solutions",
    color: "bg-primary",
    badge: "START FROM RP300.000",
    items: [
      { name: "Web Programming", price: "Mulai Rp 300.000" },
      { name: "Custom Development", price: "Mulai Rp 300.000" },
      { name: "Mobile Programming", price: "Mulai Rp 300.000" },
      { name: "Software Licensing", price: "Mulai Rp 300.000" },
    ]
  }
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"} relative overflow-hidden`}>
      {/* Dot Pattern Background */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? "opacity-[0.15]" : "opacity-[0.4]"}`}
        style={{
          backgroundImage: `radial-gradient(${isDarkMode ? "#38BDF8" : "#125EC8"} 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-border") + " backdrop-blur-md border-b py-3 shadow-sm" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden p-1.5 border transition-colors duration-300 ${isDarkMode ? "bg-slate-900 border-slate-700 shadow-blue-500/10" : "bg-white border-border shadow-primary/5"}`}>
              <img src="/assets/mifabyte.png" alt="Mifabyte Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Mifabyte<span className="text-primary">.id</span></h1>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 mr-4">
              <a href="#harga" className={`text-sm font-bold transition-colors ${isDarkMode ? "text-slate-400 hover:text-primary" : "text-text-muted hover:text-primary"}`}>Pricelist</a>
              <a href="/login" className="btn-primary text-xs !py-2 !px-4">Admin Dashboard</a>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isDarkMode ? "bg-slate-900 text-yellow-400 border border-slate-800" : "bg-slate-100 text-slate-600 border border-slate-200"}`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        {/* New Hero Section - Digital Academic Service */}
        <section className="max-w-4xl mx-auto mb-32 animate-fade-in">
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className={`inline-block px-4 py-1.5 rounded-full mb-4 ${isDarkMode ? "bg-blue-500/10" : "bg-primary/10"}`}>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Professional Service</span>
            </div>
            <div className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black text-3xl md:text-5xl tracking-wider shadow-xl shadow-orange-500/20 transform -rotate-1 w-full max-w-lg text-center">
              LAYANAN DIGITAL
            </div>
            <div className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-4xl md:text-7xl tracking-widest shadow-xl shadow-primary/20 transform rotate-1 w-full max-w-2xl text-center">
              AKADEMIK
            </div>
          </div>

          <div className="text-center space-y-12">
            <p className={`text-lg md:text-2xl font-bold leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
              Tugas menumpuk ? Deadline mepet ? Tenang, kami siap membantu ! Dengan layanan digital akademik, tugas selesai dengan cepat dan berkualitas.
            </p>

            {/* CTA Buttons integrated into Hero */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href="#harga" className="btn-primary !px-8 h-[60px] flex items-center justify-center shadow-xl shadow-primary/30 text-base">Lihat Daftar Harga</a>
              <a href="https://wa.me/6285854894312" target="_blank" className={`px-8 h-[60px] border rounded-2xl font-bold text-base transition-all flex items-center gap-3 shadow-lg ${isDarkMode ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800 shadow-black/20" : "bg-white border-border text-slate-900 hover:bg-bg-subtle shadow-black/5"}`}>
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.539 2.022 2.067-.541c.937.51 1.999.851 3.215.851 3.181 0 5.765-2.586 5.766-5.764 0-3.18-2.585-5.766-5.766-5.766zm3.365 8.163c-.146.411-.851.764-1.171.815-.296.046-.677.068-1.097-.066-.248-.079-.564-.187-.978-.358-1.766-.729-2.906-2.529-2.994-2.646-.088-.117-.717-.953-.717-1.816 0-.862.453-1.287.614-1.463.161-.176.351-.22.468-.22.117 0 .234.001.336.005.109.004.255-.041.4.307.146.351.5.1.5.219 0 .118-.117.219-.219.336-.102.117-.215.263-.307.351-.102.102-.208.214-.088.423.119.208.53.873 1.139 1.414.783.695 1.442.911 1.646 1.015.205.103.322.088.439-.044.117-.132.5-.585.634-.783.134-.197.268-.166.453-.098.185.068 1.171.552 1.371.65.201.098.334.146.383.23.051.083.051.482-.095.893z" /></svg>
                Konsultasi WhatsApp
              </a>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-slate-900/50 border-slate-800 shadow-blue-500/5" : "bg-white/50 border-border shadow-primary/5"}`}>
              <div className="space-y-8">
                <div className="inline-block bg-orange-500 text-white px-6 py-2 rounded-xl font-black text-sm uppercase tracking-widest transform -rotate-2">
                  Layanan yang kami sediakan
                </div>

                <div className="space-y-6 text-left">
                  {[
                    "Mengerjakan semua jenis tugas akademik",
                    "Siap kejar deadline",
                    "Privasi aman & Terpercaya",
                    "Cepat dan Tepat"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-default">
                      <div className="flex-shrink-0 text-lime-500 transform group-hover:scale-125 transition-transform">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className={`text-lg md:text-xl font-black tracking-tight transition-colors ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block relative">
                <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`} />
                <div className={`relative subtle-card p-4 rotate-3 hover:rotate-0 transition-transform duration-500 border-none shadow-2xl ${isDarkMode ? "bg-slate-800 shadow-blue-500/10" : "bg-slate-900 shadow-primary/20"}`}>
                  <div className={`aspect-video rounded-xl overflow-hidden flex items-center justify-center p-8 transition-colors ${isDarkMode ? "bg-slate-900" : "bg-slate-800"}`}>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center p-3 shadow-xl">
                        <img src="/assets/mifabyte.png" alt="Mifa" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-xs font-black text-white/40 tracking-[0.4em] uppercase">Mifabyteid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <section id="harga" className="max-w-7xl mx-auto space-y-12 mb-32">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black text-2xl tracking-widest shadow-xl shadow-orange-500/20 transform -rotate-1">
              PRICELIST
            </div>
            <p className={`text-sm font-bold uppercase tracking-widest pt-2 ${isDarkMode ? "text-slate-400" : "text-text-muted"}`}>Layanan Terbaik & Terjangkau</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {services.map((svc, idx) => {
              const isExpanded = expandedCategories.includes(svc.category);
              const itemsToShow = isExpanded ? svc.items : svc.items.slice(0, 3);
              const hasMore = svc.items.length > 3;

              return (
                <div key={idx} className={`relative !p-0 overflow-visible flex flex-col group transition-all duration-300 rounded-[1.5rem] ${isDarkMode ? "bg-slate-900 shadow-2xl shadow-black/40" : "bg-white shadow-xl shadow-primary/5"}`}>
                  {/* Minimum Offer Badge / Price Tag */}
                  {svc.badge && (
                    <div className="absolute -top-5 -right-6 z-30 transform rotate-12 pointer-events-none drop-shadow-2xl">
                      <div className="relative">
                        {/* The Tag Shape */}
                        <div className="bg-gradient-to-br from-cyan-400 to-blue-600 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
                          style={{
                            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
                            width: "170px",
                            height: "70px"
                          }}>
                          {/* Dotted Inner Border */}
                          <div className="absolute inset-1 border-2 border-dotted border-white/40 pointer-events-none"
                            style={{ clipPath: "polygon(0% 0%, 84% 0%, 98% 50%, 84% 100%, 0% 100%)" }} />

                          {/* Tag Hole */}
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-inner shadow-black/20" />

                          <div className="relative z-10 pr-8 pl-3 flex flex-col items-start text-left">
                            <span className="text-[9px] font-black text-white/90 leading-none uppercase tracking-widest italic">Penawaran Minimum</span>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-white leading-tight uppercase tracking-tighter">Mulai Dari</span>
                              <span className="text-[14px] font-black text-white leading-none tracking-tighter drop-shadow-md">RP 300.000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`p-5 ${svc.color} text-white rounded-t-[1.5rem]`}>
                    <h3 className="text-lg font-black tracking-tight">{svc.category}</h3>
                  </div>
                   <div className={`p-6 space-y-4 ${isDarkMode ? "bg-slate-900" : "bg-white"} rounded-b-[1.5rem]`}>
                    <div className="space-y-4 flex-grow">
                      {itemsToShow.map((item, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 group/item">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className={`w-1.5 h-1.5 rounded-full ${svc.color} opacity-40 mt-1.5 flex-shrink-0`} />
                            <span className={`text-sm font-bold transition-colors leading-tight ${isDarkMode ? "text-slate-300 group-hover/item:text-white" : "text-slate-700 group-hover/item:text-primary"}`}>
                              {item.name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg transition-all flex-shrink-0 text-right ${isDarkMode ? "bg-white/5 text-slate-400 group-hover/item:bg-primary/20 group-hover/item:text-primary" : "bg-bg-subtle text-text-muted group-hover/item:bg-primary group-hover/item:text-white"}`}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    {hasMore && (
                      <button
                        onClick={() => toggleCategory(svc.category)}
                        className={`relative z-20 w-full mt-4 py-4 text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all rounded-b-xl group/btn ${isDarkMode ? "hover:bg-white/5 active:bg-white/10" : "hover:bg-primary/5 active:bg-primary/10"}`}
                      >
                        {isExpanded ? "Sembunyikan" : `Lihat ${svc.items.length - 3} Lainnya`}
                        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    {/* Specific Disclaimer for IT Solutions */}
                    {svc.category === "6. IT Solutions" && (
                      <div className={`mt-6 p-3 rounded-xl border flex items-start gap-3 transition-all ${isDarkMode ? "bg-primary/10 border-primary/20" : "bg-primary/5 border-primary/10"}`}>
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className={`text-[11px] font-bold leading-relaxed ${isDarkMode ? "text-primary/90" : "text-primary"}`}>
                          Harga dapat berubah tergantung kompleksitas aplikasi.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className={`lg:col-span-1 p-8 space-y-10 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Ketentuan Layanan</h3>
                </div>
                <p className={`text-sm font-bold leading-relaxed italic ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  "Melunasi payment sebelum file dikirim atau paling tidak melakukan <span className="text-orange-600 underline underline-offset-4 decoration-2">DP 50%</span> sebagai tanda jadi."
                </p>
              </div>

              <div className="space-y-6">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-2 ${isDarkMode ? "text-primary/60 border-primary/20" : "text-primary/40 border-primary/10"}`}>Metode Pembayaran</h3>
                <div className="space-y-4">
                  <div className="group/pay">
                    <p className={`text-[10px] font-bold uppercase mb-1 ${isDarkMode ? "text-slate-500" : "text-text-muted"}`}>Bank BCA</p>
                    <p className={`text-lg font-black font-mono tracking-tighter group-hover:text-primary transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>1921366201</p>
                  </div>
                  <div className="group/pay">
                    <p className={`text-[10px] font-bold uppercase mb-1 ${isDarkMode ? "text-slate-500" : "text-text-muted"}`}>E-Wallet DANA</p>
                    <p className={`text-lg font-black font-mono tracking-tighter group-hover:text-orange-500 transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>085854894312</p>
                  </div>
                  <div className="group/pay">
                    <p className={`text-[10px] font-bold uppercase mb-1 ${isDarkMode ? "text-slate-500" : "text-text-muted"}`}>SeaBank</p>
                    <p className={`text-lg font-black font-mono tracking-tighter group-hover:text-teal-500 transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>901368029605</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`max-w-4xl mx-auto text-center border-t pt-12 transition-colors duration-300 ${isDarkMode ? "border-slate-800" : "border-border"}`}>
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/mifabyte" target="_blank" className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDarkMode ? "text-slate-500 hover:text-pink-500" : "text-text-muted hover:text-pink-500"}`}>
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              @mifabyte
            </a>
            <div className={`w-1 h-1 rounded-full ${isDarkMode ? "bg-slate-800" : "bg-border"}`} />
            <a href="https://wa.me/6285854894312" target="_blank" className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDarkMode ? "text-slate-500 hover:text-green-500" : "text-text-muted hover:text-green-500"}`}>
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.539 2.022 2.067-.541c.937.51 1.999.851 3.215.851 3.181 0 5.765-2.586 5.766-5.764 0-3.18-2.585-5.766-5.766-5.766zm3.365 8.163c-.146.411-.851.764-1.171.815-.296.046-.677.068-1.097-.066-.248-.079-.564-.187-.978-.358-1.766-.729-2.906-2.529-2.994-2.646-.088-.117-.717-.953-.717-1.816 0-.862.453-1.287.614-1.463.161-.176.351-.22.468-.22.117 0 .234.001.336.005.109.004.255-.041.4.307.146.351.5.1.5.219 0 .118-.117.219-.219.336-.102.117-.215.263-.307.351-.102.102-.208.214-.088.423.119.208.53.873 1.139 1.414.783.695 1.442.911 1.646 1.015.205.103.322.088.439-.044.117-.132.5-.585.634-.783.134-.197.268-.166.453-.098.185.068 1.171.552 1.371.65.201.098.334.146.383.23.051.083.051.482-.095.893z" /></svg>
              085854894312
            </a>
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDarkMode ? "text-slate-600" : "text-text-muted"}`}>© 2026 Mifabyteid. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}
