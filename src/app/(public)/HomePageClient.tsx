"use client";

import React, { Suspense, useEffect, useState } from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import NewsTickerMarquee from "@/components/organisms/NewsTickerMarquee/NewsTickerMarquee";
import MainProductsShowcaseSection from "@/components/organisms/MainProductsShowcaseSection/MainProductsShowcaseSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection/HowItWorksSection";
import Navbar from "@/components/organisms/Navbar/Navbar";

import { Footer } from "@/components/organisms/Footer/Footer";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import IntegrationsTickerSection from "@/components/organisms/IntegrationsTicker/IntegrationsTickerSection";
import MerchantTypeExplainerSection from "@/components/organisms/MerchantExplainer/MerchantTypeExplainerSection";

import dynamic from "next/dynamic";

// Dynamic loaded sections (below the fold) optimized for Next.js
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

      {/* 1. Hero Section */}
      <section id="home" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <HeroSection />
      </section>

      {/* 1.5 News Ticker Marquee */}
      <NewsTickerMarquee />

      {/* 2. How It Works */}
      <HowItWorksSection />

      {/* 3. Platform Modules */}
      <section id="products-showcase" className={cn("scroll-mt-28 bg-slate-50/70 dark:bg-slate-900/45 transition-colors duration-300")}>
        <MainProductsShowcaseSection />
      </section>

      {/* 4. Integrations Partner Logo Ticker (PFD Section 7) */}
      <section id="integrations-ticker" className={cn("bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <IntegrationsTickerSection />
      </section>


      {/* 5. Merchant Type Explainer: Cloud Enterprise vs Standalone (PFD Section 8) */}
      <section id="merchant-explainer" className={cn("bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <MerchantTypeExplainerSection />
      </section>

      {/* 6. Testimonials Carousel */}
      <section id="testimonials" className={cn("scroll-mt-28 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}> 
          <LazyTestimonialsSection />
        </Suspense>
      </section>

      {/* 7. FAQ Accordion */}
      <section id="faq" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}> 
          <LazyFAQWrapper />
        </Suspense>
      </section>



      {/* 8. Footer */}
      <section id="footer" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
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
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 rounded-full sm:rounded-2xl bg-white dark:bg-slate-800 text-primary border border-slate-200 dark:border-slate-700 p-2.5 sm:p-3.5 shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
