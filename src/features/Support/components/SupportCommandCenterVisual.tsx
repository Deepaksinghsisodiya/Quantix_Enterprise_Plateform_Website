'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Headphones, CheckCircle2, PhoneCall } from 'lucide-react';

export const SupportCommandCenterVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
      {/* Backlight Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-orange-500/20 via-transparent to-transparent blur-3xl -z-10" />

      {/* Main Image Container */}
      <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden p-2 sm:p-2.5">
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden">
          <Image
            src="/images/customer_support_executive.jpg"
            alt="Quantix Enterprise 24/7 Dedicated Technical Support Specialist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
            priority
          />

          {/* Gradient Vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

          {/* Top Floating Badge on Image */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ON-CALL QUEUE</span>
            </div>
          </div>
        </div>

        {/* Floating Glass HUD Card 1: Top-Right (Desktop) / Underlay (Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sm:absolute -top-5 sm:-right-5 z-20 mt-3 sm:mt-0 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl max-w-xs"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Headphones className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Queue Status
              </div>
              <div className="font-syne text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                0 Calls Waiting • Instant Pick
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="h-3 w-3" />
            <span>Median Response: 38 Seconds</span>
          </div>
        </motion.div>

        {/* Floating Glass HUD Card 2: Bottom-Left (Desktop) / Underlay (Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="sm:absolute -bottom-5 sm:-left-5 z-20 mt-3 sm:mt-0 p-3 sm:p-4 rounded-2xl border border-orange-500/30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl max-w-xs"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="h-8 w-8 rounded-xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-[#FF4F00]">
                Critical Incident SLA
              </div>
              <div className="font-syne text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                15-Min War Room Triage
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
            Direct access to senior Level-3 core POS & KDS kernel engineers.
          </p>
        </motion.div>
      </div>

      {/* Bottom Global Status Bar */}
      <div className="mt-4 flex items-center justify-between px-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>GLOBAL NOC (US EAST / WEST / EU)</span>
        </div>
        <span>24/7/365 UNINTERRUPTED</span>
      </div>
    </div>
  );
};

export default SupportCommandCenterVisual;
