import { Lock, CheckCircle, Shield } from "lucide-react";

export function TrustSignals() {
  const features = [
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "Your identity, your control. Browse anonymously, share selectively, with military-grade encryption.",
    },
    {
      icon: CheckCircle,
      title: "Verified Members",
      description:
        "Multi-layer verification combats fakes, bots, and catfishing. Real people, real connections.",
    },
    {
      icon: Shield,
      title: "Safe Space",
      description:
        "Zero tolerance for harassment. Human moderation, AI-powered safety, with your wellbeing as priority.",
    },
  ];

  return (
    <section className="py-20 px-6 border-t border-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl flex items-center justify-center">
                <feature.icon className="text-amber-200" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-stone-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

