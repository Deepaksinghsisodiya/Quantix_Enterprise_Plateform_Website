'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { IntegrationDto } from '../Types/IntegrationsType';
import { INTEGRATION_CARD_VISUALS, INTEGRATION_DETAIL_SLUGS } from '../dummyData/integrationCatalog';

type IntegrationCardProps = {
  integration: IntegrationDto;
};

export default function IntegrationCard({ integration }: IntegrationCardProps) {
  const visual = INTEGRATION_CARD_VISUALS[integration.category] ?? INTEGRATION_CARD_VISUALS.payments;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:shadow-none">
      {integration.isPopular && (
        <span className="absolute z-10 rounded-br-xl bg-primary px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md">
          Popular
        </span>
      )}

      <div className="relative h-24 overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 768px) 92vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
        <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/95 p-2 shadow-lg">
          {integration.logoUrl ? (
            <img src={integration.logoUrl} alt={`${integration.name} logo`} className="h-full w-full object-contain" />
          ) : (
            <span className="font-syne text-xl font-black text-primary">{integration.name.charAt(0)}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-syne text-base font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
          {integration.name}
        </h3>
        <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
          {integration.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800/60">
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {integration.category}
          </span>
          {INTEGRATION_DETAIL_SLUGS.has(integration.slug) ? (
            <Link href={`/integrations/${integration.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark">
              View details <ArrowRight size={13} />
            </Link>
          ) : (
            <a href={integration.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark">
              Configure <ArrowRight size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
