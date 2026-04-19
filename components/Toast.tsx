"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  show,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setProgress(100);
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsedTime / duration) * 100);
        setProgress(remaining);
        
        if (elapsedTime >= duration) {
          clearInterval(interval);
          onClose();
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const bgColors = {
    success: "bg-green-50/90 border-green-100",
    error: "bg-red-50/90 border-red-100",
    info: "bg-blue-50/90 border-blue-100",
  };

  const barColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-8 duration-500 ease-out">
      <div className={`relative overflow-hidden min-w-[320px] max-w-md ${bgColors[type]} backdrop-blur-md border px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4`}>
        <div className="shrink-0 bg-white p-2 rounded-full shadow-sm">
          {icons[type]}
        </div>
        <p className="text-sm font-bold text-slate-800">{message}</p>
        
        {/* Progress Bar Container */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5">
          <div 
            className={`h-full ${barColors[type]} transition-all ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
