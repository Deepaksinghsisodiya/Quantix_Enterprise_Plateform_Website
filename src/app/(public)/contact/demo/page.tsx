// src/app/(public)/contact/demo/page.tsx
'use client';

import React, { useState } from 'react';
import { useRequestDemoMutation } from '@/features/Contact/Service/ContactService';
import { parseApiError } from '@/lib/errorHandler';
import { ATMButton } from '@/components/atoms/ATMButton';
import {
  ChevronRight,
  Calendar,
  User,
  Mail,
  Building,
  Phone,
  Clock,
  Sparkles,
  Star,
  CheckCircle2,
  ShieldCheck,
  Layers,
  ArrowRight,
  Server,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactDemoPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    companyName: '',
    locations: '2-5 locations',
    businessType: 'Enterprise',
    preferredMerchantType: 'Enterprise',
    preferredTime: 'Morning (09:00 AM - 12:00 PM EST)',
    areasOfInterest: 'Multi-Store Centralization & Real-time Telemetry',
  });

  const [requestDemo, { isLoading }] = useRequestDemoMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'phone') {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanName = formData.contactName.trim();
    const cleanPhone = formData.phone.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      toast.error('Please enter a valid work email address.');
      return;
    }

    const phoneDigits = cleanPhone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      toast.error('Please enter a valid 10-digit US phone number.');
      return;
    }

    try {
      const res = await requestDemo({
        contactName: cleanName,
        email: cleanEmail,
        phone: `+1 ${cleanPhone}`,
        companyName: formData.companyName.trim() || `Enterprise Fleet (${formData.locations})`,
        businessType: 'Enterprise',
        preferredMerchantType: 'Enterprise',
        preferredTime: formData.preferredTime,
        message: `Enterprise Live Demo booked for ${formData.locations} | Focus: ${formData.areasOfInterest} | Preferred Time: ${formData.preferredTime}`,
      }).unwrap();

      setSubmitted(true);
      toast.success(res?.message || 'Your live Enterprise session has been scheduled successfully!');
    } catch (err: unknown) {
      const message = parseApiError(err, 'Failed to schedule demo. Please try again.');
      toast.error(message);
    }
  };

  return (
    <main className="pt-32 sm:pt-36 bg-slate-50/50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-24 transition-colors duration-300 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs with adequate top spacing */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">Book Enterprise Demo</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left side info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-2xs">
                <Sparkles size={12} /> ARCHITECTURAL DISCOVERY SESSION
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight">
                Schedule a Live <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500">
                  Enterprise POS Demo
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                Connect with our principal solutions architects for an interactive 15-minute screen share. Review offline database failovers, global store sync, ERP pipelines, and tailored hardware rollouts.
              </p>

              {/* Review Testimonial Card (US Enterprise Proof) */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-700 dark:text-slate-300 font-semibold italic leading-relaxed">
                  &ldquo;Seeing the distributed sync engine handle split-second offline conflict resolution during the live demo gave us the confidence to roll out Quantix across 42 store locations in the US.&rdquo;
                </blockquote>
                <cite className="text-[10px] font-bold uppercase tracking-wider block text-slate-500 dark:text-slate-400 not-italic">
                  — Marcus Vance, VP of Store Operations, Blue Ridge Retail Group (Atlanta, GA)
                </cite>
              </div>

              {/* Security & Confidentiality Guarantee */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium shadow-2xs">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <span>Strict Enterprise NDA Protection • Zero Vendor Lock-in</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-medium shadow-2xs">
                  <Server size={18} className="text-blue-500 shrink-0" />
                  <span>Review customized migration timelines & volume pricing tier</span>
                </div>
              </div>
            </div>

            {/* Right side form card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500" />

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-xl font-syne font-black uppercase text-slate-900 dark:text-white">
                      Enterprise Demo Scheduled!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-white">{formData.contactName}</strong>. A calendar invitation and architecture overview have been dispatched to{' '}
                      <strong className="text-blue-600 dark:text-blue-400">{formData.email}</strong>. Our senior solution architect will meet with you during your chosen time slot: <strong className="text-slate-900 dark:text-white">{formData.preferredTime}</strong>.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors uppercase tracking-wider font-syne cursor-pointer"
                      >
                        Book Another Session
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <h2 className="text-lg font-syne font-bold text-slate-900 dark:text-white">
                        Book Your 15-Minute Session
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        No high-pressure sales. Direct architectural evaluation with a senior engineer.
                      </p>
                    </div>

                    {/* Row 1: Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Full Name <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <User size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            name="contactName"
                            required
                            value={formData.contactName}
                            onChange={handleChange}
                            placeholder="Marcus Vance"
                            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 pl-9.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Work Email <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <Mail size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="m.vance@company.com"
                            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 pl-9.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: US Phone Number & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Phone Number <span className="text-red-500 font-bold">*</span>
                        </label>
                        <div className="relative flex items-center h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-2xs overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all">
                          <div className="h-full bg-slate-50 dark:bg-slate-800/80 border-r border-slate-200 dark:border-slate-700 px-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 select-none shrink-0">
                            <Phone size={13} className="text-slate-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-100">+1</span>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 000-0000"
                            maxLength={14}
                            className="w-full h-full bg-transparent border-0 px-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Company / Brand Name
                        </label>
                        <div className="relative flex items-center">
                          <Building size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Blue Ridge Hospitality Group"
                            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 pl-9.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Outlets Count & Preferred Time (EST) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Store / Terminal Fleet Size
                        </label>
                        <div className="relative flex items-center">
                          <Layers size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                          <select
                            name="locations"
                            value={formData.locations}
                            onChange={handleChange}
                            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 pl-9.5 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs font-medium cursor-pointer"
                          >
                            <option value="1 location">Single Location (Enterprise Evaluation)</option>
                            <option value="2-5 locations">2 to 5 Locations (Regional Chain)</option>
                            <option value="6-20 locations">6 to 20 Locations (Multi-Unit Rollout)</option>
                            <option value="20+ locations">20+ Locations (Tier-1 Nationwide Fleet)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 text-left font-sans">
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                          Preferred Session Time (EST)
                        </label>
                        <div className="relative flex items-center">
                          <Clock size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 pl-9.5 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs font-medium cursor-pointer"
                          >
                            <option value="Morning (09:00 AM - 12:00 PM EST)">Morning (09:00 AM - 12:00 PM EST)</option>
                            <option value="Afternoon (01:00 PM - 04:00 PM EST)">Afternoon (01:00 PM - 04:00 PM EST)</option>
                            <option value="Late Afternoon (04:00 PM - 06:00 PM EST)">Late Afternoon (04:00 PM - 06:00 PM EST)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Primary Area of Interest */}
                    <div className="space-y-1 text-left font-sans">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-normal">
                        Primary Focus for Walkthrough
                      </label>
                      <select
                        name="areasOfInterest"
                        value={formData.areasOfInterest}
                        onChange={handleChange}
                        className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-2xs font-medium cursor-pointer"
                      >
                        <option value="Multi-Store Centralization & Real-time Telemetry">Multi-Store Centralization & Real-time Telemetry</option>
                        <option value="Offline Conflict Resolution & Zero-Downtime POS">Offline Conflict Resolution & Zero-Downtime POS</option>
                        <option value="Custom ERP, SAP & NetSuite Connector Pipelines">Custom ERP, SAP & NetSuite Connector Pipelines</option>
                        <option value="High-Speed Checkout & Thermal Kitchen Printer Fleet">High-Speed Checkout & Kitchen Printer Fleet</option>
                        <option value="Omnichannel Loyalty, Inventory Matrix & Gift Cards">Omnichannel Loyalty, Inventory Matrix & Gift Cards</option>
                      </select>
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-2">
                      <ATMButton
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Scheduling 15-Min Walkthrough..."
                        className="w-full h-11 bg-linear-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-syne font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar size={15} />
                        <span>Confirm 15-Minute Enterprise Demo</span>
                        <ArrowRight size={15} />
                      </ATMButton>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-400 font-medium">
                      <Lock size={12} className="text-slate-400" />
                      <span>Confidential architecture review • Fast 1-hour confirmation</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
