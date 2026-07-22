// src/app/(public)/about/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Award, Users, Globe, Target, Flame } from "lucide-react";
import SocialProofStatsWrapper from "@/features/SocialProof/SocialProofStatsWrapper";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PublicLayout>
      <Navbar />

      <div className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
        
        {/* Section 1: Hero */}
        <section className="relative py-24 bg-slate-950 overflow-hidden text-center text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-indigo-600 to-transparent" />
          <div className="relative z-10 site-container max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-light uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              <span>Our Mission</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne font-black uppercase leading-[1.1]">
              Redefining Commerce for Local Businesses
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              We build offline-first, cloud-synchronized point-of-sale systems that empower retail store operators and restaurant owners to focus on what matters most: serving their customers.
            </p>
          </div>
        </section>

        {/* Section 2: Numbers/Statistics Grid */}
        <section className="-mt-10 relative z-20 site-container max-w-7xl">
          <SocialProofStatsWrapper />
        </section>

        {/* Section 3: Pillars / Core Values */}
        <section className="py-24 site-container">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-primary tracking-widest uppercase text-center">Our Core Values</span>
            <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white uppercase text-center">The principles that guide us</h2>
            <p className="text-sm font-medium text-slate-500 text-center">We believe business applications should be fast, elegant, and completely dependable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white uppercase">Merchant First</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Every line of code we write, and hardware integration we deploy, is tested under actual checkout counter stress. We optimize for high speeds and zero cashier fatigue.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white uppercase">Offline-First Trust</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                An internet outage should never stop trade. We construct robust local-caching networks, allowing stores and bars to sell without interruption, syncing automatically in the background.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white uppercase">Modern Simplicity</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                POS registers should not look like Windows 95 application grids. We build premium, glassmorphic, visual user interfaces that cashiers love and customers enjoy looking at.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Call to action */}
        <section className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 py-20 text-center">
          <div className="site-container max-w-xl space-y-6">
            <Users className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-2xl md:text-3xl font-syne font-black text-slate-900 dark:text-white uppercase">
              Want to build the future of retail?
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              We are constantly seeking brilliant engineers, UI/UX designers, and customer success heroes to join our remote-first, international team.
            </p>
            <div className="pt-2">
              <Link
                href="/careers"
                className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full text-xs font-bold transition shadow-lg shadow-primary/20 hover:scale-105 inline-block"
              >
                View Job Openings
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}
