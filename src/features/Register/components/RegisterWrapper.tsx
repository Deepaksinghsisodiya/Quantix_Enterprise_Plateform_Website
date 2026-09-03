'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Formik, Form } from 'formik';
import { registerValidationSchema } from '../validation/RegisterValidation';
import { registerUser } from '../services/RegisterServices';
import { MultiStepSignupForm } from './MultiStepSignupForm';
import type { RegisterFormData } from '../Types/RegisterTypes';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

export const RegisterWrapper: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignUp = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await registerUser(values);
      if (response.success) {
        const token = response.data?.token || 'enterprise_token_' + Date.now();
        const user = { 
          username: values.fullName, 
          email: values.email, 
          companyName: values.companyName, 
          locations: values.locations,
          merchantId: response.data?.merchantId,
        };

        Cookies.set('accessToken', token);
        dispatch(setCredentials({ token, user }));

        if (typeof window !== 'undefined') {
          localStorage.setItem('quantix_has_logged_out', 'false');
          if (response.data?.merchantId) {
            localStorage.setItem('quantix_merchant_id', response.data.merchantId);
          }
        }

        toast.success(response.message || 'Workspace created! Welcome to Quantix Enterprise POS.');
        router.push('/');
      } else {
        toast.error(response.message || 'Trial registration failed. Please try again.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Trial registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <span className="inline-flex items-center gap-1 text-[9.5px] font-syne font-black uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-800/60 px-2.5 py-0.5 rounded-full mb-2">
          <Sparkles size={10} className="text-red-400 fill-red-400" />
          14-Day Free Access
        </span>
        <h2 className="text-xl sm:text-2xl font-syne font-black text-white leading-tight">
          Create Enterprise Workspace
        </h2>
        <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1 leading-relaxed">
          Start your full platform trial. No credit card required.
        </p>
      </div>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          companyName: '',
          locations: '1',
        }}
        validationSchema={registerValidationSchema}
        onSubmit={handleSignUp}
      >
        {({ isValid, dirty }) => (
          <Form className="animate-in fade-in duration-300">
            <MultiStepSignupForm 
              step={1} 
              loading={loading} 
              nextStep={() => {}}
              prevStep={() => {}}
              isValid={isValid}
              dirty={dirty}
            />
          </Form>
        )}
      </Formik>

      {/* Trust info & Sign in link */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-[10.5px] font-medium text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck size={12} />
            Zero Setup Fee
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Lock size={11} />
            Encrypted & Secure
          </span>
        </div>

        <div className="text-xs text-slate-400">
          Already have a workspace?{" "}
          <Link href="/sign-in" className="font-bold text-primary hover:underline ml-0.5">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterWrapper;
