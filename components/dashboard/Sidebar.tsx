"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Heart,
  MessageCircle,
  User,
  Settings,
  Crown,
  LogOut,
  Star,
  Shield,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { useUpgradeModal } from "@/store/useUpgradeModal";

const API_BASE_URL = BACKEND_URL;

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  membership_type: "regular" | "gold" | "platinum";
  verified: boolean;
  is_approved: boolean;
  photos: Array<{
    id: number;
    image: string;
    is_profile_picture: boolean;
  }>;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const { openModal } = useUpgradeModal();

  useEffect(() => {
    fetchUserProfile();
    fetchUnreadNotifications();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
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
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(
        `${API_BASE_URL}/notifications/unread-count/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.error("Error fetching unread notifications:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const token = getAuthToken();

      await fetch(`${API_BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "platinum":
        return { color: "#E94057", label: "Platinum", icon: Crown };
      case "gold":
        return { color: "#FFD700", label: "Gold", icon: Star };
      default:
        return { color: "#94A3B8", label: "Regular", icon: Shield };
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "explore", label: "Explore", icon: Heart, path: "/explore" },
    {
      id: "notifications",
      label: "Notifications",
      icon: MessageCircle,
      path: "/notifications",
      badge: unreadCount,
    },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const profilePicture =
    userProfile?.photos?.find((p) => p.is_profile_picture)?.image ||
    userProfile?.photos?.[0]?.image ||
    "https://via.placeholder.com/100";

  const membershipBadge = userProfile
    ? getMembershipBadge(userProfile.membership_type)
    : null;
  const MembershipIcon = membershipBadge?.icon;

  return (
    <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-gray-200 shrink-0 h-screen">
      {/* Logo/Brand - FIXED */}
      <div className="p-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#E94057" }}
          >
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#E94057" }}>
              SMSureConnect
            </h1>
            <p className="text-xs text-gray-500">Premium Dating</p>
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "#E9405710", color: "#E94057" }
                      : {}
                  }
                >
                  <Icon
                    className="w-5 h-5"
                    style={isActive ? { color: "#E94057" } : {}}
                  />
                  <span className="font-semibold">{item.label}</span>
                 
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200"></div>
        </nav>

        {/* Upgrade Card - Only show if not Platinum */}
        {userProfile && userProfile.membership_type !== "platinum" && (
          <div className="p-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <Crown className="w-8 h-8 mb-3 text-yellow-300" />
                <h3 className="font-bold text-lg mb-1">
                  {userProfile.membership_type === "regular"
                    ? "Upgrade to Gold or Platinum"
                    : "Upgrade to Platinum"}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Unlock exclusive features and unlimited matches
                </p>
                <button
                  onClick={openModal}
                  className="w-full px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
          ) : userProfile ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt={userProfile.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {userProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px]">✓</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {userProfile.first_name} {userProfile.last_name.charAt(0)}.
                </p>
                <div className="flex items-center gap-1">
                  {MembershipIcon && (
                    <MembershipIcon
                      className="w-3 h-3"
                      style={{ color: membershipBadge?.color }}
                    />
                  )}
                  <p
                    className="text-xs font-medium"
                    style={{ color: membershipBadge?.color }}
                  >
                    {membershipBadge?.label} Member
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-500">
              Unable to load profile
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
