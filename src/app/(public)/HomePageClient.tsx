"use client";

import React, { Suspense } from "react";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import FeaturesSection from "@/features/Features/FeaturesSection";
import { IntegrationsTickerSection } from "@/components/organisms/IntegrationsTicker/IntegrationsTickerSection";
import HowItWorksSection from "@/components/organisms/HowItWorksSection/HowItWorksSection";
import { ATMLoader } from "@/components/atoms/ATMLoader";
import { cn } from "@/lib/utils";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import SocialProofStatsWrapper from "@/features/SocialProof/components/SocialProofWrapper";
import { BusinessProblemSection } from "@/features/BusinessProblems";
import SupportSection from "@/components/organisms/SupportSection/SupportSection";

import dynamic from "next/dynamic";
import { DEFAULT_ENTERPRISE_FAQS } from "@/features/FAQ/Constants/FAQConstants";

const LazyTestimonialsSection = dynamic(() => import("@/features/Testimonials"), { ssr: false });
const LazyFAQWrapper = dynamic(() => import("@/features/FAQ/components/FAQWrapper"), { ssr: false });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: DEFAULT_ENTERPRISE_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* 1. Hero Section (White BG) */}
      <section id="home" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <HeroSection />
      </section>

      {/* 1.5 Live Social Proof & Platform Stats Counter */}
      <section className="mt-4 sm:-mt-10 relative z-20 site-container px-3 sm:px-6 mb-8 sm:mb-12">
        <SocialProofStatsWrapper />
      </section>

      {/* 1.8 Business Problems: Disconnected Systems (Blueprint Section 10) */}
      <section id="business-problems" className="scroll-mt-28">
        <BusinessProblemSection />
      </section>

      {/* 2. Core Features Suite Showcase (White BG + Bottom Border) */}
      <section id="features" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <FeaturesSection />
      </section>

      {/* 3. Workflow Step-by-Step (Soft Slate 50 BG + Bottom Border) */}
      <section id="how-it-works" className={cn("scroll-mt-28 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <HowItWorksSection />
      </section>

      {/* 4. Integrations Ecosystem Ticker (White BG + Bottom Border) */}
      <section id="integrations" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <IntegrationsTickerSection />
      </section>

      {/* 5. 24/7 Dedicated Enterprise Technical Support */}
      <section id="support" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <SupportSection platformName="Quantix Enterprise" />
      </section>

      {/* 7. Social Proof & Customer Reviews (Soft Slate 50 BG + Bottom Border) */}
      <section id="testimonials" className={cn("scroll-mt-28 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300")}>
        <Suspense fallback={<div className="py-20 flex justify-center items-center"><ATMLoader variant="spinner" size="lg" /></div>}>
          <LazyTestimonialsSection />
        </Suspense>
      </section>

      {/* 8. Frequently Asked Questions (White BG) */}
      <section id="faq" className={cn("scroll-mt-28 bg-white dark:bg-slate-950 transition-colors duration-300")}>
        <Suspense fallback={<div className="py-20 flex justify-center items-center"><ATMLoader variant="spinner" size="lg" /></div>}>
          <LazyFAQWrapper />
        </Suspense>
      </section>

      {/* 8. Final CTA: Run Every Location From One Platform (Blueprint Step 12) */}
      <section id="cta" className="scroll-mt-28">
        <CTABanner />
      </section>
    </>
  );
}
