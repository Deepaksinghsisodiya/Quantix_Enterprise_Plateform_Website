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

// Split the testimonials by category to create a beautiful, thematic layout
const retailTestimonials = [testimonials[0], testimonials[2]];
const restaurantTestimonials = [testimonials[1], testimonials[3]];

export const TestimonialsSection = () => (
  <section className="scroll-mt-20 bg-gradient-to-b from-white via-slate-50/10 to-white py-24 border-b border-slate-100 overflow-hidden" id="testimonials">
    {/* Style block for continuous smooth scrolling marquee */}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes marqueeRight {
        0% { transform: translate3d(-50%, 0, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
      @keyframes marqueeLeft {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      .animate-marquee-right-continuous {
        display: flex;
        width: max-content;
        animation: marqueeRight 35s linear infinite;
      }
      .animate-marquee-left-continuous {
        display: flex;
        width: max-content;
        animation: marqueeLeft 35s linear infinite;
      }
      .animate-marquee-right-continuous:hover,
      .animate-marquee-left-continuous:hover {
        animation-play-state: paused;
      }
    `}} />

    <div className="site-container">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
          TESTIMONIALS
        </div>
        <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl uppercase leading-tight">
          Businesses love Quantix
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          Real results from real businesses across retail and restaurants. Hover to pause.
        </p>
      </div>
    </div>

    {/* Infinite Ticker Wrapper */}
    <div className="relative w-full overflow-hidden py-4 flex flex-col gap-6">
      {/* Side gradient overlays for a premium fade edge */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Retail Testimonials (Scrolling Left) */}
      <div className="overflow-hidden">
        <div className="animate-marquee-left-continuous gap-6 px-3">
          {[...retailTestimonials, ...retailTestimonials, ...retailTestimonials, ...retailTestimonials, ...retailTestimonials, ...retailTestimonials].map((t, i) => (
            <div
              key={`retail-${i}`}
              className="w-[290px] sm:w-[380px] shrink-0 rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.04)] transition-all duration-300 flex flex-col justify-between select-none hover:scale-[1.01] hover:border-slate-200"
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
                  <span className="rounded-md bg-blue-50 border border-blue-100/50 px-2 py-0.5 text-[8px] font-extrabold tracking-wider uppercase text-blue-600">
                    {t.industry}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
              </div>

              {/* Author row */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0",
                  t.avatarColor
                )}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-none">
                    {t.author}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Restaurant Testimonials (Scrolling Right) */}
      <div className="overflow-hidden">
        <div className="animate-marquee-right-continuous gap-6 px-3">
          {[...restaurantTestimonials, ...restaurantTestimonials, ...restaurantTestimonials, ...restaurantTestimonials, ...restaurantTestimonials, ...restaurantTestimonials].map((t, i) => (
            <div
              key={`restaurant-${i}`}
              className="w-[290px] sm:w-[380px] shrink-0 rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.04)] transition-all duration-300 flex flex-col justify-between select-none hover:scale-[1.01] hover:border-slate-200"
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
                  <span className="rounded-md bg-blue-50 border border-blue-100/50 px-2 py-0.5 text-[8px] font-extrabold tracking-wider uppercase text-blue-600">
                    {t.industry}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
              </div>

              {/* Author row */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0",
                  t.avatarColor
                )}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-none">
                    {t.author}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
