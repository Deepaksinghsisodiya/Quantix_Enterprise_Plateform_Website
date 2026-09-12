// src/app/(public)/cookies/page.tsx
import React from 'react';

export default function CookiePolicyPage() {
  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      <div className="site-container max-w-3xl space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
            LEGAL SECURITY
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Last updated: April 1, 2026</p>
        </div>

        {/* Cookie policy prose */}
        <div className="space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-gray-100 dark:border-slate-900 pt-8">
          <section className="space-y-3">
            <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">1. Use of Cookies</h2>
            <p>
              Our web dashboards and platforms deploy browser cookies to ensure correct session persistence, remember dashboard layout customizations, and analyze visitor telemetry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">2. Managing Preferences</h2>
            <p>
              Users can at any point update their browser security options to block first-party or third-party cookies. Note that preventing essential cookie handshakes may disable active POS authentication.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">3. Telemetry Analytics</h2>
            <p>
              Diagnostic logs collect loading delays and interface clicks to help us optimize terminal responsiveness. All telemetry profiles operate anonymously.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
