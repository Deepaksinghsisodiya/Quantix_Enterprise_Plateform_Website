import {
  SupportPillar,
  SupportTrustBadge,
  SupportChannel,
  SupportSlaMetric,
} from '../Types/support.types';

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

export const SUPPORT_SLA_METRICS: SupportSlaMetric[] = [
  {
    id: 'first-response',
    label: 'First Response SLA',
    value: '< 60s',
    subtext: 'Live phone & priority chat pickup',
    iconName: 'Zap',
  },
  {
    id: 'resolution-rate',
    label: 'First-Call Resolution',
    value: '94.8%',
    subtext: 'Issues solved without escalations',
    iconName: 'ShieldCheck',
  },
  {
    id: 'uptime-support',
    label: 'Technical Availability',
    value: '24/7/365',
    subtext: 'Engineers on standby around the clock',
    iconName: 'Clock',
  },
  {
    id: 'client-satisfaction',
    label: 'CSAT Rating',
    value: '4.9 / 5',
    subtext: 'Over 2,500+ verified branch reviews',
    iconName: 'UserCheck',
  },
];

export const SUPPORT_CHANNELS: SupportChannel[] = [
  {
    id: 'hotline',
    title: 'Priority Phone Hotline',
    description: 'Instant direct voice channel connecting your store managers directly to Level-2 technical architects.',
    iconName: 'PhoneCall',
    highlightColor: '#FF4F00',
    slaTag: '< 45s Ring Time',
    features: ['Direct engineer line', 'Shift manager bypass', 'Zero IVR maze'],
  },
  {
    id: 'chat',
    title: 'Real-Time Operator Chat',
    description: 'Live in-app and dashboard messaging for quick menu modifier questions, hardware pairing, or shift balancing.',
    iconName: 'MessageSquare',
    highlightColor: '#2563eb',
    slaTag: '< 60s Pickup',
    features: ['In-dashboard messenger', 'Screenshare diagnosis', 'Audit receipts export'],
  },
  {
    id: 'remote-desk',
    title: 'Remote Terminal Assist',
    description: 'Encrypted screen-takeover diagnostic sessions to resolve complex peripheral printer or barcode bugs on site.',
    iconName: 'MonitorCheck',
    highlightColor: '#059669',
    slaTag: 'Sub-Minute Remote',
    features: ['Encrypted LAN access', 'Silent peripheral reset', 'Zero till lockup'],
  },
  {
    id: 'dedicated-tam',
    title: 'Dedicated Account Executive',
    description: 'Assigned Enterprise Technical Account Manager for multi-unit store rollouts, ERP hooks, and quarterly audits.',
    iconName: 'Users',
    highlightColor: '#7c3aed',
    slaTag: 'Assigned Leader',
    features: ['Quarterly QBR review', 'Dedicated Slack bridge', 'Custom menu migrations'],
  },
];
