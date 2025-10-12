import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroVisual } from "@/components/landing/hero-visual";
import { SplitVisual } from "@/components/landing/split-visual";
import { FeaturesVisual } from "@/components/landing/features-visual";
import { FinalCTA } from "@/components/landing/final-cta";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <NavbarBold />
      <HeroVisual />
      <SplitVisual />
      <FeaturesVisual />
      <FinalCTA />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
