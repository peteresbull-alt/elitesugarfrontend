// components/profile/ProfileCard.tsx
import {
  CheckCircle,
  Briefcase,
  MapPin,
  Shield,
  Star,
  Crown,
} from "lucide-react";
import { UserProfile } from "@/types/profile";

interface ProfileCardProps {
  userData: UserProfile;
}

export default function ProfileCard({ userData }: ProfileCardProps) {
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

  const badge = getMembershipBadge(userData.membership_type);
  const BadgeIcon = badge.icon;
  const profilePhoto =
    userData.photos.find((p) => p.is_profile_picture)?.image ||
    userData.photos[0]?.image;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div
        className="h-32 bg-gradient-to-r from-pink-500 to-rose-500"
        style={{ backgroundColor: "#E94057" }}
      ></div>

      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div className="relative">
              <img
                src={profilePhoto || "https://via.placeholder.com/150"}
                alt={userData.full_name}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              {userData.verified && (
                <div
                  className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                  style={{ color: "#E94057" }}
                >
                  <CheckCircle className="w-6 h-6" fill="#E94057" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData.full_name}
                {userData.age && `, ${userData.age}`}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mt-1 justify-center sm:justify-start">
                <Briefcase className="w-4 h-4" />
                <span>{userData.occupation || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1 justify-center sm:justify-start">
                <MapPin className="w-4 h-4" />
                <span>{userData.location || userData.city_country}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0">
            <div
              className="px-6 py-3 rounded-xl flex items-center gap-2 shadow-md"
              style={{
                backgroundColor: `${badge.color}15`,
                border: `2px solid ${badge.color}`,
              }}
            >
              <BadgeIcon className="w-6 h-6" style={{ color: badge.color }} />
              <span
                className="font-bold text-lg"
                style={{ color: badge.color }}
              >
                {badge.label} Member
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
              {userData.profile_views}
            </div>
            <div className="text-sm text-gray-600">Profile Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
              {userData.matches_count}
            </div>
            <div className="text-sm text-gray-600">Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
              {userData.favorites_count}
            </div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
              {userData.is_approved ? "✓" : "⏳"}
            </div>
            <div className="text-sm text-gray-600">
              {userData.is_approved ? "Approved" : "Pending"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
