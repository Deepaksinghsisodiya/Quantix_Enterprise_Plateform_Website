import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export interface ATMPhoneFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof inputVariants> {
  name: string;
  label?: string;
  error?: string;
  description?: string;
  defaultCountry?: string; // placeholder for future intl support
}

const inputVariants = cva('block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed', {
  variants: {
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ATMPhoneField = forwardRef<HTMLInputElement, ATMPhoneFieldProps>(
  (
    { name, label, error, description, defaultCountry, size, disabled, className, ...rest },
    ref,
  ) => {
    const inputClass = cn(inputVariants({ size }), className, error && 'border-red-500 focus:ring-red-500');
    const id = `${name}-phone`;
    const errorId = `${name}-error`;
    const descId = `${name}-desc`;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          type="tel"
          ref={ref}
          placeholder={defaultCountry ? `+${defaultCountry} ...` : undefined}
          className={inputClass}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? descId : undefined}
          {...rest}
        />
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {description && !error && (
          <p id={descId} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    );
  },
);

ATMPhoneField.displayName = 'ATMPhoneField';
