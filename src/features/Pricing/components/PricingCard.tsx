// src/features/Pricing/components/PricingCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Cookies from 'js-cookie';
import { cn } from '@/lib/utils';
import { PricingCardProps } from '../Types/PricingTypes';

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billing,
}) => {
  const displayName = plan?.displayName || plan?.planName || 'Plan';
  const isPopular = displayName.toLowerCase().includes('pro');

  const pricePerDay = Number(plan?.planPricePerDay ?? 0);
  const monthlyPrice = Math.round(pricePerDay * 30);
  const annualPrice = Math.round(pricePerDay * 365 * 0.84); // 16% annual discount
  const isAnnual = billing === 'annual' || billing === 'Annual';
  const displayPrice = isAnnual ? annualPrice : monthlyPrice;
  const priceSuffix = isAnnual ? '/year' : '/month';
  const effectivePerDay = isAnnual ? (annualPrice / 365).toFixed(1) : pricePerDay.toFixed(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('accessToken'));
  }, []);

  const planId = plan?.planId || '';
  const planCode = plan?.planCode || '';

  const adminPortalUrl = process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL || 'https://quantixadmin.foreteksolution.in/login';
  const ctaHref = isLoggedIn
    ? adminPortalUrl
    : `/sign-up?planId=${encodeURIComponent(planId)}&planCode=${encodeURIComponent(planCode)}&businessNature=Enterprise`;

  const ctaLabel = isLoggedIn ? `Subscribe ${displayName}` : `Get Started`;

  // Top 3 concise marketing bullets
  const bullets: string[] = React.useMemo(() => {
    let list: string[] = [];
    if (Array.isArray(plan?.marketingBullets)) {
      list = plan.marketingBullets.filter((b): b is string => typeof b === 'string' && b.trim().length > 0);
    } else if (typeof plan?.marketingBullets === 'string' && plan.marketingBullets.trim()) {
      list = plan.marketingBullets
        .split(/(?<=[.!?])\s+|\r?\n/)
        .map((b) => b.trim())
        .filter(Boolean);
    } else if (Array.isArray(plan?.features)) {
      list = plan.features
        .filter((f) => f?.isIncluded && f?.showOnWebsite && f?.featureName)
        .map((f) => f.featureName as string);
    }
    return list.slice(0, 3);
  }, [plan]);

  // Key highlights
  const locationsLimit = plan?.limits?.find((l) => l?.limitCode === 'MLO' || l?.limitCode === 'OUT' || l?.limitCode === 'BUS');
  const locationsCount = plan?.maxLocations ?? locationsLimit?.maxValue ?? locationsLimit?.value ?? (isPopular ? 10 : 1);

  const terminalsLimit = plan?.limits?.find((l) => l?.limitCode === 'MTM' || l?.limitCode === 'TRM');
  const terminalsCount = plan?.maxTerminals ?? terminalsLimit?.maxValue ?? terminalsLimit?.value ?? (isPopular ? 3 : 1);

  const productsLimit = plan?.limits?.find((l) => l?.limitCode === 'MPR');
  const productsCount = productsLimit?.maxValue;

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group',
        'hover:shadow-xl hover:-translate-y-0.5',
        isPopular
          ? 'bg-gradient-to-b from-[#FF4D00] via-[#F24400] to-[#D93800] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20 lg:scale-[1.02] z-10'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 text-slate-900 dark:text-white'
      )}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-950 shadow-sm whitespace-nowrap">
            <Sparkles className="h-2.5 w-2.5 fill-slate-950" />
            Most Popular
          </span>
        </div>
      )}

      <div>
        {/* Header: Plan Name and Day Rate */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3
            className={cn(
              'text-sm font-syne font-black uppercase tracking-wider',
              isPopular ? 'text-white' : 'text-slate-900 dark:text-white'
            )}
          >
            {displayName}
          </h3>
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide shrink-0',
              isPopular
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-orange-50 dark:bg-orange-950/50 text-[#FF4D00] border border-orange-200 dark:border-orange-900/60'
            )}
          >
            ⚡ ${effectivePerDay}/day
          </span>
        </div>

        {/* Big Clear Price */}
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              'text-3xl sm:text-4xl font-syne font-black tracking-tight',
              isPopular ? 'text-white' : 'text-slate-900 dark:text-white'
            )}
          >
            ${displayPrice.toLocaleString()}
          </span>
          <span
            className={cn(
              'text-xs font-bold',
              isPopular ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {priceSuffix}
          </span>
        </div>

        {/* Billing note & Commission */}
        <p
          className={cn(
            'text-[11px] font-medium mt-1 mb-3',
            isPopular ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          {isAnnual ? 'Billed annually (save 16%)' : 'Billed monthly'} • 0% Commission
        </p>

        {/* Short Description */}
        {plan?.description && (
          <p
            className={cn(
              'text-xs font-normal mb-3.5 line-clamp-2 leading-relaxed',
              isPopular ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'
            )}
          >
            {plan.description}
          </p>
        )}

        {/* Key Capacity Highlight */}
        <div
          className={cn(
            'rounded-xl p-2.5 mb-3.5 text-xs font-medium flex items-center justify-between gap-2',
            isPopular
              ? 'bg-white/10 text-white border border-white/15'
              : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800'
          )}
        >
          <div className="flex items-center gap-1.5">
            <Check size={14} className={cn('shrink-0 stroke-[2.5]', isPopular ? 'text-white' : 'text-emerald-500')} />
            <span>
              {locationsCount} Location{locationsCount > 1 ? 's' : ''} · {terminalsCount} Terminal{terminalsCount > 1 ? 's' : ''}
            </span>
          </div>
          {productsCount ? (
            <span className={isPopular ? 'text-white/80 text-[11px]' : 'text-slate-500 text-[11px]'}>
              {productsCount.toLocaleString()} SKUs
            </span>
          ) : null}
        </div>

        {/* Top 3 Selling Points */}
        {bullets.length > 0 && (
          <div className="space-y-2 mb-4 text-xs">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check
                  size={14}
                  className={cn('shrink-0 mt-0.5 stroke-[2.5]', isPopular ? 'text-white/90' : 'text-emerald-500')}
                />
                <span className={cn('leading-snug text-xs', isPopular ? 'text-white/95' : 'text-slate-600 dark:text-slate-300')}>
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        target={isLoggedIn ? '_blank' : undefined}
        rel={isLoggedIn ? 'noopener noreferrer' : undefined}
        className={cn(
          'w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] hover:shadow-md mt-2',
          isPopular
            ? 'bg-white text-[#FF4D00] hover:bg-orange-50 shadow-orange-950/20'
            : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
        )}
      >
        <span>{ctaLabel}</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
};

export default PricingCard;
