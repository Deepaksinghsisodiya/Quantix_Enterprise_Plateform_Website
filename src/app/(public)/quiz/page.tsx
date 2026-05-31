// src/app/(public)/quiz/page.tsx
'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import SolutionQuiz from '@/features/Quiz/SolutionQuiz';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function SolutionQuizPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
        <div className="site-container text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
            AI PLAN CONFIGURATOR
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
            Find Your Plan
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Answer a few quick questions about your business terminals, location count, and core connectivity to discover the absolute perfect Quantix system package.
          </p>
        </div>

        <SolutionQuiz />
      </main>
      <Footer />
    </PublicLayout>
  );
}
