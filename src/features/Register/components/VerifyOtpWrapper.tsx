// src/features/Register/components/VerifyOtpWrapper.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { parseApiError } from '@/lib/errorHandler';
import { VerifyOtpForm } from './VerifyOtpForm';
import {
  useVerifyEmailCodeMutation,
  useSendOtpMutation,
} from '../services/RegisterServices';

export const VerifyOtpWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL params first (safe on both server and client)
  const initialId = searchParams?.get('id') || searchParams?.get('merchantId') || '';
  const initialEmail = searchParams?.get('email') || '';
  const initialReturnUrl = searchParams?.get('returnUrl') || '';
  const initialSource = searchParams?.get('source') || '';

  const [merchantId, setMerchantId] = useState<string>(initialId);
  const [email, setEmail] = useState<string>(initialEmail);
  const [returnUrl, setReturnUrl] = useState<string>(initialReturnUrl);
  const [source, setSource] = useState<string>(initialSource);

  const [otp, setOtp] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(60);

  const [verifyEmailCode, { isLoading: isVerifying }] = useVerifyEmailCodeMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  // Sync cookie state safely after mount to prevent SSR hydration differences
  useEffect(() => {
    if (!merchantId) {
      const cookieId = Cookies.get('pendingMerchantId');
      if (cookieId) setMerchantId(cookieId);
    }
    if (!email) {
      const cookieEmail = Cookies.get('pendingAdminEmail');
      if (cookieEmail) setEmail(cookieEmail);
    }
    if (!returnUrl) {
      const cookieReturn = Cookies.get('authReturnUrl');
      if (cookieReturn) setReturnUrl(cookieReturn);
    }
    if (!source) {
      const cookieSource = Cookies.get('authSource');
      if (cookieSource) setSource(cookieSource);
    }
  }, [merchantId, email, returnUrl, source]);

  // Resend timer countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCompleteRedirect = () => {
    // Check where user originated from (Restaurant, Retail, or Enterprise)
    const targetReturnUrl = returnUrl || Cookies.get('authReturnUrl') || '';
    const targetSource = (source || Cookies.get('authSource') || '').toLowerCase();

    // Clean up temporary registration pending cookies
    Cookies.remove('pendingMerchantId');
    Cookies.remove('pendingAdminEmail');
    Cookies.remove('authReturnUrl');
    Cookies.remove('authSource');

    if (targetReturnUrl && targetReturnUrl.startsWith('http')) {
      toast.success('Verification successful! Redirecting to your workspace...');
      window.location.href = targetReturnUrl;
      return;
    }

    if (targetSource.includes('rest')) {
      const restUrl = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
      toast.success('Verification successful! Redirecting to Restaurant platform...');
      window.location.href = restUrl;
      return;
    }

    if (targetSource.includes('retail')) {
      const retailUrl = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
      toast.success('Verification successful! Redirecting to Retail platform...');
      window.location.href = retailUrl;
      return;
    }

    if (targetReturnUrl && targetReturnUrl.startsWith('/')) {
      toast.success('Verification successful! Welcome to Quantix Enterprise.');
      router.push(targetReturnUrl);
      return;
    }

    // Default: Enterprise homepage / app
    toast.success('Verification successful! Welcome to Quantix Enterprise.');
    router.push('/');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) {
      toast.error('Session expired or invalid session. Please register again.');
      router.push('/sign-up');
      return;
    }
    if (otp.trim().length < 6) {
      toast.error('Please enter all 6 digits of your verification code.');
      setHasError(true);
      return;
    }

    try {
      setHasError(false);
      await verifyEmailCode({ merchantId: merchantId.trim(), otpCode: otp.trim() }).unwrap();
      handleCompleteRedirect();
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Verification code is invalid or has expired.');
      const errObj = err as any;
      const code = errObj?.data?.errorCode;

      if (code === 'NO_OTP_PENDING' || msg?.toLowerCase().includes('no verification pending') || msg?.toLowerCase().includes('already verified')) {
        handleCompleteRedirect();
        return;
      }

      setHasError(true);
      toast.error(msg);
    }
  };

  const handleResend = async () => {
    if (!merchantId) {
      toast.error('No merchant session found.');
      return;
    }
    try {
      await sendOtp(merchantId.trim()).unwrap();
      setResendCooldown(60);
      toast.success('A new 6-digit code has been dispatched to your email.');
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Failed to resend code. Please try again.');
      toast.error(msg);
    }
  };

  return (
    <VerifyOtpForm
      email={email}
      otp={otp}
      onChangeOtp={(newOtp) => {
        setOtp(newOtp);
        if (hasError) setHasError(false);
      }}
      onSubmit={handleVerify}
      isVerifying={isVerifying}
      onResend={handleResend}
      isSendingOtp={isSendingOtp}
      resendCooldown={resendCooldown}
      hasError={hasError}
    />
  );
};

export default VerifyOtpWrapper;
