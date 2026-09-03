'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Building, ArrowRight, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useFormikContext } from 'formik';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMSelect } from '@/components/atoms/ATMSelect';
import { ATMButton } from '@/components/atoms/ATMButton';
import { MultiStepSignupFormUIProps } from '../Types/RegisterTypes';
import { getApiBaseUrl } from '@/lib/apiBaseUrl';

export const MultiStepSignupForm: React.FC<MultiStepSignupFormUIProps> = ({ 
  loading 
}) => {
  const { values, setFieldError } = useFormikContext<any>();
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ available?: boolean; message?: string } | null>(null);

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      setEmailStatus(null);
      return;
    }

    setCheckingEmail(true);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/registration/check-email?email=${encodeURIComponent(email)}`);
      const json = await res.json();

      if (json.success) {
        if (json.data?.exists === true) {
          setEmailStatus({ available: false, message: 'This email is already registered. Please sign in.' });
          setFieldError('email', 'This email is already registered. Please sign in.');
        } else {
          setEmailStatus({ available: true, message: 'Email is available' });
        }
      }
    } catch {
      setEmailStatus(null);
    } finally {
      setCheckingEmail(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-3.5">
      <ATMTextField
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User size={15} />}
      />

      <div className="space-y-1">
        <ATMTextField
          name="email"
          type="email"
          label="Corporate Work Email"
          placeholder="name@company.com"
          leftIcon={<Mail size={15} />}
          onBlur={handleEmailBlur}
          rightIcon={
            checkingEmail ? (
              <Loader2 size={14} className="animate-spin text-slate-400" />
            ) : emailStatus?.available === true ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : emailStatus?.available === false ? (
              <AlertCircle size={14} className="text-red-500" />
            ) : null
          }
        />
        {emailStatus && !checkingEmail && (
          <p
            className={`text-[11px] font-medium pl-1 ${
              emailStatus.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {emailStatus.message}
          </p>
        )}
      </div>

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
          disabled={loading || emailStatus?.available === false}
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
