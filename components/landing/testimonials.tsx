import { Sparkles } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Finally, a platform that respects both my curiosity and my privacy. The verification process made me feel safe from day one.",
      author: "Sarah M.",
      location: "New York",
    },
    {
      quote:
        "Sophisticated without being sterile. Sexy without being sleazy. This is what the lifestyle community has been missing.",
      author: "Michael R.",
      location: "Los Angeles",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">
          What Members Are Saying
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-zinc-800/50 border border-stone-700 rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-stone-300 mb-4 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="text-stone-500 text-sm">
                — {testimonial.author}, {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

