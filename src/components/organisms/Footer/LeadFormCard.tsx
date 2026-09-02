'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, PhoneCall, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useRequestDemoMutation } from '@/features/Contact/Service/ContactService';
import { parseApiError } from '@/lib/errorHandler';

export interface LeadFormCardProps {
  heading?: string;
  subheading?: string;
  badgeText?: string;
  buttonText?: string;
  logoSrc?: string;
  privacyPolicyHref?: string;
  className?: string;
  onSubmitSuccess?: (data: LeadFormData) => void;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  businessName: string;
  businessCategory?: string;
}

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
];

export const LeadFormCard: React.FC<LeadFormCardProps> = ({
  heading = "Get 2 Months of Free EPOS Rental",
  subheading,
  badgeText = "FOR BUSINESS",
  buttonText = "SPEAK WITH OUR TEAM",
  privacyPolicyHref = "/privacy",
  className = "",
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    businessName: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone' && formData.countryCode === '+1') {
      const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      if (x) {
        newValue = !x[2] ? x[1] : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : '');
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const [requestDemo, { isLoading: isApiSubmitting }] = useRequestDemoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: boolean } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cleanName = formData.fullName.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanBusiness = formData.businessName.trim();

    if (!cleanName) {
      newErrors.fullName = true;
    }
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      newErrors.email = true;
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    let isPhoneValid = false;
    if (formData.countryCode === '+1') {
      isPhoneValid = phoneDigits.length === 10;
    } else {
      isPhoneValid = phoneDigits.length >= 7;
    }
    if (!isPhoneValid) {
      newErrors.phone = true;
    }

    if (!cleanBusiness) {
      newErrors.businessName = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const cleanPhone = `${formData.countryCode} ${formData.phone}`.trim();
      const res = await requestDemo({
        contactName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: cleanPhone,
        companyName: formData.businessName.trim(),
        businessType: 'Enterprise',
        preferredMerchantType: 'Enterprise',
        message: `Inquiry submitted via LeadFormCard: ${heading}`,
      }).unwrap();

      setIsSubmitted(true);
      toast.success(res?.message || 'Thank you! Your request has been logged. An enterprise architect will connect shortly.');

      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Failed to submit request. Please try again.');
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+1',
      phone: '',
      businessName: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = errors[fieldName];
    return hasError
      ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/40 dark:bg-red-950/20 text-slate-900 dark:text-slate-100 placeholder:text-red-400'
      : 'border-slate-200/80 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20';
  };

  return (
    <div
      className={`relative w-full max-w-full sm:max-w-[360px] md:max-w-[380px] bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-all duration-300 text-slate-800 dark:text-slate-100 ${className}`}
    >
      {/* Top Header & Branding */}
      <div className="flex flex-col items-center text-center space-y-1 mb-3">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-1.5 select-none">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-linear-to-tr from-primary to-primary-dark text-white shadow-xs">
            <Zap className="h-3 w-3 fill-white stroke-[2.5]" />
          </div>
          <span className="font-syne text-xs font-black text-slate-900 dark:text-white">
            Quantix <span className="text-primary">Enterprise</span>
          </span>
          {badgeText && (
            <span className="text-[8px] font-black uppercase tracking-wider bg-primary/10 text-primary-dark dark:text-primary-light px-1.5 py-0.2 rounded border border-primary/20">
              {badgeText}
            </span>
          )}
        </div>

        {/* Heading */}
        <h3 className="text-sm sm:text-base font-syne font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight max-w-[280px]">
          {heading}
        </h3>

        {subheading && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-[260px] leading-tight">
            {subheading}
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-3 space-y-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 size={20} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-syne font-bold text-slate-900 dark:text-white">
                Thank You, {formData.fullName.split(' ')[0]}!
              </h4>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium max-w-[220px] leading-relaxed">
                We will call you at{' '}
                <span className="font-bold text-primary">{formData.countryCode} {formData.phone}</span> shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-1 text-[9.5px] font-bold text-slate-500 hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="lead-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-1.5"
            noValidate
          >
            {/* 1. Name */}
            <div>
              <label htmlFor="lead-fullname-ent" className="sr-only">Name</label>
              <input
                id="lead-fullname-ent"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full border font-medium rounded-lg px-2.5 py-1.5 text-[11px] outline-none transition-all h-8 ${getInputStyle('fullName')}`}
              />
            </div>

            {/* 2. Email */}
            <div>
              <label htmlFor="lead-email-ent" className="sr-only">Email</label>
              <input
                id="lead-email-ent"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border font-medium rounded-lg px-2.5 py-1.5 text-[11px] outline-none transition-all h-8 ${getInputStyle('email')}`}
              />
            </div>

            {/* 3. Phone (with country code selector) */}
            <div className="flex gap-1.5">
              <div className="relative shrink-0">
                <label htmlFor="lead-country-code-ent" className="sr-only">Country Code</label>
                <select
                  id="lead-country-code-ent"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="appearance-none rounded-lg border border-slate-200/80 bg-slate-50/80 py-1.5 pl-2 pr-5 text-[11px] font-bold text-slate-900 outline-none transition-all cursor-pointer h-8 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20 dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-100 dark:focus:bg-slate-800"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-slate-400 pointer-events-none" />
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="lead-phone-ent" className="sr-only">Phone Number</label>
                <input
                  id="lead-phone-ent"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className={`w-full border font-medium rounded-lg px-2.5 py-1.5 text-[11px] outline-none transition-all h-8 ${getInputStyle('phone')}`}
                />
              </div>
            </div>

            {/* 4. Business Name */}
            <div>
              <label htmlFor="lead-businessname-ent" className="sr-only">Business Name</label>
              <input
                id="lead-businessname-ent"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className={`w-full border font-medium rounded-lg px-2.5 py-1.5 text-[11px] outline-none transition-all h-8 ${getInputStyle('businessName')}`}
              />
            </div>

            {/* CTA Button */}
            <div className="pt-0.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-syne font-extrabold text-[10.5px] tracking-wider uppercase py-2 px-3 shadow-xs shadow-primary/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <PhoneCall size={11} className="fill-white stroke-[2.5]" />
                    <span>{buttonText}</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy Policy disclaimer */}
            <p className="text-[9px] text-center text-slate-400 font-medium pt-0.5">
              By clicking, you agree to our{' '}
              <Link href={privacyPolicyHref} className="text-slate-600 dark:text-slate-300 font-semibold underline underline-offset-2 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadFormCard;
