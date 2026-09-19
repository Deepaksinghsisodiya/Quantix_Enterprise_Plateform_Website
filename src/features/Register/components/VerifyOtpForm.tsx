// src/features/Register/components/VerifyOtpForm.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';
import { ATMOtpInput, ATMButton } from '@/components/atoms';

export interface VerifyOtpFormProps {
  email: string;
  otp: string;
  onChangeOtp: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isVerifying: boolean;
  onResend: () => void;
  isSendingOtp: boolean;
  resendCooldown: number;
  hasError?: boolean;
}

export const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  email,
  otp,
  onChangeOtp,
  onSubmit,
  isVerifying,
  onResend,
  isSendingOtp,
  resendCooldown,
  hasError = false,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Top Header */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/60 text-[11px] font-bold text-[#FF4D00] mb-3">
          <Mail size={12} />
          <span>Email Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
          Verify your email
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
          We&apos;ve sent a 6-digit security code to{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200 break-all">{email || 'your email'}</span>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Reusable 6-Digit OTP Box */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Enter 6-Digit Code
          </label>
          <ATMOtpInput
            value={otp}
            onChange={onChangeOtp}
            disabled={isVerifying}
            hasError={hasError}
          />
        </div>

        {/* Reusable Submit Button Atom */}
        <ATMButton
          type="submit"
          variant="form"
          size="form"
          fullWidth
          isLoading={isVerifying}
          disabled={isVerifying || otp.length < 6}
          rightIcon={<ArrowRight size={14} className="stroke-[2.5]" />}
        >
          Verify & Continue
        </ATMButton>

        {/* Resend Code Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Didn&apos;t receive the code?</span>
          {resendCooldown > 0 ? (
            <span className="font-semibold text-slate-400 dark:text-slate-500 font-mono text-[11px]">
              Resend in {resendCooldown}s
            </span>
          ) : (
            <ATMButton
              type="button"
              variant="ghost"
              size="xs"
              onClick={onResend}
              disabled={isSendingOtp}
              isLoading={isSendingOtp}
              loadingText="Sending..."
              leftIcon={!isSendingOtp ? <RefreshCw size={12} /> : undefined}
              className="text-[#FF4D00] hover:text-[#E03E00] hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-bold"
            >
              Resend Code
            </ATMButton>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Back to Registration</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
