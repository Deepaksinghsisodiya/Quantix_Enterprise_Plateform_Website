'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, VariantProps<typeof buttonVariants> {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const buttonVariants = cva('flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97] hover:scale-[1.03] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25',
      secondary: 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/20 dark:bg-slate-800 dark:hover:bg-slate-700',
      outline: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/20',
      form: 'bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-syne font-extrabold uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.02] rounded-xl',
    },
    size: {
      sm: 'px-4 py-2 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
      form: 'py-4 text-sm',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

export const ATMButton: React.FC<ATMButtonProps> = ({
  label,
  children,
  onClick,
  type = 'button',
  variant,
  size,
  fullWidth,
  className,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Processing...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {label ? <span>{label}</span> : children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </div>
      )}
    </button>
  );
};
