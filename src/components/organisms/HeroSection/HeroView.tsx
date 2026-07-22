// src/components/organisms/HeroSection/HeroView.tsx
// Pure UI — receives slides as props + carousel state handlers. Zero data or effects inside.
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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
  isPaused,
  onNext,
  onPrev,
  onGoTo,
  onTogglePause,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#06080F]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background image + Ken Burns zoom */}
      <AnimatePresence mode="wait">
        {slides.map((slide, i) =>
          i === activeIndex ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 5.2, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.backgroundImage}
                  alt={slide.heading}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dark gradient overlay + Foretek solutions style mesh-bg and aurora glow layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080F]/80 via-[#06080F]/20 to-[#06080F]/95 z-0" />
      <div className="absolute inset-0 mesh-bg opacity-[0.45] pointer-events-none z-0" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none z-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center md:items-start md:text-left site-container pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start w-full"
          >
            {/* Badge */}
            <div className="mb-4 flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-xs border border-white/5">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                {slides[activeIndex].badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-4 max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-extrabold tracking-tight uppercase text-white leading-[1.05]">
              {slides[activeIndex].heading}
            </h1>

            {/* Subheading */}
            <p className="mb-8 max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              {slides[activeIndex].subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center md:justify-start gap-4">
              <Link
                href={slides[activeIndex].primaryCta.href}
                className="rounded-full btn-gradient px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {slides[activeIndex].primaryCta.label}
              </Link>
              <Link
                href={slides[activeIndex].secondaryCta.href}
                className="rounded-full btn-ghost px-7 py-3.5 text-xs sm:text-sm font-bold active:scale-105 active:scale-95 transition-all duration-300"
              >
                {slides[activeIndex].secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow navigation */}
      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 md:p-3 text-white hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 z-20"
        onClick={onPrev}
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 md:p-3 text-white hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 z-20"
        onClick={onNext}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              i === activeIndex ? "bg-white w-8" : "bg-gray-500/80 hover:bg-gray-400"
            )}
            onClick={() => onGoTo(i)}
          />
        ))}
      </div>

      {/* Pause/Play */}
      <button
        type="button"
        aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 rounded-full bg-white/20 p-1.5 md:p-3 text-white hover:bg-white/30 transition-all duration-200 z-20"
        onClick={onTogglePause}
      >
        {isPaused ? <Play className="h-4 w-4 md:h-5 md:w-5" /> : <Pause className="h-4 w-4 md:h-5 md:w-5" />}
      </button>
    </section>
  );
};

export default HeroView;
