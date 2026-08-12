'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MobileMenuMain } from './MobileMenuMain';
import { MobileSubMenu } from './MobileSubMenu';
import { MOBILE_MENU_SECTIONS } from '../../config/navConfig';

interface MobileNavDrawerProps {
  mobileOpen: boolean;
  mobileSubMenu: string | null;
  scrolled: boolean;
  pathname: string;
  onSetSubMenu: (label: string | null) => void;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  mobileOpen,
  mobileSubMenu,
  scrolled,
  pathname,
  onSetSubMenu,
  onClose,
}) => {
  const activeSection = MOBILE_MENU_SECTIONS.find((section) => section.label === mobileSubMenu);

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          id="mobile-nav-drawer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className={cn(
            'fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-2xl lg:hidden',
            scrolled ? 'top-[42px] sm:top-[58px]' : 'top-[74px] sm:top-[96px]'
          )}
        >
          {activeSection ? (
            <MobileSubMenu
              activeSection={activeSection}
              pathname={pathname}
              onBack={() => onSetSubMenu(null)}
              onClose={onClose}
            />
          ) : (
            <MobileMenuMain
              pathname={pathname}
              onSetSubMenu={(label) => onSetSubMenu(label)}
              onClose={onClose}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
