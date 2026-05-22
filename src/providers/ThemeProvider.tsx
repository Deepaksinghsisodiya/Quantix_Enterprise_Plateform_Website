import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setTheme } from '../redux/slices/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * ThemeProvider synchronises the UI theme (dark/light) with the Redux store.
 * It reads the current theme from the store and applies the appropriate class
 * to the <html> element. On mount it also restores any persisted theme from
 * localStorage to avoid a flash of the wrong theme.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.mode);

  // Hydrate persisted theme once on client mount
  useEffect(() => {
    const persisted = localStorage.getItem('qauntix-theme') as 'light' | 'dark' | null;
    if (persisted && persisted !== theme) {
      dispatch(setTheme(persisted));
    }
  }, []);

  // Apply class to <html> whenever theme changes
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Persist for next loads
    localStorage.setItem('qauntix-theme', theme);
  }, [theme]);

  return <>{children}</>;
};
