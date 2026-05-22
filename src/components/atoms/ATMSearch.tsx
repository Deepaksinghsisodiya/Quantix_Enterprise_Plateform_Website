import React, { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export interface ATMSearchProps extends VariantProps<typeof inputVariants> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  debounceMs?: number;
  className?: string;
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

export const ATMSearch: React.FC<ATMSearchProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  isLoading = false,
  debounceMs = 300,
  size,
  className,
  ...rest
}) => {
  const [internal, setInternal] = useState(value);

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        if (onSearch) onSearch(val);
      }, debounceMs),
    [onSearch, debounceMs]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInternal(val);
      if (onChange) onChange(val);
      debouncedSearch(val);
    },
    [onChange, debouncedSearch]
  );

  return (
    <div className={cn('relative', className)}>
      <input
        type="search"
        value={internal}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(inputVariants({ size }))}
        disabled={isLoading}
        aria-busy={isLoading}
        {...rest}
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};
