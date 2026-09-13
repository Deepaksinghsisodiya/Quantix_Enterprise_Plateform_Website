'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { IntegrationDto } from '../Types/IntegrationTypes';
import { INTEGRATION_DETAIL_SLUGS } from '../dummyData/integrationCatalog';

type IntegrationCardProps = {
  integration: IntegrationDto;
};

export default function IntegrationCard({ integration }: IntegrationCardProps) {
  const isDetailAvailable = INTEGRATION_DETAIL_SLUGS.has(integration.slug);
  const href = isDetailAvailable ? `/integrations/${integration.slug}` : (integration.websiteUrl || '/integrations');

  const bundleImage =
    integration.slug === 'stripe' ? '/images/ent_stripe_pos_bundle.png' :
    integration.category?.toLowerCase().includes('payment') ? '/images/ent_stripe_pos_bundle.png' :
    integration.category?.toLowerCase().includes('delivery') ? '/images/ent_delivery_dispatch_bundle.png' :
    integration.category?.toLowerCase().includes('erp') || integration.category?.toLowerCase().includes('accounting') ? '/images/ent_accounting_sync_bundle.png' :
    integration.category?.toLowerCase().includes('omnichannel') || integration.category?.toLowerCase().includes('commerce') ? '/images/ent_omnichannel_bundle.png' :
    '/images/ent_venues_pos.png';

  const glowColor =
    integration.slug === 'stripe' ? 'from-[#635BFF]/15 to-transparent' :
    integration.slug === 'doordash' ? 'from-[#FF3008]/15 to-transparent' :
    integration.slug === 'ubereats' || integration.slug === 'uber-eats' ? 'from-[#06C167]/15 to-transparent' :
    integration.slug === 'shopify' ? 'from-[#7AB55C]/15 to-transparent' :
    integration.slug === 'quickbooks' ? 'from-[#2CA01C]/15 to-transparent' :
    'from-primary/15 to-transparent';

  return (
    <Link
      href={href}
      className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Subtle Ambient Hover Glow */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10 space-y-3">
        {/* Top Row: Brand Logo + Category Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-xs group-hover:scale-108 transition-transform duration-300 p-1.5">
            {integration.logoUrl ? (
              <img src={integration.logoUrl} alt={`${integration.name} logo`} className="h-full w-full object-contain" />
            ) : (
              <span className="font-syne text-xs font-black text-primary">{integration.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {integration.isPopular && (
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles size={9} /> Popular
              </span>
            )}
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
              {integration.category}
            </span>
          </div>
        </div>

        {/* Free-Floating 3D Hardware / Workflow Mockup */}
        <div className="relative h-32 sm:h-36 w-full flex items-center justify-center my-0.5">
          <Image
            src={bundleImage}
            alt={integration.name}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-1"
          />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-syne font-black text-base text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {integration.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
            {integration.description}
          </p>
        </div>
      </div>

      {/* Card Bottom CTA Link */}
      <div className="relative z-10 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark dark:group-hover:text-primary-light">
        <span>{isDetailAvailable ? 'View Integration Details' : 'Learn More'}</span>
        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
