import { Metadata } from "next";
import { FileText, Shield, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - SMSureConnect",
  description:
    "Read the Terms of Service for SMSureConnect – the exclusive platform connecting confident men with rich, successful sugar mommies and empresses.",
  openGraph: {
    title: "Terms of Service | SMSureConnect",
    description:
      "Understand your rights, responsibilities, and our community standards on SMSureConnect – where real connections meet discretion and luxury.",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 11, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">Terms of Service</h1>
              <p className="text-white/90">
                Please read carefully before using SMSureConnect.
              </p>
            </div>
          </div>
          <p className="text-sm text-white/80">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By creating an account or using SMSureConnect (the Platform), you
            agree to these Terms of Service and our Privacy Policy. If you do
            not agree, please discontinue use immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            Users must be at least 18 years old. By registering, you confirm
            that all information provided is accurate and that you have the
            legal right to use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Conduct</h2>
          <p>
            Treat all members with respect. Harassment, hate speech, scams, or
            explicit solicitation are strictly prohibited. We reserve the right
            to suspend or remove any account that violates these standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Content Ownership</h2>
          <p>
            You retain ownership of your content but grant SMSureConnect a
            limited, non-exclusive license to display, host, and promote it
            within the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Payments & Membership
          </h2>
          <p>
            Premium memberships and upgrades are billed securely via our payment
            partners. All purchases are final unless required by law. We do not
            process refunds for completed services or expired subscriptions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Privacy & Security</h2>
          <p>
            Your privacy matters. We use modern encryption and moderation to
            protect user data and ensure safe interactions. Please review our
            Privacy Policy for details on how data is collected and used.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Disclaimer</h2>
          <p>
            SMSureConnect does not guarantee relationship outcomes or the
            authenticity of every user. You agree to use discretion and assume
            all responsibility for interactions conducted through the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages
            arising from use of the Platform. Use is provided “as-is” without
            warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes to Terms</h2>
          <p>
            SMSureConnect may update these Terms periodically. Continued use
            after updates means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact</h2>
          <p>
            For questions about these Terms, please contact us via the livechat
            below{" "}
            <a
              href="https://t.me/Smsureconnect"
              className="text-pink-600 hover:underline"
            >
              Telegram
            </a>
            .
          </p>
        </section>

        <div className="flex items-center gap-2 text-green-600 mt-10">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">
            Thank you for being part of SMSureConnect where confidence meets
            connection.
          </span>
        </div>
      </div>
    </div>
  );
}
