import React from 'react';
import { Mail, Lock, User, Building, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMSelect } from '@/components/atoms/ATMSelect';
import { ATMButton } from '@/components/atoms/ATMButton';
import { MultiStepSignupFormUIProps } from '../Types/RegisterTypes';

export const MultiStepSignupForm: React.FC<MultiStepSignupFormUIProps> = ({ 
  step, 
  loading, 
  prevStep 
}) => {
  return (
    <>
      {step === 1 && (
        <>
          <ATMTextField
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon={<User size={16} />}
          />
          <ATMTextField
            name="email"
            type="email"
            label="Work Email"
            placeholder="Enter your work email"
            leftIcon={<Mail size={16} />}
          />
          <ATMTextField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            leftIcon={<Lock size={16} />}
          />
          <ATMButton
            type="submit"
            variant="form"
            size="form"
            fullWidth
            className="mt-2"
            rightIcon={<ArrowRight size={16} />}
          >
            Continue
          </ATMButton>
        </>
      )}

      {step === 2 && (
        <>
          <ATMTextField
            name="companyName"
            label="Enterprise / Company Name"
            placeholder="Enter your enterprise or company name"
            leftIcon={<Building size={16} />}
          />
          <ATMSelect
            name="locations"
            label="Number of Locations"
            leftIcon={<MapPin size={16} />}
            options={[
              { value: '5-15', label: '5 - 15 Locations (Multi-Unit)' },
              { value: '16-50', label: '16 - 50 Locations (Regional Chain)' },
              { value: '51-200', label: '51 - 200 Locations (National Franchise)' },
              { value: '200+', label: '200+ Locations (Global Enterprise)' },
            ]}
          />
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={prevStep}
              aria-label="Go back"
              className="flex items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <ATMButton
              type="submit"
              variant="form"
              size="form"
              className="flex-1"
              isLoading={loading}
              disabled={loading}
            >
              Activate Trial
            </ATMButton>
          </div>
        </>
      )}
    </>
  );
};

export default MultiStepSignupForm;
