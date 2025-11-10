"use client";

import { BadgeCheck, Lock, Users, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-white to-pink-50/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
                    alt="Successful woman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop"
                    alt="Elegant woman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop"
                    alt="Professional woman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop"
                    alt="Sophisticated woman"
                    className="w-full h-full object-cover"
                  />
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
                About EliteSugar
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Meet Ambitious Women seeking for Love and Affection
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">EliteSugar</strong> is a
                premier platform crafted for accomplished women who seek romance
                without compromise.
              </p>

              <p>
                As a high-achieving woman—CEO, doctor, entrepreneur, or
                creative—you deserve a partner who celebrates your success and
                matches your sophistication.
              </p>

              <p>
                Unlike ordinary dating apps,{" "}
                <strong className="text-gray-900">
                  EliteSugar connects you with verified, accomplished
                  individuals
                </strong>{" "}
                committed to meaningful connections and genuine compatibility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <BadgeCheck
                    className="w-6 h-6"
                    style={{ color: "#E94057" }}
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Verified Profiles
                  </div>
                  <div className="text-sm text-gray-600">
                    Identity & income verification
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Lock className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Privacy First
                  </div>
                  <div className="text-sm text-gray-600">
                    Your discretion is guaranteed
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Users className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Curated Matches
                  </div>
                  <div className="text-sm text-gray-600">
                    Quality over quantity
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Shield className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Concierge Service
                  </div>
                  <div className="text-sm text-gray-600">
                    White-glove dating support
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                className="px-10 py-4 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                style={{ backgroundColor: "#E94057" }}
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
