// src/components/atoms/ATMButton.tsx
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-syne font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 focus-visible:ring-[#FF4D00]/40',
        secondary:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm focus-visible:ring-slate-500/30',
        outline:
          'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-[#FF4D00]/40 dark:hover:border-[#FF4D00]/40 hover:bg-orange-50/50 dark:hover:bg-slate-800/80 hover:text-[#FF4D00] dark:hover:text-[#FF4D00] shadow-2xs focus-visible:ring-[#FF4D00]/30',
        ghost:
          'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus-visible:ring-slate-400/20',
        danger:
          'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 hover:shadow-lg hover:shadow-rose-600/30 focus-visible:ring-rose-500/40',
        admin:
          'bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 focus-visible:ring-[#FF4D00]/40',
        form:
          'bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 focus-visible:ring-[#FF4D00]/40',
      },
      size: {
        xs: 'h-8 px-2.5 text-[11px] rounded-lg gap-1.5',
        sm: 'h-9 px-3.5 text-xs rounded-xl gap-2',
        md: 'h-10 sm:h-10.5 px-4.5 text-xs sm:text-[13px] rounded-xl gap-2',
        lg: 'h-12 px-6 text-sm sm:text-base rounded-xl gap-2.5',
        form: 'h-9.5 sm:h-10 px-4 text-xs sm:text-[13px] rounded-xl gap-2 font-bold',
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
  }
);

export interface ATMButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

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
  loadingText = 'Processing...',
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
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
          <span>{loadingText}</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 w-full">
          {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
          {label ? <span>{label}</span> : children}
          {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};

export default ATMButton;
