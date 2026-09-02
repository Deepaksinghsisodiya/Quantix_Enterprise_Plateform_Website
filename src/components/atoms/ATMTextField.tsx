// src/components/atoms/ATMTextField.tsx
'use client';

import React, { useState } from 'react';
import { useField } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ATMTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const ATMTextField: React.FC<ATMTextFieldProps> = ({
  label,
  leftIcon,
  rightIcon,
  error: explicitError,
  helperText,
  required,
  type = 'text',
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  const errorMessage = explicitError !== undefined 
    ? explicitError 
    : (meta?.touched && meta?.error ? meta.error : undefined);

  const isError = Boolean(errorMessage);

  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          {...field}
          {...props}
          type={inputType}
          value={field.value ?? ''}
          className={cn(
            'w-full h-10 sm:h-10.5 rounded-xl border px-3.5 text-xs sm:text-[13px] font-medium outline-none transition-all duration-200 text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs',
            leftIcon ? 'pl-9.5' : 'pl-3.5',
            (rightIcon || isPasswordType) ? 'pr-9.5' : 'pr-3.5',
            isError
              ? 'border-red-400 dark:border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/15'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#FF4D00] dark:focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15',
            props.className
          )}
        />
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        {/* Password Eye toggle or custom rightIcon */}
        {isPasswordType ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none cursor-pointer flex items-center justify-center"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        ) : rightIcon ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </span>
        ) : null}
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

export default ATMTextField;
