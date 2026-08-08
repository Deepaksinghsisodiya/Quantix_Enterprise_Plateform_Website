// src/features/Demo/DemoSection.tsx
'use client';

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  ArrowUpRight,
  Maximize2,
  Volume2,
  Sparkles,
  Film,
  Image as ImageIcon,
  Bell,
  Monitor,
  LayoutGrid,
  Package,
  ChevronRight,
  Eye,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ATMModal } from "@/components/atoms/ATMModal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DemoMedia } from "./Types/DemoTypes";

export interface DemoSectionProps {
  demoMedia?: DemoMedia;
  onSubscribeNewsletter: (email: string) => Promise<void>;
  isSubmittingNewsletter?: boolean;
}

const DEFAULT_DEMO: DemoMedia = {
  videoThumbnail: "/images/demo-thumb.jpg",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  screenshots: [
    { id: "1", src: "/images/ss1.jpg", title: "Dashboard Overview" },
    { id: "2", src: "/images/ss2.jpg", title: "Table Management" },
    { id: "3", src: "/images/ss3.jpg", title: "Inventory Control" },
  ],
};

const SCREENSHOT_META: Record<string, { icon: React.ElementType; category: string; color: string; bgColor: string }> = {
  "Dashboard Overview": { icon: Monitor, category: "ANALYTICS", color: "text-primary", bgColor: "bg-primary/10" },
  "Table Management": { icon: LayoutGrid, category: "OPERATIONS", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  "Inventory Control": { icon: Package, category: "LOGISTICS", color: "text-amber-600", bgColor: "bg-amber-100" },
};

const LIVE_STATS = [
  { label: "Active Users", value: "12,847", icon: Users, color: "from-primary to-blue-400" },
  { label: "Avg. Response", value: "0.8s", icon: Zap, color: "from-emerald-500 to-teal-400" },
  { label: "Uptime", value: "99.99%", icon: Clock, color: "from-violet-500 to-purple-400" },
];

export const DemoSection: React.FC<DemoSectionProps> = ({
  demoMedia,
  onSubscribeNewsletter,
}) => {
  const demo = demoMedia || DEFAULT_DEMO;

  const [activeMedia, setActiveMedia] = useState<{ type: 'video' | 'screenshot'; id: string | null }>({
    type: 'video',
    id: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [openScreenshotModal, setOpenScreenshotModal] = useState<string | null>(null);
  const [hoveredShot, setHoveredShot] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleNotify = async (values: { email: string }, { resetForm }: any) => {
    await onSubscribeNewsletter(values.email);
    resetForm();
  };

  const activeScreenshot = activeMedia.type === 'screenshot'
    ? demo.screenshots.find(s => s.id === activeMedia.id)
    : null;

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 bg-white"
      ref={ref}
      id="resources"
    >
      {/* === Background Effects === */}
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Soft radial glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-blue-100/50 blur-[120px] pointer-events-none" />
      {/* Side accent orbs */}
      <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-violet-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-cyan-100/40 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-primary mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            SEE IT IN ACTION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-black text-gray-900 leading-tight">
            Watch Quantix{" "}
            <span className="text-primary">
              work for you
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
            Take a guided tour of the tools powering modern restaurants and retailers worldwide.
          </p>
        </motion.div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* ════════ LEFT: Cinematic Media Player (8 cols) ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col"
          >
            {/* Player Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-950 shadow-2xl shadow-primary/10 group">
              {/* Inner glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none z-20" />

              <AnimatePresence mode="wait">
                {/* ── Video View ── */}
                {activeMedia.type === 'video' ? (
                  <motion.div
                    key="video-media"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    {isPlaying ? (
                      <iframe
                        src={`${demo.videoUrl}?autoplay=1`}
                        title="Quantix demo"
                        className="w-full h-full border-none"
                        allow="autoplay; fullscreen"
                      />
                    ) : (
                      <>
                        <Image
                          src={demo.videoThumbnail}
                          alt="Demo thumbnail"
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Dark vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                        {/* ── Play Button ── */}
                        <button
                          type="button"
                          aria-label="Play demo video"
                          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                          onClick={() => setIsPlaying(true)}
                        >
                          <div className="relative flex items-center justify-center">
                            <span className="absolute inline-flex h-24 w-24 rounded-full bg-primary/20 animate-ping opacity-60" />
                            <span className="absolute inline-flex h-28 w-28 rounded-full bg-primary/10 animate-pulse" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                              <Play className="h-8 w-8 fill-white text-white ml-1" />
                            </div>
                          </div>
                        </button>

                        {/* Top-left badge */}
                        <div className="absolute left-5 top-5 z-20 flex items-center gap-2">
                          <span className="rounded-full bg-red-500/90 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            LIVE TOUR
                          </span>
                          <span className="rounded-full bg-white/15 backdrop-blur-sm border border-white/15 px-3 py-1.5 text-[10px] font-bold text-white/80">
                            HD · 2:47
                          </span>
                        </div>

                        {/* Bottom control bar */}
                        <div className="absolute inset-x-0 bottom-0 z-20">
                          <div className="bg-gradient-to-t from-black/90 to-transparent p-5 pt-10 flex items-end justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <Volume2 className="w-4 h-4 text-white/60" />
                              <div className="flex-1 h-1 bg-white/20 rounded-full relative max-w-md">
                                <div className="absolute inset-y-0 left-0 w-[65%] bg-primary rounded-full" />
                                <div className="absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-white shadow-md shadow-primary/30" />
                              </div>
                              <span className="font-mono text-[11px] text-white/50 font-medium ml-1">2:47</span>
                            </div>
                            <Maximize2 className="w-4 h-4 text-white/40 hover:text-white transition cursor-pointer ml-4" />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  /* ── Screenshot Preview View ── */
                  <motion.div
                    key={`screenshot-${activeMedia.id}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative flex items-center justify-center bg-gray-100"
                  >
                    {activeScreenshot && (
                      <>
                        <Image
                          src={activeScreenshot.src}
                          alt={activeScreenshot.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover"
                        />
                        {/* Top bar */}
                        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5">
                          <span className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm flex items-center gap-1.5">
                            <Eye className="h-3 w-3" />
                            {activeScreenshot.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200 p-2 text-gray-600 hover:bg-white transition-all cursor-pointer"
                              title="Expand screenshot"
                              onClick={() => setOpenScreenshotModal(activeScreenshot.id)}
                            >
                              <Maximize2 className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-full bg-primary hover:bg-primary/90 px-4 py-2 text-[11px] font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
                              onClick={() => {
                                setActiveMedia({ type: 'video', id: null });
                                setIsPlaying(false);
                              }}
                            >
                              <Play className="h-3 w-3 fill-white" />
                              Back to Video
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Below Player: Title + Stats ── */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-syne font-bold text-gray-900 flex items-center gap-2.5">
                  {activeMedia.type === 'video' ? (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Film className="h-4 w-4 text-primary" />
                      </div>
                      Quantix Full Platform Walkthrough
                    </>
                  ) : (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <ImageIcon className="h-4 w-4 text-primary" />
                      </div>
                      {activeScreenshot?.title}
                    </>
                  )}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 font-medium">
                  {activeMedia.type === 'video'
                    ? "See how restaurant and retail workflows come together seamlessly."
                    : `Explore the ${activeScreenshot?.title.toLowerCase()} interface in detail.`
                  }
                </p>
              </div>
              <Link
                href="/product-tour"
                className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 shrink-0 cursor-pointer group transition-all"
              >
                Full Guide
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* ── Live Platform Stats Row ── */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {LIVE_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="rounded-xl bg-gray-50 border border-gray-100 p-3.5 flex items-center gap-3 hover:bg-gray-100/70 hover:border-gray-200 transition-colors duration-300"
                >
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br", stat.color)}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">{stat.value}</p>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ════════ RIGHT: Interface Explorer + Newsletter (4 cols) ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            {/* ── Explorer Card ── */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-gray-300" />
                EXPLORE INTERFACES
              </p>

              <div className="space-y-2.5">
                {/* Video Tour Tab */}
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 text-left p-3 rounded-xl border transition-all duration-300 cursor-pointer group/tab",
                    activeMedia.type === 'video'
                      ? "border-primary/30 bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200"
                  )}
                  onClick={() => {
                    setActiveMedia({ type: 'video', id: null });
                    setIsPlaying(false);
                  }}
                >
                  <div className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl shrink-0 transition-all duration-300",
                    activeMedia.type === 'video'
                      ? "bg-primary shadow-md shadow-primary/20"
                      : "bg-gray-100"
                  )}>
                    <Film className={cn("h-5 w-5", activeMedia.type === 'video' ? "text-white" : "text-gray-400")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="rounded-md bg-red-100 text-red-600 text-[8px] font-extrabold px-1.5 py-0.5 tracking-wide uppercase">
                        VIDEO
                      </span>
                    </div>
                    <p className={cn("font-bold text-sm truncate", activeMedia.type === 'video' ? "text-gray-900" : "text-gray-600")}>
                      Platform Video Tour
                    </p>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 shrink-0 transition-all duration-300",
                    activeMedia.type === 'video' ? "text-primary translate-x-0.5" : "text-gray-300 group-hover/tab:text-gray-400"
                  )} />
                </button>

                {/* Screenshot Tabs */}
                {demo.screenshots.map((shot) => {
                  const isActive = activeMedia.type === 'screenshot' && activeMedia.id === shot.id;
                  const meta = SCREENSHOT_META[shot.title] || { icon: ImageIcon, category: "FEATURE", color: "text-blue-600", bgColor: "bg-blue-100" };
                  const MetaIcon = meta.icon;

                  return (
                    <button
                      key={shot.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 text-left p-3 rounded-xl border transition-all duration-300 cursor-pointer group/tab",
                        isActive
                          ? "border-primary/30 bg-primary/5 shadow-sm shadow-primary/10"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200"
                      )}
                      onClick={() => setActiveMedia({ type: 'screenshot', id: shot.id })}
                      onMouseEnter={() => setHoveredShot(shot.id)}
                      onMouseLeave={() => setHoveredShot(null)}
                    >
                      <div className={cn(
                        "relative h-11 w-11 shrink-0 rounded-xl overflow-hidden border transition-all duration-300",
                        isActive ? "border-blue-200" : "border-gray-200"
                      )}>
                        <Image
                          src={shot.src}
                          alt={shot.title}
                          fill
                          sizes="44px"
                          className={cn(
                            "object-cover transition-transform duration-500",
                            (hoveredShot === shot.id || isActive) ? "scale-110" : ""
                          )}
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-blue-500/10" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={cn("rounded-md text-[8px] font-extrabold px-1.5 py-0.5 tracking-wide uppercase", meta.bgColor, meta.color)}>
                            {meta.category}
                          </span>
                        </div>
                        <p className={cn("font-bold text-sm truncate", isActive ? "text-gray-900" : "text-gray-600")}>
                          {shot.title}
                        </p>
                      </div>
                      <ChevronRight className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-300",
                        isActive ? "text-primary translate-x-0.5" : "text-gray-300 group-hover/tab:text-gray-400"
                      )} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Newsletter CTA Card ── */}
            <div className="rounded-2xl border border-gray-900 bg-gray-950 p-6 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }} />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start gap-3.5 relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shrink-0 shadow-lg shadow-primary/20">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-syne font-bold text-white text-sm leading-snug">
                    New Demos & Walkthroughs
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                    Get notified when new modules are released.
                  </p>
                </div>
              </div>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Invalid email").required("Required"),
                })}
                onSubmit={handleNotify}
              >
                {({ isSubmitting, getFieldProps, errors, touched }) => (
                  <Form className="mt-5 w-full relative z-10">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...getFieldProps("email")}
                        className="bg-transparent outline-none text-slate-200 text-xs w-full placeholder:text-slate-600 focus:outline-none px-3 py-2.5 font-semibold"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg font-bold px-5 py-2.5 text-xs transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/25 cursor-pointer shrink-0"
                      >
                        Notify me
                      </button>
                    </div>
                    {touched.email && errors.email && (
                      <div className="text-[10px] text-red-400 mt-1.5 ml-3 font-semibold">{errors.email}</div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for screenshots */}
      {openScreenshotModal && (
        <ATMModal onClose={() => setOpenScreenshotModal(null)}>
          <div className="p-1">
            <Image
              src={demo.screenshots.find((s) => s.id === openScreenshotModal)?.src || ""}
              alt="Screenshot"
              width={1000}
              height={750}
              className="rounded-lg object-contain w-full"
            />
          </div>
        </ATMModal>
      )}
    </section>
  );
};

export default DemoSection;
