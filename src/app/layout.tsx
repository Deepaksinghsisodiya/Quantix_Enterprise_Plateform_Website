import type { Metadata } from "next";
import { Lato, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import { Toaster } from "sonner";

// Font configuration matching Restaurant and Retail
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

// Site metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Quantix Enterprise — All-in-One Enterprise POS & Omnichannel Platform",
    template: "%s | Quantix Enterprise",
  },
  description:
    "Enterprise-grade cloud POS platform for multi-store retail chains, franchise restaurant groups, and high-volume commerce networks.",
  openGraph: {
    title: "Quantix Enterprise POS Platform",
    description:
      "Unified POS & Cloud HQ platform for enterprise multi-location operations. Free consultation available.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Quantix Enterprise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quantix Enterprise dashboard screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantix Enterprise POS Platform",
    description:
      "Unified POS & Cloud HQ platform for enterprise multi-location operations. Free consultation available.",
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
      <body className={`${lato.variable} ${syne.variable} font-sans antialiased min-h-full flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster richColors position="top-right" theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
