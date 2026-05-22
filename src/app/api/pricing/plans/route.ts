import { NextResponse } from 'next/server';

export async function GET() {
  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      interval: 'monthly',
      priceMonthly: 0,
      priceSuffix: ' 3 days, no card',
      description: 'Full access to all features. No credit card required.',
      features: ['All core modules', '24/7 support', 'Basic reporting'],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 50,
      interval: 'monthly',
      priceMonthly: 50,
      priceSuffix: '/month',
      description: 'Perfect for small retailers and single-location restaurants.',
      features: ['Inventory management', 'Staff scheduling', 'POS sales'],
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 100,
      interval: 'monthly',
      priceMonthly: 100,
      priceSuffix: '/month',
      description: 'For growing businesses with multiple staff and advanced needs.',
      features: ['Advanced analytics', 'Multi‑store', 'Custom integrations'],
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
      features: ['Dedicated account manager', 'SLA guarantees', 'Tailored pricing'],
      custom: true,
    },
  ];

  return NextResponse.json(plans);
}
