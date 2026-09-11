// src/app/(public)/help/faq/page.tsx
'use client';

import React, { useState } from 'react';
import { useGetFAQsQuery } from '@/features/FAQ';
import { ATMSkeleton } from '@/components/atoms';
import { ChevronDown, ChevronUp, ChevronRight, HelpCircle, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_FAQS = [
  { id: '1', question: 'How does standalone licensing work?', answer: 'Standalone token licensing gives you perpetual software rights. You download the IndexedDB database to your registers, and they do not require an active internet connection to process sales, bills, or inventory.' },
  { id: '2', question: 'Can I switch from Standalone to Enterprise Cloud?', answer: 'Yes! Our sync services can easily export your local registers database and upload them securely to our Cloud Telemetry dashboard, preserving all historical transaction logs.' },
  { id: '3', question: 'How is data encrypted in offline mode?', answer: 'We encrypt all locally cached transactions using high-performance AES-256 databases inside IndexedDB, verifying employee login PIN codes locally prior to cash drawer triggers.' },
  { id: '4', question: 'Do you charge credit card transaction fees?', answer: 'Quantix does not add extra transaction fees. You integrate your own payment terminals (Stripe, Adyen, Clover) and only pay the standard processor merchant rates.' }
];

export default function HelpFAQPage() {
  const { data: apiFaqs = [], isLoading } = useGetFAQsQuery();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = apiFaqs.length > 0 ? apiFaqs : FALLBACK_FAQS;
  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFaqId = (faq: typeof faqs[number], idx: number) => faq.id || String(idx);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container max-w-3xl px-4 sm:px-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">Frequently Asked Questions</span>
          </div>

          <div className="flex items-center gap-2.5 mb-8">
            <Link href="/help">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">FAQS INDEX</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                All Common Questions
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search specific questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 py-3.5 pl-11 pr-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`faq-skel-${i}`}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 shadow-xs flex items-center justify-between gap-4"
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
              {filteredFaqs.map((faq, idx) => (
                <div key={getFaqId(faq, idx)} className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/30 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(getFaqId(faq, idx))}
                    className="w-full text-left p-5 text-xs font-bold uppercase text-slate-800 dark:text-white hover:bg-gray-100/50 dark:hover:bg-slate-900/40 transition-all flex justify-between items-center cursor-pointer gap-4"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={14} className="text-blue-500 shrink-0" />
                      {faq.question}
                    </span>
                    {openFaqId === getFaqId(faq, idx) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <AnimatePresence>
                    {openFaqId === getFaqId(faq, idx) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-gray-200 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-gray-100/30 dark:bg-slate-950/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs">No questions found matching your criteria.</div>
          )}
        </div>
      </main>
    );
  }
