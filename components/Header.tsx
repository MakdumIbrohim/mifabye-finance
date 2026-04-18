export default function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border-light flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Manajemen Mifabyte</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-slate-700">Administrator</span>
          <span className="text-xs text-primary font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-sm shadow-primary/40" />
            Online
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center overflow-hidden">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </header>
  );
}
