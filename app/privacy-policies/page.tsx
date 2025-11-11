import { Metadata } from "next";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Globe,
  Mail,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data Protection & Security",
  description:
    "SMSureConnect privacy policy. Learn how we protect your personal information, ensure discretion, and maintain the highest standards of data security on our premium dating platform.",
  openGraph: {
    title: "Privacy Policy | SMSureConnect",
    description:
      "Your privacy and discretion are our top priorities. Read our comprehensive privacy policy.",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 11, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                Privacy Policy
              </h1>
              <p className="text-white/90">Your Privacy, Our Priority</p>
            </div>
          </div>
          <p className="text-lg text-white/90">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6" style={{ color: "#E94057" }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to SMSureConnect (Sugar Mommy Sure Connect). We
                understand that privacy and discretion are paramount in the
                world of premium dating. This Privacy Policy explains how we
                collect, use, protect, and share your personal information when
                you use our platform.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                By using SMSureConnect, you agree to the terms outlined in this
                Privacy Policy. We are committed to maintaining the
                confidentiality and security of your personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8" style={{ color: "#E94057" }} />
            <h2 className="text-2xl font-bold text-gray-900">
              Information We Collect
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                1. Information You Provide
              </h3>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Account Information:</strong> Name, email address,
                    phone number, date of birth, gender, and location
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Profile Information:</strong> Photos, bio,
                    preferences, interests, lifestyle details, and relationship
                    goals
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Verification Information:</strong> Identity
                    documents, income verification (for premium members)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Payment Information:</strong> Credit card details,
                    billing address (processed securely through third-party
                    payment processors)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Communications:</strong> Messages sent through our
                    platform, customer support inquiries
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2. Automatically Collected Information
              </h3>
              <ul className="space-y-2 text-gray-600 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Usage Data:</strong> Pages visited, features used,
                    search queries, matches viewed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Device Information:</strong> IP address, browser
                    type, operating system, device identifiers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Location Data:</strong> Approximate location based
                    on IP address (with your consent for precise location)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    <strong>Cookies & Tracking:</strong> We use cookies and
                    similar technologies to enhance user experience
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-8 h-8" style={{ color: "#E94057" }} />
            <h2 className="text-2xl font-bold text-gray-900">
              How We Use Your Information
            </h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="p-4 bg-pink-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✓ Provide & Improve Services
              </h3>
              <p>
                Create and manage your account, facilitate matches, personalize
                your experience, and improve platform features
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✓ Communication
              </h3>
              <p>
                Send you notifications, updates, promotional offers, and respond
                to your inquiries
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✓ Safety & Security
              </h3>
              <p>
                Verify identities, detect and prevent fraud, enforce our terms,
                and protect user safety
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✓ Analytics & Research
              </h3>
              <p>
                Analyze usage patterns, conduct research, and generate
                aggregated statistics
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✓ Legal Compliance
              </h3>
              <p>
                Comply with legal obligations and respond to lawful requests
                from authorities
              </p>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8" style={{ color: "#E94057" }} />
            <h2 className="text-2xl font-bold text-gray-900">
              Information Sharing & Disclosure
            </h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p className="font-semibold text-gray-900">
              We share your information only in the following circumstances:
            </p>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                With Other Users
              </h3>
              <p>
                Your profile information, photos, and activity are visible to
                other members as per your privacy settings
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Service Providers
              </h3>
              <p>
                Third-party vendors who help us operate our platform (payment
                processors, hosting services, analytics providers)
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Legal Requirements
              </h3>
              <p>
                When required by law, court order, or to protect rights, safety,
                and security
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Business Transfers
              </h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your
                information may be transferred
              </p>
            </div>

            <p className="text-sm italic mt-4">
              <strong>
                We will NEVER sell your personal information to third parties
                for marketing purposes.
              </strong>
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8" style={{ color: "#E94057" }} />
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, disclosure,
              alteration, or destruction.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🔒 Encryption
                </h4>
                <p className="text-sm">
                  All data transmission is encrypted using SSL/TLS technology
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🛡️ Secure Servers
                </h4>
                <p className="text-sm">
                  Data stored on secure servers with restricted access
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  👤 Access Controls
                </h4>
                <p className="text-sm">
                  Limited employee access to personal information
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  🔍 Regular Audits
                </h4>
                <p className="text-sm">
                  Continuous monitoring and security assessments
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm">
                <strong>Please note:</strong> No method of transmission over the
                internet is 100% secure. While we strive to protect your
                information, we cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights & Choices */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-8 h-8" style={{ color: "#E94057" }} />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Rights & Choices
            </h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              You have the following rights regarding your personal information:
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">1</span>
                </span>
                <div>
                  <strong>Access:</strong> Request a copy of the personal
                  information we hold about you
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">2</span>
                </span>
                <div>
                  <strong>Correction:</strong> Update or correct inaccurate
                  information in your profile
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">3</span>
                </span>
                <div>
                  <strong>Deletion:</strong> Request deletion of your account
                  and personal data (subject to legal requirements)
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">4</span>
                </span>
                <div>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing
                  communications at any time
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">5</span>
                </span>
                <div>
                  <strong>Portability:</strong> Request a copy of your data in a
                  portable format
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 font-bold text-sm">6</span>
                </span>
                <div>
                  <strong>Restriction:</strong> Request restriction of
                  processing your personal information
                </div>
              </li>
            </ul>

            <div className="p-4 bg-blue-50 rounded-xl mt-6">
              <p className="text-sm">
                To exercise these rights, please contact us at{" "}
                <strong>privacy@smsureconnect.com</strong> or through your
                account settings.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies Policy */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cookies & Tracking Technologies
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience. You can control cookie preferences through your
              browser settings.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Essential Cookies:</strong> Required for platform
                functionality
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Analytics Cookies:</strong> Help us understand how users
                interact with our platform
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements
              </div>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Data Retention
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide services. When you delete your
              account, we will remove your personal information within 30 days,
              except where we are required to retain it for legal, regulatory,
              or security purposes.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Children&apos;s Privacy
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              SMSureConnect is intended for users aged 18 and above. We do not
              knowingly collect personal information from individuals under 18.
              If we become aware that we have collected information from a
              minor, we will delete it immediately.
            </p>
          </div>
        </section>

        {/* International Users */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            International Data Transfers
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. We ensure appropriate
              safeguards are in place to protect your information in accordance
              with this Privacy Policy.
            </p>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Changes to This Privacy Policy
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the &apos;Last Updated&apos; date. Your continued use
              of SMSureConnect after changes constitutes acceptance of the
              updated policy.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>

          <div className="space-y-4">
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> privacy@smsureconnect.com
              </p>
              <p>
                <strong>Support:</strong> support@smsureconnect.com
              </p>
              <p>
                <strong>Address:</strong> SMSureConnect Privacy Team, [Your
                Business Address]
              </p>
            </div>

            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/90">
                We are committed to protecting your privacy and will respond to
                your inquiry within 30 days.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
