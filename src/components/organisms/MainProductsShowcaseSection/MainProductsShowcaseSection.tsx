'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

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
              REQUEST A DEMO
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white group-hover/btn:bg-white group-hover/btn:text-primary transition-colors">
                <ArrowRight className="h-3 w-3 stroke-[3]" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Ultra-Wide Full Bleed 3D Image Card */}
        <motion.div
          initial={{ opacity: 0, x: isRight ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 ${!isRight ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-primary/10 via-slate-50 to-primary-dark/10 dark:from-slate-900 dark:via-slate-900 dark:to-primary-dark/20 p-0 shadow-2xl shadow-slate-200/60 dark:shadow-none hover:shadow-3xl transition-all duration-500 group/imgCard flex items-center justify-center">
            
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-90 group-hover/imgCard:opacity-100 transition-opacity pointer-events-none z-0" />

            {/* 3D Image Graphic - Ultra Wide */}
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
      {/* Ultra-Wide Container: Expands beyond standard navbar width to screen ends */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-widest text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block">
            COMPLETE POS ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-syne tracking-tight">
            Everything Your Business Needs to Trade & Scale
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            From busy restaurant kitchens and fast retail counters to handheld tableside ordering, direct online customer portals, and multi-tenant enterprise cloud hubs.
          </p>
        </div>

        {/* Ultra-Wide Product Rows */}
        <div className="space-y-4">
          {/* Row 1: Restaurant POS & Kitchen Display */}
          <ProductRow
            tagline="FOR DINERS, CAFES & BUSTLING KITCHENS"
            title="Restaurant POS & Kitchen System"
            description="Runs in a browser or native register with real-time kitchen ticket routing, interactive table layouts, and instant modifier management."
            points={[
              { title: 'Prep routing', desc: 'Send grill tickets to the kitchen display and bar orders to the bar terminal.' },
              { title: 'Visual table mapping', desc: 'Real-time floor layout status, open bills, and course timing.' },
              { title: 'Flexible modifiers', desc: 'Custom cooking preferences, add-ons, and instant bill splitting.' },
            ]}
            imageSrc="/images/kitchen_display_3d.png"
            imageAlt="Restaurant POS and Kitchen Display System"
            topBadge="⚡ Real-Time Kitchen Ticket Routing"
            bottomBadge="Order Dispatch Speed < 1.2s"
            imagePosition="right"
          />

          {/* Row 2: Retail Store & Register Counter */}
          <ProductRow
            tagline="LIGHTNING FAST CHECKOUT & BARCODES"
            title="Retail Store & Register Counter"
            description="A complete counter station built for boutiques, supermarkets, and retail shops. Offline-first design guarantees your register never closes."
            points={[
              { title: 'Touch-first interface', desc: 'Product grid with categories, instant barcode lookup, and item photos.' },
              { title: 'Granular controls', desc: 'Line-level & bill-level discounts, voids, and recorded reason tracking.' },
              { title: 'Hardware flexibility', desc: 'Connect barcode scanners, thermal receipt printers, and cash drawers.' },
            ]}
            imageSrc="/images/pos_counter_3d.png"
            imageAlt="Retail Store Counter POS Station"
            topBadge="🛡️ 100% Offline Local Register"
            bottomBadge="Thermal Printer & Scanner Ready"
            imagePosition="left"
          />

          {/* Row 3: Mobile Tableside & Handheld App */}
          <ProductRow
            tagline="TABLESIDE BILLING & QR ORDERING"
            title="Mobile Tableside & Handheld App"
            description="Equip your servers with handheld Android & iPad POS tablets for mobile order taking, guest self-ordering QR codes, and instant bill settlement."
            points={[
              { title: 'Tableside order firing', desc: 'Send food orders straight to the kitchen from the guest table.' },
              { title: 'Integrated PDQ payments', desc: 'Accept contactless card payments right at the customer table.' },
              { title: 'QR Code guest ordering', desc: 'Let guests scan table QR codes to view digital menus and order.' },
            ]}
            imageSrc="/images/mobile_app_3d.png"
            imageAlt="Mobile Tableside POS App"
            topBadge="📱 Handheld Android & iPad POS"
            bottomBadge="Contactless Card & QR Ready"
            imagePosition="right"
          />

          {/* Row 4: Branded Online Ordering Website */}
          <ProductRow
            tagline="COMMISSION-FREE DIRECT SALES"
            title="Branded Online Ordering Website"
            description="Launch a custom web ordering portal for your customers to place pickup and delivery orders directly without third-party commission cuts."
            points={[
              { title: 'Branded web portal', desc: 'Custom domain, store logo, and instant menu item sync.' },
              { title: 'Zero commission fees', desc: 'Keep 100% of your order profit margins on direct online orders.' },
              { title: 'Auto-dispatch routing', desc: 'Incoming online orders flow straight into POS registers and KDS screens.' },
            ]}
            imageSrc="/images/online_ordering_3d.png"
            imageAlt="Branded Online Ordering Website"
            topBadge="🌐 0% Commission Direct Sales"
            bottomBadge="Instant Menu & Price Sync"
            imagePosition="left"
          />

          {/* Row 5: Enterprise Multi-Store Cloud Hub */}
          <ProductRow
            tagline="MULTI-TENANT & FRANCHISE CONTROL"
            title="Enterprise Multi-Store Cloud Hub"
            description="Centralized cloud dashboard built for multi-location chain franchises, multi-tenant databases, centralized menu rollouts, and warehouse stock transfers."
            points={[
              { title: 'Multi-tenant isolation', desc: 'Bank-grade encrypted tenant partition for branch stores and franchises.' },
              { title: 'Global menu rollout', desc: 'Push menu updates, prices, and promotions to 100+ stores instantly.' },
              { title: 'Executive analytics', desc: 'Consolidated real-time profit margins, branch sales, and stock audits.' },
            ]}
            imageSrc="/images/enterprise_hub_3d.png"
            imageAlt="Enterprise Multi-Store Cloud Hub"
            topBadge="🏢 Multi-Tenant Enterprise Cloud"
            bottomBadge="100+ Franchise Stores Connected"
            imagePosition="right"
            demoHref="/sign-up/enterprise"
          />
        </div>
      </div>
    </section>
  );
};

export default MainProductsShowcaseSection;
