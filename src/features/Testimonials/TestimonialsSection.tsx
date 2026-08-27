// src/features/Testimonials/TestimonialsSection.tsx
'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { TestimonialDto } from "./Types/TestimonialsTypes";
import { motion, AnimatePresence } from "framer-motion";

export interface TestimonialsSectionProps {
  testimonials: TestimonialDto[];
  isLoading: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialDto[] = [
  {
    id: "t1",
    quote: "With over 100 outlets synced to a single Cloud Ledger, Quantix is the backbone of our restaurant empire. Real-time analytics and centralized control have transformed our operations.",
    author: "Elena Rostova",
    role: "VP Operations",
    companyName: "FoodFlow Group",
    industry: "Restaurant",
  },
  {
    id: "t2",
    quote: "Quantix changed how we run our boutique. Offline sync is so smooth, we never worry about losing connection during weekend rushes. Real-time stock alerts keep us prepared and customer billing takes half the time.",
    author: "Amanda Sterling",
    role: "Founder",
    companyName: "Bloom Retail Boutique",
    industry: "Retail",
  },
  {
    id: "t3",
    quote: "The restaurant layout mapper is a total game-changer. Bill splits take seconds instead of minutes, increasing our seat turnover by 15% and saving staff overheads. Best POS decision we've ever made.",
    author: "Chef Giovanni",
    role: "Owner",
    companyName: "Bella Italia Bistro",
    industry: "Restaurant",
  },
  {
    id: "t4",
    quote: "Offline checkout queues are non-existent now. Cashiers scan and bill customers continuously even during network outages. We scaled from 1 store to 5 in less than a year with the unified dashboard.",
    author: "Marcus Vance",
    role: "Operations Director",
    companyName: "Urban Wear Co.",
    industry: "Retail",
  },
  {
    id: "t5",
    quote: "The interface is so clean. It takes less than 10 minutes to train new staff members on our checkout registers, saving us massive setup and onboarding time. The support team is also top-notch.",
    author: "Sarah Lindqvist",
    role: "General Manager",
    companyName: "Espresso House",
    industry: "Restaurant",
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  isLoading,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullQuote, setShowFullQuote] = useState(false);

  const displayTestimonials = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

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

  const current = displayTestimonials[activeIndex];
  const maxChars = 150;
  const shouldTruncate = current?.quote.length > maxChars;
  const displayedQuote = shouldTruncate && !showFullQuote
    ? `${current.quote.slice(0, maxChars)}...`
    : current?.quote;

  return (
    <section className="scroll-mt-20 bg-slate-50 dark:bg-slate-900/40 py-10 sm:py-14 lg:py-20 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300" id="testimonials">
      <div className="site-container">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-light mb-4 shadow-sm select-none">
            CLIENT TESTIMONIALS
          </div>
          <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white md:text-5xl leading-tight select-none">
            Why Businesses Like Yours <span className="text-primary">Choose Quantix</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl px-0 select-none sm:px-14 md:px-12">
          {/* Desktop Navigation Arrows (hidden on mobile) */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden sm:flex absolute left-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-md transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:text-primary active:scale-95 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-primary-light"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="hidden sm:flex absolute right-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-md transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:text-primary active:scale-95 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-primary-light"
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
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 p-5 sm:p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8 relative cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  {/* Avatar Block */}
                  <div className="relative shrink-0 select-none flex flex-col items-center">
                    <div className="h-16 w-16 min-[400px]:h-20 min-[400px]:w-20 md:h-28 md:w-28 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-primary/20 dark:border-primary/30 shadow-md relative group/avatar bg-gradient-to-br from-primary via-orange-600 to-amber-600 flex flex-col items-center justify-center text-white p-2 md:p-3">
                      <Building2 className="h-5 w-5 md:h-7 md:w-7 mb-0.5 text-white/90" />
                      <span className="text-base md:text-xl font-syne font-black tracking-wider">
                        {current.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-bold text-white/85 uppercase tracking-widest mt-0.5">
                        VERIFIED
                      </span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="flex-1 text-center md:text-left flex flex-col justify-between h-full space-y-3 sm:space-y-4">
                    <div className="relative">
                      <span className="hidden sm:inline-block absolute -top-6 -left-3.5 text-[60px] md:text-[70px] font-serif leading-none select-none text-slate-200 dark:text-slate-700 pointer-events-none">
                        &ldquo;
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
                          {current.author}
                          <span className="text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm ml-1.5">
                            — {current.role}
                          </span>
                        </h4>
                        <p className="text-primary dark:text-primary-light font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider mt-0.5">
                          {current.companyName || current.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile arrows + Dot pagination */}
          <div className="flex justify-center items-center gap-3 mt-6 sm:mt-8 select-none">
            <button
              type="button"
              onClick={handlePrev}
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
              className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
