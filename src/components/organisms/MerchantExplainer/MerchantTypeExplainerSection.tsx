'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const MerchantTypeExplainerSection: React.FC = () => {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-white py-20 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:py-28">
      <div className="site-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-wide text-primary mb-3 shadow-2xs sm:px-4 sm:text-[11px] sm:tracking-widest">
            <Sparkles size={13} className="shrink-0" />
            <span className="truncate">FLEXIBLE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-semibold tracking-tight leading-tight text-slate-900 dark:text-white">
            Choose Your <span className="text-primary">Deployment Strategy</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Whether you need a fully managed cloud network for multi-location scale or a private dedicated infrastructure for corporate control, Quantix adapts to your business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Multi-Store Cloud Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-7 sm:p-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative flex flex-col justify-between group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-90" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center border border-primary/20">
                  <Cloud size={24} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary px-3.5 py-1 rounded-full border border-primary/20 shadow-2xs">
                  FULLY MANAGED SAAS
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-syne font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Multi-Store Cloud Network
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Best for rapidly expanding franchise networks, multi-region operations, and businesses wanting zero infrastructure overhead.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {[
                  "Global Cloud Deployment across AWS/GCP",
                  "Automated Load Balancing & Auto-Scaling",
                  "Zero Server Maintenance or IT Overhead",
                  "Real-Time Data Sync Across Hundreds of Locations",
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
                onClick={() => openModal("Start Cloud Enterprise Setup", "CONFIGURE ENTERPRISE CLOUD")}
                className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider py-4 px-5 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Select Cloud Network</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: On-Premise Enterprise Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-7 sm:p-9 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 hover:border-slate-900/50 dark:hover:border-slate-100/50 transition-all duration-300 shadow-xl hover:shadow-2xl relative flex flex-col justify-between group overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 dark:bg-slate-200 opacity-90" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <Server size={24} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
                  CUSTOM INFRASTRUCTURE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-syne font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                  Hybrid / On-Premise Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  Best for highly regulated industries, large corporate campuses, and businesses requiring strict data sovereignty and local control.
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {[
                  "Dedicated Private Cloud (VPC) or On-Premise Servers",
                  "Complete Data Sovereignty & Compliance (SOC 2, GDPR, PCI Tier 1)",
                  "Isolated Offline Operation (Air-Gapped for Critical Security)",
                  "Direct Database Access for Custom ERP Connections",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">
                    <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
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
                onClick={() => openModal("Contact Sales for On-Premise", "GET QUOTE NOW")}
                className="w-full rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-syne font-bold text-xs uppercase tracking-wider py-4 px-5 shadow-lg shadow-slate-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Request Custom Quote</span>
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
