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
  const isPopular = plan.displayName.toLowerCase().includes('pro');
  const monthlyPrice = Math.round(plan.planPricePerDay * 30);
  const annualPrice = Math.round(plan.planPricePerDay * 365 * 0.84); // 16% discount
  const displayPrice = billing === 'annual' ? annualPrice : monthlyPrice;
  const priceSuffix = billing === 'monthly' ? '/month' : '/year';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('accessToken'));
  }, []);

  const ctaHref = isLoggedIn
    ? `/dashboard?planId=${plan.planId}&planCode=${plan.planCode}`
    : `/sign-up?planId=${plan.planId}&planCode=${plan.planCode}&businessNature=Enterprise`;

  const ctaLabel = isLoggedIn ? `Subscribe ${plan.displayName}` : `Get Started`;

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 group',
        'hover:shadow-lg hover:-translate-y-0.5',
        isPopular
          ? 'bg-gradient-to-b from-[#FF4D00] to-[#E03E00] text-white border-[#FF4D00] shadow-xl shadow-orange-500/20 lg:scale-[1.02] z-10'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs text-slate-900 dark:text-white'
      )}
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-slate-950 shadow-xs whitespace-nowrap">
            <Sparkles className="h-2.5 w-2.5 fill-slate-950" />
            Most Popular
          </span>
        </div>
      )}

      <div>
        {/* Plan Display Name */}
        <h3
          className={cn(
            'text-[11px] font-syne font-bold uppercase tracking-widest',
            isPopular ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
          )}
        >
          {plan.displayName}
        </h3>

        {/* Big Clear Price */}
        <div className="mt-3 mb-1 flex items-baseline gap-1">
          <span
            className={cn(
              'text-3xl sm:text-4xl font-syne font-black tracking-tight',
              isPopular ? 'text-white' : 'text-slate-900 dark:text-white'
            )}
          >
            ${displayPrice}
          </span>
          <span
            className={cn(
              'text-xs font-semibold',
              isPopular ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {priceSuffix}
          </span>
        </div>

        {/* Short Subtitle */}
        <p
          className={cn(
            'text-xs font-normal mb-6 leading-relaxed',
            isPopular ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
          )}
        >
          {plan.marketingBullets[0] || plan.planName}
        </p>

        {/* Features Checklist */}
        <div
          className={cn(
            'space-y-3 mb-8 pt-4 border-t',
            isPopular ? 'border-white/20' : 'border-slate-100 dark:border-slate-800'
          )}
        >
          {/* Key limits */}
          <div className="flex items-start gap-2.5 text-xs font-medium">
            <Check
              size={14}
              className={cn(
                'shrink-0 mt-0.5 stroke-[2.5]',
                isPopular ? 'text-white' : 'text-emerald-500'
              )}
            />
            <span className={isPopular ? 'text-white' : 'text-slate-800 dark:text-slate-200'}>
              Up to {plan.maxLocations} Locations included
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs font-medium">
            <Check
              size={14}
              className={cn(
                'shrink-0 mt-0.5 stroke-[2.5]',
                isPopular ? 'text-white' : 'text-emerald-500'
              )}
            />
            <span className={isPopular ? 'text-white' : 'text-slate-800 dark:text-slate-200'}>
              Up to {plan.maxTerminals} Terminal registers included
            </span>
          </div>

          {/* Remaining bullet points */}
          {plan.marketingBullets.slice(1).map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs">
              <Check
                size={14}
                className={cn(
                  'shrink-0 mt-0.5 stroke-[2.5]',
                  isPopular ? 'text-white/85' : 'text-emerald-500'
                )}
              />
              <span className={isPopular ? 'text-white/90 font-normal' : 'text-slate-600 dark:text-slate-400 font-normal'}>
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className={cn(
          'w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs',
          isPopular
            ? 'bg-white text-[#FF4D00] hover:bg-slate-50'
            : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
        )}
      >
        <span>{ctaLabel}</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default PricingCard;
