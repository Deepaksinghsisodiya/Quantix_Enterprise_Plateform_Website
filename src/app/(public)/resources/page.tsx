'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { DemoSection } from '@/components/organisms/DemoSection/DemoSection';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function ResourcesPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 min-h-[70vh]">
        <DemoSection />
      </main>

      <Footer />
    </PublicLayout>
  );
}
