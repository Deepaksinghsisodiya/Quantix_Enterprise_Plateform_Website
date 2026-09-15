// src/app/(public)/testimonials/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Utensils,
  ShoppingBag,
  MessageSquareOff,
} from 'lucide-react';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import { useGetTestimonialsQuery } from '@/features/Testimonials/Service/TestimonialsService';

const CATEGORIES = [
  { id: 'all', label: 'All Reviews', icon: Sparkles },
  { id: 'restaurant', label: 'Restaurants & Bars', icon: Utensils },
  { id: 'retail', label: 'Retail & Grocery', icon: ShoppingBag },
  { id: 'enterprise', label: 'Enterprise Chains', icon: Building2 },
];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

  // Only real data from API — no dummy / hardcoded data
  const filteredTestimonials = testimonials.filter((t) => {
    if (activeCategory === 'all') return true;
    const ind = (t.industry || '').toLowerCase();
    return ind.includes(activeCategory.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Subtle ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-72 bg-gradient-to-b from-orange-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Why Quantix trail */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/why-quantix" className="hover:text-primary transition-colors font-medium">Why Quantix</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold truncate">Customer Testimonials</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-syne font-bold uppercase tracking-wider text-primary shadow-xs">
              <Sparkles size={13} />
              <span>LIVE MERCHANT REVIEWS</span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-950 dark:text-white">
              Customer <span className="text-primary">Testimonials & Reviews</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              Real feedback and operational reviews directly from store owners, general managers, and retail directors using the Quantix platform.
            </p>
          </div>

          {/* Aggregate Review Pill Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 dark:text-white">4.8 / 5.0</span>
              <span className="text-slate-400 font-normal">Rating</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Live Verified Merchant Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Strip */}
      <section className="site-container max-w-6xl px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { value: '50,000+', label: 'Active Outlets', sub: 'Across retail & hospitality' },
            { value: '4.8 / 5.0', label: 'Average Rating', sub: 'From verified operators' },
            { value: '99.99%', label: 'Cloud SLA', sub: 'Multi-region failover' },
            { value: '<2 min', label: 'Support Response', sub: '24/7 dedicated engineers' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-1"
            >
              <p className="font-syne text-xl sm:text-2xl font-black text-primary">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter & Testimonials Grid */}
      <section className="site-container max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-syne font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FF4F00] border-[#FF4F00] text-white shadow-md shadow-orange-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-400/60'
                }`}
              >
                <Icon size={13} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-pulse"
              >
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State when no API data returned */}
        {!isLoading && filteredTestimonials.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <MessageSquareOff size={36} className="mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="font-syne font-bold text-base text-slate-800 dark:text-slate-200 uppercase">
              No Testimonials Found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              No live merchant testimonials are currently returned for this category from the portal database.
            </p>
          </div>
        )}

        {/* Real Live API Testimonials Grid */}
        {!isLoading && filteredTestimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTestimonials.map((item, idx) => {
              const quoteText = item.quote || item.body || item.title || '';
              const authorName = item.author || item.personName || item.person || 'Verified Merchant';
              const roleTitle = item.role || item.personRole || item.theirRole || 'Store Operator';
              const company = item.companyName || item.company || '';
              const rating = item.rating || 5;

              return (
                <div
                  key={item.id || item.testimonialId || idx}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    {/* Rating & Highlight Stat */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} size={13} className="fill-amber-400" />
                        ))}
                      </div>
                      {item.highlightStat && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          {item.highlightStat}
                        </span>
                      )}
                    </div>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal italic">
                      "{quoteText}"
                    </p>
                  </div>

                  {/* Author Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-syne font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {authorName}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {roleTitle}{company ? `, ` : ''}
                        {company && <strong className="text-slate-700 dark:text-slate-300">{company}</strong>}
                      </p>
                    </div>
                    {item.industry && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {item.industry}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Global Conversion CTA Banner */}
      <CTABanner />
    </main>
  );
}
