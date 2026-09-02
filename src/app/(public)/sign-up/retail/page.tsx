// src/app/(public)/sign-up/retail/page.tsx
'use client';

import React, { Suspense, useEffect } from 'react';
import Cookies from 'js-cookie';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { SignUpFormWrapper } from '@/features/Register';

export default function RetailSignUpPage() {
  useEffect(() => {
    Cookies.set('authSource', 'retail', { expires: 1 });
  }, []);

  return (
    <SplitAuthLayout
      coverImage="/images/retail_fashion_boutique.jpg"
      coverAlt="Quantix Retail Store POS"
      coverHeadline="Smart Retail & Multi-store POS."
      coverSubtext="Scale multi-outlet retail stores with lightning-fast barcode scanning, live inventory reconciliation, and customer checkout."
    >
      <Suspense fallback={<div className="text-center py-12 text-slate-400 font-sans text-xs">Loading registration...</div>}>
        <SignUpFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
