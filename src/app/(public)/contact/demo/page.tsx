// src/app/(public)/contact/demo/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useRequestDemoMutation } from '@/features/Contact/services/ContactServices';
import { parseApiError } from '@/lib/errorHandler';
import { ChevronRight, ArrowLeft, Calendar, User, Mail, Phone, Store, Sparkles, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactDemoPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locations, setLocations] = useState('1');
  const [demoDate, setDemoDate] = useState('');

  const [requestDemo, { isLoading }] = useRequestDemoMutation();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const raw = value.replace(/\D/g, '').slice(0, 10);
    let newValue = '';
    if (!raw) {
      newValue = '';
    } else if (raw.length <= 3) {
      newValue = `(${raw}`;
    } else if (raw.length <= 6) {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else {
      newValue = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    setPhone(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const phoneDigits = cleanPhone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const res = await requestDemo({
        contactName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        companyName: `Outlets: ${locations}`,
        businessType: 'Enterprise',
        preferredMerchantType: 'Enterprise',
        message: `Onboarding requested via Enterprise demo portal for ${locations} location(s) on ${demoDate}.`,
      }).unwrap();

      setSubmitted(true);
      toast.success(res?.message || 'Your live iPad demo session has been scheduled successfully!');
    } catch (err: unknown) {
      const message = parseApiError(err, 'Failed to schedule demo. Please try again.');
      toast.error(message);
    }
  };

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white min-h-screen text-slate-900 pb-16 transition-colors duration-300">
        <div className="site-container px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600">Book Live Demo</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* Left side info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                <Sparkles size={11} /> BOOK A LIVE SESSION
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 leading-tight">
                Schedule a live <br />
                iPad POS demo
              </h1>
              <p className="text-slate-555 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                Book a customized 15-minute live screen share with our POS specialists. See courses course pacing, local offline databases backup logs, and global billing telemetry in real-time.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-700 font-semibold italic leading-relaxed">
                  "Seeing the sync engine handle split-second database conflict resolution live during the demo convinced us to deploy Quantix across all our bakeries."
                </blockquote>
                <cite className="text-[10px] font-bold uppercase tracking-wider block text-slate-500">
                  — Priya Sharma, Owner, The Daily Grind
                </cite>
              </div>
            </div>

            {/* Right side form card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto animate-pulse">
                      ✓
                    </div>
                    <h3 className="text-lg font-syne font-bold uppercase text-slate-900">Demo Scheduled!</h3>
                    <p className="text-xs text-slate-550 font-medium">
                      We have dispatched an invite link to <strong>{email}</strong> for your selected date <strong>{demoDate}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 cursor-pointer pt-4 block mx-auto uppercase tracking-wider font-syne"
                    >
                      Schedule another session
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Work Email"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          maxLength={14}
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="Phone Number"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Outlets Count</label>
                      <div className="relative">
                        <Store className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <select
                          value={locations}
                          onChange={(e) => setLocations(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="1">1 location</option>
                          <option value="2-5">2 to 5 locations</option>
                          <option value="6-20">6 to 20 locations</option>
                          <option value="20+">More than 20 locations</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Select Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={demoDate}
                          onChange={(e) => setDemoDate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white transition-all cursor-pointer block text-center uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-50 inline-flex items-center justify-center gap-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-1" size={13} />
                          Scheduling Demo...
                        </>
                      ) : (
                        <>Book Live Session</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
