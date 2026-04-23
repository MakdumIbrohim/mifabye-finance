"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Toast from "@/components/Toast";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Protection: If already logged in, go to dashboard
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/dashboard");
      }
    });

    // 2. Handle Logout Toast
    const logoutStatus = searchParams.get("logout");
    const hasShown = sessionStorage.getItem("logout_toast_shown");

    if (logoutStatus === "success" && !hasShown) {
      setShowLogoutToast(true);
      sessionStorage.setItem("logout_toast_shown", "true");
      router.replace("/login");
    } else if (logoutStatus === "success" && hasShown) {
      router.replace("/login");
    }

    return () => unsubscribe();
  }, [searchParams, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Reset toast flags for the new session
    sessionStorage.removeItem("login_toast_shown");
    sessionStorage.removeItem("logout_toast_shown");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard?login=success");
    } catch (err: any) {
      console.error("Login error:", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Format email tidak valid.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Email atau password salah.");
          break;
        case "auth/too-many-requests":
          setError("Terlalu banyak percobaan. Silakan coba lagi nanti.");
          break;
        default:
          setError("Gagal masuk. Silakan periksa koneksi Anda.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden font-sans">
      <style jsx global>{`
        @keyframes cloudFloatX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
        }
        @keyframes cloudFloatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cloudWaver {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-cloud-1 { animation: cloudFloatX 12s ease-in-out infinite; }
        .animate-cloud-2 { animation: cloudFloatY 15s ease-in-out infinite; }
        .animate-cloud-3 { animation: cloudWaver 10s ease-in-out infinite; }
        
        .animate-cloud-h-1 { animation: cloudFloatY 14s ease-in-out infinite; }
        .animate-cloud-h-2 { animation: cloudFloatX 18s ease-in-out infinite; }
        .animate-cloud-h-3 { animation: cloudWaver 12s ease-in-out infinite; }

        @keyframes loadingDots {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .dot {
          animation: loadingDots 1.4s infinite both;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <Toast 
        show={showLogoutToast} 
        message="Logout Berhasil! Sesi Anda telah berakhir." 
        onClose={() => setShowLogoutToast(false)}
      />

      {/* Brand Side (Blue Background) */}
      <div className="relative flex-1 bg-gradient-to-br from-[#125EC8] to-[#0a3d82] flex flex-col items-center justify-center p-12 lg:p-12 sm:py-24 text-white min-h-[45vh] lg:min-h-screen z-10 transition-all duration-700">
        
        {/* Branding Elements - Balanced Spacing */}
        <div className="relative z-20 text-center space-y-10 lg:space-y-12 max-w-sm animate-in fade-in slide-in-from-left-8 duration-1000">
          <p className="text-sm lg:text-xl font-medium tracking-[0.2em] opacity-90 uppercase">Selamat Datang di</p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/50 transform hover:scale-110 transition-all duration-500 overflow-hidden p-4">
              <img src="/assets/mifabyte.png" alt="Mifabyte Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight uppercase">Mifabyte</h1>
          </div>
        </div>

        {/* Mobile Cloud Divider - Varied Organic Clouds */}
        <div className="lg:hidden absolute bottom-[-1px] left-0 w-full h-32 overflow-visible z-[15] pointer-events-none">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 120" 
              preserveAspectRatio="none" 
              fill="white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Layer 1: Varied Back */}
              <path 
                className="animate-cloud-1"
                d="M0 120 V 90 a 70,30 0 0,1 140,0 a 40,20 0 0,1 80,0 a 90,40 0 0,1 180,0 a 100,25 0 0,1 200,0 a 100,40 0 0,1 200,0 V 120 H 0 Z" 
                opacity="0.1"
              />
              {/* Layer 2: Varied Mid */}
              <path 
                className="animate-cloud-2"
                d="M0 120 V 105 a 50,20 0 0,1 100,0 a 80,30 0 0,1 160,0 a 100,20 0 0,1 200,0 a 120,35 0 0,1 240,0 a 50,20 0 0,1 100,0 V 120 H 0 Z" 
                opacity="0.2"
              />
              {/* Layer 3: Main Dynamic Bubbles */}
              <path 
                className="animate-cloud-3"
                d="M0 120 V 112 a 120,40 0 0,1 240,0 a 80,25 0 0,1 160,0 a 150,45 0 0,1 300,0 a 50,15 0 0,1 100,0 V 120 H 0 Z" 
              />
            </svg>
        </div>
      </div>

      {/* Form Side (White Section with Cloud edge) */}
      <div className="flex-[1.2] flex items-center justify-center p-8 lg:p-24 relative bg-white z-20">
        
        {/* White Organic Cloud edge - Desktop Varied Formations */}
        <div className="hidden lg:block absolute top-0 right-full h-full w-48 overflow-visible z-[15] pointer-events-none translate-x-[2px]">
            <svg 
              className="h-full w-full" 
              viewBox="0 0 120 800" 
              preserveAspectRatio="none"
              fill="white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Layer 1: Dynamic Back */}
              <path 
                className="animate-cloud-h-1"
                opacity="0.1"
                d="M120 0 H 110 a 20,40 0 0,0 0,80 a 35,60 0 0,0 0,120 a 25,40 0 0,0 0,80 a 45,70 0 0,0 0,140 a 20,45 0 0,0 0,90 a 40,65 0 0,0 0,130 a 25,35 0 0,0 0,70 a 15,45 0 0,0 0,90 H 120 V 0 Z" 
              />
              {/* Layer 2: Dynamic Mid */}
              <path 
                className="animate-cloud-h-2"
                opacity="0.2"
                d="M120 0 H 112 a 30,55 0 0,0 0,110 a 20,45 0 0,0 0,90 a 40,75 0 0,0 0,150 a 25,55 0 0,0 0,110 a 35,65 0 0,0 0,130 a 20,55 0 0,0 0,110 a 30,50 0 0,0 0,100 H 120 V 0 Z" 
              />
              {/* Layer 3: Dynamic Front */}
              <path 
                className="animate-cloud-h-3"
                d="M120 0 H 116 a 25,60 0 0,0 0,120 a 15,45 0 0,0 0,90 a 35,85 0 0,0 0,170 a 20,55 0 0,0 0,110 a 45,105 0 0,0 0,210 a 25,50 0 0,0 0,100 H 120 V 0 Z" 
              />
            </svg>
        </div>

        <div className="w-full max-w-sm space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 relative z-10">
          <form onSubmit={handleLogin} className="space-y-10">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-3 animate-pulse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-8">
              {/* E-mail Address Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-medium text-slate-500 tracking-[0.2em] uppercase">Alamat E-mail</label>
                <div className="relative border-b border-slate-200 group-focus-within:border-[#125EC8] transition-all duration-300">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda"
                    required
                    className="w-full login-input py-2 px-0 text-slate-600 outline-none focus:ring-0 text-sm placeholder:text-slate-300 placeholder:italic"
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#125EC8] opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] font-medium text-slate-500 tracking-[0.2em] uppercase">Kata Sandi</label>
                <div className="relative border-b border-slate-200 group-focus-within:border-[#125EC8] transition-all duration-300">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda"
                    required
                    className="w-full login-input py-2 px-0 text-slate-600 outline-none focus:ring-0 text-sm placeholder:text-slate-300 placeholder:italic"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#125EC8] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.225 0 2.390.22 3.475.625m4.313 1.375C20.668 7.943 21 10.125 21 12c0 1.875-.332 4.057-3.487 6.375M15 12a3 3 0 11-6 0 3 3 0 016 0zm6-9L3 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#125EC8] hover:bg-[#0a3d82] text-white py-3 rounded-full text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    Mengecek Akses
                    <span className="flex gap-0.5 ml-0.5">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </span>
                ) : (
                  "MASUK SEKARANG"
                )}
              </button>

              <div className="w-full pt-8 border-t border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] text-center leading-relaxed">
                  Akses Terbatas: <br />
                  <span className="text-slate-300">Halaman ini hanya untuk Administrator</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginContent />
    </Suspense>
  );
}
