export interface SupportPillar {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: string;
  points: string[];
}

export interface SupportTrustBadge {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export const SUPPORT_TRUST_BADGES: SupportTrustBadge[] = [
  {
    id: 'availability',
    title: '24/7 Assistance',
    subtitle: 'Available day, night & peak weekend hours',
    iconName: 'Clock',
  },
  {
    id: 'human',
    title: 'Real Human Specialists',
    subtitle: 'Direct talk with technical product experts',
    iconName: 'UserCheck',
  },
  {
    id: 'onboarding',
    title: '1-on-1 Onboarding',
    subtitle: 'Dedicated setup for menus, items & staff',
    iconName: 'ShieldCheck',
  },
  {
    id: 'rollout',
    title: 'Multi-Store Guidance',
    subtitle: 'Smooth rollout across all branches',
    iconName: 'Building2',
  },
];

export const SUPPORT_PILLARS: SupportPillar[] = [
  {
    id: 'account-manager',
    title: 'Dedicated Account Manager',
    badge: '1-ON-1 GUIDANCE',
    description:
      'A dedicated point of contact who understands your multi-location operations, menus, and custom pricing requirements.',
    iconName: 'UserCheck',
    points: [
      'Tailored setup for multi-location operations',
      'Guidance for central menu & price updates',
      'Assistance during new store launches',
    ],
  },
  {
    id: 'priority-channels',
    title: 'Direct Priority Support Channel',
    badge: 'DIRECT CONTACT',
    description:
      'Direct phone and message assistance so your restaurant and store managers get quick help without getting lost in tickets.',
    iconName: 'PhoneCall',
    points: [
      'Fast assistance for busy shift managers',
      'Help with menu matrices & modifier groupings',
      'Assistance during peak operating hours',
    ],
  },
  {
    id: 'staff-training',
    title: 'Comprehensive Staff & Manager Training',
    badge: 'TRAINING & ONBOARDING',
    description:
      'Practical training sessions for cashiers, servers, floor leads, and managers for smooth day-one adoption.',
    iconName: 'GraduationCap',
    points: [
      'Role-based training for cashiers & managers',
      'Quick-reference guides and workflows',
      'Minimizes operational mistakes on register',
    ],
  },
  {
    id: 'cloud-hardware',
    title: 'Hardware & Cloud Setup Assistance',
    badge: 'TECHNICAL SETUP',
    description:
      'Assistance configuring receipt printers, barcode scanners, KDS screens, card readers, and cloud synchronization.',
    iconName: 'Cpu',
    points: [
      'Assistance with receipt printers & kitchen displays',
      'Payment terminal pairing & network check',
      'Live cloud data sync verification',
    ],
  },
];
