"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Cloud,
  Globe,
  Server,
  Smartphone,
  Sparkles,
  Store,
  Utensils,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials/components/TestimonialsWrapper";

interface ProductCardItem {
  slug: string;
  title: string;
  eyebrow: string;
  desc: string;
  href: string;
  category: "all" | "pos" | "cloud" | "digital";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  image: string;
  accentColor: string;
  glowColor: string;
  tags: string[];
}

const PRODUCTS: ProductCardItem[] = [
  {
    slug: "restaurant-pos",
    title: "Restaurant POS & Kitchen System",
    eyebrow: "Restaurant & Hospitality",
    desc: "Tableside ordering, visual floor mapping, course pacing, KDS ticket routing, and split-check management.",
    href: "/products/restaurant-pos",
    category: "pos",
    icon: Utensils,
    badge: "MOST POPULAR",
    image: "/images/navbar/nav_global_pos.png",
    accentColor: "text-primary dark:text-primary-light bg-primary/10 border-primary/20",
    glowColor: "from-primary/15 to-transparent",
    tags: ["Floor Mapping", "KDS Routing", "Split Bills"],
  },
  {
    slug: "retail-pos",
    title: "Retail POS & Inventory Register",
    eyebrow: "Retail & Supermarkets",
    desc: "Barcode scanner billing, cashier permissions, offline registers, stock deductions, returns, and shelf label printing.",
    href: "/products/retail-pos",
    category: "pos",
    icon: Store,
    badge: "SCANNER READY",
    image: "/images/navbar/nav_inventory.png",
    accentColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    glowColor: "from-emerald-500/15 to-transparent",
    tags: ["Barcode Scanner", "Offline Till", "Shelf Labels"],
  },
  {
    slug: "cloud-pos",
    title: "Cloud POS & Multi-Store Telemetry",
    eyebrow: "Multi-Store Chains",
    desc: "Centralized cloud control for pricing, menus, live inventory sync, staff permissions, and branch analytics.",
    href: "/products/cloud-pos",
    category: "cloud",
    icon: Cloud,
    badge: "CLOUD HUB",
    image: "/images/industries/franchise_portal_enterprise.png",
    accentColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
    glowColor: "from-blue-500/15 to-transparent",
    tags: ["Central Push", "Live Telemetry", "QuickBooks Sync"],
  },
  {
    slug: "enterprise-pos",
    title: "Enterprise POS for Large Scale Networks",
    eyebrow: "Franchise & Enterprise",
    desc: "Role-permission matrices, central catalog rollouts, regional dashboards, ERP integration, and dedicated SLA operations.",
    href: "/products/enterprise-pos",
    category: "cloud",
    icon: Server,
    badge: "ENTERPRISE SLA",
    image: "/images/products/ent_global_pos.png",
    accentColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
    glowColor: "from-purple-500/15 to-transparent",
    tags: ["SAP / NetSuite", "SAML 2.0 SSO", "99.999% SLA"],
  },
  {
    slug: "websites",
    title: "Website Ordering & Online Storefront",
    eyebrow: "Direct Online Channels",
    desc: "Branded web storefronts, pickup and delivery routing, QR table ordering links, and direct POS order injection.",
    href: "/products/websites",
    category: "digital",
    icon: Globe,
    badge: "ZERO COMMISSION",
    image: "/images/products/ent_omnichannel.png",
    accentColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900/50",
    glowColor: "from-cyan-500/15 to-transparent",
    tags: ["Direct Web Sales", "BOPIS Pickup", "KDS Injection"],
  },
  {
    slug: "mobile-application",
    title: "Mobile Application & Server Handhelds",
    eyebrow: "Handheld & Mobile",
    desc: "Handheld server ordering tablets, mobile checkout, and customer self-service app experiences.",
    href: "/products/mobile-application",
    category: "digital",
    icon: Smartphone,
    badge: "HANDHELD POS",
    image: "/images/navbar/nav_global_pos.png",
    accentColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
    glowColor: "from-rose-500/15 to-transparent",
    tags: ["Tableside Tap", "Line Busting", "Mobile Mesh"],
  },
  {
    slug: "custom-service",
    title: "Custom Engineering & Integration Middleware",
    eyebrow: "Bespoke Solutions",
    desc: "Custom cashier workflows, proprietary API bridges, ERP connectors, and dedicated enterprise solutions architects.",
    href: "/products/custom-service",
    category: "cloud",
    icon: Server,
    badge: "BESPOKE ARCHITECTURE",
    image: "/images/navbar/nav_guide_blueprint.png",
    accentColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50",
    glowColor: "from-teal-500/15 to-transparent",
    tags: ["Custom Workflows", "API Middleware", "Dedicated Architect"],
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Products" },
  { id: "pos", label: "Countertop & Register POS" },
  { id: "cloud", label: "Cloud Back-Office & ERP" },
  { id: "digital", label: "Mobile & Online Ordering" },
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

export default function ProductsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  return (
    <>
      {/* Clean Hero Header Section */}
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
            <span>QUANTIX PRODUCT PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight"
          >
            Connected Modules For Every Part of Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Choose standalone hardware bundles or combine restaurant, retail, cloud back-office, and omnichannel storefronts into one ecosystem.
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
                      layoutId="activeEnterpriseProductFilterPill"
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

      {/* Fluid Animated Products Grid */}
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
              {filteredProducts.map((item) => {
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
                      href={item.href}
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

                        {/* Eyebrow, Title & Description */}
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-0.5">
                            {item.eyebrow}
                          </span>
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
                          Explore Module Details
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
