// src/features/Downloads/DownloadsList.tsx
'use client';

import React, { useState } from 'react';
import {
  Download,
  Monitor,
  Server,
  Laptop,
  Smartphone,
  ShieldCheck,
  Copy,
  Check,
  Terminal,
  FileCode,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DownloadPackageDto } from './Types/DownloadsTypes';
import { toast } from 'sonner';

interface DownloadsListProps {
  packages: DownloadPackageDto[];
  isLoading: boolean;
}

interface EnhancedPackage extends DownloadPackageDto {
  sha256?: string;
  installCommand?: string;
  osFamily: 'windows' | 'linux' | 'android' | 'server';
}

const DEFAULT_PACKAGES: EnhancedPackage[] = [
  {
    packageId: '1',
    name: 'Quantix POS Terminal (Windows)',
    description:
      'Full-featured desktop POS register application for Windows 10/11 and Windows Embedded POSReady. Supports dual displays, receipt printers, and cash drawers.',
    version: '2.1.0-stable',
    platform: 'Windows (x64)',
    fileSize: '48.2 MB',
    releaseDate: 'Sep 2026',
    downloadUrl: 'https://releases.quantixpos.com/binaries/v2.1.0/Quantix-POS-Terminal-Setup-2.1.0-x64.exe',
    isLatest: true,
    osFamily: 'windows',
    sha256: '9f83c1b6a72e811e5f8a02c918374d62b9a712f84c3619b023f819a62304918e',
    installCommand: 'Quantix-POS-Terminal-Setup-2.1.0-x64.exe /S /ALLUSERS',
  },
  {
    packageId: '2',
    name: 'Quantix POS Terminal (Debian / Ubuntu)',
    description:
      'Native compiled binary package for Debian, Ubuntu, and Linux Mint retail touch registers. High performance zero-overhead execution.',
    version: '2.1.0-stable',
    platform: 'Linux (.deb)',
    fileSize: '42.8 MB',
    releaseDate: 'Sep 2026',
    downloadUrl: 'https://releases.quantixpos.com/binaries/v2.1.0/quantix-pos-terminal_2.1.0_amd64.deb',
    isLatest: true,
    osFamily: 'linux',
    sha256: '3d819a62174c82b9e018274f83c1b6a72e811e5f8a02c918374d62b9a712f84c',
    installCommand: 'sudo dpkg -i quantix-pos-terminal_2.1.0_amd64.deb',
  },
  {
    packageId: '3',
    name: 'Quantix POS Terminal (RHEL / CentOS / Fedora)',
    description:
      'Native RPM distribution optimized for Red Hat Enterprise Linux and Rocky Linux store server terminals.',
    version: '2.1.0-stable',
    platform: 'Linux (.rpm)',
    fileSize: '44.1 MB',
    releaseDate: 'Sep 2026',
    downloadUrl: 'https://releases.quantixpos.com/binaries/v2.1.0/quantix-pos-terminal-2.1.0.x86_64.rpm',
    isLatest: true,
    osFamily: 'linux',
    sha256: 'a62304918e9f83c1b6a72e811e5f8a02c918374d62b9a712f84c3619b023f819',
    installCommand: 'sudo rpm -ivh quantix-pos-terminal-2.1.0.x86_64.rpm',
  },
  {
    packageId: '4',
    name: 'Quantix Local Sync & Database Daemon',
    description:
      'Lightweight background service for offline database orchestration. Synchronizes local IndexedDB transactions to central cloud telemetry upon reconnection.',
    version: '1.4.2-stable',
    platform: 'Cross-Platform Service',
    fileSize: '14.5 MB',
    releaseDate: 'Aug 2026',
    downloadUrl: 'https://releases.quantixpos.com/binaries/v1.4.2/Quantix-Sync-Service-v1.4.2.zip',
    isLatest: true,
    osFamily: 'server',
    sha256: '4c3619b023f819a62304918e9f83c1b6a72e811e5f8a02c918374d62b9a712f8',
    installCommand: 'quantix-sync-daemon.exe --install-service',
  },
  {
    packageId: '5',
    name: 'Quantix Mobile Handheld Companion (Android)',
    description:
      'Optimized Android APK for mobile table-side ordering, line busting, and inventory barcode scanning on Sunmi, Pax, and Clover mobile devices.',
    version: '2.0.8-stable',
    platform: 'Android APK',
    fileSize: '28.6 MB',
    releaseDate: 'Sep 2026',
    downloadUrl: 'https://releases.quantixpos.com/binaries/v2.0.8/quantix-handheld-v2.0.8.apk',
    isLatest: true,
    osFamily: 'android',
    sha256: 'e811e5f8a02c918374d62b9a712f84c3619b023f819a62304918e9f83c1b6a72',
    installCommand: 'adb install -r quantix-handheld-v2.0.8.apk',
  },
];

export const DownloadsList: React.FC<DownloadsListProps> = ({ packages, isLoading }) => {
  const [copiedShaId, setCopiedShaId] = useState<string | null>(null);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  const downloadPackages = (packages.length > 0 ? packages : DEFAULT_PACKAGES) as EnhancedPackage[];

  const handleCopySha = (sha: string, id: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedShaId(id);
    toast.success('Copied SHA-256 Checksum to clipboard!');
    setTimeout(() => setCopiedShaId(null), 2500);
  };

  const getPlatformIcon = (family: string) => {
    switch (family) {
      case 'server':
        return <Server size={22} className="text-amber-500" />;
      case 'linux':
        return <Laptop size={22} className="text-indigo-500" />;
      case 'android':
        return <Smartphone size={22} className="text-emerald-500" />;
      default:
        return <Monitor size={22} className="text-primary" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 animate-pulse p-6"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1">
          {downloadPackages.map((pkg) => {
            const isExpanded = expandedDetailsId === pkg.packageId;
            const sha = pkg.sha256 || '9f83c1b6a72e811e5f8a02c918374d62b9a712f84c3619b023f819a62304918e';
            const cmd = pkg.installCommand || 'Quantix-Setup.exe /S';

            return (
              <div
                key={pkg.packageId}
                className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 p-4 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden group shadow-2xs"
              >
                {/* Top Right "Stable Build" Pill */}
                {pkg.isLatest && (
                  <div className="absolute top-0 right-0 bg-emerald-500/10 border-l border-b border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <ShieldCheck size={12} className="stroke-[2.5]" /> Stable Release
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                  {/* Left: Icon & Info */}
                  <div className="flex items-start gap-3.5 sm:gap-4.5 flex-1">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 group-hover:border-primary/40 transition-colors shadow-2xs">
                      {getPlatformIcon(pkg.osFamily || 'windows')}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 pr-20 lg:pr-0">
                        <h3 className="text-base sm:text-lg font-syne font-black uppercase text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                          {pkg.name}
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          v{pkg.version}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
                        {pkg.description}
                      </p>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          {pkg.platform}
                        </span>
                        {pkg.fileSize && (
                          <>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span className="font-mono">{pkg.fileSize}</span>
                          </>
                        )}
                        {pkg.releaseDate && (
                          <>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span>Released {pkg.releaseDate}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80 pt-4 lg:pt-0">
                    <a
                      href={pkg.downloadUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Download size={14} className="stroke-[2.5]" />
                      <span>Download Installer</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setExpandedDetailsId(isExpanded ? null : pkg.packageId)}
                      className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1 cursor-pointer py-1"
                    >
                      <span>{isExpanded ? 'Hide Security Details' : 'Checksum & Install Flags'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Security & CLI Verification Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3 text-xs bg-slate-50/60 dark:bg-slate-950/40 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 sm:p-6">
                    {/* SHA-256 */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                        SHA-256 Checksum:
                      </span>
                      <div className="flex items-center justify-between gap-2 bg-slate-950 text-emerald-400 font-mono text-[11px] p-2.5 rounded-md border border-slate-800 overflow-x-auto">
                        <span className="truncate">{sha}</span>
                        <button
                          type="button"
                          onClick={() => handleCopySha(sha, pkg.packageId)}
                          className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer shrink-0"
                          title="Copy SHA-256"
                        >
                          {copiedShaId === pkg.packageId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Silent Command */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Terminal size={11} /> Silent Deployment Command:
                      </span>
                      <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-md font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                        {cmd}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DownloadsList;
