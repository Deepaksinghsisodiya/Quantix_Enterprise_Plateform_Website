'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { Globe2, ChevronDown, Search } from 'lucide-react';
import { defaultCountries, parseCountry } from 'react-international-phone';
import { cn } from '@/lib/utils';

export interface ATMCountrySelectProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  placeholder?: string;
}

export const ATMCountrySelect: React.FC<ATMCountrySelectProps> = ({
  name,
  label,
  required = false,
  helperText,
  placeholder = 'Select country',
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse all countries: name and iso2 only
  const countries = useMemo(() => {
    return defaultCountries.map((c) => {
      const parsed = parseCountry(c);
      return {
        iso2: parsed.iso2.toUpperCase(),
        name: parsed.name,
      };
    });
  }, []);

  const selectedIso = (field.value || 'US').toUpperCase();
  const selectedCountry = useMemo(() => {
    return countries.find((c) => c.iso2 === selectedIso) || countries[0];
  }, [countries, selectedIso]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.iso2.toLowerCase().includes(q)
    );
  }, [countries, search]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const errorMessage = meta.touched && meta.error ? meta.error : undefined;
  const isError = Boolean(errorMessage);

  const handleSelect = (iso2: string) => {
    setFieldValue(name, iso2);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full text-left font-sans relative" ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 mb-1 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}

      {/* Trigger Button with exact pixel alignment matching ATMTextField */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative w-full h-9.5 sm:h-10 rounded-lg sm:rounded-xl border pl-9 pr-8 text-xs sm:text-[13px] font-normal transition-all duration-200 text-slate-900 bg-white flex items-center shadow-2xs cursor-pointer select-none text-left',
          isError
            ? 'border-red-400 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/15'
            : 'border-slate-200 hover:border-slate-300 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15'
        )}
      >
        <span className="truncate block leading-none">{selectedCountry?.name || placeholder}</span>

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
          <Globe2 size={14} />
        </span>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
          <ChevronDown size={13} className={cn('transition-transform duration-200', isOpen && 'rotate-180')} />
        </span>
      </button>

      {/* Compact Custom Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-1.5">
            <Search size={13} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-slate-50 py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.iso2}
                  type="button"
                  onClick={() => handleSelect(c.iso2)}
                  className={cn(
                    'w-full px-3.5 py-2 text-xs transition-colors hover:bg-orange-50 hover:text-[#FF4D00] text-left flex items-center justify-between cursor-pointer',
                    c.iso2 === selectedIso ? 'bg-orange-50/80 font-bold text-[#FF4D00]' : 'text-slate-700'
                  )}
                >
                  <span className="truncate">{c.name}</span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-slate-400">No country found</div>
            )}
          </div>
        </div>
      )}

      {isError ? (
        <div className="mt-1 text-[11px] text-red-500 font-medium leading-tight">
          {errorMessage}
        </div>
      ) : helperText ? (
        <div className="mt-1 text-[11px] text-slate-500 font-normal leading-tight">{helperText}</div>
      ) : null}
    </div>
  );
};

export default ATMCountrySelect;
