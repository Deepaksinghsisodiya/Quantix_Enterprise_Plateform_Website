'use client';

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IndustryProvider } from "@/context/IndustryContext";

// Simple wrapper used inside app pages – does NOT render <html>/<body>
export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <IndustryProvider>
      <div className={cn(
        "min-h-screen flex flex-col bg-gray-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300",
        !isHome && "pt-[108px]" // Offset exactly the fixed navbar height (Promo Banner 36px + Navbar 72px)
      )}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </div>
    </IndustryProvider>
  );
};

export default PublicLayout;
