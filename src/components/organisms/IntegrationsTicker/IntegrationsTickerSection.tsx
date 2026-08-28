'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Integration = {
  id: string;
  name: string;
  category: string;
  color: string;
  logo: string;
  href?: string;
};

const integrations: Integration[] = [
  { id: 'stripe', name: 'Stripe', category: 'PAYMENTS', color: '#635BFF', logo: '/brands/integrations/stripe.svg', href: '/integrations/stripe' },
  { id: 'authorize-net', name: 'Authorize.Net', category: 'PAYMENTS', color: '#1E3A5F', logo: '/brands/integrations/authorize.svg', href: '/integrations/authorize-net' },
  { id: 'square', name: 'Square', category: 'PAYMENTS', color: '#000000', logo: '/brands/integrations/square.svg', href: '/integrations/square' },
  { id: 'doordash', name: 'DoorDash', category: 'DELIVERY', color: '#FF3008', logo: '/brands/integrations/doordash.svg', href: '/integrations/doordash' },
  { id: 'ubereats', name: 'Uber Eats', category: 'DELIVERY', color: '#06C167', logo: '/brands/integrations/ubereats.svg', href: '/integrations/uber-eats' },
];

export const IntegrationsTickerSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedList = [...integrations, ...integrations, ...integrations, ...integrations, ...integrations];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors">
      <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-3">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>ENTERPRISE INTEGRATIONS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-semibold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Connect Quantix With Your <span className="text-primary dark:text-primary-light">Food & Retail Ecosystem</span>
        </h2>

        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          Automate kitchen order tickets, delivery dispatching, table payments, and daily settlements automatically.
        </p>
      </div>

      <div
        className="flex w-full overflow-hidden relative z-10 py-3"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsPaused(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsPaused(false);
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 md:w-40 lg:w-56 bg-linear-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 md:w-40 lg:w-56 bg-linear-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />

        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={isPaused ? { duration: 0 } : { duration: 65, ease: 'linear', repeat: Infinity }}
          className="flex gap-4 sm:gap-6 shrink-0 items-center"
        >
          {duplicatedList.map((partner, idx) => (
            <Link
              key={idx}
              href={partner.href || `/integrations/${partner.id}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-48 sm:w-56 h-24 sm:h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-4 shrink-0 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="h-10 sm:h-12 w-full flex items-center justify-center p-1">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={44}
                    className="max-h-full max-w-full object-contain filter dark:brightness-110 transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-syne font-bold text-slate-900 dark:text-white leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60">
                    {partner.category}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { integrations };
export type { Integration };
export default IntegrationsTickerSection;
