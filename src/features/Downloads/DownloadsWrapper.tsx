// src/features/Downloads/DownloadsWrapper.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Download,
  ShieldCheck,
  Cpu,
  HardDrive,
  Monitor,
  CheckCircle2,
  Terminal,
  Sparkles,
  Layers,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { useGetDownloadsQuery } from './Service/DownloadsService';
import DownloadsList from './DownloadsList';
import { cn } from '@/lib/utils';

export const DownloadsWrapper: React.FC = () => {
  const { data: packages = [], isLoading } = useGetDownloadsQuery();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const filteredPackages = useMemo(() => {
    if (selectedPlatform === 'all') return packages;
    return packages.filter((pkg) => {
      const p = pkg.platform.toLowerCase();
      if (selectedPlatform === 'windows') return p.includes('windows') || p.includes('win');
      if (selectedPlatform === 'linux') return p.includes('linux') || p.includes('deb') || p.includes('rpm');
      if (selectedPlatform === 'utilities') return p.includes('sync') || p.includes('service') || p.includes('tool');
      return true;
    });
  }, [packages, selectedPlatform]);

  return (
    <div className="w-full font-sans min-h-screen text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Standard .page-hero-header from globals.css) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Resources > Downloads */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">Software Downloads</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <Download size={13} className="text-[#FF4D00]" />
              <span>Official Software Releases</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white max-w-3xl">
            Downloads &amp; Client Binaries
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Download self-contained register apps, touch screen drivers, and background synchronization utilities for
            Windows, Linux, and Android POS terminals. Digitally signed and ready for production.
          </p>

          {/* Security & Verification Badges Strip */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={14} /> EV Code Signed &amp; SHA-256 Verified
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <Cpu size={14} className="text-primary" /> x86_64 &amp; ARM64 Native
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <HardDrive size={14} className="text-primary" /> Zero External DB Setup
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Standard .section-py from globals.css) ─── */}
      <section className="section-py site-container">
        {/* Platform Selector Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2 flex items-center gap-1 shrink-0">
              <Layers size={13} /> Platform:
            </span>
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'windows', label: 'Windows (x64)' },
              { id: 'linux', label: 'Linux (Debian/RPM)' },
              { id: 'utilities', label: 'Sync & Services' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedPlatform(tab.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer border',
                  selectedPlatform === tab.id
                    ? 'bg-primary border-primary text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
            Latest Stable Version: <span className="font-bold text-slate-900 dark:text-white font-mono">v2.1.0</span>
          </div>
        </div>

        {/* Binary Downloads Cards List */}
        <DownloadsList packages={filteredPackages} isLoading={isLoading} />

        {/* Hardware & System Requirements Cards (Grid on Desktop, Stack on Mobile) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-2xs space-y-2.5">
            <div className="h-9 w-9 rounded-md bg-orange-500/10 text-primary flex items-center justify-center">
              <Monitor size={18} />
            </div>
            <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white uppercase">
              Touch Terminal Requirements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Minimum 4GB RAM, Intel Celeron J1900 or higher, 32GB SSD storage, 1024x768 capacitive touch resolution.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-2xs space-y-2.5">
            <div className="h-9 w-9 rounded-md bg-orange-500/10 text-primary flex items-center justify-center">
              <Terminal size={18} />
            </div>
            <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white uppercase">
              Silent Rollout &amp; MDM
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Supports automated command-line installation via Microsoft Intune or Ansible scripts using the{' '}
              <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px] text-primary">
                /S
              </code>{' '}
              silent flag.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 shadow-2xs space-y-2.5">
            <div className="h-9 w-9 rounded-md bg-orange-500/10 text-primary flex items-center justify-center">
              <HelpCircle size={18} />
            </div>
            <h3 className="font-syne font-bold text-sm text-slate-900 dark:text-white uppercase">
              Need Installation Assistance?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Our enterprise support engineers provide remote installation, printer driver configuration, and network
              pairing.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1"
            >
              Contact Specialist <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadsWrapper;
