import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AnnouncementSkeletonProps {
  className?: string;
  accentColor?: 'orange' | 'amber' | 'emerald';
}

export const AnnouncementSkeleton: React.FC<AnnouncementSkeletonProps> = ({
  className,
  accentColor = 'orange',
}) => {
  const accentGlow = {
    orange: 'bg-orange-500/25 border-orange-500/30 text-orange-400',
    amber: 'bg-amber-500/25 border-amber-500/30 text-amber-400',
    emerald: 'bg-emerald-500/25 border-emerald-500/30 text-emerald-400',
  }[accentColor] || 'bg-orange-500/25 border-orange-500/30 text-orange-400';

  return (
    <div
      role="status"
      aria-label="Loading announcements"
      className={cn(
        'w-full h-8 sm:h-9 flex items-center justify-center select-none overflow-hidden px-4 bg-slate-950 text-slate-100',
        className
      )}
    >
      <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 max-w-[1720px] w-full">
        {/* Shimmering Badge Pill Skeleton */}
        <div
          className={cn(
            'hidden sm:inline-flex items-center justify-center h-4.5 w-16 sm:w-20 rounded-full border shrink-0 animate-pulse',
            'bg-slate-800/90 border-slate-700/60 shadow-xs'
          )}
        >
          <div className="h-2 w-10 sm:w-12 rounded-full bg-slate-600/60" />
        </div>

        {/* Shimmering Content Line */}
        <div className="relative overflow-hidden h-3.5 w-48 sm:w-72 md:w-96 rounded-md bg-slate-800/90 border border-slate-700/60 shrink-0">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Divider */}
        <span className="text-slate-600 font-bold shrink-0 hidden min-[360px]:inline">|</span>

        {/* Shimmering CTA Pill */}
        <div
          className={cn(
            'inline-flex items-center gap-1 h-4 px-2 rounded border shrink-0 animate-pulse',
            accentGlow
          )}
        >
          <div className="h-2 w-12 sm:w-14 rounded bg-white/20" />
          <ChevronRight size={12} className="stroke-[2.5] opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSkeleton;
