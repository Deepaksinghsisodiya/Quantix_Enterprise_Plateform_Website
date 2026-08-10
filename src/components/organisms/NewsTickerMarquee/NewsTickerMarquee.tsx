"use client";

import React from "react";
import Link from "next/link";
import {
  Boxes,
  ChefHat,
  Cloud,
  Code2,
  Globe2,
  Headphones,
  Newspaper,
  Store,
  type LucideIcon,
} from "lucide-react";

type NewsTickerItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  isNew: boolean;
};

const tickerItems: NewsTickerItem[] = [
  {
    id: "restaurant-pos",
    title: "Restaurant POS",
    description: "Tableside orders and kitchen ticket routing",
    icon: ChefHat,
    href: "/features/table-management",
    isNew: false,
  },
  {
    id: "retail-pos",
    title: "Retail POS",
    description: "Offline checkout with barcode inventory",
    icon: Store,
    href: "/features/offline-registers",
    isNew: false,
  },
  {
    id: "cloud-management",
    title: "Cloud Management",
    description: "Live inventory and sales dashboards",
    icon: Cloud,
    href: "/sign-up/enterprise",
    isNew: false,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Customer orders flow into POS and KDS",
    icon: Globe2,
    href: "/features/online-ordering",
    isNew: false,
  },
  {
    id: "smart-inventory",
    title: "Smart Inventory",
    description: "Recipe costing, stock sync and supplier tools",
    icon: Boxes,
    href: "/features/smart-inventory",
    isNew: false,
  },
  {
    id: "custom-platform",
    title: "Custom POS Platform",
    description: "API bridges, white-label flows and ERP workflows",
    icon: Code2,
    href: "/contact",
    isNew: false,
  },
  {
    id: "sla-support",
    title: "Dedicated SLA Support",
    description: "Rollout support for enterprise deployments",
    icon: Headphones,
    href: "/sla",
    isNew: false,
  },
];

const marqueeAnimation: React.CSSProperties = {
  animation: "quantixTickerSlide 96s linear infinite",
  willChange: "transform",
};

const tickerGroupItems = Array.from({ length: 8 }, () => tickerItems).flat();

const TickerItem = ({
  item,
  tabIndex,
}: {
  item: NewsTickerItem;
  tabIndex?: number;
}) => {
  const Icon = item.icon;

  return (
    <span className="inline-flex w-max shrink-0 items-center whitespace-nowrap">
      <Link
        href={item.href}
        tabIndex={tabIndex}
        className="group inline-flex h-11 w-max shrink-0 items-center gap-2 whitespace-nowrap px-4 text-[12px] font-semibold text-slate-200 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-primary/70 sm:h-12 sm:px-5 sm:text-[13px] md:h-[50px]"
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-primary transition-colors group-hover:text-primary-light" />
        <span className="inline-flex w-max shrink-0 whitespace-nowrap">
          <span className="font-bold text-white transition-colors group-hover:text-primary-light">
            {item.title}
          </span>
          <span className="mx-1.5 text-slate-500">-</span>
          <span className="text-slate-300 transition-colors group-hover:text-white">
            {item.description}
          </span>
        </span>
      </Link>
      <span
        aria-hidden="true"
        className="inline-flex h-11 shrink-0 items-center px-2 text-sm font-black text-slate-500 sm:h-12 sm:px-3 md:h-[50px]"
      >
        /
      </span>
    </span>
  );
};

const TickerGroup = ({
  groupIndex = 0,
  groupItems,
}: {
  groupIndex?: number;
  groupItems: NewsTickerItem[];
}) => (
  <div
    aria-hidden={groupIndex > 0}
    className={`quantix-news-ticker-group flex w-max shrink-0 items-center ${groupIndex > 0 ? "ticker-track-copy" : ""}`}
  >
    {groupItems.map((item, index) => (
      <TickerItem
        key={`${item.id}-${index}-${groupIndex}`}
        item={item}
        tabIndex={groupIndex > 0 ? -1 : undefined}
      />
    ))}
  </div>
);

export default function NewsTickerMarquee() {
  return (
    <section
      aria-label="Quantix latest platform updates"
      className="quantix-news-ticker w-full overflow-hidden border-y border-white/10 bg-darkBg text-white"
    >
      <div className="flex h-11 w-full items-center sm:h-12 md:h-[50px]">
        <Link
          href="/changelog"
          className="relative z-10 flex h-full shrink-0 items-center gap-2 border-r border-white/10 bg-white/[0.12] px-3 text-[11px] font-black uppercase tracking-normal text-white outline-none transition-colors hover:text-primary-light focus-visible:ring-2 focus-visible:ring-primary/70 sm:px-5 sm:text-xs"
        >
          <Newspaper className="h-3.5 w-3.5 shrink-0 text-primary-light" />
          <span className="hidden sm:inline">Latest News</span>
          <span className="sm:hidden">Latest</span>
        </Link>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="quantix-news-ticker-track flex w-max min-w-max items-center"
            style={marqueeAnimation}
          >
            <TickerGroup groupItems={tickerGroupItems} />
            <TickerGroup groupIndex={1} groupItems={tickerGroupItems} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes quantixTickerSlide {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .quantix-news-ticker-track {
          display: flex;
          width: max-content;
          min-width: max-content;
        }

        .quantix-news-ticker-group {
          display: flex;
          width: max-content;
          min-width: max-content;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .quantix-news-ticker-group > * {
          flex-shrink: 0;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .quantix-news-ticker-track {
            animation: none;
            max-width: 100%;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .quantix-news-ticker-track::-webkit-scrollbar {
            display: none;
          }

          .ticker-track-copy {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
