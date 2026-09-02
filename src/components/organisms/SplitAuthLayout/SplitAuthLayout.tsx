// src/components/organisms/SplitAuthLayout/SplitAuthLayout.tsx
'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { Zap, ShieldCheck } from 'lucide-react';

export interface SplitAuthLayoutProps {
  children: React.ReactNode;
  coverImage?: string;
  coverAlt?: string;
  coverHeadline?: string;
  coverSubtext?: string;
}

function SplitAuthBrandLogo() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const source = useMemo(() => {
    const s = searchParams?.get('source') || searchParams?.get('businessNature') || (mounted ? Cookies.get('authSource') : '') || '';
    return s.toLowerCase();
  }, [searchParams, mounted]);

  const returnUrl = useMemo(() => {
    return searchParams?.get('returnUrl') || (mounted ? Cookies.get('authReturnUrl') : '') || '';
  }, [searchParams, mounted]);

  const homeHref = useMemo(() => {
    if (returnUrl && returnUrl.startsWith('http')) {
      return returnUrl;
    }
    if (source.includes('rest')) {
      return process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
    }
    if (source.includes('retail')) {
      return process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
    }
    return '/';
  }, [returnUrl, source]);

  const brandSubtext = useMemo(() => {
    if (source.includes('rest')) return 'Restaurant POS';
    if (source.includes('retail')) return 'Retail POS';
    return 'Enterprise Cloud';
  }, [source]);

  const isExternalLink = homeHref.startsWith('http');

  return (
    <div className="relative z-10">
      {isExternalLink ? (
        <a href={homeHref} className="inline-flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white shadow-lg shadow-orange-600/40 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
          </div>
          <div>
            <span className="font-syne text-xl font-bold tracking-tight text-white block leading-tight">
              Quantix
            </span>
            <span className="text-[10px] text-[#FFA173] font-bold tracking-wider uppercase block">
              {brandSubtext}
            </span>
          </div>
        </a>
      ) : (
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white shadow-lg shadow-orange-600/40 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
          </div>
          <div>
            <span className="font-syne text-xl font-bold tracking-tight text-white block leading-tight">
              Quantix
            </span>
            <span className="text-[10px] text-[#FFA173] font-bold tracking-wider uppercase block">
              {brandSubtext}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

function SplitAuthLeftBanner({
  explicitImage,
  explicitAlt,
  explicitHeadline,
  explicitSubtext,
}: {
  explicitImage?: string;
  explicitAlt?: string;
  explicitHeadline?: string;
  explicitSubtext?: string;
}) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const source = useMemo(() => {
    const s = searchParams?.get('source') || searchParams?.get('businessNature') || (mounted ? Cookies.get('authSource') : '') || '';
    return s.toLowerCase();
  }, [searchParams, mounted]);

  const bannerConfig = useMemo(() => {
    if (explicitImage) {
      return {
        image: explicitImage,
        alt: explicitAlt || 'Quantix POS Platform',
        headline: explicitHeadline || 'Start your journey.',
        subtext: explicitSubtext || 'Deploy multi-unit franchises, master SKU catalogs, and real-time cloud POS data lakes.',
        edition: explicitAlt?.toUpperCase().includes('RESTAURANT')
          ? 'Restaurant POS Edition'
          : explicitAlt?.toUpperCase().includes('RETAIL')
          ? 'Retail POS Edition'
          : 'Enterprise Cloud Hub',
      };
    }

    if (source.includes('rest')) {
      return {
        image: '/images/quantix_auth_pos_terminal.jpg',
        alt: 'Quantix Restaurant Dining POS',
        headline: 'Next-gen Dining & Kitchen Operations.',
        subtext: 'Manage tables, kitchen displays (KDS), online aggregator feeds, and multi-station restaurant POS with real-time sync.',
        edition: 'Restaurant POS Edition',
      };
    }

    if (source.includes('retail')) {
      return {
        image: '/images/retail_fashion_boutique.jpg',
        alt: 'Quantix Retail Store POS',
        headline: 'Smart Retail & Multi-store POS.',
        subtext: 'Scale multi-outlet retail stores with lightning-fast barcode scanning, live inventory reconciliation, and customer checkout.',
        edition: 'Retail POS Edition',
      };
    }

    return {
      image: '/images/enterprise_auth_cover_hd.jpg',
      alt: 'Quantix Enterprise POS Hub',
      headline: 'Enterprise command at your fingertips.',
      subtext: 'Access global telemetry, multi-unit franchise controls, branch registers, and real-time ERP data pipelines from anywhere.',
      edition: 'Enterprise Cloud Hub',
    };
  }, [source, explicitImage, explicitAlt, explicitHeadline, explicitSubtext]);

  return (
    <div className="hidden lg:flex lg:w-[48%] xl:w-[48%] relative min-h-[620px] bg-slate-950 overflow-hidden flex-col justify-between p-8 xl:p-10 text-white select-none">
      <Image
        src={bannerConfig.image}
        alt={bannerConfig.alt}
        fill
        priority
        quality={95}
        className="object-cover object-center transition-all duration-700"
        sizes="(min-width: 1024px) 50vw, 0vw"
      />

      {/* Luxury dark & warm gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 pointer-events-none" />

      {/* Top Logo on Image */}
      <SplitAuthBrandLogo />

      {/* Bottom Headline & Story on Image */}
      <div className="relative z-10 mt-auto pt-12">
        <span className="inline-block px-3 py-1 rounded-lg text-[10.5px] font-bold tracking-wider uppercase bg-orange-500/25 text-[#FF9B66] border border-orange-500/40 mb-3 backdrop-blur-md shadow-xs">
          {bannerConfig.edition}
        </span>
        <h2 className="text-2xl xl:text-3xl font-syne font-bold text-white tracking-tight mb-2.5 leading-snug">
          {bannerConfig.headline}
        </h2>
        <div className="w-12 h-1 bg-[#FF4D00] rounded-full mb-3 shadow-md shadow-orange-500/50" />
        <p className="text-[13px] text-slate-200/90 font-normal leading-relaxed max-w-md mb-4">
          {bannerConfig.subtext}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
          <span>Live Cloud API • 99.99% Uptime SLA • SOC-2 Certified</span>
        </div>
      </div>
    </div>
  );
}

function SplitAuthMobileHeader() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const source = useMemo(() => {
    const s = searchParams?.get('source') || searchParams?.get('businessNature') || (mounted ? Cookies.get('authSource') : '') || '';
    return s.toLowerCase();
  }, [searchParams, mounted]);

  const returnUrl = useMemo(() => {
    return searchParams?.get('returnUrl') || (mounted ? Cookies.get('authReturnUrl') : '') || '';
  }, [searchParams, mounted]);

  const homeHref = useMemo(() => {
    if (returnUrl && returnUrl.startsWith('http')) {
      return returnUrl;
    }
    if (source.includes('rest')) {
      return process.env.NEXT_PUBLIC_RESTAURANT_URL || 'http://localhost:3002';
    }
    if (source.includes('retail')) {
      return process.env.NEXT_PUBLIC_RETAIL_URL || 'http://localhost:3001';
    }
    return '/';
  }, [returnUrl, source]);

  const brandSubtext = useMemo(() => {
    if (source.includes('rest')) return 'Restaurant POS';
    if (source.includes('retail')) return 'Retail POS';
    return 'Enterprise Cloud';
  }, [source]);

  const isExternalLink = homeHref.startsWith('http');

  return (
    <div className="mb-6 lg:hidden flex items-center justify-between pb-3.5 border-b border-slate-100">
      {isExternalLink ? (
        <a href={homeHref} className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF4D00] text-white shadow-xs">
            <Zap className="h-4.5 w-4.5 fill-white stroke-[2.5]" />
          </div>
          <span className="font-syne text-lg font-bold tracking-tight text-slate-900">
            Quantix <span className="text-[#FF4D00]">{brandSubtext}</span>
          </span>
        </a>
      ) : (
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF4D00] text-white shadow-xs">
            <Zap className="h-4.5 w-4.5 fill-white stroke-[2.5]" />
          </div>
          <span className="font-syne text-lg font-bold tracking-tight text-slate-900">
            Quantix <span className="text-[#FF4D00]">{brandSubtext}</span>
          </span>
        </Link>
      )}
      <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
        Live Cloud API
      </span>
    </div>
  );
}

export const SplitAuthLayout: React.FC<SplitAuthLayoutProps> = ({
  children,
  coverImage,
  coverAlt,
  coverHeadline,
  coverSubtext,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFC] dark:bg-slate-950 flex flex-col justify-center items-center py-6 sm:py-10 px-3 sm:px-6 lg:px-8 font-sans relative overflow-x-hidden">

      {/* Ambient background glows for high-end luxury feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 dark:bg-orange-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-200/40 dark:bg-slate-900/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Main Centered Card Container ── */}
      <div className="w-full max-w-none sm:max-w-xl lg:max-w-[1080px] xl:max-w-[1140px] mx-auto rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-300/40 dark:shadow-black/60 overflow-hidden relative z-10 flex flex-col lg:flex-row border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 my-auto">

        {/* ── LEFT SIDE: Showcase Image (DESKTOP ONLY lg+) ── */}
        <Suspense
          fallback={
            <div className="hidden lg:flex lg:w-[48%] relative min-h-[620px] bg-slate-950 flex-col justify-between p-8 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF4D00] text-white">
                <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
              </div>
            </div>
          }
        >
          <SplitAuthLeftBanner
            explicitImage={coverImage}
            explicitAlt={coverAlt}
            explicitHeadline={coverHeadline}
            explicitSubtext={coverSubtext}
          />
        </Suspense>

        {/* ── RIGHT SIDE: Form Area ── */}
        <div className="w-full lg:w-[52%] xl:w-[52%] bg-white dark:bg-slate-900 px-5 py-7 sm:px-10 sm:py-10 lg:p-10 xl:p-12 flex flex-col justify-center text-slate-900 dark:text-white">

          {/* Mobile Top Brand Header */}
          <Suspense fallback={null}>
            <SplitAuthMobileHeader />
          </Suspense>

          <div className="w-full max-w-[460px] mx-auto">{children}</div>
        </div>
      </div>

      {/* Footer fine-print */}
      <div className="mt-5 sm:mt-6 text-center text-slate-400 dark:text-slate-500 text-xs font-normal">
        © {new Date().getFullYear()} Quantix Inc. All rights reserved. •{' '}
        <Link href="/privacy" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline underline-offset-2">
          Privacy Policy
        </Link>{' '}
        &{' '}
        <Link href="/terms" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline underline-offset-2">
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default SplitAuthLayout;
