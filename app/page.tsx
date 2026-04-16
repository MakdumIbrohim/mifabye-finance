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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="h-16 border-b border-border-light flex items-center justify-between px-6 md:px-12 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm">M</div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">Mifabyte<span className="text-primary">.id</span></span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Pricing</a>
          </nav>
          <Link href="/login" className="btn-primary py-2 px-5 text-sm">
            Staff Portal
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero / About Section */}
        <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
                Premium Joki Services
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Ready to reach your <span className="text-primary">ultimate rank?</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                Mifabyte is Indonesia's premium digital gaming service provider. We deliver professional rank boosting, hero mastery, and account optimization with absolute security and speed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="btn-primary px-8 py-4">Get Started Now</button>
                <button className="px-8 py-4 rounded-xl border border-border-light text-slate-700 font-semibold hover:bg-slate-50 transition-colors">View Services</button>
              </div>
              <div className="flex items-center gap-8 border-t border-border-light pt-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900">10k+</p>
                  <p className="text-xs text-slate-500 font-medium uppercase mt-1">Orders Completed</p>
                </div>
                <div className="w-px h-10 bg-border-light" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-xs text-slate-500 font-medium uppercase mt-1">Success Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="subtle-card p-2 aspect-[4/3] flex items-center justify-center bg-primary-light/30 border-primary/5 overflow-hidden">
                <div className="w-full h-full bg-slate-100 rounded-lg animate-pulse flex items-center justify-center text-slate-300">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                {/* Floating elements like in reference image */}
                <div className="absolute top-8 -right-4 subtle-card p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyber-green/20 text-cyber-green flex items-center justify-center">✓</div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Staff Assigned</p>
                      <p className="text-[10px] text-slate-500">Fast Process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing/Service Section */}
        <section id="services" className="bg-slate-50 py-24 px-6 md:px-12 border-y border-border-light">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Premium gaming fulfillment with clear rates and guaranteed safety.</p>
            </div>
            
            <div id="prices" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <div key={i} className="subtle-card p-8 flex flex-col group">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center text-2xl mb-6 font-bold">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">{service.desc}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                      <span className="text-xs text-slate-400 font-medium">starting</span>
                    </div>
                    <button className="w-full py-3 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all">
                      Select Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Got questions? We're here.</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">Our support team is active 24/7 to ensure your orders are progressing smoothly. Join our community of 5000+ gamers.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary px-10 py-4">WhatsApp Support</button>
            <button className="px-10 py-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">Join Discord</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border-light px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 tracking-tight">Mifabyte<span className="text-primary">.id</span></span>
          </div>
          <p className="text-slate-400 text-xs">© 2026 Mifabyte Tech Solutions. Authorized Gaming Provider.</p>
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
