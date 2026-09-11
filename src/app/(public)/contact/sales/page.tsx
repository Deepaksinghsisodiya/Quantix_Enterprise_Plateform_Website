// src/app/(public)/contact/sales/page.tsx
'use client';

import React, { useState } from 'react';
import { ContactSalesModal } from '@/components/organisms/ContactModal/ContactSalesModal';
import { useRouter } from 'next/navigation';

export default function ContactSalesPage() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background glow & branding backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-slate-950 to-slate-950 z-0 pointer-events-none" />
      
      <ContactSalesModal
        isOpen={isOpen}
        onClose={handleClose}
        title="We've got the right solution for you!"
        subtitle="Tell us about your business and our solution engineer will craft your custom setup within 1 hour."
        badgeText="SOLUTIONS EXPERT"
        buttonText="GET STARTED TODAY"
      />
    </main>
  );
}
