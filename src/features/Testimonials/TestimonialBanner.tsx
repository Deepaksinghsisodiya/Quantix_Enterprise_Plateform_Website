// src/features/Testimonials/TestimonialBanner.tsx
'use client';

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TestimonialDto } from "./Types/TestimonialsTypes";

export interface TestimonialBannerProps {
  testimonials: TestimonialDto[];
  isLoading: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialDto[] = [
  {
    id: "b1",
    quote: "With over 100 outlets synced to a single Cloud Ledger, Quantix is the backbone of our restaurant empire.",
    author: "Elena Rostova",
    role: "VP Operations, FoodFlow Group",
    industry: "Restaurant",
    avatarColor: "bg-indigo-600",
    initials: "ER"
  },
  {
    id: "b2",
    quote: "Offline checkout queues are non-existent now. Cashiers scan and bill customers continuously even during network outages.",
    author: "Marcus Vance",
    role: "Director of IT, Urban Outfitters EMEA",
    industry: "Retail",
    avatarColor: "bg-emerald-600",
    initials: "MV"
  }
];

export const TestimonialBanner: React.FC<TestimonialBannerProps> = ({
  testimonials,
  isLoading,
}) => {
  const displayTestimonials = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const [active, setActive] = useState(0);

  // Auto-rotate loop
  useEffect(() => {
    if (displayTestimonials.length <= 1) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [displayTestimonials]);

  const current = displayTestimonials[active];

  // Compute initials for avatar safely
  const initials = useMemo(() => {
    if (!current?.author) return "QT";
    const parts = current.author.split(" ");
    return parts.map((p: string) => p[0]).join("").toUpperCase().slice(0, 2);
  }, [current?.author]);

  // Fallback backgrounds based on industry
  const backgroundImage = useMemo(() => {
    if (!current) return "";
    return current.industry === "Restaurant" 
      ? "/images/hero-restaurant.jpg" 
      : "/images/hero-retail.jpg";
  }, [current]);

  const getAvatarColor = (idx: number) => {
    const colors = ["bg-blue-600", "bg-indigo-600", "bg-emerald-600", "bg-amber-600", "bg-purple-600"];
    return colors[idx % colors.length];
  };

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
  };

  if (isLoading) {
    return (
      <section className="relative w-full h-[65vh] min-h-[450px] bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 max-w-xl w-full px-6">
          <div className="rounded-full bg-slate-800 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-800 rounded"></div>
            <div className="space-y-3">
              <div className="h-2 bg-slate-800 rounded"></div>
              <div className="h-2 bg-slate-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (displayTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full h-[50vh] min-h-[380px] overflow-hidden bg-slate-950">
      {/* Background Image transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Ken Burns zooming container */}
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.01 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={
              backgroundImage
                ? { backgroundImage: `url(${backgroundImage})` }
                : { background: "linear-gradient(to bottom, #0A0F1D, #050811)" }
            }
          />
          {/* Left-to-Right cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
          
          {/* Top-and-Bottom blending gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />
          
          {/* High-tech engineering grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Quote & Author Slide Content */}
      <div className="relative z-10 flex h-full items-center justify-start site-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${active}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-4xl space-y-5 text-white text-left"
          >
            {/* Styled quotes marker */}
            <Quote className="h-10 w-10 text-blue-500/80 mb-2 rotate-180 shrink-0" />
            
            <h2 className="text-2xl font-syne font-black md:text-4xl tracking-tight leading-tight max-w-3xl">
              {current.quote}
            </h2>
            
            <div className="flex items-center gap-4 pt-4">
              {/* Initials Avatar Capsule */}
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white shadow-md border border-white/15",
                  current.avatarColor || getAvatarColor(active)
                )}
              >
                {initials}
              </div>
              <div>
                <p className="font-syne font-bold text-white text-sm tracking-wide">{current.author}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 site-container">
        <div className="flex gap-2.5">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === active ? "w-8 bg-blue-600" : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialBanner;
