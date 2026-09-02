'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ATMPhoneFieldProps {
  name: string;
  countryFieldName?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

export const ATMPhoneField: React.FC<ATMPhoneFieldProps> = ({
  name,
  countryFieldName = 'country',
  label,
  placeholder = '(555) 000-0000',
  helperText,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    setFieldValue(countryFieldName, 'United States');
  }, [countryFieldName, setFieldValue]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const raw = val.replace(/\D/g, '').slice(0, 10);
    let newValue = '';

    if (!raw) {
      newValue = '';
    } else if (raw.length <= 3) {
      newValue = `(${raw}`;
    } else if (raw.length <= 6) {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }

    helpers.setValue(newValue);
  };

  const errorMessage = meta.touched && meta.error ? meta.error : undefined;
  const isError = Boolean(errorMessage);

  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="block text-[11px] font-semibold text-slate-700 mb-1 tracking-normal">
          {label} {required && <span className="text-[#FF4D00] font-bold">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative w-full h-9.5 sm:h-10 rounded-lg sm:rounded-xl border transition-all duration-200 flex items-center bg-white shadow-2xs overflow-hidden',
          isError
            ? 'border-red-400 bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15'
            : 'border-slate-200 hover:border-slate-300 focus-within:border-[#FF4D00] focus-within:ring-2 focus-within:ring-[#FF4D00]/15'
        )}
      >
        {/* USA +1 Prefix with Phone Icon */}
        <div className="h-full bg-slate-50 border-r border-slate-200 px-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700 select-none shrink-0">
          <Phone size={13} className="text-slate-400" />
          <span className="text-slate-800 text-xs font-bold">+1</span>
        </div>

        {/* Clean Text Input with standard US phone format */}
        <input
          type="tel"
          name={name}
          maxLength={14}
          value={field.value || ''}
          onChange={handlePhoneChange}
          onBlur={field.onBlur}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-0 px-3 text-xs sm:text-[13px] text-slate-900 font-normal outline-none placeholder:text-slate-400"
        />
      </div>

      {isError ? (
        <div className="mt-1 text-[11px] text-red-500 font-medium leading-tight">
          {errorMessage}
        </div>
      ) : helperText ? (
        <div className="mt-1 text-[11px] text-slate-500 font-normal leading-tight">{helperText}</div>
      ) : null}
    </div>
  );
};

export default ATMPhoneField;
