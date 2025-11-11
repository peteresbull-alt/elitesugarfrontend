"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-20 overflow-hidden">
      {/* Gigantic Background Text for Desktop */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          className="font-bold text-gray-800 select-none leading-none opacity-50"
          style={{
            fontSize: "clamp(200px, 20vw, 350px)",
            letterSpacing: "-0.02em",
          }}
        >
          SMSureConnect
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div
              className="text-4xl font-bold mb-4"
              style={{ color: "#E94057" }}
            >
              SMSureConnect
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              SMSureConnect (Sugar Mommy Sure Connect) is the #1 online dating platform where
              confident men meet rich, successful sugar mommies and elegant
              empresses. Connect with generous, powerful women who love to
              spoil, support, and share real luxury relationships built on trust
              and attraction.
            </p>
            <div className="flex gap-4">
              <SocialIcon>
                <FaTelegram className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon>
                <FaWhatsapp className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>

          {/* Product Column */}
          <div className="md:p-3">
            <h4 className="font-bold text-white mb-4 text-lg mt-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400 flex gap-5 flex-wrap ">
              <li>
                <a
                  href="/register"
                  className="hover:text-white transition-colors"
                >
                  Get Started
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t mt-6 border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © 2025 SMSureConnect. All rights reserved. Made with love for those
            seeking affectionate women.
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}
