'use client';

import React from 'react';
import { ShieldCheck, Zap, WifiOff, ArrowUpRight } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const ValuePropositionsSection: React.FC = () => {
  const { openModal } = useContactModal();

  const PROPOSITIONS = [
    {
      icon: <WifiOff className="h-6 w-6 text-slate-900 dark:text-white stroke-[2]" />,
      badge: "OFFLINE-FIRST",
      title: "Zero Internet Downtime",
      description: "Keep ringing sales, printing receipts, and taking orders even when internet connection drops. Auto-syncs to cloud when back online.",
    },
    {
      icon: <Zap className="h-6 w-6 text-slate-900 dark:text-white stroke-[2]" />,
      badge: "LIGHTNING SPEED",
      title: "< 1.2s Till Checkout",
      description: "Engineered for high-volume rush hours. Process orders, split bills, and scan barcodes in sub-second speed without lag.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-slate-900 dark:text-white stroke-[2]" />,
      badge: "ENTERPRISE SECURITY",
      title: "Bank-Grade PCI-DSS Tier 1",
      description: "256-bit encrypted database sync, automated daily cloud backups, and SOC 2 compliance for total data peace of mind.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
            CORE PLATFORM ADVANTAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-syne font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Engineered For High-Reliability Performance
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            Discover why leading merchants trust Quantix to power their mission-critical point of sale operations.
          </p>
        </div>

        {/* 3 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROPOSITIONS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-7 sm:p-8 bg-slate-50/70 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-syne font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openModal(`Learn About ${item.title}`)}
                  className="text-xs font-syne font-bold uppercase tracking-wider text-primary hover:text-primary-dark flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Feature</span>
                  <ArrowUpRight size={14} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;
