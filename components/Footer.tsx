"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
          ÉLITE
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div
              className="text-4xl font-bold mb-4"
              style={{ color: "#E94057" }}
            >
              Élite
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              The premier dating platform for accomplished women seeking
              meaningful connections with exceptional partners.
            </p>
            <div className="flex gap-4">
              <SocialIcon>
                <Facebook className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon>
                <Twitter className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon>
                <Instagram className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon>
                <Linkedin className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © 2025 Élite. All rights reserved. Made with ❤️ for accomplished
            women.
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 justify-center">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
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
