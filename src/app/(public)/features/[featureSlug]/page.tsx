// src/app/(public)/features/[featureSlug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Clock,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Flame,
  Globe2,
  Layers,
  Layout,
  Lock,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  RefreshCw,
  Scale,
  Scan,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Terminal,
  Timer,
  Truck,
  Users,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FAQWrapper from "@/features/FAQ/FAQWrapper";
import { FAQAccordionItem } from "@/features/FAQ/components/FAQAccordionItem";
import CTABanner from "@/components/organisms/CTABanner";
import { useGetFeatureBySlugQuery } from "@/features/Features/Service/FeaturesService";
import { getFeatureIcon } from "@/features/Features/lib/getFeatureIcon";
import { FeatureDetailSkeleton } from "./FeatureDetailSkeleton";


type FeatureCard = {
  title: string;
  desc: string;
  icon: LucideIcon;
};



type FeatureVisual = {
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
};

type FeatureFaq = {
  question: string;
  answer: string;
};

interface FeatureData {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  benefits: string[];
  techSpec: string;
  relatedFeatures: { title: string; slug: string }[];
  visual?: FeatureVisual;
  workflowVisual?: FeatureVisual;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overviewTitle?: string;
  overviewDesc?: string;
  capabilities?: FeatureCard[];
  workflowTitle?: string;
  workflowDesc?: string;
  workflowItems?: FeatureCard[];
  useCaseTitle?: string;
  useCaseDesc?: string;
  useCases?: FeatureCard[];
  faqs?: FeatureFaq[];
}

const motionTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const SoftwareStageFrame: React.FC<{
  imageSrc: string;
  imageAlt: string;
  slug: string;
  topBadge?: string;
  bottomBadge?: string;
  priority?: boolean;
}> = ({ imageSrc, imageAlt, slug, topBadge, bottomBadge, priority = false }) => (
  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-linear-to-b from-slate-50/90 via-white to-slate-100/60 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
    {/* macOS Window Chrome Header */}
    <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 px-3.5 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/90" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-400/90" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/90" />
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-slate-600 dark:text-slate-400 max-w-35 min-[400px]:max-w-50 sm:max-w-xs truncate shadow-2xs">
        <Lock className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
        <span className="truncate">quantix.network/cloud-hq/{slug}</span>
      </div>

      <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="hidden min-[480px]:inline">Mesh Active</span>
      </div>
    </div>

    {/* Stage Image Viewport with Floating Transparent Hardware Cutout */}
    <div className="relative h-64 min-[420px]:h-72 sm:h-84 md:h-96 w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Ambient radial glow behind the transparent cutout hardware */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-4/5 w-4/5 rounded-full bg-linear-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl" />
      </div>

      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 94vw, 48vw"
        className="object-contain p-2 sm:p-5 drop-shadow-[0_18px_32px_rgba(0,0,0,0.16)] transition-transform duration-700 hover:scale-105"
      />

      {topBadge && (
        <div className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-100 max-w-[75%] sm:max-w-[85%] truncate">
          <Activity className="h-3 w-3 text-emerald-500 animate-pulse shrink-0" />
          <span className="truncate">{topBadge}</span>
        </div>
      )}

      {bottomBadge && (
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-100 max-w-[75%] sm:max-w-[85%] truncate">
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate">{bottomBadge}</span>
        </div>
      )}
    </div>
  </div>
);

const CapabilitiesBentoSection: React.FC<{
  title: string;
  description: string;
  items: FeatureCard[];
  eyebrow?: string;
}> = ({ title, description, items, eyebrow = "Enterprise Capabilities" }) => (
  <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-16">
    <div className="site-container">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Sparkles className="h-3 w-3 stroke-[2.4]" />
          {eyebrow}
        </span>
        <h2 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {(items || []).map((item, index) => {
          const Icon = item.icon;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...motionTransition, delay: index * 0.05 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:border-slate-800/90 dark:bg-slate-900/80 dark:shadow-none"
            >
              {/* Subtle top glow bar on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-linear-to-br from-primary/15 to-primary/5 text-primary shadow-xs transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <span className="font-mono text-xs font-black text-slate-300 transition-colors group-hover:text-primary/70 dark:text-slate-700">
                    {stepNum}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-black leading-snug text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Enterprise Module
                </span>
                <span className="text-[11px] font-bold text-slate-400 transition-colors group-hover:text-primary">
                  Ready &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const WorkflowPipelineSection: React.FC<{ feature: FeatureData; slug: string }> = ({ feature, slug }) => {
  if (!feature.workflowItems?.length) return null;

  const visual = feature.workflowVisual || feature.visual;

  return (
    <section className="border-b border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-950 sm:py-16">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-6 lg:col-span-6"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                <Database className="h-3 w-3 stroke-[2.4]" />
                Connected Workflow Pipeline
              </span>
              <h2 className="max-w-2xl font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                {feature.workflowTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {feature.workflowDesc}
              </p>
            </div>

            <div className="relative space-y-3 pl-2 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-linear-to-b before:from-primary/50 before:via-primary/20 before:to-transparent">
              {(feature.workflowItems || []).map((item, index) => {
                const Icon = item.icon;
                const stepNum = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={item.title}
                    className="relative flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
                  >
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-mono font-bold text-white shadow-sm">
                      {stepNum}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <h4 className="font-syne text-sm font-black text-slate-950 dark:text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...motionTransition, delay: 0.1 }}
            className="space-y-4 lg:col-span-6"
          >
            {visual ? (
              <SoftwareStageFrame
                imageSrc={visual.imageSrc}
                imageAlt={visual.imageAlt}
                slug={slug}
                topBadge={visual.topBadge}
                bottomBadge={visual.bottomBadge}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Technical specs</span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.techSpec}
                </p>
              </div>
            )}

            {/* Architecture Telemetry Pills */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sync Latency</div>
                <div className="mt-0.5 font-mono text-sm font-black text-slate-950 dark:text-white">&lt; 120ms</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Protocol</div>
                <div className="mt-0.5 font-mono text-sm font-black text-slate-950 dark:text-white">gRPC Mesh</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Availability</div>
                <div className="mt-0.5 font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">99.99%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const UseCasesSection: React.FC<{
  title: string;
  description: string;
  items: FeatureCard[];
}> = ({ title, description, items }) => (
  <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-16">
    <div className="site-container">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Layers className="h-3 w-3 stroke-[2.4]" />
          Industry Deployment
        </span>
        <h2 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {(items || []).map((item, index) => {
          const Icon = item.icon;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...motionTransition, delay: index * 0.05 }}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/80"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                    <Icon className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-600">
                    USE CASE {stepNum}
                  </span>
                </div>

                <h3 className="font-syne text-base font-black leading-snug text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Deployment</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function FeatureDetailPage() {
  const params = useParams();
  const featureSlug = (params?.featureSlug as string) || "cloud-pos";

  const { data: feature, isLoading, isError } = useGetFeatureBySlugQuery({
    slug: featureSlug,
    siteVariant: "Enterprise",
  });

  const [openFaqId, setOpenFaqId] = React.useState<string | null>(null);

  if (isLoading) {
    return <FeatureDetailSkeleton />;
  }

  if (isError || !feature) {
    return (
      <div className="site-container py-20 text-center space-y-4 max-w-lg mx-auto">
        <h2 className="font-syne text-2xl font-black text-slate-900 dark:text-white">Feature Not Found</h2>
        <p className="text-sm text-slate-500">The feature capability you are looking for is currently unavailable or has been relocated.</p>
        <Link
          href="/features"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-syne font-bold hover:brightness-105"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Explore All Features</span>
        </Link>
      </div>
    );
  }

  const heroVisual = {
    imageSrc: feature.imageUrl || feature.imageSrc || "/images/ent_global_pos_bundle.png",
    imageAlt: feature.imageAlt || feature.title,
    topBadge: feature.topBadge || "Enterprise Ready",
    bottomBadge: feature.bottomBadge || "Real-Time Mesh",
  };

  const workflowVisual = {
    imageSrc: feature.imageUrl || "/images/ent_supply_chain_bundle.png",
    imageAlt: feature.title,
    topBadge: "Operational Flow",
    bottomBadge: "HQ Sync",
  };

  const capabilities = (feature.keyCapabilities || []).map((c) => ({
    title: c.title,
    desc: c.desc,
    icon: getFeatureIcon(c.iconKey),
  }));

  const workflowItems = (feature.workflows || []).map((w, idx) => ({
    title: w.title,
    desc: w.desc,
    icon: getFeatureIcon(undefined),
  }));

  const faqs = (feature.faqs || []).map((f, idx) => ({
    id: f.id || `faq-${idx}`,
    question: f.question,
    answer: f.answer,
  }));

  const benefits = feature.bullets || [];

  const featureData: FeatureData = {
    slug: feature.slug,
    title: feature.title,
    tagline: feature.heroHeadline || feature.title,
    desc: feature.shortDescription || feature.fullDescription || '',
    benefits,
    techSpec: feature.fullDescription || '',
    relatedFeatures: [],
    visual: heroVisual,
    workflowVisual,
    overviewTitle: "Enterprise Architecture & Capabilities",
    overviewDesc: "Built directly into the core engine to safeguard high-throughput uptime and compliance.",
    capabilities,
    workflowTitle: "End-to-End Operational Lifecycle",
    workflowDesc: "How transactions, data streams, and hardware events reconcile in real time.",
    workflowItems,
    faqs,
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header pb-12 sm:pb-16 md:pb-20">
        <div className="site-container relative z-10">
          {/* Top Navigation Bar: Dynamic Breadcrumb on Left */}
          <div className="mb-6 flex items-center sm:mb-8">
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 stroke-[2.5]" />
              <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
              <ChevronRight className="h-3 w-3 stroke-[2.5]" />
              <span className="text-primary font-bold truncate max-w-45 sm:max-w-none">{feature.slug}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Headline, Specs, Benefits, CTAs */}
            <div className="space-y-5 lg:col-span-7 order-1 lg:order-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3 w-3" />
                  {feature.category || "ENTERPRISE CAPABILITY"}
                </span>

                {feature.statValue && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{feature.statValue}</span>
                    {feature.statLabel && <span className="opacity-70">({feature.statLabel})</span>}
                  </span>
                )}
              </div>

              <h1 className="font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.16]">
                {feature.heroHeadline || feature.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.heroSubheadline || feature.shortDescription || feature.fullDescription}
              </p>

              {/* Benefits Checklist */}
              {benefits.length > 0 && (
                <div className="space-y-2 pt-1">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <span className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary mt-0.5">
                        <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-3" />
                      </span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href={feature.ctaHref || "/contact/sales"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-syne font-bold hover:brightness-105 shadow-sm transition-all"
                >
                  <span>{feature.ctaText || "Request Enterprise Demo"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-syne font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <span>All Capabilities</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Software Stage Visual Frame */}
            <div className="lg:col-span-5 order-2 lg:order-2">
              <SoftwareStageFrame
                imageSrc={heroVisual.imageSrc}
                imageAlt={heroVisual.imageAlt}
                slug={feature.slug}
                topBadge={heroVisual.topBadge}
                bottomBadge={heroVisual.bottomBadge}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY CAPABILITIES BENTO SECTION */}
      {capabilities.length > 0 && (
        <CapabilitiesBentoSection
          title="Enterprise Architecture & Capabilities"
          description="Built directly into the core engine to safeguard high-throughput uptime and compliance."
          items={capabilities}
        />
      )}

      {/* 3. WORKFLOW PIPELINE SECTION */}
      {workflowItems.length > 0 && (
        <WorkflowPipelineSection
          feature={featureData}
          slug={feature.slug}
        />
      )}

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      {faqs.length > 0 && (
        <section
          className="py-12 lg:py-14 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden"
          id="faq"
        >
          <div className="site-container px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-[10px] font-black uppercase tracking-widest text-primary mb-2.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 stroke-[2.4] text-primary animate-pulse" />
                  <span>KNOWLEDGE BASE</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                  Technical FAQs
                </h2>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-lg mx-auto">
                  Have questions? We&apos;re here to help. Can&apos;t find what you&apos;re looking for?{" "}
                  <Link href="/contact" className="font-semibold text-primary hover:underline inline-flex items-center gap-0.5">
                    <span>Contact our team</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </Link>
                </p>
              </div>

              {/* 2-column FAQ grid — matches homepage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 items-start">
                {faqs.map((faq, i) => {
                  const faqId = faq.id || `faq-${i}`;
                  const isOpen = openFaqId === faqId;
                  return (
                    <FAQAccordionItem
                      key={faqId}
                      faq={faq}
                      isOpen={isOpen}
                      onToggle={() => setOpenFaqId(isOpen ? null : faqId)}
                    />
                  );
                })}
              </div>

              {/* Bottom Help Text */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Still have questions?{" "}
                  <Link
                    href="/contact"
                    className="font-syne font-bold text-primary hover:underline inline-flex items-center gap-1 ml-1"
                  >
                    <span>Speak with an Enterprise Specialist</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA BANNER */}
      <CTABanner />
    </div>
  );
}
