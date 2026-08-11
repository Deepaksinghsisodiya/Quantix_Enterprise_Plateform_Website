"use client";

import React from "react";
import SplitAuthLayout from "@/components/organisms/SplitAuthLayout/SplitAuthLayout";
import RegisterFormWrapper from "@/features/Register/components/RegisterWrapper";

export default function SignUpPage() {
  return (
    <SplitAuthLayout
      coverImage="/signup_cover.png"
      coverAlt="Quantix Modern Retail Checkout"
      coverHeadline="Start selling in minutes"
      coverSubtext="Set up your store, add products, and accept payments — no technical knowledge required."
    >
      <RegisterFormWrapper />
    </SplitAuthLayout>
  );
}
