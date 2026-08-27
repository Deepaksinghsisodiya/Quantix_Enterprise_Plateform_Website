// src/features/Industries/IndustriesSection.tsx
'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Store, Utensils, Check, ShoppingBag, Coffee, Truck } from "lucide-react";
import Image from "next/image";
import { IndustryDto } from "./Types/IndustriesTypes";

export interface IndustriesSectionProps {
  apiIndustries: IndustryDto[];
  isLoading: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  retail: <Store className="h-4 w-4" />,
  restaurant: <Utensils className="h-4 w-4" />,
  grocery: <ShoppingBag className="h-4 w-4" />,
  cafes: <Coffee className="h-4 w-4" />,
  "food-trucks": <Truck className="h-4 w-4" />,
};

const STAT_ICON_MAP: Record<string, React.ReactNode> = {
  retail: <Store className="h-5 w-5" />,
  restaurant: <Utensils className="h-5 w-5" />,
  grocery: <ShoppingBag className="h-5 w-5" />,
  cafes: <Coffee className="h-5 w-5" />,
  "food-trucks": <Truck className="h-5 w-5" />,
};

const getIcon = (slug: string) => ICON_MAP[slug] || <Store className="h-4 w-4" />;
const getStatIcon = (slug: string) => STAT_ICON_MAP[slug] || <Store className="h-5 w-5" />;

const Checklist = ({ left, right }: { left: string[]; right: string[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
    <div className="space-y-3.5">
      {left.map((item, i) => (
        <div key={i} className="flex items-start space-x-3 text-sm text-gray-700 group/item">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
          <span className="font-medium text-slate-700 text-sm leading-tight">{item}</span>
        </div>
      ))}
    </div>
    <div className="space-y-3.5">
      {right.map((item, i) => (
        <div key={i} className="flex items-start space-x-3 text-sm text-gray-700 group/item">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
          <span className="font-medium text-slate-700 text-sm leading-tight">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const DEFAULT_INDUSTRIES: IndustryDto[] = [
  {
    id: "retail",
    slug: "retail",
    name: "Retail",
    title: "Built for modern retail stores",
    description: "From boutiques to multi-branch chains — Quantix handles your entire retail workflow. Track inventory across warehouses, manage staff shifts, and deliver a seamless checkout experience.",
    features: [
      "Barcode & QR scanner support",
      "Customer loyalty & gift cards",
      "Purchase order management",
      "Supplier management",
      "Multi-warehouse inventory sync",
      "Discount & coupon engine",
      "Staff performance reports",
      "Returns & exchange handling"
    ],
    imageUrl: "/images/hero-retail.jpg",
    statLabel: "Avg. Retail growth",
    statValue: "+34% avg. revenue growth"
  },
  {
    id: "restaurant",
    slug: "restaurant",
    name: "Restaurant",
    title: "Made for fast-paced restaurants",
    description: "Table management, kitchen display systems, online ordering integration — Quantix keeps your restaurant running smoothly during the busiest hours with zero bottlenecks.",
    features: [
      "Table & floor plan management",
      "Online ordering integration",
      "Recipe costing & food cost tracking",
      "Modifier & combo builder",
      "Kitchen Display System (KDS)",
      "Split bill & bill-by-seat",
      "Reservation & waitlist management",
      "Delivery partner sync"
    ],
    imageUrl: "/images/hero-restaurant.jpg",
    statLabel: "Avg. Output speed",
    statValue: "+40% faster kitchen output"
  }
];

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  apiIndustries,
}) => {
  const industries = apiIndustries.length > 0 ? apiIndustries : DEFAULT_INDUSTRIES;
  const [activeTab, setActiveTab] = useState<string>("retail");

  useEffect(() => {
    if (industries.length > 0 && !industries.some(ind => ind.slug === activeTab)) {
      setActiveTab(industries[0].slug);
    }
  }, [industries, activeTab]);

  const activeIndustry = industries.find(ind => ind.slug === activeTab) || industries[0];

  const leftFeatures = activeIndustry ? activeIndustry.features.slice(0, Math.ceil(activeIndustry.features.length / 2)) : [];
  const rightFeatures = activeIndustry ? activeIndustry.features.slice(Math.ceil(activeIndustry.features.length / 2)) : [];

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
  } as const;

  return (
    <section className="bg-slate-50/30 py-10 sm:py-14 lg:py-20 border-y border-slate-100" id="industries">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
            INDUSTRIES
          </div>
          <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl leading-tight">
            Tailored for your industry
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium">
            One platform, specialized modes — built to be always the right fit for your commercial needs.
          </p>
        </div>

        {/* Tab toggle pill container */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center rounded-full bg-slate-100/60 p-1 border border-slate-200/40 shadow-inner flex-wrap justify-center gap-1">
            {industries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveTab(ind.slug)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  activeTab === ind.slug
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                )}
              >
                {getIcon(ind.slug)} {ind.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content wrapper */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeIndustry && (
              <motion.div
                key={activeIndustry.slug}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left column */}
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                    {activeIndustry.name}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-syne font-black text-gray-900 tracking-tight uppercase leading-tight">
                    {activeIndustry.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">
                    {activeIndustry.description}
                  </p>
                  <Checklist left={leftFeatures} right={rightFeatures} />

                  <a
                    href="/sign-up"
                    className="mt-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-7 shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 inline-block text-center cursor-pointer"
                  >
                    Get Started →
                  </a>
                </div>

                {/* Right column with image */}
                <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                  <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <Image
                      src={activeIndustry.imageUrl || "/images/hero-retail.jpg"}
                      alt={activeIndustry.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Floating stat card */}
                  {activeIndustry.statValue && (
                    <div className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-72 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/15">
                        {getStatIcon(activeIndustry.slug)}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                          {activeIndustry.statLabel || "Avg. Growth"}
                        </p>
                        <p className="mt-0.5 text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                          {activeIndustry.statValue}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
