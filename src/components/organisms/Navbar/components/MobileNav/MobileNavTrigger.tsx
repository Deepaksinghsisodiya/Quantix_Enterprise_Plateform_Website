'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
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
          'flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer',
          mobileOpen
            ? 'bg-primary/10 text-primary'
            : 'bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
        )}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-drawer"
        onClick={onToggle}
      >
        {mobileOpen ? (
          <X size={20} className="stroke-[2.5]" />
        ) : (
          <Menu size={20} className="stroke-[2.5]" />
        )}
      </button>
    </div>
  );
};
