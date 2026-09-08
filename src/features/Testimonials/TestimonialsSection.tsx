'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Building2, Star } from "lucide-react";
import { TestimonialDto } from "./Types/TestimonialsTypes";
import { motion, AnimatePresence } from "framer-motion";

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

  // Only live API testimonials - no dummy data
  const displayTestimonials = testimonials;

  if (isLoading) {
    return (
      <section className="scroll-mt-20 bg-slate-50 dark:bg-slate-900/40 py-10 sm:py-14 lg:py-20 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300" id="testimonials">
        <div className="site-container">
          {/* Header Skeleton */}
          <div className="text-center mb-12 lg:mb-16 flex flex-col items-center">
            <div className="h-6 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse mb-4" />
            <div className="h-10 sm:h-12 w-3/4 max-w-lg rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Card Skeleton */}
          <div className="relative mx-auto max-w-5xl px-0 select-none sm:px-14 md:px-12">
            <div className="w-full bg-white dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8 relative animate-pulse">
              {/* Avatar skeleton */}
              <div className="h-16 w-16 min-[400px]:h-20 min-[400px]:w-20 md:h-28 md:w-28 rounded-2xl md:rounded-3xl bg-slate-200 dark:bg-slate-700 shrink-0" />
              
              {/* Content skeleton */}
              <div className="flex-1 w-full flex flex-col justify-between space-y-4">
                {/* Star icons skeleton */}
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                  ))}
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700 ml-2" />
                </div>

                {/* Quotes lines skeleton */}
                <div className="space-y-2.5">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-11/12" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-4/5" />
                </div>

                {/* Author & company info skeleton */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex flex-col md:flex-row md:items-end justify-between gap-2">
                  <div className="space-y-1.5">
                    <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dots skeleton */}
            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              <div className="h-2 w-6 rounded-full bg-primary/40 animate-pulse" />
              <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </section>
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

  const current = displayTestimonials[activeIndex] || displayTestimonials[0];
  const maxChars = 180;
  const quoteText = current?.body || current?.quote || (current as any)?.content || "";
  const shouldTruncate = quoteText.length > maxChars;
  const displayedQuote = shouldTruncate && !showFullQuote
    ? `${quoteText.slice(0, maxChars)}...`
    : quoteText;

  const authorName = current?.personName || current?.person || current?.author || (current as any)?.name || "Enterprise Leader";
  const authorRole = current?.personRole || current?.theirRole || current?.role || (current as any)?.designation || "Operations Director";
  const companyName = current?.companyName || current?.company || (current as any)?.organization || current?.industry || "Enterprise Merchant";
  
  const rawRating = Number(current?.rating);
  const ratingCount = !isNaN(rawRating) && rawRating > 0 ? Math.min(5, Math.max(1, Math.round(rawRating))) : 5;
  
  // Resolve avatar URL from direct imageUrl / image or media asset file endpoint
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
    <section className="scroll-mt-20 bg-slate-50 dark:bg-slate-900/40 py-10 sm:py-14 lg:py-20 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300" id="testimonials">
      <div className="site-container">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-light mb-4 shadow-sm select-none">
            CLIENT TESTIMONIALS
          </div>
          <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white md:text-5xl leading-tight select-none">
            Trusted by Leaders <span className="text-primary">Across the Globe</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl px-0 select-none sm:px-14 md:px-12">
          {/* Desktop Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden sm:flex absolute left-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-md transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:text-primary active:scale-95 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-primary-light cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="hidden sm:flex absolute right-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-md transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:text-primary active:scale-95 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-primary-light cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden min-h-[300px] sm:min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isLoading && current && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50 || info.velocity.x > 300) {
                      handlePrev();
                    } else if (info.offset.x < -50 || info.velocity.x < -300) {
                      handleNext();
                    }
                  }}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8 relative cursor-grab touch-pan-y"
                >
                  <div className="relative shrink-0 select-none flex flex-col items-center">
                    {avatarImage ? (
                      <div className="h-16 w-16 min-[400px]:h-20 min-[400px]:w-20 md:h-28 md:w-28 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-primary/30 shadow-md relative bg-slate-100 dark:bg-slate-800">
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
                      <div className="h-16 w-16 min-[400px]:h-20 min-[400px]:w-20 md:h-28 md:w-28 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-primary/30 shadow-md relative group/avatar bg-gradient-to-br from-primary via-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white p-2 md:p-3">
                        <Building2 className="h-5 w-5 md:h-7 md:w-7 mb-0.5 text-white/90" />
                        <span className="text-base md:text-xl font-syne font-black tracking-wider">
                          {initials}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold text-white/85 uppercase tracking-widest mt-0.5">
                          VERIFIED
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                    {/* Stars & Title */}
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      {Array.from({ length: ratingCount }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      {current.title && (
                        <span className="text-xs font-syne font-bold text-slate-400 dark:text-slate-500 ml-2">
                          "{current.title}"
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <span className="hidden sm:inline-block absolute -top-6 -left-3.5 text-[60px] md:text-[70px] font-serif leading-none select-none text-slate-200 dark:text-slate-700 pointer-events-none">
                        “
                      </span>
                      
                      <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-medium sm:pl-2 italic relative z-10">
                        {displayedQuote}
                        {shouldTruncate && (
                          <button
                            type="button"
                            onClick={() => setShowFullQuote(!showFullQuote)}
                            className="text-primary hover:text-primary-light font-bold text-xs uppercase ml-1.5 tracking-wide hover:underline cursor-pointer inline-block"
                          >
                            {showFullQuote ? "SHOW LESS" : "SHOW MORE"}
                          </button>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/80">
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                          {authorName}
                          <span className="text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm ml-1.5">
                            — {authorRole}
                          </span>
                        </h4>
                        <p className="text-primary dark:text-primary-light font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider mt-0.5">
                          {companyName}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls on Mobile + Desktop Dots */}
          <div className="flex justify-center items-center gap-3 mt-6 sm:mt-8 select-none">
            <button
              type="button"
              onClick={handlePrev}
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className="flex h-7 w-7 items-center justify-center cursor-pointer group"
                  aria-label={`Go to testimonial slide ${index + 1}`}
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-6 bg-primary shadow-sm shadow-primary/30"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 group-hover:bg-slate-400"
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
