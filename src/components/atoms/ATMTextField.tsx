import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const inputVariants = cva('block w-full rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500', {
  variants: {
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ATMTextField: React.FC<ATMTextFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
  required,
  leftIcon,
  rightIcon,
  size,
  className,
  ...rest
}) => {
  return (
    <div className={cn('flex flex-col space-y-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}{required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <span className="absolute left-3 pointer-events-none">{leftIcon}</span>}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={cn(
            inputVariants({ size }),
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            error ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          {...rest}
        />
        {rightIcon && <span className="absolute right-3 pointer-events-none">{rightIcon}</span>}
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${name}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
