"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, MessageCircle, Sparkles, Heart } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";

const AccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  useEffect(() => {
    const hasAccess = localStorage.getItem("siteAccess");
    if (!hasAccess) setIsOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/verify-code/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("siteAccess", "granted");
        setMessage({
          type: "success",
          text: data.message || "Access granted! Welcome.",
        });
        setTimeout(() => setIsOpen(false), 1000);
      } else {
        setMessage({ type: "error", text: data.message || "Invalid code." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[999]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-[1px] shadow-2xl w-[90%] max-w-md"
          >
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 text-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                {/* Header Icon */}
                <div className="flex justify-center mb-5">
                  <div className="bg-gradient-to-br from-pink-600 to-rose-500 p-4 rounded-2xl shadow-md">
                    <Lock className="text-white w-7 h-7" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                  Private Access Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  Welcome to the world’s most{" "}
                  <span className="text-rose-500 font-semibold">
                    exclusive connections
                  </span>
                  . Enter your admin code to access profiles of elegant,
                  generous women seeking real chemistry.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your private code"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800 rounded-xl px-4 py-3 text-center text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />

                  {message.text && (
                    <p
                      className={`text-sm ${
                        message.type === "error"
                          ? "text-red-500"
                          : message.type === "success"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {message.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60"
                  >
                    {loading ? "Verifying..." : "Unlock Access"}
                  </button>
                </form>

                {/* Contact Section */}
                <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                  Don’t have a code? Contact our concierge team:
                  <div className="flex justify-center gap-5 mt-3">
                    <a
                      href="mailto:admin@example.com"
                      target="_blank"
                      className="flex items-center gap-1 hover:text-pink-600 transition"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </a>
                    <a
                      href="https://t.me/youradmin"
                      target="_blank"
                      className="flex items-center gap-1 hover:text-pink-600 transition"
                    >
                      <MessageCircle className="w-4 h-4" /> Telegram
                    </a>
                  </div>
                </div>

                {/* Tagline */}
                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-rose-500">
                      We’ll connect you
                    </span>{" "}
                    with the most beautiful women who value elegance,
                    generosity, and adventure.
                  </p>
                  <div className="flex justify-center mt-3">
                    <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
                    <Heart className="w-5 h-5 text-rose-500 animate-bounce mx-1" />
                    <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessModal;
