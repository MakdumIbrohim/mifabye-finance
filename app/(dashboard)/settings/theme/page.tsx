"use client";

import { useTheme } from "@/context/ThemeContext";

const PRESET_COLORS = [
  { name: "Mifabyte Blue", hex: "#508fc5" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Orange", hex: "#f59e0b" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Slate", hex: "#475569" },
];

const FONTS = [
  { name: "Inter (Modern)", value: "'Inter', sans-serif" },
  { name: "Outfit (Professional)", value: "'Outfit', sans-serif" },
  { name: "Roboto (Classic)", value: "'Roboto', sans-serif" },
  { name: "Poppins (Friendly)", value: "'Poppins', sans-serif" },
];

const RADIUS_OPTIONS = [
  { name: "Sharp", value: "0px" },
  { name: "Soft", value: "0.5rem" },
  { name: "Standard", value: "1rem" },
  { name: "Round", value: "1.5rem" },
];

export default function ThemeSettingsPage() {
  const { primaryColor, fontFamily, borderRadius, setTheme } = useTheme();

  return (
    <div className="space-y-10 pb-20">
      <section>
        <h1 className="text-2xl font-bold text-foreground mb-1">Pengaturan Tema</h1>
        <p className="text-sm text-text-muted">Sesuaikan identitas visual dashboard Anda.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Controls */}
        <div className="space-y-8">
          {/* Color Picker */}
          <section className="subtle-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-tight">Warna Utama</h3>
            <div className="grid grid-cols-6 gap-3 mb-6">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setTheme({ primaryColor: color.hex })}
                  className={`h-10 w-full rounded-lg transition-all ${
                    primaryColor === color.hex ? "ring-2 ring-primary ring-offset-2 scale-90" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <div>
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">Custom Hex Code</label>
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setTheme({ primaryColor: e.target.value })}
                className="w-full bg-subtle border border-border rounded-xl p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-mono"
              />
            </div>
          </section>

          {/* Typography */}
          <section className="subtle-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-tight">Tipografi</h3>
            <div className="space-y-3">
              {FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => setTheme({ fontFamily: font.value })}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                    fontFamily === font.value 
                      ? "border-primary bg-primary-light text-primary" 
                      : "border-border bg-card-bg text-text-muted hover:border-primary/50"
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  <span className="text-sm font-medium">{font.name}</span>
                  <span className="text-xs">Abc 123</span>
                </button>
              ))}
            </div>
          </section>

          {/* Border Radius */}
          <section className="subtle-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-tight">Sudut Komponen (Radius)</h3>
            <div className="grid grid-cols-2 gap-4">
              {RADIUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme({ borderRadius: option.value })}
                  className={`p-4 rounded-xl border transition-all ${
                    borderRadius === option.value 
                      ? "border-primary bg-primary-light text-primary font-bold" 
                      : "border-border bg-card-bg text-text-muted hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Preview */}
        <div className="space-y-8 sticky top-8 h-fit">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2">Live Preview</h3>
          
          <div className="subtle-card p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                M
              </div>
              <div>
                <h4 className="font-bold text-foreground">Mifabyte Preview</h4>
                <p className="text-xs text-text-muted">Melihat perubahan secara langsung</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full bg-bg-subtle rounded-md" />
              <div className="h-4 w-2/3 bg-bg-subtle rounded-md" />
            </div>

            <div className="pt-4 flex gap-3">
              <button className="btn-primary flex-1">Primary Button</button>
              <button className="px-6 py-2 border border-border text-text-muted text-sm font-semibold rounded-xl hover:bg-bg-subtle transition-all">
                Outline
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="subtle-card p-4 flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-foreground">Fast Mode</span>
            </div>
            <div className="subtle-card p-4 flex items-center gap-3">
              <div className="p-2 bg-bg-subtle rounded-lg text-text-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-foreground">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
