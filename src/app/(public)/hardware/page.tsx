// src/app/(public)/hardware/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Tv,
  Printer,
  CreditCard,
  Tablet,
  CheckCircle2,
  Download,
  ArrowRight,
  Search,
  Cpu,
  ChefHat,
  ShieldCheck,
  Zap,
  Truck,
  Layers,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import { toast } from 'sonner';

interface RestaurantHardwareCategory {
  id: string;
  name: string;
  icon: any;
  desc: string;
  image: string;
  items: {
    name: string;
    brand: string;
    connectivity: string;
    features: string;
    verified: boolean;
    image: string;
  }[];
}

const RESTAURANT_HARDWARE: RestaurantHardwareCategory[] = [
  {
    id: 'kds',
    name: 'Kitchen Display (KDS) & Bump Bars',
    icon: Tv,
    desc: 'Heavy-duty kitchen touchscreens and physical bump bars rated for kitchen heat and grease.',
    image: '/images/hero_kitchen_kds.jpg',
    items: [
      {
        name: 'I-Series 4 for Android 15" / 22"',
        brand: 'Elo Touch',
        connectivity: 'Ethernet / Wi-Fi / PoE',
        features: 'IP54 splash-resistant, multi-touch, VESA mountable',
        verified: true,
        image: '/images/hero_kitchen_kds.jpg',
      },
      {
        name: 'Logic Controls KB1700 Bump Bar',
        brand: 'Bematech',
        connectivity: 'USB / PS/2',
        features: '17 programmable tactile keys, stainless steel casing',
        verified: true,
        image: '/images/rest_kds_kitchen.jpg',
      },
      {
        name: 'X-Series All-in-One KDS',
        brand: 'Elo Touch',
        connectivity: 'LAN / Dual Wi-Fi',
        features: 'Fanless cooling, high-brightness kitchen panel',
        verified: true,
        image: '/images/hero_kitchen_kds.jpg',
      },
    ],
  },
  {
    id: 'tablets',
    name: 'Waiter Tableside Handhelds',
    icon: Tablet,
    desc: 'Lightweight handheld tablets for tableside ordering, seat numbering, and mobile tip checkout.',
    image: '/images/product_waiter_handheld.jpg',
    items: [
      {
        name: 'iPad 10.9" / iPad Mini 8.3"',
        brand: 'Apple',
        connectivity: 'Wi-Fi 6',
        features: 'Sub-second order fires, all-day battery life',
        verified: true,
        image: '/images/hero_qr_ordering.jpg',
      },
      {
        name: 'Galaxy Tab Active4 Pro Rugged',
        brand: 'Samsung',
        connectivity: 'Wi-Fi / 5G / NFC',
        features: 'Drop-proof MIL-STD-810H, S-Pen order entry',
        verified: true,
        image: '/images/product_waiter_handheld.jpg',
      },
      {
        name: 'PAX A920 Pro Mobile POS',
        brand: 'PAX',
        connectivity: 'Wi-Fi / 4G / Bluetooth',
        features: 'Integrated EMV card reader and receipt printer',
        verified: true,
        image: '/images/product_waiter_handheld.jpg',
      },
    ],
  },
  {
    id: 'printers',
    name: 'Kitchen Impact & Receipt Printers',
    icon: Printer,
    desc: 'Heat-resistant 2-color ribbon kitchen impact printers and ultra-fast FOH receipt printers.',
    image: '/images/rest_checkout_payments.jpg',
    items: [
      {
        name: 'TM-U220B Kitchen Impact Printer',
        brand: 'Epson',
        connectivity: 'Ethernet / Serial',
        features: '2-color red/black printing for item modifiers, buzzer alert',
        verified: true,
        image: '/images/retail_hardware_peripherals.jpg',
      },
      {
        name: 'TM-T88VII High-Speed Thermal',
        brand: 'Epson',
        connectivity: 'LAN / Wi-Fi / USB',
        features: '500 mm/sec receipt printing, sub-second guest check printing',
        verified: true,
        image: '/images/rest_checkout_payments.jpg',
      },
      {
        name: 'TSP143IV Bi-Directional Printer',
        brand: 'Star Micronics',
        connectivity: 'CloudPRNT / LAN',
        features: 'Compact internal power supply, sticky linerless label support',
        verified: true,
        image: '/images/retail_hardware_peripherals.jpg',
      },
    ],
  },
  {
    id: 'payments',
    name: 'Pay-at-Table Contactless Terminals',
    icon: CreditCard,
    desc: 'PCI-certified P2PE card readers with Apple Pay, Google Pay, and tableside tip suggestions.',
    image: '/images/foodhub_pos_terminal.jpg',
    items: [
      {
        name: 'BBPOS WisePOS E Smart Terminal',
        brand: 'Stripe Terminal',
        connectivity: 'Wi-Fi / Ethernet',
        features: 'Color touch display, contactless Tap-to-Pay, P2PE encrypted',
        verified: true,
        image: '/images/foodhub_pos_terminal.jpg',
      },
      {
        name: 'Move/5000 Wireless Terminal',
        brand: 'Ingenico',
        connectivity: 'Wi-Fi / 4G Cellular',
        features: 'Pay-at-table tip selection, split checks, EMV chip reader',
        verified: true,
        image: '/images/product_waiter_handheld.jpg',
      },
    ],
  },
];

export default function RestaurantHardwarePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredCategories = RESTAURANT_HARDWARE.map((cat) => {
    const matchedItems = cat.items.filter((item) => {
      const matchText =
        !search.trim() ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase()) ||
        item.features.toLowerCase().includes(search.toLowerCase());
      return matchText;
    });
    return { ...cat, items: matchedItems };
  }).filter((cat) => (activeCategory === 'all' || cat.id === activeCategory) && cat.items.length > 0);

  const handleDownloadSpecs = () => {
    toast.success('Downloading Restaurant Hardware Guide (PDF)', {
      description: 'Saved as quantix_restaurant_hardware_specs_2026.pdf (3.4 MB).',
    });
  };

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-darkBg transition-colors duration-300">
      {/* --- 1. HERO SECTION (Foodhub Style Hardware Showcase) --- */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-linear-to-b from-slate-50 via-white to-white dark:from-darkBg dark:via-darkSurface/30 dark:to-darkBg border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-80 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text & Key Highlights */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
                <ChefHat size={13} className="text-primary" />
                <span>Restaurant Hardware Compatibility Directory</span>
              </div>

              <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
                Certified Restaurant POS Hardware
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                Plug-and-play certified kitchen display screens, impact printers, tableside waiter handhelds, and pay-at-table EMV terminals.
              </p>

              {/* Foodhub Style Benefit Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-darkSurface/50 shadow-2xs">
                  <Zap size={14} className="text-primary shrink-0" />
                  <span className="text-[11px] font-bold font-syne text-slate-800 dark:text-slate-200">100% Pre-Configured</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-darkSurface/50 shadow-2xs">
                  <ShieldCheck size={14} className="text-primary shrink-0" />
                  <span className="text-[11px] font-bold font-syne text-slate-800 dark:text-slate-200">IP54 Heat & Splash Proof</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-darkSurface/50 shadow-2xs col-span-2 sm:col-span-1">
                  <Truck size={14} className="text-primary shrink-0" />
                  <span className="text-[11px] font-bold font-syne text-slate-800 dark:text-slate-200">Next-Day Replacement</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadSpecs}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Download size={14} />
                  <span>Download Hardware Specs (PDF)</span>
                </button>
                <Link
                  href="/resources/pos-guide"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-darkSurface/80 hover:border-primary/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-2xs hover:scale-105 active:scale-95"
                >
                  <span>Explore Kitchen Setup</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Foodhub Style Hardware Hero Image Frame */}
            <div className="lg:col-span-5">
              <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 p-2.5 shadow-2xl shadow-slate-200/70 dark:border-slate-800/90 dark:bg-darkSurface/60 dark:shadow-none transition-all duration-500 hover:border-primary/40">
                <div className="relative aspect-16/11 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                  <Image
                    src="/images/foodhub_pos_terminal.jpg"
                    alt="Foodhub-style commercial dual-screen restaurant POS countertop terminal"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 42vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                  />
                </div>

                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                  Commercial EPOS Hardware
                </div>

                <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>Dual-Screen Countertop POS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. FILTER & SEARCH CONTROLS --- */}
      <section className="py-6 bg-slate-50/60 dark:bg-darkBg/50 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Hardware', icon: Layers },
              { id: 'kds', label: 'Kitchen KDS Displays', icon: Tv },
              { id: 'tablets', label: 'Waiter Handhelds', icon: Tablet },
              { id: 'printers', label: 'Kitchen Printers', icon: Printer },
              { id: 'payments', label: 'Pay-at-Table EMV', icon: CreditCard },
            ].map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-white dark:bg-darkSurface/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  <CatIcon size={12} className={isActive ? 'text-white' : 'text-primary'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Elo, Epson, PAX, Apple..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-darkSurface/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* --- 3. HARDWARE PRODUCT GRID (Foodhub Style Hardware Cards) --- */}
      <section className="py-12 sm:py-16 w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 p-6 rounded-3xl bg-slate-50 dark:bg-darkSurface/60 border border-slate-200 dark:border-slate-800">
            <Cpu className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white">No hardware models found</h3>
            <p className="text-xs text-slate-500 mt-1">Try different search keywords or clear the category filter.</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/20 shadow-2xs">
                  <cat.icon size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-syne text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{cat.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="group/card rounded-3xl bg-white dark:bg-darkSurface/60 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top: Foodhub-Style Dedicated Product Image Preview */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />

                      {/* Brand Tag */}
                      <div className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-1 rounded-full bg-white/95 dark:bg-darkBg/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-xs">
                        {item.brand}
                      </div>

                      {/* Plug & Play Certified Badge */}
                      <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-[9px] font-bold text-white shadow-xs">
                        <CheckCircle2 size={11} />
                        <span>Certified</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-syne text-base font-bold text-slate-950 dark:text-white group-hover/card:text-primary transition-colors">
                          {item.name}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                          {item.features}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 font-medium">Interface:</span>
                        <span className="text-slate-800 dark:text-slate-200 font-bold bg-slate-100 dark:bg-darkBg px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                          {item.connectivity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* --- 4. BOTTOM CTABANNER --- */}
      <CTABanner />
    </div>
  );
}
