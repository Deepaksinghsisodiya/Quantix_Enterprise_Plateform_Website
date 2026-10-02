// src/features/SocialProof/components/SocialProofSkeleton.tsx
'use client';

import React from 'react';
import { ATMSkeleton } from '@/components/atoms';
import { getRibbonLayout, getRibbonSeparator, MAX_RIBBON_CARDS } from '../utils/ribbonLayout';

export const SocialProofSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  // The placeholder always reserves the full four column grid: the skeleton is only ever
  // shown before the first response arrives, so the real count is not known yet.
  const layout = getRibbonLayout(MAX_RIBBON_CARDS);

  return (
    <div
      role="status"
      aria-label="Loading metrics"
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-2xl overflow-hidden ${className}`}
    >
      <div className={`relative z-10 grid ${layout.gridClass}`}>
        {Array.from({ length: MAX_RIBBON_CARDS }).map((_, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col items-center justify-center text-center p-3.5 sm:p-5 md:p-6 ${getRibbonSeparator(
              idx,
              MAX_RIBBON_CARDS,
              layout.baseCols,
              ''
            )} ${getRibbonSeparator(idx, MAX_RIBBON_CARDS, layout.wideCols, layout.wideBp)}`}
          >
            <ATMSkeleton variant="circular" width={40} height={40} className="mb-2 sm:mb-2.5" />
            <ATMSkeleton variant="rounded" width={80} height={28} className="sm:w-24 sm:h-8" />
            <ATMSkeleton variant="text" width={72} height={12} className="mt-1" />
            <ATMSkeleton variant="text" width={96} height={10} className="mt-0.5 hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialProofSkeleton;
