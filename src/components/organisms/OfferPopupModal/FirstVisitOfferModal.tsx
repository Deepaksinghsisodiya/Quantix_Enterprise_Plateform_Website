'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle2, ChevronDown, Sparkles, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
];

const ENTERPRISE_CATEGORIES = [
  'Multi-Store Retail Chain',
  'Franchise Restaurant Group',
  'Hospitality & Hotel Chains',
  'Omnichannel Commerce Network',
  'Enterprise Multi-Location Brand',
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
    businessCategory: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('quantix_offer_dismissed');
    const isClaimed = localStorage.getItem('quantix_offer_claimed');

    if (!isDismissed && !isClaimed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
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
    if (!formData.businessCategory.trim()) newErrors.businessCategory = true;

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
      ? 'border-red-500 ring-1 ring-red-500/30 bg-red-50/40 dark:bg-red-950/20 text-slate-900 dark:text-slate-100 placeholder:text-red-400'
      : 'border-slate-200/90 dark:border-slate-700/80 bg-slate-50/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500/20';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3.5 sm:p-4 overflow-y-auto">
          {/* Backdrop (Strict Mode - Outside clicks do not close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Modal Outer Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[370px] sm:max-w-[620px] my-auto z-10"
          >
            {/* Top-Right Floating Red Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close offer popup"
              className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 z-50 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Inner Content Card with Perfect Rounded Corners */}
            <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row">
              {/* Left Column: Visual & 3 Months Free Offer (Hidden on mobile, shown on sm+) */}
              <div className="hidden sm:flex sm:w-[240px] p-4 sm:p-4.5 bg-white dark:bg-slate-900 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 shrink-0 relative">
                <div>
                  {/* Top Free Offer Headline */}
                  <div className="mb-2">
                    <div className="text-[26px] font-black font-syne text-slate-950 dark:text-white tracking-tight leading-none">
                      <span className="text-red-600 dark:text-red-500">3 MONTHS</span> FREE
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 mt-1 leading-tight">
                      Enterprise POS & Cloud Platform
                    </p>
                  </div>

                  {/* Product Mockup Image & Floating Offer Badge */}
                  <div className="relative my-2 flex items-center justify-center">
                    <div className="relative w-full h-[125px] flex items-center justify-center">
                      <Image
                        src="/images/products/enterprise_pos_terminal.png"
                        alt="Quantix Enterprise POS & Online Platform"
                        fill
                        quality={100}
                        unoptimized
                        className="object-contain drop-shadow-xl"
                        sizes="240px"
                      />
                    </div>

                    {/* Red Badge Sticker */}
                    <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-md shadow-red-600/30 transform -rotate-6 border border-white/20 flex items-center gap-1 z-10">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>3 MONTHS 100% FREE</span>
                    </div>
                  </div>
                </div>

                {/* Categories / Sectors List */}
                <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                  <div className="space-y-1 text-[10.5px] font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0" />
                      <span>Multi-Store Chains</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0" />
                      <span>Franchise Networks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0" />
                      <span>Hospitality & Retail HQ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Footer-Standard Lead Form */}
              <div className="flex-1 p-4 sm:p-4.5 bg-white dark:bg-slate-900 flex flex-col justify-center">
                {/* Mobile Only Offer Header */}
                <div className="sm:hidden mb-2.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-4">
                  <div className="text-xl font-black font-syne text-slate-950 dark:text-white leading-none">
                    <span className="text-red-600 dark:text-red-500">3 MONTHS</span> FREE
                  </div>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                    Enterprise POS & Cloud Platform
                  </p>
                </div>

                {/* Header with Urgency Clock Icon */}
                <div className="mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-red-600 dark:text-red-500 animate-pulse shrink-0" />
                    <h3 className="text-sm sm:text-base font-black font-syne text-red-600 dark:text-red-500 tracking-tight">
                      Offer Ends Soon
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    Fill in below to claim your 3 months free trial & zero setup fee.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-1.5" noValidate>
                  {/* 1. Name */}
                  <div>
                    <label htmlFor="modal-name-ent" className="sr-only">Name</label>
                    <input
                      id="modal-name-ent"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Name *"
                      className={`w-full border font-medium rounded-lg px-2.5 py-1 text-xs outline-none transition-all h-8 ${getInputStyle('fullName')}`}
                    />
                  </div>

                  {/* 2. Email */}
                  <div>
                    <label htmlFor="modal-email-ent" className="sr-only">Email</label>
                    <input
                      id="modal-email-ent"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      className={`w-full border font-medium rounded-lg px-2.5 py-1 text-xs outline-none transition-all h-8 ${getInputStyle('email')}`}
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
                        className="appearance-none rounded-lg border border-slate-200/90 bg-slate-50/90 py-1 pl-2 pr-5 text-xs font-bold text-slate-900 outline-none transition-all cursor-pointer h-8 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500/20 dark:border-slate-700/80 dark:bg-slate-800/90 dark:text-slate-100 dark:focus:bg-slate-800"
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
                      <label htmlFor="modal-phone-ent" className="sr-only">Phone Number</label>
                      <input
                        id="modal-phone-ent"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone *"
                        className={`w-full border font-medium rounded-lg px-2.5 py-1 text-xs outline-none transition-all h-8 ${getInputStyle('phone')}`}
                      />
                    </div>
                  </div>

                  {/* 4. Business Name */}
                  <div>
                    <label htmlFor="modal-businessname-ent" className="sr-only">Business Name</label>
                    <input
                      id="modal-businessname-ent"
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name *"
                      className={`w-full border font-medium rounded-lg px-2.5 py-1 text-xs outline-none transition-all h-8 ${getInputStyle('businessName')}`}
                    />
                  </div>

                  {/* 5. Business Category */}
                  <div className="relative">
                    <label htmlFor="modal-category-ent" className="sr-only">Business Category</label>
                    <select
                      id="modal-category-ent"
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      className={`w-full appearance-none border font-medium rounded-lg px-2.5 py-1 text-xs outline-none transition-all cursor-pointer h-8 ${getInputStyle('businessCategory')}`}
                    >
                      <option value="" disabled className="text-slate-400">
                        Business Category *
                      </option>
                      {ENTERPRISE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-syne font-extrabold text-xs tracking-wider uppercase py-2 px-3 shadow-xs shadow-red-600/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:pointer-events-none h-8.5"
                    >
                      {isSubmitting ? (
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <PhoneCall size={12} className="fill-white stroke-[2.5]" />
                          <span>GET YOUR OFFER</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Trust Badges */}
                <p className="text-[9px] text-center text-slate-400 dark:text-slate-500 font-medium pt-2">
                  ✓ No Card Required • ✓ Zero Setup Fee • ✓ 24/7 Support
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitOfferModal;
