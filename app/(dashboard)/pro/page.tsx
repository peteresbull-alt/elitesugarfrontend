"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { UserProfile } from "@/types/profile";

// Components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import AboutSection from "@/components/profile/AboutSection";
import PersonalDetailsSection from "@/components/profile/PersonalDetailsSection";
import InterestsSection from "@/components/profile/InterestsSection";
import PhotosSection from "@/components/profile/PhotosSection";
import ContactSection from "@/components/profile/ContactSection";
import NetWorthSection from "@/components/profile/NetWorthSection";
import SecuritySection from "@/components/profile/SecuritySection";
import AccountStatusSection from "@/components/profile/AccountStatusSection";
import PasswordModal from "@/components/profile/PasswordModal";
import AlertMessage from "@/components/profile/AlertMessage";
import LoadingSpinner from "@/components/profile/LoadingSpinner";

const API_BASE_URL = BACKEND_URL;

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [editedData, setEditedData] = useState<Partial<UserProfile>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
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
      const dataToSend: any = {};

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
        const updatedUser = result.user;
        setUserData(updatedUser);
        setEditedData(updatedUser);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
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

  if (loading) return <LoadingSpinner />;
  if (!userData) return <LoadingSpinner error="Failed to load profile" />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Alert Messages */}
      {success && <AlertMessage type="success" message={success} />}
      {error && <AlertMessage type="error" message={error} />}

      {/* Header */}
      <ProfileHeader
        isEditing={isEditing}
        saving={saving}
        onEdit={() => setIsEditing(true)}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {/* Profile Card */}
      <ProfileCard userData={userData} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <AboutSection
            isEditing={isEditing}
            bio={isEditing ? editedData.bio : userData.bio}
            onBioChange={(bio) => setEditedData({ ...editedData, bio })}
          />

          <PersonalDetailsSection
            isEditing={isEditing}
            userData={userData}
            editedData={editedData}
            onFieldChange={(field, value) =>
              setEditedData({ ...editedData, [field]: value })
            }
          />

          <InterestsSection
            isEditing={isEditing}
            interests={isEditing ? editedData.interests : userData.interests}
            onInterestsChange={(interests) =>
              setEditedData({ ...editedData, interests })
            }
          />

          <PhotosSection
            userData={userData}
            onPhotosUpdated={fetchUserProfile}
            setError={setError}
            setSuccess={setSuccess}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContactSection
            isEditing={isEditing}
            email={userData.email}
            phoneNumber={
              isEditing ? editedData.phone_number : userData.phone_number
            }
            onPhoneChange={(phone) =>
              setEditedData({ ...editedData, phone_number: phone })
            }
          />

          <NetWorthSection
            isEditing={isEditing}
            netWorth={isEditing ? editedData.net_worth : userData.net_worth}
            onNetWorthChange={(value) =>
              setEditedData({ ...editedData, net_worth: value })
            }
          />

          <SecuritySection
            onChangePassword={() => setShowPasswordModal(true)}
          />

          <AccountStatusSection userData={userData} />
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            setSuccess("Password changed successfully!");
            setTimeout(() => setSuccess(""), 3000);
          }}
        />
      )}
    </div>
  );
}
