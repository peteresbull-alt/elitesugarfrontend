// components/profile/InterestsSection.tsx
import { useState } from "react";
import { Heart, X } from "lucide-react";

interface InterestsSectionProps {
  isEditing: boolean;
  interests?: string[];
  onInterestsChange: (interests: string[]) => void;
}

export default function InterestsSection({
  isEditing,
  interests = [],
  onInterestsChange,
}: InterestsSectionProps) {
  const [newInterest, setNewInterest] = useState("");

  const toggleInterest = (interest: string) => {
    const newInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];
    onInterestsChange(newInterests);
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      onInterestsChange([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5" style={{ color: "#E94057" }} />
        <h3 className="text-xl font-bold text-gray-900">Interests</h3>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        {interests.map((interest, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full bg-pink-50 border-2 border-pink-200 font-medium flex items-center gap-2"
            style={{ color: "#E94057" }}
          >
            {interest}
            {isEditing && (
              <button
                onClick={() => toggleInterest(interest)}
                className="hover:bg-pink-200 rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </span>
        ))}
      </div>
      {isEditing && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addInterest()}
            placeholder="Add new interest..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={addInterest}
            className="px-6 py-2 text-white rounded-lg font-semibold"
            style={{ backgroundColor: "#E94057" }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
