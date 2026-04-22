"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import LoadingProgressBar from "@/components/LoadingProgressBar";
import { FinanceProvider, useFinance } from "@/context/FinanceContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const { isLoading } = useFinance();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loginStatus = searchParams.get("login");
    const hasShown = sessionStorage.getItem("login_toast_shown");

    if (loginStatus === "success" && !hasShown) {
      setShowWelcomeToast(true);
      sessionStorage.setItem("login_toast_shown", "true");
      // Clean up URL immediately
      router.replace("/dashboard");
    } else if (loginStatus === "success" && hasShown) {
      // Just clean up URL if it somehow comes back but we already saw it
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

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
