'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  LifeBuoy,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export interface SupportSectionProps {
  platformName?: string;
  className?: string;
}

export const SupportSection: React.FC<SupportSectionProps> = ({
  platformName = "Quantix Enterprise",
  className = "",
}) => {
  const { openModal } = useContactModal();

  return (
    <section className={`py-16 sm:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 transition-colors duration-300 relative overflow-hidden ${className}`}>
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col space-y-6 text-left"
          >
            {/* Top Pill Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-2xs">
                <LifeBuoy className="w-3.5 h-3.5 stroke-[2.5]" />
                24/7 Human Customer Support
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
                24/7 Dedicated Enterprise Technical Support
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                Empowering multi-location venues and enterprise chains with round-the-clock technical assistance, dedicated onboarding managers, and real-time cloud management guidance.
              </p>
            </div>

            {/* Bullet Points with Red Checkmark Badge */}
            <div className="space-y-4 pt-1">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:bg-red-500/25 dark:text-red-400 border border-red-500/20 mt-0.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Dedicated Account Manager offering expert 1-on-1 technical onboarding for complex chain operations.
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:bg-red-500/25 dark:text-red-400 border border-red-500/20 mt-0.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Direct priority channel support for menu matrices, custom price rules, and multi-store cloud rollouts.
                </p>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:bg-red-500/25 dark:text-red-400 border border-red-500/20 mt-0.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Comprehensive staff & manager training support for smooth software adoption across all locations.
                </p>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-3">
              <button
                onClick={() => openModal('24/7 Enterprise Dedicated Technical Support', 'SUPPORT_SECTION_ENTERPRISE')}
                className="inline-flex items-center gap-3 rounded-full border border-red-500/80 hover:border-red-600 bg-white dark:bg-slate-900 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Learn more</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-xs group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Clean Simple Photo Container */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-lg lg:max-w-md">
              <img
                src="/images/customer_support_executive.jpg"
                alt="24/7 Dedicated Technical Support Specialist"
                className="w-full h-auto max-h-[420px] object-cover rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SupportSection;
