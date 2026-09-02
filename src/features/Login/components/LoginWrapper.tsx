'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginForm } from './LoginForm';
import { useLoginMutation } from '../Service/LoginService';
import { ShieldCheck, Zap } from 'lucide-react';
import { parseApiError } from '@/lib/errorHandler';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Corporate work email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  remember: Yup.boolean(),
});

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export const LoginWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async (values: LoginFormValues) => {
    try {
      const email = values.email.trim().toLowerCase();
      
      // Live API Call to backend auth service
      const response = await login({
        email,
        username: email,
        password: values.password,
        rememberMe: values.remember,
      }).unwrap();

      const token = response.token || response.accessToken || response.data?.token || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const user = response.user || response.data?.user || { email, username: email.split('@')[0] };

      if (token) {
        // Save live access token to cookies
        Cookies.set('accessToken', token, { expires: values.remember ? 30 : 1 });
        Cookies.set('authUser', JSON.stringify(user), { expires: values.remember ? 30 : 1 });
        if (refreshToken) {
          Cookies.set('refreshToken', refreshToken, { expires: 30 });
        }

        // Save credentials to Redux
        dispatch(setCredentials({ token, refreshToken, user }));

        // Save merchant data if available
        if (response.data?.merchantId && typeof window !== 'undefined') {
          localStorage.setItem('quantix_merchant_id', response.data.merchantId);
        }

        const returnUrl = searchParams?.get('returnUrl') || Cookies.get('authReturnUrl');
        const source = searchParams?.get('source') || Cookies.get('authSource');

        Cookies.remove('authReturnUrl');
        Cookies.remove('authSource');

        if (returnUrl && returnUrl.startsWith('http')) {
          toast.success('Signed in successfully! Returning to your platform...');
          window.location.href = returnUrl;
          return;
        }

        if (source === 'restaurant') {
          const restUrl = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
          toast.success('Signed in successfully! Returning to Restaurant platform...');
          window.location.href = restUrl;
          return;
        }

        if (source === 'retail') {
          const retailUrl = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
          toast.success('Signed in successfully! Returning to Retail platform...');
          window.location.href = retailUrl;
          return;
        }

        toast.success('Signed in successfully! Welcome to Quantix Enterprise.');
        router.push('/');
      } else {
        toast.error(response?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: unknown) {
      const serverMessage = parseApiError(err, 'Invalid email or password. Please verify that your account is registered.');
      toast.error(serverMessage);
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] mb-2.5">
          <Zap size={12} />
          <span>Secure Merchant Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 mb-1 leading-tight tracking-tight">
          Sign In
        </h2>
        <p className="text-slate-500 font-normal text-xs sm:text-sm">
          Enter your credentials to access your merchant dashboard and POS telemetry.
        </p>
      </div>

      <Formik
        initialValues={{ email: '', password: '', remember: true }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSignIn}
      >
        {() => (
          <Form className="flex flex-col gap-3.5">
            <LoginForm loading={isLoading} />
          </Form>
        )}
      </Formik>

      {/* Footer link to Sign-up */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-center">
        <p className="text-xs font-normal text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            href={
              typeof window !== 'undefined' && window.location.pathname.includes('/restaurant')
                ? '/sign-up/restaurant'
                : typeof window !== 'undefined' && window.location.pathname.includes('/retail')
                ? '/sign-up/retail'
                : `/sign-up${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
            }
            className="font-bold text-[#FF4D00] hover:text-[#E03E00] underline underline-offset-2 ml-0.5 transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>SOC-2 Type II Certified & End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default LoginWrapper;
