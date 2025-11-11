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
  title: "Sugar Mommy Dating New Zealand | Auckland, Wellington, Christchurch",
  description:
    "Connect with successful sugar mommies in New Zealand. Premium dating across Auckland, Wellington, Christchurch. Verified NZ members.",
  keywords: [
    "sugar mommy New Zealand",
    "Auckland dating",
    "Wellington sugar mommy",
  ],
};


export default function LandingPage() {
  return (
    <>
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
