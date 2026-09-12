// src/features/Downloads/DownloadsWrapper.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useGetDownloadsQuery } from './Service/DownloadsService';
import DownloadsList from './DownloadsList';

export const DownloadsWrapper: React.FC = () => {
  const { data: packages = [], isLoading } = useGetDownloadsQuery();

  return (
    <main className="page-shell text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* Background graphics */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] -z-10 pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] -z-10 pointer-events-none opacity-50 dark:opacity-100" />

      <div className="site-container max-w-4xl">
        {/* Breadcrumb & Header */}
        <div className="page-nav-header space-y-3 text-left">
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/help" className="hover:text-primary transition-colors">Resources</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">Downloads</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-xs">
              <Sparkles size={12} />
              TERMINAL BINARIES & APPS
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white">
            Get Quantix POS
          </h1>
          <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Download self-contained register apps and background synchronization utilities for Windows or Linux. No external dependencies required.
          </p>
        </div>

        {/* Binary Downloads */}
        <DownloadsList packages={packages} isLoading={isLoading} />
      </div>
    </main>
  );
};

export default DownloadsWrapper;
