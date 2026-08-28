import React from 'react';
import { Mail, Lock, User, Building, ArrowRight, MapPin } from 'lucide-react';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMSelect } from '@/components/atoms/ATMSelect';
import { ATMButton } from '@/components/atoms/ATMButton';
import { MultiStepSignupFormUIProps } from '../Types/RegisterTypes';

export const MultiStepSignupForm: React.FC<MultiStepSignupFormUIProps> = ({ 
  loading 
}) => {
  return (
    <div className="space-y-3 sm:space-y-3.5">
      <ATMTextField
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User size={15} />}
      />
      <ATMTextField
        name="email"
        type="email"
        label="Corporate Work Email"
        placeholder="name@company.com"
        leftIcon={<Mail size={15} />}
      />
      <ATMTextField
        name="password"
        type="password"
        label="Create Password"
        placeholder="At least 6 characters"
        leftIcon={<Lock size={15} />}
      />
      <ATMTextField
        name="companyName"
        label="Enterprise / Company Name"
        placeholder="e.g. Apex Hospitality Group"
        leftIcon={<Building size={15} />}
      />
      <ATMSelect
        name="locations"
        label="Number of Stores / Locations"
        leftIcon={<MapPin size={15} />}
        options={[
          { value: '1', label: '1 Location (Single Store / Restaurant)' },
          { value: '2-5', label: '2 - 5 Locations (Multi-Branch)' },
          { value: '6-15', label: '6 - 15 Locations (Regional Chain)' },
          { value: '16-50', label: '16 - 50 Locations (Multi-Unit Group)' },
          { value: '50+', label: '50+ Locations (Enterprise Franchise)' },
        ]}
      />

      <div className="pt-2">
        <ATMButton
          type="submit"
          variant="form"
          size="form"
          fullWidth
          isLoading={loading}
          disabled={loading}
          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-600/30"
          rightIcon={<ArrowRight size={15} className="stroke-[2.5]" />}
        >
          Activate 14-Day Free Trial
        </ATMButton>
      </div>
    </div>
  );
};

export default MultiStepSignupForm;
