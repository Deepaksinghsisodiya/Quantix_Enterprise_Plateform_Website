'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/slices/authSlice';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Formik, Form } from 'formik';
import { step1ValidationSchema, step2ValidationSchema } from '../validation/RegisterValidation';
import { registerUser } from '../services/RegisterServices';
import { MultiStepSignupForm } from './MultiStepSignupForm';
import type { RegisterFormData } from '../Types/RegisterTypes';

export const RegisterWrapper: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignUp = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await registerUser(values);
      if (response.success) {
        const dummyToken = 'mock_enterprise_token_' + Date.now();
        const dummyUser = { 
          username: values.fullName, 
          email: values.email, 
          companyName: values.companyName, 
          locations: values.locations 
        };

        Cookies.set('accessToken', dummyToken);
        dispatch(setCredentials({ token: dummyToken, user: dummyUser }));

        if (typeof window !== 'undefined') {
          localStorage.setItem('quantix_has_logged_out', 'true');
        }

        toast.success('Workspace created! Welcome to Quantix Enterprise POS.');
        router.push('/');
      }
    } catch (err) {
      toast.error('Trial registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-syne font-black text-white mb-2">
          {step === 1 ? 'Create Account' : 'Enterprise Details'}
        </h2>
        <p className="text-slate-400 font-medium text-sm">
          {step === 1 
            ? 'Start your 14-day free trial. No credit card required.' 
            : 'Tell us a bit about your enterprise to personalize your setup.'}
        </p>
      </div>

      <div className="flex items-center mb-8">
        <div className={`h-2 flex-1 rounded-l-full transition-all duration-500 ${step >= 1 ? 'bg-primary' : 'bg-slate-800'}`}></div>
        <div className={`h-2 flex-1 rounded-r-full transition-all duration-500 ${step >= 2 ? 'bg-primary' : 'bg-slate-800'}`}></div>
      </div>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          companyName: '',
          locations: '5-15',
        }}
        validationSchema={step === 1 ? step1ValidationSchema : step2ValidationSchema}
        onSubmit={(values) => {
          if (step === 1) {
            setStep(2);
          } else {
            handleSignUp(values);
          }
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <MultiStepSignupForm 
              step={step} 
              loading={loading} 
              nextStep={() => setStep(2)}
              prevStep={() => setStep(1)}
              isValid={isValid}
              dirty={dirty}
            />
          </Form>
        )}
      </Formik>
      
      <div className="mt-8 text-center text-xs text-slate-400">
        Already have a workspace?{" "}
        <Link href="/sign-in" className="font-bold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterWrapper;
