// src/components/organisms/QuantixToolsSection/QuantixToolsSection.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useIndustry } from "@/context/IndustryContext";

export interface ToolItem {
  id: string;
  title: string;
  image: string;
  bgClass: string;
}

const QUANTIX_TOOLS: ToolItem[] = [
  {
    id: "restaurant-pos",
    title: "Restaurant POS Software",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#FFF9F5] dark:bg-amber-950/5" // Warm off-white
  },
  {
    id: "retail-pos",
    title: "Retail POS Software",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#F5F5F3] dark:bg-slate-900/10" // Light neutral
  },
  {
    id: "cloud-sync",
    title: "Cloud Sync & Analytics",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#E7DFFC] dark:bg-indigo-950/10" // Lavender
  },
  {
    id: "mobile-apps",
    title: "Branded Mobile Apps",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#FBE6E8] dark:bg-rose-950/10" // Blush pink
  },
  {
    id: "websites",
    title: "E-Commerce Websites",
    image: "https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#FFF9F5] dark:bg-amber-950/5" // Warm off-white
  },
  {
    id: "kitchen-display",
    title: "Kitchen Display App",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#D3EFD8] dark:bg-green-950/10" // Mint green
  },
  {
    id: "grocery",
    title: "Grocery & Supermarket",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#E6F6F5] dark:bg-teal-950/10" // Soft Teal
  },
  {
    id: "cafes",
    title: "Cafe & Coffee Systems",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&h=300&q=80",
    bgClass: "bg-[#E7DFFC] dark:bg-purple-950/10" // Lavender
  }
];

export const QuantixToolsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Triple the list to enable infinite gapless scrolling in both directions
  const tripledTools = [...QUANTIX_TOOLS, ...QUANTIX_TOOLS, ...QUANTIX_TOOLS];
  
  // Card width (300px) + gap (24px) = 324px
  const cardWidth = 324;
  const singleSetWidth = QUANTIX_TOOLS.length * cardWidth;

  // Initialize scroll position to the second set (middle)
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollLeft = singleSetWidth;
    }
  }, [singleSetWidth]);

  // Infinite smooth scrolling marquee logic using requestAnimationFrame
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isHovered) return undefined;

    let animationFrameId: number;
    const speed = 0.9; // Smooth scrolling speed (pixels per frame)

    const scrollLoop = () => {
      if (!container) return;

      container.scrollLeft += speed;

      // Reset seamlessly if scrolled past bounds
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft < singleSetWidth) {
        container.scrollLeft += singleSetWidth;
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, singleSetWidth]);

  const animatingRef = useRef(false);

  // Custom smooth easing scroll animation (slow and gentle)
  const animateScroll = (element: HTMLDivElement, to: number, duration: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart easing formula (slows down beautifully at the end)
      const ease = 1 - Math.pow(1 - progress, 4);
      
      element.scrollLeft = start + change * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animatingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  // Click handler to slide card-by-card manually
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container && !animatingRef.current) {
      let currentScroll = container.scrollLeft;

      // Normalize scroll position before applying step if it drifts out of bounds
      if (currentScroll >= singleSetWidth * 2) {
        currentScroll -= singleSetWidth;
        container.scrollLeft = currentScroll;
      } else if (currentScroll < singleSetWidth) {
        currentScroll += singleSetWidth;
        container.scrollLeft = currentScroll;
      }

      const target = direction === "left" 
        ? currentScroll - cardWidth 
        : currentScroll + cardWidth;

      // Animates over 1200ms (1.2s) for a very slow, premium transition
      animateScroll(container, target, 1200);
    }
  };

  return (
    <section 
      className="w-full bg-white dark:bg-slate-950 py-16 sm:py-24 border-b border-slate-100 dark:border-slate-800/80 overflow-hidden relative transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Scrollbar hide styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="site-container px-4 relative z-10">
        {/* Header content - Clean & minimal */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4 shadow-sm select-none">
            PLATFORM MODULES
          </div>
          <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white md:text-5xl leading-tight select-none">
            Accelerate Your Growth with <span className="text-primary">Quantix Software</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto select-none">
            Deploy custom retail checkout, restaurant kitchen routing, branded mobile apps, and synced database services tailored to scale your brand.
          </p>
        </div>
      </div>

      {/* Carousel Slider Wrapper - OUTSIDE site-container to make it full width */}
      <div className="group/slider relative w-full select-none my-6 z-10">
        
        {/* Slide buttons that fade in on hover (Clean Glassmorphism design) */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 md:left-8 top-[36%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border border-slate-200/50 dark:border-slate-700/50 shadow-md text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary dark:hover:border-primary transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Slide left"
        >
          <ChevronLeft size={22} className="stroke-[2.5]" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 md:right-8 top-[36%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-800/90 border border-slate-200/50 dark:border-slate-700/50 shadow-md text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary dark:hover:border-primary transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Slide right"
        >
          <ChevronRight size={22} className="stroke-[2.5]" />
        </button>

        {/* Scrollable list with left padding aligning to the grid, but overflowing to the right */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 w-full select-none"
        >
          {tripledTools.map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className="w-[300px] shrink-0 select-none group/card flex flex-col items-center"
            >
              {/* Square (Sharp corner) Image Card Box with unique background color - rounded-none matches screenshot exactly */}
              <div className={cn(
                "w-full aspect-[4/3] rounded-none overflow-hidden border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center p-5 transition-all duration-500 group-hover/card:shadow-md group-hover/card:scale-[1.015]",
                tool.bgClass
              )}>
                {/* Square Inner Image Container */}
                <div className="h-full w-full rounded-none overflow-hidden bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/60 relative">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title below the card, outside the background wrapper */}
              <div className="mt-4 text-center">
                <span className="text-[13px] font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-widest block transition-colors duration-300 group-hover/card:text-primary">
                  {tool.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Request Quote CTA Button */}
      <div className="flex justify-center mt-12 select-none relative z-10">
        <Link
          href="/contact/sales"
          className="rounded-full bg-primary hover:bg-primary-light active:bg-primary-dark text-white font-extrabold text-xs tracking-widest uppercase px-8 py-4.5 shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          REQUEST A QUOTE
          <ChevronRight size={13} className="stroke-[3]" />
        </Link>
      </div>

    </section>
  );
};

export default QuantixToolsSection;
