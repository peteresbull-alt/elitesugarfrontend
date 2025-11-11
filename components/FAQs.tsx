"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is SMSureConnect?",
    answer:
      "SMSureConnect is a premium dating platform connecting confident partners with verified, successful sugar mommies across Australia, Singapore, New Zealand, and Canada. We feature over 5,000 verified members with rigorous identity and income verification processes.",
  },
  {
    question: "Which countries and cities does SMSureConnect operate in?",
    answer:
      "SMSureConnect primarily serves Australia (Sydney, Melbourne, Brisbane, Perth), Singapore, New Zealand (Auckland, Wellington, Christchurch), and Canada (Toronto, Vancouver, Montreal, Calgary). We have verified members across all major cities in these countries.",
  },
  {
    question: "How are sugar mommy profiles verified on SMSureConnect?",
    answer:
      "All sugar mommy profiles undergo comprehensive verification including identity verification, income verification, and photo authentication. Our verification process ensures 94% success rate and authentic connections with accomplished women earning $500K+ annually.",
  },
  {
    question: "What age range of sugar mommies can I meet?",
    answer:
      "SMSureConnect features successful, accomplished women primarily aged 40-80 years. All members must be 18+ to join the platform, and we maintain strict age verification protocols for safety and compliance.",
  },
  {
    question: "Is SMSureConnect safe and private?",
    answer:
      "Yes. We prioritize your privacy with bank-level encryption, discreet billing, and optional anonymous browsing. Your personal information is protected under Australian Privacy Act, Singapore PDPA, New Zealand Privacy Act, and Canadian PIPEDA regulations.",
  },
  {
    question: "How much does SMSureConnect membership cost?",
    answer:
      "We offer flexible membership plans starting with free registration. Premium memberships provide access to verified profiles, unlimited messaging, concierge services, and priority matching. Visit our pricing page for current rates.",
  },
  {
    question: "What makes SMSureConnect different from other dating sites?",
    answer:
      "Unlike typical dating apps, SMSureConnect exclusively connects you with verified, wealthy sugar mommies who are serious about relationships. We offer curated matching, income verification, white-glove concierge service, and luxury dating experiences.",
  },
  {
    question: "Can I meet sugar mommies in my city?",
    answer:
      "Yes! We have active members in Sydney, Melbourne, Brisbane, Perth (Australia), Singapore, Auckland, Wellington (New Zealand), Toronto, Vancouver, Montreal (Canada), and many other cities. Use our location filters to find sugar mommies near you.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Profile verification typically takes 24-48 hours. We verify identity documents, income statements, and photos to ensure all members are genuine. This thorough process maintains our 94% success rate and premium member quality.",
  },
  {
    question: "What if I'm not satisfied with SMSureConnect?",
    answer:
      "We offer a satisfaction guarantee. If you're not finding quality matches, contact our concierge team for personalized assistance. Premium members can cancel anytime, and we provide full transparency on refund policies in our terms of service.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-20 sm:py-32 bg-gradient-to-b from-white to-pink-50/30"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-2 rounded-full bg-pink-100 text-sm font-semibold mb-6"
            style={{ color: "#E94057" }}
          >
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-600">
            Common questions about sugar mommy dating in Australia, Singapore,
            New Zealand & Canada
          </p>
        </div>

        <dl className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <dt>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span
                    className="text-lg font-semibold text-gray-900 pr-8"
                    itemProp="name"
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    style={{ color: "#E94057" }}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <dd
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div
                  className="px-6 pb-6 text-gray-600 leading-relaxed"
                  itemProp="text"
                >
                  {faq.answer}
                </div>
              </dd>
            </div>
          ))}
        </dl>

        {/* Additional SEO-rich content */}
        <div className="mt-16 p-8 bg-white rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions About Sugar Mommy Dating?
          </h3>
          <p className="text-gray-600 mb-6">
            Our customer support team is available 24/7 to help you navigate the
            SMSureConnect platform. Whether you're in Sydney, Singapore,
            Auckland, or Toronto, we're here to ensure your premium dating
            experience exceeds expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://t.me/Smsureconnect"
              className="inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: "#E94057" }}
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Regional targeting content */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            <strong>Serving:</strong> Australia (NSW, VIC, QLD, WA) • Singapore
            • New Zealand (Auckland, Wellington) • Canada (ON, BC, QC)
          </p>
        </div>
      </div>

      {/* FAQ Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
