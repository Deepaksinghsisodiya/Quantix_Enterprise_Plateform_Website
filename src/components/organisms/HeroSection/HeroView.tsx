import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSlide } from "./HeroData";
import { useContactModal } from "@/context/ContactModalContext";

export interface HeroViewProps {
  slides: HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  onTogglePause: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  slides,
  activeIndex,
  onNext,
  onPrev,
  onGoTo,
  onMouseEnter,
  onMouseLeave,
}) => {
  const slide = slides[activeIndex];
  const { openModal } = useContactModal();

  const formatHeading = (heading: string) => {
    const words = heading.split(" ");
    if (words.length <= 1) return heading;

    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")} <span className="font-black text-primary">{lastWord}</span>
      </>
    );
  };

  const formatMobileHeadingLine = (line: string, isLastLine: boolean) => {
    if (!isLastLine) return line;

    const words = line.split(" ");
    if (words.length <= 1) {
      return <span className="text-primary">{line}</span>;
    }

    const lastWord = words.pop();

    return (
      <>
        {words.join(" ")} <span className="text-primary">{lastWord}</span>
      </>
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white pt-[5.75rem] pb-6 transition-colors dark:border-slate-800/80 dark:bg-slate-950 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 lg:min-h-[760px] lg:pt-36 lg:pb-24 xl:min-h-[820px] xl:pt-40 xl:pb-28"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="site-container relative z-10 grid grid-cols-1 content-start items-start gap-5 min-[380px]:gap-6 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="flex min-w-0 flex-col items-start space-y-3.5 text-left min-[380px]:space-y-4 sm:items-center sm:space-y-5 sm:text-center lg:col-span-7 lg:items-start lg:text-left">
          <div className="inline-flex max-w-full items-center justify-start gap-1.5 self-start rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-left text-[7.5px] font-black uppercase leading-none tracking-normal text-primary shadow-2xs sm:self-auto sm:justify-center sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:leading-snug sm:tracking-wider">
            <Sparkles size={10} className="shrink-0 sm:size-[13px]" />
            <span className="sm:hidden">POS platform for stores & cloud teams</span>
            <span className="hidden sm:inline">POS platform for stores, kitchens, cloud teams, and custom workflows</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-w-0 w-full flex-col items-start gap-3 min-[380px]:gap-3.5 sm:items-center sm:gap-5 lg:items-start"
            >
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary sm:text-xs">
                {slide.badge}
              </span>

              <div className="grid w-full grid-cols-3 items-center gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2 lg:justify-start">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onGoTo(index)}
                    className={cn(
                      "min-h-6 min-w-0 whitespace-nowrap rounded-full border px-2 py-1.5 text-[6.5px] font-extrabold uppercase leading-none tracking-normal transition-all min-[380px]:text-[7px] sm:px-3 sm:text-[11px] sm:tracking-wide",
                      index === activeIndex
                        ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-primary-light"
                    )}
                  >
                    {item.badge}
                  </button>
                ))}
              </div>

              <h1 className="font-syne text-[1.82rem] font-black leading-[1.06] tracking-normal text-slate-900 dark:text-white min-[380px]:text-[2.02rem] sm:max-w-[16ch] sm:text-5xl sm:leading-[1.03] sm:tracking-tight md:text-5xl lg:max-w-[17ch] lg:text-[3.25rem]">
                <span className="block sm:hidden">
                  {slide.mobileHeadingLines.map((line, index) => (
                    <span key={line} className="block whitespace-nowrap">
                      {formatMobileHeadingLine(line, index === slide.mobileHeadingLines.length - 1)}
                    </span>
                  ))}
                </span>
                <span className="hidden sm:inline">{formatHeading(slide.heading)}</span>
              </h1>

              <p className="max-w-[34rem] text-[12px] font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base sm:leading-relaxed lg:text-lg">
                {slide.subheading}
              </p>

              <div className="grid w-full grid-cols-3 gap-2 pt-1 sm:gap-3 sm:pt-1">
                {slide.featureHighlights.map((feat) => (
                  <div
                    key={feat}
                    className="flex min-h-9 min-w-0 items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-2 shadow-2xs dark:border-slate-800 dark:bg-slate-900 sm:min-h-10 sm:gap-2.5 sm:rounded-2xl sm:p-3"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-5 sm:w-5">
                      <Check className="h-2.5 w-2.5 stroke-[3] sm:h-3 sm:w-3" />
                    </div>
                    <span className="min-w-0 text-left text-[8.5px] font-bold leading-tight text-slate-800 dark:text-slate-200 min-[380px]:text-[9px] sm:text-xs">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-row items-center justify-start gap-2 pt-1 sm:w-auto sm:justify-center sm:gap-3 sm:pt-3 lg:justify-start">
                <button
                  type="button"
                  onClick={() => openModal("Start Free Trial", "HERO_FREE_TRIAL")}
                  className="flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 font-syne text-[9px] font-bold uppercase tracking-wide text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:min-h-12 sm:w-auto sm:flex-none sm:gap-2 sm:px-8 sm:py-4 sm:text-xs sm:tracking-wider"
                >
                  <Zap size={13} className="fill-white sm:size-4" />
                  <span>Start Free Trial</span>
                </button>
                <button
                  type="button"
                  onClick={() => openModal("Request Live Demo", "HERO_REQUEST_DEMO")}
                  className="flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-syne text-[9px] font-bold uppercase tracking-wide text-slate-800 shadow-2xs transition-all duration-200 hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:min-h-12 sm:w-auto sm:flex-none sm:gap-2 sm:px-8 sm:py-4 sm:text-xs sm:tracking-wider"
                >
                  <span>Request Demo</span>
                  <ArrowRight size={13} className="sm:size-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 sm:gap-3 sm:pt-2 sm:text-xs lg:items-center">
                <div className="flex items-center gap-1.5 text-primary">
                  <ShieldCheck size={12} className="sm:size-3.5" />
                  <span className="font-bold">Built for POS operations</span>
                </div>
                <span className="hidden sm:inline">
                  Restaurant, retail, enterprise, cloud, and custom solution workflows
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.4 }}
              className="group relative w-full max-w-[34rem] overflow-hidden rounded-2xl bg-transparent lg:max-w-none"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-transparent sm:aspect-[4/3] sm:rounded-2xl">
                <Image
                  src={slide.backgroundImage}
                  alt={slide.heading}
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <button
                  type="button"
                  aria-label="Previous Slide"
                  className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-lg shadow-slate-900/10 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:text-primary active:scale-95 sm:left-3 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100"
                  onClick={onPrev}
                >
                  <ChevronLeft size={15} className="stroke-[2.5] sm:size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next Slide"
                  className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-lg shadow-slate-900/10 transition-all duration-200 hover:border-primary/30 hover:bg-white hover:text-primary active:scale-95 sm:right-3 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100"
                  onClick={onNext}
                >
                  <ChevronRight size={15} className="stroke-[2.5] sm:size-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-2 flex w-full max-w-[34rem] items-center justify-center px-1 sm:mt-4 lg:max-w-none">
            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
              {slides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to ${item.badge}`}
                  className={cn(
                    "h-2 cursor-pointer rounded-full transition-all duration-300 sm:h-2",
                    i === activeIndex
                      ? "w-6 bg-primary sm:w-8"
                      : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 sm:w-2"
                  )}
                  onClick={() => onGoTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#products-showcase"
        className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 opacity-60 transition-opacity hover:opacity-100 md:flex"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Scroll to Explore
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
      </a>
    </section>
  );
};

export default HeroView;
