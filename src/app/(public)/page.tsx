import HomePageClient from "@/app/(public)/HomePageClient";

export const metadata = {
  title: "Quantix Enterprise — Run Every Location From One Platform | Enterprise POS & Cloud HQ",
  description: "Unified operating platform for restaurant groups, retail chains, and multi-location franchises. POS, inventory, online ordering, payments, and analytics connected across every store.",
  openGraph: {
    title: "Quantix Enterprise — Run Every Location From One Platform | Enterprise POS & Cloud HQ",
    description: "Unified operating platform for restaurant groups, retail chains, and multi-location franchises. POS, inventory, online ordering, payments, and analytics connected across every store.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Quantix Enterprise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quantix Enterprise Operating Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


// Lazy loaded sections (below the fold)

export default function Page() {
  return <HomePageClient />;
}
