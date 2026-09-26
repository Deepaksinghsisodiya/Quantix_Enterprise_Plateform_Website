// src/app/(public)/resources/clientele/ClientelePageClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Handshake,
  ChevronRight,
  Sparkles,
  Search,
  Building2,
  Store,
  Coffee,
  ShoppingBag,
  UtensilsCrossed,
  ExternalLink,
  CheckCircle2,
  Star,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Globe2,
  RotateCcw,
} from 'lucide-react';
import { useGetClienteleQuery } from '@/features/Clientele/Service/ClienteleService';
import type { ClientBrandDto } from '@/features/Clientele/Types/ClienteleTypes';
import { ATMSkeleton } from '@/components/atoms';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import ClienteleMarquee from '@/features/Clientele/components/ClienteleMarquee';

interface ClientelePageClientProps {
  siteVariant?: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Brands', icon: Sparkles },
  { id: 'enterprise', label: 'Enterprise Chains', icon: Building2 },
  { id: 'restaurant', label: 'Dining & Cafes', icon: UtensilsCrossed },
  { id: 'retail', label: 'Retail & Supermarket', icon: ShoppingBag },
  { id: 'franchise', label: 'Franchise Networks', icon: Store },
];

const getCategoryIcon = (industry?: string, category?: string) => {
  const norm = `${industry || ''} ${category || ''}`.toLowerCase();
  if (norm.includes('coffee') || norm.includes('cafe')) return Coffee;
  if (norm.includes('restaurant') || norm.includes('dining') || norm.includes('hospitality')) return UtensilsCrossed;
  if (norm.includes('retail') || norm.includes('shop') || norm.includes('store') || norm.includes('apparel')) return ShoppingBag;
  if (norm.includes('franchise')) return Store;
  return Building2;
};

// High-End Directory Brand Card
const DirectoryBrandCard: React.FC<{ brand: ClientBrandDto }> = ({ brand }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const Icon = getCategoryIcon(brand.industry, brand.category);
  const name = brand.name || brand.title || 'Brand Partner';
  const category = brand.category || 'Enterprise';
  const industry = brand.industry || '';
  const locationsCount = brand.locationsCount;
  const isFeatured = !!brand.isFeatured;
  const websiteUrl = brand.websiteUrl || brand.linkUrl;
  const logoUrl =
    !imgError && (brand.logoUrl || (brand.mediaAssetId ? `/api/v1/media/${brand.mediaAssetId}/file` : null));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Brand Ambient Glow on Hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,#FF4F0012,transparent_70%)]" />

      <div>
        {/* Top Bar: Category Pill & Status Badge */}
        <div className="flex items-center justify-between gap-2 relative z-10 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/90 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/70">
            <Icon className="w-3 h-3 text-[#FF4F00]" />
            <span>{category}</span>
          </div>

          {isFeatured ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-syne font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shadow-2xs">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              Featured
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[9.5px] font-mono text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Verified
            </span>
          )}
        </div>

        {/* Center: Brand Logo Viewport */}
        <div className="relative h-20 sm:h-22 w-full flex items-center justify-center bg-slate-50/80 dark:bg-slate-800/40 rounded-xl sm:rounded-2xl p-3 border border-slate-100 dark:border-slate-800/70 z-10 mb-4 overflow-hidden">
          {logoUrl ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700/80 rounded-xl" />
              )}
              <img
                src={logoUrl}
                alt={`${name} logo`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`max-h-full max-w-full object-contain filter dark:brightness-110 transition-all duration-300 group-hover:scale-105 ${
                  !imgLoaded ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
              />
            </>
          ) : (
            <div className="flex items-center gap-2.5 text-[#FF4F00] font-syne font-bold text-base">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-slate-900 dark:text-white font-bold">{name}</span>
            </div>
          )}
        </div>

        {/* Brand Info */}
        <div className="space-y-1 relative z-10 mb-4">
          <h3 className="text-base sm:text-lg font-syne font-bold text-slate-900 dark:text-white group-hover:text-[#FF4F00] transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {industry || category || 'Enterprise Brand Partner'}
          </p>
        </div>
      </div>

      {/* Bottom Bar: Locations & Website Link */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10 text-xs">
        {locationsCount ? (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-md border border-blue-500/20 text-[11px]">
            <MapPin className="w-3 h-3" />
            {locationsCount}+ Units
          </span>
        ) : (
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            {brand.tier || 'Enterprise Chain'}
          </span>
        )}

        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary dark:text-orange-400 hover:text-orange-600 hover:underline transition-colors"
          >
            <span>Visit Brand</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">Active Fleet</span>
        )}
      </div>
    </motion.div>
  );
};

export default function ClientelePageClient({ siteVariant = 'Enterprise' }: ClientelePageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: brands = [], isLoading } = useGetClienteleQuery(siteVariant);

  const activeBrands = useMemo(() => {
    return brands.filter((b) => b.isActive !== false);
  }, [brands]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activeBrands.length };
    activeBrands.forEach((b) => {
      const cat = (b.category || '').toLowerCase();
      const ind = (b.industry || '').toLowerCase();
      CATEGORIES.forEach((c) => {
        if (c.id !== 'all') {
          if (cat.includes(c.id) || ind.includes(c.id)) {
            counts[c.id] = (counts[c.id] || 0) + 1;
          }
        }
      });
    });
    return counts;
  }, [activeBrands]);

  const filteredBrands = useMemo(() => {
    return activeBrands.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const name = (b.name || b.title || '').toLowerCase();
      const industry = (b.industry || '').toLowerCase();
      const cat = (b.category || '').toLowerCase();

      const matchesSearch =
        q === '' || name.includes(q) || industry.includes(q) || cat.includes(q);

      const matchesCategory =
        activeCategory === 'all' ||
        cat.includes(activeCategory) ||
        industry.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [activeBrands, searchQuery, activeCategory]);

  const totalLocations = useMemo(() => {
    return activeBrands.reduce((acc, b) => acc + (b.locationsCount || 0), 0);
  }, [activeBrands]);

  const trustMetrics = [
    {
      value: isLoading ? '...' : `${activeBrands.length || 100}+`,
      label: 'Brand Partners',
      desc: 'Active High-Volume Chains',
      icon: Handshake,
      color: 'text-orange-500',
    },
    {
      value: isLoading ? '...' : `${totalLocations > 0 ? totalLocations : 10000}+`,
      label: 'Outlets Worldwide',
      desc: 'Registers & Multi-Units',
      icon: Globe2,
      color: 'text-blue-500',
    },
    {
      value: '100M+',
      label: 'Annual Transactions',
      desc: 'Processed Securely',
      icon: TrendingUp,
      color: 'text-amber-500',
    },
    {
      value: '99.99%',
      label: 'System Reliability',
      desc: 'Mission-Critical SLA',
      icon: ShieldCheck,
      color: 'text-emerald-500',
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER (Exact site-wide standard with .page-hero-header & responsive padding) */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
        {/* Subtle Architectural Dot Pattern Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />

        {/* Ambient Radial Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-linear-to-b from-[#FF4F00]/12 via-[#FF4F00]/4 to-transparent blur-3xl -z-10" />

        <div className="site-container relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium border border-slate-200/70 dark:border-slate-700/60 backdrop-blur-md">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-primary font-bold">Brand Partners &amp; Clientele</span>
          </nav>

          {/* Top Category Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10.5px] font-black uppercase tracking-widest text-[#FF4F00] mb-4 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#FF4F00] animate-pulse" />
              <span>ENTERPRISE CLIENTELE • TRUSTED BRAND NETWORK</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.16] max-w-4xl mx-auto">
            High-Volume Brands Powered by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
              Quantix Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Discover the multi-location enterprise chains, dining groups, and supermarket franchises orchestrating mission-critical store checkouts and cloud operations with Quantix.
          </p>

          {/* 4 Trust Metric Cards (Matching Integrations Client Standard) */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            {trustMetrics.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {stat.label}
                    </span>
                    <StatIcon className={`w-3.5 h-3.5 ${stat.color}`} />
                  </div>
                  <div className="text-xl sm:text-2xl font-syne font-extrabold text-slate-900 dark:text-white leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {stat.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DIRECTORY SHOWCASE & SEARCH (Proper py spacing matching other pages)   */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Controls Bar: Search & Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-2 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                const count = categoryCounts[cat.id];

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/25'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    {count !== undefined && count > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search brand, industry, or scale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/40 shadow-inner"
              />
            </div>
          </div>

          {/* Brand Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <ATMSkeleton className="h-5 w-24 rounded-full" />
                    <ATMSkeleton className="h-4 w-14 rounded-full" />
                  </div>
                  <ATMSkeleton className="h-20 w-full rounded-xl sm:rounded-2xl" />
                  <ATMSkeleton className="h-5 w-36 rounded" />
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                    <ATMSkeleton className="h-4 w-20 rounded" />
                    <ATMSkeleton className="h-4 w-16 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 sm:p-16 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white">
                No matching brand partners found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find any partners matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer shadow-md shadow-primary/20"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredBrands.map((brand) => (
                  <DirectoryBrandCard
                    key={brand.id || brand.clientLogoId || brand.name}
                    brand={brand}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE INFINITE MARQUEE SECTION                                          */}
      {/* ========================================================================= */}
      <section className="bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <ClienteleMarquee clientele={brands} isLoading={isLoading} />
      </section>

      {/* ========================================================================= */}
      {/* 4. HIGH-CONVERTING BOTTOM CTA BANNER                                      */}
      {/* ========================================================================= */}
      <CTABanner />
    </main>
  );
}
