// src/features/Features/FeaturesSection.tsx
'use client';

import React from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BarChart2, Package, CreditCard, Users, Globe, Shield, Headphones, Lock, RefreshCw } from "lucide-react";
import { ATMButton } from "@/components/atoms/ATMButton";
import { Feature } from "./Types/FeaturesTypes";

export interface FeaturesSectionProps {
  features: Feature[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

// Mapping from icon name to actual component
const ICON_MAP = {
  BarChart2: <BarChart2 className="h-6 w-6 stroke-[2.25]" />, 
  Package: <Package className="h-6 w-6 stroke-[2.25]" />, 
  CreditCard: <CreditCard className="h-6 w-6 stroke-[2.25]" />, 
  Users: <Users className="h-6 w-6 stroke-[2.25]" />, 
  Globe: <Globe className="h-6 w-6 stroke-[2.25]" />, 
  Shield: <Shield className="h-6 w-6 stroke-[2.25]" />, 
  Headphones: <Headphones className="h-6 w-6 stroke-[2.25]" />, 
  Lock: <Lock className="h-6 w-6 stroke-[2.25]" />, 
  RefreshCw: <RefreshCw className="h-6 w-6 stroke-[2.25]" />, 
};

const DEFAULT_FEATURES: Feature[] = [
  {
    id: "inventory",
    title: "Dynamic Matrix Stock",
    description: "Manage variant items (sizes, colors, barcodes) in absolute real-time without inventory mismatch.",
    icon: "Package",
    color: "blue-500"
  },
  {
    id: "analytics",
    title: "Visual Sales Reporting",
    description: "Keep track of hourly sales, top items, and profit margin analysis in one simple dashboard.",
    icon: "BarChart2",
    color: "purple-500"
  },
  {
    id: "payments",
    title: "Universal Card Terminals",
    description: "Swipe, dip, or tap. Process major credit cards and mobile wallets with local-offline fallback speed.",
    icon: "CreditCard",
    color: "teal-500"
  },
  {
    id: "loyalty",
    title: "Custom Customer Profiles",
    description: "Reward recurring buyers automatically using tier points, gift codes, and checkout discounts.",
    icon: "Users",
    color: "indigo-500"
  },
  {
    id: "cloud",
    title: "Multi-Store Cloud Sync",
    description: "Unify remote warehouses, suppliers, stock allocations, and employee log lists in the cloud.",
    icon: "Globe",
    color: "green-500"
  },
  {
    id: "security",
    title: "Encrypted Data Vault",
    description: "Bank-level encryption (SSL & PCI Compliant) keeping your receipts and sales audits safe.",
    icon: "Shield",
    color: "orange-500"
  }
];

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

const getGlowClass = (color: string) => {
  switch (color) {
    case "blue-500": return "from-blue-500/10";
    case "purple-500": return "from-purple-500/10";
    case "teal-500": return "from-teal-500/10";
    case "indigo-500": return "from-indigo-500/10";
    case "green-500": return "from-green-500/10";
    case "orange-500": return "from-orange-500/10";
    case "red-500": return "from-red-500/10";
    case "cyan-500": return "from-cyan-500/10";
    case "violet-500": return "from-violet-500/10";
    default: return "from-slate-500/10";
  }
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  isLoading,
  isError,
  onRetry,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayFeatures = features.length > 0 ? features : DEFAULT_FEATURES;

  return (
    <section
      ref={ref}
      className="bg-slate-50/50 py-20 sm:py-24 border-b border-slate-100"
      aria-labelledby="features-section"
    >
      <div className="site-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
            EVERYTHING INCLUDED
          </div>
          <h2
            id="features-section"
            className="text-4xl font-syne font-black tracking-tight text-slate-900 sm:text-5xl leading-[1.1]"
          >
            Every tool your business needs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium">
            From counter to cloud — Quantix handles every part of your operation.
          </p>
        </div>

        {/* Card Grid */}
        <div
          className={cn(
            "grid gap-8",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {isLoading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-[2rem] border border-slate-100 p-8 animate-pulse bg-white flex flex-col space-y-4">
              <div className="h-12 w-12 bg-gray-200 rounded-xl" />
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          ))}

          {!isLoading && displayFeatures.map((card: Feature, idx: number) => (
            <motion.div
              key={card.id}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 text-left transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)]"
              initial={{ opacity: 0, translateY: 20 }}
              animate={isInView ? { opacity: 1, translateY: 0 } : {}}
              transition={{ delay: idx * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-sm transition-all duration-300",
                  getColorClasses(card.color)
                )}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {/* @ts-ignore – safety fallback */}
                  {ICON_MAP[card.icon] || <Package className="h-5 w-5" />}
                </div>
              </div>
              
              <h3 className="mt-6 text-lg font-syne font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300 font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional fallback on error */}
        {isError && (
          <div className="mt-12 text-center text-red-600 flex flex-col items-center justify-center space-y-3">
            <p className="text-sm font-semibold">Failed to refresh features. Displaying local cache.</p>
            {onRetry && (
              <ATMButton variant="outline" size="sm" onClick={onRetry}>
                Retry
              </ATMButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
