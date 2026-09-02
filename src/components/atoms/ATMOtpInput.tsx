// src/components/atoms/ATMOtpInput.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ATMOtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  hasError?: boolean;
  className?: string;
}

export const ATMOtpInput: React.FC<ATMOtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  autoFocus = true,
  hasError = false,
  className,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split string into array of characters
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (index: number, val: string) => {
    // Handle paste of multiple characters
    if (val.length > 1) {
      const cleanPasted = val.replace(/\D/g, '').slice(0, length);
      onChange(cleanPasted);
      const nextIndex = Math.min(cleanPasted.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const cleanChar = val.replace(/\D/g, '');
    const chars = [...digits];
    chars[index] = cleanChar;
    const newOtp = chars.join('').slice(0, length);
    onChange(newOtp);

    // Auto-advance to next box if character was entered
    if (cleanChar && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn('grid grid-cols-6 gap-1.5 sm:gap-2.5 w-full max-w-full', className)}>
      {digits.map((digit, idx) => {
        const isFilled = Boolean(digit);
        return (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={length}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleInputChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={cn(
              'h-11 sm:h-14 w-full text-center text-base sm:text-xl font-bold font-mono rounded-lg sm:rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all focus:outline-none disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 shadow-2xs p-0',
              hasError
                ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:ring-2 focus:ring-red-500/20'
                : isFilled
                ? 'border-[#FF4D00] bg-orange-50/20 dark:bg-orange-950/20 ring-2 ring-[#FF4D00]/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20'
            )}
          />
        );
      })}
    </div>
  );
};

export default ATMOtpInput;
