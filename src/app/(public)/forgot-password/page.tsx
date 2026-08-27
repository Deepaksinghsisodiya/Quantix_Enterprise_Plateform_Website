// src/app/(public)/forgot-password/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { ATMTextField } from '@/components/atoms/ATMTextField';
import { ATMButton } from '@/components/atoms/ATMButton';

export default function ForgotPasswordPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/retail_stockroom_inventory.jpg"
      coverAlt="Quantix Enterprise Multi-Unit POS"
      coverHeadline="Reset your enterprise password."
      coverSubtext="Recover access to your central HQ dashboard, store cluster telemetry, and ERP data feeds."
    >
      <div className="w-full">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-extrabold uppercase tracking-wider text-primary mb-4">
            <Send size={12} />
            <span>Password Reset</span>
          </div>
          <h2 className="font-syne text-2xl sm:text-3xl font-black text-white mb-2">
            Forgot your password?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            Enter the work email linked to your Quantix account and we&apos;ll send you a secure reset link.
          </p>
        </div>

        <Formik
          initialValues={{ email: '' }}
          validate={(values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            setSubmitting(true);
            setTimeout(() => {
              setStatus({ sent: true });
              setSubmitting(false);
            }, 800);
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              {status?.sent ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <p className="text-sm font-bold text-emerald-300 mb-1">
                    Reset link sent!
                  </p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    If an account exists for this email, you&apos;ll receive a secure link to reset your password shortly.
                  </p>
                </div>
              ) : (
                <>
                  <ATMTextField
                    name="email"
                    label="Corporate Email"
                    placeholder="you@company.com"
                    type="email"
                    leftIcon={<Mail size={16} />}
                  />

                  <ATMButton
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                  </ATMButton>
                </>
              )}

              <div className="pt-2 text-center">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-primary font-bold transition-colors"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SplitAuthLayout>
  );
}
