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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSlide } from "./HeroData";
import { useContactModal } from "@/context/ContactModalContext";

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
      case 0: return <Building2 size={18} className="text-primary" />;
      case 1: return <CloudUpload size={18} className="text-primary" />;
      case 2: return <Boxes size={18} className="text-primary" />;
      default: return <Star size={18} className="text-primary" />;
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-24 pb-10 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 lg:min-h-200 lg:pt-36 lg:pb-24 xl:min-h-212.5 xl:pt-40 xl:pb-28"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onMouseEnter();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onMouseLeave();
      }}
    >
      <div className="site-container relative z-10 grid grid-cols-1 content-start items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">

        {/* LEFT COLUMN: Content */}
        <div className="flex min-w-0 flex-col items-start space-y-4 text-left sm:items-center sm:text-center lg:col-span-6 lg:items-start lg:text-left">

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
              className="flex w-full flex-col items-start gap-4 sm:items-center lg:items-start"
            >
              <div className="flex flex-col gap-2 pt-2 sm:items-center lg:items-start">
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

              {/* Feature Cards Row */}
              <div className="grid w-full grid-cols-2 gap-2 pt-2 min-[480px]:grid-cols-3 lg:grid-cols-3 lg:gap-3">
                {slide.featureHighlights.map((feat, idx) => (
                  <div
                    key={feat}
                    className="flex flex-row items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-2 shadow-xs transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none sm:rounded-2xl sm:px-4 sm:py-3 sm:shadow-lg sm:shadow-slate-200/30 lg:flex-col xl:flex-row xl:gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-10 sm:w-10">
                      {getFeatureIcon(idx)}
                    </div>
                    <span className="text-left text-[10px] font-bold leading-tight text-slate-800 dark:text-slate-200 sm:text-xs lg:text-center xl:text-left">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex w-full flex-row items-center justify-start gap-2.5 pt-2 sm:w-auto sm:justify-center lg:justify-start">
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

              {/* Trust Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Trusted by 1,000+</span> enterprise chains, franchise groups, and retail networks globally.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: 3D Visual Showcase */}
        <div className="relative mt-6 flex w-full flex-col items-center justify-center overflow-visible lg:col-span-6 lg:mt-0 lg:h-162.5">

          {/* Decorative Geometric Backgrounds */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] -z-10 pointer-events-none hidden lg:block">
            {/* White/Light Gray Circle */}
            <div className="absolute top-[5%] left-[-10%] w-[70%] aspect-square rounded-full bg-slate-50 dark:bg-slate-900/40 shadow-2xl shadow-slate-200/50 dark:shadow-none" />
            {/* Orange Crescent/Circle */}
            <div className="absolute top-[5%] right-[-5%] w-[55%] aspect-square rounded-full bg-[#FF4F00] shadow-2xl shadow-[#FF4F00]/20" />

            {/* Dot Grid Top Right */}
            <div
              className="absolute top-[12%] right-[10%] w-48 h-48 opacity-40"
              style={{ backgroundImage: 'radial-gradient(circle, #FF4F00 2px, transparent 2px)', backgroundSize: '16px 16px' }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-135 z-10"
            >
              <div className="group relative w-full aspect-4/3 transform-gpu transition-transform duration-500 lg:perspective-[1500px] lg:transform-[rotateX(4deg)_rotateY(-6deg)_rotateZ(1deg)] hover:lg:transform-[rotateX(2deg)_rotateY(-4deg)_scale(1.01)]">
                {/* iPad Frame (Flat on mobile, 3D on desktop) */}
                <div className="absolute inset-0 rounded-xl lg:rounded-4xl bg-[#111] p-[0.3rem] lg:p-[0.6rem] shadow-xl lg:shadow-[20px_30px_50px_-15px_rgba(0,0,0,0.5)] border border-slate-800">

                  {/* Inner Screen */}
                  <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-white">
                    <Image
                      src={slide.backgroundImage}
                      alt={slide.heading}
                      fill
                      priority
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Subtle Screen Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
                  </div>

                  {/* Left/Right Slider Controls */}
                  <button
                    type="button"
                    aria-label="Previous Slide"
                    className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:text-white hover:border-[#FF4F00] hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPrev();
                    }}
                  >
                    <ChevronLeft size={20} className="stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next Slide"
                    className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:text-white hover:border-[#FF4F00] hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNext();
                    }}
                  >
                    <ChevronRight size={20} className="stroke-[2.5]" />
                  </button>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Pagination Below iPad */}
          <div className="mt-6 lg:mt-8 flex items-center justify-center z-20">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${item.badge}`}
                className="flex h-8 w-8 items-center justify-center cursor-pointer group"
                onClick={() => onGoTo(i)}
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 shadow-sm bg-clip-padding",
                    i === activeIndex
                      ? "w-8 bg-white/90 border border-slate-200 shadow-md"
                      : "w-2 bg-slate-300/80 hover:bg-slate-400 dark:bg-slate-700/80 group-hover:bg-slate-400"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('products-showcase')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 opacity-70 transition-opacity hover:opacity-100 md:flex bg-transparent border-0 outline-none"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Scroll to Explore
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full animate-bounce">
          <ChevronDown className="h-4 w-4 text-primary" />
        </div>
      </button>
    </section>
  );
};

export default HeroView;

