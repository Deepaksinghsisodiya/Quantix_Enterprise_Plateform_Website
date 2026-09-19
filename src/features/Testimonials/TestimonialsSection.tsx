'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Quote,
  Sparkles
} from "lucide-react";
import { TestimonialDto } from "./Types/TestimonialsTypes";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_TESTIMONIALS } from "./constants/defaultTestimonials";

export interface TestimonialsSectionProps {
  testimonials?: TestimonialDto[];
  isLoading?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = [],
  isLoading = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullQuote, setShowFullQuote] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  
  // Touch swipe support without hijacking mobile vertical scrolling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  if (isLoading) {
    return (
      <div className="w-full py-8 sm:py-14 lg:py-20">
        <div className="site-container">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="h-5 w-32 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />
            <div className="h-8 sm:h-10 w-2/3 max-w-md rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 rounded-2xl sm:rounded-3xl animate-pulse space-y-4">
              <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (displayTestimonials.length === 0) {
    return null;
  }

  const handleNext = () => {
    setShowFullQuote(false);
    setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const handlePrev = () => {
    setShowFullQuote(false);
    setActiveIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const handleDotClick = (index: number) => {
    setShowFullQuote(false);
    setActiveIndex(index);
  };

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = displayTestimonials[activeIndex] || displayTestimonials[0];
  const maxChars = 240;
  const quoteText = current?.body || current?.quote || (current as any)?.content || "";
  const shouldTruncate = quoteText.length > maxChars;
  const displayedQuote = shouldTruncate && !showFullQuote
    ? `${quoteText.slice(0, maxChars)}...`
    : quoteText;

  const authorName = current?.personName || current?.person || current?.author || (current as any)?.name || "Enterprise Leader";
  const authorRole = current?.personRole || current?.theirRole || current?.role || (current as any)?.designation || "Operations Director";
  const companyName = current?.companyName || current?.company || (current as any)?.organization || current?.industry || "Enterprise Chain";
  const industry = current?.industry || "Enterprise";
  const highlightStat = current?.highlightStat;
  const statLabel = current?.statLabel;

  const rawRating = Number(current?.rating);
  const ratingCount = !isNaN(rawRating) && rawRating > 0 ? Math.min(5, Math.max(1, Math.round(rawRating))) : 5;

  const rawAvatarImage = current?.imageUrl || current?.image || current?.avatarUrl || (current?.mediaAssetId ? `/api/v1/media/${current.mediaAssetId}/file` : undefined);
  const avatarImage = rawAvatarImage && !failedImages[rawAvatarImage] ? rawAvatarImage : undefined;

  const initials = authorName
    .split(' ')
    .filter(Boolean)
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'Q';

  return (
    <div className="w-full py-12 lg:py-14 overflow-hidden">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-light mb-2.5 select-none">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>CLIENT TESTIMONIALS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-black text-slate-900 dark:text-white tracking-tight leading-tight select-none">
            Trusted by Leaders <span className="text-primary">Across the Globe</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-xl mx-auto">
            Real enterprise operations leaders and multi-chain brands sharing measurable outcomes achieved with Quantix.
          </p>
        </div>

        {/* Testimonial Card Container */}
        <div className="relative mx-auto max-w-4xl select-none">
          {/* Desktop Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-primary hover:text-white hover:border-primary active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Desktop Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md hover:bg-primary hover:text-white hover:border-primary active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>

          {/* Card Surface */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg shadow-slate-200/40 dark:shadow-black/30 relative"
              >
                {/* Background soft ambient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />

                {/* 1. Header: Author Identity + Rating Stars */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  {/* Left: Avatar + Author Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {avatarImage ? (
                        <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-xl overflow-hidden border-2 border-primary/30 shadow-sm bg-slate-100 dark:bg-slate-800">
                          <img
                            src={avatarImage}
                            alt={authorName}
                            onError={() => {
                              if (rawAvatarImage) {
                                setFailedImages((prev) => ({ ...prev, [rawAvatarImage]: true }));
                              }
                            }}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-xl bg-gradient-to-br from-[#FF4F00] via-[#FF6B2B] to-amber-500 flex flex-col items-center justify-center text-white shadow-sm shrink-0">
                          <span className="text-sm sm:text-base font-syne font-black tracking-tight leading-none">
                            {initials}
                          </span>
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white dark:border-slate-900" title="Verified Client">
                        <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                    </div>

                    {/* Author text (No truncate cutting off names!) */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                          {authorName}
                        </h3>
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {authorRole}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary dark:text-primary-light mt-0.5">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span className="leading-tight">{companyName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stars + Industry Pill */}
                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pt-1 sm:pt-0">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: ratingCount }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 uppercase tracking-wider">
                      {industry}
                    </span>
                  </div>
                </div>

                {/* 2. Quote Body */}
                <div className="py-3 sm:py-5 relative">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/15 dark:text-primary/20 absolute -top-1 -left-1 pointer-events-none" />
                  
                  <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium relative z-10 pl-2">
                    "{displayedQuote}"
                    {shouldTruncate && (
                      <button
                        type="button"
                        onClick={() => setShowFullQuote(!showFullQuote)}
                        className="text-primary hover:text-primary-light font-bold text-xs uppercase ml-1.5 tracking-wide hover:underline cursor-pointer inline-block"
                      >
                        {showFullQuote ? "Show less" : "Read more"}
                      </button>
                    )}
                  </p>
                </div>

                {/* 3. Highlight ROI Stat */}
                {highlightStat && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 w-fit">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs font-black tracking-tight">{highlightStat}</span>
                      {statLabel && (
                        <>
                          <span className="text-emerald-400 dark:text-emerald-600 text-[10px]">•</span>
                          <span className="text-[10px] sm:text-xs font-medium text-emerald-600/90 dark:text-emerald-400/90">{statLabel}</span>
                        </>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Multi-location Deployment
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Mobile Prev/Next + Dots + Counter */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 px-1 select-none">
            {/* Slide counter */}
            <div className="text-xs font-syne font-bold text-slate-500 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-black">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-slate-300 dark:text-slate-700">/</span>
              <span>{String(displayTestimonials.length).padStart(2, '0')}</span>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className="p-1.5 cursor-pointer group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-6 sm:w-7 bg-primary shadow-sm shadow-primary/30"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 group-hover:bg-slate-400"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Touch Arrows */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={handlePrev}
                className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm active:scale-90 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm active:scale-90 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Case Studies CTA */}
          <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Looking for quantified enterprise ROI and real case studies?
            </span>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark underline-offset-4 hover:underline transition-colors group"
            >
              <span>Explore All Case Studies & Stories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
