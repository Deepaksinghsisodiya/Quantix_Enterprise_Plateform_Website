// src/app/(public)/integrations/page.tsx
'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import IntegrationsWrapper from '@/features/Integrations/IntegrationsWrapper';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function IntegrationsPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-20 bg-slate-950 min-h-screen">
        <IntegrationsWrapper />
      </main>
      <Footer />
    </PublicLayout>
  );
}
