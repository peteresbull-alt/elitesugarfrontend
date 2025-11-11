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
  title:
    "Sugar Mommy Dating Australia | Meet Wealthy Women in Sydney, Melbourne",
  description:
    "Connect with verified sugar mommies across Australia. Premium dating in Sydney, Melbourne, Brisbane, Perth. 1000+ verified Australian members.",
  keywords: [
    "sugar mommy Australia",
    "wealthy women Sydney",
    "Melbourne dating",
    "Brisbane sugar mommy",
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
