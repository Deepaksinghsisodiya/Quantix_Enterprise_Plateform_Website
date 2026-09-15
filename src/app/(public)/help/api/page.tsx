// src/app/(public)/help/api/page.tsx
'use client';

import React, { useState } from 'react';
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Code2,
  FileJson,
  Layers,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import CTABanner from '@/components/organisms/CTABanner/CTABanner';

interface ApiSection {
  id: string;
  title: string;
  method: 'POST' | 'GET' | 'PUT';
  path: string;
  desc: string;
  payload: string;
  curl: string;
  response: string;
  statusCode: number;
}

const API_SECTIONS: ApiSection[] = [
  {
    id: 'auth',
    title: 'OAuth2 Authentication',
    method: 'POST',
    path: '/api/v1/auth/token',
    desc: 'Exchange your merchant API client credentials for a short-lived bearer JWT access token.',
    payload: '{\n  "apiKey": "qx_live_559f939e0ac5...",\n  "merchantId": "mch_8820",\n  "scope": "transactions:write inventory:read"\n}',
    curl: 'curl -X POST https://api.quantixpos.com/api/v1/auth/token \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "apiKey": "qx_live_559f939e0ac5...",\n    "merchantId": "mch_8820"\n  }\'',
    response: '{\n  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "tokenType": "Bearer",\n  "expiresIn": 3600,\n  "scope": "transactions:write inventory:read"\n}',
    statusCode: 200,
  },
  {
    id: 'sales',
    title: 'Ingest Transaction',
    method: 'POST',
    path: '/api/v1/transactions',
    desc: 'Submit a new checkout receipt transaction to trigger cloud inventory sync and ERP accounting schedules.',
    payload: '{\n  "terminalId": "trm_991",\n  "amount": 49.99,\n  "currency": "USD",\n  "items": [\n    { "sku": "SKU-990", "quantity": 1, "price": 49.99 }\n  ],\n  "paymentMethod": "EMV_CHIP"\n}',
    curl: 'curl -X POST https://api.quantixpos.com/api/v1/transactions \\\n  -H "Authorization: Bearer <TOKEN>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "terminalId": "trm_991",\n    "amount": 49.99,\n    "currency": "USD"\n  }\'',
    response: '{\n  "status": "success",\n  "transactionId": "tx_88019",\n  "syncTimestamp": "2026-09-15T16:40:00Z",\n  "inventoryDeducted": true\n}',
    statusCode: 201,
  },
  {
    id: 'inventory',
    title: 'Query Multi-Store Stock',
    method: 'GET',
    path: '/api/v1/inventory/items',
    desc: 'Retrieve real-time inventory quantity across active warehouse locations and retail floor displays.',
    payload: '// Query parameters:\n// ?warehouseId=wh_2&limit=10&inStockOnly=true',
    curl: 'curl -X GET "https://api.quantixpos.com/api/v1/inventory/items?warehouseId=wh_2&limit=10" \\\n  -H "Authorization: Bearer <TOKEN>"',
    response: '{\n  "items": [\n    {\n      "sku": "SKU-990",\n      "name": "Standard Billing Terminal",\n      "stock": 420,\n      "unit": "pieces",\n      "reorderLevel": 50\n    }\n  ],\n  "totalCount": 1,\n  "warehouseId": "wh_2"\n}',
    statusCode: 200,
  },
  {
    id: 'webhooks',
    title: 'Order Webhooks Callback',
    method: 'POST',
    path: '/api/v1/webhooks/order',
    desc: 'Listen for real-time kitchen display routing, bill settlement, and table course hold/fire events.',
    payload: '{\n  "event": "order.item_fired",\n  "orderId": "ord_77102",\n  "tableNumber": "T-14",\n  "firedItems": ["Steak Tartare", "Truffle Fries"],\n  "timestamp": "2026-09-15T16:45:00Z"\n}',
    curl: 'curl -X POST https://api.quantixpos.com/api/v1/webhooks/order \\\n  -H "X-Quantix-Signature: sha256=3a1..." \\\n  -H "Content-Type: application/json"',
    response: '{\n  "acknowledged": true,\n  "webhookDeliveryId": "del_99812",\n  "latencyMs": 18\n}',
    statusCode: 200,
  },
  {
    id: 'terminals',
    title: 'Terminal Telemetry & Heartbeat',
    method: 'GET',
    path: '/api/v1/terminals/health',
    desc: 'Audit online/offline register status, local SQLite sync delta lag, and thermal printer paper alerts.',
    payload: '// Query parameters:\n// ?storeId=store_nyc_01&includePeripherals=true',
    curl: 'curl -X GET "https://api.quantixpos.com/api/v1/terminals/health?storeId=store_nyc_01" \\\n  -H "Authorization: Bearer <TOKEN>"',
    response: '{\n  "storeId": "store_nyc_01",\n  "onlineRegisters": 4,\n  "offlineRegisters": 0,\n  "maxSyncLagSecs": 0.4,\n  "printersOperational": true\n}',
    statusCode: 200,
  },
];

export default function HelpAPIDocsPage() {
  const [activeEndpointTab, setActiveEndpointTab] = useState<string>('auth');
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'payload' | 'response'>('curl');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeDoc = API_SECTIONS.find((s) => s.id === activeEndpointTab) || API_SECTIONS[0];

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMethodBadge = (method: 'POST' | 'GET' | 'PUT') => {
    switch (method) {
      case 'POST':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'GET':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'PUT':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* ─── 1. Page Hero Header (Standard .page-hero-header) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="site-container relative z-10 page-nav-header space-y-4 text-left">
          {/* Breadcrumbs - Direct Resources > API Reference */}
          <div className="nav-breadcrumb text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <ChevronRight size={11} className="text-slate-400 shrink-0" />
            <span className="text-primary font-bold">API Reference</span>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-xs font-bold uppercase tracking-wider text-[#FF4D00] shadow-2xs">
              <Code2 size={13} className="text-[#FF4D00]" />
              <span>Developer Integration Portal</span>
            </div>
          </div>

          {/* Heading - No arrow button */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-syne font-black tracking-tight text-slate-950 dark:text-white leading-tight max-w-3xl uppercase">
            REST API Documentation
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
            Integrate Quantix POS with external ERPs, warehouse management systems, and custom loyalty programs via
            high-throughput REST webhooks and gRPC streaming telemetry.
          </p>
        </div>
      </section>

      {/* ─── 2. Main Content Section (Standard .section-py) ─── */}
      <section className="section-py site-container">
        {/* Mobile Horizontal Endpoints Scroll Bar */}
        <div className="lg:hidden mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {API_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveEndpointTab(sec.id)}
                className={cn(
                  'px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer flex items-center gap-1.5',
                  activeEndpointTab === sec.id
                    ? 'bg-primary border-primary text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                )}
              >
                <span className={cn('text-[9px] font-mono font-black px-1.5 py-0.2 rounded border', getMethodBadge(sec.method))}>
                  {sec.method}
                </span>
                <span>{sec.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout (Desktop 4-8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Desktop API Sidebar selector */}
          <div className="hidden lg:block lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
              Endpoints Catalog ({API_SECTIONS.length})
            </span>

            <div className="space-y-2">
              {API_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveEndpointTab(sec.id)}
                  className={cn(
                    'w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex justify-between items-center',
                    activeEndpointTab === sec.id
                      ? 'bg-primary border-primary text-white shadow-xs shadow-primary/25 font-bold'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                  )}
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <span className="text-xs sm:text-sm font-syne font-bold uppercase block tracking-tight truncate">
                      {sec.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'text-[9px] font-bold px-1.5 py-0.2 rounded font-mono border',
                          activeEndpointTab === sec.id ? 'bg-white/20 text-white border-white/30' : getMethodBadge(sec.method)
                        )}
                      >
                        {sec.method}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate">
                        {sec.path}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className={activeEndpointTab === sec.id ? 'text-white' : 'text-slate-400'} />
                </button>
              ))}
            </div>

            {/* Security Box */}
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 mt-6 space-y-2 bg-white/40 dark:bg-slate-900/30">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-900 dark:text-white">
                <ShieldCheck size={14} className="text-primary" /> Security Standards
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                All requests require HTTPS with TLS 1.3. Signatures are verified using SHA-256 HMAC tokens with 120 calls/min rate limits.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Code Reader */}
          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-5 sm:p-7 relative overflow-hidden space-y-5 shadow-2xs">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-amber-500" />

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded font-mono border', getMethodBadge(activeDoc.method))}>
                    {activeDoc.method}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Status: <span className="text-emerald-500 font-black">{activeDoc.statusCode}</span>
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-syne font-black uppercase text-slate-900 dark:text-white">
                  {activeDoc.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  {activeDoc.desc}
                </p>
              </div>

              {/* Endpoint Request URL Bar */}
              <div className="rounded-lg bg-slate-950 p-3 sm:p-3.5 border border-slate-800 flex justify-between items-center text-white font-mono text-[11px] sm:text-xs overflow-x-auto gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className={cn('font-black shrink-0', activeDoc.method === 'POST' ? 'text-emerald-400' : 'text-primary')}>
                    {activeDoc.method}
                  </span>
                  <span className="truncate text-slate-200">https://api.quantixpos.com{activeDoc.path}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`https://api.quantixpos.com${activeDoc.path}`, 'url')}
                  className="h-7 w-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                  aria-label="Copy endpoint URL"
                >
                  {copiedId === 'url' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>

              {/* Code Snippet Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('curl')}
                      className={cn(
                        'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer',
                        activeCodeTab === 'curl'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      )}
                    >
                      cURL
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('payload')}
                      className={cn(
                        'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer',
                        activeCodeTab === 'payload'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      )}
                    >
                      Payload Body
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCodeTab('response')}
                      className={cn(
                        'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer',
                        activeCodeTab === 'response'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      )}
                    >
                      Response JSON
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const text =
                        activeCodeTab === 'curl'
                          ? activeDoc.curl
                          : activeCodeTab === 'payload'
                          ? activeDoc.payload
                          : activeDoc.response;
                      handleCopy(text, 'snippet');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer"
                  >
                    {copiedId === 'snippet' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>Copy</span>
                  </button>
                </div>

                {/* Code Body */}
                <div className="relative rounded-xl bg-slate-950 p-4 sm:p-5 border border-slate-800">
                  <pre className="text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {activeCodeTab === 'curl'
                      ? activeDoc.curl
                      : activeCodeTab === 'payload'
                      ? activeDoc.payload
                      : activeDoc.response}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA Banner */}
      <CTABanner />
    </main>
  );
}
