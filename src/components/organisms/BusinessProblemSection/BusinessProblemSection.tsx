"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Layers, TrendingDown, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";

export const BusinessProblemSection: React.FC = () => {
  const problems = [
    {
      num: "01",
      icon: TrendingDown,
      tag: "Store-by-Store Chaos",
      severity: "CRITICAL",
      title: "Disconnected Inventory & Stockouts",
      description:
        "One location is completely stocked out of bestsellers while another branch holds surplus stock that gathers dust and expires.",
      impact: "Lost revenue, high food waste & inventory shrinkage",
    },
    {
      num: "02",
      icon: AlertTriangle,
      tag: "Fragmented Operations",
      severity: "HIGH RISK",
      title: "Manual Menu & Price Updating",
      description:
        "Headquarters has to manually update price changes, menu modifiers, and promotional rules location by location across disconnected tills.",
      impact: "Human errors, pricing inconsistencies & margin erosion",
    },
    {
      num: "03",
      icon: Layers,
      tag: "Zero Real-Time Visibility",
      severity: "BLINDSPOT",
      title: "Delayed, Incomplete Reporting",
      description:
        "Executive teams wait days or weeks for end-of-month spreadsheets from individual stores rather than seeing live sales telemetry as it happens.",
      impact: "Slow decision making & zero visibility on labor margins",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-18 lg:py-24 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/70 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Background Ambience & Engineering Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,79,0,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,79,0,0.15),rgba(15,23,42,0))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20" />

      <div className="site-container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Architectural Telemetry Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/[0.08] dark:bg-orange-500/[0.15] px-3.5 py-1.5 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#FF4F00] shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4F00]" />
            </span>
            <AlertTriangle size={13} className="shrink-0 text-[#FF4F00]" />
            <span className="leading-none whitespace-nowrap">
              The Reality of Legacy Multi-Unit Systems
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 sm:mt-5 font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.18] [text-wrap:balance]"
          >
            The High Cost of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
              Disconnected Systems
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Operating multiple restaurants, franchise branches, or retail stores on fragmented software drains your margins and blinds executive management.
          </motion.p>
        </div>

        {/* 3 Enterprise Diagnostic Cards Grid */}
        <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/95 p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-rose-300/90 dark:hover:border-rose-500/50 hover:shadow-[0_20px_40px_-10px_rgba(244,63,94,0.14)]"
              >
                {/* Glowing Laser Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Big Watermark Index Number in Top-Right Background */}
                <div className="pointer-events-none absolute right-4 sm:right-6 top-3 sm:top-4 select-none font-syne text-5xl sm:text-6xl font-black text-slate-100 dark:text-slate-800/30 group-hover:text-rose-100/80 dark:group-hover:text-rose-950/40 transition-colors duration-300 z-0">
                  {prob.num}
                </div>

                <div className="relative z-10">
                  {/* Card Header Row: Icon Chassis + Category Tag */}
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 shadow-sm shadow-rose-500/15 group-hover:scale-110 group-hover:shadow-rose-500/30 transition-all duration-300">
                      <Icon size={22} className="sm:w-6 sm:h-6" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/60 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {prob.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 font-syne text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#FF4F00] dark:group-hover:text-orange-400 transition-colors duration-200 leading-snug">
                    {prob.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                    {prob.description}
                  </p>
                </div>

                {/* System Impact Diagnostic Telemetry Strip */}
                <div className="relative z-10 mt-6 rounded-xl sm:rounded-2xl border border-rose-200/80 dark:border-rose-900/50 bg-gradient-to-br from-rose-50/90 via-orange-50/40 to-white dark:from-rose-950/40 dark:via-slate-900/60 dark:to-rose-950/20 p-3 sm:p-4 transition-colors shadow-sm">
                  {/* Telemetry Micro Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 pb-2 border-b border-rose-200/60 dark:border-rose-900/40">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert size={12} className="text-rose-600 dark:text-rose-400" />
                      <span>SYSTEM IMPACT</span>
                    </div>
                    <span className="text-[9px] font-mono font-black tracking-widest bg-rose-500/15 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded">
                      {prob.severity}
                    </span>
                  </div>

                  {/* Impact Text */}
                  <div className="mt-2 flex items-start gap-2">
                    <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-600 dark:text-red-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-600 dark:bg-rose-400" />
                    </div>
                    <p className="text-xs font-semibold leading-snug text-rose-950 dark:text-rose-200">
                      {prob.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Solution Bridge Command Deck (High-Contrast Executive Architecture) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative overflow-hidden mt-8 sm:mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl sm:rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-[#140804] p-6 sm:p-8 lg:p-9 text-white shadow-2xl shadow-slate-950/20"
        >
          {/* Subtle Warm Amber Mesh Glow Behind Solution Bridge */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(255,79,0,0.22),transparent_70%)]" />
          <div className="pointer-events-none absolute left-0 bottom-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,43,0.1),transparent_70%)]" />

          {/* Left: Solution Architecture Description */}
          <div className="relative z-10 flex items-start gap-4 sm:gap-5">
            <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/20">
              <CheckCircle2 size={26} className="shrink-0 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                <span>Unified Enterprise Architecture</span>
              </div>
              <p className="font-syne text-base sm:text-lg md:text-xl font-extrabold text-white leading-snug">
                How Quantix Solves This: One Centralized Operating Platform
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed font-normal">
                Replace 5+ disconnected tools with one synchronized cloud infrastructure. Every register, kitchen screen, web order, and warehouse connects back to headquarters in real time.
              </p>
            </div>
          </div>

          {/* Right: High-Converting CTA Button */}
          <Link
            href="/features"
            className="group relative z-10 flex w-full md:w-auto shrink-0 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF4F00] via-[#FF5F1A] to-[#FF6B2B] px-6 sm:px-8 py-3.5 sm:py-4 font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/35 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:brightness-110 active:scale-[0.98] whitespace-nowrap min-h-[48px]"
          >
            {/* Shimmer Light Bar */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span>See The Connected Platform</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessProblemSection;

