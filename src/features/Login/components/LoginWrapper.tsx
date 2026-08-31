'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginForm } from './LoginForm';
import { useLoginMutation } from '../Service/LoginService';
import { ShieldCheck, Zap } from 'lucide-react';

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
        if (refreshToken) {
          Cookies.set('refreshToken', refreshToken, { expires: 30 });
        }

        // Save credentials to Redux
        dispatch(setCredentials({ token, refreshToken, user }));

        // Save merchant data if available
        if (response.data?.merchantId && typeof window !== 'undefined') {
          localStorage.setItem('quantix_merchant_id', response.data.merchantId);
        }

        toast.success('Signed in successfully! Redirecting...');
        router.push('/');
      } else {
        toast.error(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      const serverMessage = 
        err?.data?.message || 
        err?.data?.error || 
        err?.error || 
        'Invalid email or password. Please verify that your account is registered.';
      toast.error(serverMessage);
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-bold uppercase tracking-wider text-[#FF4D00] mb-2.5">
          <Zap size={12} />
          <span>Enterprise Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 mb-1 leading-tight tracking-tight">
          Enterprise Sign In
        </h2>
        <p className="text-slate-500 font-normal text-xs sm:text-sm">
          Access your centralized multi-location POS dashboard, ERP data feeds, and franchise telemetry.
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
          Need a new multi-unit corporate workspace?{' '}
          <Link href="/sign-up" className="font-bold text-[#FF4D00] hover:text-[#E03E00] underline underline-offset-2 ml-0.5 transition-colors">
            Create Enterprise Account
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
