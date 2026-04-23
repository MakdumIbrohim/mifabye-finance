"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import LoadingProgressBar from "@/components/LoadingProgressBar";
import { FinanceProvider, useFinance } from "@/context/FinanceContext";
import { auth } from "@/lib/firebase";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const { isLoading } = useFinance();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setAuthLoading(false);
      }
    });

    // Handle Login Toast
    const loginStatus = searchParams.get("login");
    const hasShown = sessionStorage.getItem("login_toast_shown");

    if (loginStatus === "success" && !hasShown) {
      setShowWelcomeToast(true);
      sessionStorage.setItem("login_toast_shown", "true");
      router.replace("/dashboard");
    } else if (loginStatus === "success" && hasShown) {
      router.replace("/dashboard");
    }

    return () => unsubscribe();
  }, [searchParams, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center p-2 animate-pulse border border-blue-500/30 shadow-2xl shadow-blue-500/20">
          <img src="/assets/mifabyte.png" alt="Mifabyte Logo" className="w-full h-full object-contain" />
        </div>
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">Memverifikasi Akses</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <LoadingProgressBar isLoading={isLoading} />
      <Toast 
        show={showWelcomeToast} 
        message="Login Berhasil! Selamat datang administrator." 
        onClose={() => setShowWelcomeToast(false)}
      />
      
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <Header onOpenMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FinanceProvider>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <DashboardContent>
          {children}
        </DashboardContent>
      </Suspense>
    </FinanceProvider>
  );
}
