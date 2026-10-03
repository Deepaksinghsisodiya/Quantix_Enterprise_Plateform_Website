'use client';

import { useState, useEffect } from 'react';
import { getApiBaseUrl } from './apiBaseUrl';

export interface BrandingData {
  siteVariant: string;
  brandName: string;
  brandHighlight: string;
  tagline: string;
  iconType: string;
  logoImageUrl?: string | null;
  isActive: boolean;
}

const DEFAULT_ENTERPRISE_BRANDING: BrandingData = {
  siteVariant: 'Enterprise',
  brandName: 'Quantix',
  brandHighlight: 'Enterprise',
  tagline: 'POS PLATFORM',
  iconType: 'Zap',
  logoImageUrl: null,
  isActive: true,
};

const cache: Record<string, BrandingData> = {};

export function useBranding(variant: string = 'Enterprise') {
  const [branding, setBranding] = useState<BrandingData>(() => cache[variant] || DEFAULT_ENTERPRISE_BRANDING);
  const [loading, setLoading] = useState(!cache[variant]);

  useEffect(() => {
    let isMounted = true;

    async function fetchBranding() {
      try {
        const baseUrl = getApiBaseUrl();
        const res = await fetch(`${baseUrl}/branding/public?siteVariant=${encodeURIComponent(variant)}`, {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (res.ok) {
          const json = await res.json();
          const raw = json?.data || json;
          if (raw && (raw.brandName || raw.BrandName) && isMounted) {
            const normalized: BrandingData = {
              siteVariant: raw.siteVariant || raw.SiteVariant || variant,
              brandName: raw.brandName || raw.BrandName || DEFAULT_ENTERPRISE_BRANDING.brandName,
              brandHighlight: raw.brandHighlight ?? raw.BrandHighlight ?? DEFAULT_ENTERPRISE_BRANDING.brandHighlight,
              tagline: raw.tagline ?? raw.Tagline ?? DEFAULT_ENTERPRISE_BRANDING.tagline,
              iconType: raw.iconType || raw.IconType || DEFAULT_ENTERPRISE_BRANDING.iconType,
              logoImageUrl: raw.logoImageUrl ?? raw.LogoImageUrl ?? null,
              isActive: raw.isActive ?? raw.IsActive ?? true,
            };
            cache[variant] = normalized;
            setBranding(normalized);
          }
        }
      } catch {
        // Fall back gracefully
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBranding();

    return () => {
      isMounted = false;
    };
  }, [variant]);

  return { branding, loading };
}
