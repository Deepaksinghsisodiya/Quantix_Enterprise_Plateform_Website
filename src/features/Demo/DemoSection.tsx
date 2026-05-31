// src/features/Demo/DemoSection.tsx
'use client';

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, ArrowUpRight, Maximize2, Volume2, Sparkles, Film, Image as ImageIcon, Bell } from "lucide-react";
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  const handleNotify = async (values: { email: string }, { resetForm }: any) => {
    await onSubscribeNewsletter(values.email);
    resetForm();
  };

  const getCategory = (title: string) => {
    if (title.toLowerCase().includes("dashboard") || title.toLowerCase().includes("overview")) return "ADMIN PORTAL";
    if (title.toLowerCase().includes("table") || title.toLowerCase().includes("order")) return "OPERATIONS";
    if (title.toLowerCase().includes("inventory") || title.toLowerCase().includes("control")) return "LOGISTICS & STOCK";
    return "PLATFORM FEATURE";
  };

  const activeScreenshot = activeMedia.type === 'screenshot' 
    ? demo.screenshots.find(s => s.id === activeMedia.id)
    : null;

  return (
    <section className="bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 py-24 relative overflow-hidden border-t border-slate-100" ref={ref} id="resources">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 border border-blue-200/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 fill-blue-100" />
            SEE IT IN ACTION
          </div>
          <h2 className="text-3xl font-syne font-black text-gray-900 md:text-5xl uppercase leading-tight">
            Watch Quantix work for you
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-500 font-medium">
            Take a guided tour of the tools powering modern restaurants and retailers worldwide.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left column – media player (7 cols) */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Media Container Frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-200/80 bg-[#0B1528] group">
                
                <AnimatePresence mode="wait">
                  {/* Video Walkthrough View */}
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
                          className="w-full h-full rounded-2xl border-none"
                          allow="autoplay; fullscreen"
                        />
                      ) : (
                        <>
                          <Image
                            src={demo.videoThumbnail}
                            alt="Demo thumbnail"
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Play button overlay */}
                          <button
                            type="button"
                            aria-label="Play demo video"
                            className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/30 transition duration-300 cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                          >
                            <div className="relative flex items-center justify-center">
                              <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-500/30 animate-ping opacity-75" />
                              <span className="absolute inline-flex h-24 w-24 rounded-full bg-blue-500/10 animate-pulse" />
                              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                                <Play className="h-6 w-6 fill-white text-white ml-1" />
                              </div>
                            </div>
                          </button>

                          {/* Top Badges */}
                          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            VIDEO TOUR
                          </span>
                        </>
                      )}
                    </motion.div>
                  ) : (
                    /* Screenshot Preview View */
                    <motion.div
                      key={`screenshot-${activeMedia.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative flex items-center justify-center bg-[#070D19]"
                    >
                      {activeScreenshot && (
                        <>
                          <Image
                            src={activeScreenshot.src}
                            alt={activeScreenshot.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-contain"
                          />
                          
                          {/* Badge indicating viewing screenshot */}
                          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            SCREENSHOT PREVIEW
                          </span>

                          {/* Quick action buttons on player */}
                          <div className="absolute right-4 top-4 flex items-center gap-2">
                            <button
                              type="button"
                              className="rounded-full bg-black/60 backdrop-blur-md border border-white/10 p-2 text-white hover:bg-black/80 transition-all cursor-pointer"
                              title="Expand screenshot"
                              onClick={() => setOpenScreenshotModal(activeScreenshot.id)}
                            >
                              <Maximize2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white hover:bg-blue-700 transition-all cursor-pointer"
                              onClick={() => {
                                setActiveMedia({ type: 'video', id: null });
                                setIsPlaying(false);
                              }}
                            >
                              Back to Video
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Control bar overlay */}
                {activeMedia.type === 'video' && !isPlaying && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between text-white text-[10px] opacity-90 transition duration-300">
                    <div className="flex items-center gap-3 w-full px-2">
                      <Volume2 className="w-3.5 h-3.5 text-slate-200 cursor-pointer hover:text-white" />
                      <div className="flex-1 h-1 bg-slate-700/80 rounded-full relative cursor-pointer">
                        <div className="absolute inset-y-0 left-0 w-2/3 bg-blue-500 rounded-full" />
                        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-50 shadow-md" />
                      </div>
                      <span className="font-mono text-slate-300 font-medium">2:47 / HD</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description Below Media Player */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-syne font-bold text-gray-900 flex items-center gap-2">
                    {activeMedia.type === 'video' ? (
                      <>
                        <Film className="h-5 w-5 text-blue-600" />
                        Quantix Full Platform Walkthrough
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                        {activeScreenshot?.title}
                      </>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 font-medium">
                    {activeMedia.type === 'video' 
                      ? "See how restaurant and retail workflows come together seamlessly."
                      : `Detailed close-up on the ${activeScreenshot?.title.toLowerCase()} page details.`
                    }
                  </p>
                </div>
                <Link
                  href="https://example.com/full-demo"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center shrink-0 cursor-pointer group border-b border-transparent hover:border-blue-600 pb-0.5 transition-all"
                >
                  <span className="mr-1">Full Guide</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right column – screenshots & newsletter form (5 cols) */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            {/* Interactive Screenshots list */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                EXPLORE PLATFORM INTERFACES
              </p>
              <div className="space-y-3">
                {/* Walkthrough Video Tab Option */}
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 sm:gap-4 text-left p-2.5 sm:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.01]",
                    activeMedia.type === 'video'
                      ? "border-blue-500 bg-blue-50/40 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs"
                  )}
                  onClick={() => {
                    setActiveMedia({ type: 'video', id: null });
                    setIsPlaying(false);
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0 shadow-sm">
                    <Film className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block rounded-md bg-red-100 text-red-600 text-[8px] font-extrabold px-1.5 py-0.5 mb-1 tracking-wide uppercase">
                      VIDEO
                    </span>
                    <p className="font-bold text-gray-900 text-sm">Play Platform Video Tour</p>
                  </div>
                  <ArrowUpRight className={cn("h-4 w-4 transition-all duration-300", activeMedia.type === 'video' ? "text-blue-600 translate-x-0.5 -translate-y-0.5" : "text-gray-400")} />
                </button>

                {/* Individual Screenshots */}
                {demo.screenshots.map((shot) => {
                  const isActive = activeMedia.type === 'screenshot' && activeMedia.id === shot.id;
                  return (
                    <button
                      key={shot.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-3 sm:gap-4 text-left p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.01]",
                        isActive
                          ? "border-blue-500 bg-blue-50/40 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500"
                          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 hover:shadow-xs"
                      )}
                      onClick={() => {
                        setActiveMedia({ type: 'screenshot', id: shot.id });
                      }}
                    >
                      <div className="relative h-11 w-11 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <Image
                          src={shot.src}
                          alt={shot.title}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block rounded-md bg-blue-100/80 text-blue-700 text-[8px] font-extrabold px-1.5 py-0.5 mb-1 tracking-wide uppercase">
                          {getCategory(shot.title)}
                        </span>
                        <p className="font-bold text-gray-900 text-sm">{shot.title}</p>
                      </div>
                      <ArrowUpRight className={cn("h-4 w-4 transition-all duration-300", isActive ? "text-blue-600 translate-x-0.5 -translate-y-0.5" : "text-gray-400")} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification Card */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 text-white shadow-xl relative overflow-hidden group/card">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-md shadow-blue-600/20">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-syne font-bold text-white text-base">New Demos & Walkthroughs</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium leading-relaxed">Subscribe to get notified as soon as new modules are released.</p>
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
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-0 bg-transparent sm:bg-slate-900 border-none sm:border sm:border-slate-800 rounded-none sm:rounded-full p-0 sm:p-1 sm:pl-4 w-full focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-all">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...getFieldProps("email")}
                        className="bg-slate-900 sm:bg-transparent border border-slate-800 sm:border-none outline-none text-slate-200 text-xs w-full sm:mr-2 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:focus:ring-0 rounded-full sm:rounded-none px-4 py-3 sm:px-0 sm:py-1 font-semibold"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full font-bold px-6 py-3 sm:py-2 text-xs transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/25 cursor-pointer shrink-0"
                      >
                        Notify me
                      </button>
                    </div>
                    {touched.email && errors.email && (
                      <div className="text-[10px] text-red-400 mt-1.5 ml-4 font-semibold">{errors.email}</div>
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
