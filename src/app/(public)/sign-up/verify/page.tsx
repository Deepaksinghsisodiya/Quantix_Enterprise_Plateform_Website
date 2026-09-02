// src/app/(public)/sign-up/verify/page.tsx
'use client';

import React, { Suspense } from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { VerifyOtpWrapper } from '@/features/Register';

export default function VerifyEmailPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/quantix_auth_pos_terminal.jpg"
      coverAlt="Quantix Security Verification"
      coverHeadline="Verify your identity"
      coverSubtext="Secure OTP authentication ensures your multi-location POS data and franchise master settings remain protected."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Loading verification...</div>}>
        <VerifyOtpWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
