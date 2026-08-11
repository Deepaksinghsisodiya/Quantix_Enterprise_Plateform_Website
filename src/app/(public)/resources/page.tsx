// src/app/(public)/resources/page.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { useGetResourcesQuery, ResourceDto } from '@/features/Downloads/services/DownloadsServices';
import { Search, Download, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_RESOURCES: ResourceDto[] = [
  { id: '1', title: 'The 2026 State of Restaurant Technology Report', type: 'whitepaper', topic: 'industry', description: 'Comprehensive analysis of POS, ordering, and automation trends shaping the restaurant industry.', thumbnailUrl: '/images/resources/restaurant-tech.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: true },
  { id: '2', title: 'POS Migration Checklist', type: 'checklist', topic: 'operations', description: 'Step-by-step guide to switching POS systems with zero downtime.', thumbnailUrl: '/images/resources/migration-checklist.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: false },
  { id: '3', title: 'Getting Started with Standalone POS', type: 'ebook', topic: 'standalone', description: 'Everything you need to know about token-based offline POS — from purchase to activation.', thumbnailUrl: '/images/resources/standalone-guide.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: true },
  { id: '4', title: 'The Multi-Location POS Playbook', type: 'whitepaper', topic: 'enterprise', description: 'Strategies for managing menus, inventory, and staff across multiple branches.', thumbnailUrl: '/images/resources/multi-location.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: true },
  { id: '5', title: 'Mastering POS Inventory Management', type: 'webinar', topic: 'operations', description: 'Recorded webinar covering real-time tracking, automated reordering, and waste reduction.', thumbnailUrl: '/images/resources/inventory-webinar.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: false },
  { id: '6', title: 'Retail POS Buyer\'s Guide 2026', type: 'ebook', topic: 'industry', description: 'Compare features, pricing, and deployment options across the top POS platforms.', thumbnailUrl: '/images/resources/buyers-guide.png', downloadUrl: '#', publishedAt: '2026-04-01', isGated: true },
];

const RESOURCE_TYPE_LABELS: Record<string, string> = {
  whitepaper: 'Whitepaper',
  ebook: 'eBook',
  checklist: 'Checklist',
  infographic: 'Infographic',
  webinar: 'Webinar',
};

const TOPIC_LABELS: Record<string, string> = {
  industry: 'Industry Insights',
  operations: 'Operations',
  standalone: 'Standalone POS',
  enterprise: 'Enterprise Cloud',
};

export default function ResourcesPage() {
  const { data: apiResources = [], isLoading } = useGetResourcesQuery();
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const resourcesList = apiResources.length > 0 ? apiResources : DEFAULT_RESOURCES;

  const types = useMemo(() => [...new Set(resourcesList.map((r) => r.type))], [resourcesList]);
  const topics = useMemo(() => [...new Set(resourcesList.map((r) => r.topic))], [resourcesList]);

  const filtered = useMemo(() => {
    let result = [...resourcesList];
    if (activeType) result = result.filter((r) => r.type === activeType);
    if (activeTopic) result = result.filter((r) => r.topic === activeTopic);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [resourcesList, activeType, activeTopic, search]);

  const handleUnlockResource = useCallback((id: string) => {
    if (!gateEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gateEmail)) return;
    setUnlockedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setUnlockingId(null);
    setGateEmail('');
  }, [gateEmail]);

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container text-center mb-16 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
            RESOURCE LIBRARY
          </div>
          <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
            Knowledge Content Hub
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Download our curated ebooks, restaurant checklists, and enterprise POS guides to optimize checkout efficiency.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search library assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-250 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/40 py-3.5 pl-11 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filters Panel */}
        <div className="site-container max-w-4xl space-y-4 mb-16">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveType(null)}
              className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${!activeType ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-900/40 border-gray-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-700'
                }`}
            >
              All Types
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${activeType === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-900/40 border-gray-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-700'
                  }`}
              >
                {RESOURCE_TYPE_LABELS[type] ?? type}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
                className={`rounded-full px-3.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${activeTopic === topic ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-50 dark:bg-slate-900/20 border-gray-200 dark:border-slate-800/40 text-slate-400 dark:text-slate-500 hover:border-gray-300 dark:hover:border-slate-800'
                  }`}
              >
                {TOPIC_LABELS[topic] ?? topic}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Resource Grid */}
        <div className="site-container max-w-6xl">
          {isLoading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading resources hub...</div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource) => {
                const isGated = resource.isGated && !unlockedIds.has(resource.id);
                return (
                  <div
                    key={resource.id}
                    className="rounded-3xl border border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/20 p-5 backdrop-blur-md relative overflow-hidden flex flex-col justify-between hover:border-blue-500/30 transition-all group"
                  >
                    <div className="space-y-4">
                      {/* Badge / Category */}
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                          {RESOURCE_TYPE_LABELS[resource.type] ?? resource.type}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {TOPIC_LABELS[resource.topic] ?? resource.topic}
                        </span>
                      </div>

                      {/* Header */}
                      <h3 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {resource.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-gray-150 dark:border-slate-800/60 pt-4">
                      {isGated ? (
                        unlockingId === resource.id ? (
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={gateEmail}
                              onChange={(e) => setGateEmail(e.target.value)}
                              placeholder="Enter your email to unlock..."
                              className="flex-1 rounded-lg border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-[10px] text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                            />
                            <button
                              onClick={() => handleUnlockResource(resource.id)}
                              className="rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-2 text-[10px] font-bold text-white transition-all cursor-pointer"
                            >
                              Unlock
                            </button>
                            <button
                              onClick={() => { setUnlockingId(null); setGateEmail(''); }}
                              className="rounded-lg border border-gray-200 dark:border-slate-850 p-2 text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900 cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setUnlockingId(resource.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all cursor-pointer"
                          >
                            <Lock size={13} />
                            Unlock via business email
                          </button>
                        )
                      ) : (
                        <a
                          href={resource.downloadUrl}
                          download
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-all cursor-pointer"
                        >
                          <Download size={13} />
                          Download Resource
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">No resources matching filters. Try adjusting categories.</div>
          )}
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
