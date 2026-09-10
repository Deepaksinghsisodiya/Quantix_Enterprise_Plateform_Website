"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Users,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

type PlatformModule = {
  title: string;
  description: string;
  badge: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
};

type ProductPoint = {
  title: string;
  desc: string;
};

type ProductLine = {
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

const PLATFORM_MODULES: PlatformModule[] = [
  {
    title: "POS",
    description: "Fast, reliable checkout for restaurants and retail locations.",
    badge: "Fast Checkout",
    href: "/products/cloud-pos",
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "POS checkout system",
    icon: Store,
  },
  {
    title: "Cloud HQ",
    description: "Manage menus, pricing, permissions and locations centrally.",
    badge: "Central Control",
    href: "/products/enterprise-pos",
    imageSrc: "/images/nav_cloud_bundle.png",
    imageAlt: "Cloud HQ multi-location control",
    icon: Cloud,
  },
  {
    title: "Inventory & Cost Control",
    description: "Know what you have, what you need and where it should go.",
    badge: "Stock & COGS",
    href: "/products/inventory",
    imageSrc: "/images/ent_supply_chain_bundle.png",
    imageAlt: "Centralized inventory and stock control",
    icon: Boxes,
  },
  {
    title: "Online Ordering",
    description: "Bring web, mobile, delivery and in-store orders together.",
    badge: "Omnichannel",
    href: "/products/omnichannel",
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Online ordering and omnichannel fulfillment",
    icon: Globe2,
  },
  {
    title: "Analytics & Telemetry",
    description: "Turn sales, labor and inventory data into actionable insights.",
    badge: "Live Telemetry",
    href: "/products/analytics",
    imageSrc: "/images/ent_bi_analytics_bundle.png",
    imageAlt: "Business intelligence and real-time analytics",
    icon: LineChart,
  },
  {
    title: "Payments",
    description: "Secure, integrated payment processing across locations.",
    badge: "PCI Tier 1",
    href: "/integrations",
    imageSrc: "/images/nav_payment_bundle.png",
    imageAlt: "Integrated payment processing",
    icon: CreditCard,
  },
  {
    title: "Kiosks & Mobile",
    description: "Give customers and staff faster ways to place and manage orders.",
    badge: "Line-Busting",
    href: "/products/mobile-pos",
    imageSrc: "/images/foodhub_bundle_mockup.png",
    imageAlt: "Self-service kiosks and mobile ordering",
    icon: Smartphone,
  },
  {
    title: "Integrations",
    description: "Connect Quantix with your ERP, delivery, payment and business systems.",
    badge: "API Ecosystem",
    href: "/integrations",
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Enterprise ERP and API integrations",
    icon: Code2,
  },
];

const marqueeAnimation: React.CSSProperties = {
  animation: "quantixModulesSlide 110s linear infinite",
  willChange: "transform",
};

const moduleGroupItems = Array.from({ length: 3 }, () => PLATFORM_MODULES).flat();

const PRODUCT_LINES: ProductLine[] = [
  {
    eyebrow: "Multi-Store Operations — Menus, Catalogs & Regional Pricing",
    title: "One POS System for Every Location",
    description:
      "Maintain strict consistency across all your branches. Update menus, product catalogs, pricing tiers, and promotional rules across your network from one centralized dashboard.",
    points: [
      { title: "One-Click Instant Rollouts", desc: "Push menu and price changes to hundreds of POS terminals across all locations in seconds." },
      { title: "Regional Pricing & Tax Rules", desc: "Set localized pricing tiers, tax calculations, and happy hour rules per territory." },
      { title: "Role-Based Staff Permissions (RBAC)", desc: "Grant managers branch-level controls while keeping master security and pricing locked at HQ." },
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
    eyebrow: "Supply Chain & Margins — Central Warehouses & Stock Transfers",
    title: "Manage Inventory Across Every Location",
    description:
      "Stop managing stock store by store. Connect your registers directly to central warehouses to track ingredient usage, automate replenishment, and monitor cost of goods (COGS) in real time.",
    points: [
      { title: "Automated Reordering", desc: "Generate supplier purchase orders automatically when branch inventory drops below par levels." },
      { title: "Inter-Store Stock Transfers", desc: "Transfer inventory effortlessly between branches and warehouses with full digital audit trails." },
      { title: "Live Recipe & Margin Costing", desc: "Know the exact ingredient cost and profit margin on every dish or retail product sold." },
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
    eyebrow: "Unified Commerce — Web, Mobile Ordering & Counter Registers",
    title: "Connect Online & In-Store Orders Together",
    description:
      "Break down the barrier between digital ordering and store counters. Route web orders, third-party delivery apps, and in-store sales into one synchronized operational flow.",
    points: [
      { title: "Unified Order Routing", desc: "Consolidate orders from web menus, delivery apps, and counter registers straight to kitchen displays." },
      { title: "Click & Collect (BOPIS)", desc: "Let customers order online and pick up in-store or curbside with automated SMS/email ready alerts." },
      { title: "Cross-Branch Loyalty", desc: "Allow customers to earn and redeem rewards points seamlessly online or at any branch register." },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Omnichannel order fulfillment across web and POS registers",
    topBadge: "Unified Commerce",
    bottomBadge: "Cross-Channel Sync",
    href: "/products/omnichannel",
    ctaText: "Explore Omnichannel Solutions",
    icon: Globe2,
    imagePosition: "right",
  },
  {
    eyebrow: "Real-Time Visibility — Live Sales Telemetry & Financial Reports",
    title: "See What's Happening Across Your Business",
    description:
      "Turn store transactions, labor hours, and inventory data into actionable executive insights. Sync live performance data directly into your corporate ERP or accounting software.",
    points: [
      { title: "Live Financial Telemetry", desc: "Track hourly revenue, labor margins, and store throughput from any mobile device or laptop." },
      { title: "Direct Accounting & ERP Sync", desc: "Connect natively with SAP, Oracle NetSuite, Microsoft Dynamics, QuickBooks, and Tableau." },
      { title: "Portfolio Benchmarking", desc: "Compare sales velocity, labor efficiency, and profitability across all locations side-by-side." },
    ],
    imageSrc: "/images/ent_bi_analytics_bundle.png",
    imageAlt: "Real-time business intelligence and reporting dashboards",
    topBadge: "Custom API Access",
    bottomBadge: "ERP & BI Integrations",
    href: "/products/analytics",
    ctaText: "Explore Analytics & Telemetry",
    icon: Code2,
    imagePosition: "left",
  },
];

const PlatformModuleCard: React.FC<{
  module: PlatformModule;
  index: number;
  isDuplicate?: boolean;
}> = ({ module, index, isDuplicate = false }) => {
  const Icon = module.icon;

  return (
    <div className="w-[min(290px,85vw)] shrink-0 px-3 sm:w-82.5 sm:px-4 lg:w-92.5">
      <Link
        href={module.href}
        tabIndex={isDuplicate ? -1 : undefined}
        className="group/module relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900/85 dark:hover:border-primary/40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/module:opacity-100 pointer-events-none" />

        <div>
          <div className="relative aspect-video w-full overflow-hidden bg-transparent flex items-center justify-center p-2.5">
            <Image
              src={module.imageSrc}
              alt={module.imageAlt}
              fill
              sizes="(max-width: 640px) min(85vw, 290px), (max-width: 1024px) 330px, 370px"
              className="object-contain p-2 transition-transform duration-700 group-hover/module:scale-105 drop-shadow-md"
            />
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-slate-200/90 bg-white/95 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider text-primary shadow-2xs backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/95 dark:text-primary-light">
              <Icon className="h-2.5 w-2.5 stroke-[2.5]" />
              {module.badge}
            </div>
          </div>

          <div className="relative z-10 px-3.5 pt-3.5 pb-1 sm:px-4 sm:pt-4 space-y-0.5">
            <h3 className="font-syne text-sm font-extrabold text-slate-950 transition-colors duration-300 group-hover/module:text-primary dark:text-white dark:group-hover/module:text-primary-light sm:text-base lg:text-lg">
              {module.title}
            </h3>
            <p className="text-[11px] font-medium leading-normal text-slate-600 dark:text-slate-300 sm:text-xs">
              {module.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-3.5 mb-3.5 sm:mx-4 sm:mb-4 mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5 dark:border-slate-800/80">
          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-primary group-hover/module:text-primary-dark transition-colors sm:text-[11px]">
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 stroke-[2.5] transition-transform duration-300 group-hover/module:translate-x-0.5" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover/module:bg-primary group-hover/module:text-white">
            <Icon className="h-3 w-3 stroke-[2.5]" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export const MainProductsShowcaseSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="products-showcase" className="relative overflow-hidden py-10 sm:py-14 lg:py-16 text-slate-900 transition-colors dark:text-white">
      {/* 4 Big Cards Section (Matches Restaurant Layout Order) */}
      <div className="site-container relative z-10 space-y-10 sm:space-y-14 lg:space-y-16 mb-10 sm:mb-12">
        {PRODUCT_LINES.map((line, idx) => {
          const Icon = line.icon;
          const isRight = idx % 2 === 0;

          return (
            <div
              key={line.title}
              className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8 xl:gap-12"
            >
              <motion.div
                initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-3 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
              >
                <div>
                  <div className="mb-2 flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-orange-500/10 px-3 py-1 text-[9px] sm:inline-flex sm:text-[10px] font-extrabold uppercase tracking-wide text-primary dark:border-primary/30 dark:text-primary-light shadow-sm shadow-primary/5">
                    <Icon className="h-3 w-3 shrink-0 stroke-[2.4]" />
                    <span className="min-w-0 truncate">{line.eyebrow}</span>
                  </div>
                  <h3 className="font-syne text-2xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
                    {line.title}
                  </h3>
                </div>

                <p className="text-sm font-medium leading-relaxed text-slate-600/90 dark:text-slate-400 sm:text-[15px]">
                  {line.description}
                </p>

                <div className="grid gap-3 pt-2">
                  {line.points.map((point) => (
                    <div
                      key={point.title}
                      className={`flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/90 ${isRight
                        ? "hover:-translate-x-1 hover:border-primary/30"
                        : "hover:translate-x-1 hover:border-primary/30"
                        } hover:shadow-md`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-white shadow-sm">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-extrabold text-slate-950 dark:text-white sm:text-[13px]">
                          {point.title}
                        </span>
                        <span className="text-[11px] font-medium leading-relaxed text-slate-500 dark:text-slate-400 sm:text-xs">
                          {point.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={line.href}
                    className="inline-flex min-h-[2.75rem] h-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-500 px-4 py-3 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-white shadow-md shadow-primary/25 transition-all duration-300 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 sm:h-12 sm:px-6"
                  >
                    <span>{line.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative lg:col-span-6 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-orange-500/5 to-emerald-500/5 opacity-50 blur-xl pointer-events-none transition-all duration-700 group-hover/image:opacity-80" />

                <div className="group/image relative flex items-center justify-center transition-all duration-500 hover:-translate-y-1.5">
                  <div className="relative aspect-[16/10] w-full flex items-center justify-center p-2 sm:p-4">
                    <Image
                      src={line.imageSrc}
                      alt={line.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-contain p-1 sm:p-2 transition-transform duration-700 group-hover/image:scale-105 drop-shadow-2xl"
                    />
                  </div>

                  <div className="absolute right-2 top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 dark:text-slate-100">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                    {line.topBadge}
                  </div>

                  <div className="absolute bottom-2 left-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[9.5px] font-extrabold leading-none text-slate-700 shadow-md backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 dark:text-slate-200">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {line.bottomBadge}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Carousel Section Header */}
      <div className="site-container relative z-10 mb-4 text-center sm:mb-5 mt-4 sm:mt-6">
        <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-primary shadow-2xs dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Sparkles className="h-3 w-3 stroke-[2.4]" />
          COMPLETE OPERATING PLATFORM
        </span>
        <h2 className="mx-auto max-w-3xl font-syne text-xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
          One Platform.{" "}
          <span className="mt-0.5 block font-bold text-primary sm:inline sm:mt-0">
            Every Part of Your Operation.
          </span>
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
          POS, Cloud HQ, Inventory, Online Ordering, Analytics, Payments, Kiosks & Integrations — connected across every location.
        </p>
      </div>

      {/* Carousel Track */}
      <div
        className="group/marquee relative w-full overflow-hidden px-0"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsHovered(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsHovered(false);
        }}
      >
        <button
          type="button"
          aria-label="Scroll Previous Module"
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:left-4 md:opacity-0 md:group-hover/marquee:opacity-100"
        >
          <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          aria-label="Scroll Next Module"
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-lg opacity-100 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 md:opacity-0 md:group-hover/marquee:opacity-100"
        >
          <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
        </button>

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-10 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 sm:w-20 lg:w-28" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-10 bg-gradient-to-l from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 sm:w-20 lg:w-28" />

        <div ref={scrollContainerRef} className="min-w-0 flex-1 overflow-x-auto scrollbar-none py-1">
          <div
            className="quantix-modules-marquee-track flex w-max min-w-max items-center"
            style={{
              ...marqueeAnimation,
              animationPlayState: isHovered ? "paused" : "running",
            }}
          >
            <div className="flex w-max shrink-0 items-center">
              {moduleGroupItems.map((module, idx) => (
                <PlatformModuleCard
                  key={`m1-${module.title}-${idx}`}
                  module={module}
                  index={idx % PLATFORM_MODULES.length}
                />
              ))}
            </div>
            <div aria-hidden="true" className="flex w-max shrink-0 items-center">
              {moduleGroupItems.map((module, idx) => (
                <PlatformModuleCard
                  key={`m2-${module.title}-${idx}`}
                  module={module}
                  index={idx % PLATFORM_MODULES.length}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes quantixModulesSlide {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default MainProductsShowcaseSection;
