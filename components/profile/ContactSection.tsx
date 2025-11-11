// components/profile/ContactSection.tsx
import { Mail, Phone } from "lucide-react";

interface ContactSectionProps {
  isEditing: boolean;
  email: string;
  phoneNumber?: string;
  onPhoneChange: (phone: string) => void;
}

export default function ContactSection({
  isEditing,
  email,
  phoneNumber,
  onPhoneChange,
}: ContactSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Email</span>
          </div>
          <p className="text-gray-900 font-semibold break-all">{email}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Phone</span>
          </div>
          {isEditing ? (
            <input
              type="tel"
              value={phoneNumber || ""}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          ) : (
            <p className="text-gray-900 font-semibold">
              {phoneNumber || "Not specified"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
