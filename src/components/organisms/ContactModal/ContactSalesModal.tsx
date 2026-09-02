// src/components/organisms/ContactModal/ContactSalesModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronDown, Sparkles, ArrowRight, Lock, ShieldCheck, User, Mail, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRequestDemoMutation } from '@/features/Contact/Service/ContactService';
import { parseApiError } from '@/lib/errorHandler';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [requestDemo, { isLoading: isSubmitting }] = useRequestDemoMutation();

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
      const raw = value.replace(/\D/g, '').slice(0, 10);
      if (!raw) {
        newValue = '';
      } else if (raw.length <= 3) {
        newValue = `(${raw}`;
      } else if (raw.length <= 6) {
        newValue = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
      } else {
        newValue = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = formData.fullName.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanBusiness = formData.businessName.trim();
    const cleanPhone = `${formData.countryCode} ${formData.phone}`.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors: { [key: string]: boolean } = {};
    if (!cleanName) newErrors.fullName = true;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) newErrors.email = true;

    const phoneDigits = formData.phone.replace(/\D/g, '');
    let isPhoneValid = false;
    if (formData.countryCode === '+1') {
      isPhoneValid = phoneDigits.length === 10;
    } else {
      isPhoneValid = phoneDigits.length >= 7;
    }
    if (!isPhoneValid) newErrors.phone = true;

    if (!cleanBusiness) newErrors.businessName = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setErrors({});

    try {
      const pageSource = typeof window !== 'undefined' ? window.location.pathname : '/';
      const res = await requestDemo({
        contactName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        companyName: cleanBusiness,
        businessType: 'Enterprise',
        preferredMerchantType: 'Enterprise',
        message: `Lead from Enterprise Solutions Modal: ${title || 'Enterprise Trial'} (Source Page: ${pageSource})`,
      }).unwrap();

      setIsSubmitted(true);
      toast.success(res?.message || 'Thank you! Your demo request has been received. An enterprise specialist will connect with you within 1 hour.');
    } catch (err: unknown) {
      const msg = parseApiError(err, 'Failed to submit demo request. Please try again.');
      toast.error(msg);
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
    if (!buttonText) return 'REQUEST LIVE DEMO';
    if (buttonText.includes('TOP_PROMO_BANNER') || buttonText.includes('START_FREE_TRIAL') || buttonText.includes('BANNER')) {
      return 'CLAIM MY 3 MONTHS FREE';
    }
    if (buttonText.includes('_')) {
      return buttonText.split('_').map((w: string) => w.toUpperCase()).join(' ');
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: isShaking ? [0, -6, 6, -4, 4, -2, 2, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-[365px] sm:max-w-[375px] bg-white dark:bg-slate-900 rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-slate-200/80 dark:border-slate-800 z-10 my-auto select-none"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-b-full opacity-90" />

            {/* Top-Right Close Button Outside Corner */}
            <button
              onClick={onClose}
              type="button"
              className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 z-50 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} className="stroke-[2.5]" />
            </button>

            {/* Header Content */}
            <div className="text-center space-y-1 mb-2.5 pt-0.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-[8.5px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
                <Sparkles size={9} className="fill-red-500 text-red-500" />
                <span>{badgeText}</span>
              </div>

              <h3 className="text-base sm:text-[17px] font-syne font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                {title}
              </h3>

              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight max-w-[270px] mx-auto">
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
                  className="flex flex-col items-center text-center py-4 space-y-2"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 size={26} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-syne font-bold text-slate-900 dark:text-white">
                      Request Confirmed, {formData.fullName?.trim() ? formData.fullName.trim().split(' ')[0] : 'there'}!
                    </h4>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 font-medium max-w-64 leading-relaxed">
                      Our platform specialist will review your details and call you at{' '}
                      <span className="font-bold text-red-600 dark:text-red-400">{formData.countryCode || '+1'} {formData.phone || ''}</span> within 1 hour.
                    </p>
                  </div>
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
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
                  className="space-y-2"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="modal-fullname" className="sr-only">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <User size={13} />
                      </div>
                      <input
                        id="modal-fullname"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={`w-full rounded-xl border py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-all h-8.5 ${getInputStyle('fullName')}`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="modal-email" className="sr-only">Work Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={13} />
                      </div>
                      <input
                        id="modal-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work Email"
                        className={`w-full rounded-xl border py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-all h-8.5 ${getInputStyle('email')}`}
                      />
                    </div>
                  </div>

                  {/* Phone with Country Code */}
                  <div className="flex gap-1.5">
                    <div className="relative shrink-0">
                      <label htmlFor="modal-countryCode" className="sr-only">Country</label>
                      <select
                        id="modal-countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="appearance-none rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/90 dark:bg-slate-800/90 py-1.5 pl-2 pr-5 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none transition-all cursor-pointer focus:border-red-500 focus:ring-2 focus:ring-red-500/20 h-8.5"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                      <label htmlFor="modal-phone" className="sr-only">Phone Number</label>
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <Phone size={13} />
                      </div>
                      <input
                        id="modal-phone"
                        type="tel"
                        name="phone"
                        maxLength={14}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`w-full rounded-xl border py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-all h-8.5 ${getInputStyle('phone')}`}
                      />
                    </div>
                  </div>

                  {/* Business / Brand Name */}
                  <div>
                    <label htmlFor="modal-businessName" className="sr-only">Enterprise / Brand Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 size={13} />
                      </div>
                      <input
                        id="modal-businessName"
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enterprise / Brand Name"
                        className={`w-full rounded-xl border py-1.5 pl-8 pr-2.5 text-xs font-medium outline-none transition-all h-8.5 ${getInputStyle('businessName')}`}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-0.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-syne font-black text-xs uppercase tracking-widest py-2 px-3.5 shadow-lg shadow-red-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none h-9"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <Sparkles size={13} className="fill-white stroke-[2]" />
                          <span>{getCtaLabel()}</span>
                          <ArrowRight size={13} className="stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security / Privacy Trust Footer */}
                  <div className="pt-1 text-center space-y-0.5">
                    <div className="flex items-center justify-center gap-3 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        No Credit Card Required
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Lock size={9} className="text-slate-400" />
                        100% Confidential
                      </span>
                    </div>

                    <p className="text-[8.5px] text-slate-400 dark:text-slate-500">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" onClick={onClose} className="underline hover:text-red-500 transition-colors">
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

export default ContactSalesModal;
