// components/profile/AccountStatusSection.tsx
import { CheckCircle } from "lucide-react";
import { UserProfile } from "@/types/profile";

interface AccountStatusSectionProps {
  userData: UserProfile;
}

export default function AccountStatusSection({
  userData,
}: AccountStatusSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Approval Status</span>
          <span
            className={`font-semibold ${
              userData.is_approved ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {userData.is_approved ? "Approved" : "Pending"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Verification</span>
          <span
            className={`flex items-center gap-1 font-semibold ${
              userData.verified ? "text-green-600" : "text-gray-500"
            }`}
          >
            {userData.verified && <CheckCircle className="w-4 h-4" />}
            {userData.verified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Member Since</span>
          <span className="font-semibold text-gray-900">
            {new Date(userData.date_joined).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
