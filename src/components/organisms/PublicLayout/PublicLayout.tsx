// src/components/organisms/PublicLayout/PublicLayout.tsx
import React from "react";
import { cn } from "@/lib/utils";

// Simple wrapper used inside app pages – does NOT render <html>/<body>
export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("min-h-screen flex flex-col bg-gray-100 text-gray-900")}>
      {children}
    </div>
  );
};

export default PublicLayout;
