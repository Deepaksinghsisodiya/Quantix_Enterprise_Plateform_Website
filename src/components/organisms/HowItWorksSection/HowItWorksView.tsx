"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, SlidersHorizontal, Sparkles, TrendingUp, Users2 } from "lucide-react";
import { HowItWorksStep } from "./HowItWorksData";

const STEP_ICONS: Record<HowItWorksStep["iconName"], React.ReactNode> = {
  users: <Users2 className="h-8 w-8" />,
  settings: <SlidersHorizontal className="h-8 w-8" />,
  trending: <TrendingUp className="h-8 w-8" />,
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
      className="relative overflow-hidden border-y border-slate-200/80 bg-white py-14 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-950 dark:text-white sm:py-16 lg:py-20"
      ref={ref}
      id="how-it-works"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-10 hidden h-32 w-32 opacity-60 lg:block"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15, 160, 160, 0.16) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-64 w-64 rounded-tl-full border-l border-t border-primary/10 lg:block"
      />

      <div className="site-container relative z-10">
        <div className="mb-10 grid gap-6 sm:mb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-wider text-primary shadow-xs dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 stroke-[2.4]" />
              How it works
            </span>
            <h2 className="font-syne text-[2.35rem] font-black leading-[1.05] tracking-normal text-slate-950 dark:text-white sm:text-5xl sm:tracking-tight lg:text-[3.75rem]">
              From setup to live service
              <span className="block">in three focused steps</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl lg:ml-auto">
            Start with the business model, configure your store operations, then run checkout,
            kitchen, inventory, and reporting from a connected POS stack.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-16">
          {steps.map((step, idx) => {
            return (
              <div key={step.number} className="relative">
                <motion.div
                  custom={idx}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  className="group relative min-h-[300px] overflow-hidden rounded-xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-slate-200/55 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-slate-200/80 dark:border-slate-800/90 dark:bg-slate-950/70 dark:shadow-none sm:min-h-[320px] sm:p-8"
                >
                  <div className="absolute -bottom-24 -right-12 h-44 w-44 rounded-tl-[90px] bg-primary/5" />
                  <div className="absolute bottom-0 right-0 h-20 w-48 rounded-tl-full bg-primary/5" />

                  <div className="relative flex items-center gap-7">
                    <div className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 dark:border-primary/25 dark:bg-primary/15 dark:text-primary-light">
                      {STEP_ICONS[step.iconName]}
                    </div>
                    <span className="select-none font-syne text-5xl font-black leading-none text-primary transition-transform duration-300 group-hover:scale-105 sm:text-6xl">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 font-syne text-xl font-black leading-[1.15] tracking-normal text-slate-950 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary-light sm:text-2xl sm:tracking-tight">
                    {step.title}
                  </h3>
                  <p className="relative mt-4 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300 sm:text-base">
                    {step.description}
                  </p>

                  <div className="relative mt-7 flex items-center gap-2 border-t border-slate-200/80 pt-5 text-sm font-extrabold uppercase tracking-wide text-primary transition-colors dark:border-slate-800 dark:text-primary-light">
                    <span>Step {step.number}</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.6] transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>

                {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-68px] top-[47%] z-20 hidden items-center lg:flex"
                >
                  <span className="h-px w-7 border-t-2 border-dotted border-slate-300 dark:border-slate-700" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-lg shadow-primary/25 dark:border-slate-950">
                    <ChevronRight className="h-5 w-5 stroke-[3]" />
                  </span>
                  <span className="h-px w-7 border-t-2 border-dotted border-slate-300 dark:border-slate-700" />
                </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksView;
