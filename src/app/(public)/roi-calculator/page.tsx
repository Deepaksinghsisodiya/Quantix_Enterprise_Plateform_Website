// src/app/(public)/roi-calculator/page.tsx
'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import ROICalculator from '@/features/ROI/ROICalculator';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function ROICalculatorPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-slate-950 min-h-screen text-white">
        <div className="site-container text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 shadow-sm">
            SAVINGS FORECASTER
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight">
            See your ROI
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            Enter your transaction metrics to see exactly how much time and money switching to Quantix will save your restaurant or retail business.
          </p>
        </div>

        <ROICalculator />
      </main>
      <Footer />
    </PublicLayout>
  );
}
