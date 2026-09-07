'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import { Mail, User, Building2, Store, ArrowRight, ChevronDown, Check, Utensils, ShoppingBag } from 'lucide-react';
import { ATMTextField, ATMPhoneField, ATMCountrySelect, ATMButton, ATMCheckbox } from '@/components/atoms';
import { SignUpFormProps } from '../Types/SignUpTypes';
import { cn } from '@/lib/utils';

export const SignUpForm: React.FC<SignUpFormProps> = ({
  loading,
  isSubmitting,
  values,
  setFieldValue,
}) => {
  const isBusy = loading ?? isSubmitting ?? false;
  const [field, , helpers] = useField('businessNature');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const businessTypes = [
    { value: 'Enterprise', label: 'Enterprise', icon: Building2 },
    { value: 'Restaurant', label: 'Restaurant', icon: Utensils },
    { value: 'Retail', label: 'Retail', icon: ShoppingBag },
  ];

  const currentSelectedValue = field.value || values?.businessNature || 'Enterprise';
  const currentType = businessTypes.find((t) => t.value === currentSelectedValue) || businessTypes[0];
  const CurrentIcon = currentType.icon;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2.5 font-sans">
      {/* Row 1: Merchant Company Name & Contact Person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <ATMTextField
          name="companyName"
          label="Company / Brand Name"
          placeholder="Company / Brand Name"
          leftIcon={<Building2 size={14} />}
          required
        />
        <ATMTextField
          name="contactName"
          label="Full Name"
          placeholder="Full Name"
          leftIcon={<User size={14} />}
          required
        />
      </div>

      {/* Row 2: Contact Email */}
      <ATMTextField
        name="contactEmail"
        type="email"
        label="Work Email"
        placeholder="Work Email"
        leftIcon={<Mail size={14} />}
        required
      />

      {/* Row 3: Contact Phone with +1 Flag Selector */}
      <ATMPhoneField
        name="contactPhone"
        countryFieldName="country"
        label="Phone Number"
        placeholder="(555) 000-0000"
        required
      />

      {/* Row 4: Country & Business Nature */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <ATMCountrySelect
          name="country"
          label="Country"
          required
        />
        <div className="w-full text-left font-sans relative" ref={typeDropdownRef}>
          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5 tracking-normal">
            Business Type
          </label>
          <button
            type="button"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            className="w-full h-9 sm:h-9.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 px-3 text-xs sm:text-[13px] font-normal transition-all duration-200 text-slate-900 dark:text-white bg-white dark:bg-slate-900 flex items-center justify-between shadow-2xs cursor-pointer select-none text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <CurrentIcon size={14} className="text-slate-400 shrink-0" />
              <span className="truncate block leading-none font-medium text-slate-900 dark:text-white">
                {currentType.label}
              </span>
            </div>

            <ChevronDown size={13} className={cn('text-slate-400 shrink-0 transition-transform duration-200', isTypeDropdownOpen && 'rotate-180')} />
          </button>

          {/* Custom Popover Dropdown */}
          {isTypeDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-150">
              {businessTypes.map((t) => {
                const isSelected = currentSelectedValue === t.value;
                const IconComponent = t.icon;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => {
                      helpers.setValue(t.value);
                      if (setFieldValue) setFieldValue('businessNature', t.value);
                      setIsTypeDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-3 py-1.5 flex items-center justify-between text-xs transition-colors cursor-pointer text-left',
                      isSelected
                        ? 'bg-orange-50 dark:bg-orange-950/40 font-bold text-[#FF4D00]'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent size={14} className={isSelected ? 'text-[#FF4D00]' : 'text-slate-400'} />
                      <span>{t.label}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-[#FF4D00]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Terms Agreement Checkbox */}
      <div className="pt-0.5">
        <ATMCheckbox
          name="agreedToTerms"
          required
          label={
            <span className="text-xs">
              Agreed to{' '}
              <span className="text-[#FF4D00] font-semibold underline underline-offset-2 hover:text-[#E03E00]">
                Terms and Conditions
              </span>
            </span>
          }
        />
      </div>

      {/* Submit Button */}
      <div className="pt-1.5">
        <ATMButton
          type="submit"
          variant="form"
          size="form"
          fullWidth
          isLoading={isBusy}
          disabled={isBusy}
          className="h-9.5 sm:h-10 bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#FF621F] hover:to-[#FF4D00] shadow-md shadow-orange-500/25 text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer"
          rightIcon={<ArrowRight size={15} className="stroke-[2.5]" />}
        >
          {isBusy ? 'Creating Account...' : 'Sign Up'}
        </ATMButton>
      </div>
    </div>
  );
};

export default SignUpForm;
