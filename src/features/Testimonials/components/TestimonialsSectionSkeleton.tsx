// src/features/Testimonials/components/TestimonialsSectionSkeleton.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSectionSkeleton: React.FC = () => {
  return (
    <section 
      id="testimonials" 
      className="scroll-mt-28 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
      aria-label="Client Testimonials Loading"
    >
      <div className="w-full py-12 lg:py-14 overflow-hidden">
        <div className="site-container px-3 sm:px-6">
          {/* Header Skeleton with Animated Bars */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12 flex flex-col items-center">
            {/* Badge Skeleton */}
            <div className="h-6 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

            {/* Title Skeleton */}
            <div className="h-8 sm:h-10 w-3/4 max-w-md rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse mb-2.5" />

            {/* Subtitle Skeleton */}
            <div className="h-4 w-5/6 max-w-lg rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Testimonial Card Skeleton */}
          <div className="relative mx-auto max-w-4xl select-none">
            {/* Desktop Left Button Placeholder */}
            <div className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 text-slate-300 pointer-events-none">
              <ChevronLeft size={18} />
            </div>

            {/* Desktop Right Button Placeholder */}
            <div className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 text-slate-300 pointer-events-none">
              <ChevronRight size={18} />
            </div>

            {/* Card Content Skeleton */}
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-black/30 relative animate-pulse">
              {/* Top Row: Avatar + Name/Role + Rating Stars */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 sm:w-40 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-24 sm:w-28 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-20 sm:w-24 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="flex items-center gap-1 self-start sm:self-auto">
                  <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Quote Body Lines */}
              <div className="py-4 sm:py-6 space-y-2.5">
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Bottom Footer: Metric Badge + Dots */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="flex gap-1.5">
                  <div className="h-2 w-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionSkeleton;
