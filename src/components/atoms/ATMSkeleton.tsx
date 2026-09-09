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
        <ChevronRight size={12} className="stroke-[3] text-primary/40" />
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
      <div className="inline-flex items-center gap-1.5 shrink-0 hidden lg:inline-flex">
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

export default ATMSkeleton;
