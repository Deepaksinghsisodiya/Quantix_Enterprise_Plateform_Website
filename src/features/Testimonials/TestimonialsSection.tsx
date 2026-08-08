// src/features/Testimonials/TestimonialsSection.tsx
'use client';

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "t2",
    quote: "Quantix changed how we run our boutique. Offline sync is so smooth, we never worry about losing connection during weekend rushes. Real-time stock alerts keep us prepared and customer billing takes half the time.",
    author: "Amanda Sterling",
    role: "Founder",
    companyName: "Bloom Retail Boutique",
    industry: "Retail",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "t3",
    quote: "The restaurant layout mapper is a total game-changer. Bill splits take seconds instead of minutes, increasing our seat turnover by 15% and saving staff overheads. Best POS decision we've ever made.",
    author: "Chef Giovanni",
    role: "Owner",
    companyName: "Bella Italia Bistro",
    industry: "Restaurant",
    avatarUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "t4",
    quote: "Offline checkout queues are non-existent now. Cashiers scan and bill customers continuously even during network outages. We scaled from 1 store to 5 in less than a year with the unified dashboard.",
    author: "Marcus Vance",
    role: "Operations Director",
    companyName: "Urban Wear Co.",
    industry: "Retail",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "t5",
    quote: "The interface is so clean. It takes less than 10 minutes to train new staff members on our checkout registers, saving us massive setup and onboarding time. The support team is also top-notch.",
    author: "Sarah Lindqvist",
    role: "General Manager",
    companyName: "Espresso House",
    industry: "Restaurant",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  isLoading,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullQuote, setShowFullQuote] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4 shadow-sm select-none">
            CLIENT TESTIMONIALS
          </div>
          <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white md:text-5xl leading-tight select-none">
            Why Businesses Like Yours <span className="text-primary">Choose Quantix</span>
          </h2>
        </div>

        {/* Carousel Layout Wrapper */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-12 select-none">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-[-10px] md:left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-md text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-[-10px] md:right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-md text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonial Active Card Wrapper */}
          <div className="overflow-hidden min-h-[300px] sm:min-h-[250px] md:min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {mounted && !isLoading && current && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row items-center gap-8 relative"
                >
                  
                  {/* Left Column: Avatar */}
                  <div className="relative shrink-0 select-none">
                    <div className="h-32 w-32 md:h-36 md:w-36 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-700 shadow-md relative group/avatar bg-slate-100 dark:bg-slate-800">
                      {current.avatarUrl ? (
                        <img
                          src={current.avatarUrl}
                          alt={current.author}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-3xl font-black bg-blue-600 text-white">
                          {current.initials || current.author.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Quotes & Info */}
                  <div className="flex-1 text-center md:text-left flex flex-col justify-between h-full space-y-4">
                    <div className="relative">
                      {/* Premium Quotes mark */}
                      <span className="absolute top-[-25px] left-[-15px] text-[70px] font-serif leading-none select-none text-slate-150 dark:text-slate-700 pointer-events-none">
                        “
                      </span>
                      
                      <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-medium pl-2 italic relative z-10">
                        {displayedQuote}
                        {shouldTruncate && (
                          <button
                            onClick={() => setShowFullQuote(!showFullQuote)}
                            className="text-primary hover:text-primary-light font-bold text-xs uppercase ml-2 tracking-wide hover:underline cursor-pointer inline-block"
                          >
                            {showFullQuote ? "SHOW LESS" : "SHOW MORE"}
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Author & Footer Elements */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/80">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {current.author}
                          <span className="text-slate-400 dark:text-slate-500 font-medium text-sm ml-2">
                            — {current.role}
                          </span>
                        </h4>
                        <p className="text-primary dark:text-primary-light font-extrabold uppercase text-[11px] tracking-wider mt-1">
                          {current.companyName || current.industry}
                        </p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dots Indicator Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 select-none">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                )}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
