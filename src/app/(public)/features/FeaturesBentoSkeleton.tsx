import React from 'react';
import { ATMSkeleton } from '@/components/atoms/ATMSkeleton';

export const FeaturesBentoSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-8 animate-fade-in pb-16">
      {/* 1. HERO SKELETON */}
      <section className="relative overflow-hidden py-12 lg:py-16 border-b border-slate-200/80 dark:border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto px-4 space-y-4">
          <div className="flex justify-center">
            <ATMSkeleton variant="badge" width="200px" height="26px" className="rounded-full" />
          </div>
          <div className="flex justify-center">
            <ATMSkeleton variant="text" width="80%" height="44px" />
          </div>
          <div className="flex justify-center">
            <ATMSkeleton variant="text" width="65%" height="22px" />
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <ATMSkeleton variant="badge" width="180px" height="28px" className="rounded-full" />
            <ATMSkeleton variant="badge" width="160px" height="28px" className="rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. DOCK SKELETON (Tabs + Search) */}
      <div className="site-container px-3 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <ATMSkeleton key={i} variant="badge" width="120px" height="34px" className="rounded-full shrink-0" />
            ))}
          </div>
          <ATMSkeleton variant="rounded" width="220px" height="34px" className="rounded-full shrink-0" />
        </div>
      </div>

      {/* 3. BENTO GRID SKELETON */}
      <div className="site-container px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Flagship 2-Col Card Skeleton */}
          <div className="col-span-1 md:col-span-2 rounded-3xl border border-slate-200/85 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <ATMSkeleton variant="badge" width="140px" height="24px" className="rounded-full" />
                <ATMSkeleton variant="text" width="85%" height="32px" />
                <ATMSkeleton variant="text" count={2} />
                <div className="pt-2 flex gap-2">
                  <ATMSkeleton variant="badge" width="100px" height="22px" className="rounded-md" />
                  <ATMSkeleton variant="badge" width="110px" height="22px" className="rounded-md" />
                </div>
              </div>
              <div className="lg:col-span-5">
                <ATMSkeleton variant="rounded" height="180px" className="rounded-2xl w-full" />
              </div>
            </div>
          </div>

          {/* Standard 1-Col Card Skeleton */}
          <div className="col-span-1 rounded-3xl border border-slate-200/85 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex justify-between items-center">
              <ATMSkeleton variant="badge" width="36px" height="36px" className="rounded-xl" />
              <ATMSkeleton variant="badge" width="100px" height="22px" className="rounded-full" />
            </div>
            <ATMSkeleton variant="rounded" height="120px" className="rounded-xl w-full" />
            <ATMSkeleton variant="text" width="90%" height="24px" />
            <ATMSkeleton variant="text" count={2} />
          </div>

          {/* Another Standard 1-Col Card Skeleton */}
          <div className="col-span-1 rounded-3xl border border-slate-200/85 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex justify-between items-center">
              <ATMSkeleton variant="badge" width="36px" height="36px" className="rounded-xl" />
              <ATMSkeleton variant="badge" width="100px" height="22px" className="rounded-full" />
            </div>
            <ATMSkeleton variant="rounded" height="120px" className="rounded-xl w-full" />
            <ATMSkeleton variant="text" width="90%" height="24px" />
            <ATMSkeleton variant="text" count={2} />
          </div>

          {/* Flagship 2-Col Card Skeleton */}
          <div className="col-span-1 md:col-span-2 rounded-3xl border border-slate-200/85 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <ATMSkeleton variant="badge" width="140px" height="24px" className="rounded-full" />
                <ATMSkeleton variant="text" width="85%" height="32px" />
                <ATMSkeleton variant="text" count={2} />
              </div>
              <div className="lg:col-span-5">
                <ATMSkeleton variant="rounded" height="180px" className="rounded-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBentoSkeleton;
