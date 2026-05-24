// src/components/organisms/IndustriesSection/IndustriesSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Store, Utensils, Check, TrendingUp } from "lucide-react";
import Image from "next/image";

interface FeatureItem {
  text: string;
}

const retailFeaturesLeft: FeatureItem[] = [
  { text: "Barcode & QR scanner support" },
  { text: "Customer loyalty & gift cards" },
  { text: "Purchase order management" },
  { text: "Supplier management" },
];

const retailFeaturesRight: FeatureItem[] = [
  { text: "Multi-warehouse inventory sync" },
  { text: "Discount & coupon engine" },
  { text: "Staff performance reports" },
  { text: "Returns & exchange handling" },
];

const restaurantFeaturesLeft: FeatureItem[] = [
  { text: "Table & floor plan management" },
  { text: "Online ordering integration" },
  { text: "Recipe costing & food cost tracking" },
  { text: "Modifier & combo builder" },
];

const restaurantFeaturesRight: FeatureItem[] = [
  { text: "Kitchen Display System (KDS)" },
  { text: "Split bill & bill-by-seat" },
  { text: "Reservation & waitlist management" },
  { text: "Delivery partner sync" },
];

/** Helper to render a premium 2‑column checklist with interactive hover states */
const Checklist = ({ left, right }: { left: FeatureItem[]; right: FeatureItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
    <div className="space-y-3.5">
      {left.map((item, i) => (
        <div key={i} className="flex items-start space-x-3 text-sm text-gray-700 group/item">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
          <span className="font-medium text-slate-700 text-sm leading-tight">{item.text}</span>
        </div>
      ))}
    </div>
    <div className="space-y-3.5">
      {right.map((item, i) => (
        <div key={i} className="flex items-start space-x-3 text-sm text-gray-700 group/item">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
          <span className="font-medium text-slate-700 text-sm leading-tight">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

export const IndustriesSection = () => {
  const [activeTab, setActiveTab] = useState<"retail" | "restaurant">("retail");

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
  } as const;

  return (
    <section className="bg-slate-50/30 py-24 border-y border-slate-100" id="industries">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
            INDUSTRIES
          </div>
          <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl uppercase leading-tight">
            Tailored for your industry
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium">
            One platform, two specialized modes — retail or restaurant, always the right fit.
          </p>
        </div>

        {/* Tab toggle pill container - Track design */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center rounded-full bg-slate-100/60 p-1 border border-slate-200/40 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("retail")}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                activeTab === "retail"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              <Store className="h-4 w-4" /> Retail
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("restaurant")}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                activeTab === "restaurant"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              <Utensils className="h-4 w-4" /> Restaurant
            </button>
          </div>
        </div>

        {/* Content wrapper */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === "retail" && (
              <motion.div
                key="retail"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left column */}
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600">
                    RETAIL
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-syne font-black text-gray-900 tracking-tight uppercase leading-tight">
                    Built for modern retail stores
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">
                    From boutiques to multi-branch chains — Quantix handles your entire retail workflow. Track inventory across warehouses, manage staff shifts, and deliver a seamless checkout experience.
                  </p>
                  <Checklist left={retailFeaturesLeft} right={retailFeaturesRight} />
                  
                  <button className="mt-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-7 shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer">
                    Get Started →
                  </button>
                </div>
                
                {/* Right column with retail image */}
                <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                  <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <Image
                      src="/images/hero-retail.jpg"
                      alt="Retail shop counter"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-72 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/15">
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Avg. Retail growth</p>
                      <p className="mt-0.5 text-sm sm:text-base font-extrabold text-slate-900 leading-tight">+34% avg. revenue growth</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "restaurant" && (
              <motion.div
                key="restaurant"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left column */}
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600">
                    RESTAURANT
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-syne font-black text-gray-900 tracking-tight uppercase leading-tight">
                    Made for fast-paced restaurants
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">
                    Table management, kitchen display systems, online ordering integration — Quantix keeps your restaurant running smoothly during the busiest hours with zero bottlenecks.
                  </p>
                  <Checklist left={restaurantFeaturesLeft} right={restaurantFeaturesRight} />
                  
                  <button className="mt-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-7 shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer">
                    Get Started →
                  </button>
                </div>
                
                {/* Right column with restaurant image */}
                <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
                  <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <Image
                      src="/images/hero-restaurant.jpg"
                      alt="Gourmet dish presentation"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-72 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md shadow-indigo-500/15">
                      <Utensils className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Avg. Output speed</p>
                      <p className="mt-0.5 text-sm sm:text-base font-extrabold text-slate-900 leading-tight">+40% faster kitchen output</p>
                    </div>
                  </div>
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
