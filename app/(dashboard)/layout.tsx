"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { FinanceProvider } from "@/context/FinanceContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <FinanceProvider>
      <div className="flex min-h-screen bg-dark-bg">
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
    </FinanceProvider>
  );
}
