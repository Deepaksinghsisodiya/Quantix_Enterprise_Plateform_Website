"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FAQWrapper } from "@/features/FAQ";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import { ConnectIntegrationButton } from "@/components/atoms/ConnectIntegrationButton";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";
import { useGetIntegrationBySlugQuery } from "@/features/Integrations/Service/IntegrationsService";
import { IntegrationDetailSkeleton } from "@/features/Integrations/components/IntegrationDetailSkeleton";

type IntegrationStep = {
  step: string;
  title: string;
  desc: string;
};

type IntegrationFeature = {
  title: string;
  desc: string;
};

type IntegrationSpec = {
  label: string;
  value: string;
};

type IntegrationStat = {
  value: string;
  label: string;
  desc?: string;
};

export default function IntegrationDetailPage() {
  const params = useParams();
  const slugParam = (params?.slug as string) || (params?.integrationSlug as string) || "";
  const slug = slugParam.toLowerCase();

  const { data: apiResponse, isLoading, isError } = useGetIntegrationBySlugQuery(
    { slug, siteVariant: "Enterprise" },
    { skip: !slug }
  );

  const integration = useMemo(() => {
    const d = apiResponse;
    if (!d) return null;

    const parseJson = <T,>(val: unknown, fallback: T): T => {
      if (!val) return fallback;
      if (typeof val !== "string") return (val as T) || fallback;
      try {
        const parsed = JSON.parse(val);
        return parsed || fallback;
      } catch {
        return fallback;
      }
    };

    const features: IntegrationFeature[] = parseJson(d.featuresJson, []);
    const howItWorks: IntegrationStep[] = parseJson(d.setupStepsJson, []);
    const benefits: string[] = parseJson(d.benefitsJson, []);
    const faqs: FAQItem[] = parseJson(d.faqsJson, []);
    const specs: IntegrationSpec[] = parseJson(d.specsJson, []);
    const stats: IntegrationStat[] = parseJson(d.statsJson, []);

    return {
      id: d.slug || String(d.id),
      slug: d.slug,
      name: d.name,
      category: (d.categoryLabel || d.category || "CONNECTED").toUpperCase(),
      color: d.accent || "#FF4F00",
      tagline: d.tagline || d.description || "",
      description: d.description || "",
      logoUrl: d.logoUrl || "/brands/integrations/stripe.svg",
      imageUrl: d.imageUrl || "/images/ent_stripe_pos_bundle.png",
      websiteUrl: d.websiteUrl,
      syncSpeed: d.syncSpeed || "Real-Time Sync",
      syncSpeedIcon: d.syncSpeedIcon || "live",
      features,
      howItWorks,
      benefits,
      faqs,
      specs,
      stats,
    };
  }, [apiResponse]);

  if (isLoading) {
    return <IntegrationDetailSkeleton />;
  }

  if (isError || !integration) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF4F00] flex items-center justify-center mx-auto">
            <Layers size={24} />
          </div>
          <h2 className="font-syne text-xl font-bold text-slate-900">Integration Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested integration could not be located in our verified connector catalog.
          </p>
          <div className="pt-2">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Back to Integrations</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback metrics if stats are empty in API
  const displayMetrics = integration.stats.length > 0
    ? integration.stats
    : [
        { label: "Webhook SLA", value: "99.99%", desc: "Enterprise SLA" },
        { label: "Injection Speed", value: "< 200ms", desc: "Direct to Kitchen" },
        { label: "Accuracy Rate", value: "100%", desc: "Zero Ticket Errors" },
        { label: "Security", value: "256-bit", desc: "End-to-End Encrypted" },
      ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Hero Section (Aligned with globals.css .page-hero-header) */}
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
        {/* Soft Ambient Radial Warmth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb Navigation + Back Button */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-[#FF4F00] transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-400 shrink-0" />
              <Link href="/integrations" className="hover:text-[#FF4F00] transition-colors">Integrations</Link>
              <ChevronRight size={12} className="text-slate-400 shrink-0" />
              <span className="text-[#FF4F00] font-bold truncate max-w-42.5 sm:max-w-none">{integration.name}</span>
            </nav>

            <Link
              href="/integrations"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              <ArrowLeft size={13} className="text-slate-500" />
              <span>Back to Integrations</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-3.5 sm:space-y-4 lg:col-span-7">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#FF4F00] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
                <Sparkles size={12} className="text-[#FF4F00]" />
                <span>{integration.category} VERIFIED CONNECTOR</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-[1.2] sm:leading-[1.16] tracking-tight">
                Quantix + <span className="text-[#FF4F00]">{integration.name}</span>
              </h1>

              {/* Tagline */}
              {integration.tagline && (
                <p className="max-w-xl text-xs sm:text-sm md:text-base font-medium leading-relaxed text-slate-600">
                  {integration.tagline}
                </p>
              )}

              {/* Description */}
              {integration.description && (
                <p className="max-w-xl text-xs sm:text-sm font-normal leading-relaxed text-slate-500">
                  {integration.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-4 w-full sm:w-auto">
                <ConnectIntegrationButton
                  integrationName={integration.name}
                  integrationSlug={slug}
                  className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-5 sm:px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-95 text-center cursor-pointer group"
                />
                <RequestDemoButton
                  title={`Setup ${integration.name} Integration`}
                  buttonText="INTEGRATION_SETUP"
                  label="Request Setup Help"
                  className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 bg-white px-5 sm:px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 cursor-pointer text-center transition-all"
                />
              </div>

              {/* Trust Metrics / Stats Bar */}
              {displayMetrics.length > 0 && (
                <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl">
                  {displayMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-200/80 backdrop-blur-xs text-center shadow-2xs"
                    >
                      <div className="font-syne font-extrabold text-sm sm:text-base text-slate-950">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
                        {metric.label}
                      </div>
                      {metric.desc && (
                        <div className="text-[9px] text-slate-400 mt-0.5 hidden sm:block">
                          {metric.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3D Hardware Bundle with Verified Connector Badge */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-4/3 w-full max-w-md lg:max-w-lg mx-auto flex items-center justify-center p-2 group">
                <Image
                  src={integration.imageUrl}
                  alt={`${integration.name} 3D integration bundle`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-contain p-2 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Verified Connector Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 inline-flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-xl backdrop-blur-md">
                  <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-slate-50 flex items-center justify-center p-1 border border-slate-200/60 shrink-0">
                    <img
                      src={integration.logoUrl}
                      alt={`${integration.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="block font-syne text-[11px] sm:text-xs font-black text-slate-900 leading-tight">
                      {integration.name}
                    </span>
                    <span className="block text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#FF4F00]">
                      Verified Connector
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Grid (Standard .section-py from globals.css) */}
      {integration.features.length > 0 && (
        <section className="section-py bg-slate-50/50 border-b border-slate-200/80">
          <div className="site-container px-4 sm:px-6">
            <div className="text-center section-header-mb max-w-2xl mx-auto">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF4F00] block mb-2">CAPABILITIES</span>
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                What You Get With {integration.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
                Full enterprise feature breakdown of the Quantix + {integration.name} integration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
              {integration.features.map((feat, idx) => (
                <div
                  key={feat.title || idx}
                  className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-orange-500/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-[#FF4F00] group-hover:bg-[#FF4F00] group-hover:text-white transition-colors duration-200">
                      <Check className="h-3.5 w-3.5 stroke-3" />
                    </span>
                    <div>
                      <h3 className="font-syne font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#FF4F00] transition-colors duration-200">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Fast Onboarding Steps (2-Col Responsive Grid with .section-py) */}
      {integration.howItWorks.length > 0 && (
        <section className="section-py bg-white border-b border-slate-200/80">
          <div className="site-container max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center section-header-mb max-w-xl mx-auto">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF4F00] block mb-2">FAST ONBOARDING</span>
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                How to Connect {integration.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
                Get up and running in {integration.howItWorks.length} simple steps. Most locations go live in under 10 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
              {integration.howItWorks.map((step, idx) => (
                <div
                  key={step.step || idx}
                  className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all duration-300 shadow-2xs"
                >
                  <span
                    className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl font-syne font-black text-base sm:text-lg shadow-2xs"
                    style={{
                      backgroundColor: integration.color + "15",
                      color: integration.color,
                    }}
                  >
                    {step.step || `0${idx + 1}`}
                  </span>
                  <div>
                    <h3 className="font-syne font-extrabold text-sm sm:text-base text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Benefits Section (if benefits exist) */}
      {integration.benefits.length > 0 && (
        <section className="section-py bg-slate-50/40 border-b border-slate-200/80">
          <div className="site-container max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center section-header-mb max-w-xl mx-auto">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF4F00] block mb-2">KEY ADVANTAGES</span>
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Why Operators Choose Quantix + {integration.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {integration.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-3 w-3 stroke-3" />
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Customer Testimonials */}
      <TestimonialsWrapper />

      {/* 6. FAQ Section (Fetches Live API FAQs with fallback to integration FAQs) */}
      <FAQWrapper fallbackFaqs={integration.faqs.length > 0 ? integration.faqs : undefined} />

      {/* 7. Production CTA Banner */}
      <CTABanner />
    </div>
  );
}
