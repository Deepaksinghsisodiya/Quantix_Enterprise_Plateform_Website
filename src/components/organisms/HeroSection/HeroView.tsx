// src/components/organisms/HeroSection/HeroView.tsx
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HeroSlide } from "./HeroData";

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

  const formatHeading = (heading: string) => {
    const words = heading.split(' ');
    if (words.length <= 1) return heading;
    const lastWord = words.pop();
    const mainText = words.join(' ');
    
    return (
      <>
        {mainText}{' '}
        <span className="text-primary dark:text-primary-light font-black">
          {lastWord}
        </span>
      </>
    );
  };

  return (
    <section
      className="relative w-full bg-white dark:bg-slate-950 pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-800/80 transition-colors"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-primary-dark/10 dark:bg-primary-dark/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 site-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Rich Content, Features & CTAs (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
          
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light">
              Next-Gen POS Platform • Offline-First + Multi-Tenant Cloud
            </span>
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
              {/* Category Tag */}
              <span className="text-primary dark:text-primary-light font-extrabold tracking-widest uppercase text-xs">
                {slide.badge}
              </span>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-syne font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                {formatHeading(slide.heading)}
              </h1>

              {/* Subheading */}
              <p className="max-w-xl text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {slide.subheading}
              </p>

              {/* Rich Feature Highlights List (3 Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1">
                {slide.featureHighlights.map((feat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 transition-all duration-200"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-light">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                      {feat}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto pt-3">
                <Link
                  href={slide.primaryCta.href}
                  className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap size={15} className="fill-white" />
                  {slide.primaryCta.label}
                </Link>
                <Link
                  href={slide.secondaryCta.href}
                  className="w-full sm:w-auto rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-extrabold text-xs tracking-wider uppercase px-8 py-4 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xs"
                >
                  {slide.secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Right Column: Floating 3D Device Artwork Card with levitation animation */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center relative mt-4 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                y: { repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }
              }}
              className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-primary/5 via-slate-50 to-primary-dark/5 dark:from-slate-900 dark:to-primary-dark/10 flex items-center justify-center group"
            >
              {/* Ken Burns image slider */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.04 }}
                transition={{ duration: 4.8, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.heading}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Hover card border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Navigation Controls (Chevron arrows on side of image) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 -right-3 sm:-left-4 sm:-right-4 flex justify-between pointer-events-none z-20">
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              onClick={onPrev}
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              onClick={onNext}
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Dot indicators cleanly positioned below the image card */}
          <div className="flex space-x-2.5 z-20 mt-4 sm:mt-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  i === activeIndex ? "bg-primary dark:bg-primary-light w-7" : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 w-2"
                )}
                onClick={() => onGoTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroView;
