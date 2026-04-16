"use client";

import { useState } from "react";

export default function FinancePage() {
  const [transactionType, setTransactionType] = useState<"in" | "out">("in");

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white mb-2">Finance Management</h1>
        <p className="text-slate-400">Track income and expenses for the Mifabyte team.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance & Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-cyber-green/20 to-transparent">
            <p className="text-sm text-slate-400 mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold text-cyber-green">Rp 4.250.000</h2>
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-2 py-1 rounded bg-cyber-green/10 text-cyber-green">+15% this month</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Transaction</h3>
            <div className="flex bg-white/5 p-1 rounded-lg mb-4">
              <button
                onClick={() => setTransactionType("in")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  transactionType === "in" ? "bg-cyber-green text-dark-bg" : "text-slate-400 hover:text-white"
                }`}
              >
                Money In
              </button>
              <button
                onClick={() => setTransactionType("out")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  transactionType === "out" ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Money Out
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase mb-1 block">Amount</label>
                <input
                  type="text"
                  placeholder="Rp 0"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase mb-1 block">Description</label>
                <textarea
                  placeholder="e.g. Pembayaran Joki #123"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 h-24"
                />
              </div>
              <button type="button" className={`w-full btn-primary py-3 ${transactionType === "out" ? "from-red-500 to-red-600 text-white" : ""}`}>
                Confirm {transactionType === "in" ? "Income" : "Expense"}
              </button>
            </form>
          </div>
        </div>

        {/* Charts and History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Financial Trends</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg transition-all duration-500 group-hover:to-primary" 
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-bg border border-glass-border px-2 py-1 rounded text-xs text-white">
                      {height * 10}k
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">DAY {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">History Log</h3>
            <div className="space-y-4">
              {[
                { label: "Joki Mythical Glory", date: "Today, 14:20", amount: "+450k", type: "in" },
                { label: "Server Maintenance", date: "Yesterday, 09:12", amount: "-120k", type: "out" },
                { label: "Skins Gift Service", date: "Oct 12, 21:05", amount: "+85k", type: "in" },
                { label: "Team Bonus", date: "Oct 10, 18:00", amount: "-500k", type: "out" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${log.type === "in" ? "bg-cyber-green" : "bg-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{log.label}</p>
                      <p className="text-xs text-slate-500">{log.date}</p>
                    </div>
                  </div>
                  <p className={`font-mono font-bold ${log.type === "in" ? "text-cyber-green" : "text-red-500"}`}>
                    {log.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
