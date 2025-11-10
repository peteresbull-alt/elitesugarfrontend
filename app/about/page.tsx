"use client";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold" style={{ color: "#E94057" }}>
            YourAppName
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Sign In
            </button>
            <button
              className="px-8 py-3 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: "#E94057" }}
            >
              Download App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Marquee */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Where Elegance
            <br />
            Meets Connection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A sophisticated dating experience for accomplished women seeking
            meaningful relationships
          </p>
        </div>

        <InfiniteMarquee />
      </section>

      {/* Mission Statement Section */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: "#E94057" }}
        ></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              We exist to bring people closer to love.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We believe that every woman deserves authentic connections with
              partners who appreciate her success, wisdom, and vibrant spirit.
              Our platform is designed to foster meaningful relationships built
              on mutual respect and genuine compatibility.
            </p>
            <button
              className="mt-12 px-12 py-4 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              style={{ backgroundColor: "#E94057" }}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl opacity-20 blur-3xl"
                  style={{ backgroundColor: "#E94057" }}
                ></div>
                <div className="relative bg-linear-to-t from-pink-50 to-rose-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="aspect-9/16 rounded-2xl overflow-hidden bg-white shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=800&fit=crop"
                      alt="App Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Curated matches for the discerning heart
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our intelligent matching system understands that you're looking
                for more than just attraction. We connect you with partners who
                share your values, ambitions, and zest for life.
              </p>
              <div className="space-y-6">
                <Feature
                  icon="✓"
                  title="Verified Profiles"
                  description="Every member is verified to ensure authenticity and safety"
                />
                <Feature
                  icon="♦"
                  title="Premium Experience"
                  description="Ad-free, sophisticated interface designed for your comfort"
                />
                <Feature
                  icon="✦"
                  title="Privacy First"
                  description="Your information is protected with enterprise-grade security"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: "#E94057" }}
        ></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Be the first to know
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive community and get early access to premium
              features, dating insights from relationship experts, and success
              stories from women who found their perfect match.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-900"
                // style={{ focusRing: "#E94057" }}
              />
              <button
                type="submit"
                className="px-10 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 whitespace-nowrap"
                style={{ backgroundColor: "#E94057" }}
              >
                Join Waitlist
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Lifestyle Section with Images */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real connections, real stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our members are finding meaningful relationships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop"
                alt="Couple having coffee"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold">
                    First dates that matter
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.unsplash.com/photo-1606787619248-1b31e6c85922?w=600&h=600&fit=crop"
                alt="Couple at dinner"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold">Elegant experiences</p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=600&fit=crop"
                alt="Happy couple"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold">Lasting connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Designed for your lifestyle
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every feature is crafted with sophistication and your needs in
              mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Smart Matching"
              description="Our AI learns your preferences to suggest compatible matches that align with your lifestyle and values"
              icon="🎯"
            />
            <FeatureCard
              title="Video Dates"
              description="Get to know matches through secure video calls before meeting in person"
              icon="📹"
            />
            <FeatureCard
              title="Exclusive Events"
              description="Access to curated social events and experiences for our premium members"
              icon="✨"
            />
            <FeatureCard
              title="Concierge Service"
              description="Personal dating concierge to help plan perfect dates and provide guidance"
              icon="💎"
            />
            <FeatureCard
              title="Background Checks"
              description="Optional background verification for additional peace of mind"
              icon="🛡️"
            />
            <FeatureCard
              title="Success Coaching"
              description="Access to relationship experts and dating coaches"
              icon="🌟"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundColor: "#E94057" }}
        ></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Your next chapter begins here
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of accomplished women who have found meaningful
            connections and lasting love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-12 py-4 bg-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
              style={{ color: "#E94057" }}
            >
              Download for iOS
            </button>
            <button className="px-12 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 text-lg">
              Download for Android
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div
                className="text-2xl font-bold mb-4"
                style={{ color: "#E94057" }}
              >
                YourAppName
              </div>
              <p className="text-gray-600 text-sm">
                Connecting hearts, celebrating success
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2025 YourAppName. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Infinite Marquee Component
function InfiniteMarquee() {
  const profiles = [
    {
      name: "Sophia",
      age: 42,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    },
    {
      name: "Isabella",
      age: 38,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop",
    },
    {
      name: "Charlotte",
      age: 45,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
    },
    {
      name: "Amelia",
      age: 40,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
    },
    {
      name: "Olivia",
      age: 43,
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    },
    {
      name: "Emma",
      age: 39,
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    },
  ];

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee">
          {[...profiles, ...profiles].map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function ProfileCard({
  profile,
}: {
  profile: { name: string; age: number; image: string };
}) {
  return (
    <div className="shrink-0 w-80 mx-4">
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-linear-to-r from-pink-400 to-rose-500 rounded-3xl opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
        <div className="relative">
          <div className="aspect-3/4 rounded-3xl shadow-2xl overflow-hidden relative">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-3xl font-bold mb-1">{profile.name}</div>
              <div className="text-xl font-light opacity-90">{profile.age}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
        style={{ backgroundColor: "#E94057" }}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group">
      <div className="relative">
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"
          style={{ backgroundColor: "#E94057" }}
        ></div>
        <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-500">
          <div className="text-5xl mb-6">{icon}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
