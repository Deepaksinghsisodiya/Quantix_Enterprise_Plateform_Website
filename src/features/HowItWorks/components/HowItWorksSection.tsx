"use client";

import React from "react";
import { HowItWorksView } from "./HowItWorksView";
import { HowItWorksSkeleton } from "./HowItWorksSkeleton";
import { useGetHowItWorksStepsQuery } from "../Service/HowItWorksService";

export const HowItWorksSection: React.FC = () => {
  const { data: steps, isLoading, isError } = useGetHowItWorksStepsQuery({ siteVariant: "Enterprise" });

  if (isLoading) {
    return <HowItWorksSkeleton />;
  }

  if (isError || !steps || steps.length === 0) {
    return null;
  }

  return <HowItWorksView steps={steps} />;
};

export default HowItWorksSection;
