"use client";

import React, { Suspense, useEffect, useState } from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { PlatformDemoSection } from "@/components/organisms/PlatformDemoSection/PlatformDemoSection";
import { HowItWorksSection } from "@/components/organisms/HowItWorksSection/HowItWorksSection";
import DemoWrapper from "@/features/Demo/DemoWrapper";
import IndustriesSectionWrapper from "@/features/Industries/IndustriesSectionWrapper";
import TestimonialBannerWrapper from "@/features/Testimonials/TestimonialBannerWrapper";
import FeaturesWrapper from "@/features/Features/FeaturesWrapper";
import { CTABanner } from "@/components/organisms/CTABanner/CTABanner";
import { Footer } from "@/components/organisms/Footer/Footer";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import dynamic from "next/dynamic";

// Dynamic loaded sections (below the fold) optimized for Next.js
const LazyPricingWrapper = dynamic(() => import("@/features/Pricing/PricingWrapper"), { ssr: false });
const LazyTestimonialsSection = dynamic(() => import("@/features/Testimonials/TestimonialsSectionWrapper"), { ssr: false });
const LazyFAQWrapper = dynamic(() => import("@/features/FAQ/FAQWrapper"), { ssr: false });

export default function HomePageClient() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHome = () => {
    const start = window.scrollY;
    const startTime = performance.now();
    const duration = 1200; // 1.2 seconds for slow-motion effect

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const scroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <PublicLayout>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Quantix",
            operatingSystem: "Web",
            applicationCategory: "BusinessApplication",
            description: "All‑in‑One POS platform for retail and restaurant businesses.",
            url: process.env.NEXT_PUBLIC_APP_URL,
            image: "/og-image.png",
          }),
        }}
      />

      <Navbar />

      <section id="home" className={cn("scroll-mt-20 bg-gray-900", "min-h-screen")}>
        <HeroSection />
      </section>

      <section id="features" className={cn("scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <PlatformDemoSection />
      </section>

      <section id="platform" className={cn("scroll-mt-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300")}>
        <FeaturesWrapper />
      </section>

      <section id="how-it-works" className={cn("scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <HowItWorksSection />
      </section>

      <section id="resources" className={cn("scroll-mt-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300")}>
        <DemoWrapper />
      </section>

      <section id="services" className={cn("scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <IndustriesSectionWrapper />
      </section>

      <section className={cn("scroll-mt-20 bg-gray-900")}>
        <TestimonialBannerWrapper />
      </section>

      {/* Lazy loaded sections */}
      <section id="pricing" className={cn("scroll-mt-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}> 
          <LazyPricingWrapper />
        </Suspense>
      </section>

      <section id="testimonials" className={cn("scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}> 
          <LazyTestimonialsSection />
        </Suspense>
      </section>

      <section id="faq" className={cn("scroll-mt-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}> 
          <LazyFAQWrapper />
        </Suspense>
      </section>
      <section className={cn("scroll-mt-20 bg-slate-900")}>
        <CTABanner />
      </section>

      <section id="footer" className={cn("scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <Footer />
      </section>

      {/* Back to top button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            key="back-to-top"
            onClick={scrollToHome}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 rounded-2xl bg-blue-600 hover:bg-blue-500 p-4 text-white shadow-2xl shadow-blue-500/20 flex items-center justify-center cursor-pointer transition-all border border-blue-500/30"
            aria-label="Back to top"
          >
            <ArrowUp size={18} className="stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
