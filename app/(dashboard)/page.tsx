export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
          <p className="text-slate-400">Monitoring Mifabyte performance and financial health.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-card px-4 py-2 text-sm font-medium hover:bg-white/5">
            Download Report
          </button>
          <button className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Transaction
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "Rp 12.450.000", trend: "+12.5%", color: "text-primary" },
          { label: "Active Joki", value: "24 Services", trend: "+3 new", color: "text-cyber-green" },
          { label: "Team Members", value: "8 Online", trend: "Full Team", color: "text-secondary" },
          { label: "Pending Tasks", value: "14 Orders", trend: "-2 from yesterday", color: "text-orange-400" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
            <p className="text-xs text-slate-500 mt-2 font-mono">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Joki Rank Promotion</p>
                    <p className="text-xs text-slate-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-cyber-green">+Rp 150.000</p>
                  <p className="text-xs text-slate-500">Success</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Services */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Update Prices", "Team Logs", "Finances", "Settings"].map((action) => (
                <button key={action} className="p-3 text-xs font-medium text-slate-300 bg-white/5 rounded-lg border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all">
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Team Status</h3>
            <div className="space-y-4">
              {["Alex", "Budi", "Siska"].map((name) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700" />
                    <span className="text-sm text-slate-300">{name}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_8px_rgba(0,255,157,0.6)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
