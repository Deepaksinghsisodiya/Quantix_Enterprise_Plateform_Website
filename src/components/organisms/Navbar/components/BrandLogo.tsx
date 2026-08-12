'use client';

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

interface BrandLogoProps {
  pathname: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ pathname, onClick }) => {
  const handleBrandClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleBrandClick}
      aria-label="Quantix Enterprise Home"
      className="flex items-center gap-2.5 z-50 group shrink-0 select-none"
    >
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
        <Zap className="h-4.5 w-4.5 fill-white stroke-[2.5]" />
      </div>
      <div className="flex flex-col text-left leading-none">
        <span className="font-syne text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors">
          Quantix <span className="text-primary">Enterprise</span>
        </span>
        <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
          POS Platform
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
