'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactModal } from '@/context/ContactModalContext';

interface TopPromoBannerProps {
  scrolled: boolean;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({ scrolled }) => {
  const { openModal } = useContactModal();

  return (
    <div
      aria-hidden={scrolled}
      className={cn(
        'w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-center text-[10.5px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none transition-all duration-300 ease-out overflow-hidden z-50',
        scrolled
          ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
          : 'max-h-9 py-1 px-2.5 opacity-100 sm:max-h-10 sm:py-1.5 sm:px-4'
      )}
    >
      <span className="shrink-0 truncate max-w-[210px] min-[400px]:max-w-[280px] min-[520px]:max-w-none">
        Get 3 Months 100% Free POS Trial <span className="hidden sm:inline">• Zero Setup Fee</span>
      </span>
      <span className="text-slate-400 dark:text-slate-700 mx-0.5 sm:mx-1">|</span>
      <button
        type="button"
        onClick={() => openModal('Claim Your 3 Months Free Trial', 'TOP_PROMO_BANNER')}
        tabIndex={scrolled ? -1 : 0}
        className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer"
      >
        <span>Claim Offer</span>
        <ChevronRight size={12} className="stroke-[3]" />
      </button>
    </div>
  );
};
