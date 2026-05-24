// src/components/organisms/TestimonialBanner/TestimonialBanner.tsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatarColor?: string; // Tailwind color name, e.g. "blue-500"
  backgroundImage?: string;
}

interface Props {
  /** Array of testimonials to rotate through */
  items?: TestimonialItem[];
  /** Rotation interval in ms (default 6000) */
  intervalMs?: number;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "QUANTIX FEELS LIKE OUR THIRD ARM — IT LET US FOCUS ON HOSPITALITY, NOT PAPERWORK.",
    author: "James Chen",
    role: "GM, The Harbor Kitchen • Table 87",
    avatarColor: "bg-blue-600",
    backgroundImage: "/images/hero-restaurant.jpg"
  },
  {
    quote: "INVENTORY TRACKING ACROSS OUR THREE BOUTIQUES BECAME AN ABSOLUTE BREEZE. WE CANNOT IMAGINE GOING BACK.",
    author: "Elena Rostova",
    role: "Founder, Elena Atelier",
    avatarColor: "bg-indigo-600",
    backgroundImage: "/images/hero-retail.jpg"
  },
  {
    quote: "THE KITCHEN DISPLAY SYNC IS FLAWLESS. IT SHAVED 4 MINUTES OFF OUR AVERAGE TICKET TIMES DURING PEAK HOURS.",
    author: "Marcus Aurelius",
    role: "Operations Director, Roma Group Bistro",
    avatarColor: "bg-emerald-600",
    backgroundImage: "/images/hero-restaurant.jpg"
  }
];

/**
 * Full‑width dark section that cycles through testimonials.
 * Each slide fades in/out using Framer Motion.
 */
export const TestimonialBanner = ({
  items = DEFAULT_TESTIMONIALS,
  intervalMs = 6000
}: Props) => {
  const [active, setActive] = useState(0);

  // Auto‑rotate loop
  useEffect(() => {
    if (items.length <= 1) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs]);

  const current = items[active];

  // Safe guard: if no items provided, render nothing
  if (!current) {
    return null;
  }

  // Compute initials for avatar safely
  const initials = useMemo(() => {
    if (!current.author) return "";
    const parts = current.author.split(" ");
    return parts.map((p: string) => p[0]).join("").toUpperCase();
  }, [current.author]);

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[450px] overflow-hidden bg-slate-950">
      {/* Background Image transitions with cinematic Ken Burns & Grid overlays */}
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
              current.backgroundImage
                ? { backgroundImage: `url(${current.backgroundImage})` }
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
            
            <h2 className="text-2xl font-syne font-black uppercase md:text-4xl tracking-tight leading-tight max-w-3xl">
              {current.quote}
            </h2>
            
            <div className="flex items-center gap-4 pt-4">
              {/* Initials Avatar Capsule */}
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white shadow-md border border-white/15",
                  current.avatarColor || "bg-blue-600"
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

      {/* Slider Navigation Dots Indicators at Bottom Left */}
      <div className="absolute bottom-8 left-0 right-0 z-20 site-container">
        <div className="flex gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === active ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50"
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
