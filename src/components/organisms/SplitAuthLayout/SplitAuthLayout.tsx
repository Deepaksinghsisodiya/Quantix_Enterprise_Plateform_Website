// src/components/organisms/SplitAuthLayout/SplitAuthLayout.tsx
'use client';

import React, { useMemo } from 'react';
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

export const SplitAuthLayout: React.FC<SplitAuthLayoutProps> = ({
  children,
  coverImage = '/images/quantix_auth_pos_terminal.jpg',
  coverAlt = 'Quantix Cloud POS',
  coverHeadline = 'Start your journey',
  coverSubtext = 'Deploy multi-unit franchises, master SKU catalogs, and real-time cloud POS data lakes across your entire retail and restaurant network.',
}) => {
  const searchParams = useSearchParams();

  const source = useMemo(() => {
    const s = searchParams?.get('source') || searchParams?.get('businessNature') || Cookies.get('authSource') || '';
    return s.toLowerCase();
  }, [searchParams]);

  const returnUrl = useMemo(() => {
    return searchParams?.get('returnUrl') || Cookies.get('authReturnUrl') || '';
  }, [searchParams]);

  // Determine dynamic return link to keep user on Restaurant / Retail when clicking the logo
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

  // Dynamic brand subtitle based on platform source
  const brandSubtext = useMemo(() => {
    if (source.includes('rest')) return 'Restaurant POS';
    if (source.includes('retail')) return 'Retail POS';
    return 'Enterprise Cloud';
  }, [source]);

  const isExternalLink = homeHref.startsWith('http');

  return (
    <div className="min-h-screen w-full bg-white lg:bg-[#F3F4F6] flex flex-col justify-between lg:justify-center p-0 lg:p-6 xl:p-8 font-sans">

      {/* ── Main Container (Full-screen on Mobile, Centered Card Window on Desktop) ── */}
      <div className="w-full max-w-none lg:max-w-5xl mx-auto lg:rounded-3xl lg:shadow-xl lg:shadow-slate-300/40 overflow-hidden relative z-10 flex flex-col lg:flex-row lg:border lg:border-slate-200/80 bg-white flex-1 lg:flex-initial">

        {/* ── LEFT SIDE: Full-bleed Showcase Image (DESKTOP ONLY lg+) ── */}
        <div className="hidden lg:flex lg:w-[46%] xl:w-[45%] relative min-h-[580px] bg-slate-950 overflow-hidden flex-col justify-between p-7 sm:p-8 text-white select-none">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="(min-width: 1024px) 45vw, 0vw"
          />

          {/* Luxury dark & warm gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />

          {/* Top Logo on Image */}
          <div className="relative z-10">
            {isExternalLink ? (
              <a href={homeHref} className="inline-flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white shadow-md shadow-orange-600/40 group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-syne text-lg font-bold tracking-tight text-white block leading-tight">
                    Quantix
                  </span>
                  <span className="text-[9.5px] text-[#FF7332] font-bold tracking-wider uppercase block">
                    {brandSubtext}
                  </span>
                </div>
              </a>
            ) : (
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF4D00] via-[#FF621F] to-[#E03E00] text-white shadow-md shadow-orange-600/40 group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-syne text-lg font-bold tracking-tight text-white block leading-tight">
                    Quantix
                  </span>
                  <span className="text-[9.5px] text-[#FF7332] font-bold tracking-wider uppercase block">
                    {brandSubtext}
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* Bottom Headline & Story on Image */}
          <div className="relative z-10 mt-auto pt-10">
            <h2 className="text-2xl font-syne font-bold text-white tracking-tight mb-2 leading-tight">
              {coverHeadline}
            </h2>
            <div className="w-10 h-1 bg-[#FF4D00] rounded-full mb-2.5 shadow-md" />
            <p className="text-xs text-slate-200 font-normal leading-relaxed max-w-sm mb-3">
              {coverSubtext}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Live Cloud API • 99.99% Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: Native Mobile Page / Desktop Form Area ── */}
        <div className="w-full lg:w-[54%] xl:w-[55%] bg-white px-4 py-6 sm:px-8 sm:py-8 lg:p-8 xl:p-9 flex flex-col justify-center text-slate-900 flex-1">

          {/* Mobile Top Brand Header */}
          <div className="mb-5 lg:hidden flex items-center justify-between pb-3 border-b border-slate-100">
            {isExternalLink ? (
              <a href={homeHref} className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF4D00] text-white shadow-xs">
                  <Zap className="h-4 w-4 fill-white stroke-[2.5]" />
                </div>
                <span className="font-syne text-lg font-bold tracking-tight text-slate-900">
                  Quantix <span className="text-[#FF4D00]">{brandSubtext}</span>
                </span>
              </a>
            ) : (
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF4D00] text-white shadow-xs">
                  <Zap className="h-4 w-4 fill-white stroke-[2.5]" />
                </div>
                <span className="font-syne text-lg font-bold tracking-tight text-slate-900">
                  Quantix <span className="text-[#FF4D00]">{brandSubtext}</span>
                </span>
              </Link>
            )}
            <span className="text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              Live Cloud API
            </span>
          </div>

          <div className="w-full max-w-[450px] mx-auto">{children}</div>
        </div>
      </div>

      {/* Footer fine-print */}
      <div className="py-4 lg:py-0 lg:mt-5 text-center text-slate-500 text-xs font-normal">
        © {new Date().getFullYear()} Quantix Inc. All rights reserved. •{' '}
        <Link href="/privacy" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
          Privacy Policy
        </Link>{' '}
        &{' '}
        <Link href="/terms" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default SplitAuthLayout;
