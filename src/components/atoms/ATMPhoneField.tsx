// src/components/atoms/ATMPhoneField.tsx
'use client';

import React from 'react';
import { useField } from 'formik';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ATMPhoneFieldProps {
  name: string;
  countryFieldName?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export const ATMPhoneField: React.FC<ATMPhoneFieldProps> = ({
  name,
  countryFieldName,
  label,
  placeholder = '(555) 000-0000',
  helperText,
  required = false,
  className,
}) => {
  let field: any = { value: '', onBlur: () => {} };
  let meta: any = { touched: false, error: undefined };
  let helpers: any = { setValue: () => {} };

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fieldHook = useField(name);
    field = fieldHook[0];
    meta = fieldHook[1];
    helpers = fieldHook[2];
  } catch {
    // Graceful fallback outside Formik
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const raw = val.replace(/\D/g, '').slice(0, 10);
    let newValue = '';

    if (!raw) {
      newValue = '';
    } else if (raw.length <= 3) {
      newValue = `(${raw}`;
    } else if (raw.length <= 6) {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }

    helpers.setValue(newValue);
  };

  const errorMessage = meta.touched && meta.error ? meta.error : undefined;
  const isError = Boolean(errorMessage);

  return (
    <div className={cn('w-full text-left font-sans', className)}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative w-full h-9 sm:h-9.5 rounded-xl border transition-all duration-200 flex items-center bg-white dark:bg-slate-900 shadow-2xs overflow-hidden',
          isError
            ? 'border-red-400 dark:border-red-500 bg-white dark:bg-slate-900 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15'
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus-within:border-[#FF4D00] focus-within:ring-2 focus-within:ring-[#FF4D00]/15'
        )}
      >
        {/* USA +1 Prefix with Phone Icon */}
        <div className="h-full bg-slate-50 dark:bg-slate-800/80 border-r border-slate-200 dark:border-slate-800 px-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 select-none shrink-0">
          <Phone size={13} className="text-slate-400" />
          <span className="text-slate-800 dark:text-slate-100 text-xs font-bold">+1</span>
        </div>

        {/* Clean Text Input with standard US phone format */}
        <input
          type="tel"
          name={name}
          maxLength={14}
          value={field.value || ''}
          onChange={handlePhoneChange}
          onBlur={field.onBlur}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-0 px-3 text-xs sm:text-[13px] text-slate-900 dark:text-white font-normal outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
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
