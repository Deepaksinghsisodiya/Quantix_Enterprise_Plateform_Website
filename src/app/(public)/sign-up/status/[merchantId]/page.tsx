// src/app/(public)/sign-up/status/[merchantId]/page.tsx
'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useGetSignupStatusQuery } from '@/features/Register/services/RegisterServices';
import { ChevronRight, ShieldCheck, Clock, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface StatusStep {
  name?: string;
  status?: string;
}

export default function SignupStatusPage() {
  const params = useParams();
  const merchantId = params.merchantId as string;
  const { data: statusData, isLoading, error, refetch } = useGetSignupStatusQuery(merchantId, {
    pollingInterval: 30000, // Poll status every 30 seconds
  });

  const onboardingSteps = [
    { step: 1, title: 'Profile Registration', desc: 'Merchant profile created and email verified.' },
    { step: 2, title: 'Payment Processing', desc: 'Validity license token package authorized.' },
    { step: 3, title: 'Terminal Provisioning', desc: 'Sync telemetry databases provisioning active pipelines.' },
    { step: 4, title: 'Activation Live', desc: 'Terminal live keys active. Ready to download register installers.' }
  ];

  // Map backend status response (e.g. status: 'PENDING', 'PROVISIONED', 'ACTIVE') to step number
  let currentProgress = 1;
  if (statusData) {
    const data = statusData.data || statusData;
    const rawStatus = String(data.status || data.state || data.onboardingStatus || '').toUpperCase();
    const steps = (data.steps || []) as StatusStep[];
    if (steps.some((item) => String(item.name || '').toLowerCase().includes('activation') && String(item.status || '').toLowerCase() === 'completed')) {
      currentProgress = 4;
    } else if (rawStatus === 'PAYMENT_PENDING' || rawStatus === 'EMAIL_VERIFIED') currentProgress = 2;
    else if (rawStatus === 'PROVISIONING' || rawStatus === 'PENDING' || rawStatus === 'PROVISIONED') currentProgress = 3;
    else if (rawStatus === 'ACTIVE' || rawStatus === 'SUCCESS') currentProgress = 4;
  }

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white min-h-screen text-slate-900 pb-16 transition-colors duration-300">
        <div className="site-container max-w-2xl px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600">Onboarding Tracker</span>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 relative overflow-hidden shadow-sm space-y-8">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600" />

            <div className="space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center justify-center gap-1.5">
                <Clock size={12} className="animate-spin" /> LIVE ONBOARDING STATUS
              </span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 leading-tight">
                Merchant Tracker
              </h1>
              <p className="text-slate-500 text-xs font-mono font-bold tracking-wider">
                Merchant ID: {merchantId}
              </p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <Loader2 className="animate-spin text-blue-600" size={32} />
                <p className="text-slate-500 text-xs font-medium">Fetching terminal activation logs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10 space-y-3">
                <p className="text-red-500 text-xs font-bold uppercase">Onboarding Record Not Found</p>
                <p className="text-slate-550 text-xs leading-relaxed max-w-md mx-auto">
                  We could not locate an active onboarding progress report matching this ID. Standard demo/sandbox updates are active.
                </p>
                <button 
                  onClick={() => refetch()}
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold py-2 px-5 transition-all uppercase tracking-wider"
                >
                  Retry Search
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="space-y-6">
                  {onboardingSteps.map((step) => {
                    const isDone = currentProgress > step.step;
                    const isActive = currentProgress === step.step;
                    return (
                      <div key={step.step} className="flex gap-4 items-start relative">
                        <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center border font-black text-xs transition-all ${
                          isDone 
                            ? 'bg-emerald-50 border-emerald-500 text-white'
                            : isActive
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {isDone ? <CheckCircle2 size={14} /> : step.step}
                        </div>

                        <div className="space-y-0.5">
                          <h4 className={`text-xs font-bold uppercase ${
                            isDone 
                              ? 'text-slate-400 line-through'
                              : 'text-slate-900'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-550 leading-relaxed font-semibold">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentProgress === 4 && (
                  <div className="pt-8 text-center border-t border-slate-100 animate-fade-in space-y-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-250 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm">
                      <ShieldCheck size={11} /> TERMINALS READY FOR USE
                    </div>
                    <p className="text-xs text-slate-550 font-medium">
                      Setup complete! You can download the physical POS client and initialize sync telemetry.
                    </p>
                    <Link href="/downloads">
                      <span className="rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-8 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all inline-flex items-center gap-1 cursor-pointer">
                        Get POS Installer <ArrowRight size={13} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
