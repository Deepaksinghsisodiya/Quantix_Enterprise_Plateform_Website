"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Check,
  Cloud,
  Code2,
  Globe2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

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
    href: "/features/enterprise-pos",
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
    href: "/features/inventory",
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
    href: "/features/omnichannel",
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
    href: "/features/analytics",
    ctaText: "Explore Analytics & Telemetry",
    icon: Code2,
    imagePosition: "left",
  },
];

export const MainProductsShowcaseSection: React.FC = () => {
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

              {/* Hardware Mockup Display Frame */}
              <motion.div
                initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative lg:col-span-6 mt-3 sm:mt-4 lg:mt-0 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
              >
                {/* Subtle Ambient Watermark Index */}
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
    </section>
  );
};

export default MainProductsShowcaseSection;
