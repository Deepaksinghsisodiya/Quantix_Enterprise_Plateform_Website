// src/app/(public)/sign-in/retail/page.tsx
'use client';

import React, { Suspense, useEffect } from 'react';
import { setSecureCookie } from '@/lib/cookieUtils';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import LoginFormWrapper from '@/features/Login/components/LoginWrapper';

export default function RetailSignInPage() {
  useEffect(() => {
    setSecureCookie('authSource', 'retail', 1);
  }, []);

  return (
    <SplitAuthLayout
      coverImage="/images/retail_fashion_boutique.jpg"
      coverAlt="Quantix Retail Store POS"
      coverHeadline="Smart Retail & Multi-store POS."
      coverSubtext="Scale multi-outlet retail stores with lightning-fast barcode scanning, live inventory reconciliation, and customer checkout."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Loading sign-in...</div>}>
        <LoginFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
