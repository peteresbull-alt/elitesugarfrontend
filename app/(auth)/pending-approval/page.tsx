"use client";

import { Clock, CheckCircle, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PendingApprovalPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FEF3F2" }}
            >
              <Clock className="w-10 h-10" style={{ color: "#E94057" }} />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: "#E94057" }}
          >
            Account Pending Approval
          </h1>

          {/* Message */}
          <p className="text-center text-gray-600 text-lg mb-8">
            Thank you for registering with SMSureConnect! Your account has been
            successfully created and is currently under review.
          </p>

          {/* Status Card */}
          <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6" style={{ color: "#E94057" }} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Our team will review your profile within 24-48 hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      You'll receive an email notification once approved
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      After approval, you can login and start connecting
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> SMSureConnect maintains high standards to
              ensure the quality of our community. All profiles are manually
              reviewed to verify authenticity and maintain our exclusive
              environment.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <span>Back to Login</span>
            </button>
            <Link
              href="https://t.me/Smsureconnect"
              className="flex-1 px-6 py-4 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: "#E94057" }}
            >
              <span>Contact Support</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Questions? Contact the livechat below or{" "}
            <a
              href="https://t.me/Smsureconnect"
              className="font-semibold hover:underline"
              style={{ color: "#E94057" }}
            >
              contact our support team via Telegram
            </a>
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: "#E94057" }}
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Registration</h4>
            <p className="text-sm text-gray-600">
              Account created successfully
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Review</h4>
            <p className="text-sm text-gray-600">Profile under review</p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-100">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Approval</h4>
            <p className="text-sm text-gray-600">Access granted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
