'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Building, ArrowRight, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useFormikContext } from 'formik';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMSelect } from '@/components/atoms/ATMSelect';
import { ATMButton } from '@/components/atoms/ATMButton';
import { RegisterFormUIProps } from '../Types/RegisterTypes';
import { getApiBaseUrl } from '@/lib/apiBaseUrl';

export const RegisterForm: React.FC<RegisterFormUIProps> = ({ 
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
        />
        {checkingEmail && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pl-1">
            <Loader2 size={12} className="animate-spin text-primary" />
            <span>Checking email availability...</span>
          </div>
        )}
        {!checkingEmail && emailStatus && (
          <div className={`flex items-center gap-1.5 text-[11px] pl-1 font-medium ${emailStatus.available ? 'text-emerald-400' : 'text-red-400'}`}>
            {emailStatus.available ? (
              <>
                <CheckCircle2 size={12} />
                <span>{emailStatus.message}</span>
              </>
            ) : (
              <>
                <AlertCircle size={12} />
                <span>{emailStatus.message}</span>
              </>
            )}
          </div>
        )}
      </div>

      <ATMTextField
        name="password"
        type="password"
        label="Password"
        placeholder="Create a strong password (min 8 chars)"
        leftIcon={<Lock size={15} />}
      />

      <ATMTextField
        name="companyName"
        label="Company / Brand Name"
        placeholder="e.g. Apex Global Retail"
        leftIcon={<Building size={15} />}
      />

      <ATMSelect
        name="locations"
        label="Number of Store Locations"
        options={[
          { label: '1 Store (Trial)', value: '1' },
          { label: '2 - 5 Stores', value: '2-5' },
          { label: '6 - 20 Stores', value: '6-20' },
          { label: '20+ Enterprise Outlets', value: '20+' },
        ]}
      />

      <div className="pt-2">
        <ATMButton
          type="submit"
          isLoading={loading}
          className="w-full py-3 sm:py-3.5 rounded-xl font-syne font-black text-xs uppercase tracking-wider bg-primary hover:bg-[#e64700] text-white shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Start 14-Day Free Trial</span>
          <ArrowRight size={14} />
        </ATMButton>
      </div>
    </div>
  );
};

export default RegisterForm;
