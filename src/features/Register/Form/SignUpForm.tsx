// src/features/Register/Form/SignUpForm.tsx
'use client';

import React from 'react';
import { Mail, User, Building2, Store, ArrowRight } from 'lucide-react';
import { ATMTextField, ATMPhoneField, ATMCountrySelect, ATMButton } from '@/components/atoms';
import { SignUpFormProps } from '../Types/SignUpTypes';

export const SignUpForm: React.FC<SignUpFormProps> = ({ loading, isSubmitting }) => {
  const isBusy = loading ?? isSubmitting ?? false;
  return (
    <div className="space-y-3.5 font-sans">
      {/* Row 1: Merchant Company Name & Contact Person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        <ATMTextField
          name="companyName"
          label="Company / Individual Name"
          placeholder="Enter company or brand name"
          leftIcon={<Building2 size={14} />}
          required
        />
        <ATMTextField
          name="contactName"
          label="Contact Person"
          placeholder="Enter contact person name"
          leftIcon={<User size={14} />}
          required
        />
      </div>

      {/* Row 2: Contact Email */}
      <ATMTextField
        name="contactEmail"
        type="email"
        label="Contact Email"
        placeholder="Enter contact email address"
        leftIcon={<Mail size={14} />}
        required
      />

      {/* Row 3: Contact Phone with +1 Flag Selector */}
      <ATMPhoneField
        name="contactPhone"
        countryFieldName="country"
        label="Contact Phone"
        placeholder="Enter phone number"
        required
      />

      {/* Row 4: Country & Business Nature */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        <ATMCountrySelect
          name="country"
          label="Country"
          placeholder="Select country"
          required
        />
        <ATMTextField
          name="businessNature"
          label="Business Nature (free text)"
          placeholder="e.g. Restaurant, Retail"
          leftIcon={<Store size={14} />}
        />
      </div>

      {/* Terms Agreement Checkbox */}
      <div className="flex items-center gap-2 pt-1 text-left">
        <input
          type="checkbox"
          id="terms"
          defaultChecked
          required
          className="h-4 w-4 rounded border-slate-300 text-[#FF4D00] focus:ring-[#FF4D00] cursor-pointer accent-[#FF4D00]"
        />
        <label htmlFor="terms" className="text-xs text-slate-600 leading-tight select-none cursor-pointer">
          Agreed to <span className="text-[#FF4D00] font-semibold underline underline-offset-2 hover:text-[#E03E00]">Terms and Conditions</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <ATMButton
          type="submit"
          variant="form"
          size="form"
          fullWidth
          isLoading={isBusy}
          disabled={isBusy}
          className="h-11 bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#FF621F] hover:to-[#FF4D00] shadow-md shadow-orange-500/25 text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer"
          rightIcon={<ArrowRight size={16} className="stroke-[2.5]" />}
        >
          {isBusy ? 'Registering...' : 'REGISTER'}
        </ATMButton>
      </div>
    </div>
  );
};

export default SignUpForm;
