"use client";

import Link from "next/link";

const services = [
  { name: "Rank Boosting", price: "Rp 50k - 500k", icon: "🚀", desc: "Fast rank climb with pro players." },
  { name: "Classic Win Rate", price: "Rp 15k / match", icon: "💎", desc: "Maintain high win rate effortlessly." },
  { name: "Hero Mastery", price: "Rp 100k / hero", icon: "⚔️", desc: "Get your hero to expert or global." },
  { name: "Tournament Prep", price: "Rp 250k / session", icon: "🏆", desc: "Strategy and team coaching." },
  { name: "Daily Missions", price: "Rp 20k / day", icon: "📅", desc: "Automation for your daily rewards." },
  { name: "Skins & Gifting", price: "Varies", icon: "🎁", desc: "Safe skin gifting and diamond top-up." },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="h-20 border-b border-glass-border flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-dark-bg">M</div>
          <span className="text-xl font-bold gradient-text">Mifabyte.id</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-primary transition-colors">About Us</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#prices" className="hover:text-primary transition-colors">Pricing</a>
          </nav>
          <Link href="/login" className="btn-primary py-2 px-6 text-sm">
            Staff Portal
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero / About Section */}
        <section id="about" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Established 2021
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8">
                Unleash Your <span className="gradient-text">Gaming Potential</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">
                Mifabyte is Indonesia's premium digital gaming service provider. We specialize in high-speed rank boosting, hero mastery, and account optimization for competitive players. Our mission is to empower gamers by providing secure, professional, and reliable services that help them reach their peak performance.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Internalized Pro Talent</h4>
                  <p className="text-sm text-slate-500">Only top 0.1% players handled your account.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Guaranteed Safety</h4>
                  <p className="text-sm text-slate-500">100% anti-ban promise with secure VPN protocols.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[150px] -z-10 animate-pulse" />
              <div className="glass-card p-4 aspect-square flex items-center justify-center border-primary/10">
                <div className="text-center">
                  <div className="text-8xl mb-4">🛡️</div>
                  <h3 className="text-3xl font-bold text-white mb-2">Mifabyte Secured</h3>
                  <p className="text-slate-400">Trusted by over 10,000+ satisfied clients across Southeast Asia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white/5 py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Strategic Gaming Solutions</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">From competitive rank climbing to exclusive skin collections, we provide the full spectrum of gaming fulfillment.</p>
          </div>
          
          <div id="prices" className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="glass-card p-10 flex flex-col group hover:border-primary/50 transition-all duration-300">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">{service.desc}</p>
                
                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-primary uppercase">Starting at</span>
                    <span className="text-xl font-bold text-cyber-green">{service.price}</span>
                  </div>
                  <button className="py-2 px-6 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-bold hover:bg-primary hover:text-dark-bg transition-colors">
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-4xl mx-auto glass-card p-12 text-center relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to dominates the battlefield?</h2>
            <p className="text-slate-400 text-lg mb-10">Join thousands of warriors who have elevated their gaming career with Mifabyte. Professionalism, Security, Speed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary py-4 px-12 text-lg">Contact via WhatsApp</button>
              <button className="glass py-4 px-12 text-lg text-white border-white/10 hover:bg-white/5 transition-colors">Browse Portfolio</button>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-[150px] -z-10" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold gradient-text">Mifabyte.id</span>
          </div>
          <p className="text-slate-500 text-sm italic">© 2026 Mifabyte Tech Solutions. Standard professional gaming policies apply.</p>
          <div className="flex gap-6">
            {["Instagram", "Twitter", "Discord"].map((item) => (
              <a key={item} href="#" className="text-slate-400 hover:text-white transition-all text-sm">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
