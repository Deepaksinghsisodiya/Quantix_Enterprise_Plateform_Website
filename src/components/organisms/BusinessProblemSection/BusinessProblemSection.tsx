"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Layers, TrendingDown, ArrowRight, CheckCircle2 } from "lucide-react";

export const BusinessProblemSection: React.FC = () => {
  const problems = [
    {
      icon: TrendingDown,
      tag: "Store-by-Store Chaos",
      title: "Disconnected Inventory & Stockouts",
      description:
        "One location is completely stocked out of bestsellers while another branch holds surplus stock that gathers dust and expires.",
      impact: "Lost revenue, high food waste & inventory shrinkage",
    },
    {
      icon: AlertTriangle,
      tag: "Fragmented Operations",
      title: "Manual Menu & Price Updating",
      description:
        "Headquarters has to manually update price changes, menu modifiers, and promotional rules location by location across disconnected tills.",
      impact: "Human errors, pricing inconsistencies & margin erosion",
    },
    {
      icon: Layers,
      tag: "Zero Real-Time Visibility",
      title: "Delayed, Incomplete Reporting",
      description:
        "Executive teams wait days or weeks for end-of-month spreadsheets from individual stores rather than seeing live sales telemetry as it happens.",
      impact: "Slow decision making & zero visibility on labor margins",
    },
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-white text-slate-900 border-y border-slate-100">
      {/* Subtle Warm Light Glow & Grid Accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,79,0,0.06),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      <div className="site-container relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-50 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#FF4F00] shadow-sm">
            <AlertTriangle size={13} className="shrink-0 text-[#FF4F00]" />
            <span>The Reality of Legacy Multi-Unit Systems</span>
          </div>

          <h2 className="mt-4 font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950">
            The High Cost of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
              Disconnected Systems
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Operating multiple restaurants, franchise branches, or retail stores on fragmented software drains your margins and blinds executive management.
          </p>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-orange-300/80 hover:shadow-[0_12px_30px_-6px_rgba(255,79,0,0.12)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 group-hover:scale-105 transition-transform duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {prob.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 sm:mt-5 font-syne text-base sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-normal leading-relaxed text-slate-600">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 rounded-xl border border-red-100 bg-red-50/70 p-3 sm:p-3.5">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    </div>
                    <p className="text-xs font-semibold leading-snug text-red-700">
                      {prob.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Solution Bridge Banner (Clean High-Contrast Light Design) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 rounded-2xl border border-orange-200/90 bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-white p-5 sm:p-7 md:p-8 shadow-[0_10px_30px_-5px_rgba(255,79,0,0.08)]"
        >
          <div className="flex items-start gap-3.5 sm:gap-5">
            <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-lg shadow-orange-500/25">
              <CheckCircle2 size={24} className="shrink-0" />
            </div>
            <div>
              <p className="font-syne text-sm sm:text-base md:text-lg font-extrabold text-slate-950">
                How Quantix Solves This: One Centralized Operating Platform
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Replace 5+ disconnected tools with one synchronized cloud infrastructure. Every register, kitchen screen, web order, and warehouse connects back to headquarters in real time.
              </p>
            </div>
          </div>

          <a
            href="#products-showcase"
            className="group flex w-full md:w-auto shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] px-5 sm:px-6 py-3 sm:py-3.5 font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-all hover:shadow-lg hover:shadow-orange-500/35 hover:brightness-105 active:scale-98 whitespace-nowrap"
          >
            <span>See The Connected Platform</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessProblemSection;
