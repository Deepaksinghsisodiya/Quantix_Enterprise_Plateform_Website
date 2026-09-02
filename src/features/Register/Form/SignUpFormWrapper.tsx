// src/features/Register/Form/SignUpFormWrapper.tsx
'use client';

import React, { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { parseApiError } from '@/lib/errorHandler';
import { useCreateBasicInfoSignupMutation } from '../services/SignUpServices';
import { INITIAL_SIGNUP_VALUES } from '../Constants/SignUpConstants';
import { SignUpFormValues } from '../Types/SignUpTypes';
import { SignUpForm } from './SignUpForm';

export const SignUpFormWrapper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createBasicInfoSignup, { isLoading }] = useCreateBasicInfoSignupMutation();

  const planId = searchParams.get('planId');
  const planCode = searchParams.get('planCode');

  // If already logged in, redirect away from registration to dashboard
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  // Track and save selected plan into cookies
  useEffect(() => {
    if (planId) {
      Cookies.set('selectedPlanId', planId, { expires: 7 });
    }
    if (planCode) {
      Cookies.set('selectedPlanCode', planCode, { expires: 7 });
    }
  }, [planId, planCode]);

  // Read URL query parameter (e.g. ?businessNature=Retail or ?source=retail)
  const initialNature = useMemo(() => {
    const typeParam = searchParams.get('businessNature') || searchParams.get('source') || searchParams.get('type') || searchParams.get('nature');
    if (typeParam) {
      const lower = typeParam.toLowerCase();
      if (lower.includes('retail')) return 'Retail';
      if (lower.includes('rest')) return 'Restaurant';
      if (lower.includes('enterprise')) return 'Enterprise';
      return typeParam;
    }
    return 'Enterprise';
  }, [searchParams]);

  // Yup Validation Schema with proper error messages
  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .trim()
      .min(2, 'Company name must be at least 2 characters')
      .required('Company / Individual name is required'),
    contactName: Yup.string()
      .trim()
      .min(2, 'Contact person name is required')
      .required('Contact person name is required'),
    contactEmail: Yup.string()
      .email('Please enter a valid email address')
      .required('Contact email is required'),
    contactPhone: Yup.string()
      .required('Contact phone is required')
      .test('phone-validation', 'Please enter a valid 10-digit phone number', function (value) {
        if (!value) return false;
        const cleanDigits = value.replace(/\D/g, '');
        const country = (this.parent.country || 'US').toUpperCase();
        if (country === 'US' || country === 'CA' || country === 'UNITED STATES' || country === 'CANADA') {
          return cleanDigits.length === 10;
        }
        return cleanDigits.length >= 7 && cleanDigits.length <= 15;
      }),
    country: Yup.string().required('Country selection is required'),
    businessNature: Yup.string().nullable(),
  });

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const cleanPhone = values.contactPhone ? values.contactPhone.replace(/\D/g, '') : '';

      const response = await createBasicInfoSignup({
        companyName: values.companyName.trim(),
        contactName: values.contactName.trim(),
        contactEmail: values.contactEmail.trim().toLowerCase(),
        contactPhone: cleanPhone,
        country: values.country,
        businessNature: values.businessNature || initialNature,
      }).unwrap();

      if (response.success && response.data) {
        const merchantId = response.data.merchantId;
        const adminEmail = values.contactEmail.trim().toLowerCase();

        // Save registration context to cookies
        Cookies.set('pendingMerchantId', merchantId);
        Cookies.set('pendingAdminEmail', adminEmail);

        const returnUrl = searchParams.get('returnUrl') || '';
        const source = searchParams.get('source') || '';
        if (returnUrl) Cookies.set('authReturnUrl', returnUrl);
        if (source) Cookies.set('authSource', source);

        toast.success(response.message || 'Account created! Please verify your email with the OTP sent to you.');

        // Forward returnUrl and source to email OTP verification page
        const verifyParams = new URLSearchParams({
          id: merchantId,
          email: adminEmail,
        });
        if (returnUrl) verifyParams.set('returnUrl', returnUrl);
        if (source) verifyParams.set('source', source);

        router.push(`/sign-up/verify?${verifyParams.toString()}`);
      } else {
        toast.error(response?.message || 'Registration failed. Please check your information.');
      }
    } catch (err: unknown) {
      const errorMessage = parseApiError(err, 'Unable to connect to registration service.');
      if (errorMessage.toLowerCase().includes('already') || errorMessage.toLowerCase().includes('exist')) {
        toast.error('This account is already registered. Please Sign In to continue.');
        setTimeout(() => router.push('/sign-in'), 1500);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 text-left">
        {planCode && (
          <div className="mb-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-bold text-[#FF4D00] shadow-2xs">
            <CheckCircle2 size={13} className="text-emerald-500" />
            Selected Plan: <span className="font-mono uppercase">{planCode}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 leading-tight tracking-tight">
          Sign Up
        </h2>
        <p className="text-slate-500 text-xs mt-1">
          Create your centralized merchant account to get started
        </p>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{
          ...INITIAL_SIGNUP_VALUES,
          businessNature: initialNature,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <SignUpForm
              values={values}
              setFieldValue={setFieldValue}
              isSubmitting={isLoading || isSubmitting}
            />
          </Form>
        )}
      </Formik>

      {/* Footer / Login Redirection */}
      <div className="mt-6 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link
          href={`/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
          className="font-bold text-[#FF4D00] hover:text-[#E03E00] transition-colors inline-block ml-1 hover:underline"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default SignUpFormWrapper;
