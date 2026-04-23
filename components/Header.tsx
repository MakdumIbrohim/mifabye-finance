"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useFinance } from "@/context/FinanceContext";

interface HeaderProps {
  onOpenMenu: () => void;
}

export default function Header({ onOpenMenu }: HeaderProps) {
  const { mode, toggleMode } = useTheme();
  const { isLoading } = useFinance();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      // Reset toast flags so they can trigger again next time
      sessionStorage.removeItem("login_toast_shown");
      sessionStorage.removeItem("logout_toast_shown");
      router.replace("/login?logout=success");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-card-bg/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu - Mobile Only */}
        <button 
          onClick={onOpenMenu}
          className="p-2 -ml-2 text-slate-500 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h2 className="text-sm font-semibold text-foreground truncate">Manajemen Mifabyte</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleMode}
          className="p-2.5 bg-bg-subtle border border-border text-text-muted hover:text-primary hover:bg-primary-light rounded-xl transition-all duration-300 group"
          title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {mode === "light" ? (
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m3.343-5.657l.707.707m12.728 12.728l.707.707M6.343 17.657l-.707.707M17.657 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-foreground">Administrator</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-500 ${isLoading ? "text-primary" : "text-green-500"}`}>
            {isLoading ? (
              <>
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/40" />
                Online
              </>
            )}
          </span>
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-9 h-9 rounded-full bg-primary-light border flex items-center justify-center overflow-hidden transition-all duration-300 ${
              dropdownOpen ? "ring-2 ring-primary ring-offset-2 border-primary" : "border-primary/20 hover:border-primary/50"
            }`}
          >
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-card-bg border border-border rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-3 border-b border-border mb-1 sm:hidden">
                <p className="text-sm font-bold text-foreground">Administrator</p>
                <p className="text-[10px] text-primary font-medium">Online</p>
              </div>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center gap-3 transition-colors ${
                  isLoggingOut ? "text-slate-400 cursor-not-allowed" : "text-red-500 hover:bg-red-50"
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
