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
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
      {/* Background Subtle Glow Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,79,0,0.15),rgba(255,255,255,0))]" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#FF6B2B]">
            <AlertTriangle size={13} className="shrink-0" />
            <span>The Reality of Legacy Multi-Unit Systems</span>
          </div>

          <h2 className="mt-4 font-syne text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            The High Cost of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-amber-400">Disconnected Systems</span>
          </h2>

          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
            Operating multiple restaurants, franchise branches, or retail stores on fragmented software drains your margins and blinds executive management.
          </p>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-950"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                      {prob.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 font-syne text-lg font-bold text-white">
                    {prob.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-4">
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                    <p className="text-xs font-bold text-red-300/90">
                      {prob.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Solution Bridge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-[#FF4F00]/30 bg-gradient-to-r from-[#FF4F00]/15 via-slate-900 to-slate-900 p-6 sm:p-7 shadow-xl shadow-orange-950/30"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF4F00] text-white shadow-lg shadow-orange-600/30">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-syne text-base sm:text-lg font-extrabold text-white">
                How Quantix Solves This: One Centralized Operating Platform
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
                Replace 5+ disconnected tools with one synchronized cloud infrastructure. Every register, kitchen screen, web order, and warehouse connects back to headquarters in real time.
              </p>
            </div>
          </div>

          <a
            href="#products-showcase"
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 font-syne text-xs font-black uppercase tracking-wider text-slate-950 transition-all hover:bg-slate-100 active:scale-95 whitespace-nowrap"
          >
            <span>See The Connected Platform</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessProblemSection;
