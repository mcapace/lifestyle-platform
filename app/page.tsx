import { NavbarRefined } from "@/components/landing/navbar-refined";
import { HeroRefined } from "@/components/landing/hero-refined";
import { TrustRefined } from "@/components/landing/trust-refined";
import { JourneyRefined } from "@/components/landing/journey-refined";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <NavbarRefined />
      <HeroRefined />
      <TrustRefined />
      <JourneyRefined />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
