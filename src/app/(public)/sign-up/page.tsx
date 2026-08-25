// src/app/(public)/sign-up/page.tsx
'use client';

import React from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import RegisterFormWrapper from '@/features/Register/components/RegisterWrapper';

export default function SignUpPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/hero_multi_location_hq.jpg"
      coverAlt="Quantix Enterprise Multi-Unit POS"
      coverHeadline="Scale enterprise operations with zero friction."
      coverSubtext="Deploy multi-unit franchises, master SKU catalogs, and real-time ERP cloud data lakes in minutes."
    >
      <RegisterFormWrapper />
    </SplitAuthLayout>
  );
}
