// src/features/Newsletter/components/NewsletterWrapper.tsx
'use client';

import React, { useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'sonner';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import { newsletterValidationSchema } from '../validation/NewsletterValidation';
import { useSubscribeNewsletterMutation } from '../services/NewsletterServices';
import { NewsletterFormValues, NewsletterWrapperProps } from '../types/NewsletterTypes';
import { parseApiError } from '@/lib/errorHandler';

const initialValues: NewsletterFormValues = {
  email: '',
};

export const NewsletterWrapper: React.FC<NewsletterWrapperProps> = ({
  title = "Subscribe to Product Updates",
  subtitle = "Get weekly engineering insights, release notes, and industry benchmarks.",
  placeholder = "Enter work email...",
  buttonText = "Join",
  variant = "footer",
  className = "",
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubmit = async (
    values: NewsletterFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await subscribeNewsletter({
        email: values.email.trim().toLowerCase(),
      }).unwrap();

      setIsSubscribed(true);
      toast.success(res?.message || 'Thank you! You are now subscribed to Quantix updates.');
      resetForm();
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Subscription failed. Please try again later.');
      toast.error(msg);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-left ${className}`}>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>Subscribed successfully!</span>
        </div>
        <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">
          Check your inbox for our latest release playbooks and product announcements.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 text-left ${className}`}>
      {title && (
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-primary shrink-0" />
            <h5 className="text-xs font-syne font-black uppercase tracking-wider text-slate-900 dark:text-white leading-tight">
              {title}
            </h5>
          </div>
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={newsletterValidationSchema}
        onSubmit={handleSubmit}
      >
        <NewsletterForm
          isLoading={isLoading}
          placeholder={placeholder}
          buttonText={buttonText}
          variant={variant}
        />
      </Formik>
    </div>
  );
};

export default NewsletterWrapper;
