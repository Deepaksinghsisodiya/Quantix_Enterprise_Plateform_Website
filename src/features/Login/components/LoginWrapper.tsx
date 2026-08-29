'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginForm } from './LoginForm';
import { ShieldCheck, Zap, Globe2 } from 'lucide-react';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Corporate email is required'),
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
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignIn = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Mock / fallback login logic for POS workspace authentication
      const dummyToken = 'mock_enterprise_token_' + Date.now();
      const dummyUser = { 
        username: values.email.split('@')[0], 
        email: values.email 
      };

      Cookies.set('accessToken', dummyToken);
      if (values.remember) {
        Cookies.set('refreshToken', 'mock_enterprise_refresh_' + Date.now(), { expires: 30 });
      }
      dispatch(setCredentials({ token: dummyToken, user: dummyUser }));

      toast.success('Welcome back to Quantix Enterprise!');
      router.push('/');
    } catch (err) {
      toast.error('Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-extrabold uppercase tracking-wider text-primary mb-3">
          <Zap size={12} />
          <span>Enterprise Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-black text-white mb-2">
          Enterprise Sign In
        </h2>
        <p className="text-slate-400 font-medium text-xs sm:text-sm">
          Access your centralized multi-location POS dashboard, ERP data feeds, and franchise telemetry.
        </p>
      </div>

      <Formik
        initialValues={{ email: '', password: '', remember: true }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSignIn}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <LoginForm loading={loading} />
          </Form>
        )}
      </Formik>

      {/* Footer link to Sign-up */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
        <p className="text-xs font-medium text-slate-400">
          Need a new multi-unit corporate workspace?{' '}
          <Link href="/sign-up" className="font-extrabold text-primary hover:text-primary-light transition-colors">
            Create Enterprise Account
          </Link>
        </p>
      </div>

      {/* Security note */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-500">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>SOC-2 Type II Certified & End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default LoginWrapper;
