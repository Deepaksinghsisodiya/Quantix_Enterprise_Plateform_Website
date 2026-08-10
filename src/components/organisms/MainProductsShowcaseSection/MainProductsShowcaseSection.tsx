"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Check,
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
    imageSrc: "/images/pos_counter_3d.png",
    imageAlt: "Retail POS counter register",
    icon: Store,
  },
  {
    title: "Cloud Service",
    description: "Live dashboards, branch visibility, and multi-location control.",
    badge: "Cloud",
    href: "/products/cloud-pos",
    imageSrc: "/images/inventory_sync_3d.png",
    imageAlt: "Cloud POS inventory management",
    icon: Cloud,
  },
  {
    title: "Websites",
    description: "Online menus, customer ordering, delivery, and pickup flows.",
    badge: "Web",
    href: "/products/websites",
    imageSrc: "/images/online_ordering_3d.png",
    imageAlt: "Online ordering website application",
    icon: Globe2,
  },
  {
    title: "Mobile Application",
    description: "Handheld ordering, mobile billing, and customer app workflows.",
    badge: "Mobile",
    href: "/products/mobile-application",
    imageSrc: "/images/mobile_app_3d.png",
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
    imageSrc: "/images/kitchen_display_3d.png",
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

const SLIDER_MODULES = Array.from({ length: 6 }, () => PLATFORM_MODULES).flat();

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
    imageSrc: "/images/kitchen_display_3d.png",
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
    imageSrc: "/images/pos_counter_3d.png",
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
    imageSrc: "/images/inventory_sync_3d.png",
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
    imageSrc: "/images/mobile_app_3d.png",
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
    <motion.div
      aria-hidden={isDuplicate}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="w-[76vw] max-w-[280px] shrink-0 sm:w-[300px] lg:w-[318px]"
    >
      <Link
        href={module.href}
        tabIndex={isDuplicate ? -1 : undefined}
        className="group/module block h-full overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800/90 dark:bg-slate-900/70 dark:hover:shadow-none"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Image
            src={module.imageSrc}
            alt={module.imageAlt}
            fill
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 300px, 318px"
            className="object-cover transition-transform duration-700 group-hover/module:scale-[1.04]"
          />
          <div className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-primary shadow-xs dark:border-slate-800 dark:bg-slate-900/95 dark:text-primary-light">
            <Icon className="h-3 w-3 stroke-[2.5]" />
            {module.badge}
          </div>
        </div>

        <div className="p-3.5 sm:p-4">
          <h3 className="font-syne text-sm font-black leading-tight text-slate-950 transition-colors group-hover/module:text-primary dark:text-white dark:group-hover/module:text-primary-light sm:text-base">
            {module.title}
          </h3>
          <p className="mt-2 text-[12px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[13px]">
            {module.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const PlatformModulesSlider: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-slate-200/80 bg-white/70 py-4 dark:border-slate-800/80 dark:bg-slate-950/70 sm:py-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-16 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 sm:w-32 lg:w-48" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-16 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 sm:w-32 lg:w-48" />

      <motion.div
        animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
        transition={isPaused ? { duration: 0 } : { duration: 72, ease: "linear", repeat: Infinity }}
        className="flex w-max shrink-0 items-stretch gap-3 px-3 sm:gap-4 sm:px-4 lg:px-5"
      >
        {SLIDER_MODULES.map((module, index) => (
          <PlatformModuleCard
            key={`${module.title}-${index}`}
            module={module}
            index={index % PLATFORM_MODULES.length}
            isDuplicate={index >= SLIDER_MODULES.length / 2}
          />
        ))}
      </motion.div>
    </div>
  );
};

const ProductRow: React.FC<{ product: ProductLine }> = ({ product }) => {
  const isRight = product.imagePosition !== "left";
  const Icon = product.icon;

  return (
    <div className="border-t border-slate-200/80 py-10 dark:border-slate-800/80 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, x: isRight ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`space-y-5 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[11px]">
              <Icon className="h-3.5 w-3.5 stroke-[2.4]" />
              {product.eyebrow}
            </div>
            <h3 className="max-w-2xl font-syne text-[1.75rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white sm:text-4xl sm:tracking-tight lg:text-[2.65rem]">
              {product.title}
            </h3>
          </div>

          <p className="max-w-xl text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {product.description}
          </p>

          <div className="grid gap-2.5 pt-1">
            {product.points.map((point) => (
              <div
                key={point.title}
                className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/70"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span className="text-[13px] leading-relaxed sm:text-sm">
                  <strong className="font-extrabold text-slate-950 dark:text-white">{point.title}:</strong>{" "}
                  <span className="font-medium text-slate-600 dark:text-slate-300">{point.desc}</span>
                </span>
              </div>
            ))}
          </div>

          <Link
            href={product.href}
            className="group/cta inline-flex h-11 items-center gap-2.5 rounded-full border border-primary/25 bg-white px-5 font-syne text-[11px] font-extrabold uppercase tracking-wider text-primary shadow-xs transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 active:scale-95 dark:bg-slate-900 dark:text-primary-light dark:hover:bg-primary dark:hover:text-white sm:h-12 sm:px-6 sm:text-xs"
          >
            {product.ctaText}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover/cta:bg-white group-hover/cta:text-primary">
              <ArrowRight className="h-3 w-3 stroke-[3]" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRight ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="group/image relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none">
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950 sm:aspect-[16/10]">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
              />
            </div>

            <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {product.topBadge}
            </div>

            <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[80%] items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              {product.bottomBadge}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const MainProductsShowcaseSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-200/80 bg-slate-50/70 py-12 text-slate-900 transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/45 dark:text-white sm:py-16">
      <div className="site-container relative z-10">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[11px]">
            <Sparkles className="h-3 w-3 stroke-[2.4]" />
            Platform modules
          </span>
          <h2 className="font-syne text-[1.8rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
            Built for POS, cloud, web, mobile and custom workflows
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            Explore the core Quantix modules for restaurants, retail stores, cloud teams, kitchen
            displays, grocery counters, cafes, websites, mobile apps, and custom business platforms.
          </p>
        </div>

        <PlatformModulesSlider />

        <div className="mt-8 sm:mt-10">
          {PRODUCT_LINES.map((product) => (
            <ProductRow key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainProductsShowcaseSection;
