// src/components/organisms/HeroSection/HeroView.tsx
// Pure UI — receives slides as props + carousel state handlers. Zero data or effects inside.
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  // Helper to split heading text and highlight the last word
  const formatHeading = (heading: string) => {
    const words = heading.toLowerCase().split(' ');
    if (words.length <= 1) return heading;
    const lastWord = words.pop();
    const mainText = words.join(' ');
    
    // Capitalize first letter of the first word
    const formattedMainText = mainText.charAt(0).toUpperCase() + mainText.slice(1);
    
    return (
      <>
        {formattedMainText}{' '}
        <span className="text-primary font-black lowercase first-letter:uppercase">{lastWord}</span>
      </>
    );
  };

  return (
    <section
      className="relative min-h-[55vh] lg:min-h-[65vh] w-full bg-white flex items-center pt-32 pb-10 lg:pt-[150px] lg:pb-12 overflow-hidden border-b border-slate-100"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0 opacity-30" />

      <div className="relative z-10 site-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Text & CTAs (6 cols on lg) */}
        <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start w-full"
            >
              {/* Badge (Top Tag) */}
              <span className="text-primary font-bold tracking-widest uppercase text-base sm:text-lg mb-4">
                {slides[activeIndex].badge}
              </span>

              {/* Heading */}
              <h1 className="mb-5 max-w-2xl text-4xl sm:text-5xl md:text-[3.5rem] font-syne font-black text-slate-900 leading-[1.1] tracking-tight">
                {formatHeading(slides[activeIndex].heading)}
              </h1>

              {/* Subheading */}
              <p className="mb-8 max-w-lg text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
                {slides[activeIndex].subheading}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row items-center gap-4">
                <Link
                  href={slides[activeIndex].primaryCta.href}
                  className="rounded-full bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-sm tracking-wider uppercase px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {slides[activeIndex].primaryCta.label}
                </Link>
                <Link
                  href={slides[activeIndex].secondaryCta.href}
                  className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm tracking-wider uppercase px-8 py-4 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-sm"
                >
                  {slides[activeIndex].secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Device Mockup Card (6 cols on lg) */}
        <div className="lg:col-span-6 w-full flex justify-center items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100/90 bg-slate-50 flex items-center justify-center group"
            >
              {/* Ken Burns image slider */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.04 }}
                transition={{ duration: 4.8, ease: "linear" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[activeIndex].backgroundImage}
                  alt={slides[activeIndex].heading}
                  fill
                  priority
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Hover card border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-30" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Navigation Controls (Chevron arrows on side of image) */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none z-20">
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-white shadow-lg border border-slate-200/80 p-2.5 text-slate-700 hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all duration-200"
              onClick={onPrev}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-white shadow-lg border border-slate-200/80 p-2.5 text-slate-700 hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all duration-200"
              onClick={onNext}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dot indicators at the bottom of the column */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "bg-primary w-6" : "bg-slate-300 hover:bg-slate-400"
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
