import { LucideIcon } from "lucide-react";

export type CardTabMode = "problem" | "solution";

export interface VisualMeterData {
  icon: LucideIcon;
  legacyText: string;
  quantixText: string;
}

export interface BusinessProblemItem {
  id: string;
  shortTabLabel: string;
  icon: LucideIcon;
  tag: string;
  severity: string;
  title: string;
  description: string;
  impact: string;
  visualMeter: VisualMeterData;
  fix: string[];
}
