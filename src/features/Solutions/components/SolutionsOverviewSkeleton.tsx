import React from 'react';

/**
 * Full-page skeleton for the Enterprise /solutions listing page.
 * Rendered as part of the `isLoading` guard in SolutionsClient.tsx.
 * Matches the actual alternating section layout: filter tabs + 3 full-width solution sections.
 */
export const SolutionsOverviewSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      {/* ─── Filter Tabs Skeleton ────────────────────────────────────── */}
      <div className="site-container flex items-center justify-center gap-2 py-6 px-4 overflow-x-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-32 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        ))}
      </div>

      {/* ─── 3 Full-Width Solution Section Skeletons ─────────────────── */}
      <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
        {Array.from({ length: 3 }).map((_, idx) => {
          const isRight = idx % 2 === 0;
          return (
            <div
              key={idx}
              className="section-py bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8"
            >
              <div className="site-container">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    !isRight ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Text Content Column */}
                  <div
                    className={`space-y-5 lg:col-span-7 ${!isRight ? 'lg:col-start-6' : ''}`}
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-10 rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-44 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <div className="h-9 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
                      <div className="h-9 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* 3 Feature rows */}
                    <div className="space-y-3 pt-2">
                      {Array.from({ length: 3 }).map((_, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-slate-900/40">
                          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
                            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="h-11 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
                      <div className="h-11 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${!isRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SolutionsOverviewSkeleton;
