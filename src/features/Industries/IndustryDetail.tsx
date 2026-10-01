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


const ICON_MAP: Record<string, React.ReactNode> = {
  retail: <Store className="h-10 w-10 text-primary" />,
  restaurant: <Utensils className="h-10 w-10 text-primary" />,
  grocery: <ShoppingBag className="h-10 w-10 text-primary" />,
  cafes: <Coffee className="h-10 w-10 text-primary" />,
  "food-trucks": <Truck className="h-10 w-10 text-primary" />,
};

export const IndustryDetail: React.FC<IndustryDetailProps> = ({
  slug,
  apiIndustry,
  isLoading,
}) => {
  const router = useRouter();

  const industry = useMemo(() => {
    if (apiIndustry) {
      return {
        title: apiIndustry.title || apiIndustry.name || "",
        tagline: (apiIndustry.name || apiIndustry.title || "").toUpperCase(),
        icon: ICON_MAP[slug] || <Store className="h-10 w-10 text-primary" />,
        backgroundImage: apiIndustry.imageUrl || "/images/hero-retail.jpg",
        heroHeadline: apiIndustry.description || "",
        statNumber: apiIndustry.statValue || "30%",
        statLabel: apiIndustry.statLabel || "Process Efficiency Gain",
        summary: apiIndustry.description || "",
        keyFeatures: Array.isArray(apiIndustry.features) ? apiIndustry.features.map((f) => ({ 
          title: f, 
          desc: "Leverage standard high-performance industry tools." 
        })) : [],
        technicalHighlights: Array.isArray(apiIndustry.features) ? apiIndustry.features : [],
      };
    }
    return null;
  }, [apiIndustry, slug]);

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
