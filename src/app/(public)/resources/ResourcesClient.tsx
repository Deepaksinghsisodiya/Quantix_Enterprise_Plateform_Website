"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Download,
  Search,
  Sparkles,
  X,
  CheckCircle2,
} from "lucide-react";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials/components/TestimonialsWrapper";
import { toast } from "sonner";

interface Resource {
  id: string;
  title: string;
  category: "all" | "blog" | "help" | "guides" | "calculators";
  categoryLabel: string;
  categoryColor: string;
  glowColor: string;
  type: "Blog" | "Help Centre" | "Video Tutorial" | "Guide" | "Calculator" | "Security";
  description: string;
  readTime: string;
  fileSize: string;
  fileName: string;
  image: string;
  href: string;
  tags: string[];
}

const ENTERPRISE_RESOURCES: Resource[] = [
  {
    id: "blog-main",
    title: "Engineering & POS Innovation Blog",
    category: "blog",
    categoryLabel: "BLOG & ARTICLES",
    categoryColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50",
    glowColor: "from-indigo-500/15 to-transparent",
    type: "Blog",
    description:
      "Deep technical articles on sub-second barcode scanning, weigh scale calibration, and offline distributed database architecture.",
    readTime: "Live Articles",
    fileSize: "Online",
    fileName: "quantix_blog_hub",
    image: "/images/ent_guide_blueprint.png",
    href: "/blog",
    tags: ["POS Engineering", "Weigh Scales", "System Benchmarks"],
  },
  {
    id: "help-main",
    title: "Help & Knowledge Centre",
    category: "help",
    categoryLabel: "KNOWLEDGE BASE",
    categoryColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/50",
    glowColor: "from-blue-500/15 to-transparent",
    type: "Help Centre",
    description:
      "Official setup manuals, troubleshooting guides, hardware pairing instructions, and frequently asked questions.",
    readTime: "Searchable Docs",
    fileSize: "Interactive",
    fileName: "quantix_help_centre",
    image: "/images/ent_accounting_sync_bundle.png",
    href: "/help",
    tags: ["Setup Guides", "Printer Pairing", "Troubleshooting"],
  },
  {
    id: "help-videos",
    title: "Video Setup & Hardware Tutorials",
    category: "help",
    categoryLabel: "VIDEO GUIDES",
    categoryColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
    glowColor: "from-rose-500/15 to-transparent",
    type: "Video Tutorial",
    description:
      "Visual step-by-step videos for unboxing terminals, connecting thermal printers, barcode scanners, and cash drawers.",
    readTime: "HD Playlists",
    fileSize: "Video Library",
    fileName: "quantix_video_tutorials",
    image: "/images/nav_payment_bundle.png",
    href: "/help/videos",
    tags: ["Unboxing Demos", "Hardware Setup", "Cash Drawer"],
  },
  {
    id: "help-onboarding",
    title: "Quick-Start Merchant Onboarding Guide",
    category: "guides",
    categoryLabel: "SETUP GUIDE",
    categoryColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50",
    glowColor: "from-emerald-500/15 to-transparent",
    type: "Guide",
    description:
      "A simple 5-step walkthrough to set up your business account, import products, configure tax rates, and process your first checkout.",
    readTime: "5 Easy Steps",
    fileSize: "Step-by-Step",
    fileName: "quantix_getting_started",
    image: "/images/ent_franchise_portal.png",
    href: "/help/getting-started",
    tags: ["First Checkout", "Catalog Import", "Employee PIN"],
  },
  {
    id: "pos-guide",
    title: "Enterprise Multi-Store POS Buying Guide",
    category: "guides",
    categoryLabel: "BUYING GUIDE",
    categoryColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
    glowColor: "from-amber-500/15 to-transparent",
    type: "Guide",
    description:
      "Complete checklist on comparing terminals, eliminating hidden card processing fees, and setting up central menu distribution.",
    readTime: "8 min read",
    fileSize: "Online Guide",
    fileName: "quantix_pos_buying_guide",
    image: "/images/ent_guide_blueprint.png",
    href: "/resources/pos-guide",
    tags: ["Fee Comparison", "Multi-Store HQ", "Hardware Checklist"],
  },
  {
    id: "roi-calc",
    title: "POS Savings & Fee ROI Calculator",
    category: "calculators",
    categoryLabel: "INTERACTIVE TOOL",
    categoryColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/50",
    glowColor: "from-purple-500/15 to-transparent",
    type: "Calculator",
    description:
      "Forecast your annual operational cost savings across credit card processing rates, software licensing, and hardware upkeep.",
    readTime: "Interactive",
    fileSize: "Online Tool",
    fileName: "quantix_roi_calculator",
    image: "/images/ent_roi_analytics.png",
    href: "/roi-calculator",
    tags: ["Card Fee Savings", "Multi-Location ROI", "Annual Forecast"],
  },
  {
    id: "pci-security",
    title: "PCI-DSS Level 1 Security & Encryption Standards",
    category: "guides",
    categoryLabel: "SECURITY STANDARDS",
    categoryColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900/50",
    glowColor: "from-teal-500/15 to-transparent",
    type: "Security",
    description:
      "How Point-to-Point Encryption (P2PE) and EMV tokenization isolate branch registers from cardholder liability and fraud risks.",
    readTime: "Security Brief",
    fileSize: "Compliance",
    fileName: "quantix_pci_compliance",
    image: "/images/nav_payment_bundle.png",
    href: "/pci",
    tags: ["P2PE Encryption", "PCI Level 1", "Card Protection"],
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Resources" },
  { id: "blog", label: "Blog & Insights" },
  { id: "help", label: "Help & Tutorials" },
  { id: "guides", label: "Setup Guides" },
  { id: "calculators", label: "Tools & Calculators" },
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

export default function ResourcesClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ENTERPRISE_RESOURCES.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        !search.trim() ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const handleDownload = (title: string, fileName: string, size: string) => {
    toast.success(`Downloading: ${title}`, {
      description: `Saved as ${fileName} (${size}). Download started.`,
    });
  };

  return (
    <>
      {/* 1. Clean Hero Header */}
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
            <span>ENTERPRISE PLAYBOOKS & BLUEPRINTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.18] tracking-tight"
          >
            Enterprise POS Blueprints & Architecture Toolkits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Technical blueprints, ERP telemetry guidelines, and shift settlement SOPs for multi-unit enterprise operations.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mt-4 max-w-md mx-auto"
          >
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 ml-3 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search architecture blueprints, ERP guides, security briefs..."
                className="w-full bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="p-1 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Smooth Sliding Pill Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-5 sm:mt-6 flex items-center sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x touch-pan-x"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-colors duration-200 shrink-0 snap-center cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEnterpriseResourceFilterPill"
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

      {/* 2. Flagship Blueprint Bento Spotlight */}
      <section className="py-8 sm:py-10 bg-slate-50/60 dark:bg-slate-900/30 border-b border-slate-200/80 dark:border-slate-800">
        <div className="site-container px-4 sm:px-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  FLAGSHIP ARCHITECTURE BLUEPRINT
                </span>
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Clock size={12} />
                  8 min read • PDF Download
                </span>
              </div>

              <h2 className="font-syne text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                Multi-Store POS Rollout & Central Telemetry Architecture
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Complete technical reference for multi-outlet catalog distribution, regional price overrides, zero-latency offline mesh, and SQL data lake exports.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  "Zero-latency sub-4ms local IndexedDB till caching",
                  "Central menu distribution to 50+ branches in < 15 seconds",
                  "SAP & NetSuite ERP automated daily sales sync",
                  "PCI-DSS Tier 1 P2PE encryption & Okta SAML 2.0 SSO",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/resources/pos-guide"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <span>Read Full Blueprint</span>
                  <ArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      "Enterprise POS Architecture Blueprint",
                      "quantix_enterprise_pos_blueprint_2026.pdf",
                      "2.1 MB"
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700"
                >
                  <Download size={13} />
                  <span>Download PDF (2.1 MB)</span>
                </button>
              </div>
            </div>

            {/* Free-Floating 3D Blueprint Mockup */}
            <div className="lg:col-span-5 relative h-56 sm:h-64 flex items-center justify-center">
              <img
                src="/images/ent_guide_blueprint.png"
                alt="Enterprise POS Architecture Blueprint"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fluid Animated Resources Grid */}
      <section className="section-py bg-white dark:bg-slate-950">
        <div className="site-container px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-syne text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Enterprise Operations Toolkits & SOPs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Showing {filtered.length} enterprise technical documents
              </p>
            </div>
          </div>

          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
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
                  <div className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
                    {/* Subtle Ambient Hover Glow */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${item.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10 space-y-3">
                      {/* Top Row: Category Badge + Read Time */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.categoryColor}`}>
                          {item.categoryLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                          <Clock size={11} />
                          {item.readTime}
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
                          {item.description}
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

                    {/* Card Bottom Actions */}
                    <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light"
                      >
                        <span>
                          {item.type === 'Blog' && 'Read Article'}
                          {item.type === 'Help Centre' && 'Open Knowledge Base'}
                          {item.type === 'Video Tutorial' && 'Watch Tutorial'}
                          {item.type === 'Guide' && 'Open Guide'}
                          {item.type === 'Calculator' && 'Launch Calculator'}
                          {item.type === 'Security' && 'View Security Specs'}
                        </span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {item.fileSize}
                      </span>
                    </div>
                  </div>
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
