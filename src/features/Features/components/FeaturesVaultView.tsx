"use client";

import React, { useState, useEffect } from "react";
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const currentModule = modules[activeIndex] || modules[0];
  const CurrentIcon = currentModule.icon;

  const goToModule = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  const handleNextModule = () => {
    setActiveIndex((prev) => (prev + 1) % modules.length);
  };

  const handlePrevModule = () => {
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ============================================================ */}
      {/* MOBILE & TABLET VIEW (< lg): Matches Business Problems Style */}
      {/* ============================================================ */}
      <div className="lg:hidden flex flex-col space-y-3 sm:space-y-4">
        {/* Mobile Tab Bar: Matches Business Problems Section */}
        {modules.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto no-scrollbar shadow-xs">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              const isActive = activeIndex === idx;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => goToModule(idx)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[11px] font-syne transition-all cursor-pointer select-none whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-[#FF4F00] shadow-xs border border-slate-200/80 dark:border-slate-700/80 font-black"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 font-bold"
                  }`}
                >
                  <Icon size={13} className={isActive ? "text-[#FF4F00] shrink-0" : "text-slate-400 shrink-0"} />
                  <span>{mod.shortMobileName || mod.tabLabel}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dedicated Native Mobile Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-xl relative overflow-hidden select-none min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
          {/* Top Laser Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col space-y-3"
            >
              {/* Header Row: Icon + Module Info + Live Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF4F00] border border-orange-500/20">
                    <CurrentIcon size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#FF4F00] truncate">
                      MODULE {currentModule.number} • {currentModule.category}
                    </span>
                    <span className="text-xs sm:text-sm font-syne font-bold text-slate-900 dark:text-white truncate block">
                      {currentModule.tabLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shadow-2xs shrink-0">
                  {currentModule.statusBadge}
                </span>
              </div>

              {/* Hardware Visual Stage: 100% Transparent Floating Image */}
              <div className="relative h-40 sm:h-56 w-full flex items-center justify-center py-1">
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
                <div className="absolute top-1 right-1 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 px-2 sm:px-2.5 py-0.5 text-[8.5px] sm:text-[9px] font-mono font-bold text-slate-800 dark:text-slate-100 shadow-xs backdrop-blur-md max-w-[130px] sm:max-w-none truncate">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F00]" />
                  </span>
                  <span className="truncate">{currentModule.topBadge}</span>
                </div>
              </div>

              {/* Module Title & Description */}
              <div className="space-y-1">
                <h3 className="font-syne text-sm sm:text-base md:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                  {currentModule.title}
                </h3>
                <p className="text-[11.5px] sm:text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 sm:line-clamp-none">
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
                    <span className="text-[11px] sm:text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Stat Bar & Next Action Button */}
              <div className="pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 min-w-0">
                  <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-slate-400 truncate">
                    {currentModule.stat.label}:
                  </span>
                  <span className="font-syne text-[11px] sm:text-xs md:text-[13px] font-extrabold text-[#FF4F00] shrink-0">
                    {currentModule.stat.value}
                  </span>
                </div>

                <Link
                  href={currentModule.href}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-syne font-bold text-white bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl shadow-xs active:scale-95 transition-transform shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Stepper Controls: Matches Business Problems section */}
        <div className="flex items-center justify-between mt-3 px-1">
          <button
            type="button"
            onClick={handlePrevModule}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-syne font-bold text-slate-700 dark:text-slate-300 shadow-2xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={13} className="text-slate-400" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5">
            {modules.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToModule(dotIdx)}
                aria-label={`Go to feature ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${activeIndex === dotIdx ? "w-5 bg-[#FF4F00]" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                  }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNextModule}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-syne font-bold text-slate-700 dark:text-slate-300 shadow-2xs active:scale-95 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={13} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (>= lg): Smooth Elastic Horizontal Showcase     */}
      {/* ============================================================ */}
      <div
        style={{ height: "520px", minHeight: "520px", maxHeight: "520px" }}
        className="hidden lg:flex rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-xl p-2.5 shadow-xl relative h-[520px] min-h-[520px] max-h-[520px] flex-row gap-2.5 items-stretch overflow-hidden"
      >
        {modules.map((mod, idx) => {
          const isActive = activeIndex === idx;
          const ModIcon = mod.icon;

          return (
            <div
              key={mod.id}
              style={{ height: "100%", maxHeight: "100%" }}
              onMouseEnter={() => {
                setIsHovered(true);
                goToModule(idx);
              }}
              onClick={() => goToModule(idx)}
              className={`relative rounded-2xl overflow-hidden select-none transition-[flex,border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] h-full min-h-0 max-h-full ${isActive
                ? "flex-[4.2] bg-white dark:bg-slate-900 border border-orange-500/40 dark:border-orange-500/50 shadow-lg cursor-default"
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
                  transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                  style={{ height: "100%", maxHeight: "100%" }}
                  className="w-full h-full min-w-[560px] xl:min-w-[660px] p-6 xl:p-8 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Row: Category, Tag, Status Badge, and Icon */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/25">
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

                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shadow-2xs shrink-0">
                      {mod.statusBadge}
                    </span>
                  </div>

                  {/* Main Content Area: Left Details + Right Hardware Showcase */}
                  <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center py-2 flex-1 min-h-0 overflow-hidden">
                    {/* Left Column: Title, Description, All Bullets Naturally Grouped */}
                    <div className="col-span-7 flex flex-col justify-center gap-3.5 h-full min-h-0 py-1 overflow-y-auto pr-1">
                      <div>
                        <h3 className="font-syne text-xl xl:text-2xl font-extrabold text-slate-950 dark:text-white leading-tight">
                          {mod.title}
                        </h3>
                        <p className="mt-1.5 text-xs xl:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                          {mod.description}
                        </p>
                      </div>

                      {/* All Checkmark Bullets (Full API Content) */}
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
                    <div className="col-span-5 relative h-full min-h-[200px] max-h-[250px] flex items-center justify-center p-0 overflow-hidden">
                      <div className="relative w-full h-[200px] xl:h-[240px]">
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
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 xl:pt-4 shrink-0">
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
                <div
                  style={{ height: "100%", maxHeight: "100%" }}
                  className="w-full h-full p-4 xl:p-5 flex flex-col justify-between items-center overflow-hidden"
                >
                  {/* Top Station Number */}
                  <span className="font-mono text-xs font-black text-slate-400 group-hover:text-[#FF4F00] transition-colors">
                    {mod.number}
                  </span>

                  {/* Vertical Module Title */}
                  <div className="flex-1 flex items-center justify-center my-4 overflow-hidden">
                    <span className="font-syne font-bold text-xs xl:text-sm tracking-wider uppercase text-slate-700 dark:text-slate-300 group-hover:text-[#FF4F00] transition-colors [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {mod.tabLabel}
                    </span>
                  </div>

                  {/* Bottom Module Icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-slate-700 group-hover:bg-[#FF4F00] group-hover:text-white group-hover:border-[#FF4F00] transition-colors shadow-2xs shrink-0">
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

export default FeaturesVaultView;
