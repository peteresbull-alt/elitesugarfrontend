"use client";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            EliteSugar Privileges
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every tool you need for a refined, effortless romance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎯"
            title="Tailored Matches"
            description="Our intelligent system introduces you to individuals who perfectly complement your lifestyle and values."
            color="#E94057"
          />

          <FeatureCard
            icon="💎"
            title="Verified Affluence"
            description="All members confirm their accomplishments, ensuring your circle is curated for quality and sophistication."
            color="#9333EA"
          />

          <FeatureCard
            icon="🛡️"
            title="Trusted Identity"
            description="Stringent verification including photos and background checks keep your experience secure."
            color="#EC4899"
          />

          <FeatureCard
            icon="📹"
            title="HD Video Introductions"
            description="Seamless, high-quality video meetings so you can feel the chemistry before meeting."
            color="#E94057"
          />

          <FeatureCard
            icon="✨"
            title="Exclusive Gatherings"
            description="Access curated events, elegant soirées, and intimate networking experiences."
            color="#9333EA"
          />

          <FeatureCard
            icon="🤝"
            title="Personal Concierge"
            description="Your dedicated team handles every detail, from date planning to reservations."
            color="#EC4899"
          />

          <FeatureCard
            icon="🔒"
            title="Discreet & Private"
            description="Advanced privacy controls ensure your connections remain confidential."
            color="#E94057"
          />

          <FeatureCard
            icon="💬"
            title="Coaching & Guidance"
            description="Sessions with relationship experts to elevate your dating journey."
            color="#9333EA"
          />

          <FeatureCard
            icon="🌍"
            title="Global Connections"
            description="Meet accomplished members across cities worldwide, expanding your circle of possibility."
            color="#EC4899"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="group relative">
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        style={{ backgroundColor: color }}
      ></div>
      <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
