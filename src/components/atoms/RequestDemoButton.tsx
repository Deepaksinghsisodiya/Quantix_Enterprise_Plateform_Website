'use client';

import React from "react";
import { useContactModal } from "@/context/ContactModalContext";

interface RequestDemoButtonProps {
  title?: string;
  buttonText?: string;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const RequestDemoButton: React.FC<RequestDemoButtonProps> = ({
  title,
  buttonText,
  label = "Request Live Demo",
  className,
  icon,
}) => {
  const { openModal } = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openModal(title, buttonText)}
      className={
        className ??
        "w-full sm:w-auto flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
      }
    >
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default RequestDemoButton;
