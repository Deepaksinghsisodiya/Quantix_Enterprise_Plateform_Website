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
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    setFieldValue(name, 'United States');
  }, [name, setFieldValue]);

  const errorMessage = meta.touched && meta.error ? meta.error : undefined;
  const isError = Boolean(errorMessage);

  return (
    <div className="w-full text-left font-sans relative">
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 mb-1 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}

      {/* Fixed USA Country Display */}
      <div
        className={cn(
          'w-full h-10.5 sm:h-11 rounded-xl border border-slate-200 px-3.5 text-xs sm:text-[13px] font-normal transition-all duration-200 text-slate-900 bg-slate-50/80 flex items-center shadow-2xs select-none'
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Globe2 size={14} className="text-slate-400 shrink-0" />
          <span className="truncate block leading-none font-medium text-slate-900">United States</span>
        </div>
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

export default ATMCountrySelect;
