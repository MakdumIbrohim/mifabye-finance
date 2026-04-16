"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const categories = [
  { id: 'akademik', name: 'Joki Akademik', icon: '📝' },
  { id: 'teknologi', name: 'Layanan Teknologi', icon: '💻' }
];

const servicesData = {
  akademik: [
    { name: "Artikel Ilmiah", price: "Rp 150rb+", icon: "📝", desc: "Penulisan artikel ilmiah berkualitas untuk jurnal dan publikasi." },
    { name: "Penyusunan Makalah", price: "Rp 50rb+", icon: "📄", desc: "Pengerjaan makalah tugas sekolah atau kuliah dengan riset mendalam." },
    { name: "Desain PPT", price: "Rp 35rb+", icon: "🎨", desc: "Presentasi visual yang menarik dan profesional untuk berbagai kebutuhan." },
  ],
  teknologi: [
    { name: "Web Dev (FE & BE)", price: "Rp 1jt+", icon: "🌐", desc: "Pembuatan website fungsional dari Front-End hingga Back-End." },
    { name: "Aplikasi Mobile", price: "Rp 2jt+", icon: "📱", desc: "Pengembangan aplikasi Android & iOS sesuai kebutuhan Anda." },
    { name: "Lisensi Windows", price: "Rp 100rb", icon: "🔑", desc: "Aktivasi dan pembukaan lisensi Windows yang terkunci secara resmi." },
  ]
};

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('akademik');

  const services = servicesData[activeTab as keyof typeof servicesData];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Header Navigasi */}
      <header className="h-16 border-b border-border-light flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm">M</div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">Mifabyte<span className="text-primary">.id</span></span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#about" className="hover:text-primary transition-colors">Tentang</a>
            <a href="#services" className="hover:text-primary transition-colors">Harga</a>
          </nav>
          <Link href="/login" className="btn-primary py-2 px-5 text-sm">
            Portal Staf
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Section Hero / Tentang */}
        <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
                Solusi Joki & Teknologi Premium
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Solusi terbaik untuk <span className="text-primary">tugas & proyek Anda.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                Mifabyte menghadirkan layanan profesional untuk kebutuhan akademik dan teknologi. Mulai dari penulisan ilmiah hingga pengembangan aplikasi berskala tinggi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="btn-primary px-8 py-4">Mulai Sekarang</button>
                <button className="px-8 py-4 rounded-xl border border-border-light text-slate-700 font-semibold hover:bg-slate-50 transition-colors">Lihat Layanan</button>
              </div>
              <div className="flex items-center gap-8 border-t border-border-light pt-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900">5rb+</p>
                  <p className="text-xs text-slate-500 font-medium uppercase mt-1">Proyek Selesai</p>
                </div>
                <div className="w-px h-10 bg-border-light" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-xs text-slate-500 font-medium uppercase mt-1">Rating Kepuasan</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="relative">
                <div className="subtle-card p-2 aspect-[4/3] flex items-center justify-center bg-primary-light/30 border-primary/5 overflow-hidden">
                  <div className="w-full h-full bg-slate-100 rounded-lg animate-pulse flex items-center justify-center text-slate-300">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  {/* Elemen melayang seperti di gambar referensi */}
                  <div className="absolute top-8 -right-4 subtle-card p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">✓</div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Staf Terpilih</p>
                        <p className="text-[10px] text-slate-500">Proses Cepat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section Harga / Layanan */}
        <section id="services" className="bg-slate-50 py-24 px-6 md:px-12 border-y border-border-light">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Daftar Harga Layanan</h2>
              <p className="text-slate-500 max-w-xl mx-auto mb-10">Pilih kategori layanan yang Anda butuhkan untuk melihat detail harga.</p>
              
              {/* Tab Switcher */}
              <div className="flex justify-center gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit mx-auto border border-border-light">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === cat.id 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
            
            <div id="prices" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="subtle-card p-8 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center text-2xl mb-6 font-bold">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">{service.desc}</p>
                    
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                        <span className="text-xs text-slate-400 font-medium">mulai</span>
                      </div>
                      <button className="w-full py-3 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
                        Pilih Paket
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section Dukungan */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Punya pertanyaan? Kami di sini.</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">Tim dukungan kami aktif 24/7 untuk memastikan pesanan Anda berjalan lancar. Bergabunglah dengan komunitas 5000+ gamer kami.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-10 py-4">Dukungan WhatsApp</button>
              <button className="px-10 py-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">Gabung Discord</button>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border-light px-6 md:px-12 bg-white">
        <ScrollReveal className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 tracking-tight">Mifabyte<span className="text-primary">.id</span></span>
          </div>
          <p className="text-slate-400 text-xs text-center md:text-left">© 2026 Mifabyte Tech Solutions. Penyedia Jasa Gaming Resmi.</p>
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
