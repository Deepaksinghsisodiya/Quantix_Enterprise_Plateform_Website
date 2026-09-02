'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, RefreshCw, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { OtpInput } from './OtpInput';

export interface VerifyOtpFormProps {
  email: string;
  otp: string;
  onChangeOtp: (otp: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isVerifying: boolean;
  onResend: () => void;
  isSendingOtp: boolean;
  resendCooldown: number;
  devOtp?: string | null;
  isFetchingDevOtp?: boolean;
  onApplyDevOtp?: (code: string) => void;
  onRefreshDevOtp?: () => void;
  isDev?: boolean;
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
  devOtp,
  isFetchingDevOtp,
  onApplyDevOtp,
  onRefreshDevOtp,
  isDev = false,
  hasError = false,
}) => {
  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#FF4D00] mb-3">
          <Mail size={12} />
          <span>Email Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 leading-tight tracking-tight">
          Verify your email
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
          We&apos;ve sent a 6-digit security code to{' '}
          <span className="font-semibold text-slate-800 break-all">{email || 'your email'}</span>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Reusable 6-Digit OTP Box */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Enter 6-Digit Code
          </label>
          <OtpInput
            value={otp}
            onChange={onChangeOtp}
            disabled={isVerifying}
            hasError={hasError}
          />
        </div>

        {/* Local Dev OTP Helper */}
        {isDev && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-800 font-medium">
              <KeyRound size={14} className="text-blue-600 shrink-0" />
              <span>
                {devOtp ? (
                  <>Local Dev OTP: <strong className="font-mono font-bold text-blue-900 text-sm tracking-wider">{devOtp}</strong></>
                ) : isFetchingDevOtp ? (
                  'Fetching local OTP...'
                ) : (
                  'Local OTP helper active'
                )}
              </span>
            </div>
            {devOtp && onApplyDevOtp ? (
              <button
                type="button"
                onClick={() => onApplyDevOtp(devOtp)}
                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold tracking-wide transition-all shadow-xs cursor-pointer inline-flex items-center gap-1"
              >
                <Sparkles size={11} /> Auto-Fill
              </button>
            ) : onRefreshDevOtp ? (
              <button
                type="button"
                onClick={onRefreshDevOtp}
                className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer text-[11px]"
              >
                Load OTP
              </button>
            ) : null}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isVerifying || otp.length < 6}
          className="w-full rounded-xl bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white py-3.5 px-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-orange-600/35"
        >
          {isVerifying ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Verifying & Signing In...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>

        {/* Resend Code Section */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Didn&apos;t receive the code?</span>
          {resendCooldown > 0 ? (
            <span className="font-semibold text-slate-400 font-mono text-[11px]">
              Resend in {resendCooldown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={isSendingOtp}
              className="font-bold text-[#FF4D00] hover:text-[#E03E00] transition-colors cursor-pointer inline-flex items-center gap-1 hover:underline"
            >
              {isSendingOtp ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Resend Code</span>
              )}
            </button>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
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
