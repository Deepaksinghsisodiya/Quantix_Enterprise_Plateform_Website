'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChevronDown, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
];

export const FirstVisitOfferModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    businessName: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('quantix_offer_dismissed');
    const isClaimed = localStorage.getItem('quantix_offer_claimed');

    if (!isDismissed && !isClaimed) {
      // 3.2 second delay gives user time to view hero first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('quantix_offer_dismissed', 'true');
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};

    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = true;
    if (!formData.phone.trim() || formData.phone.trim().length < 6) newErrors.phone = true;
    if (!formData.businessName.trim()) newErrors.businessName = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      sessionStorage.setItem('quantix_offer_dismissed', 'true');
      localStorage.setItem('quantix_offer_claimed', 'true');
      toast.success('Congratulations! Your 3 Months Free Enterprise Offer has been reserved. Our specialist will contact you shortly.', {
        duration: 5000,
      });
    }, 700);
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = errors[fieldName];
    return hasError
      ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/40 dark:bg-red-950/20 text-slate-900 dark:text-slate-100 placeholder:text-red-400'
      : 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
          {/* Backdrop (Strict Mode) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          {/* Modal Outer Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[380px] sm:max-w-[650px] my-auto z-10"
          >
            {/* Floating Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close offer popup"
              className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 z-50 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Inner Content Card */}
            <div className="w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row">
              {/* Left Column: Visual & 3 Months Free Offer (Desktop Only) */}
              <div className="hidden sm:flex sm:w-[255px] p-5 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 shrink-0 relative">
                <div>
                  {/* Top Free Offer Headline */}
                  <div className="mb-2">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      Limited Time Grant
                    </div>
                    <div className="text-[25px] font-black font-syne text-slate-950 dark:text-white tracking-tight leading-none">
                      <span className="text-red-600 dark:text-red-500">3 MONTHS</span> FREE
                    </div>
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                      Enterprise POS & Cloud Platform
                    </p>
                  </div>

                  {/* Product Mockup Image & Floating Offer Badge */}
                  <div className="relative my-3 flex items-center justify-center">
                    <div className="relative w-full h-[125px] flex items-center justify-center">
                      <Image
                        src="/images/foodhub_bundle_mockup.png"
                        alt="Quantix Enterprise POS & Online Platform"
                        fill
                        quality={100}
                        unoptimized
                        className="object-contain drop-shadow-xl"
                        sizes="255px"
                      />
                    </div>

                    {/* Red Badge Sticker */}
                    <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[9px] px-2.5 py-0.5 rounded-md shadow-md shadow-red-600/30 transform -rotate-3 border border-white/20 flex items-center gap-1 z-10">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>100% ZERO SETUP FEE</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-2.5 border-t border-slate-200/70 dark:border-slate-800">
                  <div className="space-y-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Multi-Store Central HQ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Enterprise Live Inventory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Dedicated Account Manager</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form */}
              <div className="flex-1 p-4.5 sm:p-5 bg-white dark:bg-slate-900 flex flex-col justify-center">
                {/* Unified Header */}
                <div className="mb-3 text-center sm:text-left">
                  {/* Urgency Pill */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200/60 dark:border-red-900/50 text-red-600 dark:text-red-400 text-[10px] font-extrabold uppercase tracking-wide mb-1">
                    <Clock className="w-2.5 h-2.5 animate-pulse shrink-0" />
                    <span>Offer Ends Soon • 3 Months Free</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black font-syne text-slate-950 dark:text-white tracking-tight leading-tight">
                    Claim Your 3 Months Free Trial
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Enter details below to lock in zero setup fees & live demo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
                  {/* 1. Name */}
                  <div>
                    <label htmlFor="modal-name-ent" className="sr-only">Full Name</label>
                    <input
                      id="modal-name-ent"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={`w-full border font-medium rounded-xl px-3 py-1.5 text-xs outline-none transition-all h-9 ${getInputStyle('fullName')}`}
                    />
                  </div>

                  {/* 2. Email */}
                  <div>
                    <label htmlFor="modal-email-ent" className="sr-only">Work Email</label>
                    <input
                      id="modal-email-ent"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email *"
                      className={`w-full border font-medium rounded-xl px-3 py-1.5 text-xs outline-none transition-all h-9 ${getInputStyle('email')}`}
                    />
                  </div>

                  {/* 3. Phone (with country code selector) */}
                  <div className="flex gap-1.5">
                    <div className="relative shrink-0">
                      <label htmlFor="modal-country-ent" className="sr-only">Country Code</label>
                      <select
                        id="modal-country-ent"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 py-1.5 pl-2.5 pr-6 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none transition-all cursor-pointer h-9 focus:border-red-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-red-500/20"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="modal-phone-ent" className="sr-only">Phone Number</label>
                      <input
                        id="modal-phone-ent"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        className={`w-full border font-medium rounded-xl px-3 py-1.5 text-xs outline-none transition-all h-9 ${getInputStyle('phone')}`}
                      />
                    </div>
                  </div>

                  {/* 4. Business Name */}
                  <div>
                    <label htmlFor="modal-businessname-ent" className="sr-only">Company / Business Name</label>
                    <input
                      id="modal-businessname-ent"
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Company / Enterprise Name *"
                      className={`w-full border font-medium rounded-xl px-3 py-1.5 text-xs outline-none transition-all h-9 ${getInputStyle('businessName')}`}
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.99] text-white font-syne font-black text-xs tracking-wider uppercase py-2.5 px-4 shadow-lg shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none h-10"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <Sparkles size={14} className="fill-white/20" />
                          <span>CLAIM MY 3 MONTHS FREE</span>
                          <ArrowRight size={14} className="stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-slate-500 dark:text-slate-400 font-medium pt-2.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>No Credit Card Required • Zero Setup Fee • 24/7 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitOfferModal;
