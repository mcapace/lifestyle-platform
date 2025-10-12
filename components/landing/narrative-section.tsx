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
                For years, the lifestyle community has been underserved.
              </p>
            </div>

            {/* Problem */}
            <div>
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
                Platforms built in different eras. Privacy as an afterthought. 
                Verification? Optional. Design? Outdated.
              </p>
            </div>

            {/* Transition */}
            <div className="h-px w-32 bg-brand-500" />

            {/* Solution */}
            <div>
              <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
                We&apos;re building what should have existed all along.
              </p>
            </div>

            {/* Vision */}
            <div>
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
                A space where your identity is verified, your privacy is paramount, 
                and your experience is elevated. Where sophistication isn&apos;t a luxury—it&apos;s the standard.
              </p>
            </div>

            {/* Close */}
            <div>
              <p className="text-lg text-neutral-500 font-light italic">
                This is more than a platform. It&apos;s a movement.
              </p>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

