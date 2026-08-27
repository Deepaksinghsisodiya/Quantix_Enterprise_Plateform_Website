"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, Play } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface SlideData {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    subtitle: "RETAIL POS",
    title: "SMARTER RETAIL OPERATIONS START HERE",
    description: "Sync your store inventory, track staff performance, and delight retail customers across multiple branches.",
    backgroundImage: "/images/hero/hero_enterprise_inventory.jpg",
    primaryCtaText: "Start Free Trial",
    secondaryCtaText: "Explore Features",
  },
  {
    id: 2,
    subtitle: "RESTAURANT POS",
    title: "THE ALL-IN-ONE POS FOR RESTAURANTS",
    description: "Manage tables, order dispatch, and kitchen flows in real time — all from one single unified device.",
    backgroundImage: "/images/hero/hero_enterprise_hq.jpg",
    primaryCtaText: "Start Free Trial",
    secondaryCtaText: "Watch Demo",
  },
  {
    id: 3,
    subtitle: "CLOUD POS",
    title: "RUN YOUR BUSINESS FROM THE CLOUD",
    description: "Access real-time sales data, inventory levels, and analytics from anywhere in the world on any device.",
    backgroundImage: "/images/hero/hero_enterprise_analytics.jpg",
    primaryCtaText: "Start Free Trial",
    secondaryCtaText: "View Plans",
  },
  {
    id: 4,
    subtitle: "LOCAL BILLING POS",
    title: "OFFLINE-FIRST LOCAL BILLING TERMINAL",
    description: "Keep selling even when the internet goes down. Seamless local billing with automatic cloud sync when reconnected.",
    backgroundImage: "/images/hero/hero_enterprise_omnichannel.jpg",
    primaryCtaText: "Start Free Trial",
    secondaryCtaText: "Explore Offline",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 font-sans">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-primary w-8 rounded-full",
          bulletClass: "swiper-pagination-bullet bg-slate-500 w-2 h-2 opacity-100 rounded-full inline-block mx-1.5 transition-all duration-300 cursor-pointer hover:bg-slate-300",
        }}
        loop={true}
        className="w-full h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background image & gradient overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-slate-950" />

            {/* Content Wrapper */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl text-center flex flex-col items-center">
                {/* Badge/Subtitle */}
                <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                    {slide.subtitle}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="mb-6 text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight uppercase text-white leading-[1.05]">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="mb-10 max-w-xl text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                  {slide.description}
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-slate-100 transition-all duration-200 cursor-pointer shadow-lg hover:scale-102"
                  >
                    {slide.primaryCtaText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-primary-light transition-all duration-200 cursor-pointer shadow-lg hover:scale-102"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    {slide.secondaryCtaText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
