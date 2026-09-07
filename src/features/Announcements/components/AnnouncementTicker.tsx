"use client";

import React from "react";
import Link from "next/link";
import {
  Megaphone,
  Newspaper,
  CalendarDays,
  AlertTriangle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { AnnouncementDto, AnnouncementKind } from "../Types/AnnouncementTypes";

/* ─── Icon map by announcement kind ─── */
const KIND_ICON: Record<AnnouncementKind, LucideIcon> = {
  News: Newspaper,
  Event: CalendarDays,
  Notice: AlertTriangle,
};

const KIND_ACCENT: Record<AnnouncementKind, string> = {
  News: "text-emerald-400",
  Event: "text-amber-400",
  Notice: "text-rose-400",
};

/* ─── Marquee Animation ─── */
const marqueeAnimation: React.CSSProperties = {
  animation: "quantixAnnouncementSlide 180s linear infinite",
  willChange: "transform",
};

/* ─── Single Ticker Item ─── */
const AnnouncementTickerItem = ({
  item,
  tabIndex,
}: {
  item: AnnouncementDto;
  tabIndex?: number;
}) => {
  const kind = (item.kind || "News") as AnnouncementKind;
  const Icon = KIND_ICON[kind] || Newspaper;
  const accent = KIND_ACCENT[kind] || "text-primary";
  const href = item.linkUrl || "#";

  return (
    <span className="inline-flex w-max shrink-0 items-center whitespace-nowrap">
      <Link
        href={href}
        tabIndex={tabIndex}
        className="group inline-flex h-11 w-max shrink-0 items-center gap-2 whitespace-nowrap px-4 text-[12px] font-semibold text-slate-200 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-primary/70 sm:h-12 sm:px-5 sm:text-[13px] md:h-[50px]"
      >
        <Icon
          className={`h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-primary-light ${accent}`}
        />
        <span className="inline-flex w-max shrink-0 whitespace-nowrap">
          {item.isPinned && (
            <span className="mr-1.5 inline-flex items-center gap-0.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-light">
              <Sparkles className="h-2.5 w-2.5" />
              Pinned
            </span>
          )}
          <span className="font-bold text-white transition-colors group-hover:text-primary-light">
            {item.title}
          </span>
          {item.body && (
            <>
              <span className="mx-1.5 text-slate-500">—</span>
              <span className="text-slate-300 transition-colors group-hover:text-white">
                {item.body}
              </span>
            </>
          )}
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

/* ─── Ticker Group ─── */
const AnnouncementTickerGroup = ({
  groupIndex = 0,
  items,
}: {
  groupIndex?: number;
  items: AnnouncementDto[];
}) => (
  <div
    aria-hidden={groupIndex > 0}
    className={`quantix-announcement-ticker-group flex w-max shrink-0 items-center ${
      groupIndex > 0 ? "announcement-track-copy" : ""
    }`}
  >
    {items.map((item, index) => (
      <AnnouncementTickerItem
        key={`${item.announcementId || item.id || index}-${index}-g${groupIndex}`}
        item={item}
        tabIndex={groupIndex > 0 ? -1 : undefined}
      />
    ))}
  </div>
);

/* ─── Main Component ─── */
export interface AnnouncementTickerProps {
  announcements: AnnouncementDto[];
  isLoading?: boolean;
}

export default function AnnouncementTicker({
  announcements,
  isLoading,
}: AnnouncementTickerProps) {
  // Repeat items for seamless infinite scrolling
  const tickerItems = Array.from({ length: 6 }, () => announcements).flat();

  if (isLoading) {
    return (
      <section
        aria-label="Loading announcements"
        className="quantix-announcement-ticker w-full overflow-hidden border-y border-white/10 bg-darkBg text-white"
      >
        <div className="flex h-11 w-full items-center sm:h-12 md:h-[50px]">
          <div className="relative z-10 flex h-full shrink-0 items-center gap-2 border-r border-white/10 bg-white/[0.12] px-3 sm:px-5">
            <Megaphone className="h-3.5 w-3.5 shrink-0 text-primary-light animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-normal text-white/60 sm:text-xs">
              Loading...
            </span>
          </div>
          <div className="flex-1 flex items-center gap-6 px-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 animate-pulse">
                <div className="h-3 w-3 rounded bg-slate-700" />
                <div className="h-3 w-32 rounded bg-slate-700" />
                <div className="h-3 w-48 rounded bg-slate-700/50" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!announcements.length) return null;

  return (
    <section
      aria-label="Quantix platform announcements"
      className="quantix-announcement-ticker w-full overflow-hidden border-y border-white/10 bg-darkBg text-white"
    >
      <div className="flex h-11 w-full items-center sm:h-12 md:h-[50px]">
        {/* Left badge */}
        <Link
          href="/changelog"
          className="relative z-10 flex h-full shrink-0 items-center gap-2 border-r border-white/10 bg-white/[0.12] px-3 text-[11px] font-black uppercase tracking-normal text-white outline-none transition-colors hover:text-primary-light focus-visible:ring-2 focus-visible:ring-primary/70 sm:px-5 sm:text-xs"
        >
          <Megaphone className="h-3.5 w-3.5 shrink-0 text-primary-light" />
          <span className="hidden sm:inline">Announcements</span>
          <span className="sm:hidden">News</span>
        </Link>

        {/* Scrolling track */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="quantix-announcement-ticker-track flex w-max min-w-max items-center"
            style={marqueeAnimation}
          >
            <AnnouncementTickerGroup items={tickerItems} />
            <AnnouncementTickerGroup groupIndex={1} items={tickerItems} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes quantixAnnouncementSlide {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .quantix-announcement-ticker-track {
          display: flex;
          width: max-content;
          min-width: max-content;
        }

        .quantix-announcement-ticker-group {
          display: flex;
          width: max-content;
          min-width: max-content;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .quantix-announcement-ticker-group > * {
          flex-shrink: 0;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .quantix-announcement-ticker-track {
            animation: none;
            max-width: 100%;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .quantix-announcement-ticker-track::-webkit-scrollbar {
            display: none;
          }

          .announcement-track-copy {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
