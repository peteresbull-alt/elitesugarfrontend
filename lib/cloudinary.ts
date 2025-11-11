// lib/cloudinary.ts
// Add your Cloudinary credentials here
export const CLOUDINARY_UPLOAD_PRESET = "elite_preset"; // Create an unsigned upload preset in Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Upload image to Cloudinary
 * @param file - Image file to upload
 * @param folder - Cloudinary folder to upload to
 * @returns Cloudinary URL
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "profile_pictures"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Returns the HTTPS URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files
 * @param folder - Cloudinary folder
 * @param onProgress - Progress callback
 * @returns Array of Cloudinary URLs
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  folder: string = "user_photos",
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const uploadPromises = files.map(async (file, index) => {
    const url = await uploadToCloudinary(file, folder);
    if (onProgress) {
      const progress = ((index + 1) / files.length) * 100;
      onProgress(progress);
    }
    return url;
  });

  return Promise.all(uploadPromises);
}
