import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface ATMSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, VariantProps<typeof switchVariants> {
  name: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const switchVariants = cva('relative inline-flex shrink-0 cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed', {
  variants: {
    size: {
      sm: 'w-9 h-5',
      md: 'w-11 h-6',
      lg: 'w-14 h-8',
    },
  },
  defaultVariants: { size: 'md' },
});

export const ATMSwitch: React.FC<ATMSwitchProps> = ({
  name,
  label,
  size = 'md',
  disabled = false,
  className,
  ...rest
}) => {
  const id = `${name}-switch`;
  const containerClass = cn(switchVariants({ size }), className);
  const thumbSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={id}
          name={name}
          disabled={disabled}
          className="sr-only"
          {...rest}
        />
        <span className={containerClass}>
          <span className={cn('pointer-events-none block bg-white rounded-full shadow transform transition-transform', thumbSize, 'translate-x-0')}
            style={{
              // The translation is controlled via CSS :checked pseudo-class
            }}
          />
        </span>
        {label && <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>}
      </label>
    </div>
  );
};
