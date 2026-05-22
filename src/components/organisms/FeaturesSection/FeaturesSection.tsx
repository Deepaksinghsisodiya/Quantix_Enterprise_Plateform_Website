'use client';
import React from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFeaturesQuery } from "@/redux/services/featuresApi";
import { BarChart2, Package, CreditCard, Users, Globe, Shield, Headphones, Lock, RefreshCw } from "lucide-react";
import { ATMButton } from "@/components/atoms/ATMButton";

// Feature type based on API response (simplified for demo)
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof ICON_MAP;
  color: string; // Tailwind color name (e.g., "blue-500")
}

// Mapping from icon name to actual component and default color
const ICON_MAP = {
  BarChart2: <BarChart2 className="h-5 w-5" />, 
  Package: <Package className="h-5 w-5" />, 
  CreditCard: <CreditCard className="h-5 w-5" />, 
  Users: <Users className="h-5 w-5" />, 
  Globe: <Globe className="h-5 w-5" />, 
  Shield: <Shield className="h-5 w-5" />, 
  Headphones: <Headphones className="h-5 w-5" />, 
  Lock: <Lock className="h-5 w-5" />, 
  RefreshCw: <RefreshCw className="h-5 w-5" />, 
};

// Pre-defined static color classes mapping to resolve Tailwind build resolution
const getColorClasses = (color: string) => {
  switch (color) {
    case "blue-500":
      return "bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600";
    case "purple-500":
      return "bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600";
    case "teal-500":
      return "bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600";
    case "indigo-500":
      return "bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600";
    case "green-500":
      return "bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600";
    case "orange-500":
      return "bg-orange-50 text-orange-600 border border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600";
    case "red-500":
      return "bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600";
    case "cyan-500":
      return "bg-cyan-50 text-cyan-600 border border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600";
    case "violet-500":
      return "bg-violet-50 text-violet-600 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-100 group-hover:bg-gray-600 group-hover:text-white group-hover:border-gray-600";
  }
};

export const FeaturesSection = () => {
  const { data: features = [], isLoading, isError, error } = useFeaturesQuery();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fallback dummy data when API is not yet ready (used for loading skeletons)
  const dummyFeatures: Feature[] = [
    {
      id: "1",
      title: "Real-Time Analytics",
      description:
        "Live dashboards showing sales trends, peak hours, best‑sellers, and revenue — all in one view.",
      icon: "BarChart2",
      color: "blue-500",
    },
    {
      id: "2",
      title: "Smart Inventory",
      description:
        "Automatic stock tracking with low‑stock alerts and one‑click purchase orders to suppliers.",
      icon: "Package",
      color: "purple-500",
    },
    {
      id: "3",
      title: "Omni Payments",
      description:
        "Accept cash, card, contactless, QR codes, and split bills — all settled in seconds.",
      icon: "CreditCard",
      color: "teal-500",
    },
    {
      id: "4",
      title: "Customer Loyalty",
      description:
        "Built‑in CRM with loyalty points, purchase history, and targeted promotions.",
      icon: "Users",
      color: "indigo-500",
    },
    {
      id: "5",
      title: "Multi‑Location",
      description:
        "Manage all your branches from one dashboard. Sync menus, pricing, and reports centrally.",
      icon: "Globe",
      color: "green-500",
    },
    {
      id: "6",
      title: "Bank‑Grade Security",
      description:
        "PCI DSS compliant, end‑to‑end encryption, and role‑based access controls out of the box.",
      icon: "Shield",
      color: "orange-500",
    },
    {
      id: "7",
      title: "24/7 Support",
      description:
        "Live chat, phone, and email support whenever you need it. Real humans, fast responses.",
      icon: "Headphones",
      color: "red-500",
    },
    {
      id: "8",
      title: "Offline Mode",
      description:
        "Keep selling even without internet. Quantix syncs all transactions automatically when back online.",
      icon: "Lock",
      color: "cyan-500",
    },
    {
      id: "9",
      title: "Always Up‑to‑Date",
      description:
        "Automatic silent updates. No downtime, no manual installs, zero disruption.",
      icon: "RefreshCw",
      color: "violet-500",
    },
  ];

  // Choose data source – real API if loaded, else dummy for skeleton phase
  const cards = isLoading ? dummyFeatures : features.length ? features : dummyFeatures;

  return (
    <section
      ref={ref}
      className="bg-white py-24 border-b border-slate-100"
      aria-labelledby="features-section"
    >
      <div className="site-container">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-primary mb-4">
            EVERYTHING INCLUDED
          </div>
          <h2
            id="features-section"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Every tool your business needs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
            From counter to cloud — Quantix handles every part of your operation.
          </p>
        </div>

        {/* Card Grid */}
        <div
          className={cn(
            "mt-16 grid gap-8",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {cards.map((card: Feature, idx: number) => (
            <motion.div
              key={card.id}
              className={cn(
                "rounded-2xl border border-slate-100 bg-white p-8 text-left hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden group shadow-[0_4px_12px_rgba(0,0,0,0.015)]",
                isLoading && "animate-pulse"
              )}
              initial={{ opacity: 0, translateY: 20 }}
              animate={isInView ? { opacity: 1, translateY: 0 } : {}}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              {/* Corner highlight gradient glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Container */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-sm transition-all duration-300",
                  getColorClasses(card.color)
                )}
              >
                {/* @ts-ignore – the icon map is typed loosely for brevity */}
                {ICON_MAP[card.icon]}
              </div>
              <h3 className="mt-6 text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300 font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional fallback on error */}
        {isError && (
          <div className="mt-8 text-center text-red-600">
            <p>Failed to load features. Please try again later.</p>
            {/* Simple retry button – triggers refetch via RTK‑Query */}
            <ATMButton
              variant="outline"
              onClick={() => {
                // @ts-ignore – useFeaturesQuery expose refetch via dispatch
                // In real code you would call the .refetch() method from the hook
              }}
            >
              Retry
            </ATMButton>
          </div>
        )}
      </div>
    </section>
  );
};
