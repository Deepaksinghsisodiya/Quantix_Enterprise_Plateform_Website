// src/components/organisms/AIAssistantModal/ChatDemoLeadForm.tsx
'use client';

import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, ChevronDown, X } from 'lucide-react';

/**
 * Compact "Book 1-on-1 Personalised Demo" form rendered inside the AI chatbot.
 * Only USA +1 phone formatting.
 * Business Type selector (Standalone vs Enterprise) so leads are clearly classified.
 */

export interface ChatDemoLeadResult {
  fullName: string;
  email: string;
  phone: string;
  merchantType: 'Standalone' | 'Enterprise';
  businessType: string;
}

export interface ChatDemoLeadFormProps {
  businessType: string;
  preferredMerchantType: 'Standalone' | 'Enterprise';
  companyFallback: string;
  onClose: () => void;
  onSuccess: (lead: ChatDemoLeadResult) => void;
}

const formatUsPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const x = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (!x) return digits;
  return !x[2] ? x[1] : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : '');
};

export const ChatDemoLeadForm: React.FC<ChatDemoLeadFormProps> = ({
  businessType,
  preferredMerchantType,
  companyFallback,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    merchantType: preferredMerchantType || 'Enterprise',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const next = name === 'phone' ? formatUsPhone(value) : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = form.fullName.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const phoneDigits = form.phone.replace(/\D/g, '');
    const newErrors: Record<string, boolean> = {};

    if (!cleanName) newErrors.fullName = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) newErrors.email = true;
    if (phoneDigits.length !== 10) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullPhone = `+1 ${form.phone}`.trim();
    setIsSubmitting(true);
    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
      const endpoint = `${apiBase}/api/v1/contact/demo-request`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: cleanName,
          email: cleanEmail,
          phone: fullPhone,
          companyName: companyFallback,
          businessType,
          preferredMerchantType: form.merchantType,
          message: `Lead via AI Chatbot [Model: ${form.merchantType} | Sector: ${businessType}] - Book 1-on-1 Personalised Demo`,
        }),
      });

      if (!res.ok) throw new Error('failed');

      onSuccess({
        fullName: cleanName,
        email: cleanEmail,
        phone: fullPhone,
        merchantType: form.merchantType as 'Standalone' | 'Enterprise',
        businessType,
      });
    } catch {
      setSubmitError('Could not submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inp = (field: string) =>
    `w-full h-[34px] rounded-lg border px-2.5 text-[11.5px] font-medium outline-none transition-all ${
      errors[field]
        ? 'border-red-400 ring-1 ring-red-400/30 bg-red-50/60 dark:bg-red-950/20 placeholder:text-red-300'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20'
    }`;

  return (
    <div className="mx-0.5 my-1.5 rounded-xl border border-orange-200/80 dark:border-orange-900/50 bg-linear-to-br from-orange-50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/20 shadow-sm overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5 border-b border-orange-100 dark:border-orange-900/40">
        <div className="flex items-center gap-1.5 text-[10.5px] font-syne font-black text-[#FF4D00] uppercase tracking-wider">
          <CalendarCheck className="h-3 w-3 shrink-0" />
          <span>Book 1-on-1 Personalised Demo</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* form body */}
      <form onSubmit={handleSubmit} noValidate className="px-3 py-2 space-y-1.5">
        {/* Name */}
        <input
          id="cd-name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Your Name *"
          className={inp('fullName')}
        />

        {/* Email */}
        <input
          id="cd-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Work Email *"
          className={inp('email')}
        />

        {/* Phone: Fixed USA +1 */}
        <div
          className={`flex rounded-lg border transition-all overflow-hidden ${
            errors.phone
              ? 'border-red-400 ring-1 ring-red-400/30'
              : 'border-slate-200 dark:border-slate-700 focus-within:border-[#FF4D00] focus-within:ring-1 focus-within:ring-[#FF4D00]/20'
          }`}
        >
          <div className="flex items-center gap-1 shrink-0 bg-slate-100/90 dark:bg-slate-800 px-2.5 border-r border-slate-200 dark:border-slate-700 select-none">
            <span className="text-[12px]" role="img" aria-label="USA">🇺🇸</span>
            <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-100">+1</span>
          </div>
          <input
            id="cd-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000 *"
            className="flex-1 h-8.5 bg-white dark:bg-slate-800/80 px-2.5 text-[11.5px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Business Type: Standalone vs Enterprise */}
        <div className="space-y-0.5 text-left">
          <label
            htmlFor="cd-merchant-type"
            className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            Business Type *
          </label>
          <div className="relative">
            <select
              id="cd-merchant-type"
              name="merchantType"
              value={form.merchantType}
              onChange={handleChange}
              className="w-full h-8.5 appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-2.5 pr-8 text-[11.5px] font-semibold text-slate-800 dark:text-white outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 cursor-pointer"
            >
              <option value="Enterprise">Enterprise (Multi-Location / Chain)</option>
              <option value="Standalone">Standalone (Single Store / Single Outlet)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {submitError && (
          <p className="text-[10px] text-red-500 font-medium leading-tight">{submitError}</p>
        )}

        <button
          id="cd-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-8.5 flex items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C23500] text-white text-[11px] font-syne font-bold shadow-sm shadow-[#FF4D00]/25 transition-all enabled:cursor-pointer active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>{isSubmitting ? 'Booking...' : 'Book My Demo'}</span>
        </button>

        <p className="text-[9px] text-center text-slate-400 pb-0.5">
          Takes 10 seconds · USA (+1) phone verification
        </p>
      </form>
    </div>
  );
};

export default ChatDemoLeadForm;
