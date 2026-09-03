// src/app/(public)/sign-up/status/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Clock, Mail, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Cookies from 'js-cookie';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';

function StatusContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get('id') || searchParams.get('merchantId') || '';
  const queryEmail = searchParams.get('email') || '';

  const [merchantId, setMerchantId] = useState<string>(rawId);
  const [adminEmail, setAdminEmail] = useState<string>(queryEmail);

  useEffect(() => {
    if (!merchantId) {
      const cookieId = Cookies.get('pendingMerchantId');
      if (cookieId) setMerchantId(cookieId);
    }
    if (!adminEmail) {
      const cookieEmail = Cookies.get('pendingAdminEmail');
      if (cookieEmail) setAdminEmail(cookieEmail);
    }
  }, [merchantId, adminEmail]);

  return (
    <div className="w-full">
      {/* Success Badge */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-700 mb-3">
          <CheckCircle2 size={13} className="text-emerald-600" />
          <span>Application Submitted</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 leading-tight tracking-tight">
          Registration received!
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
          Your merchant application has been successfully logged. Our onboarding team is reviewing your profile.
        </p>
      </div>

      {/* Details Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 space-y-3.5 mb-6 text-left">
        {merchantId && (
          <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/60">
            <span className="text-slate-400 font-medium">Merchant Reference:</span>
            <span className="font-mono font-bold text-slate-800 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
              {merchantId.slice(0, 8)}...{merchantId.slice(-4)}
            </span>
          </div>
        )}
        {adminEmail && (
          <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200/60">
            <span className="text-slate-400 font-medium">Notification Email:</span>
            <span className="font-semibold text-slate-800 text-xs">{adminEmail}</span>
          </div>
        )}

        {/* Steps info */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-syne">
            Next Onboarding Steps
          </h4>
          <div className="space-y-2">
            {[
              { icon: Mail, title: 'Email Confirmation', desc: 'Check inbox for verification & account receipt.' },
              { icon: Clock, title: 'Compliance Review', desc: 'Account verified within 24 to 48 business hours.' },
              { icon: ShieldCheck, title: 'Dashboard Live', desc: 'Login credentials active once approved by admin.' }
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-orange-100/60 border border-orange-200 flex items-center justify-center text-[#FF4D00] shrink-0 mt-0.5">
                  <Icon size={11} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block leading-tight">{title}</span>
                  <span className="text-[11px] text-slate-500 block leading-tight">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/sign-in"
          className="w-full rounded-xl bg-linear-to-r from-[#FF4D00] via-[#FF621F] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C83400] text-white py-3.5 px-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Proceed to Sign In</span>
          <ArrowRight size={14} />
        </Link>

        <Link
          href="/"
          className="w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
        >
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default function RegistrationStatusPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/quantix_auth_pos_terminal.jpg"
      coverAlt="Quantix Registration Successful"
      coverHeadline="Welcome to Quantix Cloud"
      coverSubtext="Your merchant platform infrastructure is being prepared. Connect physical POS terminals, inventory streams, and centralized reporting."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Loading status...</div>}>
        <StatusContent />
      </Suspense>
    </SplitAuthLayout>
  );
}
