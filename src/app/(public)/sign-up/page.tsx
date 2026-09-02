// src/app/(public)/sign-up/page.tsx
'use client';

import React, { Suspense } from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { SignUpFormWrapper } from '@/features/Register';

export default function SignUpPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/quantix_auth_pos_terminal.jpg"
      coverAlt="Quantix Cloud POS Terminal Hardware Setup"
      coverHeadline="Start your journey"
      coverSubtext="Deploy multi-unit franchises, master SKU catalogs, and real-time cloud POS data lakes across your entire retail and restaurant network."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 font-sans text-xs">Loading registration...</div>}>
        <SignUpFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
