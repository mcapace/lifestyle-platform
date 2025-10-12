import { NavbarBold } from "@/components/landing/navbar-bold";
import { HeroLifestyle } from "@/components/landing/hero-lifestyle";
import { RealWaitlistStats } from "@/components/landing/real-waitlist-stats";
import { Intrigue } from "@/components/landing/intrigue";
import { NarrativeSection } from "@/components/landing/narrative-section";
import { WhoThisIsFor } from "@/components/landing/who-this-is-for";
import { BentoGrid } from "@/components/landing/bento-grid";
import { WhatMakesUsDifferent } from "@/components/landing/what-makes-us-different";
import { MarqueeLogos } from "@/components/landing/marquee-logos";
import { Principles } from "@/components/landing/principles";
import { FAQElegant } from "@/components/landing/faq-elegant";
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
      <RealWaitlistStats />
      <Intrigue />
      <NarrativeSection />
      <WhoThisIsFor />
      <BentoGrid />
      <WhatMakesUsDifferent />
      <MarqueeLogos />
      <Principles />
      <FAQElegant />
      <EarlyAccess />
      <Channels />
      <FooterRefined />
      <Toaster />
    </div>
  );
}
