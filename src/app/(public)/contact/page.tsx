"use client";

import React from "react";
import SplitAuthLayout from "@/components/organisms/SplitAuthLayout/SplitAuthLayout";
import ContactSalesFormWrapper from "@/components/organisms/ContactSalesSection/ContactSalesFormWrapper";

export default function ContactSalesPage() {
  return (
    <SplitAuthLayout
      coverImage="/contact_cover.png"
      coverAlt="Quantix Enterprise Solutions"
      coverHeadline="Built for scale"
      coverSubtext="From single-store setups to enterprise chains — our team designs solutions tailored to your growth."
    >
      <ContactSalesFormWrapper />
    </SplitAuthLayout>
  );
}
