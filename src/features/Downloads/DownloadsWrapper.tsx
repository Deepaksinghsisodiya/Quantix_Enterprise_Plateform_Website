// src/features/Downloads/DownloadsWrapper.tsx
'use client';

import React from 'react';
import { useGetDownloadsQuery } from './Service/DownloadsService';
import DownloadsList from './DownloadsList';

export const DownloadsWrapper: React.FC = () => {
  const { data: packages = [], isLoading } = useGetDownloadsQuery();

  return (
    <section className="py-20 text-white min-h-[80vh] relative">
      {/* Background graphics */}
      <div className="absolute inset-0 bg-slate-950 -z-20" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] -z-10 pointer-events-none" />

      <div className="site-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-sm">
            TERMINAL BINARIES
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
            Get Quantix POS
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            Download self-contained register apps and synchronization utilities for Windows or Linux. No dependencies required to deploy.
          </p>
        </div>

        {/* Binary Downloads */}
        <DownloadsList packages={packages} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default DownloadsWrapper;
