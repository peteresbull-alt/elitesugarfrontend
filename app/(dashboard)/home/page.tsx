"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Shield,
  Crown,
  Star,
  Zap,
  ChevronRight,
  Calendar,
  MapPin,
  Award,
  Target,
  Activity,
  Loader,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { useUpgradeModal } from "@/store/useUpgradeModal";

const API_BASE_URL = BACKEND_URL; // Update with your BACKEND_URL

interface StatCard {
  value: string;
  label: string;
  icon: any;
  color: string;
  change?: string;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: any;
  gradient: string;
}

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_views: number;
  matches_count: number;
  favorites_count: number;
}

export default function DashboardHome() {
  const [userName, setUserName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


  const { openModal } = useUpgradeModal();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 18) return "Good Afternoon";
      return "Good Evening";
    };
    setCurrentTime(updateGreeting());
    fetchUserProfile();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setUserName(data.first_name);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const stats: StatCard[] = [
    {
      value: userProfile ? userProfile.profile_views.toString() : "0",
      label: "Profile Views",
      icon: Activity,
      color: "#E94057",
      change: "+22%",
    },
    {
      value: userProfile ? userProfile.matches_count.toString() : "0",
      label: "Sugar Matches",
      icon: Heart,
      color: "#8B5CF6",
      change: "+15%",
    },
    {
      value: userProfile ? userProfile.favorites_count.toString() : "0",
      label: "Favorites",
      icon: MessageCircle,
      color: "#10B981",
      change: "+31%",
    },
    {
      value: "97%",
      label: "Generosity Rate",
      icon: TrendingUp,
      color: "#F59E0B",
      change: "+9%",
    },
  ];

  const features: FeatureCard[] = [
    {
      title: "Curated Luxury Matches",
      description:
        "Meet accomplished, elegant women aged 40–80 who are ready to lavish affection, time, and experiences on the right person.",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Verified & Discreet",
      description:
        "Profiles undergo strict verification. Enjoy private, respectful interactions with high-calibre members.",
      icon: Shield,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Exclusive Experiences",
      description:
        "From vineyard weekends to city penthouse nights — connect with members who can and will create unforgettable moments.",
      icon: Crown,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Priority Perks",
      description:
        "Upgrade for premium visibility, priority replies, and concierge matchmaking to fast-track genuine chemistry.",
      icon: Star,
      gradient: "from-rose-500 to-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" style={{ color: "#E94057" }} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-8 lg:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-6 h-6" fill="white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back!</p>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {currentTime}, {userName || "Guest"}
              </h1>
            </div>
          </div>

          <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-2xl">
            Ready to be adored? Meet confident, generous women (ages 40–80) who
            love to spoil, surprise, and share a life of luxury — if you spark
            their interest. Flirty, bold, and unapologetically indulgent.
          </p>

          <p className="text-sm text-white/80 mb-6 max-w-2xl">
            Everyone is welcome here — straight, gay, bi, trans and non-binary:
            true connection has no label.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-pink-600 rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl transition-all transform hover:scale-105">
              <Users className="w-5 h-5" />
              Explore Sugar Matches
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-all border border-white/30">
              <MessageCircle className="w-5 h-5" />
              View Messages
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            <Target className="w-5 h-5" style={{ color: "#E94057" }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Craft an Irresistible Profile
                </h3>
                <p className="text-gray-600 text-sm">
                  Highlight charm, wit, and who you are — our members love
                  personality. Be bold, be honest, be unforgettable.
                </p>
              </div>
            </div>
            <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-pink-300 to-transparent -z-10"></div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Discover Matches
                </h3>
                <p className="text-gray-600 text-sm">
                  Browse profiles of successful, affectionate women ready to
                  invest in the right connection — tailored to your vibe.
                </p>
              </div>
            </div>
            <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-transparent -z-10"></div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Ignite Chemistry
                </h3>
                <p className="text-gray-600 text-sm">
                  Message, flirt, and arrange unforgettable experiences — we
                  support meaningful relationships that can turn luxurious.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose Our Platform
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Introductory Writeups & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Introductory Writeups */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                <Activity className="w-5 h-5" style={{ color: "#E94057" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">About Us</h3>
            </div>
            <button
              className="text-sm font-semibold"
              style={{ color: "#E94057" }}
            >
              Learn More
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">
                The Experience
              </h4>
              <p className="text-sm text-gray-600">
                Dive into a world of opulence and warmth. Our community connects
                charismatic, successful women (40–80) with people who crave
                affection, excitement, and the finer things. Expect thoughtful
                gestures, memorable nights, and relationships that sparkle.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">
                Who You'll Meet
              </h4>
              <p className="text-sm text-gray-600">
                Stylish, generous, and emotionally available women who enjoy
                spoiling the people they adore. They value confidence, charm,
                and authenticity — and many love to open doors to a more
                luxurious life for the right person.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">
                Inclusive & Safe
              </h4>
              <p className="text-sm text-gray-600">
                Everyone is welcome — straight, gay, bi, trans, and non-binary.
                We prioritize safety, privacy, and respectful connections so you
                can be yourself while exploring chemistry and indulgence.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold">Quick Actions</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all text-left flex items-center gap-3 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              Browse Matches
            </button>

            <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all text-left flex items-center gap-3 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              Check Messages
            </button>

            <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all text-left flex items-center gap-3 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              Upgrade Membership
            </button>

            <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold transition-all text-left flex items-center gap-3 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              Verify Profile
            </button>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-300" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              EXCLUSIVE ACCESS
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Experience Luxury & Romance
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Upgrade to premium for VIP visibility, concierge introductions, and
            a front-row seat to unforgettable dates. Get noticed by women who
            love to give — and to be deeply, deliciously charmed.
          </p>
          <button
            onClick={openModal}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold flex items-center gap-2 hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            View Premium Plans
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
