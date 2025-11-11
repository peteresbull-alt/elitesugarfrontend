"use client";

import { useUpgradeModal } from "@/store/useUpgradeModal";
import {
  X,
  Crown,
  Phone,
  MessageCircle,
  Sparkles,
  Star,
  Shield,
  Zap,
} from "lucide-react";

import { FaTelegram } from "react-icons/fa";

export default function UpgradeModal() {
  const { isOpen, closeModal } = useUpgradeModal();

  if (!isOpen) return null;

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      handle: "+61485976275",
      link: "https://wa.me/61485976275",
      color: "#25D366",
      bgColor: "#25D36610",
    },

    {
      name: "Telegram",
      icon: FaTelegram,
      handle: "@Smsureconnect",
      link: "https://t.me/Smsureconnect",
      color: "#1DA1F2",
      bgColor: "#1DA1F210",
    },

    {
      name: "Phone",
      icon: Phone,
      handle: "+61485976275",
      link: "tel:+61485976275",
      color: "#34A853",
      bgColor: "#34A85310",
    },
  ];

  const membershipTiers = [
    {
      name: "Gold",
      icon: Star,
      color: "#FFD700",
      features: [
        "Unlimited profile views",
        "Priority matches",
        "Advanced search filters",
        "See who liked you",
      ],
    },
    {
      name: "Platinum",
      icon: Crown,
      color: "#E94057",
      features: [
        "All Gold features",
        "VIP visibility boost",
        "Concierge matchmaking",
        "Exclusive events access",
        "Read receipts",
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 lg:p-10 z-1000 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Crown className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  EXCLUSIVE MEMBERSHIP
                </span>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-3">
              Upgrade Your Experience
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Unlock premium features and connect with exclusive members. Get
              VIP visibility, priority matches, and unforgettable experiences.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10">
          {/* Membership Tiers */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6" style={{ color: "#E94057" }} />
              <h3 className="text-2xl font-bold text-gray-900">
                Membership Tiers
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {membershipTiers.map((tier, idx) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-pink-300 transition-all group"
                  >
                    <div className="absolute top-4 right-4">
                      <Icon
                        className="w-8 h-8 opacity-20 group-hover:opacity-30 transition-all"
                        style={{ color: tier.color }}
                      />
                    </div>

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${tier.color}15`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tier.color }} />
                    </div>

                    <h4
                      className="text-2xl font-bold mb-4"
                      style={{ color: tier.color }}
                    >
                      {tier.name} Membership
                    </h4>

                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${tier.color}20` }}
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: tier.color }}
                            ></div>
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Contact Us to Upgrade
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6" style={{ color: "#E94057" }} />
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Ready to elevate your dating experience? Reach out to us through
              any of these channels. Our team is available 24/7 to help you
              upgrade and unlock exclusive benefits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all group"
                    style={{
                      backgroundColor: social.bgColor,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${social.color}20` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: social.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 mb-0.5">
                        {social.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {social.handle}
                      </p>
                    </div>
                    <div className="text-gray-400 group-hover:text-pink-600 transition-all">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
            <div className="flex items-start gap-3">
              <Shield
                className="w-6 h-6 flex-shrink-0 mt-1"
                style={{ color: "#E94057" }}
              />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">
                  Why Contact Us Directly?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We offer personalized membership packages tailored to your
                  needs. Our team will guide you through the upgrade process,
                  answer any questions, and ensure you get the best value for
                  your investment in finding meaningful connections.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={closeModal}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
