'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { useNavbarState } from './hooks/useNavbarState';
import { useOutsideClick } from './hooks/useOutsideClick';
import { TopPromoBanner } from './components/TopPromoBanner';
import { BrandLogo } from './components/BrandLogo';
import { DesktopNav } from './components/DesktopNav/DesktopNav';
import { MobileNavTrigger } from './components/MobileNav/MobileNavTrigger';
import { MobileNavDrawer } from './components/MobileNav/MobileNavDrawer';

const NavAuthActions = dynamic(
  () => import('./components/NavAuthActions').then((m) => m.NavAuthActions),
  {
    ssr: false,
    loading: () => (
      <div className="hidden lg:flex items-center gap-3">
        <div className="h-10 w-20 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    ),
  }
);

const Navbar: React.FC = () => {
  const {
    scrolled,
    mobileOpen,
    mobileSubMenu,
    openMegaMenu,
    pathname,
    setMobileSubMenu,
    setOpenMegaMenu,
    toggleMobile,
    closeMobile,
    closeMegaMenu,
  } = useNavbarState();

  const navRef = useRef<HTMLDivElement>(null);

  // Close open dropdowns or mobile menu when clicking outside or pressing ESC
  useOutsideClick(navRef, () => {
    closeMegaMenu();
    closeMobile();
  }, Boolean(openMegaMenu || mobileOpen));

  return (
    <>
      <div ref={navRef} className="fixed top-0 left-0 z-50 w-full flex flex-col">
        {/* Top Promo Banner - Collapses smoothly on scroll */}
        <TopPromoBanner scrolled={scrolled} />

        {/* Main Navigation Bar */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className={cn(
            'w-full bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative transition-all duration-300',
            scrolled ? 'shadow-md shadow-slate-900/5 py-1.5 sm:py-2.5' : 'shadow-sm py-2 sm:py-3'
          )}
          onMouseLeave={closeMegaMenu}
        >
          <div className="site-container">
            <div className="w-full flex items-center justify-between">
              {/* Left: Brand logo */}
              <BrandLogo pathname={pathname} onClick={closeMegaMenu} />

              {/* Center: Desktop Navigation Links & Mega Menus */}
              <DesktopNav
                pathname={pathname}
                openMegaMenu={openMegaMenu}
                onSetOpenMegaMenu={setOpenMegaMenu}
              />

              {/* Right: Auth State & Call/Contact Buttons */}
              <NavAuthActions />

              {/* Mobile Hamburger Trigger */}
              <MobileNavTrigger mobileOpen={mobileOpen} onToggle={toggleMobile} />
            </div>
          </div>
        </nav>

        {/* Full-Screen Mobile Drawer */}
        <MobileNavDrawer
          mobileOpen={mobileOpen}
          mobileSubMenu={mobileSubMenu}
          scrolled={scrolled}
          pathname={pathname}
          onSetSubMenu={(label) => setMobileSubMenu(label)}
          onClose={closeMobile}
        />
      </div>
    </>
  );
};

export default Navbar;
