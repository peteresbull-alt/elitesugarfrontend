// components/profile/PersonalDetailsSection.tsx
import {
  Settings,
  User,
  Calendar,
  MapPin,
  Globe,
  Ruler,
  Briefcase,
  GraduationCap,
  Home,
} from "lucide-react";
import { UserProfile } from "@/types/profile";

interface PersonalDetailsSectionProps {
  isEditing: boolean;
  userData: UserProfile;
  editedData: Partial<UserProfile>;
  onFieldChange: (field: string, value: string) => void;
}

export default function PersonalDetailsSection({
  isEditing,
  userData,
  editedData,
  onFieldChange,
}: PersonalDetailsSectionProps) {
  const fields = [
    { label: "First Name", field: "first_name", icon: User },
    { label: "Last Name", field: "last_name", icon: User },
    {
      label: "Date of Birth",
      field: "date_of_birth",
      icon: Calendar,
      type: "date",
    },
    { label: "Place of Birth", field: "place_of_birth", icon: MapPin },
    { label: "Nationality", field: "nationality", icon: Globe },
    {
      label: "Gender",
      field: "gender",
      icon: User,
      type: "select",
      options: ["male", "female", "other"],
    },
    { label: "Height", field: "height", icon: Ruler },
    { label: "Occupation", field: "occupation", icon: Briefcase },
    { label: "Education", field: "education", icon: GraduationCap },
    { label: "Location", field: "location", icon: Home },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" style={{ color: "#E94057" }} />
        <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ label, field, icon: Icon, type, options }) => (
          <div key={field} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {isEditing ? (
              type === "select" ? (
                <select
                  value={(editedData as any)[field] || ""}
                  onChange={(e) => onFieldChange(field, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                >
                  <option value="">Select</option>
                  {options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type || "text"}
                  value={(editedData as any)[field] || ""}
                  onChange={(e) => onFieldChange(field, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                />
              )
            ) : (
              <p className="text-gray-900 font-semibold">
                {(userData as any)[field] || "Not specified"}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

