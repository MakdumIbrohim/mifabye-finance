"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up"
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case "up": return "translate-y-12";
      case "down": return "-translate-y-12";
      case "left": return "translate-x-12";
      case "right": return "-translate-x-12";
      default: return "translate-y-12";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getDirectionClass(),
      }}
    >
      {children}
    </div>
  );
}
