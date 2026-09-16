"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  ChefHat,
  Check,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Globe2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  LineChart,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

type PlatformModule = {
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

type ProductPoint = {
  title: string;
  desc: string;
  badge?: string;
};

type ProductLine = {
  shortEyebrow: string;
  eyebrow: string;
  title: string;
  description: string;
  points: ProductPoint[];
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  href: string;
  ctaText: string;
  icon: LucideIcon;
  imagePosition?: "left" | "right";
};

const PLATFORM_DECK_MODULES: PlatformModule[] = [
  {
    id: "cloud-pos",
    category: "checkout",
    title: "Cloud POS Mesh Till",
    description: "High-throughput cashier checkout that continues ringing sales even when the WAN drops with automatic peer till sync.",
    badge: "Storefront Flagship",
    specBadge: "⚡ 100% Offline Mesh",
    highlights: ["Peer Till Mesh", "Sub-Second Barcode", "Split Checks"],
    href: "/products/cloud-pos",
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
    href: "/products/enterprise-pos",
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
    href: "/products/inventory",
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
    href: "/products/omnichannel",
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
    href: "/products/analytics",
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
    href: "/products/mobile-pos",
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

const PRODUCT_LINES: ProductLine[] = [
  {
    shortEyebrow: "Multi-Store Operations",
    eyebrow: "Multi-Store Operations — Menus, Catalogs & Regional Pricing",
    title: "One POS System for Every Location",
    description:
      "Maintain strict consistency across all your branches. Update menus, product catalogs, pricing tiers, and promotional rules across your network from one centralized dashboard.",
    points: [
      {
        title: "One-Click Instant Rollouts",
        desc: "Push menu and price changes to hundreds of POS terminals across all locations in seconds.",
        badge: "< 2.4s Global Sync",
      },
      {
        title: "Offline-First Mesh Billing Engine",
        desc: "Keep transactions flowing with zero internet lag. Terminals sync peer-to-peer and settle automatically upon reconnection.",
        badge: "100% Offline Resilient",
      },
      {
        title: "Regional Pricing & Tax Rules",
        desc: "Set localized pricing tiers, tax calculations, and happy hour rules per territory or franchise cluster.",
        badge: "Multi-Zone Engine",
      },
      {
        title: "Role-Based Staff Permissions (RBAC)",
        desc: "Grant managers branch-level controls while keeping master pricing, security, and refund locks centralized at HQ.",
        badge: "HQ Master Lock",
      },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Centralized master data and menu catalog control",
    topBadge: "Dual-Screen Countertop POS",
    bottomBadge: "Global Cloud Sync",
    href: "/products/enterprise-pos",
    ctaText: "Explore Centralized Operations",
    icon: Cloud,
    imagePosition: "right",
  },
  {
    shortEyebrow: "Supply Chain & Margins",
    eyebrow: "Supply Chain & Margins — Central Warehouses & Stock Transfers",
    title: "Manage Inventory Across Every Location",
    description:
      "Stop managing stock store by store. Connect your registers directly to central warehouses to track ingredient usage, automate replenishment, and monitor cost of goods (COGS) in real time.",
    points: [
      {
        title: "Automated Reordering & Par Levels",
        desc: "Generate supplier purchase orders automatically when branch inventory drops below par levels.",
        badge: "Auto-PO Engine",
      },
      {
        title: "Inter-Store Warehouse Stock Transfers",
        desc: "Transfer inventory effortlessly between branches, commissaries, and central warehouses with full digital audit trails.",
        badge: "Audit-Tracked",
      },
      {
        title: "Supplier POs & GRN Receiving Audits",
        desc: "Verify supplier deliveries against invoices at store loading docks with barcode audits to eliminate inventory shrinkage.",
        badge: "Dock Verification",
      },
      {
        title: "Live Recipe & Margin Costing",
        desc: "Know the exact ingredient cost and profit margin on every dish or retail product sold in real time.",
        badge: "Real-time COGS",
      },
    ],
    imageSrc: "/images/ent_supply_chain_bundle.png",
    imageAlt: "Centralized inventory management and supply chain network",
    topBadge: "Warehouse Sync",
    bottomBadge: "Live Stock Telemetry",
    href: "/products/inventory",
    ctaText: "Explore Centralized Inventory",
    icon: Boxes,
    imagePosition: "left",
  },
  {
    shortEyebrow: "Unified Commerce",
    eyebrow: "Unified Commerce — Web, Mobile Ordering & Kitchen Flow",
    title: "Connect Online & In-Store Orders Together",
    description:
      "Break down the barrier between digital ordering and store counters. Route web orders, third-party delivery apps, and in-store sales into one synchronized operational flow.",
    points: [
      {
        title: "Unified Order & KDS Station Routing",
        desc: "Consolidate orders from web menus, delivery apps, and counter registers straight to kitchen displays with station bump bar alerts.",
        badge: "Smart KDS Flow",
      },
      {
        title: "Multi-Course Kitchen Pacing",
        desc: "Coordinate kitchen prep stations, grill stations, and expo packing for -42% faster ticket turnaround.",
        badge: "Station Pacing",
      },
      {
        title: "Click & Collect (BOPIS)",
        desc: "Let customers order online and pick up in-store or curbside with automated SMS/email ready alerts.",
        badge: "Curbside Sync",
      },
      {
        title: "Cross-Branch Loyalty & Gift Cards",
        desc: "Allow customers to earn and redeem rewards points seamlessly online or at any branch register network-wide.",
        badge: "Unified CRM",
      },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Omnichannel order fulfillment across web and POS registers",
    topBadge: "Omnichannel Kitchen & KDS",
    bottomBadge: "Cross-Channel Sync",
    href: "/products/omnichannel",
    ctaText: "Explore Omnichannel Solutions",
    icon: Globe2,
    imagePosition: "right",
  },
  {
    shortEyebrow: "Real-Time Visibility",
    eyebrow: "Real-Time Visibility — Live Sales Telemetry & Financial Reports",
    title: "See What's Happening Across Your Business",
    description:
      "Turn store transactions, labor hours, and inventory data into actionable executive insights. Sync live performance data directly into your corporate ERP or accounting software.",
    points: [
      {
        title: "Live Financial Telemetry BI",
        desc: "Track hourly revenue, labor margins, and store throughput from any mobile device or executive laptop.",
        badge: "Sub-Second BI",
      },
      {
        title: "Direct Accounting & ERP Sync",
        desc: "Connect natively with SAP, Oracle NetSuite, Microsoft Dynamics, QuickBooks, and Tableau.",
        badge: "Native ERP Bridge",
      },
      {
        title: "Dedicated Open Webhooks & APIs",
        desc: "Pipe live transactional events directly into your corporate data lake (Snowflake, BigQuery) with custom webhooks.",
        badge: "Open Webhooks",
      },
      {
        title: "Portfolio Benchmarking & 24/7 SLA",
        desc: "Compare sales velocity, labor efficiency, and profitability across all locations backed by dedicated 24/7 SLA support.",
        badge: "99.99% Enterprise SLA",
      },
    ],
    imageSrc: "/images/ent_bi_analytics_bundle_v2.png",
    imageAlt: "Real-time business intelligence and reporting dashboards",
    topBadge: "Real-Time Data Lake",
    bottomBadge: "ERP & BI Integrations",
    href: "/products/analytics",
    ctaText: "Explore Analytics & Telemetry",
    icon: Code2,
    imagePosition: "left",
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

            {/* Clean Feature Highlights (No bulky boxes) */}
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

export const MainProductsShowcaseSection: React.FC = () => {
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

  const handlePrev = useCallback(() => {
    setDesktopPage(0);
    scrollPrev();
  }, [scrollPrev]);

  const handleNext = useCallback(() => {
    setDesktopPage(1);
    scrollNext();
  }, [scrollNext]);

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
      const section = document.getElementById("complete-platform-section") || document.getElementById("products-showcase");
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
    <section id="products-showcase" className="relative overflow-hidden py-12 sm:py-16 lg:py-20 text-slate-900 transition-colors dark:text-white">
      {/* 4 Big Product Cards Section */}
      <div className="site-container relative z-10 space-y-8 sm:space-y-12 lg:space-y-16 mb-8 sm:mb-12">
        {PRODUCT_LINES.map((line, idx) => {
          const Icon = line.icon;
          const isRight = idx % 2 === 0;

          return (
            <div
              key={line.title}
              className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8 xl:gap-12"
            >
              <motion.div
                initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-3.5 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
              >
                <div>
                  {/* Compact Small Eyebrow Badge (Never wraps on mobile) */}
                  <div className="mb-2.5 w-fit inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/[0.08] dark:bg-orange-500/[0.15] px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[9.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#FF4F00] shadow-xs backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F00]" />
                    </span>
                    <Icon className="h-3 w-3 shrink-0 text-[#FF4F00]" />
                    <span className="leading-tight sm:hidden whitespace-nowrap">{line.shortEyebrow}</span>
                    <span className="leading-tight hidden sm:inline whitespace-nowrap">{line.eyebrow}</span>
                  </div>

                  <h3 className="font-syne text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                    {line.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                  {line.description}
                </p>

                {/* 4 Rich Enterprise Points with Compact Layout */}
                <div className="grid gap-2 sm:gap-2.5 pt-1">
                  {line.points.map((point) => (
                    <div
                      key={point.title}
                      className="group/point flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 sm:p-3.5 shadow-xs transition-all duration-300 dark:border-slate-800/90 dark:bg-slate-900/95 hover:border-orange-300/90 dark:hover:border-orange-500/60 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-sm shadow-orange-500/25">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-[13.5px] font-extrabold text-slate-950 dark:text-white group-hover/point:text-[#FF4F00] dark:group-hover/point:text-orange-400 transition-colors">
                            {point.title}
                          </span>
                          {point.badge && (
                            <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded shrink-0">
                              {point.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                          {point.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compact Primary Laser Action Button */}
                <div className="pt-1.5">
                  <Link
                    href={line.href}
                    className="group relative inline-flex min-h-[40px] sm:min-h-[46px] w-fit items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#FF4F00] via-[#FF5F1A] to-[#FF6B2B] px-4 sm:px-6 py-2 sm:py-2.5 font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-105 active:scale-[0.98] whitespace-nowrap"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <span>{line.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              {/* Hardware Mockup Display Frame (Clean Floating Without Boxes or Borders) */}
              <motion.div
                initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative lg:col-span-6 mt-3 sm:mt-4 lg:mt-0 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
              >
                {/* Subtle Ambient Watermark Index (Positioned reliably over the hardware mockup for 01, 02, 03, and 04) */}
                <div className="pointer-events-none absolute -top-3 sm:-top-5 lg:-top-8 left-1 sm:left-2 select-none font-syne text-5xl sm:text-7xl lg:text-8xl font-black text-slate-200/70 dark:text-slate-800/35 z-0">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Soft Ambient Glow behind hardware */}
                <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-transparent opacity-60 blur-2xl pointer-events-none transition-all duration-700 group-hover/image:opacity-90" />

                <div className="group/image relative z-10 flex items-center justify-center transition-all duration-500 hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] w-full flex items-center justify-center p-2 sm:p-4">
                    <Image
                      src={line.imageSrc}
                      alt={line.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-contain p-1 sm:p-2 transition-transform duration-700 group-hover/image:scale-105 drop-shadow-2xl"
                    />
                  </div>

                  {/* Top Physics Floating Chip */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="pointer-events-none absolute right-1 sm:right-3 top-1 sm:top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 sm:px-3.5 py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4F00]" />
                    </span>
                    <span>{line.topBadge}</span>
                  </motion.div>

                  {/* Bottom Physics Floating Chip */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, delay: 0.8, ease: "easeInOut" }}
                    className="pointer-events-none absolute bottom-1 sm:bottom-3 left-1 sm:left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 sm:px-3.5 py-1 text-[9px] sm:text-[10px] font-extrabold leading-none text-slate-700 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#FF4F00]" />
                    <span>{line.bottomBadge}</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Complete Operating Platform - Linear / Ramp Style Snap-Scroll Interactive Deck */}
      <div id="complete-platform-section" className="site-container relative z-10 mt-10 sm:mt-16">
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

        {/* Desktop View: Exact 4-Card Paginated Grid Stage (Zero Border Clipping) */}
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
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${desktopPage === 0
                  ? "bg-orange-500/10 text-[#FF4F00] border border-orange-500/25"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              01 • In-Store & Operations (Cards 01–04)
            </button>
            <button
              type="button"
              onClick={() => setDesktopPage(1)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 ${desktopPage === 1
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${desktopPage === p
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === deckIndex
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

export default MainProductsShowcaseSection;
