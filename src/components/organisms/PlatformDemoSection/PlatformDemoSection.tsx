"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { BarChart3, Clock, Utensils, Award, Users } from "lucide-react";

export interface DemoCard {
  id: string;
  mockupType: "analytics" | "staff" | "orders" | "loyalty";
  title: string;
  caption: string;
}

const CARDS: DemoCard[] = [
  {
    id: "analytics",
    mockupType: "analytics",
    title: "See top-performing items",
    caption: "Live revenue analytics, product rankings, and peak hour detection.",
  },
  {
    id: "staff",
    mockupType: "staff",
    title: "Manage staff & scheduling",
    caption: "Clock-ins, shift scheduling, payroll reports and labor cost tracking.",
  },
  {
    id: "orders",
    mockupType: "orders",
    title: "Keep all orders in one place",
    caption: "Real-time order management with instant kitchen display sync.",
  },
  {
    id: "loyalty",
    mockupType: "loyalty",
    title: "Turn guests into regulars",
    caption: "Built-in loyalty program with tiers, points, and targeted promotions.",
  },
];

/** Detailed high-fidelity mockup cards matching PDF Page 4 */
const Mockup = ({ type }: { type: DemoCard["mockupType"] }) => {
  switch (type) {
    case "analytics":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#0B1528] rounded-xl text-white">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Weekly Revenue</span>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </div>
          {/* Bar Chart */}
          <div className="flex items-end justify-between h-20 px-2 my-4">
            <div className="w-4 h-12 bg-blue-900/40 rounded-t" />
            <div className="w-4 h-16 bg-blue-900/40 rounded-t" />
            <div className="w-4 h-10 bg-blue-900/40 rounded-t" />
            <div className="w-4 h-24 bg-blue-500 rounded-t shadow-lg shadow-blue-500/30" />
            <div className="w-4 h-14 bg-blue-900/40 rounded-t" />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xl font-bold font-mono">$24,812</div>
              <div className="text-[10px] text-emerald-400 font-medium">↑ 18.4% this week</div>
            </div>
            <span className="text-[9px] text-gray-500">Updated 1m ago</span>
          </div>
        </div>
      );
    case "staff":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#0B1528] rounded-xl text-white">
          <div className="flex justify-center items-center my-1.5 flex-col">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/20">
              <Users className="h-5 w-5" />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-white">Maria K.</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Clocked in at 9:15 AM</div>
            </div>
          </div>
          {/* Grid of staff */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["James", "Sofia", "Raj", "Ana"].map((name) => (
              <div key={name} className="bg-slate-900/60 text-[10px] text-slate-300 py-1.5 px-2 rounded-lg text-center font-bold">
                {name}
              </div>
            ))}
          </div>
        </div>
      );
    case "orders":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#0B1528] rounded-xl text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-200">Order #568</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          {/* Order list */}
          <div className="space-y-2.5 my-2 text-xs">
            {[
              { name: "Classic Burger", price: "$12.99" },
              { name: "Truffle Fries", price: "$6.50" },
              { name: "Choc. Shake", price: "$5.25" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[9px] font-bold">🍔</span>
                  <span className="font-semibold">{item.name}</span>
                </div>
                <span className="font-mono text-slate-400">{item.price}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer">
            SEND TO KITCHEN
          </button>
        </div>
      );
    case "loyalty":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#0B1528] rounded-xl text-white">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          {/* User info */}
          <div>
            <div className="text-xs font-bold">Sarah Mitchell</div>
            <div className="text-[10px] text-slate-400">Member since 2022</div>
          </div>
          {/* Points */}
          <div className="my-1.5">
            <div className="text-[9px] uppercase text-slate-500 font-bold tracking-wider">Points Balance</div>
            <div className="text-xl font-bold text-white tracking-tight mt-0.5">3,412</div>
            <div className="mt-2">
              <div className="flex justify-between text-[8px] text-slate-400 mb-1 font-semibold">
                <span>68% to next reward</span>
                <span className="text-blue-400">Gold Tier</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 mt-1">
            <button className="flex-1 py-1.5 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold transition cursor-pointer">
              History
            </button>
            <button className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition cursor-pointer">
              Redeem
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const PlatformDemoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="bg-white py-20" ref={ref} id="platform-demo">
      <div className="site-container">
        {/* Header grid matching PDF Page 4 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start mb-16">
          <div className="space-y-4">
            <p className="text-blue-600 font-bold tracking-wider uppercase text-sm">PLATFORM DEMO</p>
            <h2 className="text-3xl font-display font-black text-gray-900 md:text-5xl leading-tight">
              KEEP THINGS FLOWING WITH THE ALL-IN-ONE POS
            </h2>
          </div>
          <div className="space-y-6 lg:pt-8">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Transform your business with Quantix's integrated software — designed to streamline operations, enhance customer experiences, and boost profitability through real-time insights.
            </p>
            <Link
              href="#features"
              className="inline-block rounded-full border border-slate-900 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-50 transition cursor-pointer"
            >
              Explore Features →
            </Link>
          </div>
        </div>

        {/* 4-column cards row below the header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              custom={idx}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col justify-between"
            >
              {/* Mockup wrapper */}
              <div className="h-56 w-full rounded-2xl shadow-xl overflow-hidden mb-5">
                {Mockup({ type: card.mockupType })}
              </div>
              {/* Info text */}
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{card.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformDemoSection;
