"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Layers,
  PackageX,
  Clock,
  ArrowRightLeft,
  RefreshCw,
  LineChart,
  Barcode,
  WifiOff,
  UtensilsCrossed,
  ChefHat,
  LucideIcon,
} from "lucide-react";
import { CardTabMode, BusinessProblemItem } from "../Types/businessProblems.types";
import { BusinessProblemCard } from "./BusinessProblemCard";
import { BusinessProblemsSkeleton } from "./BusinessProblemsSkeleton";
import { useGetPublicBusinessProblemsQuery } from "../BusinessProblemService";

const ICON_LOOKUP: Record<string, LucideIcon> = {
  TrendingDown,
  AlertTriangle,
  Layers,
  PackageX,
  Clock,
  ArrowRightLeft,
  RefreshCw,
  LineChart,
  Barcode,
  WifiOff,
  UtensilsCrossed,
  ChefHat,
};

export const BusinessProblemSection: React.FC = () => {
  const { data: apiProblems, isLoading, isError } = useGetPublicBusinessProblemsQuery("Enterprise");

  // Mobile active tab index
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  // Per-card tab state: 'problem' or 'solution'
  const [cardTabs, setCardTabs] = useState<Record<string, CardTabMode>>({});

  const handleToggleTab = (id: string, tab: CardTabMode) => {
    setCardTabs((prev) => ({ ...prev, [id]: tab }));
  };

  // Safe mapping of API response with null-safety and 1..3 dynamic capping
  const problems: BusinessProblemItem[] = useMemo(() => {
    if (!Array.isArray(apiProblems) || apiProblems.length === 0) {
      return [];
    }

    const activeList = apiProblems.filter((p) => p && p.isActive !== false);
    // Limit to maximum 3 items as requested
    const capped = activeList.slice(0, 3);

    return capped.map((p, idx) => ({
      id: p.cardKey || p.businessProblemId || `problem-${idx}`,
      shortTabLabel: p.shortTabLabel || p.title?.slice(0, 14) || `Problem ${idx + 1}`,
      icon: ICON_LOOKUP[p.iconKey || ""] || AlertTriangle,
      tag: p.tag || "Problem Diagnostic",
      severity: p.severity || "CRITICAL",
      title: p.title || "Operational Friction Point",
      description: p.description || "",
      impact: p.impact || "",
      visualMeter: {
        icon: ICON_LOOKUP[p.visualMeter?.iconKey || ""] || ArrowRightLeft,
        legacyText: p.visualMeter?.legacyText || "",
        quantixText: p.visualMeter?.quantixText || "",
      },
      fix: Array.isArray(p.fixes) ? p.fixes : [],
    }));
  }, [apiProblems]);

  const handlePrev = () => {
    if (problems.length <= 1) return;
    setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : problems.length - 1));
  };

  const handleNext = () => {
    if (problems.length <= 1) return;
    setActiveMobileIndex((prev) => (prev < problems.length - 1 ? prev + 1 : 0));
  };

  // 1. While loading data from Admin API: display layout-accurate skeleton
  if (isLoading) {
    return <BusinessProblemsSkeleton />;
  }

  // 2. If API failed, empty response, or 0 active items: hide entire section completely
  if (isError || problems.length === 0) {
    return null;
  }

  const safeMobileIndex = Math.min(activeMobileIndex, problems.length - 1);
  const activeMobileProblem = problems[safeMobileIndex] || problems[0];

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

        {/* MOBILE VIEW */}
        <div className="md:hidden mt-5">
          {/* Mobile Tab Bar: Rendered dynamically if > 1 item */}
          {problems.length > 1 && (
            <div
              className={`grid ${
                problems.length === 2 ? "grid-cols-2" : "grid-cols-3"
              } w-full p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs`}
            >
              {problems.map((prob, idx) => {
                const Icon = prob.icon;
                const isActive = safeMobileIndex === idx;

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
          )}

          {/* Active Card with Smooth Transition */}
          {activeMobileProblem && (
            <div className={problems.length > 1 ? "mt-3" : "mt-2"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileProblem.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.16 }}
                >
                  <BusinessProblemCard
                    problem={activeMobileProblem}
                    activeTab={cardTabs[activeMobileProblem.id] || "problem"}
                    onToggleTab={(tab) => handleToggleTab(activeMobileProblem.id, tab)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Carousel Stepper Controls: Only shown if > 1 item */}
          {problems.length > 1 && (
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
                {problems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveMobileIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      safeMobileIndex === dotIdx ? "w-5 bg-[#FF4F00]" : "w-1.5 bg-slate-300 dark:bg-slate-700"
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
          )}
        </div>

        {/* DESKTOP VIEW: Dynamic Adaptive Layout (1 item -> centered, 2 items -> 2 cols, 3 items -> 3 cols) */}
        {problems.length === 1 ? (
          <div className="hidden md:flex justify-center mt-12 lg:mt-14 max-w-xl mx-auto">
            <BusinessProblemCard
              problem={problems[0]}
              activeTab={cardTabs[problems[0].id] || "problem"}
              onToggleTab={(tab) => handleToggleTab(problems[0].id, tab)}
              className="w-full"
            />
          </div>
        ) : problems.length === 2 ? (
          <div className="hidden md:grid md:grid-cols-2 max-w-4xl mx-auto gap-6 mt-12 lg:mt-14">
            {problems.map((prob) => (
              <BusinessProblemCard
                key={prob.id}
                problem={prob}
                activeTab={cardTabs[prob.id] || "problem"}
                onToggleTab={(tab) => handleToggleTab(prob.id, tab)}
              />
            ))}
          </div>
        ) : (
          <div className="hidden md:grid md:grid-cols-3 max-w-7xl mx-auto gap-6 mt-12 lg:mt-14">
            {problems.map((prob) => (
              <BusinessProblemCard
                key={prob.id}
                problem={prob}
                activeTab={cardTabs[prob.id] || "problem"}
                onToggleTab={(tab) => handleToggleTab(prob.id, tab)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessProblemSection;
