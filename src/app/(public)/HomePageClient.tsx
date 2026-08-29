"use client";

import React, { Suspense, useEffect, useState } from "react";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import MainProductsShowcaseSection from "@/components/organisms/MainProductsShowcaseSection/MainProductsShowcaseSection";
import { MerchantTypeExplainerSection } from "@/components/organisms/MerchantExplainer/MerchantTypeExplainerSection";
import { IntegrationsTickerSection } from "@/components/organisms/IntegrationsTicker/IntegrationsTickerSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection/HowItWorksSection";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import SupportSection from "@/components/organisms/SupportSection/SupportSection";

import dynamic from "next/dynamic";

const LazyTestimonialsSection = dynamic(() => import("@/features/Testimonials/components/TestimonialsWrapper"), { ssr: false });
const LazyFAQWrapper = dynamic(() => import("@/features/FAQ/components/FAQWrapper"), { ssr: false });

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
    const duration = 1200;

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Quantix Enterprise POS",
            operatingSystem: "Web",
            applicationCategory: "BusinessApplication",
            description: "Enterprise-grade POS and Cloud management platform for large multi-store chains and complex operations.",
            url: process.env.NEXT_PUBLIC_APP_URL,
            image: "/og-image.png",
          }),
        }}
      />

      {/* 1. Hero Section */}
      <section id="home" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <HeroSection />
      </section>

      {/* 2. Core Product Suite Showcase */}
      <section id="products-showcase" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <MainProductsShowcaseSection />
      </section>

      {/* 4. Solutions by Enterprise Scale Type */}
      <MerchantTypeExplainerSection />

      {/* 5. Workflow Step-by-Step */}
      <HowItWorksSection />

      {/* 6. Integrations Ecosystem Ticker */}
      <IntegrationsTickerSection />

      {/* 6.5 24/7 Platform Technical Support */}
      <section id="support" className={cn("scroll-mt-28 transition-colors duration-300")}>
        <SupportSection platformName="Quantix Enterprise" />
      </section>

      {/* 7. Social Proof & Customer Reviews */}
      <section id="testimonials" className={cn("scroll-mt-28 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}>
          <LazyTestimonialsSection />
        </Suspense>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section id="faq" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <Suspense fallback={<ATMLoader fullScreen variant="spinner" size="lg" />}>
          <LazyFAQWrapper />
        </Suspense>
      </section>


      {/* Scroll-To-Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToHome}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
