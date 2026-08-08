'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, ShieldCheck, Cpu, Code2 } from 'lucide-react';

interface ProductRowProps {
  tagline: string;
  title: string;
  description: string;
  points: { title: string; desc: string }[];
  imageSrc: string;
  imageAlt: string;
  topBadge?: string;
  bottomBadge?: string;
  demoHref?: string;
  ctaText?: string;
  imagePosition?: 'left' | 'right';
}

const ProductRow: React.FC<ProductRowProps> = ({
  tagline,
  title,
  description,
  points,
  imageSrc,
  imageAlt,
  topBadge,
  bottomBadge,
  demoHref = '/contact/demo',
  ctaText = 'REQUEST A DEMO',
  imagePosition = 'right',
}) => {
  const isRight = imagePosition === 'right';

  return (
    <div className="py-12 md:py-20 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 space-y-6 ${!isRight ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-primary dark:text-primary-light mb-2 block">
              {tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-syne tracking-tight leading-tight">
              {title}
            </h2>
          </div>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Checklist Points */}
          <div className="space-y-3.5 pt-2">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light mt-0.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="text-sm leading-snug">
                  <strong className="font-extrabold text-slate-900 dark:text-white mr-1.5">{pt.title}:</strong>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{pt.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href={demoHref}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-primary text-primary dark:text-primary-light hover:bg-primary hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xs hover:shadow-md group/btn"
            >
              {ctaText}
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white group-hover/btn:bg-white group-hover/btn:text-primary transition-colors">
                <ArrowRight className="h-3 w-3 stroke-[3]" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Ultra-Wide 3D Image Card */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 ${!isRight ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-primary/10 via-slate-50 to-primary-dark/10 dark:from-slate-900 dark:via-slate-900 dark:to-primary-dark/20 p-0 shadow-2xl shadow-slate-200/60 dark:shadow-none hover:shadow-3xl transition-all duration-500 group/imgCard flex items-center justify-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-90 group-hover/imgCard:opacity-100 transition-opacity pointer-events-none z-0" />

            {/* 3D Image Graphic */}
            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover w-full h-full group-hover/imgCard:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Top Badge */}
            {topBadge && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-md">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-100">
                  {topBadge}
                </span>
              </div>
            )}

            {/* Floating Bottom Badge */}
            {bottomBadge && (
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-black text-xs">
                  ✓
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  {bottomBadge}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const MainProductsShowcaseSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Ultra-Wide Container */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block">
            OUR 4 MAIN POS PRODUCT LINES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-syne tracking-tight">
            Built for Restaurants, Retail, Enterprise & Custom Scale
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            Explore our specialized product solutions designed to transform checkout speed, kitchen routing, chain management, and custom integrations.
          </p>
        </div>

        {/* 4 Main Products Rows */}
        <div className="space-y-4">
          
          {/* Product 1: Restaurant POS */}
          <ProductRow
            tagline="MAIN PRODUCT 1 • DINING, CAFES & KITCHENS"
            title="Restaurant POS & Kitchen System"
            description="Runs in a browser or native register with real-time kitchen ticket routing, interactive table layouts, tableside tablets, and instant modifier management."
            points={[
              { title: 'Kitchen KDS routing', desc: 'Fire grill tickets to kitchen displays and beverage tickets to bar terminals.' },
              { title: 'Visual floor mapping', desc: 'Drag-and-drop table layouts, live table status alerts, and split bill controls.' },
              { title: 'Tableside & QR ordering', desc: 'Handheld server tablets and contactless QR code ordering at the table.' },
            ]}
            imageSrc="/images/kitchen_display_3d.png"
            imageAlt="Restaurant POS and Kitchen Display System"
            topBadge="⚡ Real-Time Kitchen Ticket Routing"
            bottomBadge="Order Dispatch Speed < 1.2s"
            imagePosition="right"
            demoHref="/features/table-management"
            ctaText="EXPLORE RESTAURANT POS"
          />

          {/* Product 2: Retail POS */}
          <ProductRow
            tagline="MAIN PRODUCT 2 • COUNTERS, STORES & SUPERMARKETS"
            title="Retail POS & Inventory Register"
            description="A complete counter billing station built for retail shops, boutiques, and supermarkets. Offline-first architecture guarantees your registers never close."
            points={[
              { title: 'Touch-first barcode checkout', desc: 'Instant barcode scanning, photo grids, and fast item category lookups.' },
              { title: 'Granular cashier controls', desc: 'Line & bill discounts, voids, return tracking, and manager PIN overrides.' },
              { title: 'Hardware flexibility', desc: 'Connect receipt printers, barcode scanners, cash drawers, and PDQ card terminals.' },
            ]}
            imageSrc="/images/pos_counter_3d.png"
            imageAlt="Retail Store Counter POS Station"
            topBadge="🛡️ 100% Offline Standalone Till"
            bottomBadge="Thermal Printer & Scanner Ready"
            imagePosition="left"
            demoHref="/features/offline-registers"
            ctaText="EXPLORE RETAIL POS"
          />

          {/* Product 3: Enterprise POS */}
          <ProductRow
            tagline="MAIN PRODUCT 3 • MULTI-STORE FRANCHISE CHAINS"
            title="Enterprise POS Cloud Platform"
            description="Centralized cloud control dashboard built for multi-location chain franchises, multi-tenant databases, centralized menu rollouts, and warehouse stock transfers."
            points={[
              { title: 'Multi-tenant isolation', desc: 'Bank-grade encrypted tenant partition for branch stores and franchises.' },
              { title: 'Global menu push', desc: 'Push price updates, menus, and promotions to 100+ stores simultaneously.' },
              { title: 'Consolidated telemetry', desc: 'Real-time corporate profit margins, store branch sales, and inventory audits.' },
            ]}
            imageSrc="/images/enterprise_hub_3d.png"
            imageAlt="Enterprise Multi-Store Cloud Hub"
            topBadge="🏢 Multi-Tenant Enterprise Cloud"
            bottomBadge="100+ Franchise Stores Connected"
            imagePosition="right"
            demoHref="/enterprise-vs-standalone"
            ctaText="EXPLORE ENTERPRISE POS"
          />

          {/* Product 4: Custom POS */}
          <ProductRow
            tagline="MAIN PRODUCT 4 • TAILORED SOFTWARE & API BRIDGES"
            title="Custom POS Solutions & Integrations"
            description="Tailored software architecture, custom ERP/API gateways, proprietary hardware driver bridges, white-label branding, and dedicated corporate SLA lines."
            points={[
              { title: 'Custom API & webhooks', desc: 'Bi-directional integration with SAP, QuickBooks, Salesforce, and custom ERPs.' },
              { title: 'White-label POS client', desc: 'Rebrand POS terminals and web portals with your corporate logo and theme.' },
              { title: 'Dedicated SLA & engineer', desc: 'Direct access to senior engineers with 99.99% uptime guarantee.' },
            ]}
            imageSrc="/images/ss1-ai.png"
            imageAlt="Custom POS Solutions & Integrations"
            topBadge="⚡ Tailored Workflows & Custom APIs"
            bottomBadge="Dedicated SLA Support Line"
            imagePosition="left"
            demoHref="/contact"
            ctaText="TALK TO CUSTOM TEAM"
          />

        </div>
      </div>
    </section>
  );
};

export default MainProductsShowcaseSection;
