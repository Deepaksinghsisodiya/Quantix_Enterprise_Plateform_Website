"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { FEATURE_MODULES, PLATFORM_ECOSYSTEM_CHIPS } from "./constants/featuresData";
import { FeaturesVaultView } from "./components/FeaturesVaultView";

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative overflow-hidden py-12 lg:py-14 text-slate-900 transition-colors dark:text-white">
      {/* Background Depth Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF4F00] shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4] text-[#FF4F00]" />
            <span>ENTERPRISE PRODUCT SUITE • UNIFIED OPERATIONS</span>
          </div>

          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.18] tracking-tight text-slate-950 dark:text-white">
            One Connected Platform.{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 sm:inline">
              Every Part of Your Operation.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            From high-throughput cashier checkout registers to automated central commissary warehouses and executive financial telemetry.
          </p>
        </div>

        {/* Kinetic Horizontal Expanding Feature Vault (How It Works Elastic Architecture) */}
        <div className="relative">
          <FeaturesVaultView modules={FEATURE_MODULES} />
        </div>

        {/* Bottom Connected Ecosystem Extensions Bar */}
        <div className="pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#FF4F00]" />
              <span className="font-syne font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-slate-100">
                Connected Hardware &amp; Extensions:
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {PLATFORM_ECOSYSTEM_CHIPS.map((ext) => {
                const ExtIcon = ext.icon;
                return (
                  <Link
                    key={ext.id}
                    href={ext.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[10.5px] sm:text-[11px] font-syne font-semibold text-slate-800 dark:text-slate-200 hover:text-[#FF4F00] dark:hover:text-orange-400 hover:border-orange-500/40 transition-colors shadow-2xs"
                  >
                    <ExtIcon size={12} className="text-[#FF4F00]" />
                    <span>{ext.title}</span>
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">({ext.badge})</span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/features"
              className="inline-flex items-center gap-1 text-[11px] font-syne font-bold text-[#FF4F00] hover:underline"
            >
              <span>Explore All Modules</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
