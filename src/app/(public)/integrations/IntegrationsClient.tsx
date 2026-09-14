"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
} from "lucide-react";
import {
  SiStripe,
  SiSquare,
  SiDoordash,
  SiUbereats,
} from "react-icons/si";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";
import { FAQWrapper } from "@/features/FAQ";

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
  category: "all" | "payments" | "delivery";
  categoryLabel: string;
  desc: string;
  renderLogo: () => React.ReactNode;
  image: string;
  accentColor: string;
  glowColor: string;
  tags: string[];
  syncSpeed: string;
  syncSpeedIcon: "live" | "instant" | "batch";
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Connect Stripe to Quantix POS for seamless card reader integration, online checkout processing, and automatic daily payouts.",
    renderLogo: () => <SiStripe size={22} className="text-[#635BFF]" />,
    image: "/images/ent_stripe_pos_bundle.png",
    accentColor: "text-[#635BFF] bg-[#635BFF]/10 border-[#635BFF]/30",
    glowColor: "rgba(99, 91, 255, 0.15)",
    tags: ["Tap to Pay", "Apple Pay", "Daily Payouts"],
    syncSpeed: "Real-Time Sync",
    syncSpeedIcon: "live",
  },
  {
    id: "authorize-net",
    name: "Authorize.Net",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Integrate Authorize.Net for merchant account credit card processing, fraud detection, and secure web checkout.",
    renderLogo: () => <AuthorizeNetIcon size={22} />,
    image: "/images/ent_venues_pos.png",
    accentColor: "text-[#1E3A5F] bg-sky-50 border-sky-200",
    glowColor: "rgba(14, 165, 233, 0.15)",
    tags: ["Merchant Account", "Fraud Filters", "Batch Settle"],
    syncSpeed: "Midnight Batch",
    syncSpeedIcon: "batch",
  },
  {
    id: "square",
    name: "Square",
    category: "payments",
    categoryLabel: "PAYMENTS",
    desc: "Use Square's card readers and payment terminals with Quantix for seamless payment processing and gift card support.",
    renderLogo: () => <SiSquare size={20} className="text-slate-900" />,
    image: "/images/nav_payment_bundle.png",
    accentColor: "text-slate-900 bg-slate-100 border-slate-300",
    glowColor: "rgba(15, 23, 42, 0.12)",
    tags: ["Square Reader", "Terminal Display", "Offline Mode"],
    syncSpeed: "< 1.5s Speed",
    syncSpeedIcon: "instant",
  },
  {
    id: "doordash",
    name: "DoorDash",
    category: "delivery",
    categoryLabel: "DELIVERY",
    desc: "Automatically receive DoorDash delivery orders on your Quantix POS and kitchen display screens without tablet clutter.",
    renderLogo: () => <SiDoordash size={22} className="text-[#FF3008]" />,
    image: "/images/ent_delivery_dispatch_bundle.png",
    accentColor: "text-[#FF3008] bg-[#FF3008]/10 border-[#FF3008]/30",
    glowColor: "rgba(255, 48, 8, 0.15)",
    tags: ["Auto-Accept", "Menu Sync", "Driver ETA"],
    syncSpeed: "Instant Injection",
    syncSpeedIcon: "instant",
  },
  {
    id: "uber-eats",
    name: "Uber Eats",
    category: "delivery",
    categoryLabel: "DELIVERY",
    desc: "Automatically receive Uber Eats orders on your Quantix POS with instant KDS routing, menu sync, and driver tracking.",
    renderLogo: () => <SiUbereats size={22} className="text-[#06C167]" />,
    image: "/images/rest_ghost_kitchen_bundle.png",
    accentColor: "text-[#06C167] bg-[#06C167]/10 border-[#06C167]/30",
    glowColor: "rgba(6, 193, 103, 0.15)",
    tags: ["Auto-Routing", "Live Menu Sync", "Unified P&L"],
    syncSpeed: "Live Dispatch",
    syncSpeedIcon: "live",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Integrations", count: 5 },
  { id: "payments", label: "Payment Gateways", count: 3 },
  { id: "delivery", label: "Delivery Marketplaces", count: 2 },
];

const TRUST_METRICS = [
  { label: "Webhook Uptime", value: "99.99%", desc: "Enterprise SLA" },
  { label: "Order Injection", value: "< 200ms", desc: "Direct to Kitchen" },
  { label: "Manual Re-Entry", value: "0%", desc: "Zero Ticket Errors" },
  { label: "Authentication", value: "1-Click", desc: "Secure OAuth 2.0" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function IntegrationsClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredIntegrations = INTEGRATIONS.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* ========================================== */}
      {/* ENHANCED HERO WITH ARCHITECTURAL GRID & RESPONSIVE PADDING */}
      {/* ========================================== */}
      <section className="bg-white page-hero-header border-b border-slate-200/80 relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        {/* Subtle Architectural Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] pointer-events-none opacity-60" />

        {/* Soft Ambient Radial Warmth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="site-container text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#FF4F00] mb-3 sm:mb-3.5 shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
            <Sparkles size={12} className="text-[#FF4F00]" />
            <span>ENTERPRISE INTEGRATIONS DIRECTORY</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-[1.2] sm:leading-[1.16] tracking-tight"
          >
            Connect Quantix With Your{" "}
            <span className="text-[#FF4F00]">Enterprise Ecosystem</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed px-1 sm:px-0"
          >
            Automate kitchen ticket routing, payment gateway settlements, online delivery dispatching,
            and ERP accounting sync with sub-second synchronization.
          </motion.p>

          {/* 4 Compact Enterprise Trust Metrics (Mobile 2x2, Desktop 4-col) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mt-5 sm:mt-7 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto"
          >
            {TRUST_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-200/80 backdrop-blur-xs text-center shadow-2xs"
              >
                <div className="font-syne font-extrabold text-sm sm:text-base md:text-lg text-slate-950">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
                  {metric.label}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5 hidden sm:block">
                  {metric.desc}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Apple/macOS Segmented Filter Control (Touch-scrollable on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mt-6 sm:mt-8 flex justify-center w-full"
          >
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner max-w-full overflow-x-auto scrollbar-none snap-x touch-pan-x px-1">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {FILTER_TABS.map((tab) => {
                  const isActive = selectedFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedFilter(tab.id)}
                      className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 shrink-0 cursor-pointer snap-center ${
                        isActive
                          ? "text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeIntegrationFilterPill"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          className="absolute inset-0 bg-[#FF4F00] rounded-xl shadow-xs shadow-orange-500/30 z-0"
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                        <span>{tab.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3D SHOWCASE INTEGRATIONS GRID (RESPONSIVE PY & PADDING) */}
      {/* ========================================== */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-50/40 border-b border-slate-200/60">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
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
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="h-full"
                >
                  <Link
                    href={`/integrations/${item.id}`}
                    className="group relative p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
                  >
                    {/* Subtle Ambient Hover Glow */}
                    <div
                      className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: item.glowColor }}
                    />

                    <div className="relative z-10 space-y-3 sm:space-y-3.5">
                      {/* Top Row: App Icon + Name + Category & Live Status Pill */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                            {item.renderLogo()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-syne font-bold text-base sm:text-lg text-slate-950 group-hover:text-[#FF4F00] transition-colors duration-200 line-clamp-1">
                              {item.name}
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              {item.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Live Sync Speed Pill */}
                        <div className="shrink-0 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] sm:text-[11px] font-bold text-slate-700">
                          {item.syncSpeedIcon === "live" ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ) : item.syncSpeedIcon === "instant" ? (
                            <Zap size={10} className="text-amber-500" />
                          ) : (
                            <Clock size={10} className="text-blue-500" />
                          )}
                          <span>{item.syncSpeed}</span>
                        </div>
                      </div>

                      {/* Hardware Image Showcase */}
                      <div className="relative h-28 sm:h-32 md:h-36 w-full flex items-center justify-center my-1 sm:my-1.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-24 sm:max-h-28 md:max-h-32 w-auto object-contain drop-shadow-sm group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      {/* Feature Capability Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom CTA Link */}
                    <div className="relative z-10 pt-3.5 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#FF4F00] transition-colors">
                      <span>View Integration Details</span>
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-orange-50 group-hover:bg-[#FF4F00] text-[#FF4F00] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
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

      {/* Authentic Homepage FAQs */}
      <FAQWrapper />

      {/* Production Ready CTA Banner */}
      <CTABanner />
    </div>
  );
}
