"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
  ArrowRight,
} from "lucide-react";
import { HowItWorksStep } from "../Types/HowItWorksTypes";

export interface HowItWorksViewProps {
  steps: HowItWorksStep[];
}

const getStepCountText = (count: number) => {
  if (count === 1) return "in one seamless step";
  if (count === 2) return "in two connected steps";
  if (count === 3) return "in three connected steps";
  return `in ${count} connected steps`;
};

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ steps }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!steps || steps.length === 0) return null;

  const defaultImage = "/images/ent_bi_analytics_bundle_v2.png";

  const renderCard = (item: HowItWorksStep, idx: number) => {
    const isHovered = hoveredIdx === idx;
    const stepNum = item.number || String(idx + 1).padStart(2, "0");
    const badge = item.badgeLabel || `Step ${stepNum}`;
    const bullets = Array.isArray(item.bullets) ? item.bullets : [];
    const chips = Array.isArray(item.telemetryChips) ? item.telemetryChips : [];
    const imgSrc = item.imageSrc && item.imageSrc.trim() !== "" ? item.imageSrc : defaultImage;

    return (
      <div
        key={stepNum || idx}
        onMouseEnter={() => setHoveredIdx(idx)}
        onMouseLeave={() => setHoveredIdx(null)}
        className={`group relative rounded-3xl border bg-white dark:bg-slate-900/90 p-6 xl:p-7 flex flex-col justify-between transition-all duration-300 ${
          isHovered
            ? "border-orange-500/50 shadow-2xl shadow-orange-500/10 -translate-y-1.5"
            : "border-slate-200/90 dark:border-slate-800/90 shadow-lg hover:border-orange-500/40"
        }`}
      >
        {/* Top Laser Line Indicator */}
        <div
          className={`absolute top-0 left-6 right-6 h-[2.5px] rounded-full transition-opacity duration-300 ${
            isHovered
              ? "bg-gradient-to-r from-[#FF4F00] via-amber-400 to-emerald-400 opacity-100"
              : "bg-slate-200 dark:bg-slate-800 opacity-40"
          }`}
        />

        {/* Header: Station Number + Badge + Stat Metric */}
        <div>
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl font-mono text-xs font-black shadow-md transition-all duration-300 ${
                  isHovered
                    ? "bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-orange-500/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {stepNum}
              </div>
              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#FF4F00] block">
                  {badge}
                </span>
                <span className="font-syne text-xs font-bold text-slate-800 dark:text-slate-200">
                  Station {stepNum}
                </span>
              </div>
            </div>

            {item.stat?.value && (
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-extrabold border text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800">
                  <Zap size={10} className="text-[#FF4F00]" />
                  <span>{item.stat.value}</span>
                </span>
                {item.stat.label && (
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                    {item.stat.label}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title & Description without any truncation */}
          <div className="pt-4 space-y-2">
            <h3 className="font-syne text-lg xl:text-xl font-bold text-slate-950 dark:text-white leading-snug group-hover:text-[#FF4F00] transition-colors">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-xs xl:text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            )}
          </div>

          {/* Transparent Floating Hardware Preview */}
          <div className="relative h-36 xl:h-40 w-full flex items-center justify-center my-3 py-1">
            <div className="relative w-full h-full">
              <Image
                src={imgSrc}
                alt={item.imageAlt || item.title || "Step Image"}
                fill
                sizes="(max-width: 1280px) 30vw, 25vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Bullets without truncation */}
          {bullets.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-xs">
                    <Check className="h-2 w-2 stroke-[3]" />
                  </span>
                  <span className="text-[11.5px] xl:text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Telemetry Status Chips - Full Width Clean Rows (No Truncation / No "...") */}
        {chips.length > 0 && (
          <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            {chips.map((chip, cIdx) => (
              <div
                key={cIdx}
                className="flex items-center justify-between gap-2 bg-slate-50/90 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/70 text-[11px]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 font-medium">
                    {chip.label}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 text-right">
                  {chip.sublabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden py-12 lg:py-14 text-slate-900 transition-colors dark:text-white">
      {/* Background Depth Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="mx-auto max-w-3xl text-center space-y-2.5 sm:space-y-3.5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF4F00] shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4] text-[#FF4F00]" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.18] tracking-tight text-slate-950 dark:text-white">
            From fleet setup to live operations{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 sm:inline">
              {getStepCountText(steps.length)}
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            Configure your catalog, pair hardware terminals, and orchestrate real-time multi-location sales from one connected platform.
          </p>

          {/* Dedicated Onboarding Reassurance Pill */}
          <div className="pt-0.5 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 px-3 sm:px-3.5 py-1 text-[10.5px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-2xs">
              <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Dedicated Onboarding Reassurance: Our team handles migration and rollout with you.</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (>= lg)                                         */}
        {/* ============================================================ */}
        <div className="hidden lg:block">
          
          {/* CASE 1: Single Step Showcase */}
          {steps.length === 1 && (
            <div className="max-w-4xl mx-auto">
              {(() => {
                const item = steps[0];
                const stepNum = item.number || "01";
                const badge = item.badgeLabel || `Step ${stepNum}`;
                const bullets = Array.isArray(item.bullets) ? item.bullets : [];
                const chips = Array.isArray(item.telemetryChips) ? item.telemetryChips : [];
                const imgSrc = item.imageSrc && item.imageSrc.trim() !== "" ? item.imageSrc : defaultImage;

                return (
                  <div className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-8 xl:p-10 shadow-2xl hover:border-orange-500/40 transition-all duration-300">
                    <div className="absolute top-0 left-8 right-8 h-[2.5px] rounded-full bg-gradient-to-r from-[#FF4F00] via-amber-400 to-emerald-400" />

                    <div className="grid grid-cols-12 gap-8 items-center">
                      {/* Left: Info & Bullets (7 cols) */}
                      <div className="col-span-7 space-y-4">
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white font-mono text-xs font-black shadow-md shadow-orange-500/25">
                              {stepNum}
                            </div>
                            <div>
                              <span className="font-mono text-[11px] font-black uppercase tracking-wider text-[#FF4F00] block">
                                {badge}
                              </span>
                              <span className="font-syne text-xs font-bold text-slate-800 dark:text-slate-200">
                                Station {stepNum}
                              </span>
                            </div>
                          </div>

                          {item.stat?.value && (
                            <div className="flex flex-col items-end">
                              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-mono font-extrabold border text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800">
                                <Zap size={11} className="text-[#FF4F00]" />
                                <span>{item.stat.value}</span>
                              </span>
                              {item.stat.label && (
                                <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                                  {item.stat.label}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-syne text-2xl font-bold text-slate-950 dark:text-white leading-snug group-hover:text-[#FF4F00] transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {bullets.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            {bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2.5">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-xs">
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                </span>
                                <span className="text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Visual & Telemetry (5 cols) */}
                      <div className="col-span-5 space-y-4">
                        <div className="relative h-48 w-full flex items-center justify-center rounded-2xl bg-slate-50/60 dark:bg-slate-800/30 p-3 border border-slate-100 dark:border-slate-800/60">
                          <div className="relative w-full h-full">
                            <Image
                              src={imgSrc}
                              alt={item.imageAlt || item.title || "Step Image"}
                              fill
                              sizes="(max-width: 1280px) 40vw, 30vw"
                              className="object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>

                        {chips.length > 0 && (
                          <div className="w-full space-y-2">
                            {chips.map((chip, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                  </span>
                                  <span className="font-mono text-slate-600 dark:text-slate-400 font-medium">
                                    {chip.label}
                                  </span>
                                </div>
                                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 text-right">
                                  {chip.sublabel}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* CASE 2: Exactly 2 Steps (Clean Connected Pathway) */}
          {steps.length === 2 && (
            <div className="relative max-w-5xl mx-auto">
              {/* Conduit Line strictly between center of Card 1 (25%) and center of Card 2 (75%) */}
              <div className="absolute top-9 left-[25%] right-[25%] h-[2px] bg-gradient-to-r from-[#FF4F00] via-amber-400 to-emerald-500 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-75 animate-pulse" />
              </div>

              {/* Center Flow Indicator Node between the two cards */}
              <div className="absolute top-9 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-slate-900 border border-orange-500/40 shadow-lg shadow-orange-500/20 text-[#FF4F00]">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </div>

              {/* 2-Card Grid */}
              <div className="grid grid-cols-2 gap-8 relative z-10">
                {steps.map((item, idx) => renderCard(item, idx))}
              </div>
            </div>
          )}

          {/* CASE 3: Exactly 3 Steps (Triple Milestone Roadmap) */}
          {steps.length === 3 && (
            <div className="relative max-w-7xl mx-auto">
              {/* Conduit Line strictly between center of Card 1 (16.66%) and center of Card 3 (83.33%) */}
              <div className="absolute top-9 left-[16.66%] right-[16.66%] h-[2px] bg-gradient-to-r from-[#FF4F00] via-amber-400 to-emerald-500 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-75 animate-pulse" />
              </div>

              {/* Inter-Card Flow Arrow Indicators */}
              <div className="absolute top-9 left-[33.33%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-7 w-7 rounded-full bg-white dark:bg-slate-900 border border-orange-500/40 shadow-md text-[#FF4F00]">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <div className="absolute top-9 left-[66.66%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-7 w-7 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/40 shadow-md text-emerald-500">
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>

              {/* 3-Card Grid */}
              <div className="grid grid-cols-3 gap-6 xl:gap-8 relative z-10">
                {steps.map((item, idx) => renderCard(item, idx))}
              </div>
            </div>
          )}

          {/* CASE 4: 4 or More Steps */}
          {steps.length >= 4 && (
            <div className="relative max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {steps.map((item, idx) => renderCard(item, idx))}
              </div>
            </div>
          )}

        </div>

        {/* ============================================================ */}
        {/* MOBILE VIEW (< lg): Symmetrical, Clean & Responsive          */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col space-y-4">
          {steps.map((item, idx) => {
            const stepNum = item.number || String(idx + 1).padStart(2, "0");
            const badge = item.badgeLabel || `Step ${stepNum}`;
            const bullets = Array.isArray(item.bullets) ? item.bullets : [];
            const chips = Array.isArray(item.telemetryChips) ? item.telemetryChips : [];
            const imgSrc = item.imageSrc && item.imageSrc.trim() !== "" ? item.imageSrc : defaultImage;

            return (
              <React.Fragment key={stepNum || idx}>
                <div className="w-full rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 sm:p-6 shadow-xl relative overflow-hidden">
                  {/* Top Laser Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-400" />

                  {/* Header Row: Station Number + Badge + Stat */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white text-xs font-mono font-black shadow-md shadow-orange-500/25">
                        {stepNum}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-black uppercase tracking-wider text-[#FF4F00] block">
                          {badge}
                        </span>
                        <span className="text-xs font-syne font-bold text-slate-900 dark:text-white">
                          Station {stepNum}
                        </span>
                      </div>
                    </div>

                    {item.stat?.value && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800 shrink-0">
                        <Zap size={10} className="text-[#FF4F00]" />
                        <span>{item.stat.value}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="pt-3 space-y-1.5">
                    <h3 className="font-syne text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Visual Preview */}
                  <div className="relative h-36 sm:h-44 w-full flex items-center justify-center my-2.5 py-1">
                    <div className="relative w-full h-full">
                      <Image
                        src={imgSrc}
                        alt={item.imageAlt || item.title || "Step Image"}
                        fill
                        sizes="(max-width: 768px) 92vw, 50vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Bullets without truncation */}
                  {bullets.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-xs">
                            <Check className="h-2 w-2 stroke-[3]" />
                          </span>
                          <span className="text-[11.5px] sm:text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Telemetry Chips on Mobile without truncation */}
                  {chips.length > 0 && (
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                      {chips.map((chip, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 text-[11px]"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            <span className="font-mono text-slate-600 dark:text-slate-400 font-medium truncate text-[10.5px] sm:text-[11px]">
                              {chip.label}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 text-right text-[10.5px] sm:text-[11px] ml-2">
                            {chip.sublabel}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Connector between milestones on Mobile */}
                {idx < steps.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-0.5">
                    <div className="h-5 w-[2px] bg-gradient-to-b from-[#FF4F00] via-amber-400 to-emerald-400 rounded-full opacity-60" />
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-xs shadow-orange-500/50 -mt-0.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HowItWorksView;
