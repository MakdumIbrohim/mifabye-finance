"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type ThemeMode = "light" | "dark";

type ThemeState = {
  primaryColor: string;
  fontFamily: string;
  borderRadius: string;
  mode: ThemeMode;
};

type ThemeContextType = ThemeState & {
  setTheme: (theme: Partial<ThemeState>) => void;
  toggleMode: () => void;
};

const defaultTheme: ThemeState = {
  primaryColor: "#508fc5",
  fontFamily: "'Inter', sans-serif",
  borderRadius: "1rem",
  mode: "light",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setInternalTheme] = useState<ThemeState>(defaultTheme);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("mifabyte-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInternalTheme(parsed);
      } catch (e) {
        console.error("Failed to parse theme", e);
      }
    } else {
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setInternalTheme(prev => ({ ...prev, mode: "dark" }));
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primaryColor);
    root.style.setProperty("--font-main", theme.fontFamily);
    root.style.setProperty("--radius", theme.borderRadius);
    
    // Apply dark mode class
    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Persist
    localStorage.setItem("mifabyte-theme", JSON.stringify(theme));
  }, [theme]);

  const setTheme = useCallback((newTheme: Partial<ThemeState>) => {
    setInternalTheme((prev) => ({ ...prev, ...newTheme }));
  }, []);

  const toggleMode = useCallback(() => {
    setInternalTheme((prev) => ({
      ...prev,
      mode: prev.mode === "light" ? "dark" : "light"
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
