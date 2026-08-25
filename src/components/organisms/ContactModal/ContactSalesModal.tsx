'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronDown, SendHorizontal, Lock } from 'lucide-react';
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

const BUSINESS_CATEGORIES = [
  'Restaurant & Fine Dining',
  'Retail & Boutique Store',
  'Supermarket & Grocery',
  'Cafe, Bakery & Coffee Shop',
  'Quick Service (QSR) & Takeaway',
  'Multi-Store Franchise & Chain',
];

export const ContactSalesModal: React.FC<ContactSalesModalProps> = ({
  isOpen,
  onClose,
  title = "We've got the right solution for you!",
  subtitle = "Tell us about your business and our solution specialist will build your custom setup within 1 hour.",
  badgeText = "SOLUTIONS EXPERT",
  buttonText = "GET STARTED TODAY",
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    businessName: '',
    businessCategory: '',
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
    if (!formData.businessCategory.trim()) newErrors.businessCategory = true;

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
      businessCategory: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = errors[fieldName];
    return hasError
      ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/40 dark:bg-red-950/20 text-slate-900 dark:text-slate-100 placeholder:text-red-400'
      : 'border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Dialog Container Card with Horizontal Shake on Invalid Submit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={isShaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-90 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-slate-950/40 border border-slate-200/90 dark:border-slate-800 my-auto text-slate-800 dark:text-slate-100 select-none"
          >
            {/* Outer Top Right Corner Floating Close Button (X) */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-3.5 -right-3.5 h-8 w-8 rounded-full bg-white dark:bg-slate-800 text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:scale-110 active:scale-90 transition-all cursor-pointer z-30 flex items-center justify-center"
              aria-label="Close dialog"
            >
              <X size={16} className="stroke-2.5" />
            </button>

            {/* Top Accent Line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-linear-to-r from-primary via-primary-light to-primary-dark rounded-b-full opacity-80" />

            {/* Header Content */}
            <div className="flex flex-col items-center text-center space-y-1.5 mb-4 pt-2">
              {badgeText && (
                <span className="mb-1 inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary dark:text-primary-light">
                  {badgeText}
                </span>
              )}
              <h3 className="text-base sm:text-lg font-syne font-black text-slate-900 dark:text-white leading-snug tracking-tight max-w-67.5">
                {title}
              </h3>

              {subtitle && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-68.75 leading-tight">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="modal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-4 space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 size={28} className="stroke-2.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-syne font-bold text-slate-900 dark:text-white">
                      Request Sent, {formData.fullName.split(' ')[0]}!
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium max-w-60 leading-relaxed">
                      Our solution engineer will review your request and call you at{' '}
                      <span className="font-bold text-primary">{formData.countryCode} {formData.phone}</span> shortly.
                    </p>
                  </div>
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-2 text-xs font-bold text-primary hover:underline cursor-pointer"
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
                  className="space-y-2.5"
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
                      placeholder="Name"
                      className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('fullName')}`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="modal-email" className="sr-only">Email</label>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
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
                        className="appearance-none bg-slate-50/80 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 font-bold rounded-xl pl-3 pr-7 py-2.5 text-xs outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
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
                        placeholder="Phone"
                        className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('phone')}`}
                      />
                    </div>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label htmlFor="modal-businessname" className="sr-only">Business Name</label>
                    <input
                      id="modal-businessname"
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className={`w-full border font-medium rounded-xl px-3.5 py-2.5 text-xs outline-none transition-all ${getInputStyle('businessName')}`}
                    />
                  </div>

                  {/* Business Category */}
                  <div className="relative">
                    <label htmlFor="modal-businesscategory" className="sr-only">Business Category</label>
                    <select
                      id="modal-businesscategory"
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

                  {/* CTA Button */}
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
                          <SendHorizontal size={14} className="stroke-[2.5]" />
                          <span>{buttonText}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust badge & Privacy Disclaimer */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      <Lock size={10} className="text-primary shrink-0" />
                      <span>100% Confidential • Instant 1-hr Response</span>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 font-medium leading-tight">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" onClick={onClose} className="text-slate-600 dark:text-slate-300 font-semibold underline underline-offset-2 hover:text-primary transition-colors">
                        Privacy Policy
                      </Link>
                      .
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
