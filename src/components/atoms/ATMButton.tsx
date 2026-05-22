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
      primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25',
      secondary: 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/20',
      outline: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-50',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/20',
    },
    size: {
      sm: 'px-4 py-2 text-xs rounded-full',
      md: 'px-5 py-2.5 text-sm rounded-full',
      lg: 'px-7 py-3.5 text-base rounded-full',
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
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  ...rest
}) => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-4 h-4 mr-2" />
      ) : (
        leftIcon
      )}
      {label || children}
      {rightIcon && !isLoading && rightIcon}
    </button>
  );
};
