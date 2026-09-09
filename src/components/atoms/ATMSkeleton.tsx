import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ATMSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text' | 'badge';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

/**
 * ATMSkeleton – Reusable, theme-aware skeleton atom with smooth pulse animation.
 */
export const ATMSkeleton: React.FC<ATMSkeletonProps> = ({
  variant = 'rounded',
  width,
  height,
  animate = true,
  className,
  style,
  ...props
}) => {
  const variantStyles = {
    rectangular: 'rounded-none',
    circular: 'rounded-full aspect-square',
    rounded: 'rounded-md',
    text: 'rounded h-3 w-full',
    badge: 'rounded-md px-1.5 py-0.5 text-[9.5px]',
  }[variant];

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        'bg-slate-200/90 dark:bg-slate-700/80',
        animate && 'animate-pulse',
        variantStyles,
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
};

/**
 * TopPromoBannerSkeleton – 1:1 Content-matching skeleton for the top announcement banner.
 */
export const TopPromoBannerSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1.5 sm:gap-2 animate-pulse select-none',
        className
      )}
    >
      <ATMSkeleton className="h-3 w-48 min-[400px]:w-64 min-[520px]:w-80 rounded bg-slate-300/80 dark:bg-slate-700/80 shrink-0" />
      <span className="text-slate-300 dark:text-slate-700 mx-0.5 sm:mx-1 font-bold">|</span>
      <div className="inline-flex items-center gap-1 shrink-0">
        <ATMSkeleton className="h-3 w-16 sm:w-20 rounded bg-primary/30" />
        <ChevronRight size={12} className="stroke-3 text-primary/40" />
      </div>
    </div>
  );
};

/**
 * HeroNewsTickerSkeleton – 1:1 Content-matching skeleton for Hero Section announcement marquee.
 */
export const HeroNewsTickerSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'min-w-0 flex-1 flex items-center gap-4 ml-2 animate-pulse overflow-hidden select-none',
        className
      )}
    >
      {/* Item 1: Update */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600/50 dark:bg-orange-500/20 dark:text-orange-400/50 border border-orange-500/20">
          Update
        </span>
        <ATMSkeleton className="h-3 w-32 sm:w-44 rounded bg-slate-300 dark:bg-slate-700" />
        <span className="text-slate-400 dark:text-slate-600 text-xs hidden sm:inline">—</span>
        <ATMSkeleton className="h-2.5 w-44 sm:w-64 rounded bg-slate-200 dark:bg-slate-800 hidden sm:inline-block" />
      </div>

      <span className="text-slate-300 dark:text-slate-600 font-bold shrink-0">•</span>

      {/* Item 2: Event */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600/50 dark:bg-purple-500/20 dark:text-purple-400/50 border border-purple-500/20">
          Event
        </span>
        <ATMSkeleton className="h-3 w-28 sm:w-36 rounded bg-slate-300 dark:bg-slate-700" />
        <span className="text-slate-400 dark:text-slate-600 text-xs hidden md:inline">—</span>
        <ATMSkeleton className="h-2.5 w-36 sm:w-52 rounded bg-slate-200 dark:bg-slate-800 hidden md:inline-block" />
      </div>

      <span className="text-slate-300 dark:text-slate-600 font-bold shrink-0 hidden md:inline">•</span>

      {/* Item 3: Offer */}
      <div className="hidden lg:inline-flex items-center gap-1.5 shrink-0">
        <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600/50 dark:bg-emerald-500/20 dark:text-emerald-400/50 border border-emerald-500/20">
          Offer
        </span>
        <ATMSkeleton className="h-3 w-32 rounded bg-slate-300 dark:bg-slate-700" />
        <span className="text-slate-400 dark:text-slate-600 text-xs">—</span>
        <ATMSkeleton className="h-2.5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

/**
 * HeroSlideSkeleton – 1:1 Content-matching skeleton for the Hero Section.
 */
export const HeroSlideSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-24 pb-16 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-28 sm:pb-20 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28",
        className
      )}
    >
      <div className="site-container relative z-10 grid grid-cols-1 content-center items-center gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
        {/* LEFT COLUMN: Content Skeleton */}
        <div className="flex min-w-0 flex-col items-start space-y-3.5 text-left sm:items-center sm:text-center lg:col-span-6 lg:items-start lg:text-left">
          {/* Star pill */}
          <ATMSkeleton className="h-6 w-64 sm:w-80 rounded-full bg-primary/10" />

          {/* Badge & indicator line */}
          <div className="flex flex-col gap-1.5 pt-0.5 sm:items-center lg:items-start">
            <ATMSkeleton className="h-4 w-44 rounded bg-primary/20" />
            <div className="h-1 w-12 bg-primary/30 rounded-full" />
          </div>

          {/* Heading */}
          <div className="w-full space-y-2.5 max-w-152">
            <ATMSkeleton className="h-8 sm:h-10 w-11/12 rounded-lg bg-slate-300/90 dark:bg-slate-700/90" />
            <ATMSkeleton className="h-8 sm:h-10 w-3/4 rounded-lg bg-slate-300/90 dark:bg-slate-700/90" />
          </div>

          {/* Subheading */}
          <div className="w-full space-y-2 max-w-136 pt-1">
            <ATMSkeleton className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <ATMSkeleton className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Feature highlights row */}
          <div className="grid w-full grid-cols-2 gap-2 pt-1 min-[480px]:grid-cols-3 lg:grid-cols-3 lg:gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white/95 px-2.5 py-2 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <ATMSkeleton className="h-7 w-7 rounded-full bg-primary/10 shrink-0" />
                <ATMSkeleton className="h-3 w-16 sm:w-20 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>

          {/* Buttons row */}
          <div className="flex w-full flex-row items-center justify-start gap-2.5 pt-1 sm:w-auto sm:justify-center lg:justify-start">
            <ATMSkeleton className="h-11 w-36 sm:w-44 rounded-xl bg-primary/30" />
            <ATMSkeleton className="h-11 w-36 sm:w-44 rounded-xl bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* News Ticker Bar */}
          <div className="w-full mt-4 h-10.5 rounded-xl border border-slate-200/80 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/80 p-1.5 flex items-center">
            <HeroNewsTickerSkeleton />
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Showcase Skeleton */}
        <div className="relative flex w-full flex-col items-center justify-center lg:col-span-6 my-auto">
          <div className="relative w-full max-w-120 aspect-4/3 rounded-xl lg:rounded-3xl bg-[#111] p-[0.3rem] lg:p-[0.55rem] shadow-xl border border-slate-800">
            <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-slate-800/80 flex items-center justify-center">
              <ATMSkeleton className="h-12 w-12 rounded-full bg-slate-700/60" />
            </div>
          </div>
          {/* Pagination dots skeleton */}
          <div className="mt-4 lg:mt-5 flex items-center justify-center gap-2">
            <ATMSkeleton className="h-1.5 w-7 rounded-full bg-primary/40" />
            <ATMSkeleton className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <ATMSkeleton className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ATMSkeleton;
