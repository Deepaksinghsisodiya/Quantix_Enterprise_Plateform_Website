import React from 'react';
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

import { AnnouncementSkeleton } from '@/features/Announcements/components/AnnouncementSkeleton';

/**
 * TopPromoBannerSkeleton – 1:1 Content-matching skeleton for the top announcement banner.
 */
export const TopPromoBannerSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <AnnouncementSkeleton className={className} accentColor="orange" />;
};

/**
 * HeroNewsTickerSkeleton – 1:1 Content-matching skeleton for Hero Section announcement marquee.
 * Only used in layouts that actually render a news ticker inside the hero.
 */
export const HeroNewsTickerSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'min-w-0 flex-1 flex items-center gap-4 ml-2 animate-pulse overflow-hidden select-none',
        className
      )}
    >
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <ATMSkeleton className="h-3 w-32 sm:w-44 rounded bg-slate-300 dark:bg-slate-700" />
        <ATMSkeleton className="h-2.5 w-44 sm:w-64 rounded bg-slate-200 dark:bg-slate-800 hidden sm:inline-block" />
      </div>
      <div className="inline-flex items-center gap-1.5 shrink-0 hidden sm:flex">
        <ATMSkeleton className="h-3 w-28 sm:w-36 rounded bg-slate-300 dark:bg-slate-700" />
        <ATMSkeleton className="h-2.5 w-36 sm:w-52 rounded bg-slate-200 dark:bg-slate-800 hidden md:inline-block" />
      </div>
    </div>
  );
};

/**
 * HeroSlideSkeleton – Pixel-perfect 1:1 skeleton matching the HeroView layout.
 *
 * Structure mirrors HeroView exactly:
 *  - Same section padding classes (pt-24 pb-5 / sm / md / lg / xl)
 *  - Same 12-col grid with gap-6
 *  - Left col: platform pill → badge+underline → h1 (2 lines) → subheading (2 lines) → 3 feature chips → 2 CTA buttons
 *  - Right col: decorative rings (lg only) → device frame with shimmer image → dot pagination
 *
 * NO announcement / ticker section – that UI block does NOT exist in HeroView.
 */
export const HeroSlideSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section
      aria-label="Loading hero section..."
      className={cn(
        'relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-24 pb-5 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-26 sm:pb-12 md:pt-28 md:pb-14 lg:pt-28 lg:pb-14 xl:pt-30 xl:pb-14',
        className
      )}
    >
      <div className="site-container relative z-10 grid grid-cols-1 content-center items-center gap-6 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">

        {/* ─── LEFT COLUMN ─── */}
        <div className="flex min-w-0 flex-col items-start space-y-3.5 text-left sm:items-center sm:text-center lg:col-span-6 lg:items-start lg:text-left lg:min-h-[420px] lg:justify-center animate-pulse">

          {/* Platform pill (static #1 … line) */}
          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary/15 bg-primary/5 px-3 py-1.5 sm:px-4 sm:py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary/30 shrink-0" />
            <div className="h-2 w-48 sm:w-64 rounded-full bg-primary/20" />
          </div>

          {/* Badge label + accent underline */}
          <div className="flex flex-col gap-1.5 pt-0.5 sm:items-center lg:items-start">
            <ATMSkeleton animate={false} className="h-3 w-36 sm:w-44 rounded bg-primary/20" />
            <div className="h-0.5 w-10 bg-primary/25 rounded-full" />
          </div>

          {/* H1 Heading – 2 lines */}
          <div className="w-full space-y-2.5 max-w-xl">
            <ATMSkeleton animate={false} className="h-7 sm:h-9 lg:h-10 w-11/12 rounded-lg bg-slate-300/80 dark:bg-slate-700/70" />
            <ATMSkeleton animate={false} className="h-7 sm:h-9 lg:h-10 w-3/4 rounded-lg bg-slate-300/80 dark:bg-slate-700/70" />
          </div>

          {/* Subheading – 2 lines */}
          <div className="w-full space-y-2 max-w-lg pt-0.5">
            <ATMSkeleton animate={false} className="h-3.5 w-full rounded bg-slate-200/90 dark:bg-slate-800/70" />
            <ATMSkeleton animate={false} className="h-3.5 w-4/5 rounded bg-slate-200/90 dark:bg-slate-800/70" />
          </div>

          {/* Feature highlight chips – 3 chips (matches featureHighlights map) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-100 bg-white/95 px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900/60 sm:px-3 sm:py-2"
              >
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/15 shrink-0" />
                <div className="h-2.5 w-14 sm:w-20 rounded bg-slate-200/80 dark:bg-slate-700/60" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-row items-center justify-start gap-2 sm:gap-3 pt-1 sm:w-auto sm:justify-center lg:justify-start">
            <ATMSkeleton animate={false} className="h-10 sm:h-11 flex-1 sm:flex-none sm:w-40 lg:w-44 rounded-xl bg-primary/25" />
            <ATMSkeleton animate={false} className="h-10 sm:h-11 flex-1 sm:flex-none sm:w-36 lg:w-40 rounded-xl border-2 border-slate-300/80 dark:border-slate-700/60 bg-transparent" />
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Device Image Frame ─── */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-visible lg:col-span-6 my-auto lg:h-[500px]">
          <div className="relative w-full max-w-120 flex items-center justify-center">

            {/* Decorative rings – lg only, matches HeroView */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] -z-10 pointer-events-none hidden lg:block">
              <div className="absolute top-1/2 left-[-8%] -translate-y-1/2 w-[72%] aspect-square rounded-full bg-white dark:bg-slate-900/40 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-transparent" />
              <div className="absolute top-1/2 right-[-8%] -translate-y-1/2 w-[72%] aspect-square rounded-full bg-[#FF4F00]/70 shadow-2xl shadow-[#FF4F00]/20 animate-pulse" />
            </div>

            {/* Device frame */}
            <div className="w-full z-10">
              <div className="relative w-full aspect-4/3">
                <div className="absolute inset-0 rounded-xl lg:rounded-3xl bg-[#111] p-[0.3rem] lg:p-[0.55rem] shadow-xl lg:shadow-2xl border border-slate-800">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-slate-900 animate-pulse">
                    {/* Shimmer gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700/60 to-slate-800/80" />
                    {/* Centre play icon placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-white/40 border-b-[6px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    {/* Nav arrow placeholders */}
                    <div className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />
                    <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dot pagination – matches the 3-dot indicator below the frame */}
          <div className="mt-3 sm:mt-4 lg:mt-5 flex items-center justify-center gap-1">
            <div className="h-1.5 w-7 rounded-full bg-[#FF4F00]/50 animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300/70 dark:bg-slate-700/70" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ATMSkeleton;
