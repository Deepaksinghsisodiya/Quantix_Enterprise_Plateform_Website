// src/app/(public)/case-studies/[slug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  Award,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Zap,
  Store,
  Quote,
  Star,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface CaseStudyDetail {
  slug: string;
  companyName: string;
  industry: string;
  locationCount: string;
  heroStat: string;
  heroStatLabel: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  challenge: string[];
  solution: string[];
  results: { metric: string; label: string; description: string }[];
  techStack: string[];
}

const CASE_STUDIES_DATA: Record<string, CaseStudyDetail> = {
  'krave-burger-co': {
    slug: 'krave-burger-co',
    companyName: 'Krave Burger Co.',
    industry: 'Quick Service Restaurant (QSR)',
    locationCount: '18 Locations across 3 States',
    heroStat: '+38%',
    heroStatLabel: 'Faster Table & Ticket Turnaround',
    title: 'How Krave Scaled from 3 to 18 Locations with Zero Peak-Lunch Order Loss',
    quote:
      'Peak lunch surges used to overwhelm our kitchen with lost paper slips and 18-minute ticket delays. Quantix unified KDS and real-time counter routing cut turnaround times by 38% on day one.',
    quoteAuthor: 'Marcus Thorne',
    quoteRole: 'Chief Operating Officer, Krave Brands',
    challenge: [
      'Paper tickets getting lost during chaotic 12:00-14:00 lunchtime surges.',
      '18-minute average ticket backlog causing long customer queues and order cancellations.',
      'Fragmented menu pricing: updating a burger price required manually editing 18 separate registers.',
    ],
    solution: [
      'Deployed Quantix digital Kitchen Display Systems (KDS) with color-coded course fire times.',
      'Centralized 1-click cloud menu push to dispatch price adjustments across all 18 stores in <10 seconds.',
      'Activated local till cache so counter registers never freeze when restaurant Wi-Fi hiccups.',
    ],
    results: [
      { metric: '+38%', label: 'Turnaround Speed', description: 'Average order-to-table time decreased from 18 minutes to under 11 minutes.' },
      { metric: '0%', label: 'Ticket Loss', description: '100% digital dispatching eliminated misplaced orders and kitchen remakes.' },
      { metric: '$42,000', label: 'Annual SaaS Savings', description: 'Eliminated per-terminal SaaS markups and third-party kitchen printer software.' },
    ],
    techStack: ['Quantix Cloud Enterprise', 'Interactive Multi-Course KDS', 'ESC/POS Local Kitchen Printers', 'DoorDash Dispatch Webhook'],
  },
  'fresh-market-retail': {
    slug: 'fresh-market-retail',
    companyName: 'The Fresh Market',
    industry: 'Grocery & Supermarket Retail',
    locationCount: '24 Supermarkets',
    heroStat: '-65%',
    heroStatLabel: 'Perishable Shrinkage Reduction',
    title: 'Automating Real-Time Inventory & Shrinkage Across 24 Supermarkets',
    quote:
      'Our department managers used to spend 12 hours every week doing manual inventory counts with recurring stockouts. Quantix automated re-order triggers and barcode batch tracking saved us over $120,000 in perishable waste in our first year.',
    quoteAuthor: 'Sarah Jenkins',
    quoteRole: 'VP Supply Chain, Fresh Market Group',
    challenge: [
      'Over $15,000 monthly perishable waste due to untracked expiration dates on dairy and produce.',
      'Manual inventory cycle counts consumed 12 manager hours per branch each week.',
      'Stockouts on top 50 revenue SKUs during holiday long weekends due to delayed supplier reorders.',
    ],
    solution: [
      'Integrated Quantix Barcode Receiving with automated batch expiration warnings.',
      'Configured automated supplier replenishment purchase orders triggered by minimum stock thresholds.',
      'Direct weight-scale integration at cash registers for frictionless produce checkout.',
    ],
    results: [
      { metric: '-65%', label: 'Perishable Shrinkage', description: 'Saved over $120,000 in spoiled inventory within the first 12 months.' },
      { metric: '14 hrs', label: 'Manager Time Saved / Wk', description: 'Freed up store leadership to focus on customer floor merchandising.' },
      { metric: '<4ms', label: 'Scanner Latency', description: 'Cashiers scan 30+ items per minute with zero local database lag.' },
    ],
    techStack: ['Quantix Offline-First POS', 'Barcode Scanner AI Sync', 'Serial Deli Scale Interface', 'Automated PO Supplier Webhook'],
  },
  'apex-hospitality-group': {
    slug: 'apex-hospitality-group',
    companyName: 'Apex Hospitality Group',
    industry: 'High-Volume Dining & Nightlife',
    locationCount: '12 Venues & Rooftop Lounges',
    heroStat: '2.4x',
    heroStatLabel: 'Peak Weekend Checkout Speed',
    title: 'Multi-Terminal Floor Management for High-Volume Dining & Bars',
    quote:
      'Friday happy hour used to freeze our old cloud registers when 400 patrons ordered simultaneously. With Quantix peer-to-peer till mesh, our bartenders close tabs in 2 seconds flat with zero network drops.',
    quoteAuthor: 'Julian De Luca',
    quoteRole: 'Managing Director, Apex Hospitality',
    challenge: [
      'Broadband drops on crowded rooftop terraces caused handheld terminals to spin and drop transactions.',
      'Split-billing and seat-specific drink tabs created 10-minute bottlenecks at closing time.',
      'Franchise partners had no centralized ledger to audit nightly beverage pour costs.',
    ],
    solution: [
      'Installed Quantix offline mesh registers with sub-200ms peer-to-peer table status synchronization.',
      'Enabled 1-tap card pre-authorization and instant multi-way bill splitting.',
      'Connected POS telemetry directly to automated beverage dispenser flow meters.',
    ],
    results: [
      { metric: '2.4x', label: 'Checkout Acceleration', description: 'Tab closure time dropped from 4 minutes to under 90 seconds.' },
      { metric: '99.99%', label: 'Uptime SLA', description: 'Zero minutes of service downtime recorded across 52 consecutive weekends.' },
      { metric: '+22%', label: 'Rooftop Beverage Sales', description: 'Faster ordering velocity allowed venues to serve 22% more rounds per evening.' },
    ],
    techStack: ['Quantix High-Concurrency POS', 'IndexedDB Peer Till Mesh', 'Handheld Mobile Terminals', 'QuickBooks Financial Export'],
  },
  'trattoria-elegante': {
    slug: 'trattoria-elegante',
    companyName: 'Trattoria Elegante',
    industry: 'Fine Dining & Hospitality',
    locationCount: '4 Locations',
    heroStat: '+18%',
    heroStatLabel: 'Table Turn Velocity',
    title: 'Fine Dining Table Pacing & Split-Billing Modernization',
    quote:
      'Course pacing alerts and split-billing terminals enabled us to turn tables 18% faster during peak dinner service without compromising fine-dining hospitality.',
    quoteAuthor: 'Chef Marco Valenti',
    quoteRole: 'Executive Chef & Co-Owner',
    challenge: [
      'Wait staff manually communicated multi-course firing, causing delays between kitchen cold and hot lines.',
      'Complex split-bill payments at the end of dinner lengthened table dwell times by 12+ minutes.',
      'Legacy POS vendor increased transaction swipe fees without notice.',
    ],
    solution: [
      'Visual course-alert cues synced directly between floor servers and kitchen line displays.',
      'Enabled pay-at-table NFC mobile terminals for frictionless split-payment closure.',
      'Transitioned to Quantix flat-rate processing, cutting credit card fees by 32%.',
    ],
    results: [
      { metric: '+18%', label: 'Table Velocity', description: 'Able to seat an extra dinner seating per table during Friday and Saturday nights.' },
      { metric: '-8 min', label: 'Diner Wait Time', description: 'Kitchen prep line synchronization eliminated course bottlenecks.' },
      { metric: '32%', label: 'Processing Fee Savings', description: 'Bring-Your-Own processor eliminated hidden interchange markups.' },
    ],
    techStack: ['Quantix Restaurant Suite', 'Course Pacing Automation', 'NFC Pay-at-Table Terminals'],
  },
  'freshmart': {
    slug: 'freshmart',
    companyName: 'FreshMart Convenience',
    industry: 'Grocery & Convenience Outlet',
    locationCount: '8 Locations',
    heroStat: '-40%',
    heroStatLabel: 'Perishable Spoilage Cut',
    title: 'Perishable Expiration Tracking & Frictionless Checkout',
    quote:
      'Intelligent expiration batch tracking reduced grocery spoilage by 40% and simplified vendor restock orders across our 8 neighborhood branches.',
    quoteAuthor: 'Kenji Sato',
    quoteRole: 'Operations Director',
    challenge: [
      'Expired items on shelves damaged customer trust and generated thousands in annual inventory loss.',
      'Manual purchase orders were based on guesswork rather than real-time sales telemetry.',
    ],
    solution: [
      'Barcode scanners trigger expiration date recording upon receipt.',
      'Automated supplier draft purchases when inventory dips below minimum velocity points.',
      'Deli weight scales integrated seamlessly into cash register checkout flows.',
    ],
    results: [
      { metric: '-40%', label: 'Spoilage Reduction', description: 'Prevented expired stock losses with proactive clearance markdown alerts.' },
      { metric: '+15%', label: 'Counter Throughput', description: 'Direct scale readings sped up checkout queues during morning coffee rush.' },
      { metric: '100%', label: 'Offline Reliability', description: 'Stores continued ringing up cash and card purchases during utility outages.' },
    ],
    techStack: ['Quantix Retail Client', 'Batch Expiration Ledger', 'ESC/POS Scale Driver'],
  },
};

export default function CaseStudyDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string)?.toLowerCase();
  const study = CASE_STUDIES_DATA[slug] || CASE_STUDIES_DATA['krave-burger-co'];

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Top warm glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/case-studies" className="hover:text-primary transition-colors font-medium">Case Studies</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">{study.companyName}</span>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary shadow-xs">
              <Award size={13} />
              <span>VERIFIED MERCHANT AUDIT</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-700">
              <Store size={12} />
              <span>{study.locationCount}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black text-slate-950 dark:text-white tracking-tight leading-tight max-w-4xl uppercase">
            {study.title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-500 uppercase tracking-wider">
            Industry: {study.industry}
          </p>

          {/* Big Stat Ribbon */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-4 p-4 rounded-md bg-linear-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20">
              <div>
                <p className="font-syne text-3xl sm:text-4xl font-black text-primary leading-none">
                  {study.heroStat}
                </p>
                <p className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-400 mt-1">
                  {study.heroStatLabel}
                </p>
              </div>
              <div className="h-10 w-10 rounded-md bg-orange-500/10 flex items-center justify-center text-primary shrink-0 border border-orange-500/20">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="site-container max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        
        {/* Executive Quote Card */}
        <div className="rounded-md border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 p-6 sm:p-8 relative shadow-2xs overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#FF4F00] via-amber-500 to-orange-500" />
          <Quote size={28} className="text-primary/30 mb-3" />
          <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed">
            "{study.quote}"
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-syne font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {study.quoteAuthor}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {study.quoteRole}
              </p>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Challenge vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Pain Points */}
          <div className="rounded-md border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <div className="h-7 w-7 rounded-md bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                <Clock size={14} />
              </div>
              <h2 className="font-syne font-black text-sm sm:text-base uppercase tracking-tight">
                The Operational Challenges
              </h2>
            </div>
            <ul className="space-y-3 pt-1">
              {study.challenge.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                  <span className="h-5 w-5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-700 dark:text-rose-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantix Solution */}
          <div className="rounded-md border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 sm:p-7 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <div className="h-7 w-7 rounded-md bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <Zap size={14} />
              </div>
              <h2 className="font-syne font-black text-sm sm:text-base uppercase tracking-tight">
                The Quantix Solution
              </h2>
            </div>
            <ul className="space-y-3 pt-1">
              {study.solution.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                  <span className="h-5 w-5 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quantified Results Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-syne font-black text-lg sm:text-2xl uppercase tracking-tight text-slate-900 dark:text-white">
              Quantified Outcomes
            </h2>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={13} />
              <span>Audited Results</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {study.results.map((res, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2"
              >
                <p className="font-syne text-2xl sm:text-3xl font-black text-primary">
                  {res.metric}
                </p>
                <h3 className="font-syne font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase">
                  {res.label}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Modules */}
        <div className="p-5 sm:p-6 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-3">
          <p className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">
            Quantix Modules Deployed:
          </p>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Similar Stories Navigation */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/case-studies"
            className="text-xs font-syne font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            ← View All Case Studies
          </Link>
          <Link
            href="/roi-calculator"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-white text-xs font-syne font-bold uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer shadow-md shadow-primary/20"
          >
            <span>Forecast Your Store's ROI</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Global CTA Banner (Full Width) */}
      <CTABanner />
    </main>
  );
}
