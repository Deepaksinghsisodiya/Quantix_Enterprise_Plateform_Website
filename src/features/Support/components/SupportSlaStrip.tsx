'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { SUPPORT_SLA_METRICS } from '../Constants/support.constants';

const SLA_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  ShieldCheck,
  Clock,
  UserCheck,
};

export const SupportSlaStrip: React.FC = () => {
  return (
    <div className="relative z-10 mb-12 sm:mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {SUPPORT_SLA_METRICS.map((metric, idx) => {
          const IconComponent = SLA_ICONS[metric.iconName] || Zap;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs hover:shadow-lg hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Corner Ambient Glow on hover */}
              <div className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {metric.label}
                </span>
                <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
                  <IconComponent className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
              </div>

              <div className="font-syne text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {metric.value}
              </div>

              <div className="mt-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-snug">
                {metric.subtext}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportSlaStrip;
