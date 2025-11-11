// components/profile/NetWorthSection.tsx
import { Sparkles } from "lucide-react";

interface NetWorthSectionProps {
  isEditing: boolean;
  netWorth?: string;
  onNetWorthChange: (value: string) => void;
}

export default function NetWorthSection({
  isEditing,
  netWorth,
  onNetWorthChange,
}: NetWorthSectionProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 p-6">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-bold text-gray-900">Net Worth</h3>
      </div>
      {isEditing ? (
        <select
          value={netWorth || ""}
          onChange={(e) => onNetWorthChange(e.target.value)}
          className="w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
        >
          <option value="">Select</option>
          <option>Under $500K</option>
          <option>$500K - $1M</option>
          <option>$1M - $2M</option>
          <option>$2M - $3M</option>
          <option>$3M - $5M</option>
          <option>$5M - $10M</option>
          <option>$10M+</option>
        </select>
      ) : (
        <p className="text-xl font-bold text-gray-900">
          {netWorth || "Not specified"}
        </p>
      )}
    </div>
  );
}
