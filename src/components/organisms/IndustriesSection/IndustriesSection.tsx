// src/components/organisms/IndustriesSection/IndustriesSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Store, Utensils, Check, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ATMButton } from "../../atoms/ATMButton";
import { ATMBadge } from "../../atoms/ATMBadge"; // assume exists, else simple div

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

/** Helper to render a 2‑column checklist */
const Checklist = ({ left, right }: { left: FeatureItem[]; right: FeatureItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
    <div className="space-y-2.5">
      {left.map((item, i) => (
        <div key={i} className="flex items-start space-x-2 text-sm text-gray-700">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </div>
          <span className="font-semibold text-slate-800 text-xs">{item.text}</span>
        </div>
      ))}
    </div>
    <div className="space-y-2.5">
      {right.map((item, i) => (
        <div key={i} className="flex items-start space-x-2 text-sm text-gray-700">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </div>
          <span className="font-semibold text-slate-800 text-xs">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

export const IndustriesSection = () => {
  const [activeTab, setActiveTab] = useState<"retail" | "restaurant">("retail");

  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  } as const;

  return (
    <section className="bg-slate-50/30 py-24 border-y border-slate-100" id="industries">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 mb-4">
            INDUSTRIES
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tailored for your industry
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
            One platform, two specialized modes — retail or restaurant, always the right fit.
          </p>
        </div>

        {/* Tab toggle pill container */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-full bg-slate-100/80 p-1.5 border border-slate-200/50 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("retail")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "retail"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Store className="h-4 w-4" /> Retail
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("restaurant")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "restaurant"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
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
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600">
                    RETAIL
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    Built for modern retail stores
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    From boutiques to multi-branch chains — Quantix handles your entire retail workflow. Track inventory across warehouses, manage staff shifts, and deliver a seamless checkout experience.
                  </p>
                  <Checklist left={retailFeaturesLeft} right={retailFeaturesRight} />
                  <button className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-6 shadow-sm transition cursor-pointer">
                    Get Started →
                  </button>
                </div>
                {/* Right column with retail image */}
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400">Avg. result</p>
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
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-600">
                    RESTAURANT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    Made for fast-paced restaurants
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Table management, kitchen display systems, online ordering integration — Quantix keeps your restaurant running smoothly during the busiest hours with zero bottlenecks.
                  </p>
                  <Checklist left={restaurantFeaturesLeft} right={restaurantFeaturesRight} />
                  <button className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 px-6 shadow-sm transition cursor-pointer">
                    Get Started →
                  </button>
                </div>
                {/* Right column with restaurant image */}
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400">Avg. result</p>
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
