// components/profile/AboutSection.tsx
import { User } from "lucide-react";

interface AboutSectionProps {
  isEditing: boolean;
  bio?: string;
  onBioChange: (bio: string) => void;
}

export default function AboutSection({
  isEditing,
  bio,
  onBioChange,
}: AboutSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5" style={{ color: "#E94057" }} />
        <h3 className="text-xl font-bold text-gray-900">About Me</h3>
      </div>
      {isEditing ? (
        <textarea
          value={bio || ""}
          onChange={(e) => onBioChange(e.target.value)}
          rows={6}
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-700"
          placeholder="Tell others about yourself..."
        />
      ) : (
        <p className="text-gray-700 leading-relaxed">
          {bio || "No bio added yet."}
        </p>
      )}
    </div>
  );
}
