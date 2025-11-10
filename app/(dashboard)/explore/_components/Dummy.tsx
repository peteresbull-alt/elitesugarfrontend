"use client";

import { useState } from "react";
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
} from "lucide-react";

interface Profile {
  id: number;
  name: string;
  age: number;
  occupation: string;
  location: string;
  verified: boolean;
  image: string;
  images: string[]; // Multiple photos
  interests: string[];
  distance: string;
  bio: string;
  netWorth: string;
  membershipTier: "regular" | "gold" | "platinum";
  height: string;
  education: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  cityCountry: string;
  fullAddress: string;
  phoneNumber: string;
}

const SAMPLE_PROFILES: Profile[] = [
  {
    id: 1,
    name: "Sophia Anderson",
    age: 28,
    occupation: "Marketing Director",
    location: "New York, NY",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop",
    ],
    interests: ["Wine & Dining", "Travel", "Art"],
    distance: "2 miles away",
    bio: "Passionate about creating meaningful connections and exploring new cultures. Love fine dining, art galleries, and weekend getaways. Looking for someone who appreciates the finer things in life.",
    netWorth: "$2.5M - $5M",
    membershipTier: "platinum",
    height: "5'7\"",
    education: "MBA, Harvard Business School",
    dateOfBirth: "June 15, 1996",
    placeOfBirth: "Boston, MA",
    nationality: "American",
    cityCountry: "New York, USA",
    fullAddress: "Manhattan, New York",
    phoneNumber: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Isabella Martinez",
    age: 31,
    occupation: "Entrepreneur",
    location: "Los Angeles, CA",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
    ],
    interests: ["Fitness", "Technology", "Yoga"],
    distance: "5 miles away",
    bio: "Tech entrepreneur and fitness enthusiast. Built my own startup from the ground up. Believe in staying active and maintaining a balanced lifestyle.",
    netWorth: "$5M - $10M",
    membershipTier: "gold",
    height: "5'6\"",
    education: "BS Computer Science, Stanford",
    dateOfBirth: "March 22, 1993",
    placeOfBirth: "San Diego, CA",
    nationality: "American",
    cityCountry: "Los Angeles, USA",
    fullAddress: "Beverly Hills, Los Angeles",
    phoneNumber: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Emma Thompson",
    age: 29,
    occupation: "Creative Director",
    location: "San Francisco, CA",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop",
    ],
    interests: ["Photography", "Fashion", "Music"],
    distance: "3 miles away",
    bio: "Creative soul with an eye for beauty. Love capturing moments through my lens and exploring the world of fashion and design.",
    netWorth: "$1M - $2M",
    membershipTier: "regular",
    height: "5'8\"",
    education: "BFA Design, Parsons",
    dateOfBirth: "September 10, 1995",
    placeOfBirth: "Portland, OR",
    nationality: "American",
    cityCountry: "San Francisco, USA",
    fullAddress: "Pacific Heights, San Francisco",
    phoneNumber: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Olivia Chen",
    age: 27,
    occupation: "Investment Banker",
    location: "Chicago, IL",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop",
    ],
    interests: ["Travel", "Wine & Dining", "Golf"],
    distance: "1 mile away",
    bio: "Finance professional who loves the thrill of closing deals and playing golf on weekends. Seeking someone ambitious and driven.",
    netWorth: "$3M - $5M",
    membershipTier: "platinum",
    height: "5'5\"",
    education: "MBA, Wharton School",
    dateOfBirth: "November 3, 1997",
    placeOfBirth: "Shanghai, China",
    nationality: "Chinese-American",
    cityCountry: "Chicago, USA",
    fullAddress: "Gold Coast, Chicago",
    phoneNumber: "+1 (555) 456-7890",
  },
  {
    id: 5,
    name: "Ava Williams",
    age: 30,
    occupation: "Surgeon",
    location: "Boston, MA",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=1000&fit=crop",
    ],
    interests: ["Hiking", "Reading", "Volunteering"],
    distance: "4 miles away",
    bio: "Dedicated surgeon with a passion for saving lives and giving back to the community. Love outdoor adventures and intellectual conversations.",
    netWorth: "$2M - $4M",
    membershipTier: "regular",
    height: "5'9\"",
    education: "MD, Johns Hopkins",
    dateOfBirth: "January 18, 1994",
    placeOfBirth: "Boston, MA",
    nationality: "American",
    cityCountry: "Boston, USA",
    fullAddress: "Back Bay, Boston",
    phoneNumber: "+1 (555) 567-8901",
  },
  {
    id: 6,
    name: "Mia Rodriguez",
    age: 26,
    occupation: "Fashion Designer",
    location: "Miami, FL",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop",
    ],
    interests: ["Fashion", "Art", "Dancing"],
    distance: "6 miles away",
    bio: "Fashion designer creating bold and beautiful pieces. Love expressing myself through art and movement.",
    netWorth: "$500K - $1M",
    membershipTier: "regular",
    height: "5'4\"",
    education: "Fashion Design, FIT",
    dateOfBirth: "July 25, 1998",
    placeOfBirth: "Miami, FL",
    nationality: "Cuban-American",
    cityCountry: "Miami, USA",
    fullAddress: "South Beach, Miami",
    phoneNumber: "+1 (555) 678-9012",
  },
  {
    id: 7,
    name: "Charlotte Davis",
    age: 32,
    occupation: "Tech Executive",
    location: "Seattle, WA",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=1000&fit=crop",
    ],
    interests: ["Technology", "Sailing", "Photography"],
    distance: "7 miles away",
    bio: "Leading innovation in the tech industry. Passionate about sailing and capturing beautiful moments. Looking for an intellectual equal.",
    netWorth: "$10M+",
    membershipTier: "platinum",
    height: "5'10\"",
    education: "PhD Computer Science, MIT",
    dateOfBirth: "April 8, 1992",
    placeOfBirth: "Seattle, WA",
    nationality: "American",
    cityCountry: "Seattle, USA",
    fullAddress: "Capitol Hill, Seattle",
    phoneNumber: "+1 (555) 789-0123",
  },
  {
    id: 8,
    name: "Amelia Taylor",
    age: 29,
    occupation: "Architect",
    location: "Austin, TX",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=800&h=1000&fit=crop",
    ],
    interests: ["Art", "Hiking", "Cooking"],
    distance: "2 miles away",
    bio: "Designing beautiful spaces and creating memorable experiences. Love exploring nature trails and experimenting with new recipes.",
    netWorth: "$1.5M - $3M",
    membershipTier: "gold",
    height: "5'7\"",
    education: "M.Arch, Yale",
    dateOfBirth: "December 12, 1995",
    placeOfBirth: "Austin, TX",
    nationality: "American",
    cityCountry: "Austin, USA",
    fullAddress: "Downtown Austin",
    phoneNumber: "+1 (555) 890-1234",
  },
];

// Simulating current user membership - change this to test different scenarios
const CURRENT_USER_MEMBERSHIP: "regular" | "gold" | "platinum" = "regular";

export default function ExplorePage() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const canAccessProfile = (profileTier: string) => {
    const tierHierarchy = { regular: 1, gold: 2, platinum: 3 };
    return (
      tierHierarchy[CURRENT_USER_MEMBERSHIP as keyof typeof tierHierarchy] >=
      tierHierarchy[profileTier as keyof typeof tierHierarchy]
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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            152
          </div>
          <div className="text-sm text-gray-600">New Matches</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            47
          </div>
          <div className="text-sm text-gray-600">Liked You</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div
            className="text-lg sm:text-xl md:text-2xl font-bold"
            style={{ color: "#E94057" }}
          >
            89%
          </div>
          <div className="text-sm text-gray-600">Match Rate</div>
        </div>
      </div>

      {/* Current User Membership Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(() => {
              const badge = getMembershipBadge(CURRENT_USER_MEMBERSHIP);
              const Icon = badge.icon;
              return (
                <>
                  <Icon className="w-6 h-6" style={{ color: badge.color }} />
                  <div>
                    <div className="font-bold text-gray-900">
                      Your Membership: {badge.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {CURRENT_USER_MEMBERSHIP === "regular" &&
                        "Upgrade to access premium profiles"}
                      {CURRENT_USER_MEMBERSHIP === "gold" &&
                        "Access to Gold and Regular profiles"}
                      {CURRENT_USER_MEMBERSHIP === "platinum" &&
                        "Full access to all profiles"}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          {CURRENT_USER_MEMBERSHIP !== "platinum" && (
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
        {SAMPLE_PROFILES.map((profile) => {
          const badge = getMembershipBadge(profile.membershipTier);
          const BadgeIcon = badge.icon;
          const isLocked = !canAccessProfile(profile.membershipTier);

          return (
            <div
              key={profile.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
              onClick={() => setSelectedProfile(profile)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
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
                {profile.verified && (
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
                  <h3 className="text-lg font-bold mb-1">
                    {profile.name}, {profile.age}
                  </h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.occupation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.distance}</span>
                  </div>
                </div>
              </div>

              {/* Interests Tags */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {profile.interests.slice(0, 3).map((interest, idx) => (
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

      {/* Profile Modal */}
      {selectedProfile && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 lg:p-8"
          onClick={() => {
            setSelectedProfile(null);
            setActiveImageIndex(0);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] lg:max-h-[90vh] overflow-y-auto mb-20 lg:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const isLocked = !canAccessProfile(
                selectedProfile.membershipTier
              );
              const badge = getMembershipBadge(selectedProfile.membershipTier);
              const BadgeIcon = badge.icon;

              return (
                <>
                  {/* Header Image Gallery */}
                  <div className="relative">
                    <div className="relative h-96 lg:h-[28rem]">
                      <img
                        src={selectedProfile.images[activeImageIndex]}
                        alt={selectedProfile.name}
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
                      {!isLocked && selectedProfile.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedProfile.images.map((_, idx) => (
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
                        setSelectedProfile(null);
                        setActiveImageIndex(0);
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all z-10"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                        <BadgeIcon
                          className="w-5 h-5"
                          style={{ color: badge.color }}
                        />
                        <span
                          className="font-semibold"
                          style={{ color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      {selectedProfile.verified && (
                        <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                          <Shield
                            className="w-5 h-5"
                            style={{ color: "#E94057" }}
                          />
                          <span
                            className="font-semibold"
                            style={{ color: "#E94057" }}
                          >
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
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
                        {selectedProfile.name}, {selectedProfile.age}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="text-lg">
                          {selectedProfile.occupation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>
                          {selectedProfile.location} •{" "}
                          {selectedProfile.distance}
                        </span>
                      </div>
                    </div>

                    {/* Net Worth */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-amber-600" />
                        <div>
                          <div className="text-sm text-gray-600">
                            Estimated Net Worth
                          </div>
                          <div className="text-xl font-bold text-gray-900">
                            {selectedProfile.netWorth}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <MessageCircle
                          className="w-5 h-5"
                          style={{ color: "#E94057" }}
                        />
                        About Me
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProfile.bio}
                      </p>
                    </div>

                    {/* Personal Details Grid */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Personal Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Date of Birth
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.dateOfBirth}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Ruler className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">Height</div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.height}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Place of Birth
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.placeOfBirth}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Nationality
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.nationality}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Education
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.education}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <HomeIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <div className="text-sm text-gray-600">
                              Current Location
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedProfile.cityCountry}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProfile.interests.map((interest, idx) => (
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

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        className="flex-1 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#E94057" }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Start Chat
                      </button>
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
