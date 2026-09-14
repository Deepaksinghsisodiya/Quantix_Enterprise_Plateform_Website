"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ConnectIntegrationButtonProps {
  integrationName: string;
  integrationSlug: string;
  className?: string;
}

export function ConnectIntegrationButton({
  integrationName,
  integrationSlug,
  className,
}: ConnectIntegrationButtonProps) {
  const getInitialUrl = () => {
    const raw =
      process.env.NEXT_PUBLIC_ADMIN_PORTAL_URL ||
      "https://quantixadmin.foreteksolution.in";
    const clean = raw.replace(/\/$/, "");
    return clean.endsWith("/login") ? clean : `${clean}/login`;
  };

  const [adminUrl, setAdminUrl] = React.useState<string>(getInitialUrl);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        setAdminUrl("http://localhost:3001/login");
      }
    }
  }, []);

  const defaultClasses =
    "w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-4 sm:px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95 text-center cursor-pointer group";

  return (
    <a
      href={adminUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Login to Admin Portal to connect ${integrationName}`}
      className={className || defaultClasses}
    >
      <span className="truncate">Connect {integrationName}</span>
      <ArrowRight size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
}

export default ConnectIntegrationButton;
