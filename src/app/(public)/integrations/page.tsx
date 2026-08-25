// src/app/(public)/integrations/page.tsx
'use client';

import React from 'react';
import IntegrationsWrapper from '@/features/Integrations/components/IntegrationsWrapper';

export default function IntegrationsPage() {
  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <IntegrationsWrapper />
    </main>
  );
}
