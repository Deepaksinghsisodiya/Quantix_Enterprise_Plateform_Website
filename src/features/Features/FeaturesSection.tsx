// src/features/Features/FeaturesSection.tsx
'use client';

import React from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BarChart2, Package, CreditCard, Users, Globe, Shield, Headphones, Lock, RefreshCw, ChefHat, Building, Zap } from "lucide-react";
import { ATMButton } from "@/components/atoms/ATMButton";
import { Feature } from "./Types/FeaturesTypes";

export interface FeaturesSectionProps {
  features: Feature[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

// Mapping from icon name to actual component
const ICON_MAP: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="h-6 w-6 stroke-[2.25]" />, 
  Package: <Package className="h-6 w-6 stroke-[2.25]" />, 
  CreditCard: <CreditCard className="h-6 w-6 stroke-[2.25]" />, 
  Users: <Users className="h-6 w-6 stroke-[2.25]" />, 
  Globe: <Globe className="h-6 w-6 stroke-[2.25]" />, 
  Shield: <Shield className="h-6 w-6 stroke-[2.25]" />, 
  Headphones: <Headphones className="h-6 w-6 stroke-[2.25]" />, 
  Lock: <Lock className="h-6 w-6 stroke-[2.25]" />, 
  RefreshCw: <RefreshCw className="h-6 w-6 stroke-[2.25]" />, 
  ChefHat: <ChefHat className="h-6 w-6 stroke-[2.25]" />, 
  Building: <Building className="h-6 w-6 stroke-[2.25]" />, 
  Zap: <Zap className="h-6 w-6 stroke-[2.25]" />, 
};

export interface ExtendedFeature extends Feature {
  category?: 'counter' | 'inventory' | 'kitchen' | 'enterprise';
  tag?: string;
}

const DEFAULT_FEATURES: ExtendedFeature[] = [
  {
    id: "inventory",
    title: "Dynamic Matrix Stock & Batches",
    description: "Manage variant items (sizes, colors, barcodes, expiry dates) in absolute real-time without stock discrepancy across stores.",
    icon: "Package",
    color: "blue-500",
    category: "inventory",
    tag: "Stock & Warehouse"
  },
  {
    id: "analytics",
    title: "Visual BI Sales Analytics",
    description: "Keep track of hourly sales velocity, top-performing SKUs, staff productivity, and profit margins in one live portal.",
    icon: "BarChart2",
    color: "purple-500",
    category: "counter",
    tag: "Real-Time BI"
  },
  {
    id: "payments",
    title: "Omni Card & Contactless Checkout",
    description: "Swipe, dip, or tap. Accept major credit cards, QR codes, split bills, and mobile wallets with sub-second checkout.",
    icon: "CreditCard",
    color: "teal-500",
    category: "counter",
    tag: "Payments"
  },
  {
    id: "loyalty",
    title: "Custom CRM & Customer Loyalty",
    description: "Reward recurring shoppers automatically using tier points, custom gift vouchers, and checkout automated discounts.",
    icon: "Users",
    color: "indigo-500",
    category: "counter",
    tag: "CRM & Retention"
  },
  {
    id: "cloud",
    title: "Multi-Store Cloud Sync Engine",
    description: "Unify remote warehouses, suppliers, stock allocations, and employee shifts centrally from any browser.",
    icon: "Globe",
    color: "green-500",
    category: "enterprise",
    tag: "Cloud Telemetry"
  },
  {
    id: "kitchen",
    title: "Kitchen Display (KDS) & Floor Maps",
    description: "Course-by-course prep timers, visual table layouts, split bills, and instant order dispatch for fast-paced kitchens.",
    icon: "ChefHat",
    color: "orange-500",
    category: "kitchen",
    tag: "Restaurant Ops"
  },
  {
    id: "enterprise-isolation",
    title: "Multi-Tenant Enterprise Isolation",
    description: "Isolate franchise branches, global catalogs, regional tax rules, and role-based cluster admin rights securely.",
    icon: "Building",
    color: "violet-500",
    category: "enterprise",
    tag: "Multi-Tenant"
  },
  {
    id: "offline",
    title: "Offline-First Local Terminal Billing",
    description: "Keep selling uninterrupted even during internet outages. Transactions queue locally and auto-sync when reconnected.",
    icon: "RefreshCw",
    color: "cyan-500",
    category: "counter",
    tag: "Zero Downtime"
  },
  {
    id: "security",
    title: "Bank-Grade Encryption Vault",
    description: "PCI DSS Level 1 compliant, SOC 2 Type II certified, with end-to-end encryption and audit trail logs out of the box.",
    icon: "Shield",
    color: "red-500",
    category: "enterprise",
    tag: "Bank Security"
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
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const rawFeatures = (features.length > 0 ? features : DEFAULT_FEATURES) as ExtendedFeature[];

  const filteredFeatures = activeTab === "all" 
    ? rawFeatures 
    : rawFeatures.filter(f => f.category === activeTab);

  const TABS = [
    { id: "all", label: "All Modules" },
    { id: "counter", label: "Counter & Checkout" },
    { id: "inventory", label: "Inventory & Warehouses" },
    { id: "kitchen", label: "Kitchen & Floor Ops" },
    { id: "enterprise", label: "Enterprise & Security" },
  ];

  return (
    <section
      ref={ref}
      className="bg-slate-50/50 py-10 sm:py-14 lg:py-20 border-b border-slate-100"
      aria-labelledby="features-section"
    >
      <div className="site-container">
        <div className="text-center mb-8 sm:mb-12">
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

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 border cursor-pointer",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                    : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
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

          {!isLoading && filteredFeatures.map((card: ExtendedFeature, idx: number) => (
            <motion.div
              key={card.id}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 text-left transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] flex flex-col justify-between"
              initial={{ opacity: 0, translateY: 20 }}
              animate={isInView ? { opacity: 1, translateY: 0 } : {}}
              transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* Icon Container */}
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl text-sm transition-all duration-300",
                      getColorClasses(card.color)
                    )}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {ICON_MAP[card.icon] || <Package className="h-5 w-5" />}
                    </div>
                  </div>

                  {card.tag && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {card.tag}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-lg font-syne font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-300 font-medium">
                  {card.description}
                </p>
              </div>
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
