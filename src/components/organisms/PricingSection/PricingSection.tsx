import React, { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGetPricingPlansQuery, PricingPlan } from '@/redux/services/pricingApi';
import { ATMButton } from '@/components/atoms/ATMButton';
import { Check, Headset } from 'lucide-react';

export const PricingSection = () => {
  const billing = useState<'monthly' | 'annual'>('monthly')[0];
  const setBilling = useState<'monthly' | 'annual'>('monthly')[1];
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
        'Custom integrations',
        'White-label options',
        'SLA guarantee',
        'On-site training',
        'Custom contracts & billing'
      ],
      custom: true,
    },
  ];

  const pricingPlans = isLoading ? dummyPlans : plans.length ? plans : dummyPlans;

  // calculate annual price if not provided (16% discount)
  const getAnnualPrice = (monthly: number) => Math.round(monthly * 12 * 0.84);

  return (
    <>
      <section className="py-24 bg-slate-50/50 border-t border-slate-100" ref={ref} id="pricing">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-primary mb-4">
            PRICING
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees, ever.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/50 shadow-xs">
            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer',
                billing === 'monthly' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={cn(
                'rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                billing === 'annual' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
              )}
            >
              Annual
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 uppercase">
                Save 16%
              </span>
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 p-6 animate-pulse bg-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-8 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded mt-8" />
            </div>
          ))}
          {!isLoading && pricingPlans.map((plan) => (
            <AnimatePresence key={plan.id} mode="wait">
              <motion.div
                className={cn(
                  'rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative mt-6 md:mt-0',
                  plan.mostPopular
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/10'
                    : 'bg-white text-gray-900 border-slate-100 shadow-xs hover:shadow-md'
                )}
                whileHover={{ y: -6 }}
                layout
              >
                <div>
                  {/* Top Badge centered on border */}
                  {plan.custom && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shrink-0">
                      <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm whitespace-nowrap">
                        Custom
                      </span>
                    </div>
                  )}
                  {plan.mostPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shrink-0">
                      <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-950 shadow-sm whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Name as small uppercase label */}
                  <h3 className={cn('text-[10px] font-bold uppercase tracking-wider text-slate-400', plan.mostPopular && 'text-blue-200')}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 mb-4">
                    {plan.custom ? (
                      <div className="flex items-baseline">
                        <span className={cn('text-3xl font-black text-slate-900 tracking-tight', plan.mostPopular && 'text-white')}>Custom</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className={cn('text-3xl font-black text-slate-900 tracking-tight', plan.mostPopular && 'text-white')}>
                          {plan.id === 'free' ? 'Free' : `$${billing === 'monthly' ? plan.priceMonthly : getAnnualPrice(plan.priceMonthly)}`}
                        </span>
                        <span className={cn('text-xs font-semibold text-slate-500', plan.mostPopular ? 'text-blue-200' : 'text-slate-400')}>
                          {plan.id === 'free' ? '3 days, no card' : (billing === 'monthly' ? '/month' : '/year')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className={cn('text-xs text-slate-500 mb-6 leading-relaxed', plan.mostPopular && 'text-blue-100')}>{plan.description}</p>

                  {/* Features list */}
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs font-medium"> 
                        <Check className={cn('h-4 w-4 mr-2 shrink-0 stroke-[3]', plan.mostPopular ? 'text-white' : 'text-blue-600')} />
                        <span className={cn('text-slate-700', plan.mostPopular && 'text-white')}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button as rounded-full pill */}
                <div>
                  {plan.id === 'free' ? (
                    <button
                      className="w-full text-xs font-bold border border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent py-3 px-4 rounded-full transition cursor-pointer text-center block"
                      aria-label="Start free trial"
                    >
                      Start Free Trial
                    </button>
                  ) : plan.custom ? (
                    <button
                      className="w-full text-xs font-bold bg-slate-950 hover:bg-slate-900 text-white py-3 px-4 rounded-full transition cursor-pointer text-center block"
                      aria-label="Contact sales"
                    >
                      Contact Sales
                    </button>
                  ) : plan.mostPopular ? (
                    <button
                      className="w-full text-xs font-bold bg-white text-blue-600 hover:bg-slate-50 py-3 px-4 rounded-full transition cursor-pointer text-center block"
                      aria-label="Get started"
                    >
                      Get Started
                    </button>
                  ) : (
                    <button
                      className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full transition cursor-pointer text-center block"
                      aria-label="Get started"
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include SSL security, automatic backups, and free onboarding support.{' '}
            <a href="/contact" className="text-blue-600 font-semibold hover:underline">Questions? Talk to sales →</a>
          </p>
        </div>
      </div>
    </section>

    {/* Need Customization? Contact Sales CTA banner */}
    <section
      ref={ctaRef}
      className="w-full bg-[#F1F5F9] py-16 border-t border-slate-200"
    >
      <div className="site-container">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left side: Icon + Heading + Subtext */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
              <Headset className="h-6 w-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                Need a Custom Plan?
              </h3>
              <p className="mt-1 text-sm text-gray-500 max-w-md">
                Talk to our sales team and get a tailored solution for your business.
              </p>
            </div>
          </div>

          {/* Right side: Two CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link href="/contact">
              <ATMButton variant="primary" size="md">
                Contact Sales
              </ATMButton>
            </Link>
            <Link href="/#resources">
              <ATMButton variant="outline" size="md">
                Schedule a Demo
              </ATMButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);
};

export default PricingSection;
