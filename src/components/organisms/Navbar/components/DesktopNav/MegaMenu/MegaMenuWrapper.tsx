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
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 right-0 mt-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl py-8 z-50 text-left overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="site-container relative z-10">{children}</div>
    </motion.div>
  );
};
