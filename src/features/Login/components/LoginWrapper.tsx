'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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
import { setSecureCookie } from '@/lib/cookieUtils';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const buildSsoRedirectUrl = (targetUrl: string, token: string, refreshToken?: string, user?: any) => {
    try {
      const url = new URL(targetUrl, window.location.origin);
      url.searchParams.set('sso_token', token);
      if (refreshToken) url.searchParams.set('sso_refresh', refreshToken);
      if (user) url.searchParams.set('sso_user', typeof user === 'string' ? user : JSON.stringify(user));
      return url.toString();
    } catch {
      return targetUrl;
    }
  };

  // Instant Single Sign-On (SSO) Handshake:
  // If user is ALREADY logged in on Enterprise and arrived with a returnUrl or source (e.g. from Restaurant / Retail),
  // immediately hand off their active session so they never have to sign in twice!
  useEffect(() => {
    const existingToken = Cookies.get('accessToken');
    if (!existingToken) return;

    const existingRefresh = Cookies.get('refreshToken') || '';
    const existingUser = Cookies.get('authUser') || '';
    const returnUrl = searchParams?.get('returnUrl') || Cookies.get('authReturnUrl') || '';
    const source = (
      searchParams?.get('source') ||
      Cookies.get('authSource') ||
      (pathname?.includes('/restaurant') ? 'restaurant' : pathname?.includes('/retail') ? 'retail' : '')
    ).toLowerCase();

    let target = returnUrl;
    if (!target) {
      if (source.includes('rest')) target = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
      else if (source.includes('retail')) target = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
    }

    if (target && target.startsWith('http')) {
      Cookies.remove('authReturnUrl');
      Cookies.remove('authSource');
      window.location.href = buildSsoRedirectUrl(target, existingToken, existingRefresh, existingUser);
    }
  }, [searchParams, pathname]);

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
        // Save live access token to secure cookies
        setSecureCookie('accessToken', token, values.remember ? 30 : 1);
        setSecureCookie('authUser', JSON.stringify(user), values.remember ? 30 : 1);
        if (refreshToken) {
          setSecureCookie('refreshToken', refreshToken, 30);
        }

        // Save credentials to Redux
        dispatch(setCredentials({ token, refreshToken, user }));

        if (response.data?.merchantId && typeof window !== 'undefined') {
          localStorage.setItem('quantix_merchant_id', response.data.merchantId);
        }

        // Check if there is a redirect query param or source
        const returnUrl = searchParams?.get('returnUrl') || Cookies.get('authReturnUrl') || '';
        const source = (
          searchParams?.get('source') ||
          Cookies.get('authSource') ||
          (pathname?.includes('/restaurant') ? 'restaurant' : pathname?.includes('/retail') ? 'retail' : '')
        ).toLowerCase();

        Cookies.remove('authReturnUrl');
        Cookies.remove('authSource');

        toast.success('Successfully authenticated. Welcome back!');

        if (returnUrl && returnUrl.startsWith('http')) {
          window.location.href = buildSsoRedirectUrl(returnUrl, token, refreshToken, user);
          return;
        }

        if (source.includes('rest')) {
          const restUrl = process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
          window.location.href = buildSsoRedirectUrl(restUrl, token, refreshToken, user);
          return;
        }

        if (source.includes('retail')) {
          const retailUrl = process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
          window.location.href = buildSsoRedirectUrl(retailUrl, token, refreshToken, user);
          return;
        }

        if (returnUrl && returnUrl.startsWith('/')) {
          router.push(returnUrl);
          return;
        }

        router.push('/');
      } else {
        toast.error('Authentication succeeded but no access token received.');
      }
    } catch (err: unknown) {
      const errMsg = parseApiError(err, 'Invalid credentials. Please check your email and password.');
      toast.error(errMsg);
    }
  };

  const getSignUpHref = () => {
    if (pathname?.includes('/restaurant')) return '/sign-up/restaurant';
    if (pathname?.includes('/retail')) return '/sign-up/retail';
    const queryStr = searchParams?.toString();
    return queryStr ? `/sign-up?${queryStr}` : '/sign-up';
  };

  return (
    <div className="w-full font-sans">
      {/* Header */}
      <div className="mb-2 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/60 text-[10px] font-bold text-[#FF4D00] mb-1.5">
          <Zap size={10} className="fill-[#FF4D00]" />
          <span>Quantix Identity Access</span>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-syne font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
          Sign in to your account
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
          Access your unified Enterprise multi-store control portal.
        </p>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
          remember: true,
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSignIn}
      >
        {() => (
          <Form className="flex flex-col gap-2.5">
            <LoginForm loading={isLoading} />
          </Form>
        )}
      </Formik>

      {/* Footer link to Sign-up */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <Link
            href={getSignUpHref()}
            className="font-bold text-[#FF4D00] hover:text-[#E03E00] underline underline-offset-2 ml-0.5 transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Security note */}
      <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-slate-400 dark:text-slate-500">
        <ShieldCheck size={13} className="text-emerald-500" />
        <span>SOC-2 Type II Certified & End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default LoginWrapper;
