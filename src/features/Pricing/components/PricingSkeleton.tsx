// src/features/Pricing/components/PricingSkeleton.tsx
'use client';

import React from 'react';

/**
 * Skeleton placeholder for the upper Hero section (Breadcrumb, Badge, Heading, Subtitle, Billing Toggle, Stats Strip)
 */
export const PricingHeroSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse" aria-hidden="true">
      {/* Breadcrumb skeleton */}
      <div className="mb-4 sm:mb-5 flex items-center gap-2">
        <div className="h-3.5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3.5 w-28 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Pill Badge skeleton */}
      <div className="h-7 w-48 rounded-md bg-slate-200 dark:bg-slate-800 mb-5 sm:mb-6" />

      {/* Heading & Billing Switcher Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4">
        <div className="space-y-3 w-full max-w-3xl">
          {/* Main Title lines */}
          <div className="h-9 sm:h-12 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 sm:h-12 w-3/5 rounded-xl bg-slate-200 dark:bg-slate-800" />
          {/* Subtitle lines */}
          <div className="h-4 w-full max-w-xl rounded bg-slate-100 dark:bg-slate-800 pt-1" />
          <div className="h-4 w-3/4 max-w-lg rounded bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* Billing Switcher skeleton */}
        <div className="shrink-0 mb-2">
          <div className="h-11 w-64 rounded-full bg-slate-200 dark:bg-slate-800/90" />
        </div>
      </div>

      {/* Trust Stats Strip (4 columns) */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-100 dark:border-slate-800/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex flex-col px-4 sm:px-6 py-4 sm:py-0 ${
                i !== 0 ? 'sm:border-l sm:border-slate-100 dark:sm:border-slate-800/80' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-1 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 hidden sm:block mt-1" />
                <div className="w-full space-y-1.5">
                  <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3.5 w-32 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-40 rounded bg-slate-100 dark:bg-slate-850 hidden sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton placeholder for the category tabs and filters directly above the cards
 */
export const PricingFilterSkeleton: React.FC<{ hasFlavour?: boolean }> = ({ hasFlavour = false }) => {
  return (
    <div className="w-full animate-pulse mb-8" aria-hidden="true">
      {/* Quick Match Bar */}
      <div className="flex justify-center mb-5 sm:mb-6">
        <div className="h-8 w-full max-w-md rounded-xl bg-slate-200 dark:bg-slate-800/80" />
      </div>

      {/* Main Category Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="h-12 sm:h-14 w-full max-w-xl rounded-xl sm:rounded-2xl bg-slate-200 dark:bg-slate-800/90" />
      </div>

      {/* Optional Industry Flavour Filter (Enterprise) */}
      {hasFlavour && (
        <div className="flex justify-center mb-6">
          <div className="h-9 w-full max-w-lg rounded-xl bg-slate-200 dark:bg-slate-800/70" />
        </div>
      )}

      {/* Summary Explanation Text */}
      <div className="flex justify-center">
        <div className="h-4 w-full max-w-md rounded bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
};

/**
 * Skeleton placeholder for the 3 billing cards
 */
export const PricingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch w-full mx-auto animate-pulse" aria-hidden="true">
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
