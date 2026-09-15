// src/app/(public)/help/faq/page.tsx
'use client';

import React, { useState } from 'react';
import { useGetFAQsQuery } from '@/features/FAQ';
import { ATMSkeleton } from '@/components/atoms';
import { ChevronDown, ChevronUp, ChevronRight, HelpCircle, Search, Sparkles, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

const FALLBACK_FAQS = [
  {
    id: '1',
    question: 'How does standalone licensing work?',
    answer:
      'Standalone token licensing gives you perpetual software rights. You download the IndexedDB database to your registers, and they do not require an active internet connection to process sales, bills, or inventory.',
  },
  {
    id: '2',
    question: 'Can I switch from Standalone to Enterprise Cloud?',
    answer:
      'Yes! Our sync services can easily export your local registers database and upload them securely to our Cloud Telemetry dashboard, preserving all historical transaction logs.',
  },
  {
    id: '3',
    question: 'How is data encrypted in offline mode?',
    answer:
      'We encrypt all locally cached transactions using high-performance AES-256 databases inside IndexedDB, verifying employee login PIN codes locally prior to cash drawer triggers.',
  },
  {
    id: '4',
    question: 'Do you charge credit card transaction fees?',
    answer:
      'Quantix does not add extra transaction fees. You integrate your own payment terminals (Stripe, Adyen, Clover) and only pay the standard processor merchant rates.',
  },
  {
    id: '5',
    question: 'How many registers can run simultaneously in one branch?',
    answer:
      'Quantix supports unlimited parallel registers within a single store topology. With local peer-to-peer LAN mesh sync, table bills and bar tabs update in under 50 milliseconds across all terminals.',
  },
  {
    id: '6',
    question: 'Which receipt printers and barcode scanners are supported?',
    answer:
      'All standard ESC/POS thermal printers (Epson, Star Micronics, Citizen) via USB, Ethernet, and Bluetooth are supported out of the box, alongside 1D/2D HID barcode scanners.',
  },
];

export default function HelpFAQPage() {
  const { data: apiFaqs = [], isLoading } = useGetFAQsQuery();
  const [openFaqId, setOpenFaqId] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = apiFaqs.length > 0 ? apiFaqs : FALLBACK_FAQS;
  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFaqId = (faq: (typeof faqs)[number], idx: number) => faq.id || String(idx);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Using site-wide standard .page-hero-header from globals.css) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Resources > FAQs */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">Frequently Asked Questions</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <MessageCircleQuestion size={13} className="text-[#FF4D00]" />
              <span>Common Questions & Answers</span>
            </div>
          </div>

          {/* Heading - No arrow button */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            Frequently Asked Questions
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
            Quick, reliable answers regarding offline resilience, licensing tokens, hardware compatibility, and ERP
            integrations.
          </p>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Standard .section-py) ─── */}
      <section className="section-py site-container max-w-4xl">
        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search specific questions (e.g. offline licensing, printers, cloud sync)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 sm:py-3.5 pl-11 pr-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-2xs transition-all"
          />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`faq-skel-${i}`}
                className="p-4 sm:p-5 rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 w-full">
                  <ATMSkeleton variant="rounded" className="h-6 w-6 shrink-0" />
                  <div className="space-y-2 w-full">
                    <ATMSkeleton variant="text" className="h-3.5 w-4/5" />
                    <ATMSkeleton variant="text" className="h-2.5 w-2/5" />
                  </div>
                </div>
                <ATMSkeleton variant="circular" className="h-7 w-7 shrink-0" />
              </div>
            ))}
          </div>
        ) : filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const currentId = getFaqId(faq, idx);
              const isOpen = openFaqId === currentId;
              return (
                <div
                  key={currentId}
                  className="rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 overflow-hidden shadow-2xs hover:border-primary/40 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(currentId)}
                    className="w-full text-left p-4 sm:p-5 text-xs sm:text-sm font-syne font-bold uppercase text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-all flex justify-between items-center cursor-pointer gap-4"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle size={16} className="text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <span className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/50 dark:bg-slate-950/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs sm:text-sm rounded-lg border border-dashed border-slate-200 dark:border-slate-800 p-8">
            No questions found matching &ldquo;{searchQuery}&rdquo;. Try another search term.
          </div>
        )}
      </section>

      {/* Global CTA Banner */}
      <CTABanner />
    </main>
  );
}
