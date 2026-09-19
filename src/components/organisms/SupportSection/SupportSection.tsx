'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Headphones,
  Clock,
  Users,
  Zap,
  Calendar,
  Globe,
  ArrowRight,
  Play,
  Star,
  Crown,
  Phone,
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
    <section
      id="support"
      className={`relative overflow-hidden py-12 lg:py-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors select-none ${className}`}
    >
      {/* Background Subtle Ambient Glows & Dot Grid */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] rounded-full bg-orange-500/[0.04] dark:bg-orange-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] sm:h-[400px] w-[300px] sm:w-[400px] rounded-full bg-amber-500/[0.04] dark:bg-amber-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 right-4 hidden xl:block h-28 w-28 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] [background-size:12px_12px]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Content Column                                 */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6 text-left min-w-0">
            
            {/* Top Pill Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-orange-500/10 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-500/25 shadow-2xs">
                <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-[#FF4F00]" />
                <span>24/7/365 HUMAN CUSTOMER SUPPORT</span>
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-black text-slate-950 dark:text-white leading-[1.18] tracking-tight [text-wrap:balance]">
                24/7 Dedicated Enterprise{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 block sm:inline">
                  Technical Support
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-xl">
                Multi-location operations need immediate resolution. Get round-the-clock technical assistance, dedicated account onboarding, and direct priority support across every store.
              </p>
            </div>

            {/* 3 Pillars Row (1 col on mobile, 3 cols on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2.5 pt-0.5">
              {/* Pillar 1 */}
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 shadow-2xs mt-0.5">
                  <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug truncate sm:whitespace-normal">
                    Dedicated Account Manager
                  </h4>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-relaxed">
                    1-on-1 technical onboarding and custom multi-store rollouts.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 shadow-2xs mt-0.5">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug truncate sm:whitespace-normal">
                    Priority Direct Channel
                  </h4>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-relaxed">
                    Instant voice hotline and live remote screen-share with zero IVR.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 shadow-2xs mt-0.5">
                  <Users className="h-3.5 w-3.5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug truncate sm:whitespace-normal">
                    Staff &amp; Manager Training
                  </h4>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-relaxed">
                    Ongoing programs for smooth cashier adoption &amp; Z-reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Strip (Row of 3 items with vertical dividers) */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 py-2 sm:py-2.5 border-y border-slate-100 dark:border-slate-800/80">
              {/* Stat 1 */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight truncate">
                    &lt; 25s
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium truncate">
                    Avg. response
                  </span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 border-l border-slate-100 dark:border-slate-800 pl-1.5 sm:pl-3 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight truncate">
                    24/7/365
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium truncate">
                    Always available
                  </span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 border-l border-slate-100 dark:border-slate-800 pl-1.5 sm:pl-3 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight truncate">
                    Global Support
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium truncate">
                    All locations
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Row */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => openModal('24/7 Enterprise Dedicated Technical Support', 'SUPPORT_SECTION_ENTERPRISE')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => openModal('See How Quantix Support Works', 'SUPPORT_VIDEO_DEMO')}
                className="inline-flex items-center gap-2 text-left group cursor-pointer"
              >
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-orange-500/30 dark:border-orange-500/20 bg-orange-500/10 dark:bg-orange-500/15 text-[#FF4F00] dark:text-orange-400 transition-all group-hover:scale-110 group-hover:bg-orange-500/20 shadow-2xs">
                  <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current ml-0.5" />
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#FF4F00] transition-colors block leading-tight">
                    See how our support works
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 block">
                    Watch 1 min video
                  </span>
                </div>
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Photo Card with Overlaid Floating Badges       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative w-full flex justify-center mt-6 lg:mt-0 px-2 sm:px-4">
            <div className="relative w-full max-w-[500px] xl:max-w-[530px]">
              
              {/* --------------------------------------------------- */}
              {/* Floating Badge 1: Top-Left "Active Support Specialist" */}
              {/* --------------------------------------------------- */}
              <div className="absolute -top-3.5 left-1 sm:-left-3 z-20 inline-flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 dark:border-slate-700/90 dark:bg-slate-900/95 px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-xl backdrop-blur-md">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
                </span>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-950 dark:text-white leading-tight">
                    Active Support Specialist
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium">
                    Here to help, always
                  </span>
                </div>
              </div>

              {/* --------------------------------------------------- */}
              {/* Floating Badge 2: Top-Right "Tier-3 Support"         */}
              {/* --------------------------------------------------- */}
              <div className="absolute -top-3 right-1 sm:right-3 z-20 inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-950/90 border border-slate-700/80 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-xl backdrop-blur-md text-white">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md sm:rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight">
                    Tier-3 Support
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 block font-mono">
                    Enterprise Priority
                  </span>
                </div>
              </div>

              {/* --------------------------------------------------- */}
              {/* Main Photo Card Frame                                */}
              {/* --------------------------------------------------- */}
              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2 sm:p-2.5">
                
                {/* Real Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/images/customer_support_executive.jpg"
                    alt="24/7 Dedicated Technical Support Specialist"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 530px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>

                {/* --------------------------------------------------- */}
                {/* Floating Badge 3: Right-Middle "4.9/5 Rating"        */}
                {/* --------------------------------------------------- */}
                <div className="absolute top-[48%] right-0 sm:-right-4 z-20 rounded-2xl border border-slate-200/90 bg-white/95 dark:border-slate-700/90 dark:bg-slate-900/95 px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 shadow-xl backdrop-blur-md text-center">
                  <div className="flex items-center justify-center gap-0.5 text-amber-400 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                    ))}
                  </div>
                  <div className="font-syne text-[11px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight">
                    4.9/5
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-medium text-slate-500 dark:text-slate-400 block whitespace-nowrap">
                    Customer Satisfaction
                  </span>
                </div>

                {/* --------------------------------------------------- */}
                {/* Bottom Status Strip (3 Stats)                       */}
                {/* --------------------------------------------------- */}
                <div className="mt-2.5 rounded-xl border border-slate-100 dark:border-slate-800/90 bg-slate-50/90 dark:bg-slate-800/60 p-2 sm:p-2.5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {/* Bottom Item 1 */}
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight truncate">
                        &lt; 25s
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                        Avg. Phone Pickup
                      </span>
                    </div>
                  </div>

                  {/* Bottom Item 2 */}
                  <div className="flex items-center gap-1.5 sm:gap-2 border-l border-slate-200/70 dark:border-slate-700/70 pl-1.5 sm:pl-2.5 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight truncate">
                        24/7/365
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                        Rush &amp; Holiday
                      </span>
                    </div>
                  </div>

                  {/* Bottom Item 3 */}
                  <div className="flex items-center gap-1.5 sm:gap-2 border-l border-slate-200/70 dark:border-slate-700/70 pl-1.5 sm:pl-2.5 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight truncate">
                        Global Team
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                        Multi-location
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportSection;
