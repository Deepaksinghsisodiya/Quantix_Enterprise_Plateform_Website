// src/components/organisms/QuantixToolsSection/QuantixToolsSection.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

import { useIndustry } from "@/context/IndustryContext";

export interface ToolItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  accentColor: string;
  bgClass: string;
}

const QUANTIX_TOOLS: ToolItem[] = [
  {
    id: "restaurant-pos",
    title: "Restaurant POS",
    subtitle: "Table service, split billing & floor maps",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-amber-500 to-orange-500",
    bgClass: "bg-[#FFF9F5] dark:bg-amber-950/5"
  },
  {
    id: "retail-pos",
    title: "Retail POS",
    subtitle: "Barcode, inventory & checkout registers",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-blue-500 to-indigo-500",
    bgClass: "bg-[#F0F4FF] dark:bg-slate-900/10"
  },
  {
    id: "cloud-sync",
    title: "Cloud Analytics",
    subtitle: "Real-time BI dashboards & sync",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-violet-500 to-purple-500",
    bgClass: "bg-[#F3EEFF] dark:bg-indigo-950/10"
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    subtitle: "Branded iOS & Android ordering apps",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-rose-500 to-pink-500",
    bgClass: "bg-[#FFF0F3] dark:bg-rose-950/10"
  },
  {
    id: "websites",
    title: "Online Store",
    subtitle: "E-commerce websites & direct ordering",
    image: "https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-emerald-500 to-teal-500",
    bgClass: "bg-[#EEFBF5] dark:bg-amber-950/5"
  },
  {
    id: "kitchen-display",
    title: "Kitchen Display",
    subtitle: "Prep timers, order flow & routing",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-green-500 to-emerald-500",
    bgClass: "bg-[#EEFBF0] dark:bg-green-950/10"
  },
  {
    id: "grocery",
    title: "Grocery & Mart",
    subtitle: "Weigh-scale, bulk pricing & quick scan",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-teal-500 to-cyan-500",
    bgClass: "bg-[#EEFBFB] dark:bg-teal-950/10"
  },
  {
    id: "cafes",
    title: "Cafe Systems",
    subtitle: "Quick-serve counter & loyalty rewards",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&h=300&q=80",
    accentColor: "from-purple-500 to-violet-500",
    bgClass: "bg-[#F5F0FF] dark:bg-purple-950/10"
  }
];

export const QuantixToolsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Triple the list to enable infinite gapless scrolling in both directions
  const tripledTools = [...QUANTIX_TOOLS, ...QUANTIX_TOOLS, ...QUANTIX_TOOLS];
  
  // Card width (320px) + gap (24px) = 344px
  const cardWidth = 344;
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
    const speed = 0.7;

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

  // Custom smooth easing scroll animation
  const animateScroll = (element: HTMLDivElement, to: number, duration: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

      animateScroll(container, target, 1000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white dark:bg-slate-950 py-16 sm:py-20 lg:py-28 overflow-hidden relative transition-colors duration-300"
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

      {/* Subtle background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-50/50 dark:bg-blue-950/10 blur-[120px] pointer-events-none" />

      <div className="site-container px-4 relative z-10">
        {/* Header content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-5 shadow-sm select-none">
            <Sparkles className="h-3.5 w-3.5 fill-blue-100" />
            PLATFORM MODULES
          </div>
          <h2 className="text-3xl font-syne font-black text-gray-900 dark:text-white md:text-5xl leading-tight select-none">
            Accelerate Your Growth with{" "}
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-clip-text text-transparent">
              Quantix Software
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto select-none">
            Deploy custom retail checkout, restaurant kitchen routing, branded mobile apps, and synced database services tailored to scale your brand.
          </p>
        </motion.div>
      </div>

      {/* Carousel Slider Wrapper - OUTSIDE site-container to make it full width */}
      <div className="group/slider relative w-full select-none my-4 z-10">
        
        {/* Slide buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-4 md:left-8 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/95 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/50 shadow-lg text-gray-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Slide left"
        >
          <ChevronLeft size={22} className="stroke-[2.5]" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-4 md:right-8 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/95 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700/50 shadow-lg text-gray-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 opacity-0 group-hover/slider:opacity-100 cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Slide right"
        >
          <ChevronRight size={22} className="stroke-[2.5]" />
        </button>

        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Scrollable list */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 w-full select-none"
        >
          {tripledTools.map((tool, index) => (
            <motion.div
              key={`${tool.id}-${index}`}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[320px] shrink-0 select-none group/card flex flex-col cursor-pointer"
              onMouseEnter={() => setHoveredCard(`${tool.id}-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Card */}
              <div className={cn(
                "w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800/80 flex items-center justify-center p-4 transition-all duration-500 group-hover/card:shadow-xl group-hover/card:shadow-gray-200/50 dark:group-hover/card:shadow-none group-hover/card:scale-[1.02] relative",
                tool.bgClass
              )}>
                {/* Inner Image Container */}
                <div className="h-full w-full rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm relative">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-end p-4"
                  )}>
                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-500 delay-100">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Accent color bar at bottom of card */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover/card:opacity-100 transition-opacity duration-500",
                  tool.accentColor
                )} />
              </div>

              {/* Title + Subtitle below the card */}
              <div className="mt-4 text-center px-2">
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-slate-200 uppercase tracking-widest transition-colors duration-300 group-hover/card:text-blue-600">
                  {tool.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 dark:text-slate-500 font-medium">
                  {tool.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Centered Request Quote CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mt-14 select-none relative z-10"
      >
        <Link
          href="/contact/sales"
          className="rounded-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-extrabold text-xs tracking-widest uppercase px-8 py-4 shadow-xl shadow-gray-900/15 dark:shadow-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group"
        >
          REQUEST A QUOTE
          <ArrowRight size={14} className="stroke-[2.5] transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

    </section>
  );
};

export default QuantixToolsSection;
