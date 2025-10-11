export function Journey() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description:
        "Share as much or as little as you're comfortable with. Your profile, your story, your boundaries.",
    },
    {
      number: "2",
      title: "Verify & Set Privacy",
      description:
        "Choose who can see you, when, and how. From ghost mode to full social—you're in control.",
    },
    {
      number: "3",
      title: "Explore & Connect",
      description:
        "Browse educational content, join discussion groups, or start conversations—no pressure to rush.",
    },
    {
      number: "4",
      title: "Engage When Ready",
      description:
        "From digital connection to curated events—explore the lifestyle at your own pace.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Your Journey, Your Pace
          </h2>
          <p className="text-xl text-stone-400">
            From curiosity to connection, we meet you where you are
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-700/20 border border-amber-700 rounded-full flex items-center justify-center text-amber-200 font-semibold text-lg">
                {step.number}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-stone-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

