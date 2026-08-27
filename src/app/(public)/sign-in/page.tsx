// src/app/(public)/sign-in/page.tsx
'use client';

import React from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import LoginFormWrapper from '@/features/Login/components/LoginWrapper';

export default function SignInPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/retail_pos_analytics_bi.jpg"
      coverAlt="Quantix Enterprise POS"
      coverHeadline="Enterprise command at your fingertips."
      coverSubtext="Access global telemetry, branch registers, and ERP integration feeds from anywhere."
    >
      <LoginFormWrapper />
    </SplitAuthLayout>
  );
}
