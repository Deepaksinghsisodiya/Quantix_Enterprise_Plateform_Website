'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MobileNavTriggerProps {
  mobileOpen: boolean;
  onToggle: () => void;
}

export const MobileNavTrigger: React.FC<MobileNavTriggerProps> = ({
  mobileOpen,
  onToggle,
}) => {
  return (
    <div className="flex lg:hidden items-center z-50">
      <button
        type="button"
        className={cn(
          'flex h-9 w-9 flex-col items-center justify-center rounded-lg border shadow-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          mobileOpen
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'border-slate-200/80 bg-white text-slate-800 hover:border-primary/25 hover:bg-primary/5 hover:text-primary'
        )}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-drawer"
        onClick={onToggle}
      >
        <span
          className={cn(
            'w-[18px] h-[2px] sm:w-5 bg-current rounded-full transition-all duration-300 ease-out',
            mobileOpen ? 'rotate-45 translate-y-[5px]' : ''
          )}
        />
        <span
          className={cn(
            'w-[18px] h-[2px] sm:w-5 bg-current rounded-full my-[3px] transition-all duration-300 ease-out',
            mobileOpen ? 'opacity-0 scale-x-0' : ''
          )}
        />
        <span
          className={cn(
            'w-[18px] h-[2px] sm:w-5 bg-current rounded-full transition-all duration-300 ease-out',
            mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''
          )}
        />
      </button>
    </div>
  );
};
