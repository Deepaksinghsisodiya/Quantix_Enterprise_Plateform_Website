'use client';

import React from 'react';
import { useField } from 'formik';
import { cn } from '@/lib/utils';

export interface ATMTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const ATMTextField: React.FC<ATMTextFieldProps> = ({
  label,
  leftIcon,
  rightIcon,
  error: explicitError,
  helperText,
  ...props
}) => {
  let formikField: any = null;
  let formikMeta: any = null;

  try {
    const [field, meta] = useField(props.name);
    formikField = field;
    formikMeta = meta;
  } catch {
    // Graceful fallback when outside Formik context
  }

  const errorMessage = explicitError !== undefined 
    ? explicitError 
    : (formikMeta?.touched && formikMeta?.error ? formikMeta.error : undefined);

  const isError = Boolean(errorMessage);

  const inputProps = formikField
    ? { ...formikField, ...props }
    : props;

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...inputProps}
          className={cn(
            'w-full rounded-xl border py-3.5 pr-4 text-base sm:text-sm font-medium outline-none transition-all text-white',
            leftIcon ? 'pl-11' : 'pl-4',
            rightIcon ? 'pr-11' : '',
            isError
              ? 'border-red-500 bg-red-500/10 placeholder:text-red-400 focus:ring-1 focus:ring-red-500'
              : 'border-slate-800 bg-slate-900/50 placeholder:text-slate-500 focus:ring-1 focus:ring-primary',
            props.className
          )}
        />
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none">
            {leftIcon}
          </span>
        )}
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {isError ? (
        <div className="mt-1.5 text-xs text-red-500 font-medium">{errorMessage}</div>
      ) : helperText ? (
        <div className="mt-1.5 text-xs text-slate-500 font-medium">{helperText}</div>
      ) : null}
    </div>
  );
};
