"use client";

import React from "react";
import { HOW_IT_WORKS_STEPS } from "../Constants/HowItWorksConstants";
import { HowItWorksView } from "./HowItWorksView";

export const HowItWorksSection: React.FC = () => {
  return <HowItWorksView steps={HOW_IT_WORKS_STEPS} />;
};

export default HowItWorksSection;
