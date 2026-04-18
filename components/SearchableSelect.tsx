"use client";

import React, { useState, useEffect } from "react";

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);

  // Sync internal search state with external value when it changes
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Helper to capitalize first letter of each word
  const toTitleCase = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setSearch(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-subtle border border-border-light rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          const val = toTitleCase(e.target.value);
          setSearch(val);
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <>
          <div className="absolute z-50 w-full mt-2 bg-white border border-border-light rounded-xl shadow-xl max-h-60 overflow-y-auto subtle-card p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary-light hover:text-primary rounded-lg transition-colors flex items-center justify-between group"
                >
                  {opt}
                  {value === opt && (
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-5 text-center">
                <p className="text-xs text-slate-400 font-medium italic">
                  Tidak ditemukan.
                </p>
              </div>
            )}
          </div>
          {/* Overlay to close when clicking outside */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}
