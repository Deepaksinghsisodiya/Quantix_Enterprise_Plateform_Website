// src/features/Pricing/components/PricingSkeleton.tsx
'use client';

import React from 'react';

export const PricingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden backdrop-blur-xs"
        >
          {/* Top header skeleton */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-16 rounded-md bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Price skeleton */}
            <div className="h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800 mb-3" />
            
            {/* Description skeleton */}
            <div className="h-4 w-full rounded-md bg-slate-100 dark:bg-slate-800 mb-2" />
            <div className="h-4 w-4/5 rounded-md bg-slate-100 dark:bg-slate-800 mb-6" />

            {/* Capacity Pills */}
            <div className="grid grid-cols-2 gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="h-8 rounded-xl bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Feature Bullets skeleton */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3.5 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="h-3.5 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="h-11 w-full rounded-xl bg-slate-200 dark:bg-slate-800 mt-4" />
        </div>
      ))}
    </div>
  );
};

export default PricingSkeleton;
