// src/app/(public)/sla/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function ServiceLevelAgreementPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container max-w-3xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
              LEGAL GUARANTEES
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
              Service Level Agreement (SLA)
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Last updated: April 1, 2026</p>
          </div>

          {/* SLA prose */}
          <div className="space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-gray-100 dark:border-slate-900 pt-8">
            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white font-semibold">1. Uptime SLA Commitments</h2>
              <p>
                Quantix Cloud Enterprise platforms guarantee a **99.9% uptime threshold** (calculated monthly). Uptime metrics represent uninterrupted access to dashboard reports, stock sync, and payment authorizations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white font-semibold">2. Standalone Support</h2>
              <p>
                Perpetual Standalone token licenses contain dedicated setup guides and offline software re-downloads. Standard priority support tickets resolve within **12 business hours**.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white font-semibold">3. Compensation Criteria</h2>
              <p>
                In the rare instance where monthly cloud synchronization uptime drops below 99.9%, subscription credits apply directly to active billing cycles.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
