import React from "react";
import { cn } from "@/lib/utils";

export interface ATMBadgeProps {
  /** Text to display inside the badge */
  label?: string;
  children?: React.ReactNode;
  /** Tailwind color name (e.g., "primary", "gray", "blue-500") */
  color?: string;
  variant?: string;
  /** Optional additional class names */
  className?: string;
}

/**
 * ATMBadge – a simple pill‑style badge used across the app.
 * It gets a background color from the `color` or `variant` prop (defaults to primary).
 * The component is deliberately lightweight – just a <span> with Tailwind classes.
 */
export const ATMBadge = ({ label, children, color = "primary", variant, className }: ATMBadgeProps) => {
  const badgeColor = variant || color;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        `bg-${badgeColor} bg-opacity-10 text-${badgeColor}`,
        className,
      )}
    >
      {label || children}
    </span>
  );
};

export default ATMBadge;
