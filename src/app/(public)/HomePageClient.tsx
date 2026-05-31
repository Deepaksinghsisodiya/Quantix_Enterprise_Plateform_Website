"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
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

// Lazy loaded sections (below the fold)
const LazyPricingWrapper = lazy(() => import("@/features/Pricing/PricingWrapper"));
const LazyTestimonialsSection = lazy(() => import("@/features/Testimonials/TestimonialsSectionWrapper"));
const LazyFAQWrapper = lazy(() => import("@/features/FAQ/FAQWrapper"));

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
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
    }
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
      {showTopBtn && (
        <button
          onClick={scrollToHome}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white shadow-lg hover:bg-primary/90 transition"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </PublicLayout>
  );
}
