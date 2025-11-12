

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
            quote="After my divorce, I wanted fun, chemistry, and connection without the games. SMSureConnect  gave me all three — and a partner who adores every inch of my confidence."
            name="Charles Foster"
            age={60}
            title="Luxury Consultant, Toronto"
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
            relationship="Happily Matched"
            coupleImage="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850616/man-kissing-his-lover-s-hand_1_homaoy.jpg"
          />

          <TestimonialCard
            quote="I was stuck in a dead-end warehouse job in Dubai, sending money home and living in a cramped flat with five roommates. SMSureConnect connected me with Layla, a successful investment banker who saw my ambition. She mentored me through business school, helped me launch my import-export company, and now I employ 30 people. This platform gave me the life I only dreamed about."
            name="Omar Hassan"
            age={33}
            title="Import-Export Magnate, Dubai, UAE"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            relationship="Life Partners"
            coupleImage="/testimonials/Why-Older-Higher-Satisfaction.webp"
          />

          <TestimonialCard
            quote="As a struggling artist in London, I was working three part-time jobs just to afford my studio rent. SMSureConnect introduced me to Victoria, a gallery owner who believed in my vision. She didn't just support me financially — she opened doors I never knew existed. Last month, my exhibition sold out. I'm living the dream I thought was impossible."
            name="Marcus Bennett"
            age={32}
            title="Visual Artist, London, UK"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
            relationship="Together & Thriving"
            coupleImage="/testimonials/testimonial_boy_older_woman.jpg"
          />

          <TestimonialCard
            quote="I was working dead-end retail jobs in Melbourne, struggling to pay rent and watching my music dreams fade. Through SMSureConnect, I met Jennifer, a entertainment industry executive who saw my potential. She funded my home studio, connected me with producers, and now I'm signed to a major label with my debut album dropping next month. She turned my impossible dream into my reality."
            name="Liam Foster"
            age={28}
            title="Recording Artist, Melbourne, Australia"
            image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
            relationship="Power Couple"
            coupleImage="/testimonials/images_woman_man_younger.jpeg"
          />

          <TestimonialCard
            quote="I was a broke personal trainer in Barcelona, living paycheck to paycheck with no savings. Then I matched with Isabella, a real estate mogul who became my biggest blessing. She invested in my fitness franchise concept, and now I own five luxury gyms across Spain. Beyond the money, she taught me about wealth-building, investments, and believing in myself. SMSureConnect gave me a partner and a mentor rolled into one incredible woman."
            name="Rafael Costa"
            age={35}
            title="Fitness Empire Owner, Barcelona, Spain"
            image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
            relationship="Building Together"
            coupleImage="/testimonials/images_with_older_woman.jpeg"
          />

          <TestimonialCard
            quote="I was drowning in student debt from medical school in Toronto, working brutal hospital shifts and side gigs just to survive. SMSureConnect connected me with Elena, a pharmaceutical executive who understood my struggle. She helped me clear my debt, invest wisely, and now I practice medicine without financial stress while building a real estate portfolio. She saw my worth when I couldn't afford to see it myself."
            name="David Chen"
            age={31}
            title="Emergency Physician & Investor, Toronto, Canada"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            relationship="Committed & Grateful"
            coupleImage="/testimonials/testimonials_1.webp"
          />

          <TestimonialCard
            quote="I'm a queer woman from Sydney who'd been struggling to make my fashion design dreams work while working retail. On SMSureConnect, I met Carmen — a successful marketing director who became my girlfriend and business angel. She funded my first collection, taught me about branding, and now my designs are in boutiques across Australia. This platform gave me love, financial freedom, and the confidence to own every part of who I am."
            name="Sophie Martinez"
            age={35}
            title="Fashion Designer, Sydney, Australia"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            relationship="In Love & In Business"
            coupleImage="/testimonials/Lesbian_Couple_Steve_Cole_Vetta_Getty-56a44c683df78cf77281a2af.webp"
          />

          <TestimonialCard
            quote="As a non-binary person in Berlin, finding genuine connection felt impossible, and my music career was going nowhere. SMSureConnect introduced me to Katarina, an events producer who didn't just accept me — she celebrated me. She booked me for high-end venues, connected me with industry legends, and invested in my first album. Now I tour internationally and finally live authentically. She saw the artist in me before the world did."
            name="Alex Rivers"
            age={27}
            title="Electronic Music Producer, Berlin, Germany"
            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
            relationship="Soulmates & Partners"
            coupleImage="/testimonials/pexels-elina-fairytale-3893732-2.jpg"
          />

          <TestimonialCard
            quote="I was bartending in Manila, barely affording rent and supporting my family back in the province. Through SMSureConnect, I met Sophia, a hotel chain owner who changed everything. She helped me get my hospitality management degree, and now I'm managing her flagship property with a six-figure salary. She believed in me when no one else did, and gave me the opportunity to prove myself."
            name="Miguel Santos"
            age={30}
            title="Luxury Hotel Manager, Manila, Philippines"
            image="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop"
            relationship="Forever Grateful"
            coupleImage="/testimonials/testimonial_1.jpg"
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
