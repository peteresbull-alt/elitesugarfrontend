"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is SMSureConnect?",
    answer:
      "SMSureConnect is a premium dating platform connecting discerning men with verified, successful women across the world’s most developed countries. We provide a secure and professional environment for meaningful connections, featuring rigorous identity and income verification to ensure authenticity.",
  },
  {
    question: "Which countries does SMSureConnect operate in?",
    answer:
      "SMSureConnect serves verified members across the United States, Canada, United Kingdom, France, Germany, Italy, Spain, Australia, New Zealand, Singapore, Japan, South Korea, China, and the UAE. Our platform ensures quality connections in all major cities within these countries.",
  },
  {
    question: "Which cities are currently active on SMSureConnect?",
    answer:
      "We have active members in New York, Los Angeles, Toronto, Vancouver, London, Paris, Berlin, Rome, Madrid, Sydney, Melbourne, Auckland, Singapore City, Tokyo, Seoul, Beijing, and Dubai. Our network continues to grow, providing opportunities to connect in most first-world urban centers.",
  },
  {
    question: "How are sugar mommy profiles verified on SMSureConnect?",
    answer:
      "All female profiles undergo comprehensive verification including government-issued identity verification, proof of income, and photo authentication. This process ensures all members are authentic, maintaining a 94% success rate for meaningful, high-quality connections.",
  },
  {
    question: "What age range of members can I meet?",
    answer:
      "SMSureConnect features accomplished women primarily aged 40 to 80 years. Male members must be 18+ to join, and all users undergo strict age verification protocols to ensure a safe and professional environment for all parties.",
  },
  {
    question: "Is SMSureConnect secure and private?",
    answer:
      "Yes. SMSureConnect prioritizes privacy and security with bank-level encryption, discreet billing, and optional anonymous browsing. All personal information is protected under privacy regulations applicable in the U.S., Canada, UK, EU, Australia, Singapore, Japan, South Korea, China, and UAE.",
  },
  {
    question: "How much does SMSureConnect membership cost?",
    answer:
      "Membership starts with free registration, allowing limited access to verified profiles. Premium memberships unlock full platform capabilities including unlimited messaging, priority matching, and concierge support. Pricing details are transparent and available on our website.",
  },
  {
    question: "What makes SMSureConnect different from other dating platforms?",
    answer:
      "SMSureConnect exclusively connects men with verified, accomplished women who are serious about relationships. Unlike general dating apps, we offer curated matchmaking, income verification, and professional support to facilitate secure and meaningful connections.",
  },
  {
    question: "Can I meet members outside my country?",
    answer:
      "Yes. SMSureConnect supports international connections within the first-world countries we operate in. Our platform allows you to filter matches by location, facilitating safe and verified introductions across borders.",
  },
  {
    question: "How long does profile verification take?",
    answer:
      "Profile verification typically takes 24 to 48 hours. Our team verifies identity documents, income statements, and photographs to maintain the authenticity and high-quality standards of our membership base.",
  },
  {
    question: "What if I am not satisfied with SMSureConnect?",
    answer:
      "SMSureConnect offers a satisfaction guarantee. If you are not finding suitable matches, our professional support team is available for guidance. Premium members can cancel their subscription at any time, and our policies provide full transparency on refunds.",
  },
  {
    question: "Does SMSureConnect comply with international regulations?",
    answer:
      "Yes. SMSureConnect strictly follows privacy and data protection laws in all countries we operate, including the U.S., Canada, UK, EU, Australia, Singapore, Japan, South Korea, China, and UAE. This ensures all members’ data and interactions remain secure and compliant.",
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
            Common questions about premium international sugar mommy matchmaking
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  );
}
