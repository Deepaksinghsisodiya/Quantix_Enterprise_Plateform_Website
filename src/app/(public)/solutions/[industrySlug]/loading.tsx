import React from 'react';

/**
 * Next.js App Router loading.tsx — shown while [industrySlug]/page.tsx
 * is fetching its data server-side (including the API call).
 * Mirrors the exact layout of the detail hero + workflows + CTA page.
 */
export default function SolutionDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* ─── Hero Section Skeleton ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left: Text Content */}
            <div className="space-y-5 lg:col-span-7">
              {/* Eyebrow badge */}
              <div className="h-7 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />

              {/* Title */}
              <div className="space-y-2.5">
                <div className="h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-10 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Description */}
              <div className="space-y-2 pt-1">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Key Points */}
              <div className="grid gap-2.5 pt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/70">
                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <div className="h-11 sm:h-12 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-11 sm:h-12 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Workflows Section Skeleton ────────────────────────────────── */}
      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <div className="h-3 w-36 rounded bg-slate-200 dark:bg-slate-800 mx-auto" />
            <div className="h-8 w-72 rounded-lg bg-slate-200 dark:bg-slate-800 mx-auto" />
            <div className="h-4 w-96 rounded bg-slate-200 dark:bg-slate-800 mx-auto" />
          </div>

          {/* 3 Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── FAQ Skeleton ───────────────────────────────────────────────── */}
      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40">
        <div className="site-container px-4 sm:px-6 max-w-3xl mx-auto space-y-4">
          <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800 mx-auto mb-8" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
