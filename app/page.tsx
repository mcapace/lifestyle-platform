import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroBold } from "@/components/landing/hero-bold";
import { TrustBold } from "@/components/landing/trust-bold";
import { JourneyBold } from "@/components/landing/journey-bold";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <NavbarBold />
      <HeroBold />
      <TrustBold />
      <JourneyBold />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
