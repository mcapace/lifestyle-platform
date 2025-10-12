import { NavbarRefined } from "@/components/landing/navbar-refined";
import { HeroRefined } from "@/components/landing/hero-refined";
import { StatsRefined } from "@/components/landing/stats-refined";
import { TrustRefined } from "@/components/landing/trust-refined";
import { JourneyRefined } from "@/components/landing/journey-refined";
import { SocialProofRefined } from "@/components/landing/social-proof-refined";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <NavbarRefined />
      <HeroRefined />
      <StatsRefined />
      <TrustRefined />
      <JourneyRefined />
      <SocialProofRefined />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
