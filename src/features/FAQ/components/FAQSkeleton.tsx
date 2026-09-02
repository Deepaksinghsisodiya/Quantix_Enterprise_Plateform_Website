// src/features/FAQ/components/FAQSkeleton.tsx
import React from 'react';

export const FAQSkeleton: React.FC = () => (
  <div className="p-4 sm:p-5 animate-pulse rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
    <div className="flex items-center justify-between gap-4">
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md" />
      <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
    </div>
    <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-800 rounded-md mt-3" />
  </div>
);

export default FAQSkeleton;
