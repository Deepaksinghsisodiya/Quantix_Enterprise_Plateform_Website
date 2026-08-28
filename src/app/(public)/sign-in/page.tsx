// src/app/(public)/sign-in/page.tsx
'use client';

import React from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import LoginFormWrapper from '@/features/Login/components/LoginWrapper';

export default function SignInPage() {
  return (
    <SplitAuthLayout
      coverImage="/images/enterprise_auth_cover_modern_hq.jpg"
      coverAlt="Quantix Enterprise Global Operations POS"
      coverHeadline="Enterprise command at your fingertips."
      coverSubtext="Access global telemetry, branch registers, and ERP integration feeds from anywhere."
    >
      <LoginFormWrapper />
    </SplitAuthLayout>
  );
}
