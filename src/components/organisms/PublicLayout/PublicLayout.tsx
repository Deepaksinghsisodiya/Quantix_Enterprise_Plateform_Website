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
        "min-h-screen flex flex-col justify-between bg-gray-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden w-full"
      )}>
        <Suspense fallback={null}>
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
        </Suspense>
      </div>
    </IndustryProvider>
  );
};

export default PublicLayout;
