"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Toast from "@/components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Show success toast before redirect
      setShowToast(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8faff] overflow-hidden">
      <Toast 
        show={showToast} 
        message="Login Berhasil! Mengalihkan ke Dashboard..." 
        onClose={() => setShowToast(false)}
      />

      {/* Brand Side (Blue Section) */}
      <div className="relative flex-1 bg-gradient-to-br from-[#1a6edb] to-[#0a4bb3] flex flex-col items-center justify-center p-12 text-white min-h-[40vh] lg:min-h-screen z-10 transition-all duration-700">
        <div className="relative z-20 text-center space-y-8 max-w-sm animate-in fade-in slide-in-from-left-8 duration-1000">
          <p className="text-xl font-medium tracking-wide">Welcome to</p>
          
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/40 transform hover:scale-110 transition-transform duration-500">
              <svg className="w-14 h-14 text-[#1a6edb]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 1.5l-2.2 6.5C19 12 15 14 15 14s-2 4-6 5.3l-6.5 2.2 4.2-4.2c.5-1 1-1.5 1-1.5s2.5.5 5.5-2.5 2.5-5.5 2.5-5.5-1-.5-1.5-1.5l4.2-4.2zM8 12a1 1 0 100 2 1 1 0 000-2zm1.5-6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Mifabyte</h1>
          </div>

          <p className="text-blue-100/80 leading-relaxed text-sm">
            Platform manajemen finansial modern dengan integrasi Cloud Computing yang cerdas dan efisien.
          </p>
        </div>

        {/* Waves Animation Container */}
        <div className="hidden lg:block absolute top-0 left-full h-full w-24 overflow-hidden z-20">
            <svg 
              className="h-full w-full" 
              viewBox="0 0 100 800" 
              preserveAspectRatio="none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0 0C40 100 100 200 100 300C100 400 30px 500 0 600C-30 700 0 800 0 800V0H0Z" 
                fill="#0a4bb3"
                className="animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              <path 
                d="M0 0C30 150 70 300 70 450C70 600 30px 750 0 800V0H0Z" 
                fill="#1a6edb"
                opacity="0.5"
              />
            </svg>
        </div>

        {/* Mobile Wave Wrapper */}
        <div className="lg:hidden absolute bottom-[-1px] left-0 w-full h-16 overflow-hidden z-20">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 100" 
              preserveAspectRatio="none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 100C100 60 200 0 300 0C400 0 500 70 600 100C700 130 800 100 800 100H0V100Z" fill="#f8faff" />
            </svg>
        </div>
      </div>

      {/* Form Side (White Section) */}
      <div className="flex-[1.2] flex items-center justify-center p-8 lg:p-24 relative bg-[#f8faff]">
        <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-800">Masuk ke Panel</h2>
            <p className="text-slate-500 font-medium text-sm">Lanjutkan manajemen finansial Anda sekarang.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-3 border border-red-100 animate-bounce">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative border-b-2 border-slate-200 group-focus-within:border-primary transition-all duration-300">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@mifabyte.id"
                    required
                    className="w-full bg-transparent py-3 px-1 text-slate-800 focus:outline-none font-semibold text-lg"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
                <div className="relative border-b-2 border-slate-200 group-focus-within:border-primary transition-all duration-300">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-transparent py-3 px-1 text-slate-800 focus:outline-none font-semibold text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.225 0 2.390.22 3.475.625m4.313 1.375C20.668 7.943 21 10.125 21 12c0 1.875-.332 4.057-3.487 6.375M15 12a3 3 0 11-6 0 3 3 0 016 0zm6-9L3 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" />
              <label htmlFor="terms" className="text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-700 transition-colors">By Logging in, I agree with <span className="text-primary underline">Terms & Conditions</span></label>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[1.5] bg-[#1a6edb] hover:bg-[#0a4bb3] text-white py-4 rounded-xl text-sm font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? "Mengautentikasi..." : "Masuk"}
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-slate-200 text-slate-400 py-4 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
