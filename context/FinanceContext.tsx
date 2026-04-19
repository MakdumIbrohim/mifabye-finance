"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction } from "@/lib/finance-utils";

interface FinanceContextType {
  transactions: Transaction[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  updateTransactionLocally: (newTransaction: Transaction) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/finance");
      const result = await response.json();
      if (result.result === "success") {
        setTransactions(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTransactionLocally = useCallback((newTransaction: Transaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <FinanceContext.Provider value={{ transactions, isLoading, refreshData, updateTransactionLocally }}>
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
