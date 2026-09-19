'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy } from 'lucide-react';

export const SupportHeader: React.FC = () => {
  return (
    <div className="text-center relative z-10 max-w-4xl mx-auto mb-10 sm:mb-14">
      {/* Category Pill Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF4F00] mb-3 shadow-2xs"
      >
        <LifeBuoy className="h-3.5 w-3.5 stroke-[2.4] text-[#FF4F00]" />
        <span>24/7 HUMAN CUSTOMER SUPPORT</span>
      </motion.div>

      {/* Main Title (Original Company Title Enhanced) */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-4xl md:text-5xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight [text-wrap:balance]"
      >
        24/7 Dedicated Enterprise{' '}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 block sm:inline">
          Technical Support
        </span>
      </motion.h2>

      {/* Subtitle (Original Authentic Company Copy) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed"
      >
        Empowering multi-location venues and enterprise chains with round-the-clock technical assistance, dedicated onboarding managers, and real-time cloud management guidance.
      </motion.p>
    </div>
  );
};

export default SupportHeader;
