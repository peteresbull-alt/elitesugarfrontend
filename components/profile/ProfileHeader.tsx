// components/profile/ProfileHeader.tsx
import { Edit2, Save, X, Loader } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProfileHeader({
  isEditing,
  saving,
  onEdit,
  onCancel,
  onSave,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">
          Manage your profile and preferences
        </p>
      </div>
      <div className="flex gap-3">
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:border-pink-500 hover:text-pink-600 transition-all"
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="px-6 py-3 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              style={{ backgroundColor: "#E94057" }}
            >
              {saving ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
