"use client";

const services = [
  { name: "Rank Boosting", price: "Rp 50k - 500k", icon: "🚀", desc: "Fast rank climb with pro players." },
  { name: "Classic Win Rate", price: "Rp 15k / match", icon: "💎", desc: "Maintain high win rate effortlessly." },
  { name: "Hero Mastery", price: "Rp 100k / hero", icon: "⚔️", desc: "Get your hero to expert or global." },
  { name: "Tournament Prep", price: "Rp 250k / session", icon: "🏆", desc: "Strategy and team coaching." },
  { name: "Daily Missions", price: "Rp 20k / day", icon: "📅", desc: "Automation for your daily rewards." },
  { name: "Skins & Gifting", price: "Varies", icon: "🎁", desc: "Safe skin gifting and diamond top-up." },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* About Mifabyte Section */}
      <section className="glass-card p-8 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Mifabyte<span className="text-primary">.id</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Mifabyte is Indonesia's premium digital gaming service provider. We specialize in high-speed rank boosting, hero mastery, and account optimization for competitive players. Our mission is to empower gamers by providing secure, professional, and reliable services that help them reach their peak performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-400">
                <span className="text-primary mr-2 font-bold">✓</span> Reliable Security
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-400">
                <span className="text-primary mr-2 font-bold">✓</span> Pro Players only
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-400">
                <span className="text-primary mr-2 font-bold">✓</span> 24/7 Fast Support
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="glass p-6 rounded-2xl border border-primary/20 text-center">
              <h3 className="text-3xl font-bold text-primary">5+ Years</h3>
              <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-mono">Industry Experience</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-cyber-green/20 text-center">
              <h3 className="text-3xl font-bold text-cyber-green">10k+</h3>
              <p className="text-slate-500 text-sm uppercase tracking-widest mt-1 font-mono">Successful Orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Quick Overview */}
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

      {/* Price List Section */}
      <section id="prices">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Our Premium Services</h2>
          <p className="text-slate-400">Choose from our wide range of professional gaming optimizations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="glass-card p-6 flex flex-col h-full group hover:border-primary/50 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1">{service.desc}</p>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Starting from</span>
                  <span className="text-lg font-bold text-cyber-green">{service.price}</span>
                </div>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-primary hover:text-dark-bg hover:border-primary transition-all duration-300">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity (Moved lower) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Live Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    🚀
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Rank Boosting Promo</p>
                    <p className="text-xs text-slate-500">Processing now...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-cyber-green">Ongoing</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-3">
            <button className="w-full p-4 text-left text-sm font-medium text-slate-300 bg-white/5 rounded-xl border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex justify-between items-center group">
              Manage Finances
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="w-full p-4 text-left text-sm font-medium text-slate-300 bg-white/5 rounded-xl border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all flex justify-between items-center group">
              Support Center
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
