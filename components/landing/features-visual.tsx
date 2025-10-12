"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Verified",
    subtitle: "Identity",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
  {
    title: "Private",
    subtitle: "Messaging",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80",
  },
  {
    title: "Secure",
    subtitle: "By Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Curated",
    subtitle: "Experiences",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
];

export function FeaturesVisual() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-4xl font-light text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xl text-brand-500 font-light">
                  {feature.subtitle}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

