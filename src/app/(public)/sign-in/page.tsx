// src/app/(public)/sign-in/page.tsx
'use client';

import React, { Suspense } from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import LoginFormWrapper from '@/features/Login/components/LoginWrapper';

export default function SignInPage() {
  return (
    <SplitAuthLayout>
      <Suspense fallback={<div className="text-center py-12 text-slate-400 text-xs">Loading sign-in...</div>}>
        <LoginFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
