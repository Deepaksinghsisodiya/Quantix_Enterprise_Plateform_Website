'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { ContactSalesSection } from '@/components/organisms/ContactSalesSection/ContactSalesSection';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function ContactSalesPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-slate-900 min-h-[70vh]">
        <ContactSalesSection />
      </main>

      <Footer />
    </PublicLayout>
  );
}
