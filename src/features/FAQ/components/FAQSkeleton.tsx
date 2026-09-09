// src/features/FAQ/components/FAQSkeleton.tsx
import React from 'react';
import { ATMSkeleton } from '@/components/atoms';

export const FAQSkeleton: React.FC = () => (
  <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 shadow-xs flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 w-full">
      <ATMSkeleton variant="rounded" className="h-6 w-6 shrink-0" />
      <div className="space-y-2 w-full">
        <ATMSkeleton variant="text" className="h-3.5 w-4/5" />
        <ATMSkeleton variant="text" className="h-2.5 w-2/5" />
      </div>
    </div>
    <ATMSkeleton variant="circular" className="h-7 w-7 shrink-0" />
  </div>
);

export default FAQSkeleton;
