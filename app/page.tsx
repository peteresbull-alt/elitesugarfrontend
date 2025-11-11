import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/About";
import MarqueeSection from "@/components/MarqueeSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConciergeSection from "@/components/ConciergeSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQs";

export const metadata: Metadata = {
  title: "Meet Successful Sugar Mommies in Australia, Singapore, NZ & Canada",
  description:
    "SMSureConnect is the #1 premium dating platform connecting confident partners with verified, successful sugar mommies aged 40-80 in Australia, Singapore, New Zealand, and Canada. Join 5K+ verified members with 94% success rate.",
  keywords: [
    "sugar mommy Australia",
    "sugar mommy Singapore",
    "sugar mommy New Zealand",
    "sugar mommy Canada",
    "wealthy women dating",
    "mature women relationships",
    "premium dating platform",
    "verified sugar mommies",
    "luxury dating service",
    "successful women seeking men",
  ],
  openGraph: {
    title: "SMSureConnect - Meet Successful Sugar Mommies | Premium Dating",
    description:
      "Connect with 5K+ verified, accomplished women in Australia, Singapore, New Zealand & Canada. 94% success rate. Premium luxury dating experiences.",
    images: [
      {
        url: "/home-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SMSureConnect Premium Dating Platform",
      },
    ],
    type: "website",
    url: "https://smsureconnect.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Verified Sugar Mommies | SMSureConnect",
    description:
      "Premium dating platform with 5K+ verified members across Australia, Singapore, NZ & Canada",
    images: ["/home-twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://smsureconnect.com",
  },
};

// Enhanced FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SMSureConnect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SMSureConnect is a premium dating platform connecting confident partners with verified, successful sugar mommies in Australia, Singapore, New Zealand, and Canada. We feature 5K+ verified members with income verification and privacy protection.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does SMSureConnect operate in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SMSureConnect primarily serves Australia, Singapore, New Zealand, and Canada, with verified members across all major cities in these countries.",
      },
    },
    {
      "@type": "Question",
      name: "Are profiles verified on SMSureConnect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all sugar mommy profiles undergo identity and income verification to ensure authenticity. We maintain a 94% success rate through our rigorous verification process.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average income of members?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average income of verified sugar mommy members on SMSureConnect is $500K+ annually, ensuring genuine luxury lifestyle opportunities.",
      },
    },
  ],
};

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Premium Dating Platform",
  provider: {
    "@type": "Organization",
    name: "SMSureConnect",
    url: "https://smsureconnect.com",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Australia",
    },
    {
      "@type": "Country",
      name: "Singapore",
    },
    {
      "@type": "Country",
      name: "New Zealand",
    },
    {
      "@type": "Country",
      name: "Canada",
    },
  ],
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 18,
    suggestedMaxAge: 80,
  },
  offers: {
    "@type": "Offer",
    description: "Premium dating membership with verified profiles",
    availability: "https://schema.org/InStock",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dating Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Profile Verification",
          description: "Identity and income verification for all members",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Curated Matching",
          description: "Personalized matching with compatible sugar mommies",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Concierge Service",
          description: "White-glove dating support and premium experiences",
        },
      },
    ],
  },
};

// Aggregate Rating Schema
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SMSureConnect Dating Platform",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  offers: {
    "@type": "AggregateOffer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
    lowPrice: "0",
    offerCount: "3",
  },
};

export default function LandingPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />

      <div className="min-h-screen bg-white overflow-hidden">
        {/* Semantic HTML5 structure */}
        <header>
          <Navbar />
        </header>

        <main>
          {/* H1 is in HeroSection - ensure only ONE H1 per page */}
          <HeroSection />

          <AboutSection />

          <MarqueeSection />

          <HowItWorksSection />

          <FeaturesSection />

          <TestimonialsSection />

          <ConciergeSection />

          <FAQSection />

          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
}
