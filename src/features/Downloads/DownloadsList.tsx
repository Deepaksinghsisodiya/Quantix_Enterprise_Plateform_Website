// src/features/Downloads/DownloadsList.tsx
'use client';

import React from 'react';
import { Download, Monitor, Server, Laptop, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DownloadPackageDto } from './Types/DownloadsTypes';

interface DownloadsListProps {
  packages: DownloadPackageDto[];
  isLoading: boolean;
}

const DEFAULT_PACKAGES: DownloadPackageDto[] = [
  {
    packageId: '1',
    name: 'Quantix POS Terminal',
    description: 'Unified retail & restaurant POS application. Install on standard register devices to begin processing.',
    version: '2.1.0-alpha',
    platform: 'Windows (x64)',
    fileSize: '45 MB',
    downloadUrl: '#',
    isLatest: true
  },
  {
    packageId: '2',
    name: 'Quantix POS Terminal (Linux)',
    description: 'Unified retail & restaurant POS application compiled for desktop Debian/Ubuntu systems.',
    version: '2.1.0-alpha',
    platform: 'Linux (x64)',
    fileSize: '42 MB',
    downloadUrl: '#',
    isLatest: true
  },
  {
    packageId: '3',
    name: 'Quantix Sync Service',
    description: 'Background orchestration service. Automatically syncs local register caches with our cloud servers.',
    version: '1.1.0-alpha',
    platform: 'Windows / Linux',
    fileSize: '12 MB',
    downloadUrl: '#',
    isLatest: true
  }
];

export const DownloadsList: React.FC<DownloadsListProps> = ({ packages, isLoading }) => {
  const downloadPackages = packages.length > 0 ? packages : DEFAULT_PACKAGES;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-40 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1">
          {downloadPackages.map((pkg) => (
            <div
              key={pkg.packageId}
              className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900/40 relative overflow-hidden group"
            >
              {pkg.isLatest && (
                <div className="absolute top-0 right-0 bg-emerald-500/10 border-l border-b border-emerald-550/20 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl flex items-center gap-1">
                  <ShieldCheck size={12} className="stroke-[3]" /> Stable Build
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800/80 text-blue-500 dark:text-blue-400 group-hover:border-blue-500/30 transition-colors">
                  {pkg.name.toLowerCase().includes('sync') ? (
                    <Server size={20} />
                  ) : pkg.platform.toLowerCase().includes('linux') ? (
                    <Laptop size={20} />
                  ) : (
                    <Monitor size={20} />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-syne font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {pkg.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-gray-250 dark:border-slate-800/80">
                      v{pkg.version}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                    {pkg.description}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 border-t md:border-0 border-gray-200 dark:border-slate-800/50 pt-4 md:pt-0">
                <div className="text-left md:text-right space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {pkg.platform}
                  </div>
                  {pkg.fileSize && (
                    <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      {pkg.fileSize}
                    </div>
                  )}
                </div>

                <a
                  href={pkg.downloadUrl || '#'}
                  className="rounded-full bg-blue-600 hover:bg-blue-500 py-3.5 px-6 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/10 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download size={13} className="stroke-[3]" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadsList;
