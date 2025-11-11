"use client";

import {
  Sparkles,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConciergeSection() {
  const router = useRouter();
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762853950/loving-young-couple-kissing-together-restaurant_toihjg.jpg"
                alt="Professional concierge service"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Notification */}
              <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full  shrink-0 overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762853338/profile_telegram_ssmconnect_jttx1t.jpg"
                      alt="Concierge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      Vicki, Your Concierge
                    </div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                      I've arranged a private dinner tonight at an exclusive
                      location. Luxury transportation is included.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold mb-6"
                style={{ color: "#E94057" }}
              >
                💎 Premium Members Only
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Private Dating Concierge
              </h2>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">
              Experience romance with effortless elegance. Our concierge handles
              every detail, letting you focus on connection and chemistry.
            </p>

            <div className="space-y-6 pt-4">
              <ConciergeFeature
                icon={<Sparkles className="w-6 h-6" />}
                title="Handpicked Introductions"
                description="Matches curated with your lifestyle, values, and desires in mind"
              />
              <ConciergeFeature
                icon={<Calendar className="w-6 h-6" />}
                title="Exclusive Date Planning"
                description="From fine dining reservations to event tickets and transportation, every detail is taken care of"
              />
              <ConciergeFeature
                icon={<MessageSquare className="w-6 h-6" />}
                title="Expert Relationship Coaching"
                description="Guidance from certified dating experts to enhance your experience"
              />
              <ConciergeFeature
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Complete Discretion"
                description="Privacy and security ensured for every interaction"
              />
            </div>

            <div className="pt-6">
              <button
                onClick={() => router.push("/register")}
                className="px-10 py-4 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                style={{ backgroundColor: "#E94057" }}
              >
                Unlock Premium Access
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Premium membership starts at $1,000 / 3 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConciergeFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div
        className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
        style={{ backgroundColor: "#E94057" }}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
