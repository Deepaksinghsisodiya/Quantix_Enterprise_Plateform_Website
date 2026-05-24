"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  industry: "Retail" | "Restaurant";
  avatarColor: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Quantix transformed how we manage our 3 stores. Inventory sync alone saves us 4 hours a week. The analytics helped us cut slow-moving stock by 30% in two months.",
    author: "Sarah Mitchell",
    role: "Owner, Bella Boutique",
    industry: "Retail",
    avatarColor: "bg-purple-600",
    initials: "SM",
  },
  {
    quote: "Table management and the KDS integration made our kitchen 40% faster during dinner rush. Our servers love the split-bill feature. Best POS we have ever used, period.",
    author: "James Chen",
    role: "GM, The Harbor Kitchen",
    industry: "Restaurant",
    avatarColor: "bg-blue-600",
    initials: "JC",
  },
  {
    quote: "We expanded from 2 to 8 locations in a year. Quantix scaled with us effortlessly. The multi-location dashboard is a game-changer for our regional managers.",
    author: "Priya Sharma",
    role: "Founder, FreshMart Chain",
    industry: "Retail",
    avatarColor: "bg-emerald-600",
    initials: "PS",
  },
  {
    quote: "Online ordering integration boosted our off-peak revenue by 22%. Reporting is granular enough for finance and simple enough for our floor managers.",
    author: "Marcus Webb",
    role: "Director, Urban Eats Group",
    industry: "Restaurant",
    avatarColor: "bg-amber-600",
    initials: "MW",
  },
];

export const TestimonialsSection = () => (
  <section className="scroll-mt-20 bg-white py-24 border-b border-slate-100 overflow-hidden" id="testimonials">
    {/* Style block for continuous smooth scrolling marquee */}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes marqueeRight {
        0% { transform: translate3d(-50%, 0, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
      .animate-marquee-right-continuous {
        display: flex;
        width: max-content;
        animation: marqueeRight 30s linear infinite;
      }
      .animate-marquee-right-continuous:hover {
        animation-play-state: paused;
      }
    `}} />

    <div className="site-container">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 mb-4">
          TESTIMONIALS
        </div>
        <h2 className="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
          Businesses love Quantix
        </h2>
        <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
          Real results from real businesses across retail and restaurants. Hover to pause.
        </p>
      </div>
    </div>

    {/* Infinite Ticker Wrapper */}
    <div className="relative w-full overflow-hidden py-4">
      {/* Side gradient overlays for a premium fade edge */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Double array rendering to allow perfect seamless looping */}
      <div className="animate-marquee-right-continuous gap-6 px-3">
        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between select-none hover:scale-[1.01] hover:border-slate-200"
          >
            <div>
              {/* Stars & Industry */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400 stroke-none"
                    />
                  ))}
                </div>
                <span className="rounded-full bg-blue-50 border border-blue-100/60 px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase text-blue-600">
                  {t.industry}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
                "{t.quote}"
              </p>
            </div>

            {/* Author row */}
            <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs shrink-0",
                t.avatarColor
              )}>
                {t.initials}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-900 leading-none">
                  {t.author}
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5 font-semibold">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
