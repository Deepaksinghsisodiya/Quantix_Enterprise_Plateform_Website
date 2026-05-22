import { NextResponse } from 'next/server';

export async function GET() {
  const features = [
    {
      id: "1",
      title: "Real-Time Analytics",
      description: "Live dashboards showing sales trends, peak hours, best‑sellers, and revenue — all in one view.",
      icon: "BarChart2",
      color: "blue-500",
    },
    {
      id: "2",
      title: "Smart Inventory",
      description: "Automatic stock tracking with low‑stock alerts and one‑click purchase orders to suppliers.",
      icon: "Package",
      color: "purple-500",
    },
    {
      id: "3",
      title: "Omni Payments",
      description: "Accept cash, card, contactless, QR codes, and split bills — all settled in seconds.",
      icon: "CreditCard",
      color: "teal-500",
    },
    {
      id: "4",
      title: "Customer Loyalty",
      description: "Built‑in CRM with loyalty points, purchase history, and targeted promotions.",
      icon: "Users",
      color: "indigo-500",
    },
    {
      id: "5",
      title: "Multi‑Location",
      description: "Manage all your branches from one dashboard. Sync menus, pricing, and reports centrally.",
      icon: "Globe",
      color: "green-500",
    },
    {
      id: "6",
      title: "Bank‑Grade Security",
      description: "PCI DSS compliant, end‑to‑end encryption, and role‑based access controls out of the box.",
      icon: "Shield",
      color: "orange-500",
    },
    {
      id: "7",
      title: "24/7 Support",
      description: "Live chat, phone, and email support whenever you need it. Real humans, fast responses.",
      icon: "Headphones",
      color: "red-500",
    },
    {
      id: "8",
      title: "Offline Mode",
      description: "Keep selling even without internet. Quantix syncs all transactions automatically when back online.",
      icon: "Lock",
      color: "cyan-500",
    },
    {
      id: "9",
      title: "Always Up‑to‑Date",
      description: "Automatic silent updates. No downtime, no manual installs, zero disruption.",
      icon: "RefreshCw",
      color: "violet-500",
    },
  ];

  return NextResponse.json(features);
}
