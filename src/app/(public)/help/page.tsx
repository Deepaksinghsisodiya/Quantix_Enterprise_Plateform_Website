// src/app/(public)/help/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Terminal,
  FileText,
  LifeBuoy,
  Flame,
  Building2,
  Server,
  ShieldCheck,
  Headphones,
  Mail,
  Phone,
  Clock,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface HelpFaq {
  category: 'hardware' | 'offline' | 'catalog' | 'erp';
  q: string;
  a: string;
}

const HELP_FAQS: HelpFaq[] = [
  {
    category: 'offline',
    q: 'How does register offline mode work during a store internet outage?',
    a: 'Every Quantix register runs an embedded IndexedDB local cache. When broadband or WiFi drops, tills automatically switch to local storage within 5 milliseconds. Cashiers can continue barcode scanning, price calculations, cash settlement, and receipt printing. Once internet connectivity is restored, background sync workers batch and verify all transactions with HQ automatically.',
  },
  {
    category: 'hardware',
    q: 'What hardware receipt printers, cash drawers, and barcode scanners are supported?',
    a: 'Quantix supports dual-band Ethernet, Wi-Fi, and Bluetooth receipt printers (Epson, Star Micronics, Citizen), standard RJ-12 cash drawers, Zebra 2D barcode imagers, and P2PE-certified EMV card terminals (Stripe BBPOS, Verifone, Ingenico).',
  },
  {
    category: 'catalog',
    q: 'How do we push a price change to only 3 specific branches without modifying the global catalog?',
    a: 'In the Quantix HQ Dashboard, navigate to Catalog > Price Overrides. Select your target SKU, choose the specific branch cluster or location IDs, input the localized override price or promotional schedule, and click Apply. The updated price is broadcasted to the selected tills in under 200 milliseconds.',
  },
  {
    category: 'erp',
    q: 'How do we stream daily Z-reports and sales ledgers into SAP or NetSuite?',
    a: 'Quantix provides real-time REST webhooks and gRPC event streaming. In the Developer API portal, create an endpoint subscription for the "order.settled" and "shift.closed" events. Quantix will push signed HMAC SHA-256 JSON payloads containing gross totals, item line breakdowns, tax accounts, and payment tenders directly into your ERP ingestion queue.',
  },
  {
    category: 'hardware',
    q: 'Can we pair a master register with a satellite terminal and kitchen display (KDS)?',
    a: 'Yes. On the local LAN network, registers automatically discover each other via local mDNS broadcast. You can route orders from 4 front-of-house cashier registers to 2 dedicated kitchen displays and bar printers with zero WAN network dependency.',
  },
  {
    category: 'offline',
    q: 'What happens if a cashier processes an offline card charge that fails later?',
    a: 'Quantix offline card processing incorporates customizable store risk parameters (e.g. max $100 per offline txn, max $1,000 total offline batch per till). All card charges are tokenized inside the EMV chip reader and submitted immediately when connection resumes.',
  },
];

export default function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = HELP_FAQS.filter((faq) => {
    const matchCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCat && matchSearch;
  });

  return (
    <div className="w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-darkBg transition-colors duration-300">
      {/* 1. Hero Header Section (Clear of fixed navbar with pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16) */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-linear-to-b from-slate-50/70 via-white to-white dark:from-darkBg dark:via-darkSurface/30 dark:to-darkBg border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
            <Flame size={13} className="text-primary" />
            <span>24/7 Enterprise Support Center</span>
          </div>

          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white leading-[1.12] tracking-tight">
            How Can We Assist Your Team?
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Search our enterprise knowledge base, terminal hardware setup manuals, offline resilience playbooks, and developer integration specs.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-darkSurface/80 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics, error codes, hardware setup (e.g. Offline, ERP, Printers)..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Navigation Resource Cards */}
      <section className="py-10 sm:py-14 bg-white dark:bg-darkBg">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'POS Architecture Guide',
                desc: 'Offline mesh & multi-store setup',
                icon: BookOpen,
                href: '/resources/pos-guide',
              },
              {
                title: 'Resources & Toolkits',
                desc: 'Downloadable Excel & PDF models',
                icon: FileText,
                href: '/resources',
              },
              {
                title: 'Multi-Store ROI Model',
                desc: 'Savings & TCO financial forecaster',
                icon: HelpCircle,
                href: '/roi-calculator',
              },
              {
                title: 'Developer API Telemetry',
                desc: 'REST webhooks & ERP lakes',
                icon: Terminal,
                href: '/api-docs',
              },
            ].map((card, idx) => (
              <Link key={idx} href={card.href} className="group">
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/70 dark:bg-darkSurface/50 border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-primary/40 hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
                    <card.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-syne text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filterable Knowledge Base & FAQ Accordion */}
      <section className="py-12 sm:py-16 bg-slate-50/60 dark:bg-darkBg/50 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-syne font-black uppercase tracking-wider text-primary">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">
                Enterprise Support Matrix
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'offline', label: 'Offline Mode' },
                { id: 'hardware', label: 'Hardware' },
                { id: 'catalog', label: 'Catalogs' },
                { id: 'erp', label: 'ERP Sync' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-syne font-bold transition-all border cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-primary border-primary text-white shadow-xs'
                      : 'bg-white dark:bg-darkSurface/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-3xl bg-white dark:bg-darkSurface/60 border border-slate-200 dark:border-slate-800">
              <HelpCircle className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">No articles matched your search</p>
              <p className="text-xs text-slate-500 mt-1">Try different search terms or clear your category filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-darkSurface/60 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full text-left p-5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="font-syne">{faq.q}</span>
                    {openFaqIndex === i ? (
                      <ChevronUp size={16} className="text-primary shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === i && (
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-slate-50/50 dark:bg-darkBg/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Dedicated Support Channels Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent dark:from-darkSurface/90 dark:via-darkBg dark:to-darkBg border border-primary/20 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-syne font-bold text-xs">
                  <Headphones size={15} />
                  <span>Dedicated Enterprise SLA Support</span>
                </div>
                <h3 className="font-syne text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  Need Immediate Technical Support?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Enterprise tier accounts receive a dedicated Slack channel, 15-minute emergency SLA response, and on-site field engineering support.
                </p>
              </div>

              <Link
                href="/contact/sales"
                className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/20 transition-all text-center shrink-0"
              >
                Contact Enterprise Support →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTABanner */}
      <CTABanner />
    </div>
  );
}
