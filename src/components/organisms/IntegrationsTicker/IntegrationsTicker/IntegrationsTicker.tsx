'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CreditCard, Monitor, Truck, ArrowRight } from 'lucide-react';

const RETAIL_INTEGRATIONS = [
  { name: 'Stripe Payments', desc: 'Card readers & payouts', icon: CreditCard },
  { name: 'Square Terminal', desc: 'Hardware register bridge', icon: Monitor },
  { name: 'Authorize.Net', desc: 'Merchant gateway', icon: ShieldCheck },
  { name: 'PayPal Express', desc: 'Digital wallet checkout', icon: CreditCard },
];

export const IntegrationsTicker: React.FC = () => {
  return (
    <section className="py-10 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="site-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">CONNECTED ECOSYSTEM</span>
            <h3 className="font-syne font-black text-xl text-slate-900 dark:text-white">Seamless Payment & Hardware Integrations</h3>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {RETAIL_INTEGRATIONS.map((item) => (
              <div key={item.name} className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <item.icon size={16} className="text-primary" />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{item.name}</span>
              </div>
            ))}
            <Link
              href="/integrations"
              className="flex items-center gap-1 text-xs font-extrabold text-primary hover:underline ml-2"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsTicker;
