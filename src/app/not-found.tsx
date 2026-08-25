'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search, Sparkles, Utensils, Store, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-darkBg text-slate-900 dark:text-white flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden transition-colors">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-100 bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-xl text-center space-y-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light"
        >
          <Sparkles size={13} />
          <span>Error 404 — Page Not Found</span>
        </motion.div>

        {/* 404 Giant Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <h1 className="font-syne text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 select-none">
            404
          </h1>
        </motion.div>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
            Looking for something on the Quantix Platform?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-darkSurface border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-syne font-bold text-xs uppercase tracking-wider hover:border-primary/40 hover:text-primary transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Modules</span>
          </Link>
        </motion.div>

        {/* Quick Links Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-left space-y-3"
        >
          <p className="text-[11px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 text-center">
            Popular Platforms & Tools:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Link
              href="/products/restaurant-pos"
              className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-darkSurface/50 hover:border-primary/40 hover:bg-white dark:hover:bg-darkSurface transition-all text-xs font-syne font-bold text-slate-800 dark:text-slate-200"
            >
              <Utensils size={14} className="text-amber-500 shrink-0" />
              <span className="truncate">Restaurant POS</span>
            </Link>

            <Link
              href="/products/retail-pos"
              className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-darkSurface/50 hover:border-primary/40 hover:bg-white dark:hover:bg-darkSurface transition-all text-xs font-syne font-bold text-slate-800 dark:text-slate-200"
            >
              <Store size={14} className="text-emerald-500 shrink-0" />
              <span className="truncate">Retail Register</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/60 dark:bg-darkSurface/50 hover:border-primary/40 hover:bg-white dark:hover:bg-darkSurface transition-all text-xs font-syne font-bold text-slate-800 dark:text-slate-200"
            >
              <HelpCircle size={14} className="text-sky-500 shrink-0" />
              <span className="truncate">Help Center</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
