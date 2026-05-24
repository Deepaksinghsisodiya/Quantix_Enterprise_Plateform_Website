// src/components/organisms/SplitAuthLayout/SplitAuthLayout.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers } from "lucide-react";

export interface SplitAuthLayoutProps {
  children: React.ReactNode;
  coverImage: string;
  coverAlt?: string;
  coverHeadline?: string;
  coverSubtext?: string;
}

export const SplitAuthLayout: React.FC<SplitAuthLayoutProps> = ({
  children,
  coverImage,
  coverAlt = "Quantix Platform",
  coverHeadline,
  coverSubtext,
}) => {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* ── LEFT Side: Cover Image (hidden on mobile) ── */}
      <div className="relative hidden lg:block lg:w-[55%] xl:w-[58%]">
        <Image
          src={coverImage}
          alt={coverAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 58vw, 0vw"
        />

        {/* Dark gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />

        {/* Brand watermark top-left */}
        <div className="absolute top-8 left-10 z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg transition-transform group-hover:scale-105">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-syne font-black tracking-tight uppercase text-white/90">
              Quantix
            </span>
          </Link>
        </div>

        {/* Headline on the image */}
        {(coverHeadline || coverSubtext) && (
          <div className="absolute bottom-14 left-10 right-10 z-10">
            {coverHeadline && (
              <h3 className="text-2xl xl:text-3xl font-syne font-black text-white uppercase tracking-tight leading-tight mb-3">
                {coverHeadline}
              </h3>
            )}
            {coverSubtext && (
              <p className="text-sm text-slate-300/80 font-medium leading-relaxed max-w-md">
                {coverSubtext}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── RIGHT Side: Form Area ── */}
      <div className="relative flex w-full flex-col lg:w-[45%] xl:w-[42%]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Soft ambient glows */}
        <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Mobile-only brand header (hidden on lg where logo is on image) */}
        <div className="relative z-10 px-6 pt-7 sm:px-10 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
              <Layers className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-syne font-black tracking-tight uppercase text-white">
              Quantix
            </span>
          </Link>
        </div>

        {/* Scrollable form content area — vertically centred */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-14">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        {/* Footer fine-print */}
        <div className="relative z-10 px-6 pb-6 sm:px-10">
          <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
            © {new Date().getFullYear()} Quantix Inc. All rights reserved.{" "}
            <Link href="#" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link href="#" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplitAuthLayout;
