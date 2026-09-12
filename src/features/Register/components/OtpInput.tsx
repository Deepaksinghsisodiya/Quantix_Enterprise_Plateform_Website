'use client';

import React, { useRef, useEffect } from 'react';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  hasError?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  autoFocus = true,
  hasError = false,
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
    <div className="grid grid-cols-6 gap-2 sm:gap-2.5 w-full">
      {digits.map((digit, idx) => {
        const isFilled = Boolean(digit);
        return (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={length}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleInputChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`h-12 sm:h-14 w-full text-center text-lg sm:text-xl font-bold font-mono rounded-xl border bg-white text-slate-900 transition-all focus:outline-none disabled:opacity-50 disabled:bg-slate-50 ${
              hasError
                ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-500/20'
                : isFilled
                  ? 'border-[#FF4D00] bg-orange-50/20 ring-2 ring-[#FF4D00]/20'
                  : 'border-slate-200 hover:border-slate-300 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20'
            }`}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
