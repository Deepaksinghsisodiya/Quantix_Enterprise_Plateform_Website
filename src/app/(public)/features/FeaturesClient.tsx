"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Building2,
  Calculator,
  Cloud,
  Code2,
  CreditCard,
  Database,
  FileText,
  Gift,
  Globe2,
  Headphones,
  Layers,
  LineChart,
  Lock,
  Receipt,
  Scan,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Tv,
  Users,
  Zap,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials/components/TestimonialsWrapper";

interface EnterpriseFeatureItem {
  slug: string;
  title: string;
  category: "all" | "multistore" | "supplychain" | "bi" | "security";
  badge: string;
  desc: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  glowColor: string;
  tags: string[];
}

const FEATURES: EnterpriseFeatureItem[] = [
  {
    slug: "multi-store",
    title: "Multi-Location Cloud HQ & Franchise Command",
    category: "multistore",
    badge: "50+ LOCATIONS",
    desc: "Central catalog distribution, franchise royalty tracking, regional price tiers, and unified multi-unit brand controls.",
    image: "/images/ent_franchise_portal.png",
    icon: Building2,
    accentColor: "text-primary dark:text-primary-light bg-primary/10 border-primary/20",
    glowColor: "from-primary/15 to-transparent",
    tags: ["HQ Push", "Royalty Ledger", "Branch Overrides"],
  },
  {
    slug: "bi-analytics",
    title: "Real-Time BI Analytics & Telemetry",
    category: "bi",
    badge: "LIVE DATA LAKES",
    desc: "Executive gross margin dashboards, hourly cashier velocity, shrinkage heatmaps, and SQL data lake exports.",
    image: "/images/ent_bi_analytics_bundle.png",
    icon: LineChart,
    accentColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    glowColor: "from-emerald-500/15 to-transparent",
    tags: ["SQL Exports", "Margin Heatmaps", "Hourly Velocity"],
  },
  {
    slug: "supply-chain",
    title: "Enterprise Supply Chain & Replenishment",
    category: "supplychain",
    badge: "CENTRAL WAREHOUSE",
    desc: "Automated warehouse replenishment, lot/batch tracking, supplier lead time buffers, and cross-outlet stock transfers.",
    image: "/images/ent_supply_chain_bundle.png",
    icon: Layers,
    accentColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
    glowColor: "from-purple-500/15 to-transparent",
    tags: ["Lot Tracking", "Auto Replenish", "Inter-Store Stock"],
  },
  {
    slug: "omnichannel",
    title: "Omnichannel Fulfillment & BOPIS Routing",
    category: "multistore",
    badge: "UNIFIED STOCK",
    desc: "Bi-directional sync with Shopify Plus and enterprise web stores for 2-hour in-store pickup and ship-from-store dispatch.",
    image: "/images/ent_omnichannel_bundle.png",
    icon: Globe2,
    accentColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900/50",
    glowColor: "from-cyan-500/15 to-transparent",
    tags: ["BOPIS 2-Hr", "Shopify Plus", "Store Dispatch"],
  },
  {
    slug: "offline-mesh",
    title: "Zero-Latency Offline Till Mesh",
    category: "security",
    badge: "100% LOCAL RESILIENCE",
    desc: "Sub-4ms local IndexedDB till caches allow uninterrupted checkout, barcode scanning, and card receipts during broadband blackouts.",
    image: "/images/enterprise_hub_3d.png",
    icon: HardDrive,
    accentColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
    glowColor: "from-amber-500/15 to-transparent",
    tags: ["IndexedDB Cache", "Sub-4ms Till", "Auto Background Sync"],
  },
  {
    slug: "erp-connectors",
    title: "SAP, Oracle & NetSuite ERP Connectors",
    category: "multistore",
    badge: "AUTOMATED LEDGERS",
    desc: "Direct REST and gRPC pipelines for automated daily sales postings, inventory COGS deductions, and sales tax journals.",
    image: "/images/ent_accounting_sync_bundle.png",
    icon: Server,
    accentColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50",
    glowColor: "from-teal-500/15 to-transparent",
    tags: ["SAP / NetSuite", "COGS Sync", "Tax Journal API"],
  },
  {
    slug: "stadium-pos",
    title: "Stadium & Arena Burst Checkout",
    category: "multistore",
    badge: "BURST COMMERCE",
    desc: "High-concurrency hawker mobile POS, zone-based menu pricing, section concession routing, and halftime rush throughput.",
    image: "/images/ent_venues_pos.png",
    icon: Zap,
    accentColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
    glowColor: "from-blue-500/15 to-transparent",
    tags: ["Hawker Mobile", "Halftime Rush", "Zone Concessions"],
  },
  {
    slug: "purchase-orders",
    title: "Automated Dynamic POs & Safety Stock",
    category: "supplychain",
    badge: "DYNAMIC REORDERS",
    desc: "Predictive purchase order generation factoring in vendor lead time variance, seasonal sales spikes, and MOQ volume breaks.",
    image: "/images/ent_roi_analytics.png",
    icon: Calculator,
    accentColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
    glowColor: "from-rose-500/15 to-transparent",
    tags: ["Lead Variance", "MOQ Volume", "Seasonal Spikes"],
  },
  {
    slug: "dual-pricing",
    title: "Global Multi-Currency & Dual Pricing",
    category: "multistore",
    badge: "MULTI-CURRENCY",
    desc: "Multi-country tax rule compliance (VAT, GST, State Sales Tax) and dynamic card surcharge offset for reduced merchant fees.",
    image: "/images/ent_stripe_pos_bundle.png",
    icon: CreditCard,
    accentColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50",
    glowColor: "from-indigo-500/15 to-transparent",
    tags: ["VAT / GST Rules", "Multi-Currency", "Fee Surcharging"],
  },
  {
    slug: "kitchen-kds",
    title: "Enterprise Kitchen Display (KDS) Grid",
    category: "multistore",
    badge: "MULTI-STATION KDS",
    desc: "Synchronized ticket routing across multi-level production stations (Grill, Salad, Fry, Expo) with color-coded cook timers.",
    image: "/images/prod_kitchen_display.png",
    icon: Tv,
    accentColor: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/50",
    glowColor: "from-orange-500/15 to-transparent",
    tags: ["Expo Sync", "Station Routing", "Ticket Timers"],
  },
  {
    slug: "security-sso",
    title: "PCI-DSS Tier 1 Security & SAML SSO",
    category: "security",
    badge: "SOC 2 & SAML 2.0",
    desc: "Okta/Azure AD SAML 2.0 single sign-on, end-to-end P2PE payment tokenization, and strict biometric role permissions.",
    image: "/images/nav_payment_bundle.png",
    icon: Lock,
    accentColor: "text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700",
    glowColor: "from-slate-500/15 to-transparent",
    tags: ["Okta / Azure SSO", "P2PE Tokens", "Role Permissions"],
  },
  {
    slug: "open-api",
    title: "Custom Open API & Webhook Stream",
    category: "security",
    badge: "ENTERPRISE APIS",
    desc: "High-throughput webhooks and REST endpoints with sub-100ms response times for custom mobile apps and custom middleware.",
    image: "/images/ent_global_pos_bundle.png",
    icon: Code2,
    accentColor: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50",
    glowColor: "from-sky-500/15 to-transparent",
    tags: ["High-Throughput", "Webhooks", "Custom Middleware"],
  },
  {
    slug: "central-menu",
    title: "Central Menu & Catalog Versioning",
    category: "multistore",
    badge: "1-CLICK ROLLOUT",
    desc: "Publish 1,000+ SKU catalog updates, combo modifier rules, and seasonal pricing to 100+ branches simultaneously in seconds.",
    image: "/images/nav_retail_bundle.png",
    icon: Tag,
    accentColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    glowColor: "from-emerald-500/15 to-transparent",
    tags: ["Instant Broadcast", "Version History", "Modifier Rules"],
  },
  {
    slug: "loyalty-crm",
    title: "Customer Loyalty & Enterprise CRM",
    category: "bi",
    badge: "VIP CLIENTELING",
    desc: "Centralized customer lifetime value (LTV) logs, omni-channel point redemption, and personalized marketing automation.",
    image: "/images/rest_loyalty_crm_bundle.png",
    icon: Gift,
    accentColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
    glowColor: "from-rose-500/15 to-transparent",
    tags: ["LTV Tracking", "Cross-Branch Points", "Marketing Engine"],
  },
  {
    slug: "sla-support",
    title: "24/7 Dedicated SLA & Engineering Support",
    category: "security",
    badge: "15-MIN SLA GUARANTEE",
    desc: "Named enterprise account managers, 15-minute critical incident response SLA, proactive uptime monitoring, and quarterly audits.",
    image: "/images/nav_cloud_bundle.png",
    icon: Headphones,
    accentColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50",
    glowColor: "from-teal-500/15 to-transparent",
    tags: ["15-Min Response", "Named Account Lead", "99.999% SLA"],
  },
];

// Helper icon component
function HardDrive(props: { size?: number; className?: string }) {
  return <Server {...props} />;
}

const FILTER_TABS = [
  { id: "all", label: "All Capabilities" },
  { id: "multistore", label: "Enterprise Multi-Store" },
  { id: "supplychain", label: "Supply Chain & Logistics" },
  { id: "bi", label: "BI & Telemetry" },
  { id: "security", label: "Security & Compliance" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function FeaturesClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredFeatures = FEATURES.filter((f) => {
    if (selectedFilter === "all") return true;
    return f.category === selectedFilter;
  });

  return (
    <>
      {/* Dynamic Animated Hero Header */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        {/* Animated Breathing Ambient Light */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-linear-to-b from-primary/20 via-primary/10 to-transparent blur-3xl pointer-events-none -z-10"
        />

        <div className="site-container text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-black uppercase tracking-wider text-primary mb-3 shadow-xs"
          >
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span>ENTERPRISE CAPABILITIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight"
          >
            Engineered For Scale, Security & Uptime
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Explore enterprise capabilities powering global franchise groups, high-throughput stadium networks, and multi-tier supply chains.
          </motion.p>

          {/* Smooth Sliding Pill Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-5 sm:mt-6 flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x touch-pan-x"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-colors duration-200 shrink-0 snap-center cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEnterpriseFeatureFilterPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs shadow-primary/30 ring-2 ring-primary/20 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Fluid Animated Features Grid (Seamless Pure White Canvas) */}
      <section className="section-py bg-white dark:bg-slate-950">
        <div className="site-container px-4 sm:px-6">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.slug}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Link
                      href={`/features/${item.slug}`}
                      className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
                    >
                      {/* Subtle Ambient Hover Glow */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />

                      <div className="relative z-10 space-y-3">
                        {/* Top Row: Icon + Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-xs">
                            <Icon size={16} className="stroke-[2.2]" />
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.accentColor}`}>
                            {item.badge}
                          </span>
                        </div>

                        {/* 100% Free-Floating Transparent 3D Hardware Bundle */}
                        <div className="relative h-32 sm:h-36 w-full flex items-center justify-center my-0.5">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-1"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="font-syne font-black text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        {/* Feature Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom CTA Link */}
                      <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light">
                        <span className="flex items-center gap-1">
                          Explore Capability
                        </span>
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <TestimonialsWrapper />

      {/* Production Ready CTA Banner */}
      <CTABanner />
    </>
  );
}
