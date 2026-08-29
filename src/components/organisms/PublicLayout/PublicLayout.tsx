'use client';

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IndustryProvider } from "@/context/IndustryContext";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { FloatingContactButton } from "@/components/atoms/FloatingContactButton";
import { FirstVisitOfferModal } from "@/components/organisms/OfferPopupModal/FirstVisitOfferModal";
import { motion, useScroll, useSpring } from "framer-motion";

import { AIAssistantModal } from "@/components/organisms/AIAssistantModal/AIAssistantModal";

// Simple wrapper used inside app pages – does NOT render <html>/<body>
export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <IndustryProvider>
      <ContactModalProvider>
        {/* Top Scroll Progress Bar Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-light to-primary-dark z-[100] origin-left pointer-events-none"
          style={{ scaleX }}
        />
        <div className={cn(
          "min-h-screen flex flex-col justify-between bg-gray-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden w-full relative pb-16 md:pb-0"
        )}>
          <Suspense fallback={null}>
            <div className="flex-1 flex flex-col w-full">
              {children}
            </div>
          </Suspense>
          <FloatingContactButton />
          <FirstVisitOfferModal />
          <AIAssistantModal />
        </div>
      </ContactModalProvider>
    </IndustryProvider>
  );
};

export default PublicLayout;
