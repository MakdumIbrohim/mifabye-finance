"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeState = {
  primaryColor: string;
  fontFamily: string;
  borderRadius: string;
};

type ThemeContextType = ThemeState & {
  setTheme: (theme: Partial<ThemeState>) => void;
};

const defaultTheme: ThemeState = {
  primaryColor: "#508fc5",
  fontFamily: "'Inter', sans-serif",
  borderRadius: "1rem",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setInternalTheme] = useState<ThemeState>(defaultTheme);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("mifabyte-theme");
    if (saved) {
      try {
        setInternalTheme(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse theme", e);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primaryColor);
    root.style.setProperty("--font-main", theme.fontFamily);
    root.style.setProperty("--radius", theme.borderRadius);
    
    // Persist
    localStorage.setItem("mifabyte-theme", JSON.stringify(theme));
  }, [theme]);

  const setTheme = (newTheme: Partial<ThemeState>) => {
    setInternalTheme((prev) => ({ ...prev, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
