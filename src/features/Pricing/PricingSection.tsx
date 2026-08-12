// src/features/Pricing/PricingSection.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Headset, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { PricingPlan } from './Types/PricingTypes';

export interface PricingSectionProps {
  plans: PricingPlan[];
  isLoading: boolean;
}

/* ─── README-spec plans ─── */
const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'free',
    planCode: 'trial',
    name: 'Free Trial',
    price: 0,
    interval: 'monthly',
    priceMonthly: 0,
    priceSuffix: '3 days, no card',
    description: 'Full access to all features. No credit card required.',
    features: [
      'Full platform access',
      '1 location',
      '2 staff accounts',
      '100 transactions',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'starter',
    planCode: 'starter',
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
      'Email & chat support',
    ],
  },
  {
    id: 'professional',
    planCode: 'professional',
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
      'Tailored receipt branding',
      'Priority 24/7 support',
    ],
    mostPopular: true,
  },
  {
    id: 'enterprise',
    planCode: 'enterprise',
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
      'Tailored contracts & billing',
    ],
    custom: true,
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, isLoading }) => {
  const router = useRouter();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('professional');

  const handleButtonClick = (plan: PricingPlan, e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.custom) {
      router.push('/contact');
    } else {
      router.push(`/sign-up?plan=${plan.id}`);
    }
  };

  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const ctaRef = React.useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const pricingPlans = plans.length > 0 ? plans : DEFAULT_PLANS;

  // 16% discount on annual
  const getAnnualPrice = (monthly: number) => Math.round(monthly * 12 * 0.84);

  const getDisplayPrice = (plan: PricingPlan) => {
    if (plan.custom) return 'Custom';
    if (plan.planCode === 'trial') return 'Free';
    if (billing === 'annual') return `$${getAnnualPrice(plan.priceMonthly)}`;
    return `$${plan.priceMonthly}`;
  };

  const getPriceSuffix = (plan: PricingPlan) => {
    if (plan.custom) return 'Tailored pricing';
    if (plan.planCode === 'trial') return '3 days, no card';
    return billing === 'monthly' ? '/month' : '/year';
  };

  const getCtaLabel = (plan: PricingPlan) => {
    if (plan.planCode === 'trial') return 'Start Free Trial';
    if (plan.custom) return 'Contact Sales';
    return 'Get Started';
  };

  return (
    <>
      {/* ─── Main Pricing Section ─── */}
      <section
        className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 overflow-hidden transition-colors"
        ref={ref}
        id="pricing"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container">
          {/* Header */}
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary mb-4 shadow-sm dark:bg-primary/15 dark:border-primary/30 dark:text-primary-light">
              <Sparkles className="h-3 w-3 stroke-[2.5]" />
              PRICING
            </div>
            <h1 className="text-3xl font-syne font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
              Simple, transparent pricing
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
              Start free. Scale as you grow. No hidden fees, ever.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            className="flex justify-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={cn(
                  'rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer',
                  billing === 'monthly'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-600'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={cn(
                  'rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer',
                  billing === 'annual'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-600'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                Annual
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  Save 16%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Plans Grid — 4 columns */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 p-6 animate-pulse bg-white dark:bg-slate-900 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                  <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded mt-8" />
                </div>
              ))}

            {!isLoading &&
              pricingPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isPopular = plan.mostPopular;
                const isTrial = plan.planCode === 'trial';

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={cn(
                      'relative rounded-2xl border p-5 pt-7 flex flex-col justify-between transition-all duration-300 cursor-pointer group',
                      'hover:-translate-y-1 hover:shadow-lg',
                      isPopular
                        ? 'bg-gradient-to-b from-primary via-primary to-primary-dark text-white border-primary shadow-xl shadow-primary/15 lg:scale-[1.03] z-10'
                        : isSelected
                          ? 'bg-white dark:bg-slate-900 border-primary/50 ring-2 ring-primary/15 shadow-md dark:border-primary/40'
                          : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/30 dark:hover:border-primary/40'
                    )}
                  >
                    {/* Most Popular Badge */}
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md whitespace-nowrap">
                          <Sparkles className="h-3 w-3 fill-slate-950" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Top accent line for non-popular cards */}
                    {!isPopular && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-t-2xl" />
                    )}

                    <div>
                      {/* Plan Name */}
                      <h3
                        className={cn(
                          'text-[10px] font-syne font-bold uppercase tracking-widest',
                          isPopular ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'
                        )}
                      >
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="mt-3 mb-1 flex items-baseline gap-1">
                        <span
                          className={cn(
                            'text-3xl sm:text-4xl font-syne font-black tracking-tight',
                            isPopular ? 'text-white' : 'text-slate-950 dark:text-white'
                          )}
                        >
                          {getDisplayPrice(plan)}
                        </span>
                        <span
                          className={cn(
                            'text-xs font-semibold',
                            isPopular ? 'text-white/60' : 'text-slate-400 dark:text-slate-500'
                          )}
                        >
                          {getPriceSuffix(plan)}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className={cn(
                          'text-[11px] sm:text-xs leading-relaxed font-medium mb-5',
                          isPopular ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'
                        )}
                      >
                        {plan.description}
                      </p>

                      {/* Divider */}
                      <div
                        className={cn(
                          'h-px w-full mb-5',
                          isPopular ? 'bg-white/15' : 'bg-slate-100 dark:bg-slate-800'
                        )}
                      />

                      {/* Features */}
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs font-medium">
                            <Check
                              className={cn(
                                'h-3.5 w-3.5 mt-0.5 shrink-0 stroke-[3]',
                                isPopular ? 'text-white' : 'text-emerald-500 dark:text-emerald-400'
                              )}
                            />
                            <span className={cn(isPopular ? 'text-white/90' : 'text-slate-700 dark:text-slate-300')}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={(e) => handleButtonClick(plan, e)}
                        className={cn(
                          'w-full text-xs font-bold py-3 px-4 rounded-full transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5',
                          'hover:scale-[1.02] active:scale-[0.98]',
                          isPopular
                            ? 'bg-white text-primary hover:bg-slate-50 shadow-md'
                            : isTrial
                              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md'
                              : 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/15'
                        )}
                        aria-label={getCtaLabel(plan)}
                      >
                        {getCtaLabel(plan)}
                        <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </motion.div>

          {/* Footer note */}
          <motion.div
            className="mt-10 sm:mt-14 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
              All plans include SSL security, automatic backups, and software updates.{' '}
              <Link href="/contact" className="text-primary font-bold hover:underline">
                Questions? Talk to us →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Need Customization? CTA Card ─── */}
      <section ref={ctaRef} className="w-full bg-white dark:bg-slate-950 pb-10 sm:pb-14 transition-colors">
        <div className="site-container">
          <motion.div
            className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-slate-950 dark:bg-slate-900 text-white rounded-2xl border border-slate-800 dark:border-slate-700 p-8 sm:p-10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 25 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/8 rounded-full blur-[60px] pointer-events-none" />

            {/* Left: Icon + Text */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white shadow-lg shadow-primary/20">
                <Headset className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-syne font-black tracking-tight text-white">
                  Need a Custom Plan?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-md font-medium leading-relaxed">
                  Talk to our sales team and get a tailored solution for your business.
                </p>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link href="/contact">
                <button
                  type="button"
                  className="text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 py-3 px-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  Contact Sales
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </Link>
              <Link href="/contact/demo">
                <button
                  type="button"
                  className="text-xs font-bold border border-white/20 hover:bg-white/5 text-white bg-transparent py-3 px-6 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
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