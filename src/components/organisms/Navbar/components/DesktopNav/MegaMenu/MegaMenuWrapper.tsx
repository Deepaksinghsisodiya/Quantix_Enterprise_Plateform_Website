'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MegaMenuWrapperProps {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MegaMenuWrapper: React.FC<MegaMenuWrapperProps> = ({
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: -4,
        transition: {
          duration: 0.22,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      className="absolute top-full left-0 right-0 mt-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 py-6 sm:py-7 z-50 text-left overflow-hidden before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="site-container relative z-10">{children}</div>
    </motion.div>
  );
};
