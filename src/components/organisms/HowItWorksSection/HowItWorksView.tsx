"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings2, TrendingUp, Users2 } from "lucide-react";
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
      className="border-y border-slate-200/80 bg-slate-50/70 py-12 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-900/45 dark:text-white sm:py-16"
      ref={ref}
      id="how-it-works"
    >
      <div className="site-container">
        <div className="mb-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <span className="mb-2 block text-[11px] font-black uppercase tracking-widest text-primary dark:text-primary-light">
              How it works
            </span>
            <h2 className="font-syne text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
              From setup to live service in three focused steps
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 md:ml-auto">
            Start with the business model, configure your store operations, then run checkout, kitchen,
            inventory, and reporting from a connected POS stack.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative min-h-[210px] overflow-hidden rounded-lg border border-slate-200/90 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-sm dark:border-slate-800/90 dark:bg-slate-950/45"
            >
              <span className="absolute right-5 top-4 select-none font-syne text-5xl font-black leading-none text-slate-100 transition-colors group-hover:text-primary/10 dark:text-slate-800/70">
                {step.number}
              </span>

              <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary-light">
                {STEP_ICONS[step.iconName]}
              </div>

              <h3 className="relative mt-8 font-syne text-lg font-black text-slate-950 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">
                {step.title}
              </h3>
              <p className="relative mt-3 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
                {step.description}
              </p>

              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-[-10px] top-1/2 hidden h-px w-5 bg-slate-300 dark:bg-slate-700 md:block"
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
