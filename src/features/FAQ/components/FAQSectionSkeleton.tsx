// src/features/FAQ/components/FAQSectionSkeleton.tsx
import React from 'react';
import FAQSkeleton from './FAQSkeleton';

export const FAQSectionSkeleton: React.FC = () => {
  return (
    <section
      className="py-12 lg:py-14 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden"
      id="faq"
      aria-label="Frequently Asked Questions Loading"
    >
      <div className="site-container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header Skeleton Bars */}
          <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
            {/* Badge Skeleton */}
            <div className="h-5 w-44 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

            {/* Title Skeleton */}
            <div className="h-8 sm:h-9 w-64 sm:w-80 max-w-md rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse mb-2.5" />

            {/* Subtitle Skeleton */}
            <div className="h-4 w-72 sm:w-96 max-w-lg rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* 6 matching FAQ accordion skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-start">
            {Array.from({ length: 6 }).map((_, i) => (
              <FAQSkeleton key={`faq-skel-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionSkeleton;
