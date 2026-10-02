import type { Metadata } from "next";
import { Lato, Syne } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

interface SeoApiResponse {
  metaTitle?: string;
  metaDescription?: string;
  keywordsList?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  googleSiteVerification?: string;
  structuredDataJson?: string;
}

async function fetchSeoData(): Promise<SeoApiResponse | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/v1/seo/public?siteVariant=Enterprise&pageSlug=home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoData();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const title = seo?.metaTitle || "Quantix Enterprise — All-in-One Enterprise POS & Omnichannel Platform";
  const description =
    seo?.metaDescription ||
    "Enterprise-grade cloud POS platform for multi-store retail chains, franchise restaurant groups, and high-volume commerce networks.";
  const keywords =
    seo?.keywordsList && seo.keywordsList.length > 0
      ? seo.keywordsList
      : [
          "enterprise pos system",
          "omnichannel commerce platform",
          "franchise management pos",
          "multi location retail cloud",
        ];

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: title,
      template: "%s | Quantix Enterprise",
    },
    description,
    keywords,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: seo?.canonicalUrl || appUrl,
      siteName: "Quantix Enterprise",
      images: [
        {
          url: seo?.ogImageUrl || "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: (seo?.twitterCard as any) || "summary_large_image",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: [seo?.twitterImageUrl || seo?.ogImageUrl || "/og-image.png"],
    },
    robots: {
      index: seo?.robotsIndex ?? true,
      follow: seo?.robotsFollow ?? true,
      googleBot: {
        index: seo?.robotsIndex ?? true,
        follow: seo?.robotsFollow ?? true,
        "max-image-preview": "large",
      },
    },
    verification: seo?.googleSiteVerification
      ? { google: seo.googleSiteVerification }
      : undefined,
    alternates: {
      canonical: seo?.canonicalUrl || appUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const seo = await fetchSeoData();

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {seo?.structuredDataJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seo.structuredDataJson }}
          />
        )}
      </head>
      <body
        className={`${lato.variable} ${syne.variable} font-sans antialiased min-h-full flex flex-col bg-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster richColors position="top-center" closeButton theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
