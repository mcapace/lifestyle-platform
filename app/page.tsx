import { NavbarRefined } from "@/components/landing/navbar-refined";
import { HeroRefined } from "@/components/landing/hero-refined";
import { FeaturesRefined } from "@/components/landing/features-refined";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsRefined } from "@/components/landing/testimonials-refined";
import { FooterRefined } from "@/components/landing/footer-refined";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavbarRefined />
      <HeroRefined />
      <FeaturesRefined />
      <HowItWorks />
      <TestimonialsRefined />
      <FooterRefined />
    </div>
  );
}
