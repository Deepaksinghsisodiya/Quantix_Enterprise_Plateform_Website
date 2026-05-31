// src/components/organisms/Footer/Footer.tsx
// Wrapper — provides static data to FooterView. Add future API calls here.
import React from "react";
import {
  PRODUCT_LINKS,
  COMPANY_LINKS,
  INDUSTRY_LINKS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from "./FooterData";
import { FooterView } from "./FooterView";

export const Footer: React.FC = () => {
  return (
    <FooterView
      productLinks={PRODUCT_LINKS}
      companyLinks={COMPANY_LINKS}
      industryLinks={INDUSTRY_LINKS}
      legalLinks={LEGAL_LINKS}
      socialLinks={SOCIAL_LINKS}
    />
  );
};

export default Footer;
