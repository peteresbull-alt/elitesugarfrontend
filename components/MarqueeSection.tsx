"use client";

import { BACKEND_URL } from "@/lib/constants";
import { BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface PersonPhoto {
  person_image: string;
  person_name: string;
  person_age: number;
  person_occupation: string;
  person_location: string;
  person_verified: boolean;
  person_id: number;
  is_profile_picture: boolean;
  person_interests: string[];
}

export default function MarqueeSection() {
  const [profiles, setProfiles] = useState<PersonPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/people/public/`);
      const data = await response.json();

      // Get unique people (only profile pictures, limit to 12 for marquee)
      const uniquePeople = data.results
        .filter((photo: PersonPhoto) => photo.is_profile_picture)
        .slice(0, 12);

      setProfiles(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching people:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Meet the Women Who Define Desire
          </h2>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-pink-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Meet the Women Who Define Desire
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Powerful, confident, and irresistible — our verified members know
          exactly what (and who) they want.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee gap-6">
            {[...profiles, ...profiles].map((profile, index) => (
              <ProfileCard
                key={`${profile.person_id}-${index}`}
                profile={profile}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        .animate-marquee {
          animation: marquee 130s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function ProfileCard({ profile }: { profile: PersonPhoto }) {
  return (
    <div className="shrink-0 w-80">
      <div className="relative group cursor-pointer">
        <div
          className="absolute -inset-2 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"
          style={{ backgroundColor: "#E94057" }}
        ></div>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="aspect-3/4 relative">
            <img
              src={profile.person_image}
              alt={`${profile.person_age}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {profile.person_verified && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                <BadgeCheck className="w-4 h-4" style={{ color: "#E94057" }} />
                <span className="text-xs font-bold text-gray-700">
                  Verified
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              
              {/* <div className="text-3xl font-bold mb-2">
                {profile.person_name.split(" ")[0]}, {profile.person_age}
              </div> */}
              <div className="text-base opacity-95 font-medium mb-4">
                {profile.person_occupation}
              </div>
              <div className="flex gap-2 flex-wrap">
                {profile.person_interests &&
                profile.person_interests.length > 0 ? (
                  profile.person_interests.slice(0, 3).map((interest) => (
                    <div
                      key={interest}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold"
                    >
                      {interest}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                    {profile.person_location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
