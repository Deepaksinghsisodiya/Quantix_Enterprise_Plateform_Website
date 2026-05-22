// src/components/organisms/DemoSection/DemoSection.tsx
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Play, XCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetDemoMediaQuery } from '@/redux/services/demoApi';
import { ATMModal } from "@/components/atoms/ATMModal"; // assumed existing
import { ATMTextField } from "@/components/atoms/ATMTextField";
import { ATMButton } from "@/components/atoms/ATMButton";
import { toast } from "sonner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface DemoMedia {
  videoThumbnail: string;
  videoUrl: string;
  screenshots: { id: string; src: string; title: string }[];
}

export const DemoSection = () => {
  const { data, isLoading, isError } = useGetDemoMediaQuery();
  const demo: DemoMedia = data || {
    videoThumbnail: "/images/demo-thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      { id: "1", src: "/images/ss1.jpg", title: "Dashboard Overview" },
      { id: "2", src: "/images/ss2.jpg", title: "Table Management" },
      { id: "3", src: "/images/ss3.jpg", title: "Inventory Control" },
    ],
  };

  const [openVideo, setOpenVideo] = useState(false);
  const [openScreenshot, setOpenScreenshot] = useState<string | null>(null);

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

  const handleNotify = async (values: { email: string }) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/demo/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      toast.success("We’ll let you know when more demos are live!");
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white py-20" ref={ref} id="resources">
      <div className="site-container">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 mb-4">
            SEE IT IN ACTION
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Watch Qauntix work for you
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            A closer look at the platform that powers 2,000+ businesses.
          </p>
        </div>

        {/* Content grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column – video player */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-[#0B1528] group">
              <Image
                src={demo.videoThumbnail}
                alt="Demo thumbnail"
                fill
                className="object-cover opacity-90"
              />
              {/* Play button overlay */}
              <button
                type="button"
                aria-label="Play demo video"
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/30 transition duration-300"
                onClick={() => setOpenVideo(true)}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-110 active:scale-95 text-white transition-all duration-200 shadow-lg shadow-blue-600/35">
                  <Play className="h-6 w-6 fill-white text-white ml-1" />
                </div>
              </button>
              {/* DEMO Badge */}
              <span className="absolute left-4 top-4 rounded bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                DEMO
              </span>
              {/* High fidelity control bar overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex items-center justify-between text-white text-[10px] opacity-90">
                <div className="flex items-center gap-3 w-full px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-slate-200 cursor-pointer hover:text-white">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06z" />
                  </svg>
                  <div className="flex-1 h-1 bg-slate-700/80 rounded-full relative cursor-pointer">
                    <div className="absolute inset-y-0 left-0 w-2/3 bg-blue-500 rounded-full" />
                    <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-md" />
                  </div>
                  <span className="font-mono text-slate-300">2:47</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Qauntix Full Platform Walkthrough
                </h3>
                <p className="mt-1 text-sm text-gray-500">See how restaurant and retail workflows come together</p>
              </div>
              <Link
                href="https://example.com/full-demo"
                target="_blank"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center shrink-0 cursor-pointer"
              >
                <span className="mr-1">Full Demo</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right column – screenshots & form */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                SCREENSHOTS & HIGHLIGHTS
              </p>
              <div className="mt-4 space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex animate-pulse items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="h-14 w-14 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))
                ) : (
                  demo.screenshots.map((shot) => (
                    <button
                      key={shot.id}
                      type="button"
                      className="flex w-full items-center gap-4 text-left p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
                      onClick={() => setOpenScreenshot(shot.id)}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.title}
                        width={56}
                        height={56}
                        className="rounded-lg object-cover border border-slate-200"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm">{shot.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Click to expand</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Notification card */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                  <Play className="h-4.5 w-4.5 fill-blue-600 text-blue-600 ml-0.5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">More demos coming soon</p>
                  <p className="text-xs text-gray-500 mt-0.5">Subscribe to get notified when new feature walkthroughs drop.</p>
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
                  <Form className="mt-4 w-full">
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-full p-1 pl-4 w-full focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...getFieldProps("email")}
                        className="bg-transparent border-none outline-none text-slate-800 text-xs w-full mr-2 placeholder:text-slate-400 focus:outline-none focus:ring-0 focus:border-none p-0 py-1 font-semibold"
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
                      <div className="text-[10px] text-red-500 mt-1.5 ml-4 font-semibold">{errors.email}</div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for video */}
      {openVideo && (
        <ATMModal onClose={() => setOpenVideo(false)}>
          <iframe
            src={demo.videoUrl}
            title="Qauntix demo"
            className="aspect-video w-full rounded"
            allow="autoplay; fullscreen"
          />
        </ATMModal>
      )}
      {/* Modal for screenshots */}
      {openScreenshot && (
        <ATMModal onClose={() => setOpenScreenshot(null)}>
          <Image
            src={demo.screenshots.find((s) => s.id === openScreenshot)?.src || ""}
            alt="Screenshot"
            width={800}
            height={600}
            className="rounded"
          />
        </ATMModal>
      )}
    </section>
  );
};

export default DemoSection;
