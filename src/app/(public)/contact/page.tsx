'use client';

import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import ContactSalesFormWrapper from '@/components/organisms/ContactSalesSection/ContactSalesFormWrapper';

export default function ContactSalesPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-slate-900 min-h-[70vh]">
        <ContactSalesFormWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
