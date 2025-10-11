import { Navbar } from "@/components/landing/navbar";
import { HeroModern } from "@/components/landing/hero-modern";
import { TrustSignalsModern } from "@/components/landing/trust-signals-modern";
import { JourneyModern } from "@/components/landing/journey-modern";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-stone-100">
      <Navbar />
      <HeroModern />
      <TrustSignalsModern />
      <JourneyModern />
      <Testimonials />
      <Footer />
    </div>
  );
}
