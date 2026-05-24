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
        <div className="flex flex-col justify-between h-full p-5 bg-[#070D19] rounded-2xl text-white border border-white/5 relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <div className="relative z-10 flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Analytics</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* Bar Chart with peak indicator */}
          <div className="relative z-10 flex items-end justify-between h-24 px-2 my-2">
            {[35, 55, 45, 90, 60].map((val, i) => (
              <div key={i} className="flex flex-col items-center w-5 relative group/bar">
                {i === 3 && (
                  <span className="absolute -top-6 text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-extrabold animate-bounce shadow">
                    Peak
                  </span>
                )}
                <div 
                  style={{ height: `${val}%` }} 
                  className={cn(
                    "w-full rounded-t transition-all duration-300",
                    i === 3 
                      ? "bg-gradient-to-t from-blue-600 to-indigo-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                      : "bg-slate-800 hover:bg-slate-700"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Metric details */}
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Weekly Revenue</div>
              <div className="text-xl font-extrabold font-mono mt-0.5 tracking-tight flex items-baseline gap-1.5">
                $24,812
                <span className="text-[10px] text-emerald-400 font-bold flex items-center">↑ 18.4%</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "staff":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#070D19] rounded-2xl text-white border border-white/5 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shift Roster</span>
            <span className="text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
              3 Active
            </span>
          </div>

          {/* Active staff roster list */}
          <div className="relative z-10 flex flex-col gap-2.5 my-2">
            {[
              { name: "Maria K.", role: "Manager", status: "Active", time: "9:15 AM", color: "bg-blue-600" },
              { name: "James R.", role: "Cashier", status: "Active", time: "10:00 AM", color: "bg-indigo-600" },
              { name: "Sofia M.", role: "Chef", status: "Break", time: "11:30 AM", color: "bg-amber-600" },
            ].map((staff, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-900/60 border border-white/5 p-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold uppercase shadow-sm", staff.color)}>
                    {staff.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white leading-tight">{staff.name}</div>
                    <div className="text-[8px] text-slate-400">{staff.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[8px] px-1.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide",
                    staff.status === "Active" 
                      ? "bg-emerald-500/15 text-emerald-400" 
                      : "bg-amber-500/15 text-amber-400"
                  )}>
                    {staff.status}
                  </span>
                  <div className="text-[7px] text-slate-500 mt-0.5">In: {staff.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "orders":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#070D19] rounded-2xl text-white border border-white/5 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kitchen Display</span>
            <span className="text-[8px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full font-extrabold animate-pulse">
              Ticket #08
            </span>
          </div>

          {/* KDS order checklist items */}
          <div className="relative z-10 flex flex-col gap-2 my-2">
            {[
              { item: "1x Classic Burger", detail: "Extra cheese", done: true },
              { item: "1x Truffle Fries", detail: "Spicy mayo", done: true },
              { item: "1x Chocolate Shake", detail: "Whip cream", done: false },
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-slate-200 leading-tight">{order.item}</div>
                  <div className="text-[8px] text-slate-400 mt-0.5">{order.detail}</div>
                </div>
                <span className={cn(
                  "h-4 w-4 rounded-full flex items-center justify-center text-[8px] border font-extrabold",
                  order.done 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : "bg-transparent border-slate-700 text-slate-500"
                )}>
                  {order.done ? "✓" : "○"}
                </span>
              </div>
            ))}
          </div>

          <button className="relative z-10 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white rounded-xl text-[10px] font-extrabold tracking-wider uppercase transition shadow-md shadow-indigo-600/10 cursor-pointer">
            BUMP TICKET
          </button>
        </div>
      );
    case "loyalty":
      return (
        <div className="flex flex-col justify-between h-full p-5 bg-[#070D19] rounded-2xl text-white border border-white/5 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer Profile</span>
            <span className="text-[8px] font-extrabold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase">
              GOLD MEMBER
            </span>
          </div>

          {/* Member Card Display */}
          <div className="relative z-10 bg-gradient-to-tr from-slate-900 to-slate-950 border border-white/5 p-3 rounded-xl my-1 shadow-inner">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-white leading-tight">Sarah Mitchell</div>
                <div className="text-[7px] text-slate-500 mt-0.5">ID: QX-9981-L</div>
              </div>
              <Award className="h-4.5 w-4.5 text-amber-400" />
            </div>
            <div className="mt-2.5">
              <div className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Points Balance</div>
              <div className="text-lg font-mono font-bold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
                3,412
                <span className="text-[7px] text-blue-400 font-normal lowercase">pts</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 mt-1">
            <div className="flex justify-between text-[8px] text-slate-400 mb-1 font-semibold">
              <span>88 pts to next reward</span>
              <span className="text-blue-400">Progress: 68%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full w-[68%] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" />
            </div>
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
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-20 border-y border-slate-100" ref={ref} id="platform-demo">
      <div className="site-container">
        {/* Header grid matching PDF Page 4 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start mb-16">
          <div className="space-y-4">
            <p className="text-blue-600 font-bold tracking-wider uppercase text-sm">PLATFORM DEMO</p>
            <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl leading-tight">
              KEEP THINGS FLOWING WITH THE ALL-IN-ONE POS
            </h2>
          </div>
          <div className="space-y-6 lg:pt-8">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
              Transform your business with Quantix's integrated software — designed to streamline operations, enhance customer experiences, and boost profitability through real-time insights.
            </p>
            <Link
              href="#features"
              className="inline-block rounded-full border border-slate-900 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-900 hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-md"
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
              className="group flex flex-col justify-between cursor-pointer"
            >
              {/* Mockup wrapper with 3D lift and soft shadows */}
              <div className="h-64 w-full rounded-2xl shadow-xl overflow-hidden mb-5 border border-slate-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                {Mockup({ type: card.mockupType })}
              </div>
              {/* Info text */}
              <div>
                <h3 className="text-lg font-syne font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed font-medium">{card.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformDemoSection;
