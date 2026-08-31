import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, VariantProps<typeof checkboxVariants> {
  name: string;
  label?: string;
  error?: string;
  description?: string;
}

const checkboxVariants = cva('h-3.5 w-3.5 text-[#FF4D00] focus:ring-[#FF4D00] border-slate-300 rounded cursor-pointer accent-[#FF4D00]', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
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
    <div className="flex items-center space-x-2 text-left select-none">
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
      {label && (
        <label htmlFor={id} className="text-xs text-slate-600 dark:text-slate-300 font-normal select-none cursor-pointer">
          {label}
        </label>
      )}
      {description && (
        <p id={`${name}-desc`} className="text-xs text-slate-500">
          {description}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default ATMCheckbox;
