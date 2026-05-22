import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMSelectOption {
  value: string;
  label: string;
}

export interface ATMSelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  name: string;
  label?: string;
  options: ATMSelectOption[];
  error?: string;
  placeholder?: string;
  isLoading?: boolean;
}

const selectVariants = cva('block w-full rounded-md border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed', {
  variants: {
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-2.5 text-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ATMSelectField: React.FC<ATMSelectFieldProps> = ({
  name,
  label,
  options,
  error,
  placeholder = 'Select...',
  isLoading = false,
  size,
  disabled,
  className,
  ...rest
}) => {
  const selectClass = cn(selectVariants({ size, className }));

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          disabled={disabled || isLoading}
          className={selectClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-600 dark:text-red-400 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};
