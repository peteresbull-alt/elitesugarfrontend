// components/profile/SecuritySection.tsx
import { Lock } from "lucide-react";

interface SecuritySectionProps {
  onChangePassword: () => void;
}

export default function SecuritySection({
  onChangePassword,
}: SecuritySectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-5 h-5" style={{ color: "#E94057" }} />
        <h3 className="text-lg font-bold text-gray-900">Security</h3>
      </div>
      <button
        onClick={onChangePassword}
        className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-pink-500 hover:text-pink-600 transition-all"
      >
        Change Password
      </button>
    </div>
  );
}



