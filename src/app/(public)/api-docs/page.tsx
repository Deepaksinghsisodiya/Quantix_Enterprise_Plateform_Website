// src/app/(public)/api-docs/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  Play,
  Settings,
  Sparkles,
  Code2,
  Globe,
  Shield,
  Zap,
  Flame,
  Radio,
  Server,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import CTABanner from '@/components/organisms/CTABanner/CTABanner';
import { toast } from 'sonner';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type SdkLang = 'curl' | 'node' | 'python';

interface EndpointDoc {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  category: string;
  desc: string;
  headers: Record<string, string>;
  snippets: {
    curl: string;
    node: string;
    python: string;
  };
  response: string;
  latency: string;
}

const ENDPOINTS: EndpointDoc[] = [
  {
    id: 'txns',
    name: 'Authorize POS Sale',
    method: 'POST',
    path: '/v1/transactions/authorize',
    category: 'Billing & Checkout',
    desc: 'Authorize and settle a live checkout transaction. Supports EMV tokenized card charges, multi-tender split tenders, and branch-level invoice sequences.',
    headers: {
      Authorization: 'Bearer qx_live_sk_882910...',
      'Content-Type': 'application/json',
      'Idempotency-Key': 'idem_98234-88192',
    },
    snippets: {
      curl: `curl -X POST https://api.quantixpos.com/v1/transactions/authorize \\
  -H "Authorization: Bearer qx_live_sk_882910..." \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: idem_98234-88192" \\
  -d '{
    "terminal_id": "NYC-TILL-01",
    "amount_cents": 4250,
    "currency": "usd",
    "payment_method": "EMV_P2PE_TOKEN",
    "p2pe_token": "tok_visa_8921a",
    "items": [
      { "sku": "BEV-COLD-BREW", "qty": 2, "unit_price": 500 },
      { "sku": "BAK-CROISSANT", "qty": 1, "unit_price": 450 }
    ]
  }'`,
      node: `import { Quantix } from '@quantix/node-sdk';

const client = new Quantix({ apiKey: process.env.QUANTIX_SECRET_KEY });

const txn = await client.transactions.authorize({
  terminalId: 'NYC-TILL-01',
  amountCents: 4250,
  currency: 'USD',
  paymentMethod: 'EMV_P2PE_TOKEN',
  p2peToken: 'tok_visa_8921a',
  items: [
    { sku: 'BEV-COLD-BREW', qty: 2, unitPrice: 500 }
  ]
}, { idempotencyKey: 'idem_98234-88192' });`,
      python: `import quantix

client = quantix.Client(api_key="qx_live_sk_882910...")

txn = client.transactions.authorize(
    terminal_id="NYC-TILL-01",
    amount_cents=4250,
    currency="USD",
    payment_method="EMV_P2PE_TOKEN",
    p2pe_token="tok_visa_8921a",
    items=[{"sku": "BEV-COLD-BREW", "qty": 2, "unit_price": 500}],
    idempotency_key="idem_98234-88192"
)`,
    },
    response: `{
  "id": "txn_8820A1_settled",
  "status": "succeeded",
  "terminal_id": "NYC-TILL-01",
  "branch_id": "LOC-NYC-HQ",
  "amount_gross": 42.50,
  "tax_amount": 3.48,
  "currency": "USD",
  "auth_code": "AUTH_9021",
  "created_at": 1716654200
}`,
    latency: '18ms',
  },
  {
    id: 'inventory-matrix',
    name: 'Query Matrix Stock',
    method: 'GET',
    path: '/v1/inventory/matrix',
    category: 'Inventory & Stock',
    desc: 'Retrieve real-time multi-branch stock levels, active reorder points, warehouse allocations, and unit shrinkage variances.',
    headers: {
      Authorization: 'Bearer qx_live_sk_882910...',
      'Accept-Encoding': 'gzip',
    },
    snippets: {
      curl: `curl -X GET "https://api.quantixpos.com/v1/inventory/matrix?sku=RAW-COFFEE-10KG" \\
  -H "Authorization: Bearer qx_live_sk_882910..."`,
      node: `const stock = await client.inventory.getMatrix({
  sku: 'RAW-COFFEE-10KG',
  includeWarehouses: true
});`,
      python: `stock = client.inventory.get_matrix(
    sku="RAW-COFFEE-10KG",
    include_warehouses=True
)`,
    },
    response: `{
  "sku": "RAW-COFFEE-10KG",
  "total_stock": 340,
  "reorder_threshold": 50,
  "branches": [
    { "branch_id": "LOC-NYC-01", "on_hand": 85, "allocated": 12 },
    { "branch_id": "LOC-MIA-04", "on_hand": 45, "allocated": 0 }
  ],
  "central_warehouse": { "on_hand": 210, "safety_stock": 60 }
}`,
    latency: '12ms',
  },
  {
    id: 'transfers',
    name: 'Dispatch Stock Transfer',
    method: 'POST',
    path: '/v1/transfers/dispatch',
    category: 'Inventory & Stock',
    desc: 'Create an audited inter-branch stock transfer work order with dispatch barcode scanning and automated destination check-in.',
    headers: {
      Authorization: 'Bearer qx_live_sk_882910...',
      'Content-Type': 'application/json',
    },
    snippets: {
      curl: `curl -X POST https://api.quantixpos.com/v1/transfers/dispatch \\
  -H "Authorization: Bearer qx_live_sk_882910..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin_warehouse": "WH-CENTRAL-01",
    "destination_branch": "LOC-SFO-02",
    "sku": "RAW-COFFEE-10KG",
    "quantity": 20,
    "verified_by_barcode": true
  }'`,
      node: `const transfer = await client.transfers.dispatch({
  originWarehouse: 'WH-CENTRAL-01',
  destinationBranch: 'LOC-SFO-02',
  sku: 'RAW-COFFEE-10KG',
  quantity: 20,
  verifiedByBarcode: true
});`,
      python: `transfer = client.transfers.dispatch(
    origin_warehouse="WH-CENTRAL-01",
    destination_branch="LOC-SFO-02",
    sku="RAW-COFFEE-10KG",
    quantity=20,
    verified_by_barcode=True
)`,
    },
    response: `{
  "transfer_id": "TRF-2026-0988",
  "status": "IN_TRANSIT",
  "origin": "WH-CENTRAL-01",
  "destination": "LOC-SFO-02",
  "dispatched_units": 20,
  "qr_tracking_code": "trk_990182a",
  "estimated_arrival": "2026-08-27T10:00:00Z"
}`,
    latency: '24ms',
  },
  {
    id: 'price-overrides',
    name: 'Push Price Override',
    method: 'POST',
    path: '/v1/catalog/price-overrides',
    category: 'Master Catalog',
    desc: 'Push localized pricing and regional sales tax rules to selected store clusters without modifying parent SKU definitions.',
    headers: {
      Authorization: 'Bearer qx_live_sk_882910...',
      'Content-Type': 'application/json',
    },
    snippets: {
      curl: `curl -X POST https://api.quantixpos.com/v1/catalog/price-overrides \\
  -H "Authorization: Bearer qx_live_sk_882910..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "BEV-NITRO-COLD",
    "branch_ids": ["LOC-NYC-01", "LOC-NYC-02"],
    "override_price": 5.25,
    "effective_from": "2026-09-01T00:00:00Z"
  }'`,
      node: `const override = await client.catalog.applyPriceOverride({
  sku: 'BEV-NITRO-COLD',
  branchIds: ['LOC-NYC-01', 'LOC-NYC-02'],
  overridePrice: 5.25
});`,
      python: `override = client.catalog.apply_price_override(
    sku="BEV-NITRO-COLD",
    branch_ids=["LOC-NYC-01", "LOC-NYC-02"],
    override_price=5.25
)`,
    },
    response: `{
  "status": "APPLIED_BROADCAST",
  "sku": "BEV-NITRO-COLD",
  "branches_updated": 2,
  "latency_ms": 140,
  "push_state": "SYNCHRONIZED_LOCAL_TILLS"
}`,
    latency: '140ms',
  },
  {
    id: 'terminals-health',
    name: 'Terminal Heartbeat & Sync',
    method: 'GET',
    path: '/v1/terminals/health',
    category: 'Hardware & Telemetry',
    desc: 'Ping all active register machines, KDS screens, and LAN receipt printers across franchise branches to verify offline queue buffers and firmware state.',
    headers: {
      Authorization: 'Bearer qx_live_sk_882910...',
    },
    snippets: {
      curl: `curl -X GET https://api.quantixpos.com/v1/terminals/health \\
  -H "Authorization: Bearer qx_live_sk_882910..."`,
      node: `const health = await client.terminals.getHealthStatus();`,
      python: `health = client.terminals.get_health_status()`,
    },
    response: `{
  "total_terminals": 48,
  "online_count": 48,
  "offline_sync_pending": 0,
  "mesh_router_health": "OPTIMAL",
  "p2pe_vault_status": "ARMED",
  "avg_ping_ms": 14
}`,
    latency: '8ms',
  },
];

export default function ApiDocsPage() {
  const [activeEndpointId, setActiveEndpointId] = useState<string>('txns');
  const [activeLang, setActiveLang] = useState<SdkLang>('curl');
  const [copied, setCopied] = useState<boolean>(false);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const endpoint = ENDPOINTS.find((e) => e.id === activeEndpointId) || ENDPOINTS[0];

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(endpoint.snippets[activeLang]);
      setCopied(true);
      toast.success(`${activeLang.toUpperCase()} code copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTestRequest = () => {
    setSimRunning(true);
    setSimOutput(null);
    toast.info(`Sending live test request to ${endpoint.path}...`);
    setTimeout(() => {
      setSimRunning(false);
      setSimOutput(endpoint.response);
      toast.success(`200 OK: Received response in ${endpoint.latency}!`);
    }, 600);
  };

  return (
    <>
      {/* 1. Hero Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">API Documentation</span>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-syne font-black uppercase tracking-wider text-primary dark:text-primary-light shadow-xs">
              <Flame size={13} className="text-primary" />
              <span>Developer Reference v1.4 (OAS 3.1)</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight tracking-tight">
              REST & Webhook API Telemetry
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Integrate Quantix registers with ERP data lakes (SAP, NetSuite, QuickBooks), custom BI reporting pipelines, and automated supplier inventory feeds.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 font-mono font-bold text-slate-700 dark:text-slate-300">
                ⚡ Base URL: <strong className="text-primary">https://api.quantixpos.com</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 font-mono font-bold text-slate-700 dark:text-slate-300">
                🔒 Auth: Bearer API Keys & HMAC Webhooks
              </span>
            </div>

            {/* 3D Blueprint Visual Showcase */}
            <div className="relative w-full max-w-lg mx-auto aspect-16/10 flex items-center justify-center pt-2">
              <img
                src="/images/ent_guide_blueprint.png"
                alt="Enterprise POS API Architecture Blueprint"
                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive API Explorer & Terminal Playground */}
      <section className="section-py bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (4 Cols): Endpoints Navigation Menu */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-darkSurface/70 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
                <p className="text-xs font-syne font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Available Endpoints
                </p>

                <div className="space-y-1.5">
                  {ENDPOINTS.map((ep) => {
                    const isActive = activeEndpointId === ep.id;

                    return (
                      <button
                        key={ep.id}
                        type="button"
                        onClick={() => {
                          setActiveEndpointId(ep.id);
                          setSimOutput(null);
                        }}
                        className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer border ${
                          isActive
                            ? 'bg-primary border-primary text-white shadow-xs'
                            : 'bg-slate-50 dark:bg-darkBg/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                        }`}
                      >
                        <div className="truncate mr-2">
                          <p className="font-syne font-bold leading-tight">{ep.name}</p>
                          <p className={`text-[10px] font-mono mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                            {ep.path}
                          </p>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-black px-2 py-0.5 rounded ${
                            ep.method === 'POST'
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                              : 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Webhook Stream Hint Card */}
              <div className="p-5 rounded-3xl bg-linear-to-br from-primary/5 via-slate-50 to-white dark:from-primary/10 dark:via-darkBg dark:to-darkSurface/50 border border-primary/20 space-y-2">
                <div className="flex items-center gap-2 text-primary font-syne font-black text-xs uppercase tracking-wider">
                  <Terminal size={14} />
                  <span>Realtime WebSocket Firehose</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Connect to <code className="text-primary font-mono font-bold">wss://stream.quantixpos.com</code> for instant cash drawer triggers and barcode scan events.
                </p>
              </div>
            </div>

            {/* Right Column (8 Cols): Code Playground & Interactive Execution */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Endpoint Documentation Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-darkSurface/70 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary-light to-amber-500" />

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-md ${
                        endpoint.method === 'POST'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {endpoint.path}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-darkBg px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                    Category: {endpoint.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-syne text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    {endpoint.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {endpoint.desc}
                  </p>
                </div>

                {/* Headers Table */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">
                    Required Request Headers:
                  </p>
                  <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-darkBg/60 p-3 space-y-1.5 font-mono text-xs">
                    {Object.entries(endpoint.headers).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{k}</span>
                        <span className="text-slate-400 truncate max-w-60 sm:max-w-none">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Tabs & Live Console */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {(['curl', 'node', 'python'] as SdkLang[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveLang(lang)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer border ${
                            activeLang === lang
                              ? 'bg-primary border-primary text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-darkBg border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/40'
                          }`}
                        >
                          {lang === 'curl' ? 'cURL' : lang === 'node' ? 'Node.js' : 'Python'}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-darkBg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Box */}
                  <div className="rounded-2xl bg-[#0b0e14] border border-slate-800 overflow-hidden shadow-lg">
                    <pre className="p-4 sm:p-5 text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 bg-[#06080b]">
                      <code>{endpoint.snippets[activeLang]}</code>
                    </pre>
                  </div>

                  {/* Test Request Trigger Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={simRunning}
                      onClick={handleTestRequest}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      {simRunning ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} className="fill-white" />}
                      <span>{simRunning ? 'Executing Request...' : 'Send Live Test Request'}</span>
                    </button>

                    <span className="text-[11px] font-mono text-slate-400">
                      Average Edge Response: <strong className="text-emerald-500">{endpoint.latency}</strong>
                    </span>
                  </div>

                  {/* Simulated Response Box */}
                  {(simOutput || simRunning) && (
                    <div className="rounded-2xl bg-[#0b0e14] border border-slate-800 overflow-hidden shadow-lg space-y-1 mt-3">
                      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Settings size={12} className="text-primary" />
                          <span>Response Payload</span>
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                          200 OK ({endpoint.latency})
                        </span>
                      </div>
                      <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-slate-300 bg-[#06080b]">
                        <code>{simOutput}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom CTABanner */}
      <CTABanner />
    </>
  );
}
