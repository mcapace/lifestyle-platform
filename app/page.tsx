import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustSignals } from "@/components/landing/trust-signals";
import { Journey } from "@/components/landing/journey";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-stone-900 text-stone-100">
      <Navbar />
      <Hero />
      <TrustSignals />
      <Journey />
      <Testimonials />
      <Footer />
    </div>
  );
}

