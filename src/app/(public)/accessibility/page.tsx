// src/app/(public)/accessibility/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function AccessibilityPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-slate-950 min-h-screen text-white pb-16">
        <div className="site-container max-w-3xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-sm">
              LEGAL STANDARDS
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
              Accessibility
            </h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Last updated: April 1, 2026</p>
          </div>

          {/* Accessibility prose */}
          <div className="space-y-8 text-xs text-slate-400 leading-relaxed font-medium border-t border-slate-900 pt-8">
            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">1. Standard Commitment</h2>
              <p>
                Quantix Technologies is committed to accessibility. Our interfaces map directly to WCAG 2.1 Level AA parameters to ensure screen-reader clarity, high-contrast layouts, and easy tab-focus controls.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-white font-semibold">2. Terminal Support Features</h2>
              <p>
                Standard POS setups include customizable font scales, voice command checkout modulations, and high-contrast dark theme modifications suitable for visual impairments.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
