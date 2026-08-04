// src/context/IndustryContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type IndustryMode = 'all' | 'restaurant' | 'retail';

interface IndustryContextValue {
  mode: IndustryMode;
  setMode: (mode: IndustryMode) => void;
  toggleMode: (mode: IndustryMode) => void;
  isActive: (industry: 'restaurant' | 'retail') => boolean;
  label: string;
}

const IndustryContext = createContext<IndustryContextValue | undefined>(undefined);

export const IndustryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryIndustry = searchParams.get('industry') as IndustryMode | null;
  const initialMode: IndustryMode = (queryIndustry === 'restaurant' || queryIndustry === 'retail') ? queryIndustry : 'all';

  const [mode, setModeState] = useState<IndustryMode>(initialMode);

  // Sync state with URL search params when URL changes directly
  useEffect(() => {
    if (queryIndustry === 'restaurant' || queryIndustry === 'retail') {
      setModeState(queryIndustry);
    } else if (!queryIndustry && mode !== 'all') {
      setModeState('all');
    }
  }, [queryIndustry]);

  const setMode = useCallback((newMode: IndustryMode) => {
    setModeState(newMode);
    const params = new URLSearchParams(searchParams.toString());
    if (newMode === 'all') {
      params.delete('industry');
    } else {
      params.set('industry', newMode);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  }, [searchParams, pathname, router]);

  const toggleMode = useCallback((targetMode: IndustryMode) => {
    setMode(mode === targetMode ? 'all' : targetMode);
  }, [mode, setMode]);

  const isActive = useCallback(
    (industry: 'restaurant' | 'retail') => {
      return mode === 'all' || mode === industry;
    },
    [mode]
  );

  const label = useMemo(() => {
    switch (mode) {
      case 'restaurant':
        return 'Restaurant';
      case 'retail':
        return 'Retail';
      default:
        return 'All Industries';
    }
  }, [mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode, isActive, label }),
    [mode, setMode, toggleMode, isActive, label]
  );

  return (
    <IndustryContext.Provider value={value}>
      {children}
    </IndustryContext.Provider>
  );
};

export const useIndustry = (): IndustryContextValue => {
  const ctx = useContext(IndustryContext);
  if (!ctx) {
    throw new Error('useIndustry must be used within an IndustryProvider');
  }
  return ctx;
};

export default IndustryContext;
