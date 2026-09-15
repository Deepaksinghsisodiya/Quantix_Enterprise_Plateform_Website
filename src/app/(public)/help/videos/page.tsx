// src/app/(public)/help/videos/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronRight,
  Play,
  Pause,
  Clock,
  Sparkles,
  Filter,
  X,
  Search,
  Video,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  MonitorPlay,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface VideoTutorial {
  id: string;
  title: string;
  desc: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  chapters: { time: string; title: string }[];
}

const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'vid-1',
    title: 'POS Terminal Initialization & Hardware Setup',
    desc: 'Unboxing touch terminals, configuring local network interfaces, printer pairing, and completing the setup wizard.',
    duration: '3:45',
    level: 'beginner',
    category: 'Device Setup',
    chapters: [
      { time: '0:00', title: 'Unboxing & Port Verification' },
      { time: '1:10', title: 'Network & Receipt Printer Pairing' },
      { time: '2:30', title: 'Running Initial Setup Wizard' },
    ],
  },
  {
    id: 'vid-2',
    title: 'Offline DB & Local IndexedDB Sync Engine',
    desc: 'Deep dive into local SQLite/IndexedDB caching, transaction queueing, and automatic conflict resolution upon reconnection.',
    duration: '5:12',
    level: 'intermediate',
    category: 'Database',
    chapters: [
      { time: '0:00', title: 'Offline Architecture Overview' },
      { time: '1:45', title: 'Simulating Network Drops' },
      { time: '3:20', title: 'Automatic Two-Way Sync Verification' },
    ],
  },
  {
    id: 'vid-3',
    title: 'Multi-Location Telemetry & Central Command',
    desc: 'Aggregating regional store branches, real-time inventory telemetry, and global margin analytics in one dashboard.',
    duration: '8:30',
    level: 'advanced',
    category: 'Cloud Telemetry',
    chapters: [
      { time: '0:00', title: 'Central Command Setup' },
      { time: '2:40', title: 'Live Regional Metrics Feed' },
      { time: '5:15', title: 'Branch Permission & Role Hierarchy' },
    ],
  },
  {
    id: 'vid-4',
    title: 'Offline Token Provisioning & License Renewals',
    desc: 'Applying offline activation cryptographic tokens to standalone registers without internet connectivity.',
    duration: '2:15',
    level: 'beginner',
    category: 'Licenses',
    chapters: [
      { time: '0:00', title: 'Generating Token in Enterprise Portal' },
      { time: '0:50', title: 'Injecting License into Register' },
      { time: '1:40', title: 'Verifying Offline Expiry & Signatures' },
    ],
  },
  {
    id: 'vid-5',
    title: 'Split Billing & Kitchen Course Pacing',
    desc: 'Managing busy restaurant table course paces, customized split bills by seat, and instant kitchen display routing.',
    duration: '4:20',
    level: 'intermediate',
    category: 'Restaurant',
    chapters: [
      { time: '0:00', title: 'Floor Plan & Table Layout' },
      { time: '1:30', title: 'Split Bill by Seat or Custom Amount' },
      { time: '3:10', title: 'Course Hold & Fire KDS Sync' },
    ],
  },
  {
    id: 'vid-6',
    title: 'Payment Terminal Gateway & EMV Tokenization',
    desc: 'Configuring integrated EMV chip terminals, contactless NFC processing, and PCI DSS zero-footprint tokenization.',
    duration: '6:10',
    level: 'intermediate',
    category: 'Payments',
    chapters: [
      { time: '0:00', title: 'Gateway Connector Configuration' },
      { time: '2:15', title: 'Contactless & Chip Card Flow' },
      { time: '4:30', title: 'End-to-End Encryption Audit' },
    ],
  },
];

const CATEGORIES = ['All', 'Device Setup', 'Database', 'Cloud Telemetry', 'Restaurant', 'Licenses', 'Payments'];

export default function HelpVideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredVideos = useMemo(() => {
    return VIDEO_TUTORIALS.filter((v) => {
      const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || v.level === selectedLevel;
      const matchesSearch =
        searchQuery.trim() === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const activeVideo = VIDEO_TUTORIALS.find((v) => v.id === activeVideoModal);

  const openVideo = (id: string) => {
    setActiveVideoModal(id);
    setIsPlaying(true);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400';
      case 'intermediate':
        return 'bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-500/10 border-purple-500/25 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-slate-500/10 border-slate-500/25 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Using site-wide standard .page-hero-header from globals.css) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - direct Resources > Video Guides trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">Video Guides</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <Video size={13} className="text-[#FF4D00]" />
              <span>Visual Playlists & Walkthroughs</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            Video Setup Guides
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
            Master Quantix POS with high-definition step-by-step video tutorials covering terminal onboarding, offline
            database synchronization, table pacing, and multi-location telemetry.
          </p>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Using site-wide standard .section-py from globals.css) ─── */}
      <section className="section-py site-container">
        {/* Search & Filter Controls Bar */}
        <div className="space-y-4 mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search tutorials by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Level Selector Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter size={12} /> Level:
              </span>
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer',
                    selectedLevel === lvl
                      ? 'bg-primary border-primary text-white shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  )}
                >
                  {lvl === 'all' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Layers size={12} /> Topic:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-all shrink-0 cursor-pointer border',
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white font-bold shadow-2xs'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredVideos.length}</strong> of{' '}
              {VIDEO_TUTORIALS.length} tutorials
            </span>
            {(selectedCategory !== 'All' || selectedLevel !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="text-primary hover:underline font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* ─── Video Grid ─── */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="rounded-lg border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                {/* Simulated High-Res Video Thumbnail */}
                <div
                  onClick={() => openVideo(video.id)}
                  className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 overflow-hidden cursor-pointer select-none group/thumb"
                >
                  {/* Subtle Tech Glow Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.18),transparent_70%)] opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
                  
                  {/* Category Pill Overlaid Top Left */}
                  <span className="absolute top-3 left-3 z-10 rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-orange-400 border border-orange-500/30 shadow-xs">
                    {video.category}
                  </span>

                  {/* Play Button Trigger with pulse ring */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="absolute h-14 w-14 rounded-full bg-primary/20 animate-ping pointer-events-none" />
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 transform group-hover/thumb:scale-110 active:scale-95 transition-all duration-200">
                      <Play size={18} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag Overlaid Bottom Right */}
                  <span className="absolute bottom-3 right-3 z-10 rounded-md bg-black/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono border border-white/10 shadow-xs">
                    <Clock size={11} className="text-primary" /> {video.duration}
                  </span>
                </div>

                {/* Video Info Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          'rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border',
                          getLevelBadgeClass(video.level)
                        )}
                      >
                        {video.level}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {video.chapters.length} Chapters
                      </span>
                    </div>

                    <h3
                      onClick={() => openVideo(video.id)}
                      className="text-sm sm:text-base font-syne font-bold uppercase text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 font-normal">
                      {video.desc}
                    </p>
                  </div>

                  {/* Card Action Row */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => openVideo(video.id)}
                      className="text-xs font-bold text-primary hover:text-primary-dark transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <MonitorPlay size={13} />
                      <span>Watch Tutorial</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      Free Access
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center rounded-lg border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-8 space-y-3">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 text-primary flex items-center justify-center mx-auto">
              <Search size={22} />
            </div>
            <h3 className="font-syne font-bold text-base text-slate-900 dark:text-white uppercase">
              No Tutorials Match Your Query
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find any setup videos matching "{searchQuery}". Try selecting a different topic or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* ─── 3. Interactive Video Player Modal ─── */}
      <AnimatePresence>
        {activeVideoModal && activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            {/* Backdrop click dismiss */}
            <div className="absolute inset-0" onClick={() => setActiveVideoModal(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6 shadow-2xl relative z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all z-20"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>

              <div className="space-y-4 overflow-y-auto pr-1">
                {/* Modal Title & Tags */}
                <div className="space-y-1.5 pr-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                      <Sparkles size={11} /> Live Playback
                    </span>
                    <span
                      className={cn(
                        'rounded px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider border',
                        getLevelBadgeClass(activeVideo.level)
                      )}
                    >
                      {activeVideo.level}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-syne font-black uppercase text-slate-900 dark:text-white leading-snug">
                    {activeVideo.title}
                  </h3>
                </div>

                {/* Simulated Interactive Video Player Screen */}
                <div className="aspect-video w-full rounded-lg bg-black border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4 group">
                  {/* Watermark Logo */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-white font-bold">
                      QUANTIX ACADEMY
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping inline-block" /> 1080p HD
                    </span>
                  </div>

                  {/* Center Screen State */}
                  <div className="flex flex-col items-center justify-center text-center space-y-3 my-auto">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-14 w-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause size={22} className="fill-white" />
                      ) : (
                        <Play size={22} className="fill-white translate-x-0.5" />
                      )}
                    </button>
                    <p className="text-slate-300 text-xs font-medium">
                      {isPlaying ? 'Streaming module walkthrough...' : 'Paused'}
                    </p>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="space-y-2 pt-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent -mx-4 -mb-4 p-4">
                    {/* Scrub bar */}
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className={cn(
                          'h-full bg-primary',
                          isPlaying ? 'w-3/5 animate-pulse' : 'w-1/4'
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-white cursor-pointer"
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="hover:text-white cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                        <span className="text-[11px] text-slate-400">1:45 / {activeVideo.duration}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-[10px] uppercase font-bold tracking-wider">{activeVideo.category}</span>
                        <Maximize2 size={14} className="hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-primary" /> Tutorial Chapters
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeVideo.chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className="rounded-md border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 p-2.5 text-left"
                      >
                        <span className="text-[10px] font-mono font-bold text-primary block">{ch.time}</span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block line-clamp-1">
                          {ch.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overview Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {activeVideo.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── 4. Global CTA Banner ─── */}
      <CTABanner />
    </main>
  );
}
