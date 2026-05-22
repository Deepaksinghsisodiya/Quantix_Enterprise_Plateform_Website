import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export interface ATMTextAreaProps extends VariantProps<typeof textAreaVariants> {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  className?: string;
  wrapperClassName?: string;
}

const textAreaVariants = cva('block w-full rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 transition', {
  variants: {
    size: {
      sm: 'p-2 text-sm',
      md: 'p-3 text-base',
      lg: 'p-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const ATMTextArea = forwardRef<HTMLTextAreaElement, ATMTextAreaProps>(
  (
    {
      name,
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      rows = 4,
      disabled = false,
      required = false,
      maxLength,
      showCharCount = false,
      size,
      className,
      wrapperClassName,
      ...rest
    },
    ref,
  ) => {
    const textareaClass = cn(
      textAreaVariants({ size }),
      disabled && 'opacity-50 cursor-not-allowed',
      error && 'border-red-500 focus:ring-red-500',
      className,
    );

    return (
      <div className={cn("flex flex-col gap-1", wrapperClassName)}>
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span aria-hidden="true" className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={textareaClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...rest}
        />
        {showCharCount && maxLength && (
          <p className="text-xs text-gray-500 self-end">{value?.length ?? 0} / {maxLength}</p>
        )}
        {error && (
          <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

ATMTextArea.displayName = 'ATMTextArea';
