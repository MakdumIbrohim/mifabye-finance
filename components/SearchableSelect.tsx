"use client";

import React, { useState, useEffect } from "react";

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  options: (string | { label: string, value: string })[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function SearchableSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value || "");

  // Sync internal search state with external value when it changes
  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  // Helper to capitalize first letter of each word
  const toTitleCase = (str: string) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getOptionLabel = (opt: string | { label: string, value: string }) => 
    typeof opt === 'string' ? opt : opt.label;

  const getOptionValue = (opt: string | { label: string, value: string }) => 
    typeof opt === 'string' ? opt : opt.value;

  const filteredOptions = options.filter((opt) => {
    const isShowingAll = isOpen && search === value;
    if (isShowingAll) return true;

    const optionLabel = getOptionLabel(opt).toLowerCase();
    const searchQuery = (search || "").toString().toLowerCase();
    return optionLabel.includes(searchQuery);
  });

  const handleSelect = (option: string | { label: string, value: string }) => {
    const val = getOptionValue(option);
    onChange(val);
    setSearch(getOptionLabel(option));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 block">
        {label}
      </label>
      <div className="relative group/input">
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-subtle border border-border rounded-xl p-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100/50" : ""}`}
          value={search}
          onFocus={() => !disabled && setIsOpen(true)}
          onChange={(e) => {
            const val = toTitleCase(e.target.value);
            setSearch(val);
            setIsOpen(true);
          }}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-focus-within/input:text-primary transition-colors">
          <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="absolute z-50 w-full mt-2 bg-card-bg border border-border rounded-xl shadow-xl max-h-60 overflow-y-auto subtle-card p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, i) => {
                const optLabel = getOptionLabel(opt);
                const optValue = getOptionValue(opt);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary-light hover:text-primary rounded-lg transition-colors flex items-center justify-between group"
                  >
                    {optLabel}
                    {value === optValue && (
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
                );
              })
            ) : (
              <div className="px-4 py-5 text-center">
                <p className="text-xs text-text-muted font-medium italic">
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
