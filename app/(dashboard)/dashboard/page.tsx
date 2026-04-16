export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Team Overview</h1>
          <p className="text-sm text-slate-500">Monitoring internal operations and recent activity.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-border-light text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors bg-white">
            Daily Report
          </button>
          <button className="btn-primary text-sm px-5 py-2">
            Add Alert
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "Rp 12.45k", trend: "+12.5%", color: "text-primary" },
          { label: "Active Joki", value: "24", trend: "+3 new", color: "text-primary" },
          { label: "Team Members", value: "8", trend: "Full Team", color: "text-primary" },
          { label: "Orders", value: "14", trend: "Pending", color: "text-amber-600" },
        ].map((stat, i) => (
          <div key={i} className="subtle-card p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
              <span className="text-[10px] text-slate-400 font-medium">{stat.trend}</span>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '65%' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 subtle-card p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-tight">Recent Activity</h3>
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold">
                    {item}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">System Heartbeat Check</p>
                    <p className="text-[10px] text-slate-400">{item * 10}m ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-bold">STABLE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="space-y-6">
          <div className="subtle-card p-6 bg-primary-light/20 border-primary/5">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Verify Orders", "Team Logs", "Finances", "Config"].map((action) => (
                <button key={action} className="p-3 text-[10px] uppercase font-bold text-slate-500 bg-white rounded-lg border border-border-light hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="subtle-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tight">Staff Online</h3>
            <div className="space-y-4">
              {["Alex", "Budi", "Siska"].map((name) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 border border-white shadow-sm" />
                    <span className="text-xs font-semibold text-slate-700">{name}</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
