// src/features/Integrations/IntegrationsWrapper.tsx
'use client';

import React from 'react';
import { useGetIntegrationsQuery } from './Service/IntegrationsService';
import IntegrationGrid from './IntegrationGrid';

export const IntegrationsWrapper: React.FC = () => {
  const { data: integrations = [], isLoading } = useGetIntegrationsQuery();

  return (
    <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 text-slate-900 dark:text-white min-h-[80vh] relative transition-colors duration-300">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-1/4 w-100 h-100 rounded-full bg-blue-500/10 blur-[100px] -z-10 pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 rounded-full bg-indigo-500/5 blur-[100px] -z-10 pointer-events-none opacity-50 dark:opacity-100" />

      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
            CONNECTORS DIRECTORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
            Connect everything
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Quantix POS integrates seamlessly with all major retail and restaurant applications. Connect payment systems, delivery channels, and back-office bookkeeping tools instantly.
          </p>
        </div>

        {/* Integration Grid UI */}
        <IntegrationGrid integrations={integrations} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default IntegrationsWrapper;
