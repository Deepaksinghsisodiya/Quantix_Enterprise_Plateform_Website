// src/app/(public)/help/getting-started/page.tsx
'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Play, Cloud, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ENTERPRISE_STEPS = [
  { title: 'Create Your Account', description: 'Visit the signup page and choose Enterprise. Select your plan (Free, Basic, Pro, or Enterprise) and enter your business details.' },
  { title: 'Verify Your Email', description: 'Enter the 6-digit OTP sent to your email. This secures your account and activates your merchant profile.' },
  { title: 'Set Up Payment', description: 'Add your payment method for paid plans. Free plan skips this step. Annual billing saves approximately 20%.' },
  { title: 'Configure Your Business', description: 'Set up your business profile, add locations, configure tax rates, and customize receipt templates from the Admin Portal.' },
  { title: 'Connecting to Cloud', description: 'Install the Sync Service on your devices. It runs in the background and keeps all terminals synchronized with the cloud. Configure sync intervals and conflict resolution preferences.' },
];

const STANDALONE_STEPS = [
  { title: 'Download Offline Installer', description: 'Go to Downloads page. Select the offline perpetual installer matching your OS (Windows, macOS, or Linux).' },
  { title: 'Local DB Setup', description: 'Execute the setup wizard. The software configures a secure local database (IndexedDB/sqlite) natively on your hard disk.' },
  { title: 'Purchase Validity Tokens', description: 'Order Standalone validity standard tokens from our license catalog (Standard, Advance, or Premium) without monthly fees.' },
  { title: 'Activate Register License', description: 'Enter your perpetual token into the terminal register activation tab to fully unlock all sales & receipt workflows.' },
];

export default function HelpGettingStartedPage() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'standalone'>('enterprise');

  const steps = activeTab === 'enterprise' ? ENTERPRISE_STEPS : STANDALONE_STEPS;

  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container max-w-4xl px-4 sm:px-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">Getting Started</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10">
            <Link href="/help">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">STEP-BY-STEP GUIDES</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                Getting Started Guide
              </h1>
            </div>
          </div>

          {/* Toggle pill tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-900/60 p-1 border border-gray-250 dark:border-slate-800/40 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('enterprise')}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                  activeTab === 'enterprise'
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Cloud size={14} /> Cloud Enterprise
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('standalone')}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer",
                  activeTab === 'standalone'
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <ShieldCheck size={14} /> Offline Standalone
              </button>
            </div>
          </div>

          {/* Timeline steps list */}
          <div className="max-w-2xl mx-auto relative border-l border-gray-200 dark:border-slate-800 ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[45px] sm:-left-[53px] top-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black border-4 border-white dark:border-slate-950 shadow-md">
                  {idx + 1}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-syne font-bold uppercase text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Conversion Row */}
          <div className="mt-16 text-center border-t border-gray-250 dark:border-slate-900 pt-10">
            <h4 className="text-sm font-bold uppercase text-slate-900 dark:text-white mb-4">Ready to launch your terminal setup?</h4>
            <div className="flex justify-center gap-3">
              <Link href="/sign-up">
                <span className="rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-1">
                  Start Registration <ArrowRight size={13} />
                </span>
              </Link>
              <Link href="/help/videos">
                <span className="rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold py-3 px-6 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-1">
                  Watch Video Setup <Play size={11} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
