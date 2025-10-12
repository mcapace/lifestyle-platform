"use client";

import { RevealText } from "@/components/ui/reveal-text";

export function NarrativeSection() {
  return (
    <section className="py-40 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <RevealText>
          <div className="space-y-12">
            {/* Opening */}
            <div>
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                Curious about swinging? Opening your relationship? Exploring polyamory?
              </p>
            </div>

            {/* Problem */}
            <div>
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
                For too long, the lifestyle community has made do with outdated platforms. 
                Clunky interfaces from the 90s. Fake profiles. Zero discretion. 
                Your desires deserve better.
              </p>
            </div>

            {/* Transition */}
            <div className="h-px w-32 bg-brand-500" />

            {/* Solution */}
            <div>
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                This is the modern sanctuary you&apos;ve been waiting for.
              </p>
            </div>

            {/* Vision */}
            <div>
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
                Where couples connect with couples. Where singles find like-minded partners. 
                Where your fantasies meet reality—safely, privately, elegantly.
              </p>
            </div>

            {/* Close */}
            <div>
              <p className="text-xl text-white font-light">
                No judgment. No drama. Just authentic exploration.
              </p>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

