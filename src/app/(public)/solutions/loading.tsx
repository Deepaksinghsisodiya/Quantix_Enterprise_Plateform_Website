import React from 'react';
import { SolutionsOverviewSkeleton } from '@/features/Solutions/components/SolutionsOverviewSkeleton';

/**
 * Next.js App Router loading boundary for Enterprise /solutions.
 * Displays the complete hero + filter tabs + 3 alternating solution section skeletons.
 */
export default function SolutionsLoading() {
  return (
    <div className="w-full overflow-x-hidden animate-pulse">
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden py-16">
        <div className="site-container text-center max-w-4xl mx-auto px-4 space-y-4">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
          <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
        </div>
      </section>
      <SolutionsOverviewSkeleton />
    </div>
  );
}
