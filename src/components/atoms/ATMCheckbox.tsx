import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, VariantProps<typeof checkboxVariants> {
  name: string;
  label?: string;
  error?: string;
  description?: string;
}

const checkboxVariants = cva('h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ATMCheckbox: React.FC<ATMCheckboxProps> = ({
  name,
  label,
  error,
  description,
  size,
  disabled,
  className,
  ...rest
}) => {
  const inputClass = cn(checkboxVariants({ size }), className);
  const id = `${name}-checkbox`;
  return (
    <div className="flex items-start space-x-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        className={inputClass}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : description ? `${name}-desc` : undefined}
        {...rest}
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
          {label}
        </label>
        {description && (
          <p id={`${name}-desc`} className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
        {error && (
          <p id={`${name}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
