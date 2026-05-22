import React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export interface ATMLoaderProps extends VariantProps<typeof loaderVariants> {
  /** Size of the loader */
  size?: 'sm' | 'md' | 'lg';
  /** Variant: spinner, dots, skeleton */
  variant?: 'spinner' | 'dots' | 'skeleton';
  /** Tailwind color (e.g. 'primary', 'gray-500') */
  color?: string;
  /** Render full-screen overlay */
  fullScreen?: boolean;
  /** Optional accessible label */
  label?: string;
  /** Custom CSS classes */
  className?: string;
}

/** CVA for container styling */
const loaderVariants = cva('flex items-center justify-center', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    },
    variant: {
      spinner: '',
      dots: 'space-x-1',
      skeleton: 'bg-gray-200 animate-pulse',
    },
    fullScreen: {
      true: 'fixed inset-0 bg-black/30 z-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'spinner',
    fullScreen: false,
  },
});

/**
 * ATMLoader – reusable loading indicator.
 * Supports three visual variants and optional full‑screen overlay.
 */
export const ATMLoader: React.FC<ATMLoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  fullScreen = false,
  label = 'Loading',
  className,
  ...rest
}) => {
  const containerClass = cn(
    loaderVariants({ size, variant, fullScreen: !!fullScreen }),
    className
  );

  // Helper to generate color class names
  const colorClass = `text-${color}`;

  const renderContent = () => {
    switch (variant) {
      case 'spinner':
        return (
          <svg
            className={cn('animate-spin', size, colorClass)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...rest}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        );
      case 'dots':
        return (
          <div className="flex space-x-1" role="status" aria-label={label}>
            <span className={cn('w-2 h-2 rounded-full', size, colorClass, 'animate-bounce')}></span>
            <span className={cn('w-2 h-2 rounded-full', size, colorClass, 'animate-bounce delay-150')}></span>
            <span className={cn('w-2 h-2 rounded-full', size, colorClass, 'animate-bounce delay-300')}></span>
          </div>
        );
      case 'skeleton':
        return <div className={cn('rounded', size)}></div>;
      default:
        return null;
    }
  };

  return (
    <div className={containerClass} role="status" aria-live="polite">
      {renderContent()}
      {variant !== 'skeleton' && (
        <span className="sr-only" aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
};
