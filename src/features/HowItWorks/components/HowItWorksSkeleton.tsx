import React from "react";

export const HowItWorksSkeleton: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 lg:py-14 text-slate-900 transition-colors dark:text-white animate-pulse">
      {/* Background Depth Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(255,79,0,0.04),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* ============================================================ */}
        {/* HEADER SKELETON                                              */}
        {/* ============================================================ */}
        <div className="mx-auto max-w-3xl text-center space-y-3 sm:space-y-4">
          {/* Tag Pill */}
          <div className="h-6 w-36 mx-auto rounded-full bg-orange-500/15" />

          {/* Heading */}
          <div className="space-y-2">
            <div className="h-9 sm:h-12 w-4/5 max-w-lg mx-auto rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 sm:h-9 w-2/3 max-w-md mx-auto rounded-xl bg-slate-200/70 dark:bg-slate-800/60" />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5 max-w-xl mx-auto pt-1">
            <div className="h-3.5 w-full rounded bg-slate-200/60 dark:bg-slate-800/50" />
            <div className="h-3.5 w-4/5 mx-auto rounded bg-slate-200/60 dark:bg-slate-800/50" />
          </div>

          {/* Reassurance pill */}
          <div className="pt-1 flex justify-center">
            <div className="h-7 w-72 sm:w-96 rounded-full bg-emerald-500/15" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP (>= lg): 3 Connected Cards Skeleton                  */}
        {/* ============================================================ */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8 relative z-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 xl:p-7 flex flex-col justify-between shadow-sm space-y-5"
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-800" />

              {/* Station Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-20 rounded bg-orange-500/20" />
                    <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="h-6 w-20 rounded-full bg-orange-500/15" />
              </div>

              {/* Title & Description */}
              <div className="space-y-2 pt-1">
                <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-3.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/60" />
                <div className="h-3.5 w-4/5 rounded bg-slate-200/70 dark:bg-slate-800/60" />
              </div>

              {/* Image Container Area */}
              <div className="h-36 xl:h-40 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center">
                <div className="h-12 w-12 rounded-xl bg-slate-200/60 dark:bg-slate-700/50" />
              </div>

              {/* Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-orange-500/20 shrink-0" />
                  <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-orange-500/20 shrink-0" />
                  <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-orange-500/20 shrink-0" />
                  <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Telemetry Chips */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div className="h-6 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
                <div className="h-6 w-28 rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* MOBILE (< lg): Stacked Cards Skeleton                       */}
        {/* ============================================================ */}
        <div className="lg:hidden space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-5 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-5 w-16 rounded-full bg-orange-500/15" />
              </div>
              <div className="h-36 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-full rounded bg-slate-200/70 dark:bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSkeleton;
