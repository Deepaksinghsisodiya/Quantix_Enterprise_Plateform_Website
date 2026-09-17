"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Store,
  SlidersHorizontal,
  TrendingUp,
  Check,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { HowItWorksStep } from "./HowItWorksData";

const BADGE_ICONS: Record<HowItWorksStep["badgeIconName"], LucideIcon> = {
  reach: Store,
  process: SlidersHorizontal,
  delivery: TrendingUp,
};

export interface HowItWorksViewProps {
  steps: HowItWorksStep[];
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const currentStep = steps[activeIndex] || steps[0];
  const CurrentBadgeIcon = BADGE_ICONS[currentStep.badgeIconName] || Store;

  const goToStep = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const handleNextStep = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Go Next
      handleNextStep();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Go Prev
      handlePrevStep();
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-10 sm:py-16 lg:py-24 text-slate-900 transition-colors dark:text-white">
      {/* Ambient Depth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] bg-gradient-to-tr from-[#FF4F00]/[0.05] via-amber-500/[0.04] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-6 sm:mb-12 max-w-3xl text-center">
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF4F00] dark:border-orange-500/30 dark:bg-orange-500/15">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4]" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="font-syne text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.2] tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
            From fleet setup to live operations{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 block sm:inline">
              in three connected steps
            </span>
          </h2>

          <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            Configure your catalog, pair hardware terminals, and orchestrate real-time multi-location sales from one connected platform.
          </p>

          {/* Implementation Reassurance Pill (Blueprint Section 7) */}
          <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-2xs">
            <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
            <span>Dedicated Onboarding Reassurance: Our team handles migration and rollout with you.</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE & TABLET VIEW (< lg): Touch-Swipeable Showcase Stage  */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col space-y-3 sm:space-y-4">
          {/* Segmented Controller Tab Bar (Zero Overflow, Fits Any Mobile Screen) */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            {steps.map((step, idx) => {
              const isSelected = activeIndex === idx;
              const shortName = step.badgeLabel.replace(/Step \d+ — /, "");
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(idx)}
                  className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/25"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9.5px] sm:text-[10px] font-mono font-bold ${
                      isSelected
                        ? "bg-white text-[#FF4F00]"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="font-syne text-[11px] sm:text-xs font-bold truncate">
                    {shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dedicated Native Mobile Showcase Card with Touch Swipe Support */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-xl relative overflow-hidden select-none"
          >
            {/* Top Laser Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.number}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3.5"
              >
                {/* Mobile Phase Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md sm:rounded-lg bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-[11px] sm:text-xs font-mono font-black text-white shadow-xs">
                      {currentStep.number}
                    </span>
                    <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border border-orange-500/25 bg-orange-500/10 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF4F00]">
                      <CurrentBadgeIcon className="h-3 w-3 stroke-[2.2]" />
                      <span className="truncate">{currentStep.badgeLabel.replace(/Step \d+ — /, "")} Phase</span>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 shrink-0 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>0{activeIndex + 1} / 03</span>
                  </span>
                </div>

                {/* Floating Hardware Visual with Clean Contextual Chip */}
                <div className="relative h-44 sm:h-52 w-full flex items-center justify-center my-1 overflow-hidden rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
                  {/* Subtle Background Radial Aura */}
                  <div className="absolute inset-0 bg-radial from-orange-500/[0.08] to-transparent blur-xl pointer-events-none" />

                  {/* Floating Contextual Telemetry Chip */}
                  <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-mono font-semibold backdrop-blur-xs shadow-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 stroke-[2.5]" />
                    <span className="truncate max-w-[170px]">{currentStep.telemetryChips[0]?.label}</span>
                  </div>

                  <Image
                    src={currentStep.imageSrc}
                    alt={currentStep.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 50vw"
                    className="object-contain p-2 sm:p-3 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                  />
                </div>

                {/* Step Title & Description */}
                <div className="space-y-1">
                  <h3 className="font-syne text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                    {currentStep.description}
                  </p>
                </div>

                {/* 2 Clean Micro Bullets */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  {currentStep.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-xs">
                        <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 stroke-[3]" />
                      </span>
                      <span className="text-[11.5px] sm:text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stat Bar & Next Action Button */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 min-w-0">
                    <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-wider text-slate-400 truncate max-w-[110px]">
                      {currentStep.stat.label}:
                    </span>
                    <span className="font-syne text-xs sm:text-[13px] font-extrabold text-[#FF4F00] shrink-0">
                      {currentStep.stat.value}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-[#FF4F00] bg-orange-500/10 hover:bg-orange-500/15 py-1.5 px-3 rounded-xl transition-colors shrink-0 active:scale-95"
                  >
                    {activeIndex < steps.length - 1 ? (
                      <>
                        <span>Next Step</span>
                        <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                      </>
                    ) : (
                      <>
                        <span>Restart</span>
                        <RotateCcw className="h-3.5 w-3.5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Swipe Indicators & Hint */}
          <div className="flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToStep(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-6 bg-[#FF4F00]"
                      : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <span className="text-[10.5px] font-mono text-slate-400 dark:text-slate-500">
              👈 Swipe or tap tabs
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (>= lg): Horizontal Interactive Accordion Stream */}
        {/* ============================================================ */}
        <div className="hidden lg:flex rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/50 backdrop-blur-xl p-3 shadow-2xl relative min-h-[540px] flex-row gap-3 items-stretch">
          {steps.map((step, idx) => {
            const isActive = activeIndex === idx;
            const StepBadgeIcon = BADGE_ICONS[step.badgeIconName] || Store;

            if (isActive) {
              return (
                /* Active Expanded Accordion Panel (65% width) */
                <div
                  key={step.number}
                  className="flex-[3.6] bg-white dark:bg-slate-950 rounded-2xl border border-orange-500/40 dark:border-orange-500/50 shadow-xl p-7 xl:p-8 flex flex-col justify-between overflow-hidden relative transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {/* Top Energy Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400" />

                  {/* Panel Top Meta Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-xs font-mono font-black text-white shadow-md shadow-orange-500/30">
                        {step.number}
                      </span>

                      <div className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/25 bg-orange-500/10 dark:bg-orange-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FF4F00]">
                        <StepBadgeIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                        <span>{step.badgeLabel}</span>
                      </div>
                    </div>

                    {/* Live Phase Pulse */}
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>PHASE // {step.number} ACTIVE</span>
                    </div>
                  </div>

                  {/* Panel Content Body: 2-Column Split */}
                  <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center my-auto">
                    {/* Left: Text, Bullets, and Description */}
                    <div className="col-span-6 space-y-3.5">
                      <h3 className="font-syne text-xl xl:text-2xl font-bold text-slate-950 dark:text-white leading-tight">
                        {step.title}
                      </h3>

                      <p className="text-xs xl:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>

                      {/* 2 Clean Bullets with Custom Checkmarks */}
                      <div className="pt-2 space-y-2.5">
                        {step.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-xs">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                            <span className="text-xs xl:text-[13px] font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Floating Hardware Visual (No Box, Deep Drop Shadow) */}
                    <div className="col-span-6 relative aspect-[16/11] w-full flex items-center justify-center">
                      {/* Floating Glass Telemetry Chip */}
                      <div className="absolute -top-1 left-2 z-10 inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 text-[10.5px] font-mono font-semibold backdrop-blur-xs shadow-xs text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>{step.telemetryChips[0]?.label}</span>
                      </div>

                      <Image
                        src={step.imageSrc}
                        alt={step.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1280px) 45vw, 40vw"
                        className="object-contain p-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Panel Bottom Bar: Key Stat & Hint */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400">
                        {step.stat.label}:
                      </span>
                      <span className="font-syne text-xs font-extrabold text-[#FF4F00]">
                        {step.stat.value}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      // HOVER OR CLICK NEIGHBOR TABS TO SWITCH
                    </span>
                  </div>
                </div>
              );
            }

            /* Collapsed Accordion Tab */
            return (
              <div
                key={step.number}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className="flex-[0.7] bg-white/60 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 cursor-pointer p-4 py-8 flex flex-col items-center justify-between group/tab transition-[flex,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {/* Step Number Top */}
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 group-hover/tab:bg-[#FF4F00] group-hover/tab:text-white transition-colors">
                  {step.number}
                </span>

                {/* Rotated Vertical Title Text (Stripe / Ramp Style) */}
                <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-2">
                  <span className="font-syne text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover/tab:text-[#FF4F00] transition-colors whitespace-nowrap">
                    {step.badgeLabel.replace(/Step \d+ — /, "")}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="font-mono text-[10.5px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    PHASE {step.number}
                  </span>
                </div>

                {/* Bottom Icon */}
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/tab:text-[#FF4F00] group-hover/tab:scale-110 transition-all">
                  <StepBadgeIcon className="h-4 w-4 stroke-[2.2]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Implementation Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] p-4 sm:p-6 dark:border-orange-500/30 dark:bg-orange-500/10"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/25">
              <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="font-syne text-xs sm:text-base font-extrabold text-slate-950 dark:text-white">
                Guided Enterprise Onboarding — Zero Disruption Guarantee
              </p>
              <p className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
                Our solutions architects migrate your historical POS data, configure branch hardware, and certify store managers before you go live.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
            <Link
              href="/contact/demo"
              className="group/btn inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 sm:px-5 sm:py-3 font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 whitespace-nowrap shadow-xs"
            >
              <span>Get Onboarding Support</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksView;
