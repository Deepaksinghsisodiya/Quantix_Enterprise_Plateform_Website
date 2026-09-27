"use client";

import React, { useMemo } from "react";
import { HOW_IT_WORKS_STEPS } from "../Constants/HowItWorksConstants";
import { HowItWorksView } from "./HowItWorksView";
import { HowItWorksSkeleton } from "./HowItWorksSkeleton";
import { useGetHowItWorksStepsQuery } from "../Service/HowItWorksService";

export const HowItWorksSection: React.FC = () => {
  const { data: apiSteps, isLoading } = useGetHowItWorksStepsQuery({ siteVariant: "Enterprise" });

  const steps = useMemo(() => {
    if (apiSteps && apiSteps.length > 0) {
      return apiSteps;
    }
    return HOW_IT_WORKS_STEPS;
  }, [apiSteps]);

  if (isLoading) {
    return <HowItWorksSkeleton />;
  }

  return <HowItWorksView steps={steps} />;
};

export default HowItWorksSection;
