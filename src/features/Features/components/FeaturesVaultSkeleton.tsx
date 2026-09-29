import React from 'react';
import { ATMSkeleton } from '@/components/atoms/ATMSkeleton';

export const FeaturesVaultSkeleton: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-14 text-slate-900 dark:text-white">
      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-10">
        {/* Header Skeleton */}
        <div className="mx-auto max-w-3xl text-center space-y-3">
          <div className="flex justify-center">
            <ATMSkeleton variant="badge" width="220px" height="24px" className="rounded-full" />
          </div>
          <div className="flex justify-center">
            <ATMSkeleton variant="text" width="70%" height="40px" />
          </div>
          <div className="flex justify-center">
            <ATMSkeleton variant="text" width="60%" height="20px" />
          </div>
        </div>

        {/* Vault Tabs Skeleton */}
        <div className="flex items-center justify-center gap-2 overflow-hidden py-2">
          {[1, 2, 3, 4].map((i) => (
            <ATMSkeleton key={i} variant="badge" width="160px" height="38px" className="rounded-xl" />
          ))}
        </div>

        {/* Big Vault Card Stage Skeleton */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <ATMSkeleton variant="badge" width="120px" height="24px" className="rounded-md" />
              <ATMSkeleton variant="text" width="85%" height="36px" />
              <ATMSkeleton variant="text" count={3} />
              <div className="pt-4 flex gap-3">
                <ATMSkeleton variant="badge" width="180px" height="42px" className="rounded-xl" />
                <ATMSkeleton variant="badge" width="140px" height="42px" className="rounded-xl" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <ATMSkeleton variant="rounded" height="320px" className="rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesVaultSkeleton;
