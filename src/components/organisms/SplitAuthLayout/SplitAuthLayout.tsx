// src/components/organisms/SplitAuthLayout/SplitAuthLayout.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap } from 'lucide-react';

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

      {/* ── LEFT Side: Ultra-HD Cover Image Showcase (hidden on mobile) ── */}
      <div className="relative hidden lg:block lg:w-[55%] xl:w-[58%] overflow-hidden bg-slate-900">
        <Image
          src={coverImage}
          alt={coverAlt}
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="(min-width: 1024px) 58vw, 0vw"
        />

        {/* Minimal edge fade only at the right border to blend seamlessly into form container */}
        <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        {/* Brand watermark top-left */}
        <div className="absolute top-8 left-10 z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md shadow-primary/30">
              <Zap className="h-5 w-5 fill-white stroke-[2.5]" />
            </div>
            <span className="font-syne text-xl font-black tracking-tight text-white drop-shadow-md">
              Quantix <span className="text-primary-light">Enterprise</span>
            </span>
          </Link>
        </div>

        {/* Headline directly inline on the image without box background */}
        {(coverHeadline || coverSubtext) && (
          <div className="absolute bottom-12 left-10 right-14 z-10">
            {coverHeadline && (
              <h3 className="text-2xl xl:text-3xl font-syne font-black text-white uppercase tracking-tight leading-tight mb-2 drop-shadow-lg">
                {coverHeadline}
              </h3>
            )}
            {coverSubtext && (
              <p className="text-sm text-slate-200/90 font-medium leading-relaxed max-w-md drop-shadow-md">
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
          <Link href="/" className="inline-flex items-center gap-2 group select-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md">
              <Zap className="h-4.5 w-4.5 fill-white stroke-[2.5]" />
            </div>
            <span className="font-syne text-lg font-black tracking-tight text-white">
              Quantix <span className="text-primary-light">Enterprise</span>
            </span>
          </Link>
        </div>

        {/* Scrollable form content area — vertically centred */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-12 xl:px-14">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        {/* Footer fine-print */}
        <div className="relative z-10 px-6 pb-6 sm:px-10 text-center sm:text-left">
          <p className="text-[10.5px] text-slate-400 font-medium leading-relaxed">
            © {new Date().getFullYear()} Quantix Inc. All rights reserved.{" "}
            <Link href="/privacy" className="text-slate-300 hover:text-white underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link href="/terms" className="text-slate-300 hover:text-white underline underline-offset-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplitAuthLayout;
