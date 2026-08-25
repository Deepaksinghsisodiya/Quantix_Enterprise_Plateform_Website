// src/app/(public)/sign-up/activate/page.tsx
'use client';

import React, { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Check, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  useActivateMerchantMutation,
  useGetSignupStatusQuery,
  useProvisionMerchantMutation,
} from '@/features/Register/services/RegisterServices';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

interface OnboardingStep {
  name?: string;
  stepName?: string;
  status?: string;
  displayName?: string;
}

function ActivateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const merchantId = searchParams.get('id') || searchParams.get('merchantId') || '';
  const [hasStarted, setHasStarted] = useState(false);

  const { data: statusData, refetch } = useGetSignupStatusQuery(merchantId, { skip: !merchantId });
  const [activateMerchant, { isLoading: isActivating, isSuccess }] = useActivateMerchantMutation();
  const [provisionMerchant, { isLoading: isProvisioning }] = useProvisionMerchantMutation();

  const statusSteps = (statusData?.data?.steps || statusData?.steps || []) as OnboardingStep[];
  const isAlreadyActive = statusSteps.some((st) => {
    const name = String(st.name || st.stepName || '').toLowerCase();
    const status = String(st.status || '').toLowerCase();
    return (name.includes('activation') || name.includes('activate')) && status === 'completed';
  });

  useEffect(() => {
    if (merchantId && !isAlreadyActive && !hasStarted) {
      setHasStarted(true);
      provisionMerchant(merchantId)
        .unwrap()
        .then(() => activateMerchant(merchantId).unwrap())
        .then(() => {
          toast.success('Your merchant account has been activated successfully!');
          refetch();
        })
        .catch((err: any) => {
          if (err?.status !== 401) {
            toast.error(err?.data?.message || err?.message || 'Activation failed.');
          }
        });
    }
  }, [merchantId, activateMerchant, provisionMerchant, refetch, isAlreadyActive, hasStarted]);

  // Mock standard timeline checklist if server returns empty steps
  const steps = statusSteps.length ? statusSteps : [
    { name: 'Register', displayName: 'Registration Profile Creation', status: 'Completed' },
    { name: 'VerifyEmail', displayName: 'Email Verification OTP Verification', status: 'Completed' },
    { name: 'Payment', displayName: 'Merchant Account Deposition & Setup', status: 'Completed' },
    { name: 'Activate', displayName: 'Global Platform Profile Activation', status: (isSuccess || isAlreadyActive) ? 'Completed' : 'Pending' }
  ];

  return (
    <div className="site-container max-w-lg mx-auto py-24 min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

        {(isSuccess || isAlreadyActive) ? (
          <div className="text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <Sparkles size={32} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Account Active!
              </h2>
              <p className="text-xs text-slate-550 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                Congratulations! Your merchant profile is completely authorized. You can now access your cloud dashboard terminal.
              </p>
            </div>

            {/* Checklist Timeline */}
            <div className="bg-white dark:bg-slate-950/60 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 text-left space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 border-b border-gray-200 dark:border-slate-800 pb-2">
                Onboarding Steps Status
              </h4>
              <div className="space-y-3">
                {steps.map((st: OnboardingStep, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Check size={11} className="stroke-3" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {st.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push('/sign-in')}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={13} className="fill-current" /> Access Merchant Dashboard
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-400 animate-spin border-t-blue-500" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase font-syne">Activating Profile...</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isProvisioning || isActivating
                  ? 'Provisioning merchant services and activating the platform profile.'
                  : 'Verifying credential tokens and preparing secure billing services.'}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ActivateMerchantPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-20 bg-white dark:bg-slate-950 min-h-screen flex items-center text-slate-900 dark:text-white transition-colors duration-300">
        <Suspense fallback={
          <div className="site-container text-center py-24 text-slate-400">Loading activation session...</div>
        }>
          <ActivateContent />
        </Suspense>
      </main>
      <Footer />
    </PublicLayout>
  );
}
