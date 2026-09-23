import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setTheme } from '../redux/slices/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider — Enterprise Website is intentionally LIGHT-ONLY.
 *
 * Root Cause Fix (2026-09-23):
 * Previously, this provider was restoring a stale 'dark' value from localStorage
 * and applying the 'dark' class to <html>, which caused the site to appear dark
 * on any browser/system where dark mode had ever been saved — regardless of OS theme.
 *
 * Fix: We force 'light' on every mount. The 'dark' class is always removed from
 * <html>. No localStorage value can override this. This ensures consistent
 * white/light background for ALL users on ALL systems and browsers.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.mode);

  // On mount: always force light theme — clear any stale dark from localStorage
  useEffect(() => {
    // Clear any previously persisted dark theme
    localStorage.removeItem('quantix-theme');
    // Ensure Redux store is set to light
    if (theme !== 'light') {
      dispatch(setTheme('light'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Always keep <html> without 'dark' class — this site is light-only
  useEffect(() => {
    const html = document.documentElement;
    // Remove dark class unconditionally — enterprise site is light-only
    html.classList.remove('dark');
    // Also ensure color-scheme is explicitly light to prevent browser auto-dark
    html.style.colorScheme = 'light';
  }, [theme]);

  return <>{children}</>;
};
