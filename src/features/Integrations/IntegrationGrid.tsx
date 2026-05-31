// src/features/Integrations/IntegrationsGrid.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Search, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IntegrationDto } from './Types/IntegrationsTypes';
import { toast } from 'sonner';

interface IntegrationGridProps {
  integrations: IntegrationDto[];
  isLoading: boolean;
}

const DEFAULT_INTEGRATIONS: IntegrationDto[] = [
  { id: '1', slug: 'stripe', name: 'Stripe Payments', description: 'Process online and in-person card payments seamlessly.', category: 'payments', isPopular: true },
  { id: '2', slug: 'xero', name: 'Xero Accounting', description: 'Automatically sync sales invoice records to your ledger.', category: 'accounting', isPopular: true },
  { id: '3', slug: 'doordash', name: 'DoorDash Delivery', description: 'Import delivery orders directly to your kitchen display.', category: 'delivery', isPopular: false },
  { id: '4', slug: 'shopify', name: 'Shopify Sync', description: 'Synchronize inventory catalog between retail stores and e-commerce.', category: 'e-commerce', isPopular: true }
];

export const IntegrationGrid: React.FC<IntegrationGridProps> = ({ integrations, isLoading }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const integrationList = integrations.length > 0 ? integrations : DEFAULT_INTEGRATIONS;

  const categories = useMemo(
    () => [...new Set(integrationList.map((i) => i.category))].sort(),
    [integrationList]
  );

  const filtered = useMemo(() => {
    let result = integrationList;
    if (activeCategory) {
      result = result.filter((i) => i.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [integrationList, activeCategory, search]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestEmail) {
      toast.error('Please fill in the required fields.');
      return;
    }
    toast.success('Thank you! Your integration request has been recorded.');
    setRequestSubmitted(true);
    setRequestName('');
    setRequestEmail('');
  };

  return (
    <div className="space-y-12">
      {/* Search and Category pills */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between bg-gray-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-gray-200 dark:border-slate-800/80 backdrop-blur-md">
        <div className="relative max-w-md flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all connectors (e.g. Stripe, Xero)..."
            className="w-full rounded-full border border-gray-300 dark:border-slate-700/50 bg-white dark:bg-slate-950/60 py-3 pl-11 pr-5 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer',
              !activeCategory
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-gray-200 dark:bg-slate-800 text-slate-650 dark:text-slate-400 hover:bg-gray-300 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            All Connectors
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2 text-xs font-bold capitalize transition-all duration-200 cursor-pointer',
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-gray-200 dark:bg-slate-800 text-slate-650 dark:text-slate-400 hover:bg-gray-300 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Connectors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-44 rounded-2xl border border-gray-200 dark:border-slate-800/80 bg-gray-50 dark:bg-slate-900/20 p-6 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((integration) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              key={integration.id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/20 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900/40 relative overflow-hidden"
            >
              {integration.isPopular && (
                <span className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md">
                  Popular
                </span>
              )}

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800/80 mb-5 group-hover:border-blue-500/30 transition-colors">
                  {integration.logoUrl ? (
                    <img src={integration.logoUrl} alt={integration.name} className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="text-xl font-syne font-black text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {integration.name.charAt(0)}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {integration.name}
                </h3>
                <p className="mt-2 text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                  {integration.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-slate-800/60 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450 bg-gray-100 dark:bg-slate-905 px-2.5 py-1 rounded-md border border-gray-250 dark:border-slate-800/50 capitalize">
                  {integration.category}
                </span>

                <a
                  href={integration.websiteUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Configure &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-gray-50/50 dark:bg-slate-900/10 border border-gray-250 dark:border-slate-800/60 rounded-2xl">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            No connectors found matching your query. Please request an integration below.
          </p>
        </div>
      )}

      {/* Integration Request Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-syne font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Need a custom integration?
          </h3>
          <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-medium leading-relaxed">
            Our secure, high-performance API lets you build custom connections in minutes. Alternatively, tell us what connector you need and we will prioritize it.
          </p>

          <AnimatePresence mode="wait">
            {!requestSubmitted ? (
              <form onSubmit={handleSubmitRequest} className="mt-8 space-y-4 text-left max-w-md mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. Xero, Hubspot"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="Your work email"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950/60 px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5"
                >
                  <Send size={13} />
                  Submit Connector Request
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20 text-center space-y-2 max-w-sm mx-auto"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-2 text-white">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Request Logged</h4>
                <p className="text-[11px] text-slate-550 dark:text-slate-400 font-medium">We will update you at {requestEmail} as soon as this connector is ready!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IntegrationGrid;
