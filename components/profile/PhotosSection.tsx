"use client";

import { useState } from "react";
import { Camera, Upload, Loader, X } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import {
  uploadMultipleToCloudinary,
  isValidCloudinaryUrl,
} from "@/lib/cloudinaryv2";
import { UserProfile } from "@/types/profile";

interface PhotosSectionProps {
  userData: UserProfile;
  onPhotosUpdated: () => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
}

export default function PhotosSection({
  userData,
  onPhotosUpdated,
  setError,
  setSuccess,
}: PhotosSectionProps) {
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getAuthToken = () => localStorage.getItem("authToken");

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const remainingSlots = 6 - userData.photos.length;

    if (files.length > remainingSlots) {
      setError(
        `You can only upload ${remainingSlots} more photo(s). Maximum is 6 photos.`
      );
      return;
    }

    setUploadingPhotos(true);
    setError("");
    setUploadProgress(0);

    try {
      console.log("Starting photo upload process...");

      // Step 1: Upload to Cloudinary
      console.log(`Uploading ${files.length} files to Cloudinary...`);
      const photoUrls = await uploadMultipleToCloudinary(
        files,
        "user_photos",
        (progress) => {
          console.log(`Upload progress: ${progress}%`);
          setUploadProgress(progress);
        }
      );

      console.log("Cloudinary upload complete. URLs:", photoUrls);

      // Step 2: Validate all URLs
      const invalidUrls = photoUrls.filter((url) => !isValidCloudinaryUrl(url));
      if (invalidUrls.length > 0) {
        console.error("Invalid URLs detected:", invalidUrls);
        throw new Error("Some uploaded files have invalid URLs");
      }

      console.log("All URLs validated successfully");

      // Step 3: Send URLs to backend
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Sending URLs to backend:", {
        url: `${BACKEND_URL}/photos/upload/`,
        photo_urls: photoUrls,
      });

      const response = await fetch(`${BACKEND_URL}/photos/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo_urls: photoUrls }),
      });

      console.log("Backend response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Backend response:", result);

        await onPhotosUpdated();
        setSuccess("Photos uploaded successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const result = await response.json().catch(() => ({
          error: `Server returned ${response.status}: ${response.statusText}`,
        }));

        console.error("Backend error:", result);

        // Display specific error messages
        if (result.photo_urls) {
          setError(`Invalid URLs: ${JSON.stringify(result.photo_urls)}`);
        } else if (result.error) {
          setError(result.error);
        } else {
          setError(`Failed to upload photos: ${response.statusText}`);
        }
      }
    } catch (err) {
      console.error("Upload error:", err);

      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError("An unexpected error occurred while uploading photos");
      }
    } finally {
      setUploadingPhotos(false);
      setUploadProgress(0);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`${BACKEND_URL}/photos/${photoId}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        await onPhotosUpdated();
        setSuccess("Photo deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete photo");
      }
    } catch (err) {
      setError("Error deleting photo");
    }
  };

  const handleSetProfilePicture = async (photoId: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${BACKEND_URL}/photos/${photoId}/set-profile/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        await onPhotosUpdated();
        setSuccess("Profile picture updated!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to set profile picture");
      }
    } catch (err) {
      setError("Error setting profile picture");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5" style={{ color: "#E94057" }} />
          <h3 className="text-xl font-bold text-gray-900">Photos</h3>
          <span className="text-sm text-gray-500">
            ({userData.photos.length}/6)
          </span>
        </div>

        {userData.photos.length < 6 && (
          <label className="px-4 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-semibold text-sm hover:bg-pink-50 transition-all cursor-pointer flex items-center gap-2">
            {uploadingPhotos ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Photos
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploadingPhotos}
            />
          </label>
        )}
      </div>

      {/* Upload Progress */}
      {uploadingPhotos && uploadProgress > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 mb-2">
            Uploading photos... {Math.round(uploadProgress)}%
          </p>
          <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Photos Grid */}
      {userData.photos.length > 0 ? (
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

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                {!photo.is_profile_picture && (
                  <button
                    onClick={() => handleSetProfilePicture(photo.id)}
                    className="px-3 py-1 bg-white text-gray-800 rounded-full text-xs font-semibold hover:bg-gray-100"
                  >
                    Set as Profile
                  </button>
                )}
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Profile Badge */}
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
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-4">No photos uploaded yet</p>
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-pink-700 transition-all">
            <Upload className="w-4 h-4" />
            Upload Your First Photo
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
      )}
    </div>
  );
}
