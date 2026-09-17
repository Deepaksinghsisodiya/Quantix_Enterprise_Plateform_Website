// src/features/Pricing/components/PricingSkeleton.tsx
'use client';

import React from 'react';

export const PricingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch w-full mx-auto animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-4 sm:p-5 flex flex-col justify-between shadow-xs relative overflow-hidden backdrop-blur-xs"
        >
          {/* Top header skeleton */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-16 rounded bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Price skeleton */}
            <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 mb-1" />
            <div className="h-3 w-36 rounded bg-slate-100 dark:bg-slate-800 mb-2" />
            
            {/* Description skeleton */}
            <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800 mb-3" />

            {/* Feature Bullets skeleton */}
            <div className="space-y-1.5 mb-4 pt-2.5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="h-9 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
};

export default PricingSkeleton;
