"use client";

import { useState, useEffect } from "react";
import {
  Camera,
  Edit2,
  Save,
  X,
  Shield,
  Crown,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Ruler,
  Home as HomeIcon,
  Heart,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  Sparkles,
  User,
  Settings,
  AlertCircle,
  Loader,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

// API Configuration
const API_BASE_URL = BACKEND_URL;

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  age: number | null;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  city_country: string;
  gender: string;
  full_address: string;
  phone_number: string;
  membership_type: "regular" | "gold" | "platinum";
  interests: string[];
  bio: string;
  occupation: string;
  education: string;
  height: string;
  location: string;
  net_worth: string;
  looking_for: string;
  relationship_goals: string[];
  is_approved: boolean;
  verified: boolean;
  date_joined: string;
  profile_views: number;
  matches_count: number;
  favorites_count: number;
  photos: Array<{
    id: number;
    image: string;
    is_profile_picture: boolean;
    uploaded_at: string;
    order: number;
  }>;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [editedData, setEditedData] = useState<Partial<UserProfile>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Photo upload
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched profile data:", data); // Debug log
        setUserData(data);
        setEditedData(data);
      } else if (response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        setError("Failed to load profile");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();

      // Prepare data to send - only send fields that exist in editedData
      const dataToSend: any = {};

      // Fields that can be updated
      const updateableFields = [
        "first_name",
        "last_name",
        "date_of_birth",
        "place_of_birth",
        "nationality",
        "city_country",
        "gender",
        "full_address",
        "phone_number",
        "interests",
        "bio",
        "occupation",
        "education",
        "height",
        "location",
        "net_worth",
        "looking_for",
        "relationship_goals",
      ];

      updateableFields.forEach((field) => {
        if (editedData.hasOwnProperty(field)) {
          dataToSend[field] = (editedData as any)[field];
        }
      });

      const response = await fetch(`${API_BASE_URL}/profile/update/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        // Update both userData and editedData with the response
        const updatedUser = result.user;
        setUserData(updatedUser);
        setEditedData(updatedUser);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);

        // Refresh the entire profile to get latest data
        await fetchUserProfile();

        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorMsg =
          Object.values(result).flat().join(" ") || "Failed to update profile";
        setError(errorMsg);
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setEditedData({ ...userData });
    }
    setIsEditing(false);
    setError("");
  };

  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordLoading(true);

    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/password/change/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      const result = await response.json();

      if (response.ok) {
        // Update token
        localStorage.setItem("authToken", result.token);
        setShowPasswordModal(false);
        setPasswordData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        setSuccess("Password changed successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        // Handle password validation errors
        let errorMsg = "";
        if (result.new_password) {
          errorMsg = Array.isArray(result.new_password)
            ? result.new_password.join(" ")
            : result.new_password;
        } else if (result.current_password) {
          errorMsg = Array.isArray(result.current_password)
            ? result.current_password[0]
            : result.current_password;
        } else if (result.confirm_password) {
          errorMsg = Array.isArray(result.confirm_password)
            ? result.confirm_password[0]
            : result.confirm_password;
        } else {
          errorMsg = "Failed to change password";
        }
        setPasswordError(errorMsg);
      }
    } catch (err) {
      setPasswordError("Error changing password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingPhotos(true);
    setError("");

    try {
      const token = getAuthToken();
      const formData = new FormData();

      Array.from(e.target.files).forEach((file) => {
        formData.append("photos", file);
      });

      const response = await fetch(`${API_BASE_URL}/photos/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        await fetchUserProfile(); // Refresh profile to get new photos
        setSuccess("Photos uploaded successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await response.json();
        setError(result.error || "Failed to upload photos");
      }
    } catch (err) {
      setError("Error uploading photos");
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE_URL}/photos/${photoId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchUserProfile();
        setSuccess("Photo deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete photo");
      }
    } catch (err) {
      setError("Error deleting photo");
    }
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = editedData.interests || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];

    setEditedData({ ...editedData, interests: newInterests });
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !(editedData.interests || []).includes(newInterest.trim())
    ) {
      setEditedData({
        ...editedData,
        interests: [...(editedData.interests || []), newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "platinum":
        return { color: "#E94057", label: "Platinum", icon: Crown };
      case "gold":
        return { color: "#FFD700", label: "Gold", icon: Star };
      default:
        return { color: "#94A3B8", label: "Regular", icon: Shield };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" style={{ color: "#E94057" }} />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </div>
    );
  }

  const badge = getMembershipBadge(userData.membership_type);
  const BadgeIcon = badge.icon;
  const profilePhoto =
    userData.photos.find((p) => p.is_profile_picture)?.image ||
    userData.photos[0]?.image;

  return (
    <div className="max-w-6xl mx-auto md:p-6">
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your profile and preferences
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:border-pink-500 hover:text-pink-600 transition-all"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
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

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div
          className="h-32 bg-gradient-to-r from-pink-500 to-rose-500"
          style={{ backgroundColor: "#E94057" }}
        ></div>

        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div className="relative">
                <img
                  src={profilePhoto || "https://via.placeholder.com/150"}
                  alt={userData.full_name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {userData.verified && (
                  <div
                    className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                    style={{ color: "#E94057" }}
                  >
                    <CheckCircle className="w-6 h-6" fill="#E94057" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.full_name}
                  {userData.age && `, ${userData.age}`}
                </h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1 justify-center sm:justify-start">
                  <Briefcase className="w-4 h-4" />
                  <span>{userData.occupation || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.location || userData.city_country}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0">
              <div
                className="px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
                style={{
                  backgroundColor: `${badge.color}15`,
                  border: `2px solid ${badge.color}`,
                }}
              >
                <BadgeIcon className="w-6 h-6" style={{ color: badge.color }} />
                <span
                  className="font-bold text-lg"
                  style={{ color: badge.color }}
                >
                  {badge.label} Member
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
                {userData.profile_views}
              </div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
                {userData.matches_count}
              </div>
              <div className="text-sm text-gray-600">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
                {userData.favorites_count}
              </div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
                {userData.is_approved ? "✓" : "⏳"}
              </div>
              <div className="text-sm text-gray-600">
                {userData.is_approved ? "Approved" : "Pending"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5" style={{ color: "#E94057" }} />
              <h3 className="text-xl font-bold text-gray-900">About Me</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editedData.bio || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, bio: e.target.value })
                }
                rows={6}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-gray-700"
                placeholder="Tell others about yourself..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {userData.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5" style={{ color: "#E94057" }} />
              <h3 className="text-xl font-bold text-gray-900">
                Personal Details
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "First Name", field: "first_name", icon: User },
                { label: "Last Name", field: "last_name", icon: User },
                {
                  label: "Date of Birth",
                  field: "date_of_birth",
                  icon: Calendar,
                  type: "date",
                },
                {
                  label: "Place of Birth",
                  field: "place_of_birth",
                  icon: MapPin,
                },
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
                { label: "Location", field: "location", icon: HomeIcon },
              ].map(({ label, field, icon: Icon, type, options }) => (
                <div key={field} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  {isEditing ? (
                    type === "select" ? (
                      <select
                        value={(editedData as any)[field] || ""}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            [field]: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            [field]: e.target.value,
                          })
                        }
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

          {/* Interests */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5" style={{ color: "#E94057" }} />
              <h3 className="text-xl font-bold text-gray-900">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {(isEditing ? editedData.interests : userData.interests)?.map(
                (interest, idx) => (
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
                )
              )}
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

          {/* Photos */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" style={{ color: "#E94057" }} />
                <h3 className="text-xl font-bold text-gray-900">Photos</h3>
              </div>
              <label className="px-4 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-semibold text-sm hover:bg-pink-50 transition-all cursor-pointer flex items-center gap-2">
                {uploadingPhotos ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploadingPhotos ? "Uploading..." : "Upload Photos"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploadingPhotos}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {userData.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={photo.image}
                    alt="User photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  {photo.is_profile_picture && (
                    <div
                      className="absolute top-2 left-2 px-2 py-1 bg-white rounded-full text-xs font-bold"
                      style={{ color: "#E94057" }}
                    >
                      Profile
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-gray-900 font-semibold break-all">
                  {userData.email}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone_number || ""}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        phone_number: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                ) : (
                  <p className="text-gray-900 font-semibold">
                    {userData.phone_number || "Not specified"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Net Worth */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-bold text-gray-900">Net Worth</h3>
            </div>
            {isEditing ? (
              <select
                value={editedData.net_worth || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, net_worth: e.target.value })
                }
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
                {userData.net_worth || "Not specified"}
              </p>
            )}
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5" style={{ color: "#E94057" }} />
              <h3 className="text-lg font-bold text-gray-900">Security</h3>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-pink-500 hover:text-pink-600 transition-all"
            >
              Change Password
            </button>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Status
            </h3>
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
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {passwordError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{passwordError}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.current_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters and not too common
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirm_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                disabled={passwordLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={passwordLoading}
                className="flex-1 px-4 py-3 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#E94057" }}
              >
                {passwordLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
