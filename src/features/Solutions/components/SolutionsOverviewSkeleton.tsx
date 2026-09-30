import React from 'react';

export const SolutionsOverviewSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-12 sm:space-y-16 animate-pulse py-8">
      {/* Filter Tabs Skeleton */}
      <div className="flex justify-center gap-2 max-w-2xl mx-auto px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>

      {/* 3 Showcase Solutions Cards Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />

              {/* Sub-features list */}
              <div className="space-y-3 pt-3">
                {Array.from({ length: 3 }).map((_, fIdx) => (
                  <div key={fIdx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <div className="h-11 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            <div className={`lg:col-span-5 h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 ${idx % 2 === 1 ? 'lg:order-1' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsOverviewSkeleton;
