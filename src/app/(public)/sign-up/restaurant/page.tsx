// src/app/(public)/sign-up/restaurant/page.tsx
'use client';

import React, { Suspense, useEffect } from 'react';
import { setSecureCookie } from '@/lib/cookieUtils';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { SignUpFormWrapper } from '@/features/Register';

export default function RestaurantSignUpPage() {
  useEffect(() => {
    setSecureCookie('authSource', 'restaurant', 1);
  }, []);

  return (
    <SplitAuthLayout
      coverImage="/images/quantix_auth_pos_terminal.jpg"
      coverAlt="Quantix Restaurant Dining POS"
      coverHeadline="Next-gen Dining & Kitchen Operations."
      coverSubtext="Manage tables, kitchen displays (KDS), online aggregator feeds, and multi-station restaurant POS with real-time sync."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 font-sans text-xs">Loading registration...</div>}>
        <SignUpFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
