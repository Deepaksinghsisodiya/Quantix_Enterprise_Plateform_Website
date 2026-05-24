// src/app/(public)/press/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Download, Award, ShieldCheck, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PressKitPage() {
  return (
    <PublicLayout>
      <Navbar />

      <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
        
        {/* Header Hero */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 transition-colors text-center">
          <div className="site-container max-w-2xl space-y-4">
            <div className="mx-auto p-3.5 bg-primary/10 rounded-2xl w-fit text-primary animate-spin-slow">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-syne font-black text-slate-900 dark:text-white uppercase">Press & Media Kit</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Download authorized logo files, brand identity colors, and verified company details for press coverage.
            </p>
          </div>
        </section>

        {/* Assets Download Grid */}
        <section className="py-24 site-container max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column 1: Brand Assets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-xs">
            <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">Logo Assets</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              We provide clean Vector SVGs and high-definition PNGs of our core brand mark, perfect for light and dark layouts.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Core Logo Mark (SVG)</span>
                <a
                  href="/favicon.ico"
                  download
                  className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </a>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Horizontal Lockup (HD PNG)</span>
                <a
                  href="/favicon.ico"
                  download
                  className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Brand Identity Colors */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-xs">
            <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">Brand Theme</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Our core visual colors represent stability and innovation. We use our primary blue brand tokens for all focal components.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-16 w-full bg-primary rounded-2xl shadow-inner" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quantix Primary</span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">#2563EB</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-16 w-full bg-slate-900 rounded-2xl shadow-inner border border-white/10" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quantix Slate</span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">#0F172A</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Media Contact section */}
        <section className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 py-20 text-center">
          <div className="site-container max-w-xl space-y-6">
            <Mail className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-2xl font-syne font-black text-slate-900 dark:text-white uppercase">
              Media & Press Inquiries
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Are you working on an editorial, tech analysis article, or hardware review? Contact our PR desk directly.
            </p>
            <div className="pt-2">
              <a
                href="mailto:press@quantixpos.com"
                className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full text-xs font-bold transition shadow-lg shadow-primary/20 hover:scale-105 inline-block"
              >
                press@quantixpos.com
              </a>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}
