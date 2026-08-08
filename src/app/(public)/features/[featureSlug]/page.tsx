// src/app/(public)/features/[featureSlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, Sparkles, Scale, X, Check, ArrowRight, ShieldCheck, Database, Layout } from 'lucide-react';

interface FeatureData {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  benefits: string[];
  techSpec: string;
  relatedFeatures: { title: string; slug: string }[];
}

const FEATURES_DATA: Record<string, FeatureData> = {
  'smart-inventory': {
    slug: 'smart-inventory',
    title: 'Smart Inventory & Recipe Costing',
    tagline: 'Track raw ingredient costs and calculate perfect profit margins.',
    desc: 'Never guess your actual margins. Smart inventory tracks individual item variations, raw recipe details, ingredient wastes log, and automated supplier draft orders, preserving accurate profit metrics across all locations.',
    benefits: ['Recipe costing down to the gram', 'Automatic low-stock supplier email alerts', 'Integrated waste logging dashboards'],
    techSpec: 'Syncs stock levels in real-time using secure JSON webhooks mapped directly to standard warehouse APIs.',
    relatedFeatures: [
      { title: 'Offline Registers database', slug: 'offline-registers' },
      { title: 'Interactive restaurant floor manager', slug: 'table-management' }
    ]
  },
  'offline-registers': {
    slug: 'offline-registers',
    title: 'Offline Standalone Register POS',
    tagline: 'Process sales and print thermal bills completely without internet.',
    desc: 'Secure continuous billing operations even during network failovers. The register utilizes a secure local IndexedDB database on your hard drive to record sales, authorize PIN access, and print thermal receipt papers natively, backing up logs upon connection restores.',
    benefits: ['No server connectivity dependencies', 'High-speed local IndexedDB lookups', 'Encrypted local cache storage logs'],
    techSpec: 'Utilizes high-performance local SQLite / IndexedDB databases with local course-pacing backup buffers.',
    relatedFeatures: [
      { title: 'Smart inventory metrics', slug: 'smart-inventory' },
      { title: 'Kitchen Display System (KDS)', slug: 'kitchen-display' }
    ]
  },
  'table-management': {
    slug: 'table-management',
    title: 'Table Management & Floor Layouts',
    tagline: 'Interactive floor layouts, visual course alerts, and split checks.',
    desc: 'Maximize table turn velocities. Design interactive custom floor layouts, fire courses course pacing directly to different KDS screens, and handle complex customer check splits instantly at the terminal register.',
    benefits: ['Drag & drop floor builder layouts', 'Dynamic multi-course KDS routing triggers', 'Instant check splitting modules'],
    techSpec: 'Interactive HTML5 canvas grids connected directly to state telemetry handlers.',
    relatedFeatures: [
      { title: 'Offline Registers database', slug: 'offline-registers' },
      { title: 'Kitchen Display System (KDS)', slug: 'kitchen-display' }
    ]
  },
  'online-ordering': {
    slug: 'online-ordering',
    title: 'Direct Online Ordering Portal',
    tagline: 'Branded commission-free web ordering for pickup & delivery.',
    desc: 'Eliminate third-party commission fees. Launch a custom-branded web storefront and mobile web app where customers order directly. Orders route directly into your POS register and Kitchen Display System.',
    benefits: ['0% commission fee direct orders', 'Real-time menu stock availability sync', 'Automated SMS order status updates'],
    techSpec: 'High-speed Server-Side Rendered ordering portal with instant WebSocket POS notification dispatch.',
    relatedFeatures: [
      { title: 'Delivery Management', slug: 'delivery-management' },
      { title: 'Kitchen Display System (KDS)', slug: 'kitchen-display' }
    ]
  },
  'self-service-kiosk': {
    slug: 'self-service-kiosk',
    title: 'Self-Service Checkout Kiosks',
    tagline: 'Accelerate line throughput with guest self-ordering touchscreens.',
    desc: 'Empower guests to browse visual menus, customize items, and pay using integrated card terminals. Self-service kiosks reduce queue wait times and boost average check sizes by 20% through automated upsell prompts.',
    benefits: ['Interactive high-definition visual menus', 'Automated modifier & add-on upsell prompts', 'Integrated contactless card payments'],
    techSpec: 'Hardened kiosk mode application supporting thermal bill printers and EMV chip readers.',
    relatedFeatures: [
      { title: 'Direct Online Ordering Portal', slug: 'online-ordering' },
      { title: 'Kitchen Display System (KDS)', slug: 'kitchen-display' }
    ]
  },
  'qr-code-ordering': {
    slug: 'qr-code-ordering',
    title: 'Tableside QR Code Ordering & Pay',
    tagline: 'Contactless digital menus for instant guest self-service at table.',
    desc: 'Allow guests to scan a table QR code, browse rich visual menus, place orders, and pay directly from their mobile browser without downloading any application or waiting for a server.',
    benefits: ['Zero app installation required for guests', 'Instant table-to-kitchen ticket firing', 'Split bill & digital tip checkout'],
    techSpec: 'Web-native PWA client leveraging dynamic QR token validation for secure table sessions.',
    relatedFeatures: [
      { title: 'Table Management & Floor Layouts', slug: 'table-management' },
      { title: 'Direct Online Ordering Portal', slug: 'online-ordering' }
    ]
  },
  'kitchen-display': {
    slug: 'kitchen-display',
    title: 'Kitchen Display System (KDS)',
    tagline: 'Replace paper tickets with real-time digital kitchen order screens.',
    desc: 'Eliminate lost paper tickets and miscommunications. KDS screens color-code order prep times, organize tickets by station (Grill, Fryer, Assembly), and notify front-of-house staff when orders are ready.',
    benefits: ['Color-coded order prep timer alerts', 'Multi-station ticket routing & bump bars', 'Real-time kitchen order status sync'],
    techSpec: 'Low-latency WebSockets with local subnet fallback to ensure zero order loss.',
    relatedFeatures: [
      { title: 'Table Management & Floor Layouts', slug: 'table-management' },
      { title: 'Offline Standalone Register POS', slug: 'offline-registers' }
    ]
  },
  'delivery-management': {
    slug: 'delivery-management',
    title: 'Delivery Management & Dispatch Hub',
    tagline: 'Manage in-house drivers and third-party delivery dispatch in one view.',
    desc: 'Consolidate incoming delivery orders from your website, DoorDash, and Uber Eats into a single dispatch dashboard. Assign drivers, track real-time GPS locations, and send automated SMS updates to customers.',
    benefits: ['Single screen for all delivery orders', 'Driver assignment & route optimization', 'Customer live SMS tracking links'],
    techSpec: 'Integrated REST API bridge connecting DoorDash Drive and mapping services directly into POS dispatch.',
    relatedFeatures: [
      { title: 'Direct Online Ordering Portal', slug: 'online-ordering' },
      { title: 'Kitchen Display System (KDS)', slug: 'kitchen-display' }
    ]
  },
  'marketing-loyalty': {
    slug: 'marketing-loyalty',
    title: 'Customer Loyalty & Marketing Engine',
    tagline: 'Turn one-time diners into loyal repeat customers with automated rewards.',
    desc: 'Build automated customer profiles, track purchasing habits, issue digital loyalty points, and send targeted SMS/email promotion campaigns directly from your POS control panel.',
    benefits: ['Automated points earning & redemption', 'Targeted customer segment SMS campaigns', 'Digital gift cards & promo coupons'],
    techSpec: 'Real-time customer profile database with automated behavioral campaign triggers.',
    relatedFeatures: [
      { title: 'Smart Inventory & Recipe Costing', slug: 'smart-inventory' },
      { title: 'Direct Online Ordering Portal', slug: 'online-ordering' }
    ]
  }
};

export default function FeatureDetailPage() {
  const params = useParams();
  const featureSlug = params.featureSlug as string;
  const feature = FEATURES_DATA[featureSlug];

  if (!feature) {
    notFound();
  }

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/features" className="hover:text-blue-500 transition-colors">Features</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{feature.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto mb-16">
            {/* Left Column Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
                <Sparkles size={11} /> FEATURE BREAKDOWN
              </div>
              <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                {feature.title}
              </h1>
              <p className="text-blue-550 dark:text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                {feature.tagline}
              </p>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                {feature.desc}
              </p>

              {/* Benefits checklist */}
              <div className="space-y-3 pt-4 border-t border-gray-250 dark:border-slate-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Core Modules</span>
                {feature.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0">
                      ✓
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-350 font-bold uppercase tracking-tight">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Tech Specs card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 relative overflow-hidden backdrop-blur-md space-y-4">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 flex items-center gap-1.5">
                  <Database size={12} /> Technical Telemetry Specs
                </span>
                <p className="text-xs text-slate-650 dark:text-slate-400 font-medium leading-relaxed">
                  {feature.techSpec}
                </p>
              </div>
            </div>
          </div>

          {/* Related features section */}
          <div className="max-w-5xl mx-auto border-t border-gray-250 dark:border-slate-900 pt-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 block">Related Feature breakdowns</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {feature.relatedFeatures.map((rf, idx) => (
                <Link key={idx} href={`/features/${rf.slug}`}>
                  <div className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 hover:border-blue-500/30 transition-all cursor-pointer flex justify-between items-center group">
                    <span className="text-xs font-bold uppercase text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{rf.title}</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
