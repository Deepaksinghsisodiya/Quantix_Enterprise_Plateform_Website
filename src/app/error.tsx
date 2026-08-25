'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Headset } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service if needed
    console.error('Quantix Platform Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg text-slate-900 dark:text-white flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden transition-colors">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-100 bg-red-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-lg text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-syne font-black uppercase tracking-wider text-red-600 dark:text-red-400">
          <AlertTriangle size={13} />
          <span>Application Error</span>
        </div>

        <h1 className="font-syne text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          Something went wrong while loading this page
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
          We encountered an unexpected error while preparing the POS view. You can try refreshing the view or returning home.
        </p>

        {error?.digest && (
          <p className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-darkSurface py-1 px-2.5 rounded-md inline-block">
            Error Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-primary/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-darkSurface border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-syne font-bold text-xs uppercase tracking-wider hover:border-primary/40 hover:text-primary transition-all hover:scale-105 active:scale-95"
          >
            <Home size={14} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-darkSurface/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-syne font-bold text-xs uppercase tracking-wider hover:border-primary/40 hover:text-primary transition-all"
          >
            <Headset size={14} />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
