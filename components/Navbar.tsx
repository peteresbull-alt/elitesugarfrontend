"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={"/"}>
            <div
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#E94057" }}
            >
              SMSureConnect
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Success Stories
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: "#E94057" }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#about"
              className="block py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="block py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Success Stories
            </a>
            <div className="pt-4 space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors border border-gray-200 rounded-full"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/register")}
                className="w-full py-3 text-white font-semibold rounded-full shadow-lg"
                style={{ backgroundColor: "#E94057" }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
