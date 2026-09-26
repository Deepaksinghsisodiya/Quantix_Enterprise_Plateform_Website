import React from "react";

export default function IntegrationsLoading() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Skeleton */}
      <section className="bg-white page-hero-header border-b border-slate-200/80 relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        <div className="site-container text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10 animate-pulse">
          {/* Badge Skeleton */}
          <div className="inline-flex items-center justify-center mb-3 sm:mb-3.5">
            <div className="h-6 sm:h-7 w-56 sm:w-64 rounded-full bg-slate-200" />
          </div>

          {/* Headline Skeleton */}
          <div className="space-y-2 sm:space-y-3 max-w-3xl mx-auto">
            <div className="h-7 sm:h-9 md:h-12 w-4/5 sm:w-3/4 mx-auto rounded-xl bg-slate-200" />
            <div className="h-7 sm:h-9 md:h-12 w-3/5 sm:w-1/2 mx-auto rounded-xl bg-slate-200/80" />
          </div>

          {/* Subtitle Skeleton */}
          <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 max-w-xl mx-auto">
            <div className="h-3 sm:h-3.5 w-full mx-auto rounded bg-slate-200/70" />
            <div className="h-3 sm:h-3.5 w-4/5 mx-auto rounded bg-slate-200/60" />
          </div>

          {/* 4 Trust Metrics Skeleton */}
          <div className="mt-5 sm:mt-7 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="px-2.5 py-2.5 sm:px-3 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-100/90 border border-slate-200/80 text-center space-y-1.5 shadow-2xs"
              >
                <div className="h-5 sm:h-6 w-14 sm:w-16 rounded bg-slate-200 mx-auto" />
                <div className="h-2.5 sm:h-3 w-20 sm:w-24 rounded bg-slate-200/80 mx-auto" />
                <div className="h-2 w-16 rounded bg-slate-100 mx-auto hidden sm:block" />
              </div>
            ))}
          </div>

          {/* Filter Pills Skeleton */}
          <div className="mt-6 sm:mt-8 flex justify-center w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner">
              <div className="h-7 sm:h-9 w-24 sm:w-32 rounded-xl bg-slate-200" />
              <div className="h-7 sm:h-9 w-28 sm:w-36 rounded-xl bg-slate-200/70" />
              <div className="h-7 sm:h-9 w-32 sm:w-40 rounded-xl bg-slate-200/70" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-50/40 border-b border-slate-200/60">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-200" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-28 rounded bg-slate-200" />
                        <div className="h-2.5 w-16 rounded bg-slate-100" />
                      </div>
                    </div>
                    <div className="h-6 w-24 rounded-full bg-slate-100" />
                  </div>

                  <div className="h-28 sm:h-32 md:h-36 w-full rounded-2xl bg-slate-100/80 my-1.5 flex items-center justify-center p-3">
                    <div className="h-20 w-24 rounded-lg bg-slate-200/70" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-3 w-full rounded bg-slate-200/70" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <div className="h-5 w-18 rounded-md bg-slate-100" />
                    <div className="h-5 w-20 rounded-md bg-slate-100" />
                    <div className="h-5 w-16 rounded-md bg-slate-100" />
                  </div>
                </div>

                <div className="pt-3.5 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
