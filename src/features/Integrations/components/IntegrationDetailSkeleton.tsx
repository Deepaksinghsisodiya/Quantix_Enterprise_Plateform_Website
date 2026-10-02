import React from "react";

export function IntegrationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900 animate-pulse">
      {/* 1. Hero Section Skeleton */}
      <section className="bg-white page-hero-header border-b border-slate-200/80 relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-3 w-12 rounded bg-slate-200" />
            <div className="h-3 w-3 rounded bg-slate-200" />
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-3 w-3 rounded bg-slate-200" />
            <div className="h-3 w-24 rounded bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              {/* Category Pill Badge */}
              <div className="h-7 w-48 rounded-full bg-slate-200" />

              {/* Main Heading */}
              <div className="h-10 sm:h-12 md:h-14 w-4/5 rounded-xl bg-slate-200" />

              {/* Tagline */}
              <div className="h-5 w-full rounded bg-slate-200/80" />

              {/* Description */}
              <div className="space-y-2 pt-1">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-5/6 rounded bg-slate-100" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <div className="h-12 w-48 rounded-xl bg-slate-200" />
                <div className="h-12 w-44 rounded-xl bg-slate-100" />
              </div>

              {/* 4 Trust Metrics Bar */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1.5"
                  >
                    <div className="h-5 w-14 mx-auto rounded bg-slate-200" />
                    <div className="h-3 w-16 mx-auto rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Hardware Bundle Placeholder */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="aspect-4/3 w-full max-w-md rounded-3xl bg-slate-100 border border-slate-200/80 flex items-center justify-center p-8">
                <div className="h-32 w-32 rounded-2xl bg-slate-200/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid Skeleton */}
      <section className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-200/80">
        <div className="site-container px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="h-3 w-32 mx-auto rounded bg-slate-200" />
            <div className="h-8 w-64 mx-auto rounded bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
                  <div className="h-4 w-36 rounded bg-slate-200" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-3 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default IntegrationDetailSkeleton;
