'use client';

import React from 'react';
import Link from 'next/link';

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
      aria-label="Quantix Home"
      className="flex items-center z-50 group shrink-0"
    >
      {/* Desktop Full Logo */}
      <img
        src="/images/logo/quantix-logo-full-on-light.svg"
        alt="Quantix Logo"
        className="hidden lg:block h-[44px] w-auto transition-transform duration-300 group-hover:scale-[1.02]"
      />
      {/* Mobile/Tablet Logo */}
      <img
        src="/images/logo/quantix-logo-full-on-light.svg"
        alt="Quantix Logo"
        className="block lg:hidden h-[26px] sm:h-[34px] w-auto transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
};
