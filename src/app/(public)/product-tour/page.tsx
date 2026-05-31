// src/app/(public)/product-tour/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { 
  ShoppingBag, ShieldCheck, CreditCard, BarChart3, Package, BellRing, 
  FileSpreadsheet, ArrowLeft, ArrowRight, Play, CheckCircle2, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  x: number;
  y: number;
  label: string;
}

interface TourStep {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  hotspots: Hotspot[];
  previewComponent: (state: any, setState: any) => React.ReactNode;
}

export default function ProductTourPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [phase, setPhase] = useState<'intro' | 'tour' | 'complete'>('intro');

  // Simulated POS State
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([
    { name: 'Trufl Burger Extra', price: 16.99, qty: 1 },
    { name: 'Local craft IPA', price: 7.50, qty: 2 },
  ]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [inventoryStock, setInventoryStock] = useState([
    { item: 'Premium Buns', stock: 12, max: 200, status: 'Critical' },
    { item: 'Truffle Aioli', stock: 45, max: 100, status: 'Normal' },
  ]);
  const [orderAccepted, setOrderAccepted] = useState<boolean | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = discountApplied ? subtotal * 0.15 : 0;
  const total = subtotal - discountAmount;

  const steps: TourStep[] = [
    {
      title: 'Taking an Order',
      description: 'Tap our grid categories or direct items to build standard carts. Modifiers and order notes save instantly.',
      category: 'CHECKOUT',
      icon: <ShoppingBag size={15} />,
      hotspots: [
        { x: 30, y: 35, label: 'Menu Grid — tap any card to add it to the check' },
        { x: 75, y: 40, label: 'Shopping Cart — shows quantities, individual items, and modifiers' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between">
          <div className="p-4 bg-slate-900/40 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-bold text-white uppercase font-syne">TABLE #12 · REGISTER ONE</span>
            <span className="text-[9px] rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-bold uppercase">ACTIVE CART</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3 flex-1 overflow-y-auto">
            {/* Simulated Grid */}
            {[
              { name: 'Truffle Burger', price: 16.99 },
              { name: 'Craft IPA', price: 7.50 },
              { name: 'Sweet Potato Fries', price: 5.99 },
              { name: 'Avocado Toast', price: 11.20 },
              { name: 'Organic Matcha', price: 6.20 },
              { name: 'Espresso Double', price: 4.00 }
            ].map((prod) => (
              <button
                key={prod.name}
                onClick={() => {
                  setCart(prev => {
                    const exists = prev.find(i => i.name === prod.name);
                    if (exists) return prev.map(i => i.name === prod.name ? { ...i, qty: i.qty + 1 } : i);
                    return [...prev, { name: prod.name, price: prod.price, qty: 1 }];
                  });
                }}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex flex-col justify-between items-start text-left cursor-pointer transition-all active:scale-95"
              >
                <span className="text-[9px] font-bold text-slate-300 font-syne uppercase leading-tight line-clamp-1">{prod.name}</span>
                <span className="text-[9px] font-bold text-blue-400 mt-2">${prod.price}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-slate-805 bg-slate-950/60 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold uppercase text-[9px]">Tap grids to simulate additions</span>
            <span className="font-bold text-white uppercase font-syne text-[10px]">Subtotal: ${subtotal.toFixed(2)}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Applying a Discount',
      description: 'Manage promotion codes, coupon campaigns, and dynamic percentage margins with immediate checkout updates.',
      category: 'MARKETING ENGINE',
      icon: <ShieldCheck size={15} />,
      hotspots: [
        { x: 50, y: 50, label: 'Discount Control — click toggle to trigger promotional markdown rates' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider">Promotion Controls</h4>
            <p className="text-[10px] text-slate-400 leading-normal">
              Select or activate available discount codes directly from this terminal grid.
            </p>
            <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-white font-syne block">PROMO15 (15% OFF)</span>
                <span className="text-[9px] text-slate-500">Applicable to subtotal orders</span>
              </div>
              <button
                onClick={() => setDiscountApplied(!discountApplied)}
                className={`text-[9px] font-bold px-3.5 py-1.5 rounded-full cursor-pointer uppercase transition-all ${
                  discountApplied ? 'bg-emerald-500 text-slate-950' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {discountApplied ? 'APPLIED' : 'APPLY CODE'}
              </button>
            </div>
          </div>
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-850/80 space-y-1">
            <div className="flex justify-between text-[9px] text-slate-400 uppercase font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[9px] text-emerald-400 uppercase font-bold">
              <span>Discount (15%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-white font-black font-syne uppercase border-t border-slate-800 pt-1.5 mt-1.5">
              <span>Grand Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Processing Payment',
      description: 'Run virtual credit/debit authorizations, contactless Apple/Google Pay, split tender options, and cash transactions.',
      category: 'GATEWAY INTERCONNECT',
      icon: <CreditCard size={15} />,
      hotspots: [
        { x: 30, y: 40, label: 'Split Tender options for group bills' },
        { x: 70, y: 70, label: 'Process Credit Button — starts terminal payment loop' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider">Payment Terminal Checkout</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center font-bold text-[9px] uppercase tracking-wider text-slate-300">SPLIT BILL</button>
              <button className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center font-bold text-[9px] uppercase tracking-wider text-slate-300">CASH BILL</button>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              {paymentStatus === 'idle' && (
                <>
                  <CreditCard size={22} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-white uppercase font-syne">CHARGE ${total.toFixed(2)} TO TERMINAL</span>
                  <button
                    onClick={() => {
                      setPaymentStatus('processing');
                      setTimeout(() => setPaymentStatus('done'), 2000);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-4 py-2 rounded-full cursor-pointer uppercase"
                  >
                    TRIGGER CHIP READER
                  </button>
                </>
              )}
              {paymentStatus === 'processing' && (
                <>
                  <RefreshCw size={22} className="text-amber-400 animate-spin" />
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-syne">INSERT CARD / TAP CONTACTLESS</span>
                </>
              )}
              {paymentStatus === 'done' && (
                <>
                  <CheckCircle2 size={22} className="text-emerald-400 animate-bounce" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-syne">PAYMENT COMPLETED SECURELY</span>
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="text-[9px] text-slate-500 font-bold uppercase tracking-wider underline hover:text-slate-400 cursor-pointer"
                  >
                    RESET DEMO
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Viewing Dashboard',
      description: 'Explore live visual sales summaries, average check sizes, sector telemetry, and top inventory items.',
      category: 'TELEMETRY',
      icon: <BarChart3 size={15} />,
      hotspots: [
        { x: 35, y: 35, label: 'Sales Metrics Overview' },
        { x: 75, y: 65, label: 'Interactive Leaderboards' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider">Live Sales Analytics</h4>
              <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">● REALTIME SYNC</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Today\'s Net Revenue</span>
                <span className="text-sm font-bold text-white font-syne block mt-1">$4,850.20</span>
              </div>
              <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Average Ticket Size</span>
                <span className="text-sm font-bold text-white font-syne block mt-1">$38.45</span>
              </div>
            </div>

            {/* Simulated mini revenue chart */}
            <div className="bg-slate-950 border border-slate-850 p-3 rounded-2xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Hourly checkout load</span>
              <div className="flex justify-between items-end h-16 pt-2">
                {[10, 40, 25, 75, 55, 95, 60].map((val, idx) => (
                  <div key={idx} className="w-6 bg-blue-600/35 border-t border-blue-500 rounded-t" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Managing Inventory',
      description: 'Trace raw stock thresholds with low level warning alerts. Auto-generate supply orders.',
      category: 'INVENTORY HUB',
      icon: <Package size={15} />,
      hotspots: [
        { x: 30, y: 40, label: 'Stock Warning indicators' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider font-semibold">Stock Warnings</h4>
            <div className="space-y-2">
              {inventoryStock.map((stock, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-white uppercase font-syne block">{stock.item}</span>
                    <span className="text-[8px] text-slate-500">Stock Count: {stock.stock} / {stock.max}</span>
                  </div>
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded ${
                    stock.status === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {stock.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setInventoryStock(prev => prev.map(s => s.item === 'Premium Buns' ? { ...s, stock: 200, status: 'Normal' } : s));
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-3.5 rounded-full uppercase cursor-pointer transition-all active:scale-95"
            >
              TRIGGER AUTO-REORDER ORDER
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Online Order Alerts',
      description: 'Incoming e-delivery checkout alerts dispatch directly to KDS screens with accept/delay metrics.',
      category: 'OMNICHANNEL DIRECT',
      icon: <BellRing size={15} />,
      hotspots: [
        { x: 50, y: 55, label: 'Accept / Reject buttons to update delivery dispatcher schedules' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider">Omnichannel Alerts</h4>
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 animate-pulse">
                <BellRing size={16} />
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold text-white uppercase font-syne block">NEW DELIVERY ORDER AVAILABLE</span>
                <span className="text-[8px] text-slate-500 mt-1 block">John D. · Total: $32.40 (Via Web Portal)</span>
              </div>

              {orderAccepted === null ? (
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setOrderAccepted(true)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-bold text-[9px] py-2 rounded-full cursor-pointer uppercase"
                  >
                    ACCEPT
                  </button>
                  <button
                    onClick={() => setOrderAccepted(false)}
                    className="flex-1 border border-slate-850 hover:bg-slate-900 text-slate-400 font-bold text-[9px] py-2 rounded-full cursor-pointer uppercase"
                  >
                    REJECT
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <span className={`text-[10px] font-bold uppercase ${orderAccepted ? 'text-emerald-400' : 'text-red-400'}`}>
                    {orderAccepted ? '✓ ORDER DISPATCHED TO KDS' : '✗ ORDER REJECTED'}
                  </span>
                  <button
                    onClick={() => setOrderAccepted(null)}
                    className="text-[9px] text-slate-600 underline block mt-2 mx-auto hover:text-slate-400 cursor-pointer"
                  >
                    RESET SIMULATOR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'End-of-day Z-Report',
      description: 'Perform ledger closing audits with automatic card reconciliation checklists and local cache sweeps.',
      category: 'AUDIT & SHIFT END',
      icon: <FileSpreadsheet size={15} />,
      hotspots: [
        { x: 30, y: 40, label: 'Shift Sales summary aggregates' }
      ],
      previewComponent: () => (
        <div className="h-full flex flex-col justify-between p-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase font-syne tracking-wider font-semibold">Close Register Z-Report</h4>
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2 text-[9px] text-slate-400 font-medium">
              <div className="flex justify-between">
                <span>Total Cash Transactions</span>
                <span className="text-white font-bold">$1,240.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total Card Authorizations</span>
                <span className="text-white font-bold">$3,610.20</span>
              </div>
              <div className="flex justify-between">
                <span>Collected Taxes</span>
                <span className="text-white font-bold">$388.00</span>
              </div>
              <div className="flex justify-between border-t border-slate-850 pt-2 text-[10px] font-black text-white uppercase font-syne">
                <span>Grand Aggregate</span>
                <span className="text-blue-400">$5,238.20</span>
              </div>
            </div>

            <button
              onClick={() => alert('Z-Report Printed! Safe cash drawer drawer popped.')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-3.5 rounded-full uppercase cursor-pointer"
            >
              CLOSE DRAWER & PRINT LEDGER
            </button>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];

  const startTour = () => {
    setPhase('tour');
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep >= steps.length - 1) {
      setPhase('complete');
    } else {
      setCurrentStep(prev => prev + 1);
    }
    setActiveHotspot(null);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setActiveHotspot(null);
  };

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        {/* Intro view */}
        {phase === 'intro' && (
          <div className="site-container max-w-lg text-center py-20 space-y-6">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-md">
              <Play size={24} className="fill-blue-500 dark:fill-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase tracking-tight leading-tight text-slate-900 dark:text-white">
              POS Product Tour
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Explore the entire POS transaction workflow with our live, interactive virtual iPad terminal. No details missed.
            </p>
            <button
              onClick={startTour}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-full transition-all cursor-pointer shadow-lg shadow-blue-500/15 uppercase tracking-wider"
            >
              Start Interactive Tour
            </button>
          </div>
        )}

        {/* Active Tour View */}
        {phase === 'tour' && current && (
          <div className="site-container max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Metadata + Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1 rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                  {current.icon} {current.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-syne font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                  {current.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {current.description}
                </p>
              </div>

              {/* Progress and indicators */}
              <div className="bg-gray-50 dark:bg-slate-900/20 border border-gray-200 dark:border-slate-850 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                  <span>Progress bar</span>
                  <span>{currentStep + 1} of {steps.length}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                </div>
              </div>

              {/* Hotspot details trigger */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Terminal Hotspot Zones:</span>
                <div className="space-y-2">
                  {current.hotspots.map((hot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold uppercase transition-all cursor-pointer flex justify-between items-center ${
                        activeHotspot === idx ? 'bg-blue-600/10 border-blue-500 text-blue-500 dark:text-blue-400' : 'bg-gray-50 dark:bg-slate-900/10 border-gray-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-800'
                      }`}
                    >
                      <span>{hot.label.split(' — ')[0]}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">➔</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-850/60">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="flex-1 border border-gray-300 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold text-xs py-3.5 rounded-full uppercase tracking-wider transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-full uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                >
                  {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}
                </button>
              </div>
            </div>

            {/* Right Column: Virtual POS Terminal Mockup */}
            <div className="lg:col-span-8">
              <div className="relative rounded-[32px] border-8 border-gray-300 dark:border-slate-800 bg-slate-950 aspect-[4/3] w-full shadow-2xl shadow-blue-500/5 overflow-hidden flex flex-col justify-between">
                {/* Simulated iPad Screen Content */}
                <div className="absolute inset-0 bg-slate-950 text-slate-100 font-sans select-none">
                  {current.previewComponent(null, null)}
                </div>

                {/* Hotspot Layer Overlay */}
                {current.hotspots.map((hotspot, idx) => (
                  <div
                    key={idx}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-40"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                        activeHotspot === idx 
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/25 scale-110 shadow-lg' 
                          : 'bg-blue-500/80 text-white hover:bg-blue-600 animate-pulse'
                      }`}
                    >
                      {idx + 1}
                    </button>

                    {/* Tooltip Popup */}
                    <AnimatePresence>
                      {activeHotspot === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 rounded-xl border border-gray-250 dark:border-slate-800 bg-white dark:bg-slate-950/95 p-3 text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 shadow-xl backdrop-blur-md z-50 text-center"
                        >
                          {hotspot.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tour Completed View */}
        {phase === 'complete' && (
          <div className="site-container max-w-lg text-center py-20 space-y-6">
            <div className="mx-auto h-16 w-16 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-md">
              <CheckCircle2 size={24} className="animate-bounce" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase tracking-tight leading-tight text-slate-900 dark:text-white">
              Tour Completed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              You have experienced the full transaction loop. Ready to launch with your own store inventory?
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Link href="/sign-up">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-4 rounded-full transition-all cursor-pointer uppercase tracking-wider">
                  Start Free Trial
                </button>
              </Link>
              <button
                onClick={() => setPhase('intro')}
                className="w-full border border-gray-300 dark:border-slate-850 hover:bg-gray-100 dark:hover:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold text-xs py-4 rounded-full transition-all cursor-pointer uppercase tracking-wider"
              >
                Restart Product Tour
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </PublicLayout>
  );
}
