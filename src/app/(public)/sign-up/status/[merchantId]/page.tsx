// src/app/(public)/sign-up/status/[merchantId]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShieldCheck, Clock, CheckCircle2, Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { useGetSignupStatusQuery } from '@/features/Register/services/RegisterServices';

interface StatusStep {
  name?: string;
  status?: string;
}

export default function SignupStatusPage() {
  const params = useParams();
  const merchantId = (params?.merchantId as string) || '';
  const { data: statusData, isLoading, error, refetch, isFetching } = useGetSignupStatusQuery(merchantId, {
    skip: !merchantId,
    pollingInterval: 30000,
  });

  const onboardingSteps = [
    { step: 1, title: 'Profile Registration', desc: 'Merchant profile created and email verified.' },
    { step: 2, title: 'Application Review', desc: 'KYC & compliance validation by platform administrator.' },
    { step: 3, title: 'Cloud Infrastructure', desc: 'Isolated telemetry database and POS pipelines provisioned.' },
    { step: 4, title: 'Account Activated', desc: 'Live access keys active. Ready to download POS clients.' }
  ];

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
    <SplitAuthLayout
      coverImage="/images/quantix_auth_pos_terminal.jpg"
      coverAlt="Quantix Onboarding Tracker"
      coverHeadline="Onboarding Tracker"
      coverSubtext="Monitor the provisioning lifecycle of your enterprise master terminal, sync databases, and multi-franchise catalogs in real time."
    >
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#FF4D00] mb-3">
            <Clock size={12} className={isFetching ? 'animate-spin' : ''} />
            <span>Live Onboarding Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 leading-tight tracking-tight">
            Application Status
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed font-mono">
            Merchant Ref: <span className="font-bold text-slate-800">{merchantId ? `${merchantId.slice(0, 8)}...${merchantId.slice(-4)}` : 'Loading...'}</span>
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
            <Loader2 className="animate-spin text-[#FF4D00]" size={32} />
            <p className="text-xs font-medium">Fetching live provisioning status...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center space-y-3 mb-6">
            <p className="text-xs font-bold text-slate-700 uppercase">Application Under Review</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your registration is being verified by our operations team. You will receive an email once your workspace is live.
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D00] hover:underline cursor-pointer pt-2"
            >
              <RefreshCw size={12} />
              <span>Refresh Status</span>
            </button>
          </div>
        ) : (
          /* Steps Progress */
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 space-y-3.5 mb-6 text-left">
            <div className="space-y-3">
              {onboardingSteps.map((step) => {
                const isDone = currentProgress > step.step;
                const isActive = currentProgress === step.step;
                return (
                  <div key={step.step} className="flex gap-3 items-start">
                    <div
                      className={`h-6 w-6 rounded-full shrink-0 flex items-center justify-center font-bold text-[11px] transition-all mt-0.5 ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isActive
                            ? 'bg-[#FF4D00] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={13} className="stroke-[3]" /> : step.step}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          <Link
            href="/sign-in"
            className="w-full rounded-xl bg-gradient-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white py-3.5 px-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to Sign In</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </SplitAuthLayout>
  );
}
