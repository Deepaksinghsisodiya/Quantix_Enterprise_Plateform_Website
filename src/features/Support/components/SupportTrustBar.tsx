'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, UserCheck, ShieldCheck, Building2 } from 'lucide-react';
import { SUPPORT_TRUST_BADGES } from '../Constants/support.constants';

const BADGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  UserCheck,
  ShieldCheck,
  Building2,
};

export const SupportTrustBar: React.FC = () => {
  return (
    <div className="relative z-10 mb-10 sm:mb-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SUPPORT_TRUST_BADGES.map((badge, idx) => {
          const IconComp = BADGE_ICONS[badge.iconName] || ShieldCheck;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs flex items-center gap-3 hover:border-orange-500/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
                <IconComp className="h-5 w-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-syne text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-tight">
                  {badge.title}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {badge.subtitle}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportTrustBar;
