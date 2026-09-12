// src/app/(public)/help/getting-started/page.tsx
'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Play, Cloud, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

const ENTERPRISE_STEPS = [
  { title: 'Create Your Account', description: 'Visit the signup page and choose Enterprise. Select your plan tier and enter your business profile details.' },
  { title: 'Verify Your Email', description: 'Enter the 6-digit verification code sent to your email. This secures your account and activates your merchant master profile.' },
  { title: 'Set Up Payment Gateway', description: 'Configure your processing gateway or use your own preferred interchange processor. Zero Quantix transaction fees.' },
  { title: 'Configure Your Business HQ', description: 'Set up your store locations, add initial menu catalog items, configure regional sales tax rates, and customize digital receipt templates.' },
  { title: 'Connecting Registers to Cloud', description: 'Deploy the Quantix Sync Service or Web Till on your devices. All registers automatically maintain encrypted local caches with seamless cloud synchronization.' },
];

const STANDALONE_STEPS = [
  { title: 'Download Offline Binary', description: 'Navigate to the Downloads page. Select the offline perpetual installer package matching your operating system (Windows x64 or Linux).' },
  { title: 'Local Database Setup', description: 'Run the setup wizard. The software configures a secure local database (SQLite/IndexedDB) natively on your physical disk with zero internet requirement.' },
  { title: 'Purchase License Tokens', description: 'Order Standalone validity perpetual tokens from our license catalog (Standard, Advance, or Premium) without monthly SaaS subscriptions.' },
  { title: 'Activate Register License', description: 'Enter your perpetual token into the terminal register activation modal to fully unlock all offline sales, barcode scanning, and receipt printing workflows.' },
];

export default function HelpGettingStartedPage() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'standalone'>('enterprise');

  const steps = activeTab === 'enterprise' ? ENTERPRISE_STEPS : STANDALONE_STEPS;

  return (
    <main className="page-shell bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="site-container max-w-4xl page-nav-header space-y-3 text-left">
        {/* Breadcrumb Navigation */}
        <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
          <ChevronRight size={11} />
          <span className="text-primary font-bold">Getting Started</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/help">
            <span className="h-9 w-9 rounded-full border border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer shadow-xs">
              <ArrowLeft size={16} />
            </span>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Sparkles size={11} />
              STEP-BY-STEP ONBOARDING
            </div>
            <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-950 dark:text-white leading-tight">
              Getting Started Guide
            </h1>
          </div>
        </div>
      </div>

      <div className="site-container max-w-4xl">
        {/* Toggle pill tabs */}
        <div className="flex justify-start mb-8 sm:mb-10">
          <div className="inline-flex items-center rounded-full bg-slate-200/70 dark:bg-slate-900 p-1 border border-slate-250 dark:border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('enterprise')}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                activeTab === 'enterprise'
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Cloud size={15} /> Cloud Enterprise
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('standalone')}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                activeTab === 'standalone'
                  ? "bg-primary text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <ShieldCheck size={15} /> Offline Standalone
            </button>
          </div>
        </div>

        {/* Timeline steps list */}
        <div className="max-w-2xl mx-auto relative border-l-2 border-slate-200 dark:border-slate-800 ml-5 sm:ml-8 pl-8 sm:pl-10 space-y-10 sm:space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Timeline node */}
              <div className="absolute -left-[45px] sm:-left-[53px] top-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary text-white flex items-center justify-center text-xs sm:text-sm font-black border-4 border-slate-50 dark:border-slate-950 shadow-md">
                {idx + 1}
              </div>

              <div className="space-y-1.5 pt-0.5">
                <h3 className="text-base sm:text-lg font-syne font-bold uppercase text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Conversion Row */}
        <div className="mt-10 sm:mt-14 text-center border-t border-slate-200 dark:border-slate-800 pt-6 sm:pt-8">
          <h4 className="text-sm font-bold uppercase text-slate-900 dark:text-white mb-3">Ready to launch your terminal setup?</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sign-up">
              <span className="rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold py-3.5 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2 shadow-md shadow-primary/20">
                Start Registration <ArrowRight size={13} />
              </span>
            </Link>
            <Link href="/contact">
              <span className="rounded-full border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold py-3.5 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2">
                Talk to POS Specialist <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
