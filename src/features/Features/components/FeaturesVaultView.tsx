"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { FeatureModule } from "../Types/features.types";

interface FeaturesVaultViewProps {
  modules: FeatureModule[];
}

export const FeaturesVaultView: React.FC<FeaturesVaultViewProps> = ({
  modules,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const currentModule = modules[activeIndex] || modules[0];
  const CurrentIcon = currentModule.icon;

  const goToModule = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const handleNextModule = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % modules.length);
  };

  const handlePrevModule = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
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
    const minSwipeDistance = 35;

    if (distance > minSwipeDistance) {
      handleNextModule();
    } else if (distance < -minSwipeDistance) {
      handlePrevModule();
    }
  };

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* MOBILE & TABLET VIEW (< lg): 100% Native Touch-Swipeable     */}
      {/* ============================================================ */}
      <div className="lg:hidden flex flex-col space-y-3 sm:space-y-4">
        {/* Mobile Tab Dock: 4 Equal Columns, High-Contrast Active State */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          {modules.map((mod, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => goToModule(idx)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 select-none cursor-pointer min-h-[44px] ${
                  isSelected
                    ? "bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/25 font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-mono font-bold ${
                    isSelected
                      ? "bg-white text-[#FF4F00]"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {mod.number}
                </span>
                <span className="font-syne text-[11px] sm:text-xs font-bold truncate">
                  {mod.shortMobileName}
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
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentModule.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col space-y-3"
            >
              {/* Header Row: Icon + Module Info + Live Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF4F00] border border-orange-500/20">
                    <CurrentIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#FF4F00] truncate">
                      MODULE {currentModule.number} • {currentModule.category}
                    </span>
                    <span className="text-xs sm:text-sm font-syne font-bold text-slate-900 dark:text-white truncate block">
                      {currentModule.tabLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shrink-0">
                  {currentModule.statusBadge}
                </span>
              </div>

              {/* Hardware Visual Stage: 100% Transparent Floating Image, NO Gray BG or Drop Shadow blob */}
              <div className="relative h-44 sm:h-56 w-full flex items-center justify-center py-1">
                <div className="relative w-full h-full">
                  <Image
                    src={currentModule.imageSrc}
                    alt={currentModule.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 50vw"
                    className="object-contain"
                  />
                </div>

                {/* Top Floating Micro-Badge */}
                <div className="absolute top-1 right-1 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 text-[9px] font-mono font-bold text-slate-800 dark:text-slate-100 shadow-xs backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F00]" />
                  </span>
                  <span>{currentModule.topBadge}</span>
                </div>
              </div>

              {/* Module Title & Description */}
              <div className="space-y-1">
                <h3 className="font-syne text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                  {currentModule.title}
                </h3>
                <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                  {currentModule.description}
                </p>
              </div>

              {/* 3 Micro Checkmark Bullets */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                {currentModule.bullets.map((bullet, idx) => (
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
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-400 truncate">
                    {currentModule.stat.label}:
                  </span>
                  <span className="font-syne text-xs sm:text-[13px] font-extrabold text-[#FF4F00] shrink-0">
                    {currentModule.stat.value}
                  </span>
                </div>

                <Link
                  href={currentModule.href}
                  className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-white bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] py-2 px-3.5 rounded-xl shadow-xs active:scale-95 transition-transform shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Indicators & Prev/Next Controls */}
        <div className="flex items-center justify-between px-1 text-xs">
          <button
            type="button"
            onClick={handlePrevModule}
            className="inline-flex items-center gap-1 text-[11px] font-syne font-bold text-slate-600 dark:text-slate-400 hover:text-[#FF4F00] active:scale-95 cursor-pointer py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800"
          >
            <ChevronLeft size={13} />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5">
            {modules.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToModule(idx)}
                aria-label={`Go to feature ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-[#FF4F00]"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNextModule}
            className="inline-flex items-center gap-1 text-[11px] font-syne font-bold text-slate-600 dark:text-slate-400 hover:text-[#FF4F00] active:scale-95 cursor-pointer py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800"
          >
            <span>Next</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (>= lg): Smooth Elastic Horizontal Showcase     */}
      {/* ============================================================ */}
      <div className="hidden lg:flex rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-xl p-2.5 shadow-xl relative min-h-[540px] flex-row gap-2.5 items-stretch overflow-hidden">
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx;
          const ModIcon = mod.icon;

          return (
            <div
              key={mod.id}
              onMouseEnter={() => goToModule(idx)}
              onClick={() => goToModule(idx)}
              className={`relative rounded-2xl overflow-hidden select-none transition-[flex] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "flex-[3.8] bg-white dark:bg-slate-900 border border-orange-500/40 dark:border-orange-500/50 shadow-lg cursor-default"
                  : "flex-1 bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-orange-500/40 hover:bg-orange-500/[0.02] cursor-pointer group"
              }`}
            >
              {/* TOP ACCENT LINE on active card */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400 z-10" />
              )}

              {/* ACTIVE EXPANDED STATE (Takes w-full with zero wasted space on right) */}
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="w-full h-full p-6 xl:p-8 flex flex-col justify-between"
                >
                  {/* Top Row: Category, Tag, Status Badge, and Icon */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/25">
                        <ModIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black uppercase tracking-widest text-[#FF4F00]">
                            MODULE {mod.number}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {mod.category}
                          </span>
                        </div>
                        <h4 className="font-syne font-bold text-base text-slate-950 dark:text-white leading-tight">
                          {mod.tabLabel}
                        </h4>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shadow-2xs">
                      {mod.statusBadge}
                    </span>
                  </div>

                  {/* Main Content Area: Left Details + Right Hardware Showcase */}
                  <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center py-4 flex-1">
                    {/* Left Column: Title, Description, 3 Bullets */}
                    <div className="col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-syne text-xl xl:text-2xl font-extrabold text-slate-950 dark:text-white leading-tight">
                          {mod.title}
                        </h3>
                        <p className="mt-2 text-xs xl:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                          {mod.description}
                        </p>
                      </div>

                      {/* 3 Checkmark Bullets */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        {mod.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5">
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

                    {/* Right Column: Clean Hardware Stage (100% Transparent Float, fills space cleanly) */}
                    <div className="col-span-5 relative h-full min-h-[230px] flex items-center justify-center p-0 overflow-hidden">
                      <div className="relative w-full h-[230px] xl:h-[250px]">
                        <Image
                          src={mod.imageSrc}
                          alt={mod.imageAlt}
                          fill
                          priority
                          sizes="(max-width: 1280px) 35vw, 30vw"
                          className="object-contain transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Top Floating Badge */}
                      <div className="absolute top-1 right-1 inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 text-[9.5px] font-mono font-bold text-slate-800 dark:text-slate-100 shadow-xs backdrop-blur-md">
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F00]" />
                        </span>
                        <span>{mod.topBadge}</span>
                      </div>

                      {/* Bottom Floating Badge */}
                      <div className="absolute bottom-1 left-1 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 text-[9px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs backdrop-blur-md">
                        <ShieldCheck size={11} className="text-[#FF4F00]" />
                        <span>{mod.bottomBadge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row: Stat Badge + CTA Button */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                        {mod.stat.label}:
                      </span>
                      <span className="font-syne text-sm font-extrabold text-[#FF4F00]">
                        {mod.stat.value}
                      </span>
                    </div>

                    <Link
                      href={mod.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4F00] via-[#FF5F1A] to-[#FF6B2B] px-5 py-2.5 font-syne text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-all hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-105 active:scale-95"
                    >
                      <span>{mod.ctaText}</span>
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* INACTIVE COLLAPSED PILL (Instant hover switch, no gray) */
                <div className="w-full h-full p-4 xl:p-5 flex flex-col justify-between items-center">
                  {/* Top Station Number */}
                  <span className="font-mono text-xs font-black text-slate-400 group-hover:text-[#FF4F00] transition-colors">
                    {mod.number}
                  </span>

                  {/* Vertical Module Title */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <span className="font-syne font-bold text-xs xl:text-sm tracking-wider uppercase text-slate-700 dark:text-slate-300 group-hover:text-[#FF4F00] transition-colors [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {mod.tabLabel}
                    </span>
                  </div>

                  {/* Bottom Module Icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-slate-700 group-hover:bg-[#FF4F00] group-hover:text-white group-hover:border-[#FF4F00] transition-colors shadow-2xs">
                    <ModIcon size={16} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
