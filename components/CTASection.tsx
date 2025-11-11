"use client";

import { Apple, Play, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop"
          alt="Elegant romantic setting"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(233, 64, 87, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)",
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Begin Your Story
          <span className="block mt-2">With SMSureConnect</span>
        </h2>

        <p className="text-xl sm:text-2xl text-white/95 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
          Join a refined circle of women who savor meaningful connections and
          timeless romance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12">
          <button
            onClick={() => router.push("/register")}
            className="group px-12 sm:px-14 py-5 bg-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-3"
            style={{ color: "#E94057" }}
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Free to join</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
