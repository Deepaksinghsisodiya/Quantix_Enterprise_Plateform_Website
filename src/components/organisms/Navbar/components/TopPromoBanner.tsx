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
        'w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 text-center text-[10px] sm:text-[13px] font-sans font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1 select-none transition-all duration-300 ease-out overflow-hidden',
        scrolled ? 'max-h-0 opacity-0 py-0 border-b-0' : 'max-h-8 py-1 px-3 opacity-100 sm:max-h-10 sm:py-1.5'
      )}
    >
      <span className="truncate max-w-[220px] sm:max-w-none">Get 3 Months FREE Quantix Enterprise Cloud POS</span>
      <span className="text-slate-350 dark:text-slate-700 mx-0.5 sm:mx-1">|</span>
      <button
        type="button"
        onClick={() => openModal("Book an Enterprise Platform Demo", "TOP_PROMO_BANNER")}
        tabIndex={scrolled ? -1 : 0}
        className="text-primary hover:text-primary-dark font-bold inline-flex items-center gap-0.5 hover:underline transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm cursor-pointer"
      >
        Book Demo <ChevronRight size={12} className="stroke-[3]" />
      </button>
    </div>
  );
};
