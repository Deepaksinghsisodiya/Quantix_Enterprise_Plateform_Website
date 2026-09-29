"use client";

import React from "react";

export const BusinessProblemsSkeleton: React.FC = () => {
  return (
    <section
      aria-label="Loading business problems..."
      className="relative overflow-hidden py-12 lg:py-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,79,0,0.05),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
        {/* Section Header Skeleton */}
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <div className="h-6 w-52 sm:w-60 rounded-full bg-[#FF4F00]/15 border border-[#FF4F00]/25" />
          <div className="mt-4 h-8 sm:h-10 md:h-12 w-4/5 max-w-lg rounded-xl bg-slate-200/80 dark:bg-slate-800/80" />
          <div className="mt-2.5 h-4 w-full max-w-md rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
        </div>

        {/* Mobile Skeleton: Tabs + 1 Card */}
        <div className="md:hidden mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 h-10 border border-slate-200/60 dark:border-slate-700/60" />
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/95 p-4 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-9 w-9 rounded-xl bg-orange-500/15" />
              <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
            <div className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
          </div>
          <div className="flex justify-between items-center px-1 pt-1">
            <div className="h-7 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex gap-1">
              <div className="h-1.5 w-5 rounded-full bg-[#FF4F00]/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="h-7 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Desktop Skeleton: 3-column Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12 lg:mt-14">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/95 p-5 sm:p-6 shadow-sm space-y-4"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-orange-400 to-[#FF4F00] opacity-40" />
              <div className="flex items-center justify-between gap-2">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-orange-500/15" />
                <div className="h-5 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800" />
              <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessProblemsSkeleton;
