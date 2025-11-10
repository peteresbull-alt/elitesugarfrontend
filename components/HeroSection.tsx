"use client";

import { ArrowRight, BadgeCheck, Heart, X } from "lucide-react";
import { useState } from "react";

const profileCards = [
  {
    id: 1,
    name: "Sophia Laurent",
    age: 42,
    title: "CEO, Tech Startup",
    location: "San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop",
    interests: ["Travel", "Wine", "Art"],
  },
  {
    id: 2,
    name: "Isabella Chen",
    age: 38,
    title: "Entrepreneur",
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=700&fit=crop",
    interests: ["Fitness", "Reading", "Yoga"],
  },
  {
    id: 3,
    name: "Charlotte Rose",
    age: 45,
    title: "Surgeon",
    location: "Boston, MA",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=700&fit=crop",
    interests: ["Music", "Cooking", "Hiking"],
  },
  {
    id: 4,
    name: "Amelia Foster",
    age: 40,
    title: "Attorney",
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=700&fit=crop",
    interests: ["Theater", "Golf", "Fashion"],
  },
  {
    id: 5,
    name: "Olivia Grace",
    age: 43,
    title: "Creative Director",
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop",
    interests: ["Photography", "Design", "Travel"],
  },
];

export default function HeroSection() {
  const [cards, setCards] = useState(profileCards);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden pt-20">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          className="font-extrabold text-gray-100 select-none leading-none"
          style={{
            fontSize: "clamp(150px, 25vw, 400px)",
            letterSpacing: "-0.02em",
          }}
        >
          ELITESUGAR
        </h1>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-50/50 via-white to-rose-50/50"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <div className="space-y-1">
            <div
              className="inline-block w-fit mx-auto px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold animate-fade-in"
              style={{ color: "#E94057" }}
            >
            Those seeking for Elegant, Rich and Empowered Women
            </div>

            <h2 className="text-5xl uppercase sm:text-6xl lg:text-7xl md:text-left font-bold text-gray-900 leading-tight">
             Find your Sugar
              <span className="block mt-2 bg-linear-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Match
              </span>
            </h2>

            <p className="text-xl sm:text-2xl md:text-left text-gray-600 leading-relaxed">
              Connect with extraordinary individuals who celebrate ambition,
              elegance, and authenticity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="group px-10 py-5 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                style={{ backgroundColor: "#E94057" }}
              >
                <span className="flex items-center justify-center gap-2">
                  Enter EliteSugar
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* <button className="px-10 py-5 text-gray-700 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                Discover More
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200">
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                >
                  50K+
                </div>
                <div className="text-sm text-gray-600 mt-1">SugarElite Members</div>
              </div>
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                >
                  94%
                </div>
                <div className="text-sm text-gray-600 mt-1">Success Rate</div>
              </div>
              <div>
                <div
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: "#E94057" }}
                >
                  $250K+
                </div>
                <div className="text-sm text-gray-600 mt-1">Avg. Income</div>
              </div>
            </div>
          </div>

          {/* Right Column - Swipeable Cards */}
          <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
            <SwipeableCardStack
              cards={cards}
              currentIndex={currentIndex}
              onSwipe={handleSwipe}
            />
          </div>
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

// SwipeableCardStack and SwipeableCard functions remain unchanged, but we tweak text tone:

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
          <div className=" p-8 bg-white rounded-3xl shadow-xl">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              You've met everyone!
            </h3>
            <p className="text-gray-600">
              More extraordinary matches are on the way.
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
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

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
      <div
        className="absolute inset-0 w-full cursor-grab active:cursor-grabbing"
        style={cardStyle}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Like/Nope Indicators */}
        {isTop && isDragging && (
          <>
            <div
              className="absolute top-8 right-8 px-6 py-3 border-4 border-green-500 rounded-xl text-green-500 font-bold text-2xl rotate-12 z-10"
              style={{ opacity: dragOffset.x > 50 ? 1 : 0 }}
            >
              LIKE
            </div>
            <div
              className="absolute top-8 left-8 px-6 py-3 border-4 border-red-500 rounded-xl text-red-500 font-bold text-2xl -rotate-12 z-10"
              style={{ opacity: dragOffset.x < -50 ? 1 : 0 }}
            >
              NOPE
            </div>
          </>
        )}

        <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image */}
          <div className="relative h-3/4">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Verified Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
              <BadgeCheck className="w-4 h-4" style={{ color: "#E94057" }} />
              <span className="text-xs font-bold text-gray-700">Verified</span>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-1">
                    {card.name}, {card.age}
                  </h3>
                  <p className="text-lg opacity-90 mb-2">{card.title}</p>
                  <p className="text-sm opacity-75 flex items-center gap-1">
                    📍 {card.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="h-1/4 p-6 py-2 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {card.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#FFF0F2", color: "#E94057" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Only show for top card */}
      {isTop && (
        <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6 z-50">
          <button
            onClick={() => handleButtonSwipe("left")}
            className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-200"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={() => handleButtonSwipe("right")}
            className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            style={{ backgroundColor: "#E94057" }}
          >
            <Heart className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
