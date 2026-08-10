'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Zap, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const MerchantTypeExplainerSection: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-hidden border-t border-b border-slate-200/80 bg-white py-20 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-950 dark:text-white sm:py-28">
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-black uppercase tracking-widest text-primary mb-3 shadow-2xs">
            <Sparkles size={13} />
            <span>FLEXIBLE DEPLOYMENT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            Choose How You Want to Run <br />
            <span className="text-primary">Your Business</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Whether you manage a chain of 20+ restaurant outlets or run an offline retail store with zero internet, Quantix adapts to your exact setup.
          </p>
        </div>

        {/* 2 Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Cloud Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-7 sm:p-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative flex flex-col justify-between group overflow-hidden"
          >
            {/* Subtle Brand Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-90" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20">
                  <Cloud size={24} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary px-3.5 py-1 rounded-full border border-primary/20 shadow-2xs">
                  REAL-TIME CLOUD SYNC
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Cloud Enterprise
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Best for multi-store chains, franchises, and businesses that need real-time multi-terminal inventory sync across outlets.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {[
                  "Real-time Multi-Store Inventory & Recipe Sync",
                  "Centralized Cloud Management & Analytics",
                  "Unlimited Terminal Registers per Location",
                  "24/7 Dedicated Priority Phone Support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Check size={13} className="stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => openModal("Start Enterprise Setup", "CONFIGURE ENTERPRISE")}
                className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider py-4 px-5 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Select Cloud Enterprise</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Standalone Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-7 sm:p-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative flex flex-col justify-between group overflow-hidden"
          >
            {/* Subtle Brand Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 opacity-90" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Zap size={24} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3.5 py-1 rounded-full border border-amber-500/20 shadow-2xs">
                  100% OFFLINE FIRST
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-syne font-black text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Standalone Terminal
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Best for single-store registers, food trucks, and remote locations with unreliable or zero internet connection.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {[
                  "100% Offline Mode — Zero Internet Needed",
                  "One-time Token Recharge (30 to 365 Days)",
                  "Instant Bluetooth Thermal Printer & Barcode Sync",
                  "Zero Recurring Monthly Platform Fees",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
                    <div className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Check size={13} className="stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => openModal("Get Standalone Terminal Token", "GET TOKEN NOW")}
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-syne font-bold text-xs uppercase tracking-wider py-4 px-5 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Select Standalone Terminal</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MerchantTypeExplainerSection;
