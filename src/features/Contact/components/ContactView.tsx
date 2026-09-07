// src/features/Contact/components/ContactView.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Building2,
  User,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Check,
  Star,
  Gift,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { ATMTextField, ATMPhoneField, ATMButton } from '@/components/atoms';
import { useRequestDemoMutation } from '../Service/ContactService';
import { parseApiError } from '@/lib/errorHandler';
import { cn } from '@/lib/utils';

const INQUIRY_OPTIONS = [
  { id: 'Live Demo', label: '15-Minute Live Architecture Demo', icon: Sparkles },
  { id: 'Custom Quote', label: 'Custom Enterprise Volume Quote', icon: Building2 },
  { id: 'Multi-Location', label: 'Multi-Location Store Rollout', icon: Layers },
  { id: 'Migration', label: 'Free POS Data & Catalog Migration', icon: CheckCircle2 },
  { id: 'General', label: 'General Enterprise Inquiry', icon: HelpCircle },
];

const contactSchema = Yup.object().shape({
  fullName: Yup.string().trim().required('Full name is required'),
  email: Yup.string().trim().email('Please enter a valid work email').required('Work email is required'),
  phone: Yup.string().required('Phone number is required'),
  companyName: Yup.string().trim().required('Company / brand name is required'),
  inquiryType: Yup.string().required('Please select requirement'),
  message: Yup.string().trim(),
});

export const ContactView: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const [requestDemo, { isLoading }] = useRequestDemoMutation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    const payload = {
      contactName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      companyName: values.companyName.trim(),
      businessType: 'Enterprise',
      preferredMerchantType: 'Enterprise',
      preferredTime: values.inquiryType,
      message: values.message.trim() || `Enterprise Demo Request: ${values.inquiryType}`,
    };

    try {
      const res = await requestDemo(payload).unwrap();
      if (res?.success) {
        setSubmittedEmail(values.email.trim());
        setIsSubmitted(true);
        resetForm();
        toast.success(res?.message || 'Demo request received! Our team will contact you within 15 minutes.');
      } else {
        toast.error(res?.message || 'Failed to submit request.');
      }
    } catch (err) {
      const parsed = parseApiError(err);
      toast.error(parsed || 'Something went wrong. Please check your connection.');
    }
  };

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    inquiryType: INQUIRY_OPTIONS[0].label,
    message: '',
  };

  return (
    <div className="w-full font-sans min-h-screen text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Exact site-wide standard with page-hero-header) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] mb-3 shadow-2xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fast Response • Usually Under 15 Mins</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Talk with an <span className="text-[#FF4D00]">Enterprise POS</span> Specialist
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Get a tailored 15-minute live demo, custom rollout quote, and claim our 100% free POS trial.
          </p>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Exact site-wide standard with section-py) ─── */}
      <section className="section-py site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">

          {/* ════ LEFT: Direct Contact & Attractive Offer (5 cols) ════ */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">

            {/* 🎁 Eye-Catching Special Offer Card */}
            <div className="bg-linear-to-br from-orange-500 via-orange-600 to-amber-600 rounded-2xl sm:rounded-3xl p-4.5 sm:p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-white/20 text-white backdrop-blur-xs">
                  <Gift size={15} />
                </span>
                <span className="text-[10.5px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white">
                  Limited-Time Offer
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-syne font-black leading-snug">
                Get 3 Months 100% Free POS Trial
              </h3>
              <p className="text-xs text-orange-100 font-medium mt-1 leading-relaxed">
                Deploy Quantix Enterprise across all locations with zero financial risk.
              </p>

              <div className="mt-3 space-y-1.5 text-[11.5px] border-t border-white/15 pt-2.5">
                <div className="flex items-center gap-2 text-white/95">
                  <Check size={13} className="text-white shrink-0 stroke-3" />
                  <span>Zero upfront setup or licensing fees</span>
                </div>
                <div className="flex items-center gap-2 text-white/95">
                  <Check size={13} className="text-white shrink-0 stroke-3" />
                  <span>Free menu, SKU, &amp; data migration included</span>
                </div>
                <div className="flex items-center gap-2 text-white/95">
                  <Check size={13} className="text-white shrink-0 stroke-3" />
                  <span>24/7 dedicated solutions architect support</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs space-y-2.5">
              <h3 className="text-[11px] font-syne font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Prefer to Reach Us Directly?
              </h3>

              {/* Call Link */}
              <a
                href="tel:+18005550199"
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 hover:bg-orange-50 dark:bg-slate-800/60 dark:hover:bg-orange-950/30 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8.5 w-8.5 rounded-lg bg-orange-500/10 text-[#FF4D00] flex items-center justify-center shrink-0">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Direct Sales Hotline</p>
                    <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#FF4D00] transition-colors">
                      +1 (800) 555-0199
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#FF4D00]">Call →</span>
              </a>

              {/* Email Link */}
              <a
                href="mailto:enterprise@quantixpos.com"
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-slate-50 hover:bg-orange-50 dark:bg-slate-800/60 dark:hover:bg-orange-950/30 border border-slate-200/60 dark:border-slate-700/60 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8.5 w-8.5 rounded-lg bg-orange-500/10 text-[#FF4D00] flex items-center justify-center shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Direct Sales Inbox</p>
                    <p className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#FF4D00] transition-colors truncate">
                      enterprise@quantixpos.com
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#FF4D00]">Write →</span>
              </a>

              {/* Operational details */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} className="text-slate-400" />
                  Mon - Sun (9 AM - 8 PM EST)
                </span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online Now
                </span>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-xs">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900 dark:text-white">4.9 / 5.0</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                2,500+ Active Outlets
              </span>
            </div>

          </div>

          {/* ════ RIGHT: High-Converting Friction-Free Form (7 cols) ════ */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-200/50 dark:shadow-none">

              <div className="mb-3.5 sm:mb-4">
                <h2 className="text-base sm:text-xl font-syne font-bold text-slate-950 dark:text-white">
                  Schedule Your Free Demo &amp; Quote
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Fill in your details below. Fast, straightforward POS architecture walkthrough.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 text-center space-y-2.5"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={26} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-syne font-bold text-slate-900 dark:text-white">
                      Request Received!
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      We&apos;ve assigned a solutions architect to your request. Expect a reply at{' '}
                      <span className="font-semibold text-slate-900 dark:text-white">{submittedEmail}</span> within 15 minutes.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={contactSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ values, setFieldValue, isSubmitting }) => {
                      const selectedOption =
                        INQUIRY_OPTIONS.find((opt) => opt.label === values.inquiryType) || INQUIRY_OPTIONS[0];
                      const SelectedIcon = selectedOption.icon;

                      return (
                        <Form className="space-y-2.5 font-sans">
                          {/* Row 1: Merchant Company Name & Full Name (Like SignUpForm Row 1) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <ATMTextField
                              name="companyName"
                              label="Company / Brand Name"
                              placeholder="Company / Brand Name"
                              leftIcon={<Building2 size={14} />}
                              required
                            />
                            <ATMTextField
                              name="fullName"
                              label="Full Name"
                              placeholder="Full Name"
                              leftIcon={<User size={14} />}
                              required
                            />
                          </div>

                          {/* Row 2: Work Email (Like SignUpForm Row 2) */}
                          <ATMTextField
                            name="email"
                            type="email"
                            label="Work Email"
                            placeholder="work.email@company.com"
                            leftIcon={<Mail size={14} />}
                            required
                          />

                          {/* Row 3: Contact Phone (Like SignUpForm Row 3 with +1 country flag) */}
                          <ATMPhoneField
                            name="phone"
                            label="Phone Number"
                            placeholder="(555) 000-0000"
                            required
                          />

                          {/* Row 4: Custom Select Dropdown (Identical to SignUpForm's Business Nature Popover) */}
                          <div className="w-full text-left font-sans relative" ref={typeDropdownRef}>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5 tracking-normal">
                              Primary Requirement <span className="text-[#FF4D00] font-bold">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                              className="w-full h-9 sm:h-9.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 px-3 text-xs sm:text-[13px] font-normal transition-all duration-200 text-slate-900 dark:text-white bg-white dark:bg-slate-900 flex items-center justify-between shadow-2xs cursor-pointer select-none text-left"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <SelectedIcon size={14} className="text-[#FF4D00] shrink-0" />
                                <span className="truncate block leading-none font-medium text-slate-900 dark:text-white">
                                  {selectedOption.label}
                                </span>
                              </div>
                              <ChevronDown
                                size={13}
                                className={cn(
                                  'text-slate-400 shrink-0 transition-transform duration-200',
                                  isTypeDropdownOpen && 'rotate-180'
                                )}
                              />
                            </button>

                            {/* Custom Popover Dropdown (Like SignUpForm) */}
                            {isTypeDropdownOpen && (
                              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-150">
                                {INQUIRY_OPTIONS.map((opt) => {
                                  const isSelected = values.inquiryType === opt.label;
                                  const OptionIcon = opt.icon;
                                  return (
                                    <button
                                      key={opt.id}
                                      type="button"
                                      onClick={() => {
                                        setFieldValue('inquiryType', opt.label);
                                        setIsTypeDropdownOpen(false);
                                      }}
                                      className={cn(
                                        'w-full px-3 py-1.5 sm:py-2 flex items-center justify-between text-xs transition-colors cursor-pointer text-left',
                                        isSelected
                                          ? 'bg-orange-50 dark:bg-orange-950/40 font-bold text-[#FF4D00]'
                                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        <OptionIcon
                                          size={14}
                                          className={isSelected ? 'text-[#FF4D00]' : 'text-slate-400'}
                                        />
                                        <span>{opt.label}</span>
                                      </div>
                                      {isSelected && <Check size={14} className="text-[#FF4D00]" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Row 5: Notes / Message */}
                          <div className="w-full text-left font-sans">
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-0.5 tracking-normal">
                              Rollout Notes <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
                            </label>
                            <div className="relative flex">
                              <textarea
                                name="message"
                                rows={2}
                                value={values.message}
                                onChange={(e) => setFieldValue('message', e.target.value)}
                                placeholder="E.g. number of registers, locations, target deployment date..."
                                className="w-full h-16 sm:h-18 rounded-xl border pl-8.5 pr-3 pt-2 text-xs sm:text-[13px] font-medium outline-none transition-all duration-200 text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/15 resize-none"
                              />
                              <span className="absolute left-3 top-2.5 text-slate-400 pointer-events-none">
                                <MessageSquare size={14} />
                              </span>
                            </div>
                          </div>

                          {/* Submit CTA Button (ATMButton Reusable) */}
                          <div className="pt-1">
                            <ATMButton
                              type="submit"
                              variant="form"
                              size="form"
                              fullWidth
                              isLoading={isLoading || isSubmitting}
                              disabled={isLoading || isSubmitting}
                            >
                              <span>Claim 3 Months Free &amp; Book Demo</span>
                              <ArrowRight size={14} />
                            </ATMButton>
                          </div>

                          {/* Reassurance text */}
                          <div className="flex items-center justify-center gap-2 pt-0.5 text-[10px] sm:text-[10.5px] text-slate-400 dark:text-slate-500 text-center flex-wrap">
                            <span className="flex items-center gap-1">
                              <ShieldCheck size={12} className="text-emerald-500" />
                              100% Free Demo
                            </span>
                            <span>•</span>
                            <span>Zero Setup Fees</span>
                            <span>•</span>
                            <span>No Commitment</span>
                          </div>

                        </Form>
                      );
                    }}
                  </Formik>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default ContactView;
