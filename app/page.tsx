import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroLaunch } from "@/components/landing/hero-launch";
import { Manifesto } from "@/components/landing/manifesto";
import { ComingSoon } from "@/components/landing/coming-soon";
import { Team } from "@/components/landing/team";
import { FinalCTA } from "@/components/landing/final-cta";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <NavbarBold />
      <HeroLaunch />
      <Manifesto />
      <ComingSoon />
      <Team />
      <FinalCTA />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
