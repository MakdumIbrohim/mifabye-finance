import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mifabyte.id - Premium Joki & Finance",
  description: "Modern dashboard for managing joki services and finances.",
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} antialiased selection:bg-primary/30 selection:text-primary`}>
      <ThemeProvider>
        <body className="min-h-screen bg-dark-bg text-foreground overflow-x-hidden">
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
