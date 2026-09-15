// src/app/(public)/compare/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  Shield,
  ArrowRight,
  Zap,
  Coins,
  Layers,
  Lock,
  Cpu,
  Server,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Flame,
  Store,
  CreditCard,
  WifiOff,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface FeatureComparison {
  title: string;
  category: string;
  icon: React.ElementType;
  quantix: {
    status: 'yes' | 'no' | 'partial';
    label: string;
    detail: string;
  };
  competitor: {
    status: 'yes' | 'no' | 'partial';
    label: string;
    detail: string;
  };
}

interface Competitor {
  name: string;
  slug: string;
  category: string;
  tagline: string;
  pricingBadge: string;
  verdict: string;
  features: FeatureComparison[];
}

const COMPETITORS: Competitor[] = [
  {
    name: 'Toast POS',
    slug: 'toast',
    category: 'Restaurant POS',
    tagline: 'Walled-garden restaurant ecosystem with forced payment processing',
    pricingBadge: '$79+/mo/till + 2.99% swipe + add-ons',
    verdict: 'Toast locks merchants into proprietary terminals and variable swipe cuts. Quantix offers true offline resilience and zero payment surcharges.',
    features: [
      {
        title: 'Offline Continuity',
        category: 'Resilience',
        icon: WifiOff,
        quantix: {
          status: 'yes',
          label: 'Perpetual Local Till Mesh',
          detail: 'Sub-4ms IndexedDB speed. Registers, thermal printers & scanners run indefinitely without internet.',
        },
        competitor: {
          status: 'partial',
          label: 'Degraded Cloud Mode',
          detail: 'Hard 24h limit. Cloud-reliant architecture freezes menus and reports during extended ISP outages.',
        },
      },
      {
        title: 'Payment Processor Freedom',
        category: 'Payments',
        icon: CreditCard,
        quantix: {
          status: 'yes',
          label: 'Bring Your Own Processor',
          detail: 'Zero Quantix transaction tax. Connect Chase, Fiserv, Stripe, Adyen, or First Data at your negotiated rate.',
        },
        competitor: {
          status: 'no',
          label: 'Forced Toast Processing',
          detail: 'Locked exclusively to Toast merchant rates with mandatory per-swipe markup fees.',
        },
      },
      {
        title: 'Multi-Store Menu Management',
        category: 'Management',
        icon: Store,
        quantix: {
          status: 'yes',
          label: '1-Click Central Push (<15s)',
          detail: 'Instantly push price tiers, combos, and items to 50+ stores simultaneously from one dashboard.',
        },
        competitor: {
          status: 'partial',
          label: 'Cloud-Only with Sync Lag',
          detail: 'Manual location edits; changes queue through cloud servers with noticeable sync delays.',
        },
      },
      {
        title: 'Hardware Independence',
        category: 'Hardware',
        icon: Cpu,
        quantix: {
          status: 'yes',
          label: 'Any Standard Hardware',
          detail: 'Runs on Windows touch boxes, iPads, Android tablets, commercial thermal printers & barcode scanners.',
        },
        competitor: {
          status: 'no',
          label: 'Locked Proprietary Toast Terminals',
          detail: 'Must purchase expensive proprietary Toast hardware; cannot run on existing retail computers.',
        },
      },
      {
        title: 'Enterprise APIs & Integrations',
        category: 'Integrations',
        icon: Server,
        quantix: {
          status: 'yes',
          label: 'Direct Webhooks & gRPC',
          detail: 'Free open APIs & direct ledgers into SAP, NetSuite, and QuickBooks without marketplace toll gates.',
        },
        competitor: {
          status: 'partial',
          label: 'Paid API Marketplace',
          detail: 'High monthly fees for enterprise developer access and integration partner tolls.',
        },
      },
      {
        title: 'Pricing Transparency',
        category: 'Pricing',
        icon: Coins,
        quantix: {
          status: 'yes',
          label: 'Flat SaaS (0% Transaction Tax)',
          detail: 'Predictable recurring rate per store without hidden per-ticket software deductions.',
        },
        competitor: {
          status: 'no',
          label: '$79+/mo + 2.99% Swipe Take',
          detail: 'Variable processing cuts and hardware leases eat into restaurant gross margin as sales grow.',
        },
      },
    ],
  },
  {
    name: 'Clover POS',
    slug: 'clover',
    category: 'Generic Merchant POS',
    tagline: 'Bank-distributed counter terminals with third-party app store toll gates',
    pricingBadge: '$45+/mo + terminal lease + app fees',
    verdict: 'Clover requires buying proprietary terminals and paying monthly fees for app store add-ons. Quantix provides enterprise controls natively.',
    features: [
      {
        title: 'Offline Continuity',
        category: 'Resilience',
        icon: WifiOff,
        quantix: {
          status: 'yes',
          label: 'Perpetual Local Till Mesh',
          detail: 'Fully air-gapped support. Multi-terminal mesh syncs locally even when the router loses WAN connection.',
        },
        competitor: {
          status: 'partial',
          label: 'Limited Offline Storage',
          detail: 'Stores offline cards with risk liability; no peer-to-peer till mesh across counter registers.',
        },
      },
      {
        title: 'Payment Processor Freedom',
        category: 'Payments',
        icon: CreditCard,
        quantix: {
          status: 'yes',
          label: 'Bring Your Own Processor',
          detail: 'Full freedom to choose or change your processing bank anytime with zero software penalties.',
        },
        competitor: {
          status: 'no',
          label: 'Locked to Fiserv Contracts',
          detail: 'Bound to First Data / Fiserv bank contracts with long-term leasing commitments.',
        },
      },
      {
        title: 'Multi-Store Menu Management',
        category: 'Management',
        icon: Store,
        quantix: {
          status: 'yes',
          label: 'Native Multi-Store HQ',
          detail: 'Master catalog management and enterprise store hierarchies built directly into the core platform.',
        },
        competitor: {
          status: 'no',
          label: 'Siloed Store Accounts',
          detail: 'Requires third-party marketplace apps to manage multi-location menus or manual per-store updates.',
        },
      },
      {
        title: 'Hardware Independence',
        category: 'Hardware',
        icon: Cpu,
        quantix: {
          status: 'yes',
          label: 'Cross-Platform Commercial Hardware',
          detail: 'Deploy on touch screens, PC POS towers, tablets, and industry-standard USB/Ethernet peripherals.',
        },
        competitor: {
          status: 'no',
          label: 'Proprietary Clover Hardware Required',
          detail: 'Must buy Clover Station, Flex, or Mini devices. Repurposing existing POS hardware is impossible.',
        },
      },
      {
        title: 'Enterprise APIs & Integrations',
        category: 'Integrations',
        icon: Server,
        quantix: {
          status: 'yes',
          label: 'Open Native Suite',
          detail: 'All analytics, inventory, and KDS functions included out of the box with zero third-party subscriptions.',
        },
        competitor: {
          status: 'no',
          label: 'App Marketplace Subscriptions',
          detail: 'Basic features like advanced reporting or time tracking require individual monthly app subscriptions.',
        },
      },
      {
        title: 'Pricing Transparency',
        category: 'Pricing',
        icon: Coins,
        quantix: {
          status: 'yes',
          label: 'Transparent Flat Rate',
          detail: 'No terminal lease agreements, no per-app subscriptions, and zero revenue percentage take.',
        },
        competitor: {
          status: 'no',
          label: 'Terminal Leases & App Surcharges',
          detail: 'Monthly hardware leasing fees and stacked app marketplace bills inflate total monthly cost.',
        },
      },
    ],
  },
  {
    name: 'Lightspeed POS',
    slug: 'lightspeed',
    category: 'Retail & Hospitality',
    tagline: 'Omnichannel cloud POS that penalizes merchants for external payment gateways',
    pricingBadge: '$89 - $269/mo + payment penalty fee',
    verdict: 'Lightspeed charges transaction penalties if you do not use their in-house payment processor. Quantix offers true hardware and payment independence.',
    features: [
      {
        title: 'Offline Continuity',
        category: 'Resilience',
        icon: WifiOff,
        quantix: {
          status: 'yes',
          label: 'Sub-4ms Offline Cashier Speed',
          detail: 'Zero latency cash-drawer firing, barcode scanning, and multi-register mesh sync during broadband dropouts.',
        },
        competitor: {
          status: 'partial',
          label: 'Cloud-Tethered Registers',
          detail: 'Registers experience freezing or latency during connection drops because product catalogs live in the cloud.',
        },
      },
      {
        title: 'Payment Processor Freedom',
        category: 'Payments',
        icon: CreditCard,
        quantix: {
          status: 'yes',
          label: 'Zero Gateway Penalties',
          detail: 'Use any payment provider without paying Quantix a single cent in transaction penalty fees.',
        },
        competitor: {
          status: 'no',
          label: 'Punitive External Gateway Penalty',
          detail: 'Charges extra transaction penalty fees (up to 0.50% extra) if you use third-party merchant processing.',
        },
      },
      {
        title: 'Multi-Store Menu Management',
        category: 'Management',
        icon: Store,
        quantix: {
          status: 'yes',
          label: 'Instant Multi-Store Push',
          detail: 'Regional pricing tiers, bundle promotions, and menu changes sync instantly across your chain.',
        },
        competitor: {
          status: 'yes',
          label: 'Central Catalog Sync',
          detail: 'Capable multi-location catalog, though high-volume synchronizations can encounter server delays.',
        },
      },
      {
        title: 'Hardware Independence',
        category: 'Hardware',
        icon: Cpu,
        quantix: {
          status: 'yes',
          label: 'Universal OS & Device Support',
          detail: 'Run Windows 10/11, iPadOS, Android, Linux, and standard thermal printers without lock-in.',
        },
        competitor: {
          status: 'partial',
          label: 'Primarily iOS Device Tethered',
          detail: 'Heavily optimized for Apple iPads; Windows desktop compatibility is limited or restricted.',
        },
      },
      {
        title: 'Enterprise APIs & Integrations',
        category: 'Integrations',
        icon: Server,
        quantix: {
          status: 'yes',
          label: 'High-Volume gRPC & Webhooks',
          detail: 'Designed for enterprise throughput with raw webhook streaming into modern data warehouses.',
        },
        competitor: {
          status: 'partial',
          label: 'REST APIs (Enterprise Tier Only)',
          detail: 'Full API access requires upgrading to the expensive enterprise pricing tier with custom quote requirements.',
        },
      },
      {
        title: 'Pricing Transparency',
        category: 'Pricing',
        icon: Coins,
        quantix: {
          status: 'yes',
          label: 'Simple Flat SaaS',
          detail: 'All platform features included in straightforward pricing tiers without hidden enterprise fees.',
        },
        competitor: {
          status: 'no',
          label: '$89 to $269/mo per register',
          detail: 'Steep tier jumps between standard and enterprise subscriptions with additional processing penalties.',
        },
      },
    ],
  },
  {
    name: 'Square POS',
    slug: 'square',
    category: 'Micro & Small Business',
    tagline: 'Consumer-friendly card swiper with high variable percentage deductions',
    pricingBadge: '2.6% + 10¢ per transaction',
    verdict: 'Square is great for single-location popups, but highly expensive and fragmented for scaling multi-unit operations.',
    features: [
      {
        title: 'Offline Continuity',
        category: 'Resilience',
        icon: WifiOff,
        quantix: {
          status: 'yes',
          label: 'Local Till Mesh & Receipt Spooler',
          detail: 'Peer-to-peer synchronization across all counter registers during local network blackouts.',
        },
        competitor: {
          status: 'partial',
          label: 'Basic Offline Card Storage',
          detail: 'Stores offline card transactions on a single device, but does not mesh multiple counter registers.',
        },
      },
      {
        title: 'Payment Processor Freedom',
        category: 'Payments',
        icon: CreditCard,
        quantix: {
          status: 'yes',
          label: 'Zero Swipe Cut',
          detail: 'Preserve your gross margins. Negotiate standard interchange rates with any merchant bank.',
        },
        competitor: {
          status: 'no',
          label: 'Locked Exclusively to Square',
          detail: '2.6% + 10¢ per tap costs a $1M/yr chain over $26,000 annually in payment processing fees.',
        },
      },
      {
        title: 'Multi-Store Menu Management',
        category: 'Management',
        icon: Store,
        quantix: {
          status: 'yes',
          label: 'Franchise Hierarchy & Price Tiers',
          detail: 'Granular store groups, franchise royalty ledgers, and regional pricing tiers.',
        },
        competitor: {
          status: 'partial',
          label: 'Flat Store Locations',
          detail: 'Basic multi-location inventory, but lacks complex recipe yield COGS and franchise royalty controls.',
        },
      },
      {
        title: 'Hardware Independence',
        category: 'Hardware',
        icon: Cpu,
        quantix: {
          status: 'yes',
          label: 'Commercial Multi-Platform',
          detail: 'Deploy on existing counter PCs, heavy-duty touch monitors, tablets, and industry printers.',
        },
        competitor: {
          status: 'partial',
          label: 'Square Registers & iPads',
          detail: 'Tied to Square Register, Square Terminal, or Apple iPads with proprietary Square card readers.',
        },
      },
      {
        title: 'Enterprise APIs & Integrations',
        category: 'Integrations',
        icon: Server,
        quantix: {
          status: 'yes',
          label: 'Enterprise Ledgers & ERP Sync',
          detail: 'Direct itemized data pipelines into SAP, NetSuite, and custom analytics data lakes.',
        },
        competitor: {
          status: 'partial',
          label: 'Standard App Marketplace',
          detail: 'Consumer-focused app store with limited custom backoffice ERP pipeline hooks.',
        },
      },
      {
        title: 'Pricing Transparency',
        category: 'Pricing',
        icon: Coins,
        quantix: {
          status: 'yes',
          label: 'Flat Predictable SaaS',
          detail: 'Fixed predictable cost that does not penalize you as your transaction volume doubles.',
        },
        competitor: {
          status: 'no',
          label: '2.6% + 10¢ Volume Penalty',
          detail: 'High transaction fee percentage drains profits quickly as multi-location sales scale.',
        },
      },
    ],
  },
];

export default function CompareCompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor>(COMPETITORS[0]);

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">Compare POS</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary shadow-xs">
              <Sparkles size={13} />
              <span>UNBIASED ARCHITECTURE COMPARISON</span>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white">
              Quantix vs Legacy POS Platforms
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-3xl">
              See why high-volume multi-location retail and restaurant chains migrate to Quantix: true sub-4ms offline resilience, complete Bring-Your-Own processor freedom, zero proprietary terminal lock-in, and flat SaaS pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="site-container max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* Competitor Selector Tab Strip */}
        <div className="space-y-2">
          <p className="text-[11px] font-syne font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Select Competitor to Compare:
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {COMPETITORS.map((comp) => {
              const isSelected = selectedCompetitor.slug === comp.slug;
              return (
                <button
                  key={comp.slug}
                  type="button"
                  onClick={() => setSelectedCompetitor(comp)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-syne font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#FF4F00] border-[#FF4F00] text-white shadow-lg shadow-orange-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-400/60 shadow-xs'
                  }`}
                >
                  <span>vs {comp.name}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Competitor Overview Header Card */}
        <div className="rounded-md border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-amber-500 to-primary" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-syne font-black text-lg sm:text-2xl text-slate-900 dark:text-white uppercase tracking-tight">
                  Quantix vs {selectedCompetitor.name}
                </h2>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {selectedCompetitor.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {selectedCompetitor.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left sm:text-right">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Typical Pricing</p>
                <p className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{selectedCompetitor.pricingBadge}</p>
              </div>
              <Link
                href={`/compare/${selectedCompetitor.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF4F00] text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-all cursor-pointer shrink-0 shadow-md shadow-orange-500/20"
              >
                <span>Full Deep Dive</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE VIEW: Side-by-Side Comparison Cards (< md) */}
        <div className="block md:hidden space-y-4">
          <p className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400 px-1">
            Feature-by-Feature Comparison:
          </p>
          {selectedCompetitor.features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3.5"
              >
                {/* Feature Header */}
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="h-7 w-7 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-[#FF4F00] shrink-0">
                    <Icon size={14} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xs uppercase tracking-tight text-slate-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <span className="text-[9px] font-bold uppercase text-slate-400">
                      {feat.category}
                    </span>
                  </div>
                </div>

                {/* Quantix Advantage (Top) */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                      Quantix Platform
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      ADVANTAGE
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {feat.quantix.label}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feat.quantix.detail}
                  </p>
                </div>

                {/* Selected Competitor (Bottom) */}
                <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <X size={12} className="text-rose-600 dark:text-rose-400" />
                      {selectedCompetitor.name}
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                      {feat.competitor.status === 'no' ? 'RESTRICTED' : 'DEGRADED'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {feat.competitor.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.competitor.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 💻 DESKTOP VIEW: High-Contrast 3-Column Matrix (>= md) */}
        <div className="hidden md:block rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            <div className="col-span-4">Evaluation Criteria</div>
            <div className="col-span-4 text-[#FF4F00] flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Quantix Platform</span>
            </div>
            <div className="col-span-4 text-slate-600 dark:text-slate-400">
              {selectedCompetitor.name}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {selectedCompetitor.features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="grid grid-cols-12 px-6 py-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors items-start gap-4"
                >
                  {/* Col 1: Criteria */}
                  <div className="col-span-4 space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-orange-50 dark:bg-orange-950/50 text-[#FF4F00] flex items-center justify-center shrink-0">
                        <Icon size={13} />
                      </div>
                      <h3 className="font-syne font-bold text-xs uppercase text-slate-900 dark:text-white">
                        {feat.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 pl-8 block">
                      {feat.category}
                    </span>
                  </div>

                  {/* Col 2: Quantix (Champion) */}
                  <div className="col-span-4 space-y-1 bg-emerald-500/4 p-3 rounded-md border border-emerald-500/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                      <span>{feat.quantix.label}</span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {feat.quantix.detail}
                    </p>
                  </div>

                  {/* Col 3: Competitor */}
                  <div className="col-span-4 space-y-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {feat.competitor.status === 'no' ? (
                        <X size={15} className="shrink-0 text-rose-500" />
                      ) : (
                        <X size={15} className="shrink-0 text-amber-500" />
                      )}
                      <span>{feat.competitor.label}</span>
                    </div>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {feat.competitor.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Verdict Callout */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4F00]">
              EXECUTIVE AUDIT SUMMARY
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
              {selectedCompetitor.verdict}
            </p>
          </div>
          <Link
            href={`/compare/${selectedCompetitor.slug}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-sm"
          >
            <span>Read {selectedCompetitor.name} Breakdown</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 3 Strategic Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-[#FF4F00] flex items-center justify-center border border-orange-500/20">
              <Zap size={18} />
            </div>
            <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Zero Outage Risk
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Offline sales ring up in under 4ms with local IndexedDB caches. When internet drops, registers, barcode scanners, and thermal printers never skip a beat.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Coins size={18} />
            </div>
            <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Zero Payment Lock-In
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Negotiate your own interchange-plus merchant rates with your preferred bank. Quantix never takes a slice of your card turnover.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 rounded-3xl space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Shield size={18} />
            </div>
            <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
              Hardware Independence
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Deploy on touchscreens, Windows POS boxes, iPads, Android terminals, and network ESC/POS thermal printers without forced proprietary hardware.
            </p>
          </div>
        </div>
      </div>

      {/* Global CTA Banner */}
      <CTABanner />
    </main>
  );
}
