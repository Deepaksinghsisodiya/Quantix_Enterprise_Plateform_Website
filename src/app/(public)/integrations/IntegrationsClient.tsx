"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  SiStripe,
  SiSquare,
  SiShopify,
  SiQuickbooks,
  SiDoordash,
  SiUbereats,
} from "react-icons/si";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials/components/TestimonialsWrapper";

// Custom authentic Authorize.Net Icon Component
function AuthorizeNetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#1E3A5F" />
      <path d="M6.5 12.5L10 16L17.5 8.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface IntegrationItem {
  id: string;
  name: string;
  category: "all" | "payments" | "erp" | "marketplaces";
  categoryLabel: string;
  desc: string;
  renderLogo: () => React.ReactNode;
  image: string;
  accentColor: string;
  glowColor: string;
  tags: string[];
  syncSpeed: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: "stripe",
    name: "Stripe Enterprise Terminal",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Deploy custom fleet terminal configs, automated multi-merchant routing, P2PE card tokenization, and multi-currency payouts.",
    renderLogo: () => <SiStripe size={22} className="text-[#635BFF]" />,
    image: "/images/ent_stripe_pos_bundle.png",
    accentColor: "text-[#635BFF] bg-[#635BFF]/10 border-[#635BFF]/30",
    glowColor: "from-[#635BFF]/15 to-transparent",
    tags: ["Fleet Management", "P2PE Tokenization", "Multi-Currency"],
    syncSpeed: "Real-Time Sync",
  },
  {
    id: "authorize-net",
    name: "Authorize.Net Merchant Vault",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Enterprise merchant vault processing, advanced fraud detection suite (AFDS), recurring catering billing, and secure customer profiles.",
    renderLogo: () => <AuthorizeNetIcon size={22} />,
    image: "/images/ent_venues_pos.png",
    accentColor: "text-[#1E3A5F] dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50",
    glowColor: "from-sky-500/15 to-transparent",
    tags: ["Customer Vault", "AFDS Fraud Suite", "Batch Settlement"],
    syncSpeed: "Midnight Batch",
  },
  {
    id: "square",
    name: "Square Register Fleet",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Manage multi-unit Square Terminal and Reader devices with remote lockouts, unified gift card balances, and offline mode resilience.",
    renderLogo: () => <SiSquare size={20} className="text-slate-900 dark:text-white" />,
    image: "/images/nav_payment_bundle.png",
    accentColor: "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700",
    glowColor: "from-slate-500/15 to-transparent",
    tags: ["Square Fleet", "Universal Gift Cards", "Offline Mode"],
    syncSpeed: "< 1.5s Speed",
  },
  {
    id: "quickbooks",
    name: "QuickBooks & Enterprise ERP",
    category: "erp",
    categoryLabel: "ERP / ACCOUNTING",
    desc: "Automate consolidated daily branch shift closures, multi-state sales tax journal entries, and real-time inventory COGS sync.",
    renderLogo: () => <SiQuickbooks size={22} className="text-[#2CA01C]" />,
    image: "/images/ent_accounting_sync_bundle.png",
    accentColor: "text-[#2CA01C] bg-[#2CA01C]/10 border-[#2CA01C]/30",
    glowColor: "from-[#2CA01C]/15 to-transparent",
    tags: ["Multi-Branch Ledgers", "Auto Z-Reports", "COGS Sync"],
    syncSpeed: "Daily Midnight",
  },
  {
    id: "shopify",
    name: "Shopify Plus Omnichannel",
    category: "erp",
    categoryLabel: "E-COMMERCE",
    desc: "Unified enterprise catalog distribution, bi-directional multi-store stock reservations, and 2-hour BOPIS order routing.",
    renderLogo: () => <SiShopify size={22} className="text-[#7AB55C]" />,
    image: "/images/ent_omnichannel_bundle.png",
    accentColor: "text-[#7AB55C] bg-[#7AB55C]/10 border-[#7AB55C]/30",
    glowColor: "from-[#7AB55C]/15 to-transparent",
    tags: ["BOPIS Pickup", "Shopify Plus", "Store Routing"],
    syncSpeed: "Instant Webhook",
  },
  {
    id: "doordash",
    name: "DoorDash Drive & Marketplace",
    category: "marketplaces",
    categoryLabel: "DELIVERY MARKETPLACE",
    desc: "Inject online delivery orders directly into restaurant KDS screens and dispatch white-label delivery drivers automatically.",
    renderLogo: () => <SiDoordash size={22} className="text-[#FF3008]" />,
    image: "/images/ent_delivery_dispatch_bundle.png",
    accentColor: "text-[#FF3008] bg-[#FF3008]/10 border-[#FF3008]/30",
    glowColor: "from-[#FF3008]/15 to-transparent",
    tags: ["Direct KDS Injection", "Auto 86 Sync", "DoorDash Drive"],
    syncSpeed: "Instant Webhook",
  },
  {
    id: "ubereats",
    name: "Uber Eats Direct & Enterprise",
    category: "marketplaces",
    categoryLabel: "DELIVERY MARKETPLACE",
    desc: "Synchronize multi-location digital menus, pricing tiers, and delivery ticket tracking without manual tablet entry.",
    renderLogo: () => <SiUbereats size={22} className="text-[#06C167]" />,
    image: "/images/ent_venues_pos.png",
    accentColor: "text-[#06C167] bg-[#06C167]/10 border-[#06C167]/30",
    glowColor: "from-[#06C167]/15 to-transparent",
    tags: ["Zero Tablet Clutter", "Dynamic Menu Sync", "Courier Tracking"],
    syncSpeed: "Instant Webhook",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Integrations" },
  { id: "payments", label: "Enterprise Payments" },
  { id: "erp", label: "ERP & Cloud Ledgers" },
  { id: "marketplaces", label: "Delivery & Marketplaces" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function IntegrationsClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredIntegrations = INTEGRATIONS.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  return (
    <>
      {/* Clean, Single Hero Header */}
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
            <span>ENTERPRISE INTEGRATIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight"
          >
            Connect Quantix With Your Enterprise Ecosystem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Automate fleet terminal payments, ERP ledger journals, online delivery dispatching, and omnichannel inventory routing.
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
                      layoutId="activeEnterpriseIntegrationFilterPill"
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

      {/* Fluid Animated Integrations Grid with 3D Hardware Bundles */}
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
              {filteredIntegrations.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Link
                    href={`/integrations/${item.id}`}
                    className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
                  >
                    {/* Subtle Ambient Hover Glow */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10 space-y-3">
                      {/* Top Row: Official Vector Brand Icon + Category Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xs group-hover:scale-108 transition-transform duration-300">
                          {item.renderLogo()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.accentColor}`}>
                            {item.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* 100% Free-Floating Transparent 3D Hardware Bundle */}
                      <div className="relative h-32 sm:h-36 w-full flex items-center justify-center my-0.5">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-1"
                          loading="lazy"
                        />
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="font-syne font-black text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      {/* Feature Capability Tags */}
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
                      <span>View Integration Architecture</span>
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
