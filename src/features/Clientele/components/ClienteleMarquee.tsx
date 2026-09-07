// src/features/Clientele/components/ClienteleMarquee.tsx
'use client';

import React from 'react';
import { ClientBrandDto } from '../Types/ClienteleTypes';
import { DEFAULT_CLIENTELE } from '../constants/defaultClientele';
import { Building2, Store, Sparkles } from 'lucide-react';

interface ClienteleMarqueeProps {
  clientele?: ClientBrandDto[];
  isLoading?: boolean;
}

export const ClienteleMarquee: React.FC<ClienteleMarqueeProps> = ({
  clientele = [],
  isLoading = false,
}) => {
  const displayBrands = clientele.length > 0 ? clientele : DEFAULT_CLIENTELE;
  // Duplicate for seamless infinite loop
  const marqueeItems = [...displayBrands, ...displayBrands];

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/80">
      <div className="site-container px-4 sm:px-6 mb-4 text-center">
        <p className="text-xs font-syne font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Trusted by 50,000+ Fast-Growing Brands & Multi-Store Franchises
        </p>
      </div>

      {/* Infinite Horizontal Ticker */}
      <div className="relative w-full flex items-center overflow-hidden mask-gradient-x">
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee py-2 hover:[animation-play-state:paused]">
          {marqueeItems.map((brand, idx) => {
            const brandName = brand.title || brand.name || "Brand Partner";
            const brandLocation = brand.body || (brand.locationsCount ? `${brand.locationsCount}+ stores` : undefined);
            const brandCategory = brand.industry || brand.category || "Enterprise";
            const keyId = `clientele-${brand.id || brand.clientLogoId || brandName}-${idx}`;

            return (
              <div
                key={keyId}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-primary/40 transition-all cursor-default select-none group"
              >
                <div className="w-6 h-6 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {brandCategory === 'Restaurant' ? (
                    <Store className="w-3.5 h-3.5" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-syne font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors whitespace-nowrap">
                  {brandName}
                </span>
                {brandLocation && (
                  <span className="text-[10px] font-syne font-semibold px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {brandLocation}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClienteleMarquee;
