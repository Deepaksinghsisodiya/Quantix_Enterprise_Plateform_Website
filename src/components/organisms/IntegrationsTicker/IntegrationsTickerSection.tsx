'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CreditCard,
  ChefHat,
  Zap,
  Activity,
  type LucideIcon,
} from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  category: string;
  color: string;
  logo: string;
  href?: string;
};

const integrations: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'PAYMENTS',
    color: '#635BFF',
    logo: '/brands/integrations/stripe.svg',
    href: '/integrations/stripe',
  },
  {
    id: 'authorize-net',
    name: 'Authorize.Net',
    category: 'PAYMENTS',
    color: '#1E3A5F',
    logo: '/brands/integrations/authorize.svg',
    href: '/integrations/authorize-net',
  },
  {
    id: 'square',
    name: 'Square',
    category: 'PAYMENTS',
    color: '#000000',
    logo: '/brands/integrations/square.svg',
    href: '/integrations/square',
  },
  {
    id: 'doordash',
    name: 'DoorDash',
    category: 'DELIVERY',
    color: '#FF3008',
    logo: '/brands/integrations/doordash.svg',
    href: '/integrations/doordash',
  },
  {
    id: 'ubereats',
    name: 'Uber Eats',
    category: 'DELIVERY',
    color: '#06C167',
    logo: '/brands/integrations/ubereats.svg',
    href: '/integrations/uber-eats',
  },
];

export const IntegrationsTickerSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [autoIndex, setAutoIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-cycle through partners when not hovered to keep the matrix alive
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % integrations.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentHighlightedId = activeId || integrations[autoIndex]?.id;
  const activePartner = integrations.find((i) => i.id === currentHighlightedId);

  const paymentsList = integrations.filter((i) => i.category === 'PAYMENTS');
  const deliveryList = integrations.filter((i) => i.category === 'DELIVERY');

  return (
    <section className="py-12 lg:py-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative select-none transition-colors">
      {/* Reactive Ambient Glow that tracks current highlighted partner color */}
      <motion.div
        animate={{
          background: activePartner
            ? `radial-gradient(circle at 50% 50%, ${activePartner.color}15, transparent 65%)`
            : 'radial-gradient(circle at 50% 50%, #FF4F0010, transparent 65%)',
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] blur-3xl pointer-events-none -z-10"
      />

      {/* Section Header (Original Content Intact) */}
      <div className="site-container mb-10 sm:mb-14 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF4F00] mb-3 shadow-2xs"
        >
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.4] text-[#FF4F00] animate-pulse" />
          <span>ENTERPRISE INTEGRATIONS</span>
        </motion.div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-syne font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto [text-wrap:balance]">
          Connect Quantix With Your{' '}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] via-[#FF6B2B] to-amber-500 block sm:inline">
            Food & Retail Ecosystem
          </span>
        </h2>

        <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal max-w-xl mx-auto leading-relaxed">
          Automate kitchen order tickets, delivery dispatching, table payments, and daily settlements automatically.
        </p>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP VIEW (>= lg): Authentic Curved Laser Architecture    */}
      {/* ============================================================ */}
      <div
        className="site-container relative z-10 hidden lg:block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveId(null);
        }}
      >
        <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 backdrop-blur-2xl p-6 xl:p-9 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            {/* ----------------------------------------- */}
            {/* LEFT SPOKE: Payments Cluster (3 Nodes)    */}
            {/* ----------------------------------------- */}
            <div className="w-[280px] xl:w-[310px] flex flex-col gap-4 shrink-0 z-20">
              <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/10 text-[#FF4F00]">
                    <CreditCard className="h-3.5 w-3.5 stroke-[2.2]" />
                  </span>
                  <span className="font-syne text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Payment Gateways
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {paymentsList.length} NODES
                </span>
              </div>

              {paymentsList.map((partner) => {
                const isSelected = currentHighlightedId === partner.id;
                return (
                  <Link
                    key={partner.id}
                    href={partner.href || `/integrations/${partner.id}`}
                    onMouseEnter={() => setActiveId(partner.id)}
                    className={`group relative flex items-center justify-between p-3.5 xl:p-4 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'border-orange-500 bg-white dark:bg-slate-900 shadow-xl shadow-orange-500/15 -translate-x-1.5'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    {/* Animated Light Sweep on Active */}
                    {isSelected && (
                      <motion.div
                        layoutId="activePaymentSweep"
                        className="pointer-events-none absolute inset-0 rounded-2xl border border-orange-500/60 bg-gradient-to-r from-orange-500/10 to-transparent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-24 flex items-center justify-start bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1.5 border border-slate-100 dark:border-slate-800/80">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={85}
                          height={26}
                          className="max-h-full max-w-full object-contain filter dark:brightness-110 transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-syne text-xs font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors leading-tight">
                          {partner.name}
                        </h4>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {partner.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FF4F00] shadow-[0_0_10px_#FF4F00] scale-125'
                            : 'bg-emerald-500/70'
                        }`}
                      />
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2] text-slate-400 group-hover:text-[#FF4F00] group-hover:translate-x-0.5 transition-all" />
                    </div>

                    {/* Laser Connector Anchor Node */}
                    <div
                      className={`absolute right-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#FF4F00] bg-[#FF4F00] shadow-[0_0_10px_#FF4F00] scale-125'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ----------------------------------------- */}
            {/* LEFT SVG CONDUITS: Curved Laser Beams     */}
            {/* ----------------------------------------- */}
            <div className="w-[100px] xl:w-[130px] h-[340px] relative pointer-events-none">
              <svg
                viewBox="0 0 100 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <filter id="laser-glow-left" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Path 0: Stripe (Top) */}
                {(() => {
                  const isSel = currentHighlightedId === 'stripe';
                  return (
                    <g>
                      <path
                        d="M 0 52 C 50 52, 50 145, 100 145"
                        stroke={isSel ? '#FF4F00' : 'currentColor'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                        strokeDasharray={isSel ? undefined : '4 4'}
                        className={`transition-colors duration-300 ${
                          isSel ? 'text-[#FF4F00]' : 'text-slate-200 dark:text-slate-800'
                        }`}
                        filter={isSel ? 'url(#laser-glow-left)' : undefined}
                      />
                      <circle r={isSel ? 4 : 2.5} fill={isSel ? '#FF4F00' : '#FF6B2B'} opacity={isSel ? 1 : 0.6}>
                        <animateMotion
                          path="M 0 52 C 50 52, 50 145, 100 145"
                          dur={isSel ? '1.2s' : '2.8s'}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })()}

                {/* Path 1: Authorize.Net (Center) */}
                {(() => {
                  const isSel = currentHighlightedId === 'authorize-net';
                  return (
                    <g>
                      <path
                        d="M 0 170 C 50 170, 50 170, 100 170"
                        stroke={isSel ? '#FF4F00' : 'currentColor'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                        strokeDasharray={isSel ? undefined : '4 4'}
                        className={`transition-colors duration-300 ${
                          isSel ? 'text-[#FF4F00]' : 'text-slate-200 dark:text-slate-800'
                        }`}
                        filter={isSel ? 'url(#laser-glow-left)' : undefined}
                      />
                      <circle r={isSel ? 4 : 2.5} fill={isSel ? '#FF4F00' : '#FF6B2B'} opacity={isSel ? 1 : 0.6}>
                        <animateMotion
                          path="M 0 170 C 50 170, 50 170, 100 170"
                          dur={isSel ? '1.2s' : '2.8s'}
                          repeatCount="indefinite"
                          begin="0.4s"
                        />
                      </circle>
                    </g>
                  );
                })()}

                {/* Path 2: Square (Bottom) */}
                {(() => {
                  const isSel = currentHighlightedId === 'square';
                  return (
                    <g>
                      <path
                        d="M 0 288 C 50 288, 50 195, 100 195"
                        stroke={isSel ? '#FF4F00' : 'currentColor'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                        strokeDasharray={isSel ? undefined : '4 4'}
                        className={`transition-colors duration-300 ${
                          isSel ? 'text-[#FF4F00]' : 'text-slate-200 dark:text-slate-800'
                        }`}
                        filter={isSel ? 'url(#laser-glow-left)' : undefined}
                      />
                      <circle r={isSel ? 4 : 2.5} fill={isSel ? '#FF4F00' : '#FF6B2B'} opacity={isSel ? 1 : 0.6}>
                        <animateMotion
                          path="M 0 288 C 50 288, 50 195, 100 195"
                          dur={isSel ? '1.2s' : '2.8s'}
                          repeatCount="indefinite"
                          begin="0.8s"
                        />
                      </circle>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* ----------------------------------------- */}
            {/* CENTER HUB: Quantix Reactor Core Engine   */}
            {/* ----------------------------------------- */}
            <div className="w-[300px] xl:w-[340px] flex flex-col items-center justify-center text-center p-6 xl:p-8 rounded-3xl border-2 border-orange-500/40 bg-white/95 dark:bg-slate-950/95 shadow-2xl relative overflow-hidden shrink-0 min-h-[410px] z-20">
              {/* Dynamic Center Radial Backlight Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.6, 0.35],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0"
                style={{
                  background: activePartner
                    ? `radial-gradient(circle at 50% 50%, ${activePartner.color}40, transparent 75%)`
                    : 'radial-gradient(circle at 50% 50%, #FF4F0030, transparent 75%)',
                }}
              />

              {/* Glowing Concentric Rings & Radar */}
              <div className="relative mb-5 flex items-center justify-center">
                {/* Outer Rotating Orbit Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-32 w-32 rounded-full border border-dashed border-orange-500/30"
                />

                {/* Radar Pings */}
                <div className="absolute h-28 w-28 rounded-full border border-orange-500/20 dark:border-orange-500/30 animate-ping opacity-35" />
                <div className="absolute h-22 w-22 rounded-full border border-orange-500/30 dark:border-orange-500/40 animate-pulse" />
                
                {/* Core Icon Box */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4F00] via-[#FF6B2B] to-amber-500 text-white shadow-xl shadow-orange-500/45"
                >
                  <Cpu className="h-8 w-8 stroke-[2.2]" />
                </motion.div>
              </div>

              {/* Hub Title & Live Telemetry Readout */}
              <div className="relative z-10 space-y-2 max-w-[250px]">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-0.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACTIVE HUB CORE</span>
                </div>

                <h3 className="font-syne text-base xl:text-lg font-black text-slate-950 dark:text-white leading-tight">
                  Quantix Cloud Matrix
                </h3>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePartner ? activePartner.id : 'idle'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs font-medium min-h-[38px] flex items-center justify-center"
                  >
                    {activePartner ? (
                      <span className="text-[#FF4F00] font-bold inline-flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 stroke-[2.5] animate-bounce" />
                        Active Bridge: {activePartner.name}
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">
                        Hover any partner node to inspect live data bridge
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Connected Nodes Indicator Pill */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#FF4F00]">05</span>
                <span>Certified Connectors Online</span>
              </div>
            </div>

            {/* ----------------------------------------- */}
            {/* RIGHT SVG CONDUITS: Curved Laser Beams    */}
            {/* ----------------------------------------- */}
            <div className="w-[100px] xl:w-[130px] h-[340px] relative pointer-events-none">
              <svg
                viewBox="0 0 100 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <filter id="laser-glow-right" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Path 0: DoorDash (Top Right) */}
                {(() => {
                  const isSel = currentHighlightedId === 'doordash';
                  return (
                    <g>
                      <path
                        d="M 0 150 C 50 150, 50 105, 100 105"
                        stroke={isSel ? '#FF4F00' : 'currentColor'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                        strokeDasharray={isSel ? undefined : '4 4'}
                        className={`transition-colors duration-300 ${
                          isSel ? 'text-[#FF4F00]' : 'text-slate-200 dark:text-slate-800'
                        }`}
                        filter={isSel ? 'url(#laser-glow-right)' : undefined}
                      />
                      <circle r={isSel ? 4 : 2.5} fill={isSel ? '#FF4F00' : '#FF6B2B'} opacity={isSel ? 1 : 0.6}>
                        <animateMotion
                          path="M 0 150 C 50 150, 50 105, 100 105"
                          dur={isSel ? '1.2s' : '2.8s'}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  );
                })()}

                {/* Path 1: Uber Eats (Bottom Right) */}
                {(() => {
                  const isSel = currentHighlightedId === 'ubereats';
                  return (
                    <g>
                      <path
                        d="M 0 190 C 50 190, 50 235, 100 235"
                        stroke={isSel ? '#FF4F00' : 'currentColor'}
                        strokeWidth={isSel ? 2.5 : 1.5}
                        strokeDasharray={isSel ? undefined : '4 4'}
                        className={`transition-colors duration-300 ${
                          isSel ? 'text-[#FF4F00]' : 'text-slate-200 dark:text-slate-800'
                        }`}
                        filter={isSel ? 'url(#laser-glow-right)' : undefined}
                      />
                      <circle r={isSel ? 4 : 2.5} fill={isSel ? '#FF4F00' : '#FF6B2B'} opacity={isSel ? 1 : 0.6}>
                        <animateMotion
                          path="M 0 190 C 50 190, 50 235, 100 235"
                          dur={isSel ? '1.2s' : '2.8s'}
                          repeatCount="indefinite"
                          begin="0.6s"
                        />
                      </circle>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* ----------------------------------------- */}
            {/* RIGHT SPOKE: Delivery Cluster (2 Nodes)   */}
            {/* ----------------------------------------- */}
            <div className="w-[280px] xl:w-[310px] flex flex-col gap-6 shrink-0 my-auto z-20">
              <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/10 text-[#FF4F00]">
                    <ChefHat className="h-3.5 w-3.5 stroke-[2.2]" />
                  </span>
                  <span className="font-syne text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Delivery Dispatch
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  {deliveryList.length} NODES
                </span>
              </div>

              {deliveryList.map((partner) => {
                const isSelected = currentHighlightedId === partner.id;
                return (
                  <Link
                    key={partner.id}
                    href={partner.href || `/integrations/${partner.id}`}
                    onMouseEnter={() => setActiveId(partner.id)}
                    className={`group relative flex items-center justify-between p-3.5 xl:p-4 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'border-orange-500 bg-white dark:bg-slate-900 shadow-xl shadow-orange-500/15 translate-x-1.5'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    {/* Laser Connector Anchor Node */}
                    <div
                      className={`absolute left-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#FF4F00] bg-[#FF4F00] shadow-[0_0_10px_#FF4F00] scale-125'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    />

                    {/* Animated Light Sweep on Active */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeDeliverySweep"
                        className="pointer-events-none absolute inset-0 rounded-2xl border border-orange-500/60 bg-gradient-to-l from-orange-500/10 to-transparent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-24 flex items-center justify-start bg-slate-50 dark:bg-slate-800/50 rounded-lg p-1.5 border border-slate-100 dark:border-slate-800/80">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={85}
                          height={26}
                          className="max-h-full max-w-full object-contain filter dark:brightness-110 transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-syne text-xs font-bold text-slate-950 dark:text-white group-hover:text-[#FF4F00] transition-colors leading-tight">
                          {partner.name}
                        </h4>
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {partner.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FF4F00] shadow-[0_0_10px_#FF4F00] scale-125'
                            : 'bg-emerald-500/70'
                        }`}
                      />
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2] text-slate-400 group-hover:text-[#FF4F00] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE & TABLET VIEW (< lg): 3-Stage Animated Pipeline       */}
      {/* ============================================================ */}
      <div className="site-container relative z-10 lg:hidden space-y-4">
        {/* Stage 1: Payments Ingestion */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <CreditCard className="h-3.5 w-3.5 text-[#FF4F00]" />
              <span className="font-syne text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Payment Gateways
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">STAGE 1</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {paymentsList.map((partner) => (
              <Link
                key={partner.id}
                href={partner.href || `/integrations/${partner.id}`}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xs hover:border-orange-500 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-16 shrink-0 flex items-center justify-start bg-slate-50 dark:bg-slate-800/40 rounded-md p-1">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={65}
                      height={22}
                      className="max-h-full max-w-full object-contain filter dark:brightness-110"
                      unoptimized
                    />
                  </div>
                  <span className="font-syne text-xs font-bold text-slate-950 dark:text-white truncate">
                    {partner.name}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF4F00] shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Animated Downward Data Pulse */}
        <div className="flex items-center justify-center py-0.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="h-2 w-0.5 bg-orange-500/40" />
            <span className="h-3 w-1 rounded-full bg-[#FF4F00] shadow-[0_0_6px_#FF4F00]" />
            <span className="h-2 w-0.5 bg-orange-500/40" />
          </motion.div>
        </div>

        {/* Stage 2: Central Operating Hub */}
        <div className="p-4 rounded-2xl border-2 border-orange-500/40 bg-gradient-to-r from-orange-500/[0.04] via-white to-orange-500/[0.04] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-lg relative overflow-hidden flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/30">
              <Cpu className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[9.5px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACTIVE HUB CORE</span>
              </div>
              <h3 className="font-syne text-sm font-black text-slate-950 dark:text-white leading-tight">
                Quantix Cloud Matrix
              </h3>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="font-mono text-[10px] font-bold text-[#FF4F00] bg-orange-500/10 border border-orange-500/25 px-2.5 py-1 rounded-full block">
              05 Connectors
            </span>
          </div>
        </div>

        {/* Animated Downward Data Pulse */}
        <div className="flex items-center justify-center py-0.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="h-2 w-0.5 bg-orange-500/40" />
            <span className="h-3 w-1 rounded-full bg-[#FF4F00] shadow-[0_0_6px_#FF4F00]" />
            <span className="h-2 w-0.5 bg-orange-500/40" />
          </motion.div>
        </div>

        {/* Stage 3: Delivery Dispatch */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <ChefHat className="h-3.5 w-3.5 text-[#FF4F00]" />
              <span className="font-syne text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Delivery Dispatch
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">STAGE 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {deliveryList.map((partner) => (
              <Link
                key={partner.id}
                href={partner.href || `/integrations/${partner.id}`}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xs hover:border-orange-500 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-16 shrink-0 flex items-center justify-start bg-slate-50 dark:bg-slate-800/40 rounded-md p-1">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={65}
                      height={22}
                      className="max-h-full max-w-full object-contain filter dark:brightness-110"
                      unoptimized
                    />
                  </div>
                  <span className="font-syne text-xs font-bold text-slate-950 dark:text-white truncate">
                    {partner.name}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#FF4F00] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { integrations };
export type { Integration };
export default IntegrationsTickerSection;
