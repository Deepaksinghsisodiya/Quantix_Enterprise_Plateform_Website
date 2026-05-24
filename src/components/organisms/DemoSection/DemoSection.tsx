// src/components/organisms/DemoSection/DemoSection.tsx
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, ArrowUpRight, Maximize2, Volume2, Sparkles, Film, Image as ImageIcon, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetDemoMediaQuery } from '@/redux/services/demoApi';
import { ATMModal } from "@/components/atoms/ATMModal";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface DemoMedia {
  videoThumbnail: string;
  videoUrl: string;
  screenshots: { id: string; src: string; title: string }[];
}

export const DemoSection = () => {
  const { data } = useGetDemoMediaQuery();
  const demo: DemoMedia = data || {
    videoThumbnail: "/images/demo-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      { id: "1", src: "/images/ss1.jpg", title: "Dashboard Overview" },
      { id: "2", src: "/images/ss2.jpg", title: "Table Management" },
      { id: "3", src: "/images/ss3.jpg", title: "Inventory Control" },
    ],
  };

  const [activeMedia, setActiveMedia] = useState<{ type: 'video' | 'screenshot'; id: string | null }>({
    type: 'video',
    id: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [openScreenshotModal, setOpenScreenshotModal] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  const handleNotify = async (values: { email: string }, { resetForm }: any) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/demo/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      toast.success("We’ll let you know when more demos are live!");
      resetForm();
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
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
    <section className="bg-slate-50/50 py-24 relative overflow-hidden border-t border-slate-100" ref={ref} id="resources">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-600 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 fill-blue-100" />
            SEE IT IN ACTION
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Watch Quantix work for you
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
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
                          {/* Play button overlay with modern ripple effect */}
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

                {/* High fidelity control bar overlay (only if video thumbnail is showing) */}
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
                  <h3 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
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
                  <p className="mt-1 text-sm text-gray-500">
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
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-4">
                EXPLORE PLATFORM INTERFACES
              </p>
              <div className="space-y-3">
                {/* Walkthrough Video Tab Option (to easily reset back to video) */}
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-4 text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer",
                    activeMedia.type === 'video'
                      ? "border-blue-500 bg-blue-50/40 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500 animate-none"
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
                    <span className="inline-block rounded-sm bg-red-100 text-red-600 text-[8px] font-bold px-1.5 py-0.5 mb-1 tracking-wide uppercase">
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
                        "flex w-full items-center gap-4 text-left p-3 rounded-xl border transition-all duration-300 cursor-pointer",
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
                        <span className="inline-block rounded-sm bg-blue-100 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 mb-1 tracking-wide uppercase">
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
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl relative overflow-hidden group/card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-md shadow-blue-600/20">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">New Demos & Walkthroughs</p>
                  <p className="text-xs text-slate-400 mt-0.5">Subscribe to get notified as soon as new modules are released.</p>
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
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-full p-1 pl-4 w-full focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-all">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...getFieldProps("email")}
                        className="bg-transparent border-none outline-none text-slate-200 text-xs w-full mr-2 placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-none p-0 py-1 font-semibold"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full font-bold px-5 py-2 text-xs transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-600/25 cursor-pointer shrink-0"
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
