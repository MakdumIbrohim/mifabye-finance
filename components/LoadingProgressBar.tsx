"use client";

import { useEffect, useState } from "react";

/**
 * A premium, top-aligned loading progress bar.
 * Simulates progress while isLoading is true and completes when false.
 */
export default function LoadingProgressBar({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isLoading) {
      setVisible(true);
      setProgress(10); // Start with a small jump
      
      // Simulate slow progress towards 90%
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          // Exponential decay: move closer to 90% but slower as it gets there
          const increment = (90 - prev) * 0.15;
          return prev + increment;
        });
      }, 400);
    } else {
      // Jump to 100% when loading completes
      setProgress(100);
      
      // Hide after animation finishes
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
      
      return () => {
        clearTimeout(timer);
        if (interval) clearInterval(interval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#125EC8] to-[#3b82f6] shadow-[0_0_8px_rgba(18,94,200,0.8)] transition-all duration-500 ease-out"
        style={{ 
          width: `${progress}%`,
        }}
      />
      
      <style jsx>{`
        @keyframes sweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
