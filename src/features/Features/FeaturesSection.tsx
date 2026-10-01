'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Smartphone, CreditCard, Cloud, Code2, Globe2 } from 'lucide-react';
import { PlatformFeature, FeatureModule, PlatformExtension } from './Types/FeaturesTypes';
import { FeaturesVaultView } from './components/FeaturesVaultView';
import { FeaturesVaultSkeleton } from './components/FeaturesVaultSkeleton';
import { getFeatureIcon } from './lib/getFeatureIcon';

export interface FeaturesSectionProps {
  features?: PlatformFeature[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}



export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = [],
  isLoading = false,
  isError = false,
  onRetry,
}) => {
  if (isLoading) {
    return <FeaturesVaultSkeleton />;
  }

  if (isError || !features || features.length === 0) {
    return null;
  }

  const modules: FeatureModule[] = features.map((f, idx) => ({
    id: f.slug,
    number: f.numberLabel || String(idx + 1).padStart(2, '0'),
    tabLabel: f.title,
    shortMobileName: f.subtitle || f.category,
    category: f.category,
    statusBadge: f.topBadge || f.navbarBadge || 'Active',
    title: f.heroHeadline || f.title,
    description: f.fullDescription || f.shortDescription || '',
    bullets: f.bullets || [],
    stat: {
      label: f.statLabel || 'Performance',
      value: f.statValue || 'Sub-second',
    },
    imageSrc: f.imageUrl || f.imageSrc || '/images/ent_global_pos_bundle.png',
    imageAlt: f.imageAlt || f.title,
    topBadge: f.topBadge || 'Quantix Enterprise',
    bottomBadge: f.bottomBadge || 'Cloud Synced',
    href: f.ctaHref || `/features/${f.slug}`,
    ctaText: f.ctaText || 'Explore Capability',
    icon: getFeatureIcon(f.iconKey),
  }));

  return (
    <section id="features" className="relative overflow-hidden py-12 lg:py-14 text-slate-900 transition-colors dark:text-white">
      {/* Background Depth Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1500px] mx-auto space-y-6 sm:space-y-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF4F00] shadow-xs backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4] text-[#FF4F00]" />
            <span>ENTERPRISE PRODUCT SUITE • UNIFIED OPERATIONS</span>
          </div>

          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.18] tracking-tight text-slate-950 dark:text-white">
            One Connected Platform.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 sm:inline">
              Every Part of Your Operation.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            From high-throughput cashier checkout registers to automated central commissary warehouses and executive financial telemetry.
          </p>
        </div>

        {/* Kinetic Horizontal Expanding Feature Vault */}
        <div className="relative w-full min-h-[520px]" style={{ minHeight: '520px' }}>
          <FeaturesVaultView modules={modules} />
        </div>

        {/* Bottom Connected Ecosystem Extensions Bar */}
        <div className="pt-2 sm:pt-4">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-xs">
            {/* Left: Brand Badge & Label */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF4F00] border border-orange-500/20 shadow-xs">
                <Sparkles size={16} className="text-[#FF4F00]" />
              </div>
              <div>
                <span className="font-syne font-bold uppercase tracking-wider text-xs text-slate-900 dark:text-slate-100 block">
                  Connected Hardware &amp; Extensions:
                </span>
                <span className="font-mono text-[10.5px] text-slate-500 dark:text-slate-400">
                  Universal Plug &amp; Play • Cloud Sync
                </span>
              </div>
            </div>

            {/* Middle: Clean Single-Line Connected Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 flex-1 min-w-0 px-2">
              {features.map((f) => {
                const ExtIcon = getFeatureIcon(f.iconKey);
                const displayLabel = f.topBadge || f.subtitle || f.category;
                const statBadge = f.statValue || 'Active';

                return (
                  <Link
                    key={f.slug}
                    href={f.ctaHref || `/features/${f.slug}`}
                    className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-xs font-syne font-semibold text-slate-800 dark:text-slate-200 hover:text-[#FF4F00] hover:border-orange-500/50 hover:bg-orange-500/[0.03] transition-all shadow-2xs"
                  >
                    <ExtIcon size={14} className="text-[#FF4F00] group-hover:scale-110 transition-transform" />
                    <span className="whitespace-nowrap">{displayLabel}</span>
                    <span className="px-1.5 py-0.5 rounded-md text-[9.5px] font-mono font-bold bg-orange-500/10 text-[#FF4F00] border border-orange-500/20 shrink-0">
                      {statBadge}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right: Sleek Explore CTA Link */}
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-[#FF4F00] hover:text-[#FF6B2B] px-3.5 py-2 rounded-xl bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/15 transition-all shrink-0 group"
            >
              <span>Explore All Modules</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
