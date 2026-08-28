'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronDown, Sparkles, ArrowRight, Lock, ShieldCheck, User, Mail, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';

export interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  buttonText?: string;
}

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
];

export const ContactSalesModal: React.FC<ContactSalesModalProps> = ({
  isOpen,
  onClose,
  title = "Claim Your 3 Months Free Trial",
  subtitle = "Tell us about your business and our solution specialist will build your custom setup within 1 hour.",
  badgeText = "SOLUTIONS EXPERT",
  buttonText,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    businessName: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: boolean } = {};
    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = true;

    let isPhoneValid = formData.phone.trim().length > 0;
    if (formData.countryCode === '+1') {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      isPhoneValid = phoneRegex.test(formData.phone) || formData.phone.trim().length >= 7;
    }
    if (!isPhoneValid) newErrors.phone = true;

    if (!formData.businessName.trim()) newErrors.businessName = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
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
      : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';
  };

  // Format clean button CTA text
  const getCtaLabel = () => {
    if (!buttonText) return 'CLAIM MY 3 MONTHS FREE';
    if (buttonText.includes('TOP_PROMO_BANNER') || buttonText.includes('START_FREE_TRIAL') || buttonText.includes('BANNER')) {
      return 'CLAIM MY 3 MONTHS FREE';
    }
    if (buttonText.includes('_')) {
      return buttonText.split('_').map((w) => w.toUpperCase()).join(' ');
    }
    return buttonText.toUpperCase();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Dialog Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={isShaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={isShaking ? { duration: 0.4, ease: "easeInOut" } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-slate-950/50 border border-slate-200 dark:border-slate-800 my-auto text-slate-800 dark:text-slate-100 select-none"
          >
            {/* Top Red Gradient Accent */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-b-full opacity-90" />

            {/* Outer Top Right Floating Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-3.5 -right-3.5 h-8 w-8 rounded-full bg-white dark:bg-slate-800 text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center cursor-pointer z-50"
              aria-label="Close dialog"
            >
              <X size={16} className="stroke-[2.5]" />
            </button>

            {/* Header Content */}
            <div className="flex flex-col items-center text-center space-y-1.5 mb-5 pt-1">
              <span className="inline-flex items-center gap-1 text-[9.5px] font-syne font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-2.5 py-0.5 rounded-full shadow-2xs">
                <Sparkles size={10} className="text-red-500 fill-red-500" />
                {badgeText}
              </span>

              <h3 className="text-lg sm:text-xl font-syne font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                {title}
              </h3>

              <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="modal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-6 space-y-3"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 size={32} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-syne font-bold text-slate-900 dark:text-white">
                      Request Confirmed, {formData.fullName.split(' ')[0]}!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-64 leading-relaxed">
                      Our platform specialist will review your details and call you at{' '}
                      <span className="font-bold text-red-600 dark:text-red-400">{formData.countryCode} {formData.phone}</span> within 1 hour.
                    </p>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Submit Another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="modal-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="modal-name" className="sr-only">Full Name</label>
                    <input
                      id="modal-name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('fullName')}`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="modal-email" className="sr-only">Work Email</label>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email"
                      className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('email')}`}
                    />
                  </div>

                  {/* Phone + Country Code */}
                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      <label htmlFor="modal-country-code" className="sr-only">Country Code</label>
                      <select
                        id="modal-country-code"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold rounded-xl pl-3 pr-7 py-2.5 text-xs outline-none focus:ring-1 focus:ring-red-500 transition-all cursor-pointer"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="modal-phone" className="sr-only">Phone Number</label>
                      <input
                        id="modal-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number (e.g. 555-123-4567)"
                        className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('phone')}`}
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label htmlFor="modal-businessname" className="sr-only">Business / Brand Name</label>
                    <input
                      id="modal-businessname"
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business / Brand Name"
                      className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('businessName')}`}
                    />
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-syne font-black text-xs tracking-wider uppercase py-3.5 px-5 shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <Sparkles size={14} className="text-amber-300 fill-amber-300" />
                          <span>{getCtaLabel()}</span>
                          <ArrowRight size={14} className="stroke-[3]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-col items-center gap-1.5 pt-2">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={11} className="text-emerald-500" />
                        No Credit Card Required
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Lock size={10} className="text-slate-400" />
                        100% Confidential
                      </span>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 font-medium leading-tight">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" onClick={onClose} className="text-slate-600 dark:text-slate-300 font-semibold underline hover:text-red-500 transition-colors">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
