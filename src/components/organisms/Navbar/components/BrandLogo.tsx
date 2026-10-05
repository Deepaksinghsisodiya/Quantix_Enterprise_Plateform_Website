'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Store,
  Utensils,
  Coffee,
  ShoppingBag,
  Boxes,
  Layers,
  Sparkles,
  Building2,
} from 'lucide-react';
import { useBranding } from '@/lib/useBranding';

interface BrandLogoProps {
  pathname: string;
  onClick?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  store: Store,
  utensils: Utensils,
  coffee: Coffee,
  shoppingbag: ShoppingBag,
  boxes: Boxes,
  layers: Layers,
  sparkles: Sparkles,
  building2: Building2,
};

function resolveLogoUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5104';
  return `${backend.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ pathname, onClick }) => {
  const { branding } = useBranding('Enterprise');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [branding.logoImageUrl]);

  const handleBrandClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resolvedUrl = resolveLogoUrl(branding.logoImageUrl);

  const renderIcon = () => {
    if (resolvedUrl && !imgError) {
      return (
        <img
          src={resolvedUrl}
          alt={branding.brandName}
          className="h-4.5 w-4.5 object-contain"
          onError={() => setImgError(true)}
        />
      );
    }
    const IconComponent = ICON_MAP[(branding.iconType || 'zap').toLowerCase()] || Zap;
    return <IconComponent className="h-4.5 w-4.5 fill-white stroke-[2.5]" />;
  };

  return (
    <Link
      href="/"
      onClick={handleBrandClick}
      aria-label={`${branding.brandName} ${branding.brandHighlight} Home`}
      className="flex items-center gap-2.5 z-50 group shrink-0 select-none outline-hidden ring-0 border-0"
    >
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-linear-to-tr from-[#FF4F00] to-[#FF6B2B] text-white shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/40">
        {renderIcon()}
      </div>
      <div className="flex flex-col text-left leading-none">
        <span className="font-syne text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors">
          {branding.brandName}{' '}
          <span className="text-primary">{branding.brandHighlight}</span>
        </span>
        <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
          {branding.tagline}
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
