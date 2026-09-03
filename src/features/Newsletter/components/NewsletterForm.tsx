// src/features/Newsletter/components/NewsletterForm.tsx
'use client';

import React from 'react';
import { Form, useFormikContext } from 'formik';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { NewsletterFormValues, NewsletterFormProps } from '../types/NewsletterTypes';

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  isLoading = false,
  placeholder = "Enter work email...",
  buttonText = "Join",
  variant = "footer",
}) => {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<NewsletterFormValues>();
  const hasError = touched.email && Boolean(errors.email);

  if (variant === 'card') {
    return (
      <Form className="w-full space-y-3">
        <div className="relative flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
          <div className="relative w-full">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              id="newsletter-email-card"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={isLoading}
              className={`w-full h-11 pl-10 pr-4 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border ${
                hasError
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-primary/20'
              } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-xs`}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-11 px-6 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-syne font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
        {hasError && (
          <p className="text-[11px] text-red-500 font-medium text-center">
            {errors.email}
          </p>
        )}
      </Form>
    );
  }

  // Footer / Inline variant
  return (
    <Form className="w-full space-y-1">
      <div className="relative flex items-center w-full">
        <div className="relative w-full">
          <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            id="newsletter-email-footer"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={isLoading}
            className={`w-full h-9 pl-8.5 pr-20 text-[11.5px] rounded-xl bg-white dark:bg-slate-900 border ${
              hasError
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-primary/20'
            } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all shadow-2xs`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1 bottom-1 px-3 bg-primary hover:bg-primary/90 text-white text-[11px] font-syne font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight size={11} />
              </>
            )}
          </button>
        </div>
      </div>
      {hasError && (
        <p className="text-[10.5px] text-red-500 font-medium pl-1">
          {errors.email}
        </p>
      )}
    </Form>
  );
};
