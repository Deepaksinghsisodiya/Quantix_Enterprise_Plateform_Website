'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';

export default function PublicLayoutRoot({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith('/sign-in') ||
    pathname?.startsWith('/sign-up') ||
    pathname?.startsWith('/forgot-password');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <PublicLayout>
      <Navbar />
      {children}
      <Footer />
    </PublicLayout>
  );
}
