import HomePageClient from "./(public)/HomePageClient";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function Page() {
  return (
    <PublicLayout>
      <Navbar />
      <HomePageClient />
      <Footer />
    </PublicLayout>
  );
}
