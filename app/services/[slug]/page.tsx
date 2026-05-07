"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const serviceDetails: Record<string, {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}> = {
  "software-licensing": {
    title: "Software Licensing",
    description: "Kami menyediakan berbagai macam lisensi software original untuk kebutuhan akademik dan profesional. Mulai dari Microsoft Office, Adobe Creative Cloud, hingga software khusus statistik dan pemograman. Solusi cerdas untuk mendapatkan software original dengan harga yang sangat terjangkau.",
    features: [
      "Lisensi Original 100% & Permanen",
      "Aktivasi mudah & dipandu admin sampai berhasil",
      "Support teknis 24/7 jika ada kendala instalasi",
      "Harga khusus pelajar & mahasiswa (Hemat hingga 80%)",
      "Tersedia untuk Windows, Mac, dan Android",
      "Update resmi langsung dari server pengembang"
    ],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  "web-programming": {
    title: "Web Programming",
    description: "Pembuatan website kustom menggunakan teknologi modern seperti React, Next.js, dan Tailwind CSS. Kami fokus pada performa, keamanan, dan pengalaman pengguna yang luar biasa untuk membantu bisnis atau proyek Anda bersinar di dunia digital.",
    features: [
      "Desain Responsif & Modern (Mobile Friendly)",
      "Optimasi Kecepatan (Core Web Vitals)",
      "SEO Friendly untuk peringkat Google lebih baik",
      "Integrasi Pembayaran & API Pihak Ketiga",
      "Dashboard Admin untuk kelola konten",
      "Free Maintenance selama 1 bulan"
    ],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  "custom-development": {
    title: "Custom Development",
    description: "Solusi pengembangan perangkat lunak yang dipersonalisasi sesuai dengan kebutuhan spesifik Anda. Baik itu otomatisasi bisnis, sistem manajemen internal, atau alat bantu penelitian akademik.",
    features: [
      "Analisis kebutuhan mendalam",
      "Arsitektur sistem yang skalabel",
      "Keamanan data tingkat tinggi",
      "User Interface (UI) yang intuitif",
      "Dokumentasi lengkap & Source code",
      "Pelatihan penggunaan sistem"
    ],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )
  },
  "mobile-programming": {
    title: "Mobile Programming",
    description: "Kembangkan aplikasi mobile (Android & iOS) yang powerful dan elegan. Kami membantu mewujudkan ide aplikasi Anda menjadi kenyataan dengan performa native yang mulus.",
    features: [
      "Cross-platform (Flutter / React Native)",
      "Performa mulus & Animasi cantik",
      "Integrasi Notifikasi Push",
      "Mode Offline & Sinkronisasi Data",
      "Bantuan publish ke Play Store & App Store",
      "Keamanan aplikasi terjamin"
    ],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
};

export default function ServiceDetailPage() {
  const params = useParams();
  const { mode } = useTheme();
  const slug = params.slug as string;
  const detail = serviceDetails[slug];
  const isDarkMode = mode === "dark";

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-4">Layanan Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-8">Maaf, layanan yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <Link href="/" className="btn-primary !px-8">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"} relative overflow-hidden`}>
      {/* Dot Pattern Background */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDarkMode ? "opacity-[0.15]" : "opacity-[0.4]"}`}
        style={{
          backgroundImage: `radial-gradient(${isDarkMode ? "#38BDF8" : "#125EC8"} 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b py-4 transition-all duration-300 ${isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-border"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-3 group ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border transition-all duration-300 ${isDarkMode ? "bg-slate-900 border-slate-700 group-hover:border-primary" : "bg-white border-border group-hover:border-primary"}`}>
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-black text-lg">Kembali</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-border bg-white p-1">
              <img src="/assets/mifabyte.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className={`text-xl font-black tracking-tight hidden md:block ${isDarkMode ? "text-white" : "text-slate-900"}`}>Mifabyte<span className="text-primary">.id</span></h1>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in space-y-12">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 ${isDarkMode ? "bg-primary/20 text-primary shadow-primary/20" : "bg-primary text-white shadow-primary/30"}`}>
              {detail.icon}
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Detail Layanan IT</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">{detail.title}</h2>
            </div>
          </div>

          {/* Description Card */}
          <div className={`p-8 md:p-12 rounded-[2.5rem] border shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-slate-900/50 border-slate-800 shadow-blue-500/5" : "bg-white border-border shadow-primary/5"}`}>
            <p className={`text-xl md:text-2xl font-bold leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
              {detail.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary" />
              Apa yang Anda Dapatkan?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.features.map((feature, i) => (
                <div key={i} className={`p-6 rounded-2xl border flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? "bg-slate-900 border-slate-800 hover:border-primary/50" : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30"}`}>
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`font-bold transition-colors ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden border-2 ${isDarkMode ? "bg-primary/10 border-primary/30" : "bg-primary border-primary shadow-2xl shadow-primary/20"}`}>
            <div className="relative z-10 space-y-6">
              <h3 className={`text-3xl font-black uppercase ${isDarkMode ? "text-white" : "text-white"}`}>Siap untuk Memulai?</h3>
              <p className={`text-lg font-bold max-w-xl mx-auto ${isDarkMode ? "text-slate-300" : "text-white/90"}`}>
                Konsultasikan kebutuhan Anda sekarang juga secara gratis dan dapatkan penawaran terbaik.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href={`https://wa.me/6285854894312?text=Halo%20Mifabyte%2C%20saya%20ingin%20tanya%20lebih%20lanjut%20tentang%20layanan%20${encodeURIComponent(detail.title)}.`} 
                  target="_blank" 
                  className={`px-8 h-[60px] rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-xl ${isDarkMode ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-white text-primary hover:bg-slate-50"}`}
                >
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.312l-.539 2.022 2.067-.541c.937.51 1.999.851 3.215.851 3.181 0 5.765-2.586 5.766-5.764 0-3.18-2.585-5.766-5.766-5.766zm3.365 8.163c-.146.411-.851.764-1.171.815-.296.046-.677.068-1.097-.066-.248-.079-.564-.187-.978-.358-1.766-.729-2.906-2.529-2.994-2.646-.088-.117-.717-.953-.717-1.816 0-.862.453-1.287.614-1.463.161-.176.351-.22.468-.22.117 0 .234.001.336.005.109.004.255-.041.4.307.146.351.5.1.5.219 0 .118-.117.219-.219.336-.102.117-.215.263-.307.351-.102.102-.208.214-.088.423.119.208.53.873 1.139 1.414.783.695 1.442.911 1.646 1.015.205.103.322.088.439-.044.117-.132.5-.585.634-.783.134-.197.268-.166.453-.098.185.068 1.171.552 1.371.65.201.098.334.146.383.23.051.083.051.482-.095.893z" /></svg>
                  Tanya Sekarang
                </a>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32`} />
            <div className={`absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32`} />
          </div>
        </div>
      </main>

      <footer className="py-12 text-center border-t border-border dark:border-slate-800">
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? "text-slate-600" : "text-text-muted"}`}>© 2026 Mifabyteid. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
