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
  // optional background image per testimonial
  backgroundImage?: string;
}

interface Props {
  /** Array of testimonials to rotate through */
  items?: TestimonialItem[];
  /** Rotation interval in ms (default 6000) */
  intervalMs?: number;
}

/**
 * Full‑width dark section that cycles through testimonials.
 * Each slide fades in/out using Framer Motion.
 */
export const TestimonialBanner = ({
  items = [
    {
      quote: "QUANTIX FEELS LIKE OUR THIRD ARM — IT LET US FOCUS ON HOSPITALITY, NOT PAPERWORK.",
      author: "James Chen",
      role: "GM, The Harbor Kitchen • Table 87",
      avatarColor: "blue-600",
      backgroundImage: "/images/hero-restaurant.jpg"
    }
  ],
  intervalMs = 6000
}: Props) => {
  const [active, setActive] = useState(0);

  // Auto‑rotate
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={
          current.backgroundImage
            ? { backgroundImage: `url(${current.backgroundImage})` }
            : { background: "linear-gradient(to bottom, #1a1a1a, #111111)" }
        }
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative flex h-[60vh] items-center justify-start site-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.quote}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-4xl space-y-4 text-white text-left"
          >
            <div className="text-blue-500 text-5xl font-serif leading-none select-none">“</div>
            <h2 className="text-2xl font-black uppercase md:text-4xl tracking-tight leading-tight max-w-3xl">
              {current.quote}
            </h2>
            <div className="flex items-center gap-4 pt-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white bg-blue-600 shadow-md"
              >
                {initials}
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-wide">{current.author}</p>
                <p className="text-xs text-slate-400 mt-0.5">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TestimonialBanner;
