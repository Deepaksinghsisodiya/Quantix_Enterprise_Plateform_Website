// src/app/(public)/sign-up/verify/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useVerifyEmailCodeMutation, useSendOtpMutation } from '@/features/Register/Service/RegisterService';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantId = searchParams.get('id') || searchParams.get('merchantId') || '';
  const showDevOtp = process.env.NODE_ENV !== 'production';

  const [otp, setOtp] = useState('');
  const [verifyEmailCode, { isLoading: isVerifying }] = useVerifyEmailCodeMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  useEffect(() => {
    if (!merchantId) {
      toast.error('Invalid onboarding session. Please register again.');
    }
  }, [merchantId]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) {
      toast.error('No merchant ID detected. Please try signing up again.');
      return;
    }
    if (otp.length < 4) {
      toast.error('Please enter a valid OTP code.');
      return;
    }

    try {
      await verifyEmailCode({ merchantId, otpCode: otp }).unwrap();
      toast.success('Email successfully verified! Proceeding to subscription setup...');
      router.push(`/sign-up/payment?id=${merchantId}`);
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || 'Verification failed. Please check your OTP and try again.';
      toast.error(msg);
    }
  };

  const handleResendOtp = async () => {
    if (!merchantId) return;
    try {
      await sendOtp(merchantId).unwrap();
      toast.success('A new OTP has been dispatched to your email address.');
    } catch (err: any) {
      toast.error('Failed to resend OTP. Please try again later.');
    }
  };

  return (
    <div className="site-container max-w-md mx-auto py-24 min-h-[70vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="text-center space-y-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-500 dark:text-blue-400">
            <Mail size={22} />
          </div>
          <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Verify Email
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            We have sent a verification code to your email. Enter the code below to verify your account.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              6-Digit Verification Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 123456"
              className="w-full text-center tracking-[0.5em] font-mono text-lg rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 py-3.5 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {showDevOtp && (
            <button
            type="button"
            onClick={async () => {
              if (!merchantId) {
                toast.error('No merchant ID found to fetch OTP.');
                return;
              }
              try {
                toast.info('Fetching OTP from local database...');
                const res = await fetch(`/api/dev/otp?merchantId=${merchantId}`);
                const data = await res.json();
                if (data.otp) {
                  setOtp(data.otp);
                  toast.success(`OTP auto-filled: ${data.otp}`);
                } else {
                  toast.error(data.error || 'Failed to fetch dev OTP. Make sure backend is running.');
                }
              } catch {
                toast.error('Failed to contact Dev OTP service.');
              }
            }}
            className="w-full text-xs font-bold text-blue-500 hover:text-blue-400 py-2 text-center cursor-pointer border border-dashed border-blue-500/30 rounded-xl hover:bg-blue-500/5 transition-all"
          >
            Dev auto-fill OTP
            </button>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3.5 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
            <ArrowRight size={13} className="stroke-[3]" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 dark:border-slate-800/60 pt-6">
          <p className="text-xs text-slate-550 dark:text-slate-500 font-medium">
            Didn't receive the email?{' '}
            <button
              onClick={handleResendOtp}
              disabled={isSendingOtp}
              className="text-blue-500 hover:text-blue-400 font-bold disabled:opacity-50 cursor-pointer"
            >
              {isSendingOtp ? 'Resending...' : 'Resend Code'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-20 bg-white dark:bg-slate-950 min-h-screen flex items-center text-slate-900 dark:text-white transition-colors duration-300">
        <Suspense fallback={
          <div className="site-container text-center py-24 text-slate-400">Loading verification session...</div>
        }>
          <VerifyContent />
        </Suspense>
      </main>
      <Footer />
    </PublicLayout>
  );
}
