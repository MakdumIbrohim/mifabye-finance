import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-lg w-full">
        {/* Logo */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Image 
            src="/assets/mifabyte.png" 
            alt="Mifabyte Logo" 
            width={60} 
            height={60} 
            className="drop-shadow-xl"
          />
        </div>

        {/* 404 Text */}
        <div className="relative mb-6 animate-in fade-in zoom-in duration-700 delay-150">
          <h1 className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-400 drop-shadow-sm select-none">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent pointer-events-none" />
        </div>

        {/* Description */}
        <div className="space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-2xl font-bold text-foreground">Halaman Tidak Ditemukan</h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-md mx-auto">
            Ups! Sepertinya Anda tersesat. Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau memang tidak pernah ada.
          </p>
        </div>

        {/* Action Button */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Link 
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-2xl overflow-hidden shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Dashboard
            </span>
          </Link>
        </div>
        
        {/* Support Link */}
        <p className="mt-12 text-xs font-semibold text-text-muted/60 animate-in fade-in duration-1000 delay-700">
          Butuh bantuan? Hubungi tim support <span className="text-primary/80">Mifabyte.id</span>
        </p>
      </div>
    </div>
  );
}
