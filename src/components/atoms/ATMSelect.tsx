'use client';

import React from 'react';
import { useField } from 'formik';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

export interface ATMSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  leftIcon?: React.ReactNode;
  options: Option[];
  error?: string;
  helperText?: string;
}

export const ATMSelect: React.FC<ATMSelectProps> = ({
  label,
  leftIcon,
  options,
  error: explicitError,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  const errorMessage = explicitError !== undefined 
    ? explicitError 
    : (meta?.touched && meta?.error ? meta.error : undefined);

  const isError = Boolean(errorMessage);

  return (
    <div>
      {label && (
        <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...field}
          {...props}
          className={cn(
            'w-full rounded-xl border py-2.5 sm:py-3 pr-10 text-xs sm:text-sm font-medium appearance-none outline-none transition-all text-white cursor-pointer',
            leftIcon ? 'pl-10 sm:pl-11' : 'pl-3.5 sm:pl-4',
            isError
              ? 'border-red-500 bg-red-500/10 placeholder-red-400 focus:ring-1 focus:ring-red-500'
              : 'border-slate-800 bg-slate-900/60 focus:ring-1 focus:ring-primary focus:border-primary/50',
            props.className
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-900 text-white py-1">
              {option.label}
            </option>
          ))}
        </select>
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronDown size={15} />
        </span>
      </div>
      {isError ? (
        <div className="mt-1 text-[11px] text-red-500 font-medium">{errorMessage}</div>
      ) : helperText ? (
        <div className="mt-1 text-[11px] text-slate-500 font-medium">{helperText}</div>
      ) : null}
    </div>
  );
};

export default ATMSelect;
