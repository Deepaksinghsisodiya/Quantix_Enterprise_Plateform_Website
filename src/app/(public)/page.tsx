import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import HomePageClient from "@/app/(public)/HomePageClient";


export const metadata = {
  title: "Quantix — The All-in-One POS Platform",
  description: "The modern POS platform for retail and restaurant businesses. Simple, powerful, and built to scale.",
  openGraph: {
    title: "Quantix — The All-in-One POS Platform",
    description: "The modern POS platform for retail and restaurant businesses. Simple, powerful, and built to scale.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Quantix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quantix branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// Lazy loaded sections (below the fold)

export default function Page() {
  return (
    <PublicLayout>
      <HomePageClient />
    </PublicLayout>
  );
}
