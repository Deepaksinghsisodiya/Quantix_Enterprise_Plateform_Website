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
  Filter,
} from 'lucide-react';
import { useGetClienteleQuery } from '@/features/Clientele/Service/ClienteleService';
import type { ClientBrandDto } from '@/features/Clientele/Types/ClienteleTypes';
import { ATMSkeleton } from '@/components/atoms';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import ClienteleMarquee from '@/features/Clientele/components/ClienteleMarquee';

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
  const logoUrl = !imgError && brand.logoUrl ? brand.logoUrl : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-xl hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all flex flex-col justify-between overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_top_right,#FF4F0010,transparent_70%)]" />

      {/* Top Bar: Category Pill & Status Badge */}
      <div className="flex items-center justify-between gap-2 relative z-10 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
          <Icon className="w-3 h-3 text-[#FF4F00]" />
          <span>{category}</span>
        </div>

        {isFeatured ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
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
      <div className="relative h-20 w-full flex items-center justify-center bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-100 dark:border-slate-800/70 z-10 mb-4 overflow-hidden">
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
          <div className="flex items-center gap-2 text-[#FF4F00] font-syne font-bold text-base">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
              <Icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-slate-900 dark:text-white font-bold">{name}</span>
          </div>
        )}
      </div>

      {/* Brand Info & Scale */}
      <div className="space-y-1 relative z-10 mb-4">
        <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white group-hover:text-[#FF4F00] transition-colors line-clamp-1">
          {name}
        </h3>
        {industry && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {industry}
          </p>
        )}
      </div>

      {/* Bottom Bar: Locations & Website Link */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10 text-xs">
        {locationsCount ? (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-500/20">
            <MapPin className="w-3 h-3" />
            {locationsCount}+ Outlets
          </span>
        ) : (
          <span className="text-[11px] font-mono text-slate-400">
            {brand.tier || 'Enterprise Chain'}
          </span>
        )}

        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 hover:text-orange-500 hover:underline transition-colors"
          >
            <span>Visit Brand</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function ClientelePageClient({ siteVariant = 'Enterprise' }: { siteVariant?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: brands = [], isLoading } = useGetClienteleQuery(siteVariant);

  const activeBrands = useMemo(() => {
    return brands.filter((b) => b.isActive !== false);
  }, [brands]);

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

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="site-container relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-primary font-bold">Clientele & Brand Partners</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10.5px] font-black uppercase tracking-widest text-[#FF4F00] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#FF4F00] animate-pulse" />
              <span>TRUSTED BRAND NETWORK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Enterprise Brands Powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500">
                Quantix Platform
              </span>
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Explore the growing network of multi-location restaurant chains, premier retail stores, and global franchises orchestrating high-velocity operations with Quantix.
            </p>

            {/* Quick KPI Stat Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isLoading ? (
                <>
                  <div className="h-8 w-28 rounded-xl bg-slate-200/80 dark:bg-slate-800 animate-pulse" />
                  <div className="h-8 w-36 rounded-xl bg-slate-200/80 dark:bg-slate-800 animate-pulse" />
                  <div className="h-8 w-44 rounded-xl bg-slate-200/80 dark:bg-slate-800 animate-pulse" />
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{activeBrands.length}</span>
                    <span className="text-slate-500">Active Brands</span>
                  </div>

                  {totalLocations > 0 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-orange-500/20 bg-orange-500/10 text-xs text-[#FF4F00]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="font-bold">{totalLocations}+</span>
                      <span>Outlets Worldwide</span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>99.99% Cloud POS Uptime</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIRECTORY CONTROLS & GRID */}
      <section className="site-container py-10 sm:py-14 space-y-8">
        {/* Controls Bar: Search & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search brand or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/50 shadow-2xs"
            />
          </div>
        </div>

        {/* Brand Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4"
              >
                <div className="flex justify-between items-center">
                  <ATMSkeleton className="h-5 w-20 rounded-full" />
                  <ATMSkeleton className="h-4 w-14 rounded-full" />
                </div>
                <ATMSkeleton className="h-20 w-full rounded-xl" />
                <ATMSkeleton className="h-5 w-36 rounded" />
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <ATMSkeleton className="h-4 w-20 rounded" />
                  <ATMSkeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching brand partners found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or select another category tab above.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredBrands.map((brand) => (
                <DirectoryBrandCard key={brand.id || brand.clientLogoId || brand.name} brand={brand} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 3. LIVE SLIDING MARQUEE SECTION */}
      <section className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40">
        <ClienteleMarquee clientele={brands} isLoading={isLoading} />
      </section>

      {/* 4. GLOBAL CTA */}
      <CTABanner />
    </main>
  );
}
