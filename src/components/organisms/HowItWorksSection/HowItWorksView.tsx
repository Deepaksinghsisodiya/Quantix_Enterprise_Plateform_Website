"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Settings2, Sparkles, TrendingUp, Users2 } from "lucide-react";
import { HowItWorksStep } from "./HowItWorksData";

const STEP_ICONS: Record<HowItWorksStep["iconName"], React.ReactNode> = {
  users: <Users2 className="h-5 w-5" />,
  settings: <Settings2 className="h-5 w-5" />,
  trending: <TrendingUp className="h-5 w-5" />,
};

export interface HowItWorksViewProps {
  steps: HowItWorksStep[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ steps }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative overflow-hidden border-y border-slate-200/80 bg-white py-12 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-950 dark:text-white sm:py-16"
      ref={ref}
      id="how-it-works"
    >
      <div className="site-container relative z-10">
        <div className="mb-7 grid gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80 sm:mb-8 sm:gap-5 sm:pb-7 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[11px]">
              <Sparkles className="h-3 w-3 stroke-[2.4]" />
              How it works
            </span>
            <h2 className="max-w-2xl font-syne text-[1.7rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight lg:text-4xl">
              From setup to live service in three focused steps
            </h2>
          </div>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm md:ml-auto md:max-w-xl">
            Start with the business model, configure your store operations, then run checkout, kitchen,
            inventory, and reporting from a connected POS stack.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative min-h-[210px] overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800/90 dark:bg-slate-950/60 dark:hover:shadow-none sm:min-h-[230px] sm:p-5"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="absolute right-4 top-4 select-none font-syne text-5xl font-black leading-none text-slate-100 transition-colors group-hover:text-primary/10 dark:text-slate-800/70 sm:right-5">
                {step.number}
              </span>

              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary group-hover:text-white dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:h-11 sm:w-11">
                {STEP_ICONS[step.iconName]}
              </div>

              <h3 className="relative mt-7 font-syne text-lg font-black leading-[1.15] tracking-normal text-slate-950 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary-light sm:mt-8 sm:text-xl sm:tracking-tight">
                {step.title}
              </h3>
              <p className="relative mt-3 text-[13px] font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300 sm:text-sm">
                {step.description}
              </p>

              <div className="relative mt-6 flex items-center gap-2 border-t border-slate-200/80 pt-4 text-[11px] font-extrabold uppercase tracking-wider text-primary transition-colors dark:border-slate-800 dark:text-primary-light">
                <span>Step {step.number}</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.6] transition-transform duration-200 group-hover:translate-x-1" />
              </div>

              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-[-14px] top-1/2 hidden h-px w-7 bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-700 md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksView;
