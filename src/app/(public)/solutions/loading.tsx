import React from 'react';
import { SolutionsOverviewSkeleton } from '@/features/Solutions/components/SolutionsOverviewSkeleton';

/**
 * Next.js App Router loading boundary for Enterprise /solutions.
 * Displays the complete hero + filter tabs + 3 alternating solution section skeletons.
 */
export default function SolutionsLoading() {
  return (
    <div className="w-full overflow-x-hidden animate-pulse">
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />
        <div className="site-container relative z-10 px-4 sm:px-6 text-left space-y-4">
          <div className="h-6 w-48 bg-primary/10 border border-primary/20 rounded-full" />
          <div className="h-10 sm:h-12 w-3/4 max-w-2xl bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 w-2/3 max-w-xl bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="pt-2 flex items-center justify-start gap-2 overflow-x-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-9 w-32 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            ))}
          </div>
        </div>
      </section>
      <SolutionsOverviewSkeleton showFilterSkeleton={false} />
    </div>
  );
}
