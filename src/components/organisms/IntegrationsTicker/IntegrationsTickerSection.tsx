'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Integration = {
  id: string;
  name: string;
  category: string;
  logo: string;
};

// 6 Top Global Platforms (PNG Logos)
const integrations: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'PAYMENTS',
    logo: '/brands/integrations/stripe.png',
  },
  {
    id: 'authorize-net',
    name: 'Authorize.Net',
    category: 'PAYMENTS',
    logo: '/brands/integrations/authorize.png',
  },
  {
    id: 'square',
    name: 'Square',
    category: 'POS TERMINAL',
    logo: '/brands/integrations/square.png',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'PAYMENTS',
    logo: '/brands/integrations/paypal.png',
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    category: 'DELIVERY',
    logo: '/brands/integrations/doordash.png',
  },
  {
    id: 'uber-eats',
    name: 'Uber Eats',
    category: 'DELIVERY',
    logo: '/brands/integrations/ubereats.png',
  },
];

export const IntegrationsTickerSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicated list for seamless continuous infinite marquee loop
  const duplicatedList = [
    ...integrations,
    ...integrations,
    ...integrations,
    ...integrations,
    ...integrations,
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative select-none transition-colors">
      {/* Header Container */}
      <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
        {/* Top Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-3">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>INTEGRATION ECOSYSTEM</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Connect Quantix With Your <span className="text-primary dark:text-primary-light">Existing Tools</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          Automate orders, menu updates, payments, and settlements automatically across leading industry platforms.
        </p>
      </div>

      {/* Marquee Ticker Container with Hover Pause */}
      <div
        className="flex w-full overflow-hidden relative z-10 py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-56 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-56 bg-gradient-to-l from-slate-50/90 via-slate-50/70 to-transparent dark:from-slate-950 dark:via-slate-950/80 z-20 pointer-events-none" />

        {/* Continuous Marquee Track */}
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={isPaused ? { duration: 0 } : { duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex gap-4 sm:gap-6 shrink-0 items-center"
        >
          {duplicatedList.map((partner, idx) => (
            <Link
              key={idx}
              href={`/integrations/${partner.id}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="w-48 sm:w-56 h-24 sm:h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-4 shrink-0 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
              >
                {/* Logo Image Wrapper */}
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

                {/* Brand Name & Category Badge */}
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

export default IntegrationsTickerSection;
