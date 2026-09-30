'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Headphones,
  Clock,
  Users,
  Zap,
  Calendar,
  Globe,
  ArrowRight,
  Play,
  Star,
  Crown,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetPublicSupportSectionQuery, SupportPillar } from './SupportSectionService';

export interface SupportSectionProps {
  platformName?: string;
  className?: string;
}

/**
 * Full-width, authentic content-matching skeleton loader
 * Perfectly aligns with the real Customer Support layout while API data is loading.
 */
export const SupportSectionSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section
      id="support-loading"
      className={`scroll-mt-28 relative overflow-hidden py-12 lg:py-16 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors select-none ${className}`}
    >
      {/* Background Subtle Ambient Glows & Dot Grid */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-87.5 sm:h-125 w-87.5 sm:w-125 rounded-full bg-orange-500/4 dark:bg-orange-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-75 sm:h-100 w-75 sm:w-100 rounded-full bg-amber-500/4 dark:bg-amber-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 right-4 hidden xl:block h-28 w-28 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] bg-size-[12px_12px]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* LEFT SIDE: Content Column Skeleton */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6 text-left min-w-0">
            {/* Pill Badge Skeleton */}
            <div className="h-6 w-52 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />

            {/* Title & Description Skeleton */}
            <div className="space-y-3">
              <div className="h-9 sm:h-11 w-4/5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-9 sm:h-11 w-3/5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="space-y-2 pt-1">
                <div className="h-3.5 w-full rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                <div className="h-3.5 w-5/6 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                <div className="h-3.5 w-2/3 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
              </div>
            </div>

            {/* 3 Pillars Row Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse mt-0.5" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    <div className="h-2.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                    <div className="h-2.5 w-4/5 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Strip Skeleton */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 py-2.5 sm:py-3 border-y border-slate-100 dark:border-slate-800/80">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 sm:gap-2.5 min-w-0 ${
                    i > 0 ? 'border-l border-slate-100 dark:border-slate-800 pl-1.5 sm:pl-3' : ''
                  }`}
                >
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="min-w-0 space-y-1">
                    <div className="h-3.5 w-14 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    <div className="h-2.5 w-16 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions Row Skeleton */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-5">
              <div className="h-11 sm:h-12 w-48 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-2.5 w-20 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Photo Card Skeleton */}
          <div className="lg:col-span-6 relative w-full flex justify-center mt-6 lg:mt-0 px-2 sm:px-4">
            <div className="relative w-full max-w-125 xl:max-w-132.5">
              
              {/* Floating Badge 1 (Top-Left) */}
              <div className="absolute -top-3.5 left-1 sm:-left-3 z-20 flex items-center gap-2 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur-md">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-2 w-20 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                </div>
              </div>

              {/* Floating Badge 2 (Top-Right) */}
              <div className="absolute -top-3 right-1 sm:right-3 z-20 flex items-center gap-2 rounded-xl bg-slate-950/90 border border-slate-700/80 px-3 py-1.5 shadow-xl backdrop-blur-md">
                <div className="h-5 w-5 rounded-md bg-slate-800 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 w-20 rounded bg-slate-800 animate-pulse" />
                  <div className="h-2 w-14 rounded bg-slate-800/70 animate-pulse" />
                </div>
              </div>

              {/* Main Photo Card Frame */}
              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2 sm:p-2.5">
                <div className="relative aspect-16/10 sm:aspect-16/10.5 w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />

                {/* Floating Badge 3 (Middle-Right) */}
                <div className="absolute top-[48%] right-0 sm:-right-4 z-20 rounded-2xl border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md flex flex-col items-center gap-1">
                  <div className="h-2.5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-3.5 w-10 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-2 w-24 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                </div>

                {/* Bottom Status Strip */}
                <div className="mt-2.5 rounded-xl border border-slate-100 dark:border-slate-800/90 bg-slate-50/90 dark:bg-slate-800/60 p-2 sm:p-2.5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 sm:gap-2 min-w-0 ${
                        i > 0 ? 'border-l border-slate-200/70 dark:border-slate-700/70 pl-1.5 sm:pl-2.5' : ''
                      }`}
                    >
                      <div className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                      <div className="min-w-0 space-y-1">
                        <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                        <div className="h-2 w-16 rounded bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const SupportSection: React.FC<SupportSectionProps> = ({
  platformName = "Quantix Enterprise",
  className = "",
}) => {
  const { openModal } = useContactModal();

  // Fetch dynamic CMS data for Enterprise
  const { data: cmsData, isLoading, isError } = useGetPublicSupportSectionQuery('Enterprise');

  // Track avatar image with fallback
  const [avatarSrc, setAvatarSrc] = useState<string>('/images/customer_support_executive.jpg');

  useEffect(() => {
    if (cmsData?.repAvatarUrl) {
      setAvatarSrc(cmsData.repAvatarUrl);
    }
  }, [cmsData?.repAvatarUrl]);

  // Loading state: Show content-matching skeleton loader while API resolves
  if (isLoading) {
    return <SupportSectionSkeleton className={className} />;
  }

  // Complete section hiding: If error, empty, or inactive, render absolutely nothing
  if (isError || !cmsData || !cmsData.isActive || !cmsData.mainTitle) {
    return null;
  }

  const {
    pillBadge,
    mainTitle,
    highlightWord,
    description,
    pillars = [],
    repName,
    repRole,
    responseTimeBadge,
    directPhone,
    directEmail,
    liveChatStatus,
    chatButtonText,
  } = cmsData;

  const renderPillarIcon = (iconKey?: string): LucideIcon => {
    switch (iconKey?.toLowerCase()) {
      case 'clock':
        return Clock;
      case 'shieldcheck':
      case 'shield':
        return ShieldCheck;
      case 'phone':
        return Phone;
      case 'zap':
      case 'lightning':
        return Zap;
      case 'users':
        return Users;
      case 'calendar':
        return Calendar;
      case 'globe':
        return Globe;
      case 'check':
      case 'checkcircle':
        return CheckCircle2;
      default:
        return Headphones;
    }
  };

  const activePillars: SupportPillar[] = Array.isArray(pillars) ? pillars : [];

  // Dynamic pillar grid class depending on pillar count
  const pillarGridClass =
    activePillars.length === 1
      ? 'grid-cols-1 max-w-md'
      : activePillars.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : activePillars.length === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section
      id="support"
      className={`scroll-mt-28 relative overflow-hidden py-12 lg:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800/80 transition-colors select-none ${className}`}
    >
      {/* Background Subtle Ambient Glows & Dot Grid */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-87.5 sm:h-125 w-87.5 sm:w-125 rounded-full bg-orange-500/4 dark:bg-orange-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-75 sm:h-100 w-75 sm:w-100 rounded-full bg-amber-500/4 dark:bg-amber-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 right-4 hidden xl:block h-28 w-28 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1.5px)] bg-size-[12px_12px]" />

      <div className="site-container relative z-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Content Column                                 */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6 text-left min-w-0">
            
            {/* Top Pill Badge */}
            {pillBadge && (
              <div>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-orange-500/10 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-500/25 shadow-2xs">
                  <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-[#FF4F00]" />
                  <span>{pillBadge}</span>
                </span>
              </div>
            )}

            {/* Main Title & Subtitle */}
            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-black text-slate-950 dark:text-white leading-[1.18] tracking-tight break-words text-balance">
                {mainTitle}{' '}
                {highlightWord && (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 block sm:inline">
                    {highlightWord}
                  </span>
                )}
              </h2>
              {description && (
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-xl break-words whitespace-normal">
                  {description}
                </p>
              )}
            </div>

            {/* Dynamic Support Pillars Row */}
            {activePillars.length > 0 && (
              <div className={`grid ${pillarGridClass} gap-3 sm:gap-2.5 pt-0.5`}>
                {activePillars.map((pillar, pIdx) => {
                  const Icon = renderPillarIcon(pillar.iconKey);
                  return (
                    <div key={pIdx} className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 shadow-2xs mt-0.5">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug break-words whitespace-normal">
                          {pillar.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-relaxed break-words whitespace-normal">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 py-2.5 sm:py-3 border-y border-slate-100 dark:border-slate-800/80">
              {/* Stat 1: Response Time */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight break-words">
                    {responseTimeBadge || '< 45s'}
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium break-words">
                    Live Response
                  </span>
                </div>
              </div>

              {/* Stat 2: Availability */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 border-l border-slate-100 dark:border-slate-800 pl-1.5 sm:pl-3 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight break-words">
                    {liveChatStatus || '24/7/365'}
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium break-words">
                    Always On
                  </span>
                </div>
              </div>

              {/* Stat 3: Direct Priority Channel */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 border-l border-slate-100 dark:border-slate-800 pl-1.5 sm:pl-3 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs md:text-sm font-black text-slate-950 dark:text-white leading-tight break-words">
                    {directPhone ? 'Direct Hotline' : 'Global Desk'}
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium break-words">
                    {directPhone || 'Priority Routing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Row */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => openModal(`${mainTitle} - Customer Support`, 'SUPPORT_SECTION')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{chatButtonText || "Contact Support Desk"}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => openModal('See How Quantix Support Works', 'SUPPORT_VIDEO_DEMO')}
                className="inline-flex items-center gap-2 text-left group cursor-pointer"
              >
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-orange-500/30 dark:border-orange-500/20 bg-orange-500/10 dark:bg-orange-500/15 text-[#FF4F00] dark:text-orange-400 transition-all group-hover:scale-110 group-hover:bg-orange-500/20 shadow-2xs">
                  <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current ml-0.5" />
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#FF4F00] transition-colors block leading-tight">
                    See how our support works
                  </span>
                  <span className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 block">
                    Watch 1 min video
                  </span>
                </div>
              </button>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Photo Card with Overlaid Floating Badges       */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative w-full flex justify-center mt-6 lg:mt-0 px-2 sm:px-4">
            <div className="relative w-full max-w-125 xl:max-w-132.5">
              
              {/* Floating Badge 1: Top-Left "Active Support Specialist" */}
              <div className="absolute -top-3.5 left-1 sm:-left-3 z-20 inline-flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 dark:border-slate-700/90 dark:bg-slate-900/95 px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-xl backdrop-blur-md">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
                </span>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-950 dark:text-white leading-tight break-words">
                    {repName || "Active Support Specialist"}
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] text-slate-500 dark:text-slate-400 block font-medium break-words">
                    {repRole || "Here to help, always"}
                  </span>
                </div>
              </div>

              {/* Floating Badge 2: Top-Right "Tier-3 Support" */}
              <div className="absolute -top-3 right-1 sm:right-3 z-20 inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-950/90 border border-slate-700/80 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-xl backdrop-blur-md text-white">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md sm:rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight">
                    Dedicated Desk
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 block font-mono">
                    VIP Priority
                  </span>
                </div>
              </div>

              {/* Main Photo Card Frame */}
              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2 sm:p-2.5">
                
                {/* Real Image Container */}
                <div className="relative aspect-16/10 sm:aspect-16/10.5 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={avatarSrc}
                    alt={repName || "24/7 Dedicated Technical Support Specialist"}
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 530px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                    onError={() => setAvatarSrc('/images/customer_support_executive.jpg')}
                  />
                </div>

                {/* Floating Badge 3: Right-Middle "4.9/5 Rating" */}
                <div className="absolute top-[48%] right-0 sm:-right-4 z-20 rounded-2xl border border-slate-200/90 bg-white/95 dark:border-slate-700/90 dark:bg-slate-900/95 px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 shadow-xl backdrop-blur-md text-center">
                  <div className="flex items-center justify-center gap-0.5 text-amber-400 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" />
                    ))}
                  </div>
                  <div className="font-syne text-[11px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight">
                    4.9/5
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-medium text-slate-500 dark:text-slate-400 block whitespace-nowrap">
                    Customer Satisfaction
                  </span>
                </div>

                {/* Bottom Status Strip */}
                <div className="mt-2.5 rounded-xl border border-slate-100 dark:border-slate-800/90 bg-slate-50/90 dark:bg-slate-800/60 p-2 sm:p-2.5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {/* Bottom Item 1: Phone */}
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight break-words">
                        {directPhone || '< 45s'}
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block break-words font-medium">
                        {directPhone ? 'Direct Phone' : 'Avg. Pickup'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Item 2: Hours */}
                  <div className="flex items-center gap-1.5 sm:gap-2 border-l border-slate-200/70 dark:border-slate-700/70 pl-1.5 sm:pl-2.5 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight break-words">
                        24/7/365
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block break-words font-medium">
                        Rush & Holiday
                      </span>
                    </div>
                  </div>

                  {/* Bottom Item 3: Email / Status */}
                  <div className="flex items-center gap-1.5 sm:gap-2 border-l border-slate-200/70 dark:border-slate-700/70 pl-1.5 sm:pl-2.5 min-w-0">
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400">
                      {directEmail ? (
                        <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                      ) : (
                        <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.2]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs font-black text-slate-950 dark:text-white leading-tight break-words">
                        {liveChatStatus || 'Dedicated'}
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 block break-words font-medium">
                        {directEmail || 'Support Team'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportSection;
