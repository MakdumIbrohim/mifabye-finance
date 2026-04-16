"use client";

const services = [
  { name: "Rank Boosting", price: "Rp 50k - 500k", icon: "🚀", desc: "Fast rank climb with pro players." },
  { name: "Classic Win Rate", price: "Rp 15k / match", icon: "💎", desc: "Maintain high win rate effortlessly." },
  { name: "Hero Mastery", price: "Rp 100k / hero", icon: "⚔️", desc: "Get your hero to expert or global." },
  { name: "Tournament Prep", price: "Rp 250k / session", icon: "🏆", desc: "Strategy and team coaching." },
  { name: "Daily Missions", price: "Rp 20k / day", icon: "📅", desc: "Automation for your daily rewards." },
  { name: "Skins & Gifting", price: "Varies", icon: "🎁", desc: "Safe skin gifting and diamond top-up." },
];

export default function PricesPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white mb-2">Service Prices</h1>
        <p className="text-slate-400">Premium joki services with competitive pricing.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div key={i} className="glass-card p-6 flex flex-col h-full group">
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

      <div className="glass-card p-8 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Custom Package?</h3>
          <p className="text-slate-400">Contact our team for personalized service and bulk discounts.</p>
        </div>
        <button className="btn-primary whitespace-nowrap px-8 py-4">
          Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}
