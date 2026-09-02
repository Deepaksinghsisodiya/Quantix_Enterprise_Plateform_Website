// src/app/(public)/sign-up/page.tsx
'use client';

import React, { Suspense } from 'react';
import SplitAuthLayout from '@/components/organisms/SplitAuthLayout/SplitAuthLayout';
import { SignUpFormWrapper } from '@/features/Register';

export default function SignUpPage() {
  return (
    <SplitAuthLayout>
      <Suspense fallback={<div className="text-center py-12 text-slate-400 font-sans text-xs">Loading registration...</div>}>
        <SignUpFormWrapper />
      </Suspense>
    </SplitAuthLayout>
  );
}
