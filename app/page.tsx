import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroLifestyle } from "@/components/landing/hero-lifestyle";
import { Intrigue } from "@/components/landing/intrigue";
import { WhatWeAre } from "@/components/landing/what-we-are";
import { SocialProof } from "@/components/landing/social-proof";
import { FinalInvite } from "@/components/landing/final-invite";
import { FooterRefined } from "@/components/landing/footer-refined";
import { Toaster } from "@/components/ui/toaster";
import { FloatingElements } from "@/components/ui/floating-elements";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative">
      <FloatingElements />
      <NavbarBold />
      <HeroLifestyle />
      <Intrigue />
      <WhatWeAre />
      <SocialProof />
      <FinalInvite />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
