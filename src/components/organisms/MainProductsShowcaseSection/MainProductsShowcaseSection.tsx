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
    title: "Multi-Location POS",
    description: "Centralized controls for managing hundreds of store or restaurant branches.",
    badge: "Enterprise",
    href: "/products/enterprise-pos",
    imageSrc: "/images/products/ent_global_pos.png",
    imageAlt: "Enterprise POS multi-location dashboard",
    icon: Store,
  },
  {
    title: "Cloud Management Hub",
    description: "Live dashboards, global catalog visibility, and remote branch control.",
    badge: "Cloud HQ",
    href: "/products/cloud-pos",
    imageSrc: "/images/products/ent_cloud_hq.png",
    imageAlt: "Enterprise cloud management hub",
    icon: Cloud,
  },
  {
    title: "Supply Chain & Warehouse",
    description: "Automated stock transfers, purchase orders, and warehouse sync.",
    badge: "Inventory",
    href: "/products/inventory",
    imageSrc: "/images/products/ent_inventory_matrix.png",
    imageAlt: "Enterprise supply chain and inventory management",
    icon: Boxes,
  },
  {
    title: "Omnichannel Fulfillment",
    description: "Unify e-commerce, mobile apps, and physical POS orders.",
    badge: "Omnichannel",
    href: "/products/omnichannel",
    imageSrc: "/images/products/ent_omnichannel.png",
    imageAlt: "Omnichannel retail and e-commerce fulfillment",
    icon: Globe2,
  },
  {
    title: "Enterprise BI & Analytics",
    description: "Custom data lakes, cross-store reporting, and API-driven insights.",
    badge: "Analytics",
    href: "/products/analytics",
    imageSrc: "/images/products/ent_bi_analytics.png",
    imageAlt: "Enterprise business intelligence analytics",
    icon: LineChart,
  },
  {
    title: "Digital POS Station",
    description: "Dual-screen customer display, kitchen routing & fast line busting.",
    badge: "Digital Station",
    href: "/products/enterprise-pos",
    imageSrc: "/images/products/enterprise_pos_terminal.png",
    imageAlt: "Digital POS station display screen",
    icon: Store,
  },
  {
    title: "Mobile Kiosk & Operations",
    description: "Self-service kiosks and handheld tablets for rapid line-busting.",
    badge: "Mobile Kiosk",
    href: "/products/mobile-pos",
    imageSrc: "/images/navbar/nav_inventory.png",
    imageAlt: "Enterprise kiosk and mobile workflow",
    icon: Smartphone,
  },
  {
    title: "Payment Hardware & Security",
    description: "Contactless tap terminals, strict PIN matrices, and shift audits.",
    badge: "Payments",
    href: "/products/security",
    imageSrc: "/images/navbar/nav_payments.png",
    imageAlt: "Enterprise security and payment terminals",
    icon: Users,
  },
];

const marqueeAnimation: React.CSSProperties = {
  animation: "quantixModulesSlide 110s linear infinite",
  willChange: "transform",
};

const moduleGroupItems = Array.from({ length: 3 }, () => PLATFORM_MODULES).flat();

const PRODUCT_LINES: ProductLine[] = [
  {
    eyebrow: "Centralized Master Data - Menus, Catalogs & Pricing",
    title: "Global Catalog & Menu Management",
    description:
      "Maintain strict control over your brand. Update menus, product catalogs, pricing tiers, and promotional rules globally or by region from a single Enterprise dashboard.",
    points: [
      { title: "One-Click Rollouts", desc: "Push menu and pricing changes instantly to hundreds of POS terminals worldwide." },
      { title: "Regional Pricing Tiers", desc: "Create dynamic pricing models based on geographic zones or individual branch requirements." },
      { title: "Automated Tax Compliance", desc: "Apply localized tax rates and compliance rules automatically across different territories." },
    ],
    imageSrc: "/images/products/ent_global_pos.png",
    imageAlt: "Enterprise master data and menu catalog management",
    topBadge: "Dual-Screen Countertop EPOS",
    bottomBadge: "Global Cloud Sync",
    href: "/products/enterprise-pos",
    ctaText: "Explore Centralized Operations",
    icon: Cloud,
    imagePosition: "right",
  },
  {
    eyebrow: "Enterprise Supply Chain - Warehouses, Transfers & Costing",
    title: "Advanced Inventory & Supply Chain",
    description:
      "Connect your POS network directly to your central warehouses. Track raw ingredient usage, automate branch stock replenishment, and monitor real-time COGS across the entire organization.",
    points: [
      { title: "Automated Replenishment", desc: "Generate purchase orders automatically when branch stock falls below par levels." },
      { title: "Inter-Store Transfers", desc: "Move stock effortlessly between branches and central warehouses with full audit trails." },
      { title: "Live Recipe & Matrix Costing", desc: "Track exact margins on every dish or retail SKU globally in real-time." },
    ],
    imageSrc: "/images/products/ent_inventory_matrix.png",
    imageAlt: "Enterprise supply chain and inventory network",
    topBadge: "Warehouse Sync",
    bottomBadge: "Live Supply Chain",
    href: "/products/inventory",
    ctaText: "Explore Enterprise Inventory",
    icon: Boxes,
    imagePosition: "left",
  },
  {
    eyebrow: "Unified Commerce - E-Commerce, Delivery & POS Sync",
    title: "True Omnichannel Fulfillment",
    description:
      "Break down silos between digital and physical channels. Route online orders, delivery aggregator requests, and in-store purchases into one unified operational pipeline.",
    points: [
      { title: "Unified Order Routing", desc: "Consolidate orders from Shopify, Magento, UberEats, and direct web into a single KDS." },
      { title: "Cross-Channel Loyalty", desc: "Allow customers to earn and redeem enterprise loyalty points online or in any branch." },
      { title: "Click-and-Collect Infrastructure", desc: "Manage curbside pickup and BOPIS (Buy Online, Pick Up In-Store) workflows flawlessly." },
    ],
    imageSrc: "/images/products/ent_omnichannel.png",
    imageAlt: "Omnichannel order fulfillment across web and POS",
    topBadge: "Unified Commerce",
    bottomBadge: "Cross-Channel Sync",
    href: "/products/omnichannel",
    ctaText: "Explore Omnichannel Solutions",
    icon: Globe2,
    imagePosition: "right",
  },
  {
    eyebrow: "Enterprise BI - Custom Reports, Dashboards & ERP Sync",
    title: "API-Driven Business Intelligence",
    description:
      "Empower your analysts with raw data access. Use our comprehensive API to sync live sales, labor, and inventory data directly into your corporate ERP or BI tools like Snowflake and Tableau.",
    points: [
      { title: "Direct ERP Integrations", desc: "Connect natively with SAP, Oracle NetSuite, Microsoft Dynamics, and Workday." },
      { title: "Custom Data Lakes", desc: "Export untruncated, raw transactional data via secure API webhooks or bulk CSV dumps." },
      { title: "Cross-Branch Benchmarking", desc: "Compare labor costs, sales velocity, and profitability metrics across your entire portfolio." },
    ],
    imageSrc: "/images/products/ent_bi_analytics.png",
    imageAlt: "Enterprise API business intelligence and reporting",
    topBadge: "Custom API Access",
    bottomBadge: "ERP & BI Integrations",
    href: "/products/analytics",
    ctaText: "Explore API & Analytics",
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
        className="group/module relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/85"
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
          ENTERPRISE POS MODULES
        </span>
        <h2 className="mx-auto max-w-3xl font-syne text-xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
          A Complete Cloud Ecosystem{" "}
          <span className="mt-0.5 block font-bold text-slate-800 dark:text-slate-200 sm:inline sm:mt-0">
            For Managing Scale
          </span>
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs">
          Explore all enterprise-grade modules designed for multi-location synchronization, security, and growth.
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
