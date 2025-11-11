import { BadgeCheck, Lock, Users, Shield } from "lucide-react";
import Link from "next/link";

const aboutSectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Premium Dating Platform",
  provider: {
    "@type": "Organization",
    name: "SMSureConnect",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 18,
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-white to-pink-50/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850403/very-beautiful-blonde-woman-white-fashionable-stylish-suit-studio-charming-woman-looks-poses-camera_1_r0jk62.jpg"
                    alt="Successful woman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850263/fashion-outdoor-portrait-naked-woman-sits-sofa-covering-herself-with-blanket-holding-cigar_z4zger.jpg"
                    alt="Elegant woman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850259/beautiful-woman-fancy-dress-walking-down-street-fashion-beauty-makeup-evening-dress-smiling-girl-posing-model-luxury-wearing-accessories-blonde-volume-hair-lipstick-eyes-perfect_jmxpsi.jpg"
                    alt="Professional woman"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://res.cloudinary.com/djspmrmxw/image/upload/v1762850260/portrait-beautiful-cute-blond-girl-white-t-shirt-jeans-posing-outdoors-cute-girl-sitting-asphalt-street_pu8fhr.jpg"
                    alt="Sophisticated woman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold mb-6"
                style={{ color: "#E94057" }}
              >
                About SMSureConnect
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Meet Ambitious Women seeking for Love and Affection
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">
                  SMSureConnect (Sugar Mommy Sure Connect){" "}
                </strong>{" "}
                is the Number 1 online dating platform where confident men meet
                rich, successful sugar mommies and elegant empresses. Connect
                with generous, powerful women who love to spoil, support, and
                share real luxury relationships built on trust and attraction.
              </p>
              <p>
                <strong className="text-gray-900">We</strong> connect you with
                rich, elegant sugar mommies ready to share affection, success,
                and unforgettable experiences. It's a place where confidence
                meets chemistry.
              </p>

              <p>
                Explore exclusive matches with accomplished women who appreciate
                ambition, confidence, and charm. Real connections, no pretenses.
              </p>

              <p>
                Unlike ordinary dating apps,{" "}
                <strong className="text-gray-900">
                  SMSureConnect connects you with verified, accomplished and
                  beautiful women
                </strong>{" "}
                committed to meaningful connections and genuine compatibility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <BadgeCheck
                    className="w-6 h-6"
                    style={{ color: "#E94057" }}
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Verified Profiles
                  </div>
                  <div className="text-sm text-gray-600">
                    Identity & income verification
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Lock className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Privacy First
                  </div>
                  <div className="text-sm text-gray-600">
                    Your discretion is guaranteed
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Users className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Curated Matches
                  </div>
                  <div className="text-sm text-gray-600">
                    Quality over quantity
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#FFF0F2" }}
                >
                  <Shield className="w-6 h-6" style={{ color: "#E94057" }} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">
                    Concierge Service
                  </div>
                  <div className="text-sm text-gray-600">
                    White-glove dating support
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={"/regitser"}
                className="px-10 inline-block py-4 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                style={{ backgroundColor: "#E94057" }}
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSectionJsonLd) }}
      />
    </section>
  );
}
