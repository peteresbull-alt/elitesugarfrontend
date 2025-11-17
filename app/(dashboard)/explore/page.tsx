"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Shield,
  X,
  Lock,
  Crown,
  MessageCircle,
  Heart,
  Star,
  Calendar,
  Ruler,
  GraduationCap,
  Home as HomeIcon,
  Sparkles,
  Loader2,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = BACKEND_URL;

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  age: number;
  occupation: string;
  location: string;
  verified: boolean;
  profile_picture: string;
  images: string[];
  interests: string[];
  distance: string;
  bio: string;
  net_worth: string;
  membership_type: "regular" | "gold" | "platinum";
  height: string;
  education: string;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  city_country: string;
  phone_number: string;
  relationship_goals: string[];
  looking_for: string;
  email: string;
  full_address: string;
  social_media?: {
    whatsapp?: string;
    instagram?: string;
    twitter?: string;
    telegram?: string;
  };
}

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  membership_type: "regular" | "gold" | "platinum";
  verified: boolean;
  is_approved: boolean;
  profile_views: number;
  matches_count: number;
  favorites_count: number;
}

export default function ExplorePage() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    newMatches: 0,
    likedYou: 0,
    matchRate: 0,
  });

  useEffect(() => {
    fetchUserProfile();
    fetchPeople();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
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
      } else if (response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        setError("Failed to load user profile");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Error connecting to server");
    }
  };

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      const response = await fetch(`${API_BASE_URL}/people/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch people");
      }

      const data = await response.json();
      setPeople(data.results || data);

      // Set stats based on actual data
      const count =
        data.count ||
        (Array.isArray(data) ? data.length : data.results?.length || 0);
      setStats({
        newMatches: count,
        likedYou: Math.floor(count * 0.3),
        matchRate: 89,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profiles");
      console.error("Error fetching people:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonDetail = async (personId: number) => {
    try {
      const token = getAuthToken();

      const response = await fetch(`${API_BASE_URL}/people/${personId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        const errorData = await response.json();
        // Still show limited profile with locked status
        setSelectedPerson({
          ...people.find((p) => p.id === personId)!,
          locked: true,
        } as any);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch person details");
      }

      const data = await response.json();
      setSelectedPerson(data.person || data);
    } catch (err) {
      console.error("Error fetching person details:", err);
    }
  };

  const canAccessProfile = (profileTier: string) => {
    if (!userProfile) return false;

    const tierHierarchy = { regular: 1, gold: 2, platinum: 3 };
    return (
      tierHierarchy[
        userProfile.membership_type as keyof typeof tierHierarchy
      ] >= tierHierarchy[profileTier as keyof typeof tierHierarchy]
    );
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

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            className="w-12 h-12 animate-spin mx-auto mb-4"
            style={{ color: "#E94057" }}
          />
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              fetchUserProfile();
              fetchPeople();
            }}
            className="px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userMembership = userProfile.membership_type;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            {userProfile.profile_views}
          </div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            {userProfile.matches_count}
          </div>
          <div className="text-sm text-gray-600">Matches</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            {userProfile.favorites_count}
          </div>
          <div className="text-sm text-gray-600">Favourites</div>
        </div>
      </div>

      {/* Current User Membership Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(() => {
              const badge = getMembershipBadge(userMembership);
              const Icon = badge.icon;
              return (
                <>
                  <Icon className="w-6 h-6" style={{ color: badge.color }} />
                  <div>
                    <div className="font-bold text-gray-900">
                      Your Membership: {badge.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {userMembership === "regular" &&
                        "Upgrade to access premium profiles"}
                      {userMembership === "gold" &&
                        "Access to Gold and Regular profiles"}
                      {userMembership === "platinum" &&
                        "Full access to all profiles"}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          {userMembership !== "platinum" && (
            <button
              className="px-4 py-2 text-white rounded-lg font-semibold text-sm"
              style={{ backgroundColor: "#E94057" }}
            >
              Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {people.map((person) => {
          const badge = getMembershipBadge(person.membership_type);
          const BadgeIcon = badge.icon;
          const isLocked = !canAccessProfile(person.membership_type);

          // console.log(person);

          return (
            <div
              key={person.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
              onClick={() => fetchPersonDetail(person.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={person.profile_picture || "/placeholder-profile.jpg"}
                  alt={person.full_name}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                    isLocked ? "blur-sm" : ""
                  }`}
                />

                {/* Membership Badge */}
                <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                  <BadgeIcon
                    className="w-4 h-4"
                    style={{ color: badge.color }}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Verified Badge */}
                {person.verified && (
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Shield className="w-4 h-4" style={{ color: "#E94057" }} />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#E94057" }}
                    >
                      Verified
                    </span>
                  </div>
                )}

                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Locked</div>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Profile Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Age, {person.age}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{person.occupation}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{person.city_country}</span>
                  </div> */}
                </div>
              </div>

              {/* Interests Tags */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {person.interests.slice(0, 3).map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-pink-50 border border-pink-200"
                      style={{ color: "#E94057" }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {people.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No profiles found
          </h3>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      )}

      {/* Profile Modal */}
      {selectedPerson && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 lg:p-8"
          onClick={() => {
            setSelectedPerson(null);
            setActiveImageIndex(0);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] lg:max-h-[90vh] overflow-y-auto mb-20 lg:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const isLocked = !canAccessProfile(
                selectedPerson.membership_type
              );
              const badge = getMembershipBadge(selectedPerson.membership_type);
              const BadgeIcon = badge.icon;
              const images =
                selectedPerson.images && selectedPerson.images.length > 0
                  ? selectedPerson.images
                  : [selectedPerson.profile_picture];

              return (
                <>
                  {/* Header Image Gallery */}
                  <div className="relative">
                    <div className="relative h-96 lg:h-[28rem]">
                      <img
                        src={
                          images[activeImageIndex] || "/placeholder-profile.jpg"
                        }
                        alt={selectedPerson.full_name}
                        className={`w-full h-full object-cover ${
                          isLocked ? "blur-md" : ""
                        }`}
                      />

                      {/* Lock Overlay for Modal */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center text-white max-w-md mx-auto p-6">
                            <Lock className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">
                              Profile Locked
                            </h3>
                            <p className="mb-4">
                              This is a {badge.label} member. Upgrade your
                              membership to {badge.label} or higher to view and
                              chat with this profile.
                            </p>
                            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                              Upgrade to {badge.label}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Image Navigation Dots */}
                      {!isLocked && images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === activeImageIndex
                                  ? "bg-white w-6"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPerson(null);
                        setActiveImageIndex(0);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all z-10"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Profile Content */}
                  <div
                    className={`p-6 ${
                      isLocked ? "filter blur-sm pointer-events-none" : ""
                    }`}
                  >
                    {/* Basic Info */}
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Age, {selectedPerson.age}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="text-lg">
                          {selectedPerson.occupation || "Not specified"}
                        </span>
                      </div>
                      {/* <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span>
                          {selectedPerson.location ||
                            selectedPerson.city_country}{" "}
                          {selectedPerson.distance &&
                            `• ${selectedPerson.distance}`}
                        </span>
                      </div> */}
                      {selectedPerson.education && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <GraduationCap className="w-5 h-5" />
                          <span>{selectedPerson.education}</span>
                        </div>
                      )}
                    </div>

                    {/* Personal Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {selectedPerson.height && (
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Ruler className="w-4 h-4" />
                            <span className="text-xs font-medium">Height</span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {selectedPerson.height}
                          </p>
                        </div>
                      )}

                      {/* {selectedPerson.nationality && (
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <HomeIcon className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Nationality
                            </span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {selectedPerson.nationality}
                          </p>
                        </div>
                      )} */}

                      {/* {selectedPerson.place_of_birth && (
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Birth Place
                            </span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {selectedPerson.place_of_birth}
                          </p>
                        </div>
                      )} */}

                      {selectedPerson.date_of_birth && (
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Date of Birth
                            </span>
                          </div>
                          <p className="text-gray-900 font-semibold">
                            {new Date(
                              selectedPerson.date_of_birth
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Net Worth */}
                    {selectedPerson.net_worth && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-amber-600" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Estimated Net Worth
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                              {selectedPerson.net_worth}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Looking For */}
                    {selectedPerson.looking_for && (
                      <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
                        <div className="flex items-center gap-3">
                          <Heart
                            className="w-6 h-6"
                            style={{ color: "#E94057" }}
                          />
                          <div>
                            <div className="text-sm text-gray-600">
                              Looking For
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {selectedPerson.looking_for}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bio */}
                    {selectedPerson.bio && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <MessageCircle
                            className="w-5 h-5"
                            style={{ color: "#E94057" }}
                          />
                          About Me
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedPerson.bio}
                        </p>
                      </div>
                    )}

                    {/* Relationship Goals */}
                    {selectedPerson.relationship_goals &&
                      selectedPerson.relationship_goals.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Star
                              className="w-5 h-5"
                              style={{ color: "#E94057" }}
                            />
                            Relationship Goals
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPerson.relationship_goals.map(
                              (goal, idx) => (
                                <span
                                  key={idx}
                                  className="px-4 py-2 rounded-full bg-rose-50 border border-rose-200 font-medium text-gray-900"
                                >
                                  {goal}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Interests */}
                    {selectedPerson.interests &&
                      selectedPerson.interests.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Heart
                              className="w-5 h-5"
                              style={{ color: "#E94057" }}
                            />
                            Interests
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPerson.interests.map((interest, idx) => (
                              <span
                                key={idx}
                                className="px-4 py-2 rounded-full bg-pink-50 border border-pink-200 font-medium"
                                style={{ color: "#E94057" }}
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Contact Information */}
                    {(selectedPerson.phone_number ||
                      selectedPerson.email ||
                      selectedPerson.social_media) && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Contact Information
                        </h3>
                        <div className="space-y-3">
                          {selectedPerson.phone_number && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">📱</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  Phone
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.phone_number}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedPerson.email && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">📧</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  Email
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.email}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedPerson.social_media?.whatsapp && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">💬</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  WhatsApp
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.social_media.whatsapp}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedPerson.social_media?.instagram && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">📷</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  Instagram
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.social_media.instagram}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedPerson.social_media?.telegram && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">✈️</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  Telegram
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.social_media.telegram}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedPerson.social_media?.twitter && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">🐦</span>
                              </div>
                              <div>
                                <div className="text-xs text-gray-600">
                                  Twitter
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {selectedPerson.social_media.twitter}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    {selectedPerson.full_address && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <HomeIcon
                            className="w-5 h-5"
                            style={{ color: "#E94057" }}
                          />
                          Address
                        </h3>
                        <p className="text-gray-700 p-4 bg-gray-50 rounded-xl">
                          {selectedPerson.full_address}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={"https://t.me/Smsureconnect"}
                        className="flex-1 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#E94057" }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Start Chat
                      </Link>
                      {/* <button className="px-6 py-4 border-2 border-pink-500 text-pink-600 font-semibold rounded-xl hover:bg-pink-50 transition-all flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5" />
                        Like
                      </button> */}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
