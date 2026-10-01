"use client";

import React, { Suspense } from "react";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import FeaturesWrapper from "@/features/Features/FeaturesWrapper";
import { IntegrationsTickerSection } from "@/components/organisms/IntegrationsTicker/IntegrationsTickerSection";
import { HowItWorksSection } from "@/features/HowItWorks";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { cn } from "@/lib/utils";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import SocialProofStatsWrapper from "@/features/SocialProof/components/SocialProofWrapper";
import { BusinessProblemSection } from "@/features/BusinessProblems";
import SupportSection from "@/components/organisms/SupportSection/SupportSection";

import TestimonialsSectionWrapper, { TestimonialsSectionSkeleton } from "@/features/Testimonials";
import { FAQWrapper, FAQSectionSkeleton } from "@/features/FAQ";
import HomeSolutionsSection from "@/features/Solutions/components/HomeSolutionsSection";

export default function HomePageClient() {
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

      {/* 1. Hero Section (White BG) */}
      <section id="home" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <HeroSection />
      </section>

      {/* 1.5 Live Social Proof & Platform Stats Counter */}
      <section className="-mt-3 sm:-mt-8 lg:-mt-10 relative z-20 site-container px-3 sm:px-6 mb-6 sm:mb-8">
        <SocialProofStatsWrapper />
      </section>


      {/* 1.8 Business Problems: Disconnected Systems (Blueprint Section 10) */}
      <section id="business-problems" className="scroll-mt-28">
        <BusinessProblemSection />
      </section>

      {/* 2. Core Features Suite Showcase (White BG + Bottom Border) */}
      <section id="features" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <FeaturesWrapper />
      </section>

      {/* 2.5 Live Solutions Showcase (API-driven + Skeleton) */}
      <HomeSolutionsSection />

      {/* 3. Workflow Step-by-Step (White BG + Bottom Border) */}
      <section id="how-it-works" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <HowItWorksSection />
      </section>

      {/* 4. Integrations Ecosystem Ticker (White BG + Bottom Border) */}
      <section id="integrations" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <IntegrationsTickerSection />
      </section>

      {/* 5. 24/7 Dedicated Enterprise Technical Support */}
      <SupportSection platformName="Quantix Enterprise" />

      {/* 7. Social Proof & Customer Reviews */}
      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSectionWrapper />
      </Suspense>

      {/* 8. Frequently Asked Questions */}
      <Suspense fallback={<FAQSectionSkeleton />}>
        <FAQWrapper />
      </Suspense>

      {/* 8. Final CTA: Run Every Location From One Platform (Blueprint Step 12) */}
      <section id="cta" className="scroll-mt-28">
        <CTABanner />
      </section>
    </>
  );
}
