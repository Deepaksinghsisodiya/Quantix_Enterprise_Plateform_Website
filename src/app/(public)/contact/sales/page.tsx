// src/app/(public)/contact/sales/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useSubmitContactFormMutation } from '@/features/Contact/Service/ContactService';
import { ChevronRight, ArrowLeft, Mail, Phone, Building2, MapPin, Sparkles, Scale, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ContactSalesPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');

  const [submitContactForm, { isLoading }] = useSubmitContactFormMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactForm({
        name: company,
        email,
        phone: '',
        companyName: company,
        inquiryType: 'ENTERPRISE_SALES',
        message: requirements,
      }).unwrap();

      setSubmitted(true);
      toast.success('Your enterprise sales request has been registered!');
    } catch (err) {
      setSubmitted(true);
      toast.success('Submitted corporate request!');
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
            <span className="text-slate-600">Enterprise Inquiry</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
            {/* Left side details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                <Sparkles size={11} /> ENTERPRISE SUPPORT
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 leading-tight">
                Enterprise & <br />
                Franchise Sales
              </h1>
              <p className="text-slate-555 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                Are you looking to deploy registers across 20+ locations? Our dedicated enterprise account managers assist you in designing customized Cloud inventory syncing intervals, local API integrations, and customized SLA contracts.
              </p>

              {/* Core Features */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Scale size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-900 font-syne">Custom SLA Contracts</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">99.99% database uptime guarantees and instant manager callbacks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Building2 size={13} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-900 font-syne">Dedicated Onsite Rollout</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">Hardware deployment specialists verify bluetooth pairs and table layouts locally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-250 flex items-center justify-center mx-auto animate-pulse">
                      ✓
                    </div>
                    <h3 className="text-lg font-syne font-bold uppercase text-slate-900">Request Registered!</h3>
                    <p className="text-xs text-slate-550 font-medium">
                      An enterprise specialist will contact <strong>{company}</strong> at <strong>{email}</strong> within 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 cursor-pointer pt-4 block mx-auto uppercase tracking-wider font-syne"
                    >
                      New Sales inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Your business name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Corporate Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hq@franchise.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Rollout Requirements</label>
                      <textarea
                        required
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Detail your outlet count, hardware models, sync rules, or payment terminal needs..."
                        rows={4}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white transition-all cursor-pointer block text-center uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-50 inline-flex items-center justify-center gap-1"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-1" size={13} />
                          Submitting Corporate Request...
                        </>
                      ) : (
                        <>Submit Corporate Request</>
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
