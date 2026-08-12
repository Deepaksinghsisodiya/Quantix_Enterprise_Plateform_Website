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
      className="absolute top-full left-0 right-0 mt-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/90 dark:border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] py-9 z-50 text-left overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[250px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="site-container relative z-10">{children}</div>
    </motion.div>
  );
};
