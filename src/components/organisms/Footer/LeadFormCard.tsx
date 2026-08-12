'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, PhoneCall } from 'lucide-react';

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
  businessCategory: string;
}

const COUNTRY_CODES = [
  { code: '+44', country: 'UK' },
  { code: '+1', country: 'US/CA' },
  { code: '+91', country: 'IN' },
  { code: '+61', country: 'AU' },
  { code: '+971', country: 'UAE' },
  { code: '+49', country: 'DE' },
];

const BUSINESS_CATEGORIES = [
  'Restaurant & Fine Dining',
  'Retail & Boutique Shop',
  'Supermarket & Grocery',
  'Cafe, Bakery & Coffee Shop',
  'Quick Service (QSR) & Takeaway',
  'Multi-Store Enterprise & Franchise',
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
    countryCode: '+44',
    phone: '',
    businessName: '',
    businessCategory: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: boolean } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = true;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = true;
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = true;
    }
    if (!formData.businessCategory.trim()) {
      newErrors.businessCategory = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);

      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    } catch (err) {
      // Handled silently
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+44',
      phone: '',
      businessName: '',
      businessCategory: '',
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
      className={`relative w-full max-w-[360px] bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-all duration-300 text-slate-800 dark:text-slate-100 ${className}`}
    >
      {/* Top Header & Branding */}
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-1.5">
          <img
            src={logoSrc}
            alt="Quantix Logo"
            className="h-7 sm:h-8 w-auto object-contain"
          />
          {badgeText && (
            <span className="text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary-dark dark:text-primary-light px-1.5 py-0.5 rounded-md border border-primary/20">
              {badgeText}
            </span>
          )}
        </div>

        {/* Heading */}
        <h3 className="text-base sm:text-lg font-syne font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight max-w-[280px]">
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
            className="flex flex-col items-center text-center py-4 space-y-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 size={26} className="stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-syne font-bold text-slate-900 dark:text-white">
                Thank You, {formData.fullName.split(' ')[0]}!
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium max-w-[240px] leading-relaxed">
                We have received your details. A specialist will call you at{' '}
                <span className="font-bold text-primary">{formData.countryCode} {formData.phone}</span> shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-1 text-[11px] font-bold text-slate-500 hover:text-primary transition-colors underline underline-offset-4 cursor-pointer"
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
            className="space-y-2.5"
            noValidate
          >
            {/* 1. Name */}
            <div>
              <label htmlFor="lead-fullname" className="sr-only">Name</label>
              <input
                id="lead-fullname"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('fullName')}`}
              />
            </div>

            {/* 2. Email */}
            <div>
              <label htmlFor="lead-email" className="sr-only">Email</label>
              <input
                id="lead-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('email')}`}
              />
            </div>

            {/* 3. Phone (with country code selector) */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative w-full shrink-0 sm:w-auto">
                <label htmlFor="lead-country-code" className="sr-only">Country Code</label>
                <select
                  id="lead-country-code"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/80 py-2.5 pl-3 pr-7 text-xs font-bold text-slate-900 outline-none transition-all cursor-pointer focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20 dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-100 dark:focus:bg-slate-800 sm:w-auto"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="lead-phone" className="sr-only">Phone Number</label>
                <input
                  id="lead-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('phone')}`}
                />
              </div>
            </div>

            {/* 4. Business Name */}
            <div>
              <label htmlFor="lead-businessname" className="sr-only">Business Name</label>
              <input
                id="lead-businessname"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('businessName')}`}
              />
            </div>

            {/* 5. Business Category */}
            <div className="relative">
              <label htmlFor="lead-businesscategory" className="sr-only">Business Category</label>
              <select
                id="lead-businesscategory"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                className={`w-full appearance-none border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all cursor-pointer ${getInputStyle('businessCategory')}`}
              >
                <option value="" disabled className="text-slate-400">
                  Business Category
                </option>
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* 6. CTA Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-syne font-extrabold text-xs tracking-wider uppercase py-3 px-5 shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <PhoneCall size={14} className="fill-white" />
                    <span>{buttonText}</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy Policy disclaimer */}
            <p className="text-[10px] text-center text-slate-400 font-medium pt-0.5">
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
