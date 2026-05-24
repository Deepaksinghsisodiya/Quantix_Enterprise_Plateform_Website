// src/app/(public)/api-docs/page.tsx
"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Terminal, Copy, Check, Play, Settings } from "lucide-react";
import Link from "next/link";

interface EndpointInfo {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  desc: string;
  curl: string;
  response: string;
}

const API_ENDPOINTS: Record<string, EndpointInfo> = {
  transactions: {
    method: "POST",
    path: "/v1/transactions",
    desc: "Create and authorize a raw checkout POS sale transaction. Card payloads are accepted securely under PCI standards.",
    curl: `curl -X POST https://api.quantixpos.com/v1/transactions \\
  -H "Authorization: Bearer qx_live_sk..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2599,
    "currency": "usd",
    "terminal_id": "term_retail_08",
    "items": [
      {
        "sku": "SKU-990-2A",
        "quantity": 1,
        "price": 2599
      }
    ],
    "payment_method": "card_present"
  }'`,
    response: `{
  "id": "txn_8820A1",
  "object": "transaction",
  "status": "succeeded",
  "amount": 2599,
  "currency": "usd",
  "terminal_id": "term_retail_08",
  "created_at": 1716654200
}`
  },
  inventory: {
    method: "GET",
    path: "/v1/inventory",
    desc: "Retrieve real-time SKU stock levels, variation parameters, warehouse margins, and barcodes listings.",
    curl: `curl -X GET https://api.quantixpos.com/v1/inventory \\
  -H "Authorization: Bearer qx_live_sk..." \\
  -G -d "sku=SKU-990-2A"`,
    response: `{
  "sku": "SKU-990-2A",
  "name": "Wireless Scanner Hub",
  "stock_level": 42,
  "reorder_threshold": 10,
  "price": 2599,
  "warehouse_id": "wh_north_01"
}`
  },
  terminals: {
    method: "GET",
    path: "/v1/terminals",
    desc: "List active physical POS checkout registers, current status logs, cellular handshakes, and employee session keys.",
    curl: `curl -X GET https://api.quantixpos.com/v1/terminals \\
  -H "Authorization: Bearer qx_live_sk..."`,
    response: `[
  {
    "id": "term_retail_08",
    "name": "Register Lanes 1",
    "status": "online",
    "connected_reader": "stripe_wise_e09",
    "cashier_session": "usr_cassier_99"
  }
]`
  }
};

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<string>("transactions");
  const [copied, setCopied] = useState<boolean>(false);

  const activeEndpoint = API_ENDPOINTS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEndpoint.curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PublicLayout>
      <Navbar />

      <div className="pt-20 bg-slate-950 text-white flex-1 flex flex-col">
        
        {/* Top Header */}
        <section className="border-b border-white/10 py-16 bg-slate-900/50">
          <div className="site-container flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-primary-light uppercase tracking-wider">
                <Terminal className="h-3.5 w-3.5" />
                <span>Quantix API REST Reference</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-syne font-black uppercase tracking-tight">Developer API Docs</h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                Connect external ERP systems, customized retail e-commerce sites, or proprietary bookkeeping tools to your physical POS checkout database in real time.
              </p>
            </div>
            
            {/* Quick Sandbox Link */}
            <div className="bg-slate-900 border border-white/5 p-4 rounded-2xl w-fit space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">API Sandbox</span>
              <Link
                href="/sign-up"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-primary/25 hover:scale-105 inline-block"
              >
                Generate Developer Keys
              </Link>
            </div>
          </div>
        </section>

        {/* API split layout */}
        <section className="flex-1 site-container grid grid-cols-1 lg:grid-cols-12 gap-8 py-16">
          
          {/* Sidebar navigation (4 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Core Endpoints</h3>
              <div className="space-y-1.5">
                {Object.keys(API_ENDPOINTS).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                      activeTab === key
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="capitalize">{key} API</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                      API_ENDPOINTS[key].method === "POST" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {API_ENDPOINTS[key].method}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Protocols */}
            <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl space-y-3">
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block">Websocket Sync</span>
              <h4 className="text-sm font-syne font-bold">Real-time local push</h4>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                Our active registers stream event listeners using WebSockets (`wss://stream.quantixpos.com`). Subscribe to cash drawer events, scanned barcodes, and terminal heartbeats.
              </p>
            </div>
          </div>

          {/* Code reference area (9 Cols) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Endpoint documentation (Column 1) */}
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md ${
                  activeEndpoint.method === "POST" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                  {activeEndpoint.method}
                </span>
                <span className="text-xs font-bold font-mono text-slate-300">
                  {activeEndpoint.path}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-syne font-bold uppercase">
                {activeTab} Endpoint
              </h2>

              <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
                {activeEndpoint.desc}
              </p>

              <hr className="border-white/5" />

              {/* Endpoint Parameters */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Request Headers</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2 font-mono">
                    <span className="text-slate-300">Authorization</span>
                    <span className="text-slate-500">Bearer &lt;API_KEY&gt;</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 font-mono">
                    <span className="text-slate-300">Content-Type</span>
                    <span className="text-slate-500">application/json</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Code block display (Column 2) */}
            <div className="space-y-4">
              
              {/* cURL Request */}
              <div className="bg-[#0b0e14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="flex items-center justify-between bg-slate-900/60 px-5 py-3 border-b border-white/5">
                  <span className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1.5">
                    <Play className="h-3 w-3 text-emerald-400" />
                    Request Shell
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-slate-500 hover:text-white transition"
                    aria-label="Copy code block"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="p-5 text-[10px] md:text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 bg-[#06080b]">
                  <code>{activeEndpoint.curl}</code>
                </pre>
              </div>

              {/* Response Block */}
              <div className="bg-[#0b0e14] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between bg-slate-900/60 px-5 py-3 border-b border-white/5">
                  <span className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1.5">
                    <Settings className="h-3 w-3 text-blue-400 animate-spin-slow" />
                    Response Body
                  </span>
                </div>
                <pre className="p-5 text-[10px] md:text-[11px] font-mono leading-relaxed overflow-x-auto text-slate-300 bg-[#06080b]">
                  <code>{activeEndpoint.response}</code>
                </pre>
              </div>

            </div>

          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}
