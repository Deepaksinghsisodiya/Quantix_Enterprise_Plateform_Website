// src/app/(public)/downloads/page.tsx
'use client';

import React from 'react';
import DownloadsWrapper from '@/features/Downloads/components/DownloadsWrapper';

export default function DownloadsPage() {
  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <DownloadsWrapper />
    </main>
  );
}
