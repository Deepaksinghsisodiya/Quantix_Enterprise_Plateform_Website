'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { defaultCountries, parseCountry, CountryIso2 } from 'react-international-phone';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ATMPhoneFieldProps {
  name: string;
  countryFieldName?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const ATMPhoneField: React.FC<ATMPhoneFieldProps> = ({
  name,
  countryFieldName = 'country',
  label,
  placeholder = 'Please enter contact phone number',
  helperText,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse all countries
  const countries = useMemo(() => {
    return defaultCountries.map((c) => {
      const parsed = parseCountry(c);
      return {
        iso2: parsed.iso2.toUpperCase() as CountryIso2,
        name: parsed.name,
        dialCode: `+${parsed.dialCode}`,
      };
    });
  }, []);

  const selectedIso = (values?.[countryFieldName] || 'US').toUpperCase();
  const currentCountry = useMemo(() => {
    return countries.find((c) => c.iso2 === selectedIso) || countries.find((c) => c.iso2 === 'US') || countries[0];
  }, [countries, selectedIso]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.iso2.toLowerCase().includes(q)
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

  const handleSelectCountry = (country: (typeof countries)[0]) => {
    setFieldValue(countryFieldName, country.iso2);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="w-full text-left font-sans" ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 mb-1 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative w-full h-9.5 sm:h-10 rounded-lg sm:rounded-xl border transition-all duration-200 flex items-center bg-white shadow-2xs',
          isError
            ? 'border-red-400 bg-red-50/40 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15'
            : 'border-slate-200 hover:border-slate-300 focus-within:border-[#FF4D00] focus-within:ring-2 focus-within:ring-[#FF4D00]/15'
        )}
      >
        {/* Country Selector Button showing Flag + Dial Code (+1 / +91) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-full bg-slate-50 hover:bg-slate-100/90 border-r border-slate-200 px-2.5 rounded-l-lg sm:rounded-l-xl flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors shrink-0 cursor-pointer select-none"
        >
          <span className="text-sm leading-none">
            {selectedIso === 'US'
              ? '🇺🇸'
              : selectedIso === 'IN'
              ? '🇮🇳'
              : selectedIso === 'GB'
              ? '🇬🇧'
              : selectedIso === 'CA'
              ? '🇨🇦'
              : selectedIso === 'AE'
              ? '🇦🇪'
              : selectedIso === 'AU'
              ? '🇦🇺'
              : '🌐'}
          </span>
          <span className="text-slate-800 text-[11.5px] font-bold">{currentCountry.dialCode}</span>
          <ChevronDown size={12} className={cn('text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>

        {/* Clean Text Input with "Please enter contact phone number" */}
        <input
          type="tel"
          name={name}
          value={field.value || ''}
          onChange={(e) => helpers.setValue(e.target.value)}
          onBlur={field.onBlur}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-0 px-3 text-xs sm:text-[13px] text-slate-900 font-normal outline-none placeholder:text-slate-400"
        />

        {/* Dropdown Popover */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-64 max-h-60 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-1.5">
              <Search size={13} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-slate-50 py-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <button
                    key={c.iso2}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={cn(
                      'w-full px-3 py-1.5 flex items-center justify-between text-xs transition-colors hover:bg-orange-50 hover:text-[#FF4D00] text-left cursor-pointer',
                      c.iso2 === selectedIso ? 'bg-orange-50/80 font-bold text-[#FF4D00]' : 'text-slate-700'
                    )}
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="font-semibold text-slate-500 text-[11px] shrink-0">{c.dialCode}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-slate-400">No countries found</div>
              )}
            </div>
          </div>
        )}
      </div>

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

export default ATMPhoneField;
