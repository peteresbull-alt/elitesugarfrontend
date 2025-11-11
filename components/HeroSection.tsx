"use client";

import { ArrowRight, BadgeCheck, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const profileCards = [
  {
    id: 1,
    name: "Shuyi",
    age: 45,
    title: "Hospitality Mogul",
    location: "Singapore",
    image:
      "https://res.cloudinary.com/daf9tr3lf/image/upload/v1762796139/people_photos/tpdjar5uagek7vsq0utz.jpg",
    interests: [
      "Hotels",
      "Travel",
      "Fine wine",
      "Spa resorts",
      "Luxury lifestyle",
    ],
  },
  {
    id: 2,
    name: "Mei",
    age: 52,
    title: "Retired Entrepreneur",
    location: "Singapore",
    image:
      "https://res.cloudinary.com/daf9tr3lf/image/upload/v1762789314/people_photos/zb605gvu2ivro4sz304j.jpg",
    interests: [
      "Beauty",
      "Fashion",
      "Luxury travel",
      "Spas",
      "Designer shopping",
    ],
  },
  {
    id: 3,
    name: "Margaret",
    age: 45,
    title: "Real Estate Developer",
    location: "New Zealand",
    image:
      "https://res.cloudinary.com/daf9tr3lf/image/upload/v1762797463/people_photos/fsem8w65dujrnta2xnsr.jpg",
    interests: [
      "Property investment",
      "Luxury travel",
      "Wine estates",
      "Golf",
      "Spa retreats",
    ],
  },
  {
    id: 4,
    name: "Linda",
    age: 49,
    title: "Pharmaceutical Executive",
    location: "Singapore",
    image:
      "https://res.cloudinary.com/daf9tr3lf/image/upload/v1762796865/people_photos/fjyalbg8qg12d0y57nmo.jpg",
    interests: [
      "Luxury yachts",
      "Private islands",
      "Casino",
      "Spa",
      "Designer shopping",
    ],
  },
  {
    id: 5,
    name: "Nancy",
    age: 46,
    title: "Pharmaceutical Distributor",
    location: "New Zealand",
    image:
      "https://res.cloudinary.com/daf9tr3lf/image/upload/v1762789254/people_photos/ybqaavv48f1jcbnn9cuc.jpg",
    interests: [
      "Business",
      "Wine estates",
      "Travel",
      "Fine dining",
      "Luxury cars",
    ],
  },
];

export default function HeroSection() {
  const [cards, setCards] = useState(profileCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section
      className="min-h-screen relative overflow-hidden pt-20"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {/* Background Text - aria-hidden for accessibility */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="font-extrabold text-gray-100 select-none leading-none"
          style={{
            fontSize: "clamp(150px, 25vw, 400px)",
            letterSpacing: "-0.02em",
          }}
        >
          SMSureConnect
        </div>
      </div>

      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-rose-50/50"
        aria-hidden="true"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <article className="space-y-6">
            <div
              className="inline-block w-fit mx-auto px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold animate-fade-in"
              style={{ color: "#E94057" }}
              role="status"
            >
              Premium Dating Platform for Australia, Singapore, NZ & Canada
            </div>

            {/* ONLY H1 on the page - critical for SEO */}
            <h1 className="text-5xl uppercase sm:text-6xl lg:text-7xl md:text-left font-bold text-gray-900 leading-tight">
              Meet Verified Sugar
              <span className="block mt-2 bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Mommies
              </span>
              in Your Region
            </h1>

            {/* Descriptive content for SEO */}
            <p className="text-xl sm:text-2xl md:text-left text-gray-600 leading-relaxed">
              Connect with <strong>verified, successful sugar mommies</strong>{" "}
              across Australia, Singapore, New Zealand, and Canada. Premium
              dating platform featuring accomplished women aged 40-80 who are
              generous, empowered, and seeking genuine connections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => router.push("/register")}
                className="group px-10 py-5 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                style={{ backgroundColor: "#E94057" }}
                aria-label="Join SMSureConnect premium dating platform"
              >
                <span className="flex items-center justify-center gap-2">
                  Join SMSureConnect
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>

            {/* Stats with microdata */}
            <dl className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200">
              <div itemScope itemType="https://schema.org/QuantitativeValue">
                <dt className="sr-only">Number of verified members</dt>
                <dd
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                  itemProp="value"
                >
                  5K+
                </dd>
                <dd
                  className="text-sm text-gray-600 mt-1"
                  itemProp="description"
                >
                  Verified Members
                </dd>
              </div>
              <div itemScope itemType="https://schema.org/QuantitativeValue">
                <dt className="sr-only">Success rate percentage</dt>
                <dd
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                  itemProp="value"
                >
                  94%
                </dd>
                <dd
                  className="text-sm text-gray-600 mt-1"
                  itemProp="description"
                >
                  Success Rate
                </dd>
              </div>
              <div itemScope itemType="https://schema.org/QuantitativeValue">
                <dt className="sr-only">Average member income</dt>
                <dd
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                  itemProp="value"
                >
                  $500K+
                </dd>
                <dd
                  className="text-sm text-gray-600 mt-1"
                  itemProp="description"
                >
                  Avg. Income
                </dd>
              </div>
            </dl>

            {/* Regional keywords for SEO */}
            <div className="text-sm text-gray-500 pt-4">
              <p>
                <strong>Active in:</strong> Sydney, Melbourne, Brisbane
                (Australia) • Singapore City • Auckland, Wellington (New
                Zealand) • Toronto, Vancouver, Montreal (Canada)
              </p>
            </div>
          </article>

          {/* Right Column - Swipeable Cards */}
          <aside
            className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
            aria-label="Featured member profiles"
          >
            <SwipeableCardStack
              cards={cards}
              currentIndex={currentIndex}
              onSwipe={handleSwipe}
            />
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

function SwipeableCardStack({
  cards,
  currentIndex,
  onSwipe,
}: {
  cards: typeof profileCards;
  currentIndex: number;
  onSwipe: (direction: "left" | "right") => void;
}) {
  return (
    <div className="relative w-full max-w-sm h-full">
      <div className="relative w-full h-full">
        {cards.map((card, index) => {
          if (index < currentIndex) return null;
          const isTop = index === currentIndex;
          const offset = index - currentIndex;
          return (
            <SwipeableCard
              key={card.id}
              card={card}
              isTop={isTop}
              offset={offset}
              onSwipe={onSwipe}
            />
          );
        })}
      </div>

      {currentIndex >= cards.length && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-8 bg-white rounded-3xl shadow-xl text-center">
            <div className="text-6xl mb-4" aria-hidden="true">
              ✨
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Discover More Members
            </h3>
            <p className="text-gray-600">
              Join to explore 5,000+ verified profiles across all regions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SwipeableCard({
  card,
  isTop,
  offset,
  onSwipe,
}: {
  card: (typeof profileCards)[0];
  isTop: boolean;
  offset: number;
  onSwipe: (direction: "left" | "right") => void;
}) {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isTop) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !isTop) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      setExitDirection(direction);
      setTimeout(() => {
        onSwipe(direction);
        setDragOffset({ x: 0, y: 0 });
        setExitDirection(null);
      }, 300);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    if (!isTop) return;
    setExitDirection(direction);
    setTimeout(() => {
      onSwipe(direction);
      setDragOffset({ x: 0, y: 0 });
      setExitDirection(null);
    }, 300);
  };

  const rotation = dragOffset.x / 20;

  const cardStyle = exitDirection
    ? {
        transform: `translateX(${
          exitDirection === "right" ? "500px" : "-500px"
        }) rotate(${exitDirection === "right" ? "30deg" : "-30deg"})`,
        opacity: 0,
        transition: "all 0.3s ease-out",
      }
    : isDragging
    ? {
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
        cursor: "grabbing",
      }
    : {
        transform: `translateY(${offset * 10}px) scale(${1 - offset * 0.05})`,
        zIndex: 50 - offset,
        opacity: 1 - offset * 0.2,
        transition: "all 0.3s ease-out",
      };

  return (
    <>
      <article
        className="absolute inset-0 w-full cursor-grab active:cursor-grabbing"
        style={cardStyle}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        itemScope
        itemType="https://schema.org/Person"
      >
        {isTop && isDragging && (
          <>
            <div
              className="absolute top-8 right-8 px-6 py-3 border-4 border-green-500 rounded-xl text-green-500 font-bold text-2xl rotate-12 z-10"
              style={{ opacity: dragOffset.x > 50 ? 1 : 0 }}
              aria-hidden="true"
            >
              LIKE
            </div>
            <div
              className="absolute top-8 left-8 px-6 py-3 border-4 border-red-500 rounded-xl text-red-500 font-bold text-2xl -rotate-12 z-10"
              style={{ opacity: dragOffset.x < -50 ? 1 : 0 }}
              aria-hidden="true"
            >
              NOPE
            </div>
          </>
        )}

        <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-3/4">
            <img
              src={card.image}
              alt={`${card.name}, ${card.age} year old ${card.title} from ${card.location}`}
              className="w-full h-full object-cover"
              loading={isTop ? "eager" : "lazy"}
              itemProp="image"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              aria-hidden="true"
            ></div>

            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
              <BadgeCheck
                className="w-4 h-4"
                style={{ color: "#E94057" }}
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-gray-700">Verified</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-1" itemProp="name">
                    {card.name}, <span itemProp="age">{card.age}</span>
                  </h3>
                  <p className="text-lg opacity-90 mb-2" itemProp="jobTitle">
                    {card.title}
                  </p>
                  <p
                    className="text-sm opacity-75 flex items-center gap-1"
                    itemProp="address"
                  >
                    📍 {card.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1/4 p-6 py-2 flex flex-col justify-center">
            <ul className="flex flex-wrap gap-2 mb-4" aria-label="Interests">
              {card.interests.map((interest) => (
                <li
                  key={interest}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#FFF0F2", color: "#E94057" }}
                  itemProp="knowsAbout"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {isTop && (
        <nav
          className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6 z-50"
          aria-label="Card actions"
        >
          <button
            onClick={() => handleButtonSwipe("left")}
            className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-200"
            aria-label="Pass on this profile"
          >
            <X className="w-8 h-8 text-red-500" aria-hidden="true" />
          </button>
          <button
            onClick={() => handleButtonSwipe("right")}
            className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            style={{ backgroundColor: "#E94057" }}
            aria-label="Like this profile"
          >
            <Heart
              className="w-8 h-8 text-white"
              fill="white"
              aria-hidden="true"
            />
          </button>
        </nav>
      )}
    </>
  );
}
