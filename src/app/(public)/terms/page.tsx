// src/app/(public)/terms/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-slate-950 min-h-screen text-white pb-16">
        <div className="site-container max-w-3xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-sm">
              LEGAL TERMS
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Last updated: April 1, 2026</p>
          </div>

          {/* Terms prose */}
          <div className="space-y-8 text-xs text-slate-400 leading-relaxed font-medium border-t border-slate-900 pt-8">
            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">1. Acceptance of Terms</h2>
              <p>
                By registering an account, downloading offline standalone clients, or operating the Quantix POS platform, you signify agreement to these Terms of Service. If you disagree, do not access our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">2. Service Description</h2>
              <p>
                Quantix dispatches point-of-sale systems for retail, food trucks, and restaurant operators. Deployment structures span Enterprise (cloud subscription sync) and Standalone (one-time offline tokens). Scope details adapt to active subscriptions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">3. Standalone Tokens</h2>
              <p>
                Standalone client tokens constitute perpetual offline usage licenses non-refundable post activation. Tokens bind to singular merchant IDs. Expired tokens activate a 7-day read-only grace period before terminal locking mechanisms trigger.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">4. Acceptable Code Conduct</h2>
              <p>
                Merchants agree not to reverse-engineer, decompile, or attempt to extract the source code of local sqlite registers. Prohibited credit cards or illegal transaction loops trigger instant account termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">5. Limitations of Liability</h2>
              <p>
                To the ultimate boundaries of municipal law, Quantix registers bear no liability for cash shortfalls, system offline interruptions, or business profit margins.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
