"use client";

import React, { useRef, useState } from "react";
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
    <div className="w-[270px] shrink-0 px-1.5 sm:w-[290px] sm:px-2 lg:w-[310px]">
      <Link
        href={module.href}
        tabIndex={isDuplicate ? -1 : undefined}
        className="group/module relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/85 dark:hover:border-primary/50 sm:p-3.5"
      >
        {/* Ambient Hover Glow Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-emerald-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/module:opacity-100 pointer-events-none" />

        <div>
          {/* Module Compact Image Container */}
          <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-950">
            <Image
              src={module.imageSrc}
              alt={module.imageAlt}
              fill
              sizes="(max-width: 640px) 270px, (max-width: 1024px) 290px, 310px"
              className="object-cover transition-transform duration-700 group-hover/module:scale-105"
            />
            {/* Category Badge Tag */}
            <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-slate-200/90 bg-white/95 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider text-primary shadow-2xs backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/95 dark:text-primary-light">
              <Icon className="h-2.5 w-2.5 stroke-[2.5]" />
              {module.badge}
            </div>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-2.5 space-y-0.5">
            <h3 className="font-syne text-sm font-extrabold text-slate-950 transition-colors duration-300 group-hover/module:text-primary dark:text-white dark:group-hover/module:text-primary-light sm:text-base">
              {module.title}
            </h3>
            <p className="text-[11px] font-medium leading-normal text-slate-600 dark:text-slate-300 sm:text-xs">
              {module.description}
            </p>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="relative z-10 mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800/80">
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
    <section className="relative overflow-hidden py-5 text-slate-900 transition-colors dark:text-white sm:py-7 lg:py-8">
      {/* 1. SECTION HEADER (Reduced Title Font Size) */}
      <div className="site-container relative z-10 mb-4 text-center sm:mb-5">
        <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-primary shadow-2xs dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Sparkles className="h-3 w-3 stroke-[2.4]" />
          PLATFORM MODULES
        </span>
        <h2 className="mx-auto max-w-3xl font-syne text-xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
          Complete POS Ecosystem{" "}
          <span className="mt-0.5 block font-bold text-slate-800 dark:text-slate-200 sm:inline sm:mt-0">
            For Every Business Model
          </span>
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs">
          From dining tableside terminals and retail barcode registers to cloud hubs and mobile waiter tablets.
        </p>
      </div>

      {/* 2. INFINITE CONTINUOUS MARQUEE SLIDER (Full Width, Zero Side Padding, Pause on Hover State) */}
      <div
        className="group/marquee relative mb-6 w-full overflow-hidden px-0 sm:mb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Floating Navigation Arrow (Fades in on Hover) */}
        <button
          type="button"
          aria-label="Scroll Previous Module"
          onClick={handleScrollLeft}
          className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-lg opacity-0 transition-all duration-300 group-hover/marquee:opacity-100 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:left-4 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
        </button>

        {/* Right Floating Navigation Arrow (Fades in on Hover) */}
        <button
          type="button"
          aria-label="Scroll Next Module"
          onClick={handleScrollRight}
          className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-800 shadow-lg opacity-0 transition-all duration-300 group-hover/marquee:opacity-100 hover:scale-110 hover:bg-primary hover:text-white active:scale-95 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
        </button>

        {/* Side Fading Gradients */}
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

      {/* 3. PRODUCT LINES DEEP SHOWCASE */}
      <div className="site-container relative z-10 space-y-10 sm:space-y-14">
        {PRODUCT_LINES.map((line, index) => {
          const Icon = line.icon;
          const isRight = line.imagePosition === "right";

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
                  <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                    <Icon className="h-3 w-3 stroke-[2.4]" />
                    {line.eyebrow}
                  </div>
                  <h3 className="font-syne text-xl font-black leading-tight text-slate-950 dark:text-white sm:text-2xl lg:text-3xl">
                    {line.title}
                  </h3>
                </div>

                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xs">
                  {line.description}
                </p>

                <div className="grid gap-2 pt-1">
                  {line.points.map((point) => (
                    <div
                      key={point.title}
                      className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white p-2 shadow-2xs dark:border-slate-800 dark:bg-slate-900/70"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-xs">
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

                <div className="pt-1.5">
                  <Link
                    href={line.href}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:h-11"
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
                className={`lg:col-span-6 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="group/image relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-md shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:p-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950">
                    <Image
                      src={line.imageSrc}
                      alt={line.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                    />
                  </div>

                  <div className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {line.topBadge}
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/95 px-2.5 py-1 text-[9.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
                    <ShieldCheck className="h-3 w-3 shrink-0 text-primary" />
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
