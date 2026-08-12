"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Check,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Coffee,
  Globe2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  ShoppingBag,
  Tv,
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
    title: "Restaurant POS",
    description: "Tables, KDS, QR orders, split bills, and modifier workflows.",
    badge: "Dining",
    href: "/products/restaurant-pos",
    imageSrc: "/images/hero-restaurant.jpg",
    imageAlt: "Restaurant POS dining room workflow",
    icon: ChefHat,
  },
  {
    title: "Retail POS",
    description: "Barcode checkout, cashier controls, returns, and stock sync.",
    badge: "Stores",
    href: "/products/retail-pos",
    imageSrc: "/images/ss3-ai.png",
    imageAlt: "Retail POS counter register",
    icon: Store,
  },
  {
    title: "Cloud Service",
    description: "Live dashboards, branch visibility, and multi-location control.",
    badge: "Cloud",
    href: "/products/cloud-pos",
    imageSrc: "/images/demo-thumb-ai.png",
    imageAlt: "Cloud POS inventory management",
    icon: Cloud,
  },
  {
    title: "Websites",
    description: "Online menus, customer ordering, delivery, and pickup flows.",
    badge: "Web",
    href: "/products/websites",
    imageSrc: "/images/platform_websites.png",
    imageAlt: "Online ordering website application",
    icon: Globe2,
  },
  {
    title: "Mobile Application",
    description: "Handheld ordering, mobile billing, and customer app workflows.",
    badge: "Mobile",
    href: "/products/mobile-application",
    imageSrc: "/images/platform_mobile.png",
    imageAlt: "Mobile POS application screens",
    icon: Smartphone,
  },
  {
    title: "Custom Service",
    description: "White-label POS, API bridges, ERP sync, and dedicated SLA builds.",
    badge: "Custom",
    href: "/products/custom-service",
    imageSrc: "/images/ss1-ai.png",
    imageAlt: "Custom POS platform dashboard",
    icon: Code2,
  },
  {
    title: "Kitchen Display",
    description: "Prep routing, station tickets, course timing, and kitchen order flow.",
    badge: "KDS",
    href: "/features/kitchen-display",
    imageSrc: "/images/platform_kds.png",
    imageAlt: "Kitchen display system order routing workflow",
    icon: Tv,
  },
  {
    title: "Grocery & Mart",
    description: "Barcode scanning, weight items, batch stock, and quick checkout.",
    badge: "Grocery",
    href: "/solutions/grocery",
    imageSrc: "/images/hero-retail.jpg",
    imageAlt: "Grocery and supermarket POS checkout workflow",
    icon: ShoppingBag,
  },
  {
    title: "Cafe Systems",
    description: "Counter service, modifiers, loyalty, pickup, and quick-serve flow.",
    badge: "Cafe",
    href: "/solutions/cafe-bakery",
    imageSrc: "/images/hero-cafe.jpg",
    imageAlt: "Cafe POS counter service workflow",
    icon: Coffee,
  },
];

const marqueeAnimation: React.CSSProperties = {
  animation: "quantixModulesSlide 110s linear infinite",
  willChange: "transform",
};

const moduleGroupItems = Array.from({ length: 3 }, () => PLATFORM_MODULES).flat();

const PRODUCT_LINES: ProductLine[] = [
  {
    eyebrow: "Restaurant POS - dining, cafes and kitchens",
    title: "Restaurant POS & Kitchen System",
    description:
      "Run table service, kitchen ticket routing, QR ordering, modifiers, and payment workflows from one restaurant-ready POS stack.",
    points: [
      { title: "Kitchen KDS routing", desc: "Send grill, bar, and prep tickets to the right display in real time." },
      { title: "Visual floor mapping", desc: "Track table status, split bills, and course-paced service from one view." },
      { title: "Tableside and QR ordering", desc: "Serve faster through handheld tablets and customer self-ordering flows." },
    ],
    imageSrc: "/images/hero-restaurant.jpg",
    imageAlt: "Restaurant POS and kitchen display system",
    topBadge: "Kitchen-ready workflow",
    bottomBadge: "Built for dining operations",
    href: "/products/restaurant-pos",
    ctaText: "Explore Restaurant POS",
    icon: ChefHat,
    imagePosition: "right",
  },
  {
    eyebrow: "Retail POS - counters, stores and supermarkets",
    title: "Retail POS & Inventory Register",
    description:
      "A fast retail checkout system for barcode billing, cashier permissions, stock deductions, returns, and offline counter sales.",
    points: [
      { title: "Barcode checkout", desc: "Scan products quickly with category lookup and item-level controls." },
      { title: "Cashier governance", desc: "Handle discounts, voids, returns, and manager approvals with confidence." },
      { title: "Inventory sync", desc: "Keep stock movement connected across counters, stores, and cloud reports." },
    ],
    imageSrc: "/images/ss3-ai.png",
    imageAlt: "Retail POS and inventory register",
    topBadge: "Retail-ready register",
    bottomBadge: "Scanner and printer ready",
    href: "/products/retail-pos",
    ctaText: "Explore Retail POS",
    icon: Store,
    imagePosition: "left",
  },
  {
    eyebrow: "Cloud POS - branches, teams and enterprise control",
    title: "Cloud POS & Multi-Location Management",
    description:
      "Give owners and enterprise teams a single cloud control layer for branch performance, inventory visibility, staff access, and reporting.",
    points: [
      { title: "Branch visibility", desc: "Monitor sales, stock, and operating signals across every location." },
      { title: "Central controls", desc: "Push menu, price, role, and workflow updates from one dashboard." },
      { title: "Live analytics", desc: "Track performance trends with connected sales and inventory reporting." },
    ],
    imageSrc: "/images/demo-thumb-ai.png",
    imageAlt: "Cloud POS multi-location inventory dashboard",
    topBadge: "Cloud command center",
    bottomBadge: "Multi-location ready",
    href: "/products/cloud-pos",
    ctaText: "Explore Cloud POS",
    icon: Cloud,
    imagePosition: "right",
  },
  {
    eyebrow: "Web, mobile and custom - online ordering and API builds",
    title: "Website, Mobile App & Custom POS Solutions",
    description:
      "Launch customer ordering websites, mobile workflows, white-label experiences, custom integrations, and API bridges around your operating model.",
    points: [
      { title: "Website ordering", desc: "Connect branded web menus, pickup, delivery, and order routing into POS." },
      { title: "Mobile application", desc: "Support handheld ordering, customer apps, and mobile-first workflows." },
      { title: "Custom integrations", desc: "Build API bridges, ERP sync, hardware drivers, and white-label portals." },
    ],
    imageSrc: "/images/ss2-ai.png",
    imageAlt: "Website and mobile POS application workflow",
    topBadge: "Custom digital workflows",
    bottomBadge: "Web, mobile and API ready",
    href: "/products/custom-service",
    ctaText: "Talk to Custom Team",
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
    <div className="w-[310px] shrink-0 px-2 sm:w-[330px] sm:px-2.5 lg:w-[350px]">
      <Link
        href={module.href}
        tabIndex={isDuplicate ? -1 : undefined}
        className="group/module relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 dark:border-slate-800/90 dark:bg-slate-900/80 dark:hover:shadow-none sm:p-5"
      >
        {/* Ambient Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/module:opacity-100 pointer-events-none" />

        <div>
          {/* Module Image Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950">
            <Image
              src={module.imageSrc}
              alt={module.imageAlt}
              fill
              sizes="(max-width: 640px) 310px, (max-width: 1024px) 330px, 350px"
              className="object-cover transition-transform duration-700 group-hover/module:scale-105"
            />
            <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/95 px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider text-primary shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-primary-light">
              <Icon className="h-3 w-3 stroke-[2.5]" />
              {module.badge}
            </div>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-3.5 space-y-1.5">
            <h3 className="font-syne text-lg font-black text-slate-950 transition-colors duration-300 group-hover/module:text-primary dark:text-white dark:group-hover/module:text-primary-light sm:text-xl">
              {module.title}
            </h3>
            <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              {module.description}
            </p>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary group-hover/module:text-primary-dark transition-colors">
            <span>Explore Module</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover/module:translate-x-1" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover/module:bg-primary group-hover/module:text-white">
            <Icon className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export const MainProductsShowcaseSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-10 text-slate-900 transition-colors dark:text-white sm:py-14 lg:py-16">
      {/* 1. SECTION HEADER (Reduced Gaps) */}
      <div className="site-container relative z-10 mb-6 text-center sm:mb-7">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-primary shadow-2xs dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Sparkles className="h-3.5 w-3.5 stroke-[2.4]" />
          PLATFORM MODULES
        </span>
        <h2 className="mx-auto max-w-4xl font-syne text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          Complete POS Ecosystem
          <span className="mt-1 block font-bold text-slate-800 dark:text-slate-200">
            For Every Business Model
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
          From dining tableside terminals and retail barcode registers to cloud hubs and mobile waiter tablets.
        </p>
      </div>

      {/* 2. INFINITE CONTINUOUS MARQUEE SLIDER WITH HOVER CONTROLS & PAUSE */}
      <div className="group/marquee relative mb-10 w-full overflow-hidden sm:mb-14">
        {/* Left Floating Navigation Arrow (Fades in on Hover) */}
        <button
          type="button"
          aria-label="Scroll Previous Module"
          onClick={handleScrollLeft}
          className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-xl opacity-0 transition-all duration-300 group-hover/marquee:opacity-100 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Right Floating Navigation Arrow (Fades in on Hover) */}
        <button
          type="button"
          aria-label="Scroll Next Module"
          onClick={handleScrollRight}
          className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-xl opacity-0 transition-all duration-300 group-hover/marquee:opacity-100 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Side Fading Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 sm:w-24 lg:w-36" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-slate-50 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 sm:w-24 lg:w-36" />

        <div ref={scrollContainerRef} className="min-w-0 flex-1 overflow-x-auto scrollbar-none py-2">
          <div
            className="quantix-modules-marquee-track flex w-max min-w-max items-center group-hover/marquee:[animation-play-state:paused]"
            style={marqueeAnimation}
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

      {/* 3. PRODUCT LINES DEEP SHOWCASE */}
      <div className="site-container relative z-10 space-y-14 sm:space-y-20">
        {PRODUCT_LINES.map((line, index) => {
          const Icon = line.icon;
          const isRight = line.imagePosition === "right";

          return (
            <div
              key={line.title}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, x: isRight ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-4 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
              >
                <div>
                  <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                    <Icon className="h-3.5 w-3.5 stroke-[2.4]" />
                    {line.eyebrow}
                  </div>
                  <h3 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                    {line.title}
                  </h3>
                </div>

                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {line.description}
                </p>

                <div className="grid gap-2.5 pt-2">
                  {line.points.map((point) => (
                    <div
                      key={point.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-sm">
                        <strong className="font-extrabold text-slate-950 dark:text-white">
                          {point.title}:
                        </strong>{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {point.desc}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href={line.href}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-primary px-7 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:h-13 sm:text-sm"
                  >
                    <span>{line.ctaText}</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRight ? 25 : -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-6 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="group/image relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:p-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950">
                    <Image
                      src={line.imageSrc}
                      alt={line.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                    />
                  </div>

                  <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {line.topBadge}
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[11px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {line.bottomBadge}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainProductsShowcaseSection;
