import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function useNavbarState() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll listener for collapsing top promo banner & shadow toggle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Reset open states on route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubMenu(null);
    setOpenMegaMenu(null);
  }, [pathname]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      if (prev) setMobileSubMenu(null);
      return !prev;
    });
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileSubMenu(null);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setOpenMegaMenu(null);
  }, []);

  return {
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
  };
}
