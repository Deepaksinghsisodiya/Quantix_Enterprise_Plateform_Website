'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Star,
  Building2,
  CloudUpload,
  FileText,
  Boxes,
  ShieldCheck,
  Zap,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSlide } from "./HeroData";
import { useContactModal } from "@/context/ContactModalContext";
import { useGetAnnouncementsQuery } from "@/features/Announcements/Service/AnnouncementService";
import { FALLBACK_ANNOUNCEMENTS } from "@/features/Announcements/constants/fallbackAnnouncements";

export interface HeroViewProps {
  slides: HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  onTogglePause: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  slides,
  activeIndex,
  onNext,
  onPrev,
  onGoTo,
  onMouseEnter,
  onMouseLeave,
}) => {
  const slide = slides[activeIndex];
  const { openModal } = useContactModal();
  const { data: announcementsData, isLoading: isAnnouncementsLoading } = useGetAnnouncementsQuery();
  const announcements =
    announcementsData && announcementsData.length > 0
      ? announcementsData
      : FALLBACK_ANNOUNCEMENTS;

  const formatHeading = (heading: string) => {
    const words = heading.split(" ");
    if (words.length <= 1) return heading;

    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")} <span className="font-semibold text-primary">{lastWord}</span>
      </>
    );
  };

  const getFeatureIcon = (index: number) => {
    switch (index % 3) {
      case 0: return <Building2 size={16} className="text-primary" />;

      case 1: return <CloudUpload size={16} className="text-primary" />;
      case 2: return <Boxes size={16} className="text-primary" />;
      default: return <Star size={16} className="text-primary" />;
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-24 pb-16 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-28 sm:pb-20 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onMouseEnter();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onMouseLeave();
      }}
    >
      <div className="site-container relative z-10 grid grid-cols-1 content-center items-center gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">

        {/* LEFT COLUMN: Content */}
        <div className="flex min-w-0 flex-col items-start space-y-3.5 text-left sm:items-center sm:text-center lg:col-span-6 lg:items-start lg:text-left">

          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-primary/20 bg-primary/5 px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary shadow-xs">
            <Star size={12} className="fill-primary text-primary shrink-0" />
            <span className="truncate max-w-55 sm:max-w-none">#1 ENTERPRISE CLOUD POS & OMNICHANNEL PLATFORM</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-start gap-3.5 sm:items-center lg:items-start"
            >
              <div className="flex flex-col gap-1.5 pt-0.5 sm:items-center lg:items-start">
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  {slide.badge}
                </span>
                <div className="h-1 w-12 bg-primary rounded-full"></div>
              </div>

              <h1 className="font-syne text-2xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-[2.2rem] xl:text-[2.6rem] max-w-152">
                {formatHeading(slide.heading)}
              </h1>

              <p className="max-w-136 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base lg:text-[1.1rem]">
                {slide.subheading}
              </p>

              {/* Feature Cards Row (Compact padding & sleek dimensions) */}
              <div className="grid w-full grid-cols-2 gap-2 pt-1 min-[480px]:grid-cols-3 lg:grid-cols-3 lg:gap-2">
                {slide.featureHighlights.map((feat, idx) => (
                  <div
                    key={feat}
                    className="flex flex-row items-center gap-2 rounded-xl border border-slate-100 bg-white/95 px-2.5 py-1.5 shadow-xs transition-transform hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none sm:px-2.5 sm:py-2 lg:flex-col xl:flex-row xl:gap-2.5"
                  >
                    <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-7.5 sm:w-7.5">
                      {getFeatureIcon(idx)}
                    </div>
                    <span className="text-left text-[10px] font-bold leading-tight text-slate-800 dark:text-slate-200 sm:text-[11px] lg:text-center xl:text-left">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex w-full flex-row items-center justify-start gap-2.5 pt-1 sm:w-auto sm:justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => openModal("Start Free Enterprise Trial", "HERO_FREE_TRIAL")}
                  className="group flex flex-1 min-w-0 min-h-11 cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#FF4F00] px-3 sm:px-8 py-3 font-syne text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-[#e64700] hover:shadow-primary/40 active:scale-95 whitespace-nowrap"
                >
                  <Rocket size={14} className="fill-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-0.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Start Free Trial</span>
                </button>
                <button
                  type="button"
                  onClick={() => openModal("Request Live Enterprise POS Demo", "HERO_REQUEST_DEMO")}
                  className="group flex flex-1 min-w-0 min-h-11 cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-xl border-2 border-slate-900 bg-transparent px-3 sm:px-8 py-3 font-syne text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white active:scale-95 dark:border-slate-100 dark:text-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900 whitespace-nowrap"
                >
                  <span>Request Demo</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4 shrink-0" />
                </button>
              </div>

              {/* Full-Width Seamless Continuous Scrolling News Ticker */}
              <div className="w-full mt-4 relative flex items-center rounded-xl border border-slate-200/80 bg-gradient-to-r from-orange-500/5 via-white to-slate-50/80 dark:from-orange-500/10 dark:via-slate-900/90 dark:to-slate-900/60 p-1.5 shadow-sm shadow-slate-200/50 dark:shadow-none overflow-hidden backdrop-blur-md min-h-10.5">
                {/* Left Badge */}
                <div className="relative z-20 flex items-center justify-center gap-1.5 shrink-0 rounded-lg bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm shadow-orange-500/30 select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <Newspaper size={12} className="shrink-0 text-white" />
                  <span>Updates</span>
                </div>

                {/* Gradients */}
                <div className="pointer-events-none absolute left-[92px] top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10" />

                {/* Content / Skeleton */}
                {isAnnouncementsLoading ? (
                  <div className="min-w-0 flex-1 flex items-center gap-4 ml-2 animate-pulse overflow-hidden select-none">
                    {/* Item 1: Update */}
                    <div className="inline-flex items-center gap-1.5 shrink-0">
                      <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-600/50 dark:bg-orange-500/20 dark:text-orange-400/50 border border-orange-500/20">
                        Update
                      </span>
                      <div className="h-3 w-32 sm:w-44 rounded bg-slate-300 dark:bg-slate-700" />
                      <span className="text-slate-400 dark:text-slate-600 text-xs hidden sm:inline">—</span>
                      <div className="h-2.5 w-44 sm:w-64 rounded bg-slate-200 dark:bg-slate-800 hidden sm:inline-block" />
                    </div>

                    <span className="text-slate-300 dark:text-slate-600 font-bold shrink-0">•</span>

                    {/* Item 2: Event */}
                    <div className="inline-flex items-center gap-1.5 shrink-0">
                      <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600/50 dark:bg-purple-500/20 dark:text-purple-400/50 border border-purple-500/20">
                        Event
                      </span>
                      <div className="h-3 w-28 sm:w-36 rounded bg-slate-300 dark:bg-slate-700" />
                      <span className="text-slate-400 dark:text-slate-600 text-xs hidden md:inline">—</span>
                      <div className="h-2.5 w-36 sm:w-52 rounded bg-slate-200 dark:bg-slate-800 hidden md:inline-block" />
                    </div>

                    <span className="text-slate-300 dark:text-slate-600 font-bold shrink-0 hidden md:inline">•</span>

                    {/* Item 3: Offer */}
                    <div className="inline-flex items-center gap-1.5 shrink-0 hidden lg:inline-flex">
                      <span className="inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600/50 dark:bg-emerald-500/20 dark:text-emerald-400/50 border border-emerald-500/20">
                        Offer
                      </span>
                      <div className="h-3 w-32 rounded bg-slate-300 dark:bg-slate-700" />
                      <span className="text-slate-400 dark:text-slate-600 text-xs">—</span>
                      <div className="h-2.5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                ) : (
                  /* Marquee Track */
                  <div className="min-w-0 flex-1 overflow-hidden ml-2">
                    <div className="flex w-max shrink-0 animate-[heroTickerScroll_85s_linear_infinite] hover:[animation-play-state:paused] items-center gap-6 text-[11px] font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                      {[1, 2].map((group) => (
                        <div key={group} className="flex items-center gap-6 shrink-0">
                          {announcements.map((item, idx) => (
                            <React.Fragment key={`${group}-${item.announcementId || idx}`}>
                              <Link
                                href={item.linkUrl || "/changelog"}
                                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#FF4F00]"
                              >
                                <span
                                  className={cn(
                                    "inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider",
                                    item.kind === "Event"
                                      ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                                      : item.kind === "Notice"
                                      ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                      : "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                                  )}
                                >
                                  {item.kind === "Notice" ? "Offer" : item.kind === "Event" ? "Event" : "Update"}
                                </span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</span>
                                {item.body && (
                                  <span className="text-slate-500 dark:text-slate-400">
                                    — {item.body}
                                  </span>
                                )}
                              </Link>
                              <span className="text-slate-300 dark:text-slate-600 font-bold">•</span>
                            </React.Fragment>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Visual Showcase (Vertically Centered with Left Column, Balanced Size) */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-visible lg:col-span-6 my-auto">

          {/* Dedicated iPad + Background Circles Centered Container */}
          <div className="relative w-full max-w-120 flex items-center justify-center">

            {/* Decorative Geometric Backgrounds (Exact Center of iPad Frame - Equal Dimensions) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] -z-10 pointer-events-none hidden lg:block">
              {/* White Circle (Left) */}
              <div className="absolute top-1/2 left-[-8%] -translate-y-1/2 w-[72%] aspect-square rounded-full bg-white dark:bg-slate-900/40 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-transparent" />
              {/* Orange Circle (Right - Identical width & height, perfectly centered vertically) */}
              <div className="absolute top-1/2 right-[-8%] -translate-y-1/2 w-[72%] aspect-square rounded-full bg-[#FF4F00] shadow-2xl shadow-[#FF4F00]/25" />

              {/* Dot Grid Top Right */}
              <div
                className="absolute top-[4%] right-[0%] w-36 h-36 opacity-30 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #FF4F00 2px, transparent 2px)', backgroundSize: '16px 16px' }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full z-10"
              >
                {/* Straight iPad Frame with Zoom in / Zoom out on hover */}
                <div className="group relative w-full aspect-4/3 transition-transform duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 rounded-xl lg:rounded-3xl bg-[#111] p-[0.3rem] lg:p-[0.55rem] shadow-xl lg:shadow-2xl border border-slate-800">

                    {/* Inner Screen with Full Rich Photography */}
                    <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-slate-900">
                      <Image
                        src={slide.backgroundImage}
                        alt={slide.heading}
                        fill
                        priority
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Subtle Screen Glare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
                    </div>

                    {/* Left/Right Slider Controls (Hover-Only for Clean Image Presentation) */}
                    <button
                      type="button"
                      aria-label="Previous Slide"
                      className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:text-white hover:border-[#FF4F00] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onPrev();
                      }}
                    >
                      <ChevronLeft size={18} className="stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Slide"
                      className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:text-white hover:border-[#FF4F00] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNext();
                      }}
                    >
                      <ChevronRight size={18} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Pagination Below iPad */}
          <div className="mt-4 lg:mt-5 flex items-center justify-center z-20">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${item.badge}`}
                className="flex h-7 w-7 items-center justify-center cursor-pointer group"
                onClick={() => onGoTo(i)}
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 shadow-sm bg-clip-padding",
                    i === activeIndex
                      ? "w-7 bg-[#FF4F00] shadow-md shadow-[#FF4F00]/30"
                      : "w-1.5 bg-slate-300/80 hover:bg-slate-400 dark:bg-slate-700/80 group-hover:bg-slate-400"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroView;
