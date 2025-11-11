"use client";

import { UserCircle, Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowItWorksSection() {
  const router = useRouter();
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background with beautiful couple image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-gray-900/95 to-gray-800/95"></div>
        <img
          src="/romans-1.jpg"
          alt="Happy couple"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            How SMSureConnect Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A refined journey where chemistry meets curation — designed for
            those who know exactly what they want.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <Step
            number="01"
            title="Create Your Presence"
            description="Step into an exclusive world of like-minded achievers. Your profile is your signature — a reflection of your story, ambition, and allure. Every verification ensures authenticity and class."
            icon={<UserCircle className="w-8 h-8" />}
          />

          <Step
            number="02"
            title="Receive Curated Matches"
            description="Our discreet algorithm and concierge team pair you with individuals who mirror your drive, values, and sophistication. Because true connection deserves precision."
            icon={<Heart className="w-8 h-8" />}
          />

          <Step
            number="03"
            title="Connect & Experience"
            description="From elegant video encounters to private events, each interaction is designed for chemistry and ease. Let your concierge craft moments that feel effortlessly natural — and undeniably magnetic."
            icon={<MessageCircle className="w-8 h-8" />}
          />
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <button
            onClick={() => router.push("/register")}
            className="px-12 py-5 bg-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            style={{ color: "#E94057" }}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl"
          style={{ backgroundColor: "#E94057" }}
        >
          {icon}
        </div>

        <div
          className="text-7xl font-bold opacity-10 absolute top-4 right-8 select-none"
          style={{ color: "#E94057" }}
        >
          {number}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}
