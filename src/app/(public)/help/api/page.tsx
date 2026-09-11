// src/app/(public)/help/api/page.tsx
'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Terminal, Copy, Check, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const API_SECTIONS = [
  {
    id: 'auth',
    title: 'Authentication',
    method: 'POST',
    path: '/api/v1/auth/token',
    desc: 'Exchange your merchant API secret key for a dynamic bearer access token.',
    payload: '{\n  "apiKey": "qx_live_559f939e0ac5...",\n  "merchantId": "mch_8820"\n}',
    response: '{\n  "accessToken": "eyJhbGciOi...",\n  "expiresIn": 3600,\n  "tokenType": "Bearer"\n}'
  },
  {
    id: 'sales',
    title: 'Post Transaction',
    method: 'POST',
    path: '/api/v1/transactions',
    desc: 'Submit a new checkout receipt transaction to trigger cloud inventory sync schedules.',
    payload: '{\n  "terminalId": "trm_991",\n  "amount": 49.99,\n  "currency": "USD",\n  "items": [\n    { "sku": "SKU-990", "quantity": 1, "price": 49.99 }\n  ]\n}',
    response: '{\n  "status": "success",\n  "transactionId": "tx_88019",\n  "syncTime": "2026-05-31T20:15:00Z"\n}'
  },
  {
    id: 'inventory',
    title: 'List Inventory',
    method: 'GET',
    path: '/api/v1/inventory/items',
    desc: 'Retrieve paginated inventory quantities matching active outlet warehouse IDs.',
    payload: 'Query parameters:\n?limit=10&offset=0&warehouseId=wh_2',
    response: '{\n  "items": [\n    { "sku": "SKU-990", "stock": 420, "name": "Standard Billing Terminal" }\n  ],\n  "total": 1\n}'
  }
];

export default function HelpAPIDocsPage() {
  const [activeEndpointTab, setActiveEndpointTab] = useState<string>('auth');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeDoc = API_SECTIONS.find(s => s.id === activeEndpointTab) || API_SECTIONS[0];

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success('Copied mock payload template!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container px-4 sm:px-0">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/help" className="hover:text-blue-500 transition-colors">Help Centre</Link>
            <ChevronRight size={10} />
            <span className="text-slate-600 dark:text-slate-400">Developer API</span>
          </div>

          <div className="flex items-center gap-2.5 mb-10">
            <Link href="/help">
              <span className="h-8 w-8 rounded-full border border-gray-300 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all cursor-pointer">
                <ArrowLeft size={14} />
              </span>
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">DEVELOPER PORTAL</span>
              <h1 className="text-2xl sm:text-4xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
                REST API Documentation
              </h1>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: API Sidebar selector */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">Endpoints catalog</span>
              {API_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveEndpointTab(sec.id)}
                  className={cn(
                    "w-full text-left rounded-2xl p-4 border transition-all cursor-pointer flex justify-between items-center",
                    activeEndpointTab === sec.id
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10"
                      : "bg-gray-50/50 dark:bg-slate-900/20 border-gray-250 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-blue-500/30"
                  )}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase block tracking-tight">{sec.title}</span>
                    <span className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded font-mono",
                      sec.method === 'POST' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'
                    )}>
                      {sec.method} {sec.path}
                    </span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              ))}

              <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-800 p-5 mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <ShieldCheck size={14} className="text-blue-500" /> Security Standards
                </h4>
                <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                  We secure transaction queries using SHA-256 HMAC digital signatures and rate limit registers queries at 120 calls/minute.
                </p>
              </div>
            </div>

            {/* Right Column: Code block reader */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl border border-gray-250 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/30 p-6 sm:p-8 relative overflow-hidden space-y-6">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                
                <div className="space-y-2">
                  <h2 className="text-base sm:text-xl font-syne font-black uppercase text-slate-900 dark:text-white">
                    {activeDoc.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 font-medium leading-relaxed">
                    {activeDoc.desc}
                  </p>
                </div>

                {/* HTTP Request URL */}
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-900 flex justify-between items-center text-white font-mono text-[11px]">
                  <span>
                    <span className={cn(
                      "font-black mr-2",
                      activeDoc.method === 'POST' ? 'text-emerald-400' : 'text-blue-400'
                    )}>
                      {activeDoc.method}
                    </span>
                    https://api.quantixpos.com{activeDoc.path}
                  </span>
                  <button 
                    onClick={() => handleCopy(`https://api.quantixpos.com${activeDoc.path}`, 'url')}
                    className="h-7 w-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    {copiedId === 'url' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>

                {/* Payload Schema */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block flex items-center gap-1.5">
                    <Terminal size={12} /> Request Payload template
                  </span>
                  <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-900">
                    <pre className="text-white font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {activeDoc.payload}
                    </pre>
                    <button 
                      onClick={() => handleCopy(activeDoc.payload, 'payload')}
                      className="absolute top-3 right-3 h-7 w-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedId === 'payload' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {/* Response Schema */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block flex items-center gap-1.5">
                    <Cpu size={12} /> Response payload schema
                  </span>
                  <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-900">
                    <pre className="text-white font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {activeDoc.response}
                    </pre>
                    <button 
                      onClick={() => handleCopy(activeDoc.response, 'response')}
                      className="absolute top-3 right-3 h-7 w-7 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedId === 'response' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
