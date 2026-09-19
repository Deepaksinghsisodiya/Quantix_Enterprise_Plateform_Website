"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { BUSINESS_PROBLEMS } from "../constants/businessProblemsData";
import { CardTabMode } from "../Types/businessProblems.types";
import { BusinessProblemCard } from "./BusinessProblemCard";

export const BusinessProblemSection: React.FC = () => {
  // Mobile active tab index (1 card shown at a time on mobile)
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Per-card tab state: 'problem' or 'solution'
  const [cardTabs, setCardTabs] = useState<Record<string, CardTabMode>>({
    inventory: "problem",
    "menu-pricing": "problem",
    reporting: "problem",
  });

  const handleToggleTab = (id: string, tab: CardTabMode) => {
    setCardTabs((prev) => ({ ...prev, [id]: tab }));
  };

  const handlePrev = () => {
    setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : BUSINESS_PROBLEMS.length - 1));
  };

  const handleNext = () => {
    setActiveMobileIndex((prev) => (prev < BUSINESS_PROBLEMS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative overflow-hidden py-12 lg:py-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Background Ambience: Soft Quantix Orange Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,79,0,0.05),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Header with Brand Theme Color */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FF4F00]/25 bg-orange-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF4F00] shadow-2xs backdrop-blur-md">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4F00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4F00]" />
            </span>
            <AlertTriangle size={12} className="shrink-0 text-[#FF4F00]" />
            <span>Diagnostic Audit • Multi-Unit Friction</span>
          </div>

          <h2 className="mt-3 sm:mt-4 font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
            The High Cost of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
              Disconnected Systems
            </span>
          </h2>

          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Operating multiple franchise branches or retail stores on fragmented software drains your margins and blinds executive management.
          </p>
        </div>

        {/* MOBILE VIEW: Equal 3-Column Grid Tab Bar (100% Equal Width, Never Overflowing) */}
        <div className="md:hidden mt-5">
          <div className="grid grid-cols-3 w-full p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            {BUSINESS_PROBLEMS.map((prob, idx) => {
              const Icon = prob.icon;
              const isActive = activeMobileIndex === idx;

              return (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-[11px] font-syne transition-all cursor-pointer select-none text-center ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-[#FF4F00] shadow-xs border border-slate-200/80 dark:border-slate-700/80 font-black"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 font-bold"
                  }`}
                >
                  <Icon size={12} className={isActive ? "text-[#FF4F00] shrink-0" : "text-slate-400 shrink-0"} />
                  <span className="truncate">{prob.shortTabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card with Smooth Transition */}
          <div className="mt-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={BUSINESS_PROBLEMS[activeMobileIndex].id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.16 }}
              >
                <BusinessProblemCard
                  problem={BUSINESS_PROBLEMS[activeMobileIndex]}
                  activeTab={cardTabs[BUSINESS_PROBLEMS[activeMobileIndex].id] || "problem"}
                  onToggleTab={(tab) => handleToggleTab(BUSINESS_PROBLEMS[activeMobileIndex].id, tab)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Carousel Stepper Controls: Prev / Dots / Next */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-syne font-bold text-slate-700 dark:text-slate-300 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={13} className="text-slate-400" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5">
              {BUSINESS_PROBLEMS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveMobileIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeMobileIndex === dotIdx ? "w-5 bg-[#FF4F00]" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-syne font-bold text-slate-700 dark:text-slate-300 shadow-2xs active:scale-95 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight size={13} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW: 3-Column Side-by-Side Enterprise Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12 lg:mt-14">
          {BUSINESS_PROBLEMS.map((prob) => (
            <BusinessProblemCard
              key={prob.id}
              problem={prob}
              activeTab={cardTabs[prob.id] || "problem"}
              onToggleTab={(tab) => handleToggleTab(prob.id, tab)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessProblemSection;
