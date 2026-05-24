import React, { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGetPricingPlansQuery, PricingPlan } from '@/redux/services/pricingApi';
import { Check, Headset, Sparkles } from 'lucide-react';

export const PricingSection = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro');
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };
  
  const { data: plans = [], isLoading } = useGetPricingPlansQuery();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const ctaRef = React.useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  // fallback dummy data if API not yet ready
  const dummyPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      interval: 'monthly',
      priceMonthly: 0,
      priceSuffix: ' 3 days, no card',
      description: 'Full access to all features. No credit card required.',
      features: [
        'Full platform access',
        '1 location',
        '2 staff accounts',
        '100 transactions',
        'Basic analytics',
        'Email support'
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 50,
      interval: 'monthly',
      priceMonthly: 50,
      priceSuffix: '/month',
      description: 'Perfect for small retailers and single-location restaurants.',
      features: [
        'Everything in Free Trial',
        '1 location',
        '5 staff accounts',
        'Unlimited transactions',
        'Inventory management',
        'Loyalty program',
        'Standard reports',
        'Email & chat support'
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 100,
      interval: 'monthly',
      priceMonthly: 100,
      priceSuffix: '/month',
      description: 'For growing businesses with multiple staff and advanced needs.',
      features: [
        'Everything in Starter',
        'Up to 3 locations',
        'Unlimited staff',
        'Advanced analytics & BI',
        'Kitchen Display System',
        'Online ordering sync',
        'API access',
        'Custom receipt branding',
        'Priority 24/7 support'
      ],
      mostPopular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0,
      interval: 'monthly',
      priceMonthly: 0,
      priceSuffix: '',
      description: 'For large chains, franchises, and businesses with unique needs.',
      features: [
        'Everything in Professional',
        'Unlimited locations',
        'Dedicated account manager',
        'Enterprise integrations',
        'White-label options',
        'SLA guarantee',
        'On-site training',
        'Tailored contracts & billing'
      ],
      custom: true,
    },
  ];

  const pricingPlans = isLoading ? dummyPlans : plans.length ? plans : dummyPlans;

  // calculate annual price if not provided (16% discount)
  const getAnnualPrice = (monthly: number) => Math.round(monthly * 12 * 0.84);

  const gridVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <>
      {/* Main Pricing Cards section */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/20 to-white border-t border-slate-100" ref={ref} id="pricing">
        <div className="site-container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
              PRICING
            </div>
            <h2 className="text-3xl font-syne font-black tracking-tight text-gray-900 sm:text-5xl uppercase leading-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Start free. Scale as you grow. No hidden fees, ever.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center rounded-full bg-slate-100/60 p-1 border border-slate-200/40 shadow-inner">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={cn(
                  'rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer',
                  billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={cn(
                  'rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                  billing === 'annual' ? 'bg-white text-gray-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                )}
              >
                Annual
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-600 uppercase tracking-wide">
                  Save 16%
                </span>
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <motion.div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={gridVariants}
          >
            {isLoading && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-slate-100 p-6 animate-pulse bg-white flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="h-8 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded mt-8" />
              </div>
            ))}
            
            {!isLoading && pricingPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={cn(
                    'rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 relative cursor-pointer group hover:-translate-y-2',
                    plan.mostPopular
                      ? (isSelected
                        ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white border-blue-400 ring-2 ring-blue-400/30 shadow-xl shadow-blue-600/20'
                        : 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white border-blue-600 shadow-xl shadow-blue-600/10')
                      : (isSelected
                        ? 'bg-white text-gray-900 border-blue-500 ring-2 ring-blue-500/10 shadow-lg'
                        : 'bg-white text-gray-900 border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-blue-200')
                  )}
                >
                  <div>
                    {plan.mostPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shrink-0">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-gray-950 shadow-md whitespace-nowrap">
                          <Sparkles className="h-3 w-3 fill-gray-950" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Name as small uppercase label */}
                    <h3 className={cn('text-[10px] font-syne font-bold uppercase tracking-wider text-slate-400', plan.mostPopular && 'text-blue-200')}>
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-3 mb-4">
                      {plan.custom ? (
                        <div className="flex items-baseline h-10">
                          <span className={cn('text-3xl font-syne font-black text-slate-900 tracking-tight', plan.mostPopular && 'text-white')}>
                            Custom
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1.5 flex-wrap h-10">
                          <span className={cn('text-3xl font-syne font-black text-slate-900 tracking-tight', plan.mostPopular && 'text-white')}>
                            {plan.id === 'free' ? 'Free' : `$${billing === 'monthly' ? plan.priceMonthly : getAnnualPrice(plan.priceMonthly)}`}
                          </span>
                          <span className={cn('text-xs font-bold text-slate-500', plan.mostPopular ? 'text-blue-200' : 'text-slate-400')}>
                            {plan.id === 'free' ? '3 days' : (billing === 'monthly' ? '/mo' : '/yr')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className={cn('text-xs text-slate-500 mb-6 leading-relaxed font-medium', plan.mostPopular && 'text-blue-100')}>{plan.description}</p>

                    {/* Features list */}
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feat, idx) => {
                        const featureText = feat.replace(/Custom/g, 'Tailored');
                        return (
                          <li key={idx} className="flex items-start text-xs font-semibold">
                            <Check className={cn('h-4 w-4 mr-2 shrink-0 stroke-[3]', plan.mostPopular ? 'text-white' : 'text-blue-600')} />
                            <span className={cn('text-slate-700', plan.mostPopular && 'text-white')}>{featureText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    {isSelected ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={cn(
                          "w-full text-xs font-bold py-3.5 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]",
                          plan.mostPopular
                            ? "bg-white text-blue-600 hover:bg-slate-50"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        )}
                        aria-label="Selected plan"
                      >
                        <Check className="h-4 w-4 stroke-[3]" /> Selected
                      </button>
                    ) : plan.id === 'free' ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        className="w-full text-xs font-bold border border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent py-3.5 px-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center block"
                        aria-label="Start free trial"
                      >
                        Start Free Trial
                      </button>
                    ) : plan.custom ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        className="w-full text-xs font-bold bg-slate-950 hover:bg-slate-900 text-white py-3.5 px-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center block"
                        aria-label="Get started"
                      >
                        Contact Sales
                      </button>
                    ) : plan.mostPopular ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        className="w-full text-xs font-bold bg-white text-blue-600 hover:bg-slate-50 py-3.5 px-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center block"
                        aria-label="Get started"
                      >
                        Get Started
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlan(plan.id);
                        }}
                        className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center block"
                        aria-label="Get started"
                      >
                        Get Started
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 font-medium">
              All plans include SSL security, automatic backups, and free onboarding support.{' '}
              <a href="/contact" className="text-blue-600 font-bold hover:underline">Questions? Talk to sales →</a>
            </p>
          </div>
        </div>
      </section>

      {/* Need Customization? Contact Sales CTA card (Dark Cinematic Card) */}
      <section
        ref={ctaRef}
        className="w-full bg-white pb-24"
      >
        <div className="site-container">
          <motion.div
            className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-slate-950 text-white rounded-3xl border border-slate-900 p-8 sm:p-12 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {/* Grid overlay background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left side: Icon + Heading + Subtext */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Headset className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-syne font-black uppercase tracking-tight text-white">
                  Need a Custom Plan?
                </h3>
                <p className="mt-2 text-sm text-slate-400 max-w-md font-medium leading-relaxed">
                  Talk to our sales team and get a tailored solution for your business.
                </p>
              </div>
            </div>

            {/* Right side: Two CTA Buttons */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link href="/contact" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 py-3.5 px-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md"
                >
                  Contact Sales
                </button>
              </Link>
              <Link href="/#resources" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto text-xs font-bold border border-white/20 hover:bg-white/5 text-white bg-transparent py-3.5 px-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Schedule a Demo
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
