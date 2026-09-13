'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Star,
  Building2,
  CloudUpload,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Newspaper,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroSlide } from './HeroData';
import { useContactModal } from '@/context/ContactModalContext';
import { useGetAnnouncementsQuery } from '@/features/Announcements';
import { HeroNewsTickerSkeleton } from '@/components/atoms';
import { useAppSelector } from '@/redux/hooks';
import Cookies from 'js-cookie';

export interface HeroViewProps {
  slides: HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  onTogglePause: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  slides,
  activeIndex,
  onNext,
  onPrev,
  onGoTo,
  onMouseEnter,
  onMouseLeave,
}) => {
  const slide = slides[activeIndex];
  const { openModal } = useContactModal();

  const { token, user } = useAppSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cookieToken =
      typeof window !== 'undefined'
        ? Cookies.get('accessToken') || Cookies.get('authUser')
        : null;
    if (isMounted) {
      setIsLoggedIn(Boolean(token || user || cookieToken));
    }
    return () => {
      isMounted = false;
    };
  }, [token, user]);

  const getAdminPortalUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:4173/login';
      }
    }
    return (
      process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
      'https://quantixadmin.foreteksolution.in/'
    );
  };

  const { data: announcementsData, isLoading: isAnnouncementsLoading } =
    useGetAnnouncementsQuery();
  const announcements =
    announcementsData && announcementsData.length > 0
      ? announcementsData.filter((a) => a.isActive !== false)
      : [
        {
          announcementId: 'live-1',
          title: 'Multi-Store HQ Cloud Sync',
          body: 'Live 1-click catalog & price distribution across 50+ locations',
          kind: 'Update',
          linkUrl: '/products/enterprise-pos',
        },
        {
          announcementId: 'live-2',
          title: 'Zero-Latency Offline Till Mesh',
          body: 'Keep billing and printing receipts during local broadband outages',
          kind: 'Notice',
          linkUrl: '/resources/pos-guide',
        },
        {
          announcementId: 'live-3',
          title: 'Bring Your Own Processor',
          body: 'Zero variable surcharge on payment processing volume',
          kind: 'Event',
          linkUrl: '/compare',
        },
      ];

  const formatHeading = (heading: string) => {
    const words = heading.split(' ');
    if (words.length <= 1) return heading;

    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 font-extrabold">
          {lastWord}
        </span>
      </>
    );
  };

  const getFeatureIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Building2 size={14} className="text-[#FF4F00]" />;
      case 1:
        return <CloudUpload size={14} className="text-[#FF4F00]" />;
      case 2:
        return <Boxes size={14} className="text-[#FF4F00]" />;
      default:
        return <Star size={14} className="text-[#FF4F00]" />;
    }
  };

  if (!slide) return null;

  return (
    <section
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-24 pb-14 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 xl:pt-36 xl:pb-24"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onMouseEnter();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') onMouseLeave();
      }}
    >
      {/* Ambient background subtle radial light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(255,79,0,0.06),transparent_70%)]" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

          {/* LEFT COLUMN: Authority Content */}
          <div className="flex flex-col items-start space-y-4 text-left sm:items-center sm:text-center lg:col-span-6 lg:items-start lg:text-left">

            {/* Trust Pill with Live Pulse */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shadow-xs backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <ShieldCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Trusted by 1,000+ Multi-Location Businesses</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id || activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-full flex-col items-start gap-4 sm:items-center lg:items-start"
              >
                {/* Slide Category Badge */}
                {slide.badge && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05, duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FF4F00]">
                      {slide.badge}
                    </span>
                    <span className="h-1 w-8 bg-[#FF4F00] rounded-full hidden min-[400px]:inline-block" />
                  </motion.div>
                )}

                {/* Main Heading with Spring Reveal */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="font-syne text-[1.85rem] leading-[1.18] sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.9rem] font-extrabold tracking-tight text-slate-950 dark:text-white max-w-xl"
                >
                  {formatHeading(slide.heading)}
                </motion.h1>

                {/* Subheading */}
                {slide.subheading && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="text-sm sm:text-base lg:text-[1.02rem] font-normal leading-relaxed text-slate-600 dark:text-slate-300 max-w-lg"
                  >
                    {slide.subheading}
                  </motion.p>
                )}

                {/* Feature Highlights Pills */}
                {slide.featureHighlights && slide.featureHighlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-wrap items-center justify-start sm:justify-center lg:justify-start gap-2 pt-1 w-full"
                  >
                    {slide.featureHighlights.map((feat, idx) => (
                      <motion.div
                        key={feat}
                        whileHover={{ y: -2, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-900/70 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:border-orange-500/40 cursor-default"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                          {getFeatureIcon(idx)}
                        </div>
                        <span className="whitespace-nowrap">{feat}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Primary & Secondary CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="flex w-full flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center justify-start sm:justify-center lg:justify-start gap-3 pt-2"
                >
                  {isLoggedIn ? (
                    <motion.a
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      href={getAdminPortalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] px-6 py-3 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:brightness-110 hover:shadow-orange-500/35"
                    >
                      {/* Button Laser Shimmer Sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <Sparkles size={15} className="text-amber-200 fill-amber-200 transition-transform group-hover:scale-110 shrink-0" />
                      <span>Launch Admin Portal</span>
                      <ExternalLink size={14} className="text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.96 }} className="inline-flex">
                      <Link
                        href={slide.primaryCta?.href || '/sign-up'}
                        className="group relative overflow-hidden inline-flex w-full min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] px-6 sm:px-8 py-3 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:brightness-110 hover:shadow-orange-500/35"
                      >
                        {/* Button Laser Shimmer Sweep */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Rocket size={15} className="fill-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
                        <span>{slide.primaryCta?.label || 'Start Your Free Trial'}</span>
                      </Link>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => openModal('Book an Enterprise Demo', 'HERO_REQUEST_DEMO')}
                    className="group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80 px-6 sm:px-7 py-3 font-syne text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 shadow-xs transition-all duration-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950"
                  >
                    <span>{slide.secondaryCta?.label || 'Book an Enterprise Demo'}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0" />
                  </motion.button>
                </motion.div>

                {/* News / Announcements Ticker */}
                {announcements.length > 0 && (
                  <div className="w-full mt-2 relative flex items-center rounded-xl border border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60 p-1.5 shadow-2xs overflow-hidden backdrop-blur-xs min-h-10">
                    <div className="relative z-20 flex items-center justify-center gap-1.5 shrink-0 rounded-lg bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-xs select-none">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <Newspaper size={12} className="shrink-0 text-white" />
                      <span>Updates</span>
                    </div>

                    <div className="pointer-events-none absolute left-[88px] top-0 bottom-0 w-6 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10" />

                    {isAnnouncementsLoading ? (
                      <HeroNewsTickerSkeleton />
                    ) : (
                      <div className="min-w-0 flex-1 overflow-hidden ml-2">
                        <div className="flex w-max shrink-0 animate-[heroTickerScroll_85s_linear_infinite] hover:[animation-play-state:paused] items-center gap-6 text-[11px] font-medium text-slate-700 dark:text-slate-300 select-none">
                          {[1, 2].map((group) => (
                            <div key={group} className="flex items-center gap-6 shrink-0">
                              {announcements.map((item, idx) => (
                                <React.Fragment key={`${group}-${item.announcementId || idx}`}>
                                  <div className="inline-flex items-center gap-1.5">
                                    <span
                                      className={cn(
                                        'inline-block rounded-md px-1.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider',
                                        item.kind === 'Event'
                                          ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                                          : item.kind === 'Notice'
                                            ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                            : 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
                                      )}
                                    >
                                      {item.kind === 'Notice' ? 'Offer' : item.kind === 'Event' ? 'Event' : 'Update'}
                                    </span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                      {item.title}
                                    </span>
                                    {item.body && (
                                      <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
                                        — {item.body}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-slate-300 dark:text-slate-600 font-bold">•</span>
                                </React.Fragment>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Modern Hardware Terminal Visual Showcase with Living Ambient Animations */}
          <div className="relative flex w-full flex-col items-center justify-center lg:col-span-6 my-auto">
            <div className="relative w-full max-w-[540px] flex items-center justify-center">

              {/* Continuous Breathing Ambient Glow Aura */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#FF4F00]/25 via-amber-500/15 to-orange-600/25 blur-2xl -z-10 pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id || activeIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full relative z-10"
                >
                  {/* Terminal Chassis with Bezel and Soft Shadows */}
                  <div className="group relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl bg-slate-950 p-2 sm:p-3 shadow-2xl border border-slate-800/80 transition-transform duration-500 hover:scale-[1.01]">

                    {/* Floating Telemetry Chip 1: Real-Time Cloud Sync (Smooth Gentle Float) */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 right-4 z-20 hidden min-[480px]:inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/35 bg-slate-900/90 px-2.5 py-1 text-[10px] font-bold text-emerald-400 shadow-xl backdrop-blur-md"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Real-Time HQ Cloud Sync</span>
                    </motion.div>

                    {/* Floating Telemetry Chip 2: Offline Till Mesh (Smooth Gentle Float Offset) */}
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                      className="absolute bottom-4 left-4 z-20 hidden min-[480px]:inline-flex items-center gap-1.5 rounded-lg border border-orange-500/35 bg-slate-900/90 px-2.5 py-1 text-[10px] font-bold text-orange-400 shadow-xl backdrop-blur-md"
                    >
                      <ShieldCheck size={12} className="text-orange-400" />
                      <span>100% Offline Till Mesh</span>
                    </motion.div>

                    {/* Inner Terminal Display Frame */}
                    <div className="relative h-full w-full overflow-hidden rounded-xl lg:rounded-2xl bg-slate-900">
                      <Image
                        src={slide.backgroundImage || '/images/foodhub_pos_terminal.jpg'}
                        alt={slide.heading}
                        fill
                        priority
                        unoptimized={
                          (slide.backgroundImage || '').startsWith('http') ||
                          (slide.backgroundImage || '').startsWith('/api')
                        }
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                    </div>

                    {/* Slide Navigation Buttons on Terminal */}
                    {slides.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous Slide"
                          className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:border-[#FF4F00] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onPrev();
                          }}
                        >
                          <ChevronLeft size={18} className="stroke-[2.5]" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next Slide"
                          className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4F00] hover:border-[#FF4F00] hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onNext();
                          }}
                        >
                          <ChevronRight size={18} className="stroke-[2.5]" />
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Pagination Below Terminal */}
            {slides.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-1.5 z-20">
                {slides.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    className="p-1 cursor-pointer group"
                    onClick={() => onGoTo(i)}
                  >
                    <span
                      className={cn(
                        'block h-1.5 rounded-full transition-all duration-300',
                        i === activeIndex
                          ? 'w-7 bg-[#FF4F00] shadow-sm shadow-orange-500/40'
                          : 'w-2 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400'
                      )}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* BOTTOM BASE STRIP: Connected Platform Capabilities (with Spring Lift Hover) */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#FF4F00] shrink-0" />
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white tracking-tight">
                Everything Your Locations Need. One Connected Platform.
              </span>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#FF4F00] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View 7 Modules</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2.5 sm:grid-cols-4">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 rounded-xl bg-white p-2.5 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-2xs hover:border-orange-500/30 transition-colors cursor-default"
            >
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <div className="truncate">
                <p className="text-[11px] font-bold leading-tight text-slate-800 dark:text-slate-200">POS & Cloud HQ</p>
                <p className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">Central store control</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 rounded-xl bg-white p-2.5 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-2xs hover:border-orange-500/30 transition-colors cursor-default"
            >
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <div className="truncate">
                <p className="text-[11px] font-bold leading-tight text-slate-800 dark:text-slate-200">Inventory & COGS</p>
                <p className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">Cross-store transfers</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 rounded-xl bg-white p-2.5 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-2xs hover:border-orange-500/30 transition-colors cursor-default"
            >
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <div className="truncate">
                <p className="text-[11px] font-bold leading-tight text-slate-800 dark:text-slate-200">Online & Mobile</p>
                <p className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">Web orders & BOPIS</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-2 rounded-xl bg-white p-2.5 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-2xs hover:border-orange-500/30 transition-colors cursor-default"
            >
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <div className="truncate">
                <p className="text-[11px] font-bold leading-tight text-slate-800 dark:text-slate-200">BI & Payments</p>
                <p className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">Real-time telemetry</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroView;
