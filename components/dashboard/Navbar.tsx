"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";

const API_BASE_URL = BACKEND_URL; // Update with your BACKEND_URL

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  photos: Array<{
    id: number;
    image: string;
    is_profile_picture: boolean;
  }>;
}

interface NavbarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export default function Navbar({ showFilters, setShowFilters }: NavbarProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUserProfile();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

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

  const profilePicture =
    userProfile?.photos?.find((p) => p.is_profile_picture)?.image ||
    userProfile?.photos?.[0]?.image ||
    "https://via.placeholder.com/40";

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h2
            className="text-2xl font-bold text-gray-900 lg:hidden"
            style={{ color: "#E94057" }}
          >
            EliteSugar
          </h2>
          <h2 className="hidden lg:block text-2xl font-bold text-gray-900">
            Discover Your Match
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-all"
            >
              <img
                src={profilePicture}
                alt={userProfile?.full_name || "User"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block font-semibold text-gray-900">
                {userProfile?.first_name || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={profilePicture}
                      alt={userProfile?.full_name || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {userProfile?.full_name || "User"}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {userProfile?.email || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-all text-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      router.push("/profile");
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-all text-gray-700"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-all text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
