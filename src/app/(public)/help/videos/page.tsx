// src/app/(public)/help/videos/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ChevronRight, ArrowLeft, Play, Clock, Sparkles, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_TUTORIALS = [
  {
    id: 'vid-1',
    title: 'POS Terminal Initialization',
    desc: 'Unboxing terminals, connecting the POS, and running the setup wizard.',
    duration: '3:45',
    level: 'beginner',
    category: 'Device Setup',
  },
  {
    id: 'vid-2',
    title: 'Offline DB & Local Sync',
    desc: 'How the sync engine writes and backups transactions to local storage.',
    duration: '5:12',
    level: 'intermediate',
    category: 'Database',
  },
  {
    id: 'vid-3',
    title: 'Multi-Location Telemetry',
    desc: 'Aggregating branch inventories into global central command dashboards.',
    duration: '8:30',
    level: 'advanced',
    category: 'Cloud',
  },
  {
    id: 'vid-4',
    title: 'Token Validity & Renewals',
    desc: 'Applying offline tokens to standalone registers step-by-step.',
    duration: '2:15',
    level: 'beginner',
    category: 'Licenses',
  },
  {
    id: 'vid-5',
    title: 'Split Billing & course pacing',
    desc: 'Managing busy restaurant table course paces and split receipts.',
    duration: '4:20',
    level: 'intermediate',
    category: 'Restaurant',
  },
];

export default function HelpVideosPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const filteredVideos = selectedLevel === 'all' 
    ? VIDEO_TUTORIALS 
    : VIDEO_TUTORIALS.filter(v => v.level === selectedLevel);

  const activeVideo = VIDEO_TUTORIALS.find(v => v.id === activeVideoModal);

  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container px-4 sm:px-0">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">Video Guides</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10">
            <Link href="/help">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">VISUAL PLAYLISTS</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                Video Setup Guides
              </h1>
            </div>
          </div>

          {/* Level Filters bar */}
          <div className="flex flex-wrap gap-2 mb-8 items-center border-b border-gray-250 dark:border-slate-900 pb-5">
            <Filter size={14} className="text-slate-400 mr-2" />
            {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all border cursor-pointer",
                  selectedLevel === lvl
                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                    : "border-gray-300 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-gray-50 dark:hover:bg-slate-900"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div 
                key={video.id} 
                className="rounded-2xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 overflow-hidden flex flex-col justify-between hover:border-blue-500/30 transition-all group"
              >
                {/* Simulated Thumbnail */}
                <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center border-b border-gray-250 dark:border-slate-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-indigo-900/20 opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  <button 
                    onClick={() => setActiveVideoModal(video.id)}
                    className="relative z-10 h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play size={16} className="fill-white translate-x-0.5" />
                  </button>
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 font-mono">
                    <Clock size={10} /> {video.duration}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-500 dark:text-blue-400 py-0.5 px-2 uppercase tracking-wider">
                        {video.category}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {video.level}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                      {video.desc}
                    </p>
                  </div>

                  <button 
                    onClick={() => setActiveVideoModal(video.id)}
                    className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-blue-650 dark:hover:text-blue-300 transition-all flex items-center gap-1 cursor-pointer pt-2"
                  >
                    Watch Now &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {activeVideoModal && activeVideo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-2xl rounded-3xl border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-2xl relative overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveVideoModal(null)}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer transition-all"
                  >
                    <X size={14} />
                  </button>

                  <div className="space-y-4">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 flex items-center gap-1">
                      <Sparkles size={10} /> Live Playback
                    </span>
                    <h3 className="text-base sm:text-xl font-syne font-black uppercase text-slate-900 dark:text-white">
                      {activeVideo.title}
                    </h3>

                    {/* Simulated Player Screen */}
                    <div className="aspect-video w-full rounded-2xl bg-black border border-gray-200 dark:border-slate-900 flex flex-col justify-center items-center p-6 text-center space-y-4">
                      <Play size={48} className="text-blue-500 animate-pulse fill-blue-500/10" />
                      <p className="text-slate-400 text-xs font-medium">Initializing stream player connection...</p>
                      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-1/3 animate-[loading_2s_infinite]" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider border-t border-gray-250 dark:border-slate-900 pt-4">
                      <span>Duration: {activeVideo.duration} mins</span>
                      <span>Level: {activeVideo.level}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }
