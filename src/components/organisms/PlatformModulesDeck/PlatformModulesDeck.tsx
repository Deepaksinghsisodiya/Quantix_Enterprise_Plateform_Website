"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  LineChart,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

export type PlatformModule = {
  id: string;
  category: "checkout" | "operations" | "enterprise";
  title: string;
  description: string;
  badge: string;
  specBadge: string;
  highlights: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const PLATFORM_DECK_MODULES: PlatformModule[] = [
  {
    id: "cloud-pos",
    category: "checkout",
    title: "Cloud POS Mesh Till",
    description: "High-throughput cashier checkout that continues ringing sales even when the WAN drops with automatic peer till sync.",
    badge: "Storefront Flagship",
    specBadge: "⚡ 100% Offline Mesh",
    highlights: ["Peer Till Mesh", "Sub-Second Barcode", "Split Checks"],
    href: "/features/cloud-pos",
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Cloud POS Mesh Till",
    icon: Store,
  },
  {
    id: "cloud-hq",
    category: "enterprise",
    title: "Central Cloud HQ Matrix",
    description: "One-click master rollout for menus, pricing tiers, localized tax rules, and granular RBAC staff security across 500+ locations.",
    badge: "Central Control",
    specBadge: "☁ < 2.4s Global Sync",
    highlights: ["One-Click Rollout", "Granular RBAC", "Pricing Tiers"],
    href: "/features/enterprise-pos",
    imageSrc: "/images/nav_cloud_bundle_v2.png",
    imageAlt: "Central Cloud HQ Matrix",
    icon: Cloud,
  },
  {
    id: "inventory",
    category: "operations",
    title: "Central Stock & COGS",
    description: "Ingredient depletion, automated par-level reordering, and inter-branch warehouse transfers.",
    badge: "Supply Chain",
    specBadge: "📦 Par Auto-PO",
    highlights: ["Auto-PO Reorders", "Recipe Costing", "Dock GRN Audits"],
    href: "/features/inventory",
    imageSrc: "/images/ent_supply_chain_bundle.png",
    imageAlt: "Centralized inventory and stock control",
    icon: Boxes,
  },
  {
    id: "omnichannel",
    category: "operations",
    title: "Omnichannel & Kitchen KDS",
    description: "Consolidate web menus, third-party delivery apps, and kitchen prep station bump-bar displays.",
    badge: "Kitchen Hub",
    specBadge: "⏱ -42% Ticket Time",
    highlights: ["Station Bump Alerts", "Course Pacing", "Curbside Sync"],
    href: "/features/omnichannel",
    imageSrc: "/images/ent_kitchen_kds_transparent.png",
    imageAlt: "Kitchen display system and omnichannel fulfillment",
    icon: ChefHat,
  },
  {
    id: "analytics",
    category: "enterprise",
    title: "Real-Time Executive BI",
    description: "Turn sales, labor productivity, and branch throughput into actionable executive telemetry.",
    badge: "Live Telemetry",
    specBadge: "📊 Sub-Second BI",
    highlights: ["Hourly Sales Velocity", "Data Lake Pipe", "Labor Margin Audits"],
    href: "/features/analytics",
    imageSrc: "/images/ent_bi_analytics_bundle_v2.png",
    imageAlt: "Executive business intelligence telemetry",
    icon: LineChart,
  },
  {
    id: "kiosks",
    category: "checkout",
    title: "Self-Service & Mobile POS",
    description: "Line-busting guest self-ordering kiosks and tableside server handheld terminals.",
    badge: "Line-Busting",
    specBadge: "📱 +28% Avg Ticket",
    highlights: ["AI Upsell Triggers", "Tap-to-Pay EMV", "Order Status Boards"],
    href: "/features/mobile-pos",
    imageSrc: "/images/ent_qsr_kiosk_bundle.png",
    imageAlt: "Guest self-ordering kiosks and handheld terminals",
    icon: Smartphone,
  },
  {
    id: "payments",
    category: "checkout",
    title: "Unified Payments & Terminals",
    description: "Multi-processor processing and settlement with zero proprietary hardware lock-in.",
    badge: "PCI Tier 1",
    specBadge: "💳 Zero Lock-in",
    highlights: ["Next-Day Batching", "Interchange-Plus", "Offline Tokenization"],
    href: "/integrations",
    imageSrc: "/images/nav_payment_bundle.png",
    imageAlt: "Unified payments and terminals",
    icon: CreditCard,
  },
  {
    id: "integrations",
    category: "enterprise",
    title: "ERP & Open Webhooks",
    description: "Native connectors for SAP, Oracle NetSuite, Dynamics, Snowflake, and BigQuery.",
    badge: "API Ecosystem",
    specBadge: "🔗 393+ Endpoints",
    highlights: ["Bi-Directional GL", "Dedicated Webhooks", "OAuth 2.0 Telemetry"],
    href: "/integrations",
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Enterprise ERP and API connectors",
    icon: Code2,
  },
];

const LinearDeckCard: React.FC<{
  module: PlatformModule;
  index: number;
  isDraggingRef?: React.RefObject<boolean>;
  className?: string;
}> = ({ module, index, isDraggingRef, className }) => {
  const Icon = module.icon;

  return (
    <div className={className || "w-[78vw] max-w-[295px] sm:w-[310px] shrink-0 snap-center"}>
      <Link
        href={module.href}
        onClick={(e) => {
          if (isDraggingRef?.current) {
            e.preventDefault();
          }
        }}
        className="group/deck relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/70 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 select-none"
      >
        {/* Subtle Ambient Backlight Glow on Hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange-500/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover/deck:opacity-100" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Clean Top Header Row */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-orange-500/[0.08] text-[#FF4F00] dark:bg-orange-500/15">
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                  {module.badge}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{module.specBadge}</span>
              </span>
            </div>

            {/* Hardware Mockup Display Frame */}
            <div className="relative h-28 sm:h-32 w-full overflow-hidden flex items-center justify-center p-1 my-1.5 group-hover/deck:-translate-y-0.5 transition-transform duration-500">
              <Image
                src={module.imageSrc}
                alt={module.imageAlt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 35vw, 24vw"
                className="object-contain p-1 transition-transform duration-500 group-hover/deck:scale-105 drop-shadow-md"
              />
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h3 className="font-syne text-sm sm:text-[15px] font-bold text-slate-950 transition-colors duration-200 group-hover/deck:text-[#FF4F00] dark:text-white dark:group-hover/deck:text-orange-400 line-clamp-1 leading-snug">
                {module.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-normal leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                {module.description}
              </p>
            </div>

            {/* Clean Feature Highlights */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] sm:text-[11px] text-slate-600 dark:text-slate-300">
              {module.highlights.slice(0, 2).map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]" />
                  <span className="truncate">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Clean Single Action Footer */}
          <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/deck:text-[#FF4F00] transition-colors">
            <span>Explore module</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-300 group-hover/deck:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PlatformModulesDeck: React.FC = () => {
  const [deckIndex, setDeckIndex] = useState(0);
  const [desktopPage, setDesktopPage] = useState<0 | 1>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const isDraggingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard?.offsetWidth || 300;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setDeckIndex(Math.max(0, Math.min(newIndex, PLATFORM_DECK_MODULES.length - 1)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scrollPrev = useCallback(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard?.offsetWidth || 300;
    const gap = 16;
    scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
  }, []);

  const scrollNext = useCallback(() => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard?.offsetWidth || 300;
    const gap = 16;
    scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
  }, []);

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard?.offsetWidth || 300;
    const gap = 16;
    scrollRef.current.scrollTo({ left: idx * (cardWidth + gap), behavior: "smooth" });
  };

  // Desktop Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      isDraggingRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 60);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = document.getElementById("complete-platform-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        setDesktopPage(0);
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        setDesktopPage(1);
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollNext, scrollPrev]);

  return (
    <section id="complete-platform-section" className="relative overflow-hidden py-10 sm:py-14 lg:py-16 text-slate-900 transition-colors dark:text-white">
      <div className="site-container relative z-10">
        {/* Section Header with Desktop & Mobile Controls */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#FF4F00] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4] text-[#FF4F00]" />
              <span>COMPLETE OPERATING PLATFORM</span>
            </div>
            <h2 className="font-syne text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
              One Platform.{" "}
              <span className="mt-0.5 block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 sm:inline sm:mt-0">
                Every Part of Your Operation.
              </span>
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              From checkout registers and kitchen displays to automated central commissaries and executive ERP data lakes.
            </p>
          </div>

          {/* Navigation Controls Dock */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-end">
            {/* Desktop Slide Indicator Pill */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-slate-700 shadow-2xs">
              <span className="text-[#FF4F00]">Slide 0{desktopPage + 1}</span>
              <span className="text-slate-400">/ 02</span>
            </div>

            {/* Desktop Chevrons */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setDesktopPage(0)}
                disabled={desktopPage === 0}
                aria-label="Previous Slide (Cards 01-04)"
                className="flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-800 shadow-xs transition-all hover:border-orange-500 hover:text-[#FF4F00] hover:shadow-md disabled:opacity-30 disabled:pointer-events-none active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4 xl:h-5 xl:w-5 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={() => setDesktopPage(1)}
                disabled={desktopPage === 1}
                aria-label="Next Slide (Cards 05-08)"
                className="flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-800 shadow-xs transition-all hover:border-orange-500 hover:text-[#FF4F00] hover:shadow-md disabled:opacity-30 disabled:pointer-events-none active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <ChevronRight className="h-4 w-4 xl:h-5 xl:w-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Mobile Chevrons */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous Product"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-800 shadow-xs transition-all hover:border-orange-500 hover:text-[#FF4F00] hover:shadow-md disabled:opacity-30 disabled:pointer-events-none active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next Product"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-800 shadow-xs transition-all hover:border-orange-500 hover:text-[#FF4F00] hover:shadow-md disabled:opacity-30 disabled:pointer-events-none active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View: Exact 4-Card Paginated Grid Stage */}
        <div className="hidden lg:block relative py-2 min-h-[330px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={desktopPage}
              initial={{ opacity: 0, x: desktopPage === 1 ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: desktopPage === 1 ? -25 : 25 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-4 gap-4 xl:gap-5"
            >
              {PLATFORM_DECK_MODULES.slice(desktopPage * 4, desktopPage * 4 + 4).map((module, idx) => (
                <LinearDeckCard
                  key={module.id}
                  module={module}
                  index={desktopPage * 4 + idx}
                  className="w-full h-full"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile & Tablet View: Native 60fps Touch Snap-Scroll Deck */}
        <div className="lg:hidden relative -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-3.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory py-2 pb-5 px-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PLATFORM_DECK_MODULES.map((module, idx) => (
              <LinearDeckCard
                key={module.id}
                module={module}
                index={idx}
                isDraggingRef={isDraggingRef}
                className="w-[78vw] max-w-[295px] shrink-0 snap-center"
              />
            ))}
          </div>
        </div>

        {/* Clean Bottom Navigation & Pagination Bar */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-4 pt-1">
          {/* Desktop Slide Switcher Pills */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDesktopPage(0)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                desktopPage === 0
                  ? "bg-orange-500/10 text-[#FF4F00] border border-orange-500/25"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              01 • In-Store & Operations (Cards 01–04)
            </button>
            <button
              type="button"
              onClick={() => setDesktopPage(1)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                desktopPage === 1
                  ? "bg-orange-500/10 text-[#FF4F00] border border-orange-500/25"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              02 • Enterprise BI & Ecosystem (Cards 05–08)
            </button>
          </div>

          {/* Mobile Active Module Live Indicator */}
          <div className="lg:hidden flex items-center gap-2 text-xs">
            <span className="font-mono font-bold text-[#FF4F00]">
              {String(deckIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-slate-300 dark:text-slate-600">/</span>
            <span className="font-mono text-slate-400 dark:text-slate-500">
              {String(PLATFORM_DECK_MODULES.length).padStart(2, "0")}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-medium ml-1 truncate max-w-[180px]">
              — {PLATFORM_DECK_MODULES[deckIndex]?.title}
            </span>
          </div>

          {/* Pagination Indicators (Desktop 2 Dots, Mobile 8 Dots) */}
          <div className="flex items-center gap-1.5">
            {/* Desktop 2-Slide Dots */}
            <div className="hidden lg:flex items-center gap-1.5">
              {[0, 1].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDesktopPage(p as 0 | 1)}
                  aria-label={`Jump to page ${p + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    desktopPage === p
                      ? "w-7 bg-[#FF4F00]"
                      : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>

            {/* Mobile 8-Dot Switcher */}
            <div className="lg:hidden flex items-center gap-1.5">
              {PLATFORM_DECK_MODULES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Jump to module ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === deckIndex
                      ? "w-6 bg-[#FF4F00]"
                      : "w-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformModulesDeck;
