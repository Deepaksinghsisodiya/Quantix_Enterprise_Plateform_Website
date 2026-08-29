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
            'absolute inset-x-0 top-full h-[calc(100dvh-100%)] z-40 overflow-hidden overscroll-contain border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl lg:hidden'
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
