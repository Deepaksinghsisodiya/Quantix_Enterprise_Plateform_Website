// src/components/atoms/ATMCheckbox.tsx
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useField } from 'formik';
import { cn } from '../../lib/utils';

export interface ATMCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof checkboxVariants> {
  name: string;
  label?: React.ReactNode;
  error?: string;
  description?: string;
}

const checkboxVariants = cva(
  'h-4 w-4 text-[#FF4D00] focus:ring-[#FF4D00] border-slate-300 dark:border-slate-700 rounded cursor-pointer accent-[#FF4D00] transition-colors',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export const ATMCheckbox: React.FC<ATMCheckboxProps> = ({
  name,
  label,
  error: explicitError,
  description,
  size,
  disabled,
  className,
  ...rest
}) => {
  let field: any = null;
  let meta: any = null;

  try {
    // Formik hook if rendered within a Formik context
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fieldHook = useField({ name, type: 'checkbox' });
    field = fieldHook[0];
    meta = fieldHook[1];
  } catch {
    // Graceful fallback if rendered outside Formik
  }

  const errorMessage =
    explicitError !== undefined
      ? explicitError
      : meta?.touched && meta?.error
      ? meta.error
      : undefined;

  const inputClass = cn(checkboxVariants({ size }), className);
  const id = `${name}-checkbox`;
  const { defaultChecked, ...cleanRest } = rest as any;

  const inputProps = field
    ? {
        ...field,
        checked: Boolean(field.value),
        ...cleanRest,
      }
    : rest;

  return (
    <div className="flex flex-col text-left select-none">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={name}
          disabled={disabled}
          className={inputClass}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage ? `${name}-error` : description ? `${name}-desc` : undefined
          }
          {...inputProps}
        />
        {label && (
          <label
            htmlFor={id}
            className="text-xs text-slate-600 dark:text-slate-300 leading-tight select-none cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>

      {description && (
        <p id={`${name}-desc`} className="mt-0.5 text-xs text-slate-500 pl-6">
          {description}
        </p>
      )}

      {errorMessage && (
        <p id={`${name}-error`} className="mt-1 text-[11px] text-red-500 font-medium pl-6">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default ATMCheckbox;

