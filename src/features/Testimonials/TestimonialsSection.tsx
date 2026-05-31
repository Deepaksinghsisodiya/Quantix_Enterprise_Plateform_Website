// src/features/Testimonials/TestimonialsSection.tsx
'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { TestimonialDto } from "./Types/TestimonialsTypes";

export interface TestimonialsSectionProps {
  testimonials: TestimonialDto[];
  isLoading: boolean;
}

const DEFAULT_TESTIMONIALS: TestimonialDto[] = [
  {
    id: "t1",
    quote: "Quantix changed how we run our boutique. Offline sync is so smooth, we never worry about losing connection during weekend rushes.",
    author: "Amanda Sterling",
    role: "Founder, Bloom Retail",
    industry: "Retail",
    avatarColor: "bg-blue-600",
    initials: "AS"
  },
  {
    id: "t2",
    quote: "The restaurant layout mapper is a game-changer. Bill splits take seconds instead of minutes, increasing our seat turnover by 15%.",
    author: "Chef Giovanni",
    role: "Owner, Bella Italia Bistro",
    industry: "Restaurant",
    avatarColor: "bg-purple-600",
    initials: "CG"
  },
  {
    id: "t3",
    quote: "We scaled from 1 store to 5 in less than a year. The unified dashboard is exactly what we needed to monitor stock levels in real-time.",
    author: "Marcus Vance",
    role: "Operations Director, Urban Wear",
    industry: "Retail",
    avatarColor: "bg-emerald-600",
    initials: "MV"
  },
  {
    id: "t4",
    quote: "The interface is so clean. It takes less than 10 minutes to train new staff members on our checkout registers.",
    author: "Sarah Lindqvist",
    role: "General Manager, Espresso House",
    industry: "Restaurant",
    avatarColor: "bg-amber-600",
    initials: "SL"
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  isLoading,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  const getInitials = (name: string) => {
    if (!name) return "QT";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    const colors = ["bg-purple-600", "bg-blue-600", "bg-emerald-600", "bg-amber-600", "bg-pink-600", "bg-indigo-600"];
    return colors[index % colors.length];
  };

  const retailTestimonials = displayTestimonials.filter(t => t.industry === "Retail");
  const restaurantTestimonials = displayTestimonials.filter(t => t.industry === "Restaurant");

  // Helper to ensure enough items for continuous marquee scroll
  const repeatList = (list: TestimonialDto[]) => {
    if (list.length === 0) return [];
    let repeated = [...list];
    while (repeated.length < 10) {
      repeated = [...repeated, ...list];
    }
    return repeated;
  };

  const retailList = repeatList(retailTestimonials);
  const restaurantList = repeatList(restaurantTestimonials);

  return (
    <section className="scroll-mt-20 bg-gradient-to-b from-white via-slate-50/10 to-white py-24 border-b border-slate-100 overflow-hidden" id="testimonials">
      {/* Style block for continuous marquee */}
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

      {!mounted || isLoading ? (
        <div className="site-container max-w-5xl text-center py-8">
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1 max-w-md">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Infinite Ticker Wrapper */
        <div className="relative w-full overflow-hidden py-4 flex flex-col gap-6">
          {/* Side gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Retail */}
          {retailList.length > 0 && (
            <div className="overflow-hidden">
              <div className="animate-marquee-left-continuous gap-6 px-3">
                {retailList.map((t, i) => (
                  <div
                    key={`retail-${t.id}-${i}`}
                    className="w-[290px] sm:w-[380px] shrink-0 rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.04)] transition-all duration-300 flex flex-col justify-between select-none hover:scale-[1.01] hover:border-slate-200"
                  >
                    <div>
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

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0",
                        t.avatarColor || getAvatarColor(i)
                      )}>
                        {t.initials || getInitials(t.author)}
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
          )}

          {/* Row 2: Restaurant */}
          {restaurantList.length > 0 && (
            <div className="overflow-hidden">
              <div className="animate-marquee-right-continuous gap-6 px-3">
                {restaurantList.map((t, i) => (
                  <div
                    key={`restaurant-${t.id}-${i}`}
                    className="w-[290px] sm:w-[380px] shrink-0 rounded-3xl border border-slate-100/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.04)] transition-all duration-300 flex flex-col justify-between select-none hover:scale-[1.01] hover:border-slate-200"
                  >
                    <div>
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

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-auto">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm shrink-0",
                        t.avatarColor || getAvatarColor(i)
                      )}>
                        {t.initials || getInitials(t.author)}
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
          )}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
