// src/components/organisms/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "../../../lib/utils";
import Link from "next/link";

/**
 * Data shape for each carousel slide.
 */
export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  backgroundImage: string; // URL – placeholder for now
}

const SLIDES: HeroSlide[] = [
  {
    id: "retail",
    badge: "RETAIL POS",
    heading: "SMARTER RETAIL STARTS HERE",
    subheading:
      "Sync inventory, manage staff, and delight customers across every location.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Explore Retail →", href: "#services" },
    backgroundImage: "/images/hero-retail.jpg",
  },
  {
    id: "restaurant",
    badge: "RESTAURANT POS",
    heading: "THE ALL-IN-ONE POS FOR RESTAURANTS",
    subheading:
      "Manage tables, orders, and kitchen flow in real time — all from one device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "Contact Sales →", href: "#contact" },
    backgroundImage: "/images/hero-restaurant.jpg",
  },
  {
    id: "cloud",
    badge: "CLOUD POS",
    heading: "RUN YOUR BUSINESS FROM THE CLOUD",
    subheading:
      "Access real-time sales data, inventory levels, and analytics from anywhere in the world on any device.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "See Pricing →", href: "#pricing" },
    backgroundImage: "/images/hero-cafe.jpg",
  },
  {
    id: "local",
    badge: "LOCAL BILLING POS",
    heading: "OFFLINE-FIRST LOCAL BILLING TERMINAL",
    subheading:
      "Keep selling even when the internet goes down. Seamless local billing with automatic cloud sync when reconnected.",
    primaryCta: { label: "Start Free Trial", href: "/sign-up" },
    secondaryCta: { label: "See Offline Mode →", href: "#services" },
    backgroundImage: "/images/hero-local.png",
  },
];

/**
 * HeroSection – full‑viewport carousel with dark overlay, badge, heading, sub‑heading,
 * two CTA buttons, navigation arrows, dot indicators, and pause/play control.
 */
const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto‑play effect (5 s interval)
  useEffect(() => {
    if (isPaused) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(goToNext, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, isPaused, goToNext]);

  const togglePause = () => setIsPaused((p) => !p);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image + dark gradient overlay */}
      <AnimatePresence mode="wait">
        {SLIDES.map((slide, i) =>
          i === activeIndex ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
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
          ) : null
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center md:items-start md:text-left site-container pt-20">
        {/* Badge */}
        <div className="mb-4 flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-xs border border-white/5">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-white">
            {SLIDES[activeIndex].badge}
          </span>
        </div>
        {/* Heading */}
        <h1 className="mb-4 max-w-4xl text-4xl sm:text-5xl font-display font-extrabold tracking-tight uppercase text-white md:text-7xl leading-[1.05]">
          {SLIDES[activeIndex].heading}
        </h1>
        {/* Sub‑heading */}
        <p className="mb-8 max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed">
          {SLIDES[activeIndex].subheading}
        </p>
        {/* CTA buttons */}
        <div className="flex flex-row items-center justify-center md:justify-start gap-4">
          <Link
            href={SLIDES[activeIndex].primaryCta.href}
            className="rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
          >
            {SLIDES[activeIndex].primaryCta.label}
          </Link>
          <Link
            href={SLIDES[activeIndex].secondaryCta.href}
            className="rounded-full bg-blue-600 px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-blue-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 cursor-pointer shadow-md"
          >
            {SLIDES[activeIndex].secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Arrow navigation – hidden on small screens */}
      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 md:left-8"
        onClick={goToPrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 md:right-8"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              i === activeIndex ? "bg-white w-8" : "bg-gray-500"
            )}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Pause / Play toggle */}
      <button
        type="button"
        aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        className="absolute bottom-8 right-8 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
        onClick={togglePause}
      >
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </button>
    </section>
  );
};

export default HeroSection;
