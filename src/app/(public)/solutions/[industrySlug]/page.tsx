// src/app/(public)/solutions/[industrySlug]/page.tsx
'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ChefHat, 
  Users, 
  Layout, 
  BookOpen, 
  Zap, 
  Truck, 
  Trophy, 
  Ruler, 
  ShoppingBag, 
  Scan, 
  Scale, 
  Package, 
  RefreshCw, 
  Book, 
  Trash2, 
  Heart, 
  Monitor, 
  Hash, 
  Shield, 
  Server, 
  BarChart3, 
  ClipboardCheck, 
  Star 
} from 'lucide-react';

interface Industry {
  slug: string;
  name: string;
  heroImage: string;
  pricingNote: string;
  features: { id: string; icon: React.ReactNode; title: string; description: string }[];
  testimonial: {
    name: string;
    business: string;
    quote: string;
    rating: number;
  };
}

const INDUSTRIES_DATA: Record<string, Industry> = {
  'fine-dining': {
    slug: 'fine-dining',
    name: 'Fine Dining',
    heroImage: '/images/industries/fine-dining.jpg',
    pricingNote: 'Most fine dining restaurants choose our Enterprise Pro Plan.',
    features: [
      { id: 'tables', icon: <Layout size={20} />, title: 'Table Management', description: 'Interactive floor plan editor, table reservations, and course-paced service flows.' },
      { id: 'menu', icon: <BookOpen size={20} />, title: 'Course Menus', description: 'Dynamic multi-course menus with selective wine pairings and instant modifiers.' },
      { id: 'kds', icon: <ChefHat size={20} />, title: 'Kitchen Display (KDS)', description: 'Course-by-course firing with precision prep timers and real-time alerts.' },
      { id: 'crm', icon: <Users size={20} />, title: 'Guest Profiles', description: 'Secure guest tracking including preferences, severe allergies, and visit histories.' },
    ],
    testimonial: {
      name: 'Maria Rossi',
      business: 'Trattoria Elegante',
      quote: 'Quantix transformed our table management and wine pairing workflow. Course pace is flawless.',
      rating: 5,
    }
  },
  'quick-service': {
    slug: 'quick-service',
    name: 'Quick Service Restaurants',
    heroImage: '/images/industries/qsr.jpg',
    pricingNote: 'QSR chains benefit most from our high-throughput Enterprise plans.',
    features: [
      { id: 'speed', icon: <Zap size={20} />, title: 'Speed Checkout', description: 'Quick-order grids, combo builders, and one-tap favorites for rapid checkout lines.' },
      { id: 'kds', icon: <ChefHat size={20} />, title: 'Order Queue Management', description: 'High-throughput kitchen display with distinct sound alerts and delivery priorities.' },
      { id: 'delivery', icon: <Truck size={20} />, title: 'Delivery Integration', description: 'Seamless third-party delivery platform synchronization directly to the POS terminal.' },
      { id: 'loyalty', icon: <Trophy size={20} />, title: 'Loyalty Stamps', description: 'Integrated digital stamp cards, customer phone lookups, and automatic rewards.' },
    ],
    testimonial: {
      name: 'Ahmed Khan',
      business: 'Spice Express',
      quote: 'Order throughput increased by 35% in the first month. No cashier training needed.',
      rating: 5,
    }
  },
  'fashion-retail': {
    slug: 'fashion-retail',
    name: 'Fashion & Apparel',
    heroImage: '/images/industries/fashion.jpg',
    pricingNote: 'Fashion retailers typically choose Enterprise Basic or Pro plans.',
    features: [
      { id: 'sizes', icon: <Ruler size={20} />, title: 'Size & Color Matrix', description: 'High-performance variant management with a simple size/color grid interface.' },
      { id: 'collections', icon: <Layers size={20} />, title: 'Collection Tracking', description: 'Seasonal collections, Lookbook management, and automated clearance markdown events.' },
      { id: 'crm', icon: <Users size={20} />, title: 'Premium Clienteling', description: 'Unified customer profiles with secure purchase histories and personal recommendations.' },
      { id: 'ecommerce', icon: <ShoppingBag size={20} />, title: 'Online Store Sync', description: 'Instantly sync in-store inventory levels with your Shopify or WooCommerce portal.' },
    ],
    testimonial: {
      name: 'Sophie Laurent',
      business: 'Maison Chic',
      quote: 'Size guides and collection management are game-changers for our boutique stores.',
      rating: 5,
    }
  },
  'grocery': {
    slug: 'grocery',
    name: 'Grocery & Convenience',
    heroImage: '/images/industries/grocery.jpg',
    pricingNote: 'Grocery stores benefit from our Advance or Premium standalone token licenses.',
    features: [
      { id: 'barcode', icon: <Scan size={20} />, title: 'Barcode Scanning', description: 'High-speed barcode scanner compatibility and PLU price lookups in milliseconds.' },
      { id: 'scale', icon: <Scale size={20} />, title: 'Weight Scale Integration', description: 'Scale integration for deli and produce items, calculating prices instantly.' },
      { id: 'inventory', icon: <Package size={20} />, title: 'Perishables Tracking', description: 'Intelligent expiration date warnings, batch tracking, and spoilage reduction reports.' },
      { id: 'reorder', icon: <RefreshCw size={20} />, title: 'Auto Reorder Points', description: 'Generate drafts for supplier purchase orders automatically when stock is low.' },
    ],
    testimonial: {
      name: 'David Okonkwo',
      business: 'FreshMart',
      quote: 'Inventory alerts and smart batch tracking reduced our grocery spoilage by 40%.',
      rating: 5,
    }
  },
  'cafe-bakery': {
    slug: 'cafe-bakery',
    name: 'Cafés & Bakeries',
    heroImage: '/images/industries/cafe.jpg',
    pricingNote: 'Small cafés and retail bakeries typically start with Standalone Standard.',
    features: [
      { id: 'recipes', icon: <Book size={20} />, title: 'Recipe Costing', description: 'Track raw ingredient costs to calculate exact menu item gross profit margins.' },
      { id: 'waste', icon: <Trash2 size={20} />, title: 'Waste Tracking logs', description: 'Log kitchen waste reasons (spoilage, dropped, incorrect order) to save costs.' },
      { id: 'tips', icon: <Heart size={20} />, title: 'Tip Pooling Management', description: 'Prompts clients for digital tips, distributing them fairly via smart shifts.' },
      { id: 'display', icon: <Monitor size={20} />, title: 'Digital Menu Boards', description: 'Direct dynamic sync to display screens, hiding sold-out items automatically.' },
    ],
    testimonial: {
      name: 'Priya Sharma',
      business: 'The Daily Grind',
      quote: 'The recipe costing feature helped us price our menu perfectly. Highly recommended.',
      rating: 5,
    }
  },
  'fast-casual': {
    slug: 'fast-casual',
    name: 'Fast Casual',
    heroImage: '/images/industries/fast-casual.jpg',
    pricingNote: 'Fast casual restaurants thrive on Enterprise Basic or Pro subscription plans.',
    features: [
      { id: 'combos', icon: <Layers size={20} />, title: 'Combo Builder', description: 'Create dynamic combos (Main + Side + Drink) with smart upsell prompts.' },
      { id: 'queue', icon: <Layers size={20} />, title: 'Estimated Wait Times', description: 'Calculates kitchen queue backlogs to offer real-time checkout expectations.' },
      { id: 'kds', icon: <ChefHat size={20} />, title: 'Multi-Station KDS', description: 'Route salads to prep stations and hot items to grills with custom timers.' },
      { id: 'loyalty', icon: <Trophy size={20} />, title: 'Points-based Rewards', description: 'Drives repeat visits with simple reward points triggered by checkout numbers.' },
    ],
    testimonial: {
      name: 'James Rivera',
      business: 'BowlCo Kitchen',
      quote: 'The combo builder and order queue boosted our lunch rush throughput by 28%.',
      rating: 5,
    }
  },
  'electronics': {
    slug: 'electronics',
    name: 'Electronics & Tech',
    heroImage: '/images/industries/electronics.jpg',
    pricingNote: 'Electronics retailers benefit from Enterprise Pro with serial number sync.',
    features: [
      { id: 'serial', icon: <Hash size={20} />, title: 'Serial Number Sync', description: 'Register serial numbers during checkout for foolproof warranty and return audits.' },
      { id: 'variants', icon: <Layers size={20} />, title: 'Product Combos', description: 'Manage complex combinations of colors, storage sizes, and model versions.' },
      { id: 'warranty', icon: <Shield size={20} />, title: 'Warranty Upgrades', description: 'Prompts checkout staff to offer customized extended warranties automatically.' },
      { id: 'trade-in', icon: <RefreshCw size={20} />, title: 'Trade-in Credits', description: 'Evaluate used devices at the register and apply trade-in value as store credit.' },
    ],
    testimonial: {
      name: 'Liam Tanaka',
      business: 'Circuit Hub',
      quote: 'Serial number tracking and warranty management save us hours every week during audits.',
      rating: 5,
    }
  },
  'franchise': {
    slug: 'franchise',
    name: 'Franchise & Multi-Location',
    heroImage: '/images/industries/franchise.jpg',
    pricingNote: 'Multi-location operations leverage centralized Cloud Telemetry dashboards.',
    features: [
      { id: 'central', icon: <Server size={20} />, title: 'Central Management Hub', description: 'Manage employee shifts, terminal setups, and tax brackets for all locations at once.' },
      { id: 'menu-sync', icon: <RefreshCw size={20} />, title: 'Global Menu Syncing', description: 'Publish menu price updates or seasonal items to selected terminals instantly.' },
      { id: 'compare', icon: <BarChart3 size={20} />, title: 'Location Rankings', description: 'Compare store revenues, hourly transaction speeds, and client reviews side-by-side.' },
      { id: 'compliance', icon: <ClipboardCheck size={20} />, title: 'Compliance Audits', description: 'Enforce brand promotional pricing guidelines globally without manual visits.' },
    ],
    testimonial: {
      name: 'Natasha Brooks',
      business: 'FreshBite Franchise',
      quote: 'Global menu syncing is a miracle. We updated pricing for 18 venues in seconds.',
      rating: 5,
    }
  }
};

export default function IndustrySolutionPage() {
  const params = useParams();
  const industrySlug = params.industrySlug as string;
  const industry = INDUSTRIES_DATA[industrySlug];

  if (!industry) {
    notFound();
  }

  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        {/* Hero Section */}
        <div className="site-container relative overflow-hidden py-16 sm:py-24 px-4 sm:px-0">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">{industry.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
                <Sparkles size={11} /> PURPOSE-BUILT SOLUTIONS
              </div>
              <h1 className="text-4xl sm:text-6xl font-syne font-black tracking-tight uppercase leading-[1.05] text-slate-900 dark:text-white">
                Quantix for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{industry.name}</span>
              </h1>
              <p className="max-w-xl text-slate-655 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                Streamline operations, optimize checkout speeds, and manage inventory with customized telemetry interfaces and database controls specifically engineered for {industry.name.toLowerCase()} businesses.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/sign-up">
                  <span className="rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3.5 px-7 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all inline-block cursor-pointer">
                    Start Free Trial
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold py-3.5 px-7 active:scale-[0.98] transition-all inline-block cursor-pointer">
                    Talk to Sales
                  </span>
                </Link>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                💡 {industry.pricingNote}
              </p>
            </div>

            {/* Right Hero - Simulated Premium Screen Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                
                {/* Header Window Buttons */}
                <div className="flex gap-1.5 mb-6">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
                </div>

                <div className="space-y-4">
                  <div className="h-32 rounded-2xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-900 p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Telemetry Control</span>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-syne font-black text-slate-900 dark:text-white">$14,892.40</span>
                        <span className="text-[9px] font-bold text-emerald-500 ml-1.5">+24.8% Today</span>
                      </div>
                      <span className="h-8 w-16 bg-blue-500/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider border border-blue-500/20">Active</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-gray-200 dark:border-slate-900/80 p-3 bg-white/40 dark:bg-slate-950/20">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase">Terminals Sync</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">6 Online</span>
                    </div>
                    <div className="rounded-2xl border border-gray-200 dark:border-slate-900/80 p-3 bg-white/40 dark:bg-slate-950/20">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase">Database Mode</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Local + Cloud</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="site-container py-16 sm:py-24 px-4 sm:px-0 border-t border-gray-200 dark:border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">CORE WORKFLOWS</span>
            <h2 className="text-3xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white">Customized Features</h2>
            <p className="text-slate-500 dark:text-slate-450 text-xs sm:text-sm font-medium">
              We replace generic systems with precision industry tools. Here are the core modules deployed immediately for your establishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {industry.features.map((feature, i) => (
              <div 
                key={feature.id} 
                className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-6 flex gap-4 hover:border-blue-500/30 transition-colors"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Quote Section */}
        <div className="site-container py-16 sm:py-24 px-4 sm:px-0 border-t border-gray-200 dark:border-slate-900">
          <div className="max-w-3xl mx-auto rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            
            <div className="flex justify-center gap-1">
              {[...Array(industry.testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl font-syne font-medium text-slate-850 dark:text-slate-200 leading-relaxed italic">
              &ldquo;{industry.testimonial.quote}&rdquo;
            </blockquote>

            <div className="space-y-1">
              <cite className="not-italic text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                {industry.testimonial.name}
              </cite>
              <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest">
                Owner, {industry.testimonial.business}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="site-container py-12 px-4 sm:px-0">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-white/10 blur-[90px] rounded-full pointer-events-none" />
            
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3.5 py-1 rounded-full inline-block">
              UPGRADE TODAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-syne font-black uppercase tracking-tight leading-tight">
              Ready to scale your <br />
              {industry.name.toLowerCase()} operations?
            </h2>
            <p className="max-w-lg mx-auto text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Start your free 14-day trial now. Integrate payments instantly, connect local offline terminals, and sync real-time sales telemetry.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link href="/sign-up">
                <span className="rounded-full bg-white hover:bg-slate-100 text-blue-600 text-xs font-bold py-3.5 px-8 shadow-lg transition-all inline-block cursor-pointer">
                  Start Free Trial
                </span>
              </Link>
              <Link href="/contact">
                <span className="rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-bold py-3.5 px-8 transition-all inline-block cursor-pointer">
                  Book a Demo
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PublicLayout>
  );
}
