import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Cloud,
  Coffee,
  Flame,
  Globe,
  Layers,
  LineChart,
  Monitor,
  Package,
  QrCode,
  Scale,
  Scan,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Tv,
  Users,
  Utensils,
  Wine,
  Zap,
  Receipt,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { FAQWrapper } from "@/features/FAQ";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";

type IndustryPoint = {
  title: string;
  desc: string;
};

type IndustryWorkflow = {
  title: string;
  desc: string;
};

type IndustrySolution = {
  slug: string;
  eyebrow: string;
  name: string;
  title: string;
  description: string;
  points: IndustryPoint[];
  workflows: IndustryWorkflow[];
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  ctaLabel: string;
  icon: LucideIcon;
  faqs: FAQItem[];
};

const INDUSTRY_SLUG_ALIASES: Record<string, string> = {
  "qsr": "quick-service",
  "retail": "fashion-retail",
  "dining": "restaurants",
  "bakery": "cafes",
  "supermarket": "grocery",
};

const backendUrl = (process.env.BACKEND_API_URL || process.env.LIVE_BACKEND_API_URL || "http://localhost:5104").replace(/\/$/, "");

async function fetchSolutionFromApi(slug: string, siteVariant: string = "Enterprise") {
  try {
    const res = await fetch(`${backendUrl}/api/v1/solutions/detail/${encodeURIComponent(slug)}?siteVariant=${encodeURIComponent(siteVariant)}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const json = await res.json();
    return json?.success && json?.data ? json.data : null;
  } catch {
    return null;
  }
}

const ICON_RESOLVER: Record<string, LucideIcon> = {
  Utensils,
  ShoppingBag,
  Cloud,
  Tv,
  Clock,
  Sparkles,
  ChefHat,
  Scan,
  Scale,
  Layers,
  Boxes,
  Store,
  LineChart,
  Building2,
  ShieldCheck,
  Zap,
  Coffee,
  Flame,
  Truck,
  Wine,
  Server,
  Smartphone,
  Receipt,
  Tag,
  Monitor,
  Package,
  BarChart3,
  Globe,
  QrCode,
  Users,
};

function resolveIcon(iconKey?: string, fallback: LucideIcon = Store): LucideIcon {
  if (!iconKey) return fallback;
  return ICON_RESOLVER[iconKey] || fallback;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${backendUrl}/api/v1/solutions/public?siteVariant=Enterprise`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json?.success && Array.isArray(json?.data) ? json.data : [];
    return items
      .filter((item: any) => item.slug && item.isActive !== false)
      .map((item: any) => ({ industrySlug: item.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}): Promise<Metadata> {
  const { industrySlug } = await params;
  const canonicalSlug = INDUSTRY_SLUG_ALIASES[industrySlug] || industrySlug;

  const apiItem = await fetchSolutionFromApi(canonicalSlug, "Enterprise");
  if (apiItem && apiItem.isActive !== false) {
    return {
      title: `${apiItem.heroTitle || apiItem.title} | Quantix Enterprise`,
      description: apiItem.heroDescription || apiItem.description,
    };
  }

  return { title: "Solutions | Quantix Enterprise" };
}

export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}) {
  const { industrySlug } = await params;

  if (!industrySlug) {
    notFound();
  }

  const canonicalSlug = INDUSTRY_SLUG_ALIASES[industrySlug] || industrySlug;
  const apiItem = await fetchSolutionFromApi(canonicalSlug, "Enterprise");

  if (!apiItem || apiItem.isActive === false) {
    notFound();
  }

  const industry: IndustrySolution = {
    slug: apiItem.slug || canonicalSlug,
    eyebrow: apiItem.eyebrow || apiItem.categoryTitle || "ENTERPRISE SOLUTION",
    name: apiItem.title,
    title: apiItem.heroTitle || apiItem.title,
    description: apiItem.heroDescription || apiItem.description || "",
    points: Array.isArray(apiItem.points) ? apiItem.points : [],
    workflows: Array.isArray(apiItem.workflows) ? apiItem.workflows : [],
    imageSrc: apiItem.detailImageUrl || apiItem.imageUrl || "/images/nav_restaurant_bundle.png",
    imageAlt: apiItem.detailImageAlt || apiItem.imageAlt || apiItem.title,
    topBadge: apiItem.topBadge || "Quantix Solution",
    bottomBadge: apiItem.bottomBadge || "All-in-One POS",
    ctaLabel: apiItem.ctaLabel || "Start Free Trial",
    icon: resolveIcon(apiItem.iconKey, Store),
    faqs: Array.isArray(apiItem.faqs) ? apiItem.faqs : [],
  };

  const Icon = industry.icon;

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-55 sm:max-w-none">{industry.eyebrow || industry.name}</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light shadow-xs">
                <Icon size={14} className="stroke-[2.5]" />
                <span>{industry.eyebrow}</span>
              </div>

              <h1 className="font-syne text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {industry.title}
              </h1>

              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {industry.description}
              </p>

              {industry.points.length > 0 && (
                <div className="grid gap-2.5 pt-2">
                  {industry.points.map((point, idx) => (
                    <div key={point.title || idx} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                        <Check className="h-3.5 w-3.5 stroke-3" />
                      </span>
                      <span className="text-xs sm:text-sm">
                        <strong className="font-extrabold text-slate-950 dark:text-white">{point.title}: </strong>
                        <span className="font-medium text-slate-600 dark:text-slate-300">{point.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 pt-4 w-full sm:w-auto">
                <Link
                  href="/sign-up"
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95 text-center min-w-0 cursor-pointer"
                >
                  <span className="truncate">{industry.ctaLabel}</span>
                  <ArrowRight size={13} className="shrink-0" />
                </Link>
                <RequestDemoButton
                  title={`Request Demo for ${industry.name}`}
                  buttonText="SOLUTION_DETAIL_DEMO"
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-center min-w-0"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full flex items-center justify-center p-2">
                <Image
                  src={industry.imageSrc}
                  alt={industry.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-contain p-2 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                {industry.topBadge && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                    <Icon size={12} className="text-primary" />
                    <span>{industry.topBadge}</span>
                  </div>
                )}
                {industry.bottomBadge && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/95 px-3.5 py-2 text-[11px] font-bold text-slate-900 shadow-lg backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/95 dark:text-white">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{industry.bottomBadge}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Workflows Bento Grid Section */}
      {industry.workflows.length > 0 && (
        <section className="section-py bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="site-container px-4 sm:px-6">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">INDUSTRY WORKFLOWS</span>
              <h2 className="font-syne text-2xl font-black text-slate-900 dark:text-white sm:text-3xl leading-tight">
                Engineered For {industry.name}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Purpose-built capabilities engineered to streamline operations and scale multi-unit performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {industry.workflows.map((wf, idx) => (
                <div
                  key={wf.title || idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-primary shrink-0" />
                      <h3 className="font-syne font-bold text-slate-900 dark:text-white text-base line-clamp-1">{wf.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{wf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* 4. Customer Social Proof */}
      <TestimonialsWrapper />

      {/* 5. Sector FAQ Section */}
      {industry.faqs.length > 0 && (
        <FAQWrapper fallbackFaqs={industry.faqs} />
      )}

      {/* 6. Production CTA Banner */}
      <CTABanner />
    </>
  );
}
