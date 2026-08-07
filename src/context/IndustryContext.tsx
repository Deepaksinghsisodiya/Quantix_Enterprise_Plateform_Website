// src/context/IndustryContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, Suspense } from 'react';
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

function SearchParamsHandler({ onSync }: { onSync: (queryIndustry: IndustryMode | null) => void }) {
  const searchParams = useSearchParams();
  const queryIndustry = searchParams.get('industry') as IndustryMode | null;

  useEffect(() => {
    onSync(queryIndustry);
  }, [queryIndustry, onSync]);

  return null;
}

export const IndustryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setModeState] = useState<IndustryMode>('all');

  const handleSync = useCallback((queryIndustry: IndustryMode | null) => {
    if (queryIndustry === 'restaurant' || queryIndustry === 'retail') {
      setModeState(queryIndustry);
    } else if (!queryIndustry) {
      setModeState('all');
    }
  }, []);

  const setMode = useCallback((newMode: IndustryMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (newMode === 'all') {
        params.delete('industry');
      } else {
        params.set('industry', newMode);
      }
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    }
  }, [pathname, router]);

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
      <Suspense fallback={null}>
        <SearchParamsHandler onSync={handleSync} />
      </Suspense>
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

