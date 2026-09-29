import React from 'react';
import { ATMSkeleton } from '@/components/atoms/ATMSkeleton';

export const FeatureDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-12 animate-fade-in pb-16">
      {/* 1. HERO SKELETON */}
      <section className="relative overflow-hidden py-10 lg:py-16 border-b border-slate-200/80 dark:border-slate-800">
        <div className="site-container px-3 sm:px-6 max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2">
            <ATMSkeleton variant="badge" width="80px" height="18px" />
            <span className="text-slate-300">/</span>
            <ATMSkeleton variant="badge" width="100px" height="18px" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <ATMSkeleton variant="badge" width="120px" height="26px" className="rounded-full" />
                <ATMSkeleton variant="badge" width="140px" height="26px" className="rounded-full" />
              </div>
              <ATMSkeleton variant="text" width="90%" height="46px" />
              <ATMSkeleton variant="text" width="75%" height="24px" />
              <ATMSkeleton variant="text" count={3} />
              <div className="pt-2 flex flex-wrap gap-3">
                <ATMSkeleton variant="badge" width="160px" height="44px" className="rounded-xl" />
                <ATMSkeleton variant="badge" width="140px" height="44px" className="rounded-xl" />
              </div>
            </div>

            {/* Right Software Stage Image */}
            <div className="lg:col-span-5">
              <ATMSkeleton variant="rounded" height="340px" className="rounded-3xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES GRID SKELETON */}
      <section className="site-container px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <ATMSkeleton variant="badge" width="160px" height="24px" className="rounded-full mx-auto" />
          <ATMSkeleton variant="text" width="70%" height="32px" className="mx-auto" />
          <ATMSkeleton variant="text" width="60%" height="18px" className="mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
              <ATMSkeleton variant="badge" width="36px" height="36px" className="rounded-xl" />
              <ATMSkeleton variant="text" width="80%" height="22px" />
              <ATMSkeleton variant="text" count={2} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. WORKFLOW SKELETON */}
      <section className="site-container px-3 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-6">
          <ATMSkeleton variant="text" width="40%" height="30px" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                <ATMSkeleton variant="badge" width="40px" height="20px" className="rounded-full" />
                <ATMSkeleton variant="text" width="70%" height="20px" />
                <ATMSkeleton variant="text" count={2} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureDetailSkeleton;
