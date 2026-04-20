"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction } from "@/lib/finance-utils";

interface FinanceContextType {
  transactions: Transaction[];
  isLoading: boolean;
  lastCount: number;
  refreshData: () => Promise<void>;
  updateTransactionLocally: (newTransaction: Transaction) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCount, setLastCount] = useState<number>(3);

  // Set initial lastCount from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("finance_last_count");
    if (saved) setLastCount(parseInt(saved));
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/finance");
      const result = await response.json();
      if (result.result === "success") {
        setTransactions(result.data);
        // Persist the new count
        setLastCount(result.data.length);
        if (typeof window !== 'undefined') {
          localStorage.setItem("finance_last_count", result.data.length.toString());
        }
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTransactionLocally = useCallback((newTransaction: Transaction) => {
    setTransactions((prev) => {
      const updated = [...prev, newTransaction];
      setLastCount(updated.length);
      if (typeof window !== 'undefined') {
        localStorage.setItem("finance_last_count", updated.length.toString());
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <FinanceContext.Provider value={{ transactions, isLoading, lastCount, refreshData, updateTransactionLocally }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
