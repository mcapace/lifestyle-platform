"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Privacy\nFirst",
    description:
      "Military-grade encryption. Browse anonymously. Your identity stays yours.",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
  },
  {
    number: "02",
    title: "Verified\nMembers",
    description:
      "Multi-layer verification. Real people. Real connections. Zero tolerance for fakes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    number: "03",
    title: "Safe\nSpace",
    description:
      "AI-powered safety. Human moderation. Your wellbeing is our obsession.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  },
];

export function TrustBold() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Large title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light text-white mb-4">
            Built Different
          </h2>
          <div className="h-1 w-32 bg-brand-500" />
        </motion.div>

        {/* Grid - Large images with text overlay */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  style={{ backgroundImage: `url('${feature.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end">
                <div className="text-7xl font-light text-white/20 mb-4">
                  {feature.number}
                </div>
                <h3 className="text-4xl font-light text-white mb-4 whitespace-pre-line leading-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-500 group-hover:h-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

