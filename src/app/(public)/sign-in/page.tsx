"use client";

import React from "react";
import SplitAuthLayout from "@/components/organisms/SplitAuthLayout/SplitAuthLayout";
import SignInFormWrapper from "@/components/organisms/SignInSection/SignInFormWrapper";

export default function SignInPage() {
  return (
    <SplitAuthLayout
      coverImage="/signin_cover.png"
      coverAlt="Quantix POS Analytics Dashboard"
      coverHeadline="Your business insights, at a glance"
      coverSubtext="Track sales, manage inventory, and grow your revenue — all from one powerful dashboard."
    >
      <SignInFormWrapper />
    </SplitAuthLayout>
  );
}
