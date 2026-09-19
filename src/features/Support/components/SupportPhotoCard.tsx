'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserCheck, Headphones, CheckCircle2 } from 'lucide-react';

export const SupportPhotoCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent blur-3xl -z-10" />

      {/* Main Image Container */}
      <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xl overflow-hidden p-2 sm:p-2.5">
        <div className="relative aspect-[4/3] sm:aspect-[16/12] w-full rounded-2xl overflow-hidden">
          <Image
            src="/images/customer_support_executive.jpg"
            alt="Quantix Dedicated Technical Support Specialist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />

          {/* Soft Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

          {/* Top Live Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold shadow-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT TECHNICAL ASSISTANCE</span>
            </div>
          </div>
        </div>

        {/* Floating Verified Support Specialist Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-3 sm:p-4 mt-2 sm:mt-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
              <Headphones className="h-4 w-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-syne text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
                Dedicated Technical Support Team
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                1-on-1 assistance for onboarding, menus & multi-store setup
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPhotoCard;
