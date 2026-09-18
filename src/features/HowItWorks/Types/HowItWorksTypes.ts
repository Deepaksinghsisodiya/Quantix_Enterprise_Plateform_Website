export interface HowItWorksTelemetryChip {
  label: string;
  sublabel: string;
  status: "active" | "ready" | "verified";
}

export interface HowItWorksStep {
  number: string;
  badgeLabel: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
  stat: {
    value: string;
    label: string;
  };
  telemetryChips: HowItWorksTelemetryChip[];
}
