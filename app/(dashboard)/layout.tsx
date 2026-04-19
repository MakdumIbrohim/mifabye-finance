"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import { FinanceProvider } from "@/context/FinanceContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loginStatus = searchParams.get("login");
    if (loginStatus === "success") {
      setShowWelcomeToast(true);
      // Clean up URL after 1s to keep it clean, but give user time to see it if needed
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen">
      <Toast 
        show={showWelcomeToast} 
        message="Login Berhasil! Selamat datang administrator." 
        onClose={() => setShowWelcomeToast(false)}
      />
      
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header onOpenMenu={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
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
