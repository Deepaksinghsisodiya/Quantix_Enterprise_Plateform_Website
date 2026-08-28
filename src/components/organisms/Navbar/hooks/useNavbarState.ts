import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useNavbarState() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [openMegaMenu, setOpenMegaMenuState] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setOpenMegaMenu = useCallback((label: string | null) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (label) {
      setOpenMegaMenuState((current) => {
        if (current) {
          return label;
        } else {
          openTimerRef.current = setTimeout(() => {
            setOpenMegaMenuState(label);
          }, 80);
          return current;
        }
      });
    } else {
      closeTimerRef.current = setTimeout(() => {
        setOpenMegaMenuState(null);
      }, 200);
    }
  }, []);

  const closeMegaMenu = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenMegaMenuState(null);
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

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
    setOpenMegaMenuState(null);
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
