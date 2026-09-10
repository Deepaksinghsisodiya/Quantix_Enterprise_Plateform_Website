"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, SlidersHorizontal, TrendingUp, UserPlus, ShieldCheck, type LucideIcon } from "lucide-react";
import { HowItWorksStep } from "./HowItWorksData";

const BADGE_ICONS: Record<HowItWorksStep["badgeIconName"], LucideIcon> = {
  reach: UserPlus,
  process: SlidersHorizontal,
  delivery: TrendingUp,
};

export interface HowItWorksViewProps {
  steps: HowItWorksStep[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ steps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden border-y border-slate-200/80 bg-white py-16 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24"
      ref={ref}
      id="how-it-works"
    >
      <div className="site-container relative z-10">
        {/* Section Header with 100% Original Quantix POS Content */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
            <Sparkles className="h-3.5 w-3.5 stroke-[2.4]" />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="font-syne text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            From setup to live service
            <span className="mt-1 block font-bold text-slate-800 dark:text-slate-200">
              in three focused steps
            </span>
          </h2>
          <p className="mt-4 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Start with your business model, configure store operations, then run checkout, kitchen, inventory, and reporting from one connected POS platform.
          </p>
        </div>

        {/* 3 Columns Layout matching reference UI styling with 100% Quantix Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {steps.map((step, idx) => {
            const BadgeIcon = BADGE_ICONS[step.badgeIconName];

            return (
              <motion.div
                key={step.number}
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="flex flex-col"
              >
                {/* 1. Top Soft Pastel Badge Tag */}
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-black uppercase tracking-wider ${step.badgeColor}`}
                  >
                    <span>{step.badgeLabel}</span>
                    <BadgeIcon className="h-4 w-4 stroke-[2.2]" />
                  </div>
                </div>

                {/* 2. Middle Image Container */}
                <div className="group relative aspect-[16/11] w-full flex items-center justify-center p-1">
                  <Image
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.05] drop-shadow-xl"
                  />
                </div>

                {/* 3. Title & Description */}
                <div className="mt-4">
                  <h3 className="font-syne text-lg font-black text-slate-950 dark:text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                    {step.description}
                  </p>
                </div>

                {/* 4. Bottom Bullets with Red Triangle Pointer */}
                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3.5 dark:border-slate-800/80">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 inline-block h-0 w-0 shrink-0 border-y-[4.5px] border-l-[7px] border-y-transparent border-l-rose-500 dark:border-l-rose-400"
                        aria-hidden="true"
                      />
                      <p className="text-xs font-semibold leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Reassurance Banner (Blueprint Section 7) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 dark:border-primary/30 dark:bg-primary/10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Zero Rollout Risk — Our Dedicated Team Handles the Implementation With You.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                From historical POS data migration and ERP API connectors to hardware provisioning and on-site staff training.
              </p>
            </div>
          </div>
          <a
            href="/contact/demo"
            className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 whitespace-nowrap"
          >
            Talk to Solutions Architect
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksView;
