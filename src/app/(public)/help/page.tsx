// src/app/(public)/help/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useGetFAQsQuery } from '@/features/FAQ/Service/FAQService';
import { Search, HelpCircle, ArrowRight, Play, BookOpen, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpCentrePage() {
  const { data: faqs = [], isLoading } = useGetFAQsQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        {/* Hero Section with custom HSL palette */}
        <div className="site-container text-center mb-16 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
            KNOWLEDGE BASE
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
            How can we help?
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Search our dynamic knowledge base or explore standard support categories below to get started with Quantix POS.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto px-4 sm:px-0">
            <Search className="absolute left-7 sm:left-4 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search help articles or common questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 py-3.5 pl-11 pr-4 text-xs text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Links Matrix */}
        <div className="site-container max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 px-4 sm:px-0">
          {[
            { title: 'Setup Guide', desc: 'Step-by-step POS installation', icon: <BookOpen size={16} />, href: '/enterprise-vs-standalone' },
            { title: 'Video Guides', desc: 'Visual step tutorials', icon: <Play size={16} />, href: '/features' },
            { title: 'System pricing', desc: 'License subscription plans', icon: <HelpCircle size={16} />, href: '/pricing' },
            { title: 'Developer API', desc: 'REST endpoint specs', icon: <MessageSquare size={16} />, href: '/integrations' }
          ].map((link, idx) => (
            <Link key={idx} href={link.href}>
              <div className="bg-gray-50/50 dark:bg-slate-900/20 border border-gray-250 dark:border-slate-800 p-5 rounded-2xl space-y-2 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all cursor-pointer h-full">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
                  {link.icon}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-syne">{link.title}</h3>
                <p className="text-[10px] text-slate-500 leading-normal">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Setup documentation summaries */}
        <div className="site-container max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4 sm:px-0">
          <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="space-y-3">
              <h3 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">Standalone Setup & Token Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Learn how to configure your offline standalone client POS databases, activate standard perpetual licenses, and renew validity tokens.
              </p>
            </div>
            <Link href="/roi-calculator">
              <button className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-blue-650 dark:hover:text-blue-300 transition-all flex items-center gap-1 mt-6 cursor-pointer">
                Learn Offline Setup <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="space-y-3">
              <h3 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">Enterprise Cloud Configuration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Set up cloud dashboard telemetry controls, manage multi-location inventory syncing schedules, and deploy digital online ordering integrations.
              </p>
            </div>
            <Link href="/quiz">
              <button className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-blue-650 dark:hover:text-blue-300 transition-all flex items-center gap-1 mt-6 cursor-pointer">
                Discover Cloud System <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>

        {/* Dynamic FAQ list */}
        <div className="site-container max-w-3xl space-y-6 px-4 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-syne font-black uppercase text-center tracking-tight text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>

          {isLoading ? (
            <div className="text-center py-10 text-slate-550 dark:text-slate-500 text-xs">Loading support matrix...</div>
          ) : filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/30 overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 text-xs font-bold uppercase text-slate-800 dark:text-white hover:bg-gray-100/50 dark:hover:bg-slate-900/40 transition-all flex justify-between items-center cursor-pointer gap-4"
                  >
                    <span>{faq.question}</span>
                    {openFaqId === faq.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <AnimatePresence>
                    {openFaqId === faq.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-gray-250 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium bg-gray-100/30 dark:bg-slate-950/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-550 dark:text-slate-500 text-xs">No answers found for your query. Try different terms.</div>
          )}
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
