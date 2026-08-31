// src/features/Register/Form/SignUpFormWrapper.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { useCreateBasicInfoSignupMutation } from '../services/SignUpServices';
import { INITIAL_SIGNUP_VALUES } from '../Constants/SignUpConstants';
import { SignUpFormValues } from '../Types/SignUpTypes';
import { SignUpForm } from './SignUpForm';

export const SignUpFormWrapper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createBasicInfoSignup, { isLoading }] = useCreateBasicInfoSignupMutation();

  // Read URL query parameter (e.g. ?type=restaurant or ?nature=Retail)
  const initialNature = useMemo(() => {
    const typeParam = searchParams.get('type') || searchParams.get('nature') || searchParams.get('businessNature');
    if (typeParam) {
      const lower = typeParam.toLowerCase();
      if (lower.includes('rest')) return 'Restaurent';
      if (lower.includes('retail')) return 'Retail';
      return typeParam;
    }
    return 'Restaurent';
  }, [searchParams]);

  // Yup Validation Schema with proper error messages
  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .trim()
      .min(2, 'Company name must be at least 2 characters')
      .required('Company / Individual name is required'),
    contactName: Yup.string()
      .trim()
      .min(2, 'Contact name must be at least 2 characters')
      .required('Contact person name is required'),
    contactEmail: Yup.string()
      .email('Please enter a valid email address')
      .required('Contact email is required'),
    contactPhone: Yup.string()
      .required('Contact phone is required')
      .test('phone-validation', 'Please enter a valid phone number (7-15 digits)', (value) => {
        if (!value) return false;
        const cleanDigits = value.replace(/\D/g, '');
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
        businessNature: values.businessNature?.trim() || 'Restaurent',
      }).unwrap();

      if (response.success && response.data?.merchantId) {
        const merchantId = response.data.merchantId;
        
        // Save merchant reference for subsequent steps
        if (typeof window !== 'undefined') {
          localStorage.setItem('quantix_merchant_id', merchantId);
          localStorage.setItem('quantix_merchant_data', JSON.stringify(response.data));
        }

        toast.success(`Signup created for ${response.data.companyName}! Continuing onboarding...`);

        // Route to activation/onboarding step
        router.push(`/sign-up/activate?merchantId=${merchantId}`);
      } else {
        toast.error(response.message || 'Registration failed. Please check your information.');
      }
    } catch (err: any) {
      const serverMessage = err?.data?.message || err?.error || 'Unable to connect to registration service.';
      toast.error(serverMessage);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 text-left">
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
        {() => (
          <Form className="animate-in fade-in duration-300">
            <SignUpForm loading={isLoading} />
          </Form>
        )}
      </Formik>

      {/* Footer login link */}
      <div className="mt-4 text-center text-xs text-slate-500 font-normal">
        Already a member?{' '}
        <Link href="/sign-in" className="font-bold text-[#FF4D00] hover:text-[#E03E00] underline underline-offset-2 ml-0.5 transition-colors">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpFormWrapper;
