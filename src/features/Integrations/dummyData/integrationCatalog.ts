import type { IntegrationDto } from '../Types/IntegrationsType';

export const DEFAULT_INTEGRATIONS: IntegrationDto[] = [
  {
    id: '1',
    slug: 'stripe',
    name: 'Stripe Payments',
    description: 'Process online and in-person card payments with terminal and payout sync.',
    category: 'payments',
    logoUrl: '/brands/integrations/stripe.png',
    isPopular: true,
  },
  {
    id: '2',
    slug: 'authorize-net',
    name: 'Authorize.Net',
    description: 'Secure enterprise Visa gateway with batch settlement and card vaulting.',
    category: 'payments',
    logoUrl: '/brands/integrations/authorize.png',
  },
  {
    id: '3',
    slug: 'square',
    name: 'Square POS',
    description: 'Bridge Square terminals with Quantix catalog, inventory, and reporting.',
    category: 'pos & inventory',
    logoUrl: '/brands/integrations/square.png',
    isPopular: true,
  },
  {
    id: '4',
    slug: 'paypal',
    name: 'PayPal Checkout',
    description: 'Connect Express Checkout, Venmo wallet payments, refunds, and payouts.',
    category: 'payments',
    logoUrl: '/brands/integrations/paypal.png',
  },
  {
    id: '5',
    slug: 'doordash',
    name: 'DoorDash Drive',
    description: 'Send delivery orders to POS and kitchen workflows with dispatch status.',
    category: 'delivery',
    logoUrl: '/brands/integrations/doordash.png',
    isPopular: true,
  },
  {
    id: '6',
    slug: 'uber-eats',
    name: 'Uber Eats',
    description: 'Sync delivery menus, modifiers, prep timing, and courier-ready tickets.',
    category: 'delivery',
    logoUrl: '/brands/integrations/ubereats.png',
  },
];

export const INTEGRATION_CARD_VISUALS: Record<string, { src: string; alt: string }> = {
  payments: { src: '/images/pos_counter_3d.png', alt: 'Integrated payment terminal workflow' },
  'pos & inventory': { src: '/images/hero-retail.jpg', alt: 'Retail POS and inventory workflow' },
  delivery: { src: '/images/hero-local.png', alt: 'Delivery dispatch and kitchen workflow' },
};

export const INTEGRATION_DETAIL_SLUGS = new Set([
  'stripe',
  'authorize-net',
  'square',
  'paypal',
  'doordash',
  'uber-eats',
]);
