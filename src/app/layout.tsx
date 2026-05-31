import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Toaster } from "sonner";

// Font configuration
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Site metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Quantix — The All‑in‑One POS Platform",
    template: "%s | Quantix",
  },
  description:
    "Enterprise‑grade POS for retail and restaurant businesses. Streamline orders, inventory, staff, and analytics.",
  openGraph: {
    title: "Quantix POS Platform",
    description:
      "All‑in‑One POS solution for modern businesses. Free trial, no credit card required.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Quantix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quantix dashboard screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantix POS Platform",
    description:
      "All‑in‑One POS solution for modern businesses. Free trial, no credit card required.",
    images: ["/og-image.png"],
    creator: "@quantix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased min-h-full flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster richColors position="top-right" theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
