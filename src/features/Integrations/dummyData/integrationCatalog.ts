import type { IntegrationDto } from '../Types/IntegrationsType';

export const DEFAULT_INTEGRATIONS: IntegrationDto[] = [
  {
    id: '1',
    slug: 'stripe',
    name: 'Stripe Enterprise Payments',
    description: 'Process online and in-person card payments with terminal fleet and payout sync.',
    category: 'payments',
    isPopular: true,
  },
  {
    id: '2',
    slug: 'authorize-net',
    name: 'Authorize.Net',
    description: 'Secure enterprise payment gateway with batch settlement and card vaulting.',
    category: 'payments',
  },
  {
    id: '3',
    slug: 'square',
    name: 'Square Register Fleet',
    description: 'Bridge Square terminals with Quantix Enterprise catalog, inventory, and reporting.',
    category: 'payments',
    isPopular: true,
  },
  {
    id: '4',
    slug: 'doordash',
    name: 'DoorDash Drive',
    description: 'Send delivery orders to POS and kitchen workflows with live dispatch status.',
    category: 'delivery',
    isPopular: true,
  },
  {
    id: '5',
    slug: 'uber-eats',
    name: 'Uber Eats Enterprise',
    description: 'Sync delivery menus, modifiers, prep timing, and automated courier-ready tickets.',
    category: 'delivery',
  },
];

export const INTEGRATION_CARD_VISUALS: Record<string, { src: string; alt: string }> = {
  payments: { src: '/images/ent_stripe_pos_bundle.png', alt: 'Integrated payment terminal workflow' },
  delivery: { src: '/images/ent_delivery_dispatch_bundle.png', alt: 'Delivery dispatch and kitchen workflow' },
};

export const INTEGRATION_DETAIL_SLUGS = new Set([
  'stripe',
  'authorize-net',
  'square',
  'doordash',
  'uber-eats',
  'ubereats',
]);
