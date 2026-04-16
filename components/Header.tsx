"use client";

export default function Header() {
  return (
    <header className="h-20 glass border-b border-glass-border flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Dashboard</h2>
        <p className="text-sm text-slate-400">Welcome back, Mifabyte Team!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-white">Administrator</span>
          <span className="text-xs text-cyber-green font-mono">● Online</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-glass-border flex items-center justify-center overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-primary/40 blur-[2px] absolute" />
          <svg className="w-6 h-6 text-primary relative z-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </header>
  );
}
