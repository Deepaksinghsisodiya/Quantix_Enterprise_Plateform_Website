import { NextResponse } from 'next/server';

export async function GET() {
  const faqs = [
    {
      id: "1",
      question: "Do I need a credit card for the free trial?",
      answer: "No credit card required. Sign up and get full platform access for 3 days completely free.",
    },
    {
      id: "2",
      question: "What terminals and devices does Quantix support?",
      answer: "Quantix works on iPad, Android tablets, and any web browser. We support receipt printers, barcode scanners, cash drawers, and card readers via integrations.",
    },
    {
      id: "3",
      question: "Can I switch plans or cancel anytime?",
      answer: "Yes. You can upgrade, downgrade, or cancel your plan at any time from your account settings with no cancellation fees.",
    },
    {
      id: "4",
      question: "How does multi-location support work?",
      answer: "Manage all your branches from a single dashboard. Each location has its own inventory, staff, and reports but you can view consolidated data across all locations.",
    },
    {
      id: "5",
      question: "Is my data secure and backed up?",
      answer: "Quantix is PCI DSS compliant with end-to‑end encryption, SOC 2 Type II certification, and automatic daily backups with 99.9% uptime SLA.",
    },
    {
      id: "6",
      question: "Do you offer onboarding support?",
      answer: "Yes. All plans include free onboarding support. Professional and Enterprise plans include a dedicated onboarding specialist and priority support.",
    },
  ];

  return NextResponse.json(faqs);
}
