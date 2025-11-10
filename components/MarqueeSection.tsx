"use client";

import { BadgeCheck } from "lucide-react";

export default function MarqueeSection() {
  const profiles = [
    {
      name: "Sophia Laurent",
      age: 47,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
      title: "Luxury Brand Owner",
      verified: true,
    },
    {
      name: "Isabella Chen",
      age: 52,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
      title: "Global Investor",
      verified: true,
    },
    {
      name: "Charlotte Rose",
      age: 58,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
      title: "Art Curator",
      verified: true,
    },
    {
      name: "Amelia Foster",
      age: 49,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
      title: "High-End Realtor",
      verified: true,
    },
    {
      name: "Olivia Grace",
      age: 56,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
      title: "Luxury Travel Designer",
      verified: true,
    },
    {
      name: "Emma Stone",
      age: 60,
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
      title: "Philanthropist",
      verified: true,
    },
  ];

  return (
    <section className="py-20 sm:py-32 overflow-hidden bg-linear-to-b from-pink-50/30 to-white">
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
              <ProfileCard key={index} profile={profile} />
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
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function ProfileCard({
  profile,
}: {
  profile: {
    name: string;
    age: number;
    image: string;
    title: string;
    verified: boolean;
  };
}) {
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
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

            {profile.verified && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                <BadgeCheck className="w-4 h-4" style={{ color: "#E94057" }} />
                <span className="text-xs font-bold text-gray-700">
                  Verified
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-3xl font-bold mb-2">
                {profile.name}, {profile.age}
              </div>
              <div className="text-base opacity-95 font-medium mb-4">
                {profile.title}
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                  SugarÉlite
                </div>
                <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                  Verified Luxe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
