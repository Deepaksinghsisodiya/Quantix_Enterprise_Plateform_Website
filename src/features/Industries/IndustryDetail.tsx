// src/features/Industries/IndustryDetail.tsx
'use client';

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Store, Utensils, ShoppingBag, Coffee, Truck, 
  ArrowLeft, CheckCircle2, ChevronRight, Settings, Award 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { IndustryDto } from "./Types/IndustriesTypes";

export interface IndustryDetailProps {
  slug: string;
  apiIndustry: IndustryDto | null;
  isLoading: boolean;
}

interface IndustryData {
  title: string;
  tagline: string;
  icon: React.ReactNode;
  backgroundImage: string;
  heroHeadline: string;
  statNumber: string;
  statLabel: string;
  summary: string;
  keyFeatures: { title: string; desc: string }[];
  technicalHighlights: string[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  retail: <Store className="h-10 w-10 text-primary" />,
  restaurant: <Utensils className="h-10 w-10 text-primary" />,
  grocery: <ShoppingBag className="h-10 w-10 text-primary" />,
  cafes: <Coffee className="h-10 w-10 text-primary" />,
  "food-trucks": <Truck className="h-10 w-10 text-primary" />,
};

const INDUSTRIES_DATA: Record<string, IndustryData> = {
  retail: {
    title: "Retail POS Solutions",
    tagline: "SMART INVENTORY & SCALE FOR RETAIL",
    icon: <Store className="h-10 w-10 text-primary" />,
    backgroundImage: "/images/solutions/solution_retail_boutique.png",
    heroHeadline: "Omnichannel inventory sync for modern storefronts",
    statNumber: "45%",
    statLabel: "Average Inventory Efficiency Gain",
    summary: "Managing retail chains requires flawless coordination across physical storefronts and digital warehouses. Quantix delivers real-time stock sync, multi-store supplier orders, and detailed profit margin analysis, all on one simple dashboard.",
    keyFeatures: [
      { title: "Real-time Matrix Stock", desc: "Easily track items with variations in sizes, colors, categories, and serial barcodes." },
      { title: "Automated Reorder Alerts", desc: "Set minimal threshold warnings that generate supplier draft purchase orders instantly." },
      { title: "Loyalty & Promos", desc: "Deploy customized customer loyalty points, gift cards, and percentage store discounts at checkout." }
    ],
    technicalHighlights: ["Barcode Scanning integration", "Offline database sync", "Supplier purchase engine", "Multi-store warehouse transfers"]
  },
  restaurant: {
    title: "Restaurant POS Systems",
    tagline: "SPEED, TABLES & TABLETS FOR HOSPITALITY",
    icon: <Utensils className="h-10 w-10 text-primary" />,
    backgroundImage: "/images/solutions/solution_fine_dining.png",
    heroHeadline: "Kitchen flow and floor plan sync in real time",
    statNumber: "3.2x",
    statLabel: "Faster Table Turnaround Rate",
    summary: "From order placements to kitchen ticket flows, restaurant operations need high speed. Quantix provides a beautiful graphical floor editor, tableside ordering app connectors, and seamless kitchen display terminal (KDS) coordination.",
    keyFeatures: [
      { title: "Graphical Table Builder", desc: "Recreate your restaurant's exact floor layout. Manage bills, split charges, and merge tables dynamically." },
      { title: "Kitchen Display Integration", desc: "Send orders straight to the kitchen. Color-coded ticket timers eliminate order confusion." },
      { title: "Menu Modifiers", desc: "Customize dishes with complex options (e.g., extra cheese, gluten-free) with instant pricing adjustments." }
    ],
    technicalHighlights: ["KDS communication", "Real-time order sync", "Tableside tablet layout", "Tip and payment splitting"]
  },
  grocery: {
    title: "Grocery POS Systems",
    tagline: "HIGH-VOLUME SPEED & WEIGHING SCALES",
    icon: <ShoppingBag className="h-10 w-10 text-primary" />,
    backgroundImage: "/images/solutions/solution_supermarket.png",
    heroHeadline: "Process thousands of SKU items in seconds",
    statNumber: "0.8s",
    statLabel: "Average Checkout Processing Speed",
    summary: "High volume checkouts, weighing scales, and extensive inventory lines demand a powerful processing core. Quantix POS handles large inventory catalogs with offline local billing speed.",
    keyFeatures: [
      { title: "Scale Calibration Ready", desc: "Connect standard weighing scales directly. Quantix instantly reads item weights and computes pricing." },
      { title: "Massive SKU Management", desc: "Import, edit, and categorize up to 100,000 barcode listings without interface lag." },
      { title: "Local Cache Billing", desc: "Keep lanes scanning even when the internet drops. Sales sync up instantly when connection resumes." }
    ],
    technicalHighlights: ["Scale & device integrations", "IndexedDB caching", "Fast barcode parsing", "Bulk invoice generator"]
  },
  cafes: {
    title: "Cafes & Bars POS Setup",
    tagline: "QUICK ORDERS & MODIFIERS FOR HIGH PACES",
    icon: <Coffee className="h-10 w-10 text-primary" />,
    backgroundImage: "/images/solutions/solution_cafe_bakery.png",
    heroHeadline: "Rapid transactions, open tabs, and happy customers",
    statNumber: "28%",
    statLabel: "Increase in Beverage sales",
    summary: "Rush hours at cafes and bars require rapid fire cashiers and robust tab capabilities. Quantix gives your baristas and bartenders a simplified quick-access button matrix and instant credit card pre-authorizations.",
    keyFeatures: [
      { title: "Open Tabs & Pre-Auths", desc: "Keep customer card tabs open safely. Swipe once, add items dynamically, and close bills with ease." },
      { title: "Smart Barista Matrix", desc: "Customized grid keys with color tags for your best-selling coffees, drinks, and snacks." },
      { title: "Split-Second Checkout", desc: "One-tap tap-to-pay checkouts and digital email/SMS receipt generation." }
    ],
    technicalHighlights: ["Tap-to-pay terminals", "Quick keys matrix", "Card pre-authorization", "Digital SMS Receipts"]
  },
  "food-trucks": {
    title: "Food Truck Mobile POS",
    tagline: "CELLULAR SYNC & MOBILE CARD READERS",
    icon: <Truck className="h-10 w-10 text-primary" />,
    backgroundImage: "/images/solutions/solution_qsr_kiosk.png",
    heroHeadline: "Robust POS system designed to travel with you",
    statNumber: "100%",
    statLabel: "Offline-First Reliability",
    summary: "When you are constantly moving, power grids and internet signals cannot be trusted. Quantix runs fully mobile card readers, handles mobile battery-saving layouts, and syncs over standard cellular hot-spots.",
    keyFeatures: [
      { title: "Cellular Optimized Data", desc: "Extremely low-bandwidth synchronization protocol designed to sync billing over weak 4G/5G signals." },
      { title: "Compact Terminal App", desc: "Optimized mobile tablet interfaces that require minimal physical counter space." },
      { title: "SMS Queuing Alerts", desc: "Send text alerts to customers automatically when their order is ready at the truck counter." }
    ],
    technicalHighlights: ["Low bandwidth protocols", "SMS dispatch engine", "Bluetooth reader connectivity", "Low energy sleep layouts"]
  }
};

export const IndustryDetail: React.FC<IndustryDetailProps> = ({
  slug,
  apiIndustry,
  isLoading,
}) => {
  const router = useRouter();
  const localIndustry = INDUSTRIES_DATA[slug];

  const industry = useMemo(() => {
    if (apiIndustry) {
      return {
        title: apiIndustry.title || apiIndustry.name || "",
        tagline: (apiIndustry.name || apiIndustry.title || "").toUpperCase(),
        icon: ICON_MAP[slug] || <Store className="h-10 w-10 text-primary" />,
        backgroundImage: apiIndustry.imageUrl || "/images/hero/hero_enterprise_inventory.jpg",
        heroHeadline: apiIndustry.description || "",
        statNumber: apiIndustry.statValue || "30%",
        statLabel: apiIndustry.statLabel || "Process Efficiency Gain",
        summary: apiIndustry.description,
        keyFeatures: (apiIndustry.features || []).map((f) => ({ 
          title: f, 
          desc: "Leverage standard high-performance industry tools." 
        })),
        technicalHighlights: apiIndustry.features || [],
      };
    }
    return localIndustry;
  }, [apiIndustry, localIndustry, slug]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 site-container">
        <ATMLoader fullScreen variant="spinner" size="lg" />
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 site-container text-center">
        <Store className="h-16 w-16 text-slate-300 mb-4 animate-pulse" />
        <h1 className="text-3xl font-syne font-bold text-slate-800 mb-2">Industry POS Page Not Found</h1>
        <p className="text-slate-500 mb-6 max-w-sm">The POS system solution you are looking for is not listed. We cover a broad spectrum of commercial verticals.</p>
        <button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 flex-1 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Sub-hero Section */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${industry.backgroundImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        
        <div className="relative site-container flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          <div className="max-w-2xl text-left space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-light uppercase tracking-wider">
              {industry.tagline}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-black text-white uppercase leading-tight">
              {industry.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              {industry.heroHeadline}
            </p>
            <div className="flex flex-row flex-wrap items-center gap-4 pt-2">
              <Link
                href="/sign-up"
                className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full text-xs font-bold transition shadow-lg shadow-primary/25 hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-full text-xs font-bold hover:bg-white/20 transition hover:scale-105"
              >
                Contact Expert
              </Link>
            </div>
          </div>

          {/* Banner Stat Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 max-w-sm w-full space-y-3 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Validated POS Stat</span>
            <h2 className="text-5xl font-syne font-black text-white">{industry.statNumber}</h2>
            <p className="text-sm font-semibold text-slate-200">{industry.statLabel}</p>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">Quantix POS deployments across global merchant networks show immediate process reductions.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Summary Description */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
        <div className="site-container max-w-4xl text-center space-y-6">
          <div className="mx-auto p-4 bg-primary/10 rounded-2xl w-fit">
            {industry.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-syne font-black text-slate-900 dark:text-white uppercase">
            Engineered specifically for your storefront needs
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {industry.summary}
          </p>
        </div>
      </section>

      {/* Section 3: Key Vertical Capabilities */}
      <section className="py-20 site-container">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Enterprise Features</span>
          <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white uppercase">POS Vertical Tools</h2>
          <p className="text-sm font-medium text-slate-500">Every single industry build of Quantix POS comes loaded with specialized terminal tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industry.keyFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl w-fit mb-6 text-primary group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Technical Specs Checklist */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full dark:bg-emerald-950/40 dark:text-emerald-400">
              <Award className="h-3.5 w-3.5" />
              <span>Quantix System Compliance</span>
            </div>
            <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white uppercase leading-tight">
              Integrates directly with certified checkout terminals
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Quantix is engineered from the ground up to connect seamlessly with modern POS terminals, scales, thermal printers, cash drawers, and barcode scanners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.technicalHighlights.map((tech, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Terminal card mock */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden h-72 flex flex-col justify-end">
            <div className="absolute top-0 right-0 h-48 w-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4 max-w-sm">
              <Settings className="h-10 w-10 text-primary-light animate-spin-slow mb-4" />
              <h3 className="text-lg font-syne font-bold text-white uppercase">Plug-and-Play Setup</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">Connect Quantix readers over Bluetooth or Local Ethernet. Autodiscover features handle network configurations instantly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
