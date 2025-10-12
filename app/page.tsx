import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroLifestyle } from "@/components/landing/hero-lifestyle";
import { Intrigue } from "@/components/landing/intrigue";
import { NarrativeSection } from "@/components/landing/narrative-section";
import { WhoThisIsFor } from "@/components/landing/who-this-is-for";
import { WhatMakesUsDifferent } from "@/components/landing/what-makes-us-different";
import { Principles } from "@/components/landing/principles";
import { SocialProof } from "@/components/landing/social-proof";
import { EarlyAccess } from "@/components/landing/early-access";
import { Channels } from "@/components/landing/channels";
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
      <NarrativeSection />
      <WhoThisIsFor />
      <WhatMakesUsDifferent />
      <Principles />
      <SocialProof />
      <EarlyAccess />
      <Channels />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
