

import { Star, BadgeCheck } from "lucide-react";


const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SMSureConnect",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1250",
  },
  review: [
    {
      "@type": "Review",
      author: "Anonymous User",
      datePublished: "2025-01-15",
      reviewBody: "Best platform for meeting successful women and sugar mommies",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
  ],
};

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-pink-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div
            className="inline-block px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold mb-5 sm:mb-6"
            style={{ color: "#E94057" }}
          >
            Member Experiences
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Real Connections. Real Chemistry.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Stories from confident women and their lucky matches who found
            sparks, passion, and partnership through SMSureConnect.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <TestimonialCard
            quote="I joined SMSureConnect  after years of boring encounters. Within weeks, I met someone who truly admired my success — and kept up with my lifestyle. We travel, laugh, and spoil each other endlessly."
            name="James Harrison"
            age={30}
            title="Tech Founder, Canada"
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
            relationship="In Love"
            coupleImage="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850252/cute-couple-kissing-outdoors-blanket_muphw4.jpg"
          />

          <TestimonialCard
            quote="I’m a busy surgeon, and I wanted something real — not small talk. SMSureConnect  introduced me to a partner who values ambition and affection equally. We’ve been inseparable ever since."
            name="Dr. Jude Sullivan"
            age={40}
            title="Cardiothoracic Surgeon, Sydney"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
            relationship="Exclusive"
            coupleImage="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850260/cute-couple-park-lady-white-shirt-people-pier_nec9wy.jpg"
          />

          <TestimonialCard
            quote="After my divorce, I wanted fun, chemistry, and connection without the games. SMSureConnect  gave me all three — and a partner who adores every inch of my confidence."
            name="Charles Foster"
            age={60}
            title="Luxury Consultant, Toronto"
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
            relationship="Happily Matched"
            coupleImage="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850616/man-kissing-his-lover-s-hand_1_homaoy.jpg"
          />
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Stat label="Luxury Matches" value="12K+" />
            <Stat label="SMSureConnect Success Rate" value="96%" />
            <Stat label="Power Couples Formed" value="4,500+" />
            <Stat label="Member Satisfaction" value="4.9/5" />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  age,
  title,
  image,
  relationship,
  coupleImage,
}: {
  quote: string;
  name: string;
  age: number;
  title: string;
  image: string;
  relationship: string;
  coupleImage: string;
}) {
  return (
    <div className="group relative">
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        style={{ backgroundColor: "#E94057" }}
      ></div>
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        {/* Top Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={coupleImage}
            alt="Happy couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div
            className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white"
            style={{ backgroundColor: "#E94057" }}
          >
            {relationship}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                style={{ color: "#E94057" }}
              />
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6 italic flex-1 text-sm sm:text-base">
            "{quote}"
          </p>

          <div className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-100">
            {/* <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-100">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div> */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 truncate text-sm sm:text-base">
                {name}, {age}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 truncate">
                {title}
              </div>
            </div>
            <BadgeCheck
              className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
              style={{ color: "#E94057" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
        style={{ color: "#E94057" }}
      >
        {value}
      </div>
      <div className="text-sm sm:text-base text-gray-600">{label}</div>
    </div>
  );
}
