import { NavbarBold } from "@/components/landing/navbar-bold";
import { AppHero } from "@/components/landing/app-hero";
import { WhyBetter } from "@/components/landing/why-better";
import { AppFeatures } from "@/components/landing/app-features";
import { AppCTA } from "@/components/landing/app-cta";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <NavbarBold />
      <AppHero />
      <WhyBetter />
      <AppFeatures />
      <AppCTA />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
