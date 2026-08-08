// src/components/organisms/HeroSection/HeroView.tsx
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Zap, Sparkles, ArrowRight, ShieldCheck, Star, ChevronDown } from "lucide-react";
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
    const words = heading.split(' ');
    if (words.length <= 1) return heading;
    const lastWord = words.pop();
    const mainText = words.join(' ');
    
    return (
      <>
        {mainText}{' '}
        <span className="text-primary font-black">
          {lastWord}
        </span>
      </>
    );
  };

  return (
    <section
      className="relative w-full bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background Soft Glow Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 site-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Headline, Description, Features, CTAs & Micro-Trust (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
          
          {/* Top Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-black uppercase tracking-widest text-primary shadow-2xs">
            <Sparkles size={13} />
            <span>NEXT-GEN POS PLATFORM • OFFLINE-FIRST + CLOUD</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start w-full space-y-5"
            >
              {/* Badge Tag */}
              <span className="text-primary font-extrabold tracking-widest uppercase text-xs">
                {slide.badge}
              </span>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-syne font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                {formatHeading(slide.heading)}
              </h1>

              {/* Subheading */}
              <p className="max-w-xl text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {slide.subheading}
              </p>

              {/* Feature Highlight Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1">
                {slide.featureHighlights.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto pt-3">
                <button
                  type="button"
                  onClick={() => openModal("Start Free Trial", "HERO_FREE_TRIAL")}
                  className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs tracking-wider uppercase px-8 py-4 shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap size={16} className="fill-white" />
                  <span>Start Free Trial</span>
                </button>
                <button
                  type="button"
                  onClick={() => openModal("Request Live Demo", "HERO_REQUEST_DEMO")}
                  className="w-full sm:w-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-syne font-bold text-xs tracking-wider uppercase px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Request Demo</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Micro-Trust Social Proof Bar */}
              <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.9/5 Rating (2,400+ Merchant Reviews)</span>
                <span className="hidden sm:inline">• 50,000+ Active Registers</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Right Column: High-Tech Enterprise Terminal Device Frame Mockup */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center relative mt-6 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative w-full rounded-3xl p-3 sm:p-4 bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group"
            >
              {/* Mockup Window Top Header Dots */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">QUANTIX POS • SYSTEM READY</span>
                </div>
              </div>

              {/* Main Image Screen Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image
                  src={slide.backgroundImage}
                  alt={slide.heading}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle Image Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro Live Status Badges */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg z-20">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% Offline Mode Active</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg z-20">
                  <ShieldCheck size={12} className="text-primary" />
                  <span>PCI-DSS Tier 1 Encrypted</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Dots */}
          <div className="flex items-center justify-between w-full mt-4 px-2">
            {/* Dots */}
            <div className="flex space-x-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    i === activeIndex ? "bg-primary w-8" : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 w-2"
                  )}
                  onClick={() => onGoTo(i)}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                aria-label="Previous Slide"
                className="rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                onClick={onPrev}
              >
                <ChevronLeft size={16} className="stroke-[2.5]" />
              </button>
              <button
                type="button"
                aria-label="Next Slide"
                className="rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                onClick={onNext}
              >
                <ChevronRight size={16} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Animated Scroll Down Indicator (FRS-SPW-101) */}
      <a
        href="#products-showcase"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Scroll to Explore</span>
        <ChevronDown className="h-4 w-4 text-primary animate-bounce" />
      </a>
    </section>
  );
};

export default HeroView;
