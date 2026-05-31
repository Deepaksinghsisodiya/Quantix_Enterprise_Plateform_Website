// src/components/organisms/HowItWorksSection/HowItWorksSection.tsx
// Wrapper — provides static step data (or future API data) to HowItWorksView.
import React from "react";
import { HOW_IT_WORKS_STEPS } from "./HowItWorksData";
import { HowItWorksView } from "./HowItWorksView";

export const HowItWorksSection: React.FC = () => {
  return <HowItWorksView steps={HOW_IT_WORKS_STEPS} />;
};

export default HowItWorksSection;
