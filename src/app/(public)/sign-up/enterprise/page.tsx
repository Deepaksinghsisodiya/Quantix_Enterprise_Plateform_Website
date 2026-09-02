// src/app/(public)/sign-up/enterprise/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useSignupMutation } from '@/features/Register/services/RegisterServices';
import { ChevronRight, ArrowRight, ShieldCheck, CreditCard, Sparkles, Building2, User, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

type EnterprisePlanId = 'free' | 'basic' | 'pro' | 'enterprise';

interface SignupResponseShape {
  data?: {
    merchantId?: string;
    leadId?: string;
    id?: string;
  };
  merchantId?: string;
  leadId?: string;
  id?: string;
}

const extractMerchantId = (res: SignupResponseShape | null | undefined) =>
  res?.data?.merchantId ??
  res?.data?.leadId ??
  res?.data?.id ??
  res?.merchantId ??
  res?.leadId ??
  res?.id;

function EnterpriseSignupContent() {
  const [selectedPlan, setSelectedPlan] = useState<EnterprisePlanId>('pro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [signup, { isLoading }] = useSignupMutation();

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({
        merchantType: 'Enterprise',
        companyName: company,
        contactName: name,
        contactEmail: email,
        contactPhone: null,
        country: 'United States',
        planId: null,
        billingCycle: 'Monthly',
      }).unwrap();

      toast.success('Registration successful! OTP has been dispatched to your email.');
      const merchantId = extractMerchantId(res);
      
      const returnUrl = searchParams.get('returnUrl');
      const source = searchParams.get('source');
      const verifyParams = new URLSearchParams();
      if (merchantId) verifyParams.set('id', merchantId);
      if (email) verifyParams.set('email', email);
      if (returnUrl) verifyParams.set('returnUrl', returnUrl);
      if (source) verifyParams.set('source', source);

      router.push(merchantId ? `/sign-up/verify?${verifyParams.toString()}` : '/sign-in');
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || 'Onboarding registration failed. Please check details and try again.');
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
            <Link href="/sign-up" className="hover:text-blue-500 transition-colors">Sign Up</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600">Cloud Enterprise Onboarding</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                <Sparkles size={11} /> CLOUD REGISTRATION
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 leading-tight">
                Create Cloud <br />
                POS account
              </h1>
              <p className="text-slate-550 text-xs sm:text-sm font-medium leading-relaxed">
                Connect your physical checkout terminals to the high-performance Cloud Telemetry service. Enjoy live inventory updates, supplier ordering grids, and automated sales dashboards.
              </p>

              {/* Package cards picker */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-syne">Select Subscription tier</span>
                {[
                  { id: 'free', name: 'Free Tier', price: '$0 /mo', desc: '1 register terminal, essential telemetry.' },
                  { id: 'basic', name: 'Basic Tier', price: '$49 /mo', desc: 'Up to 3 terminals, course-pacing setup.' },
                  { id: 'pro', name: 'Pro Tier', price: '$99 /mo', desc: 'Unlimited terminals, sync engines, multi-outlets.' },
                  { id: 'enterprise', name: 'Enterprise Tier', price: '$249 /mo', desc: 'Franchise controls, dedicated manager rolls.' }
                ].map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id as EnterprisePlanId)}
                    className={cn(
                      "w-full text-left rounded-2xl p-4 border transition-all cursor-pointer flex justify-between items-center",
                      selectedPlan === plan.id
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300"
                    )}
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold uppercase block">{plan.name}</span>
                      <span className="text-[10px] opacity-80 block">{plan.desc}</span>
                    </div>
                    <span className="text-xs font-mono font-black">{plan.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

                <h3 className="text-sm font-bold uppercase text-slate-900 mb-6 font-syne">Enter Merchant Details</h3>

                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Manager Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Manager Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="personal@business.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Business / Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Franchise brand name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-xs text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white transition-all cursor-pointer block text-center uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 inline-flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-1" size={13} />
                          Onboarding Profile...
                        </>
                      ) : (
                        <>
                          Process Package & Onboard <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}

export default function EnterpriseSignupPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading signup...</div>}>
      <EnterpriseSignupContent />
    </React.Suspense>
  );
}
