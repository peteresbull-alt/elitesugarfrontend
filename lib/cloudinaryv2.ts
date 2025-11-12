// lib/cloudinary.ts

// Cloudinary Configuration
export const CLOUDINARY_UPLOAD_PRESET = "elite_preset";
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Ensures the URL is complete with https://
 * @param url - URL from Cloudinary response
 * @param cloudName - Cloudinary cloud name
 * @returns Complete HTTPS URL
 */
function ensureCompleteUrl(url: string, cloudName: string): string {
  if (!url) {
    throw new Error("No URL provided to ensureCompleteUrl");
  }

  // If it's already a complete URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, construct the full URL
  // Remove leading slash if present
  const cleanUrl = url.startsWith("/") ? url.substring(1) : url;

  // Construct full Cloudinary URL
  return `https://res.cloudinary.com/${cloudName}/${cleanUrl}`;
}

/**
 * Upload a single image to Cloudinary
 * @param file - Image file to upload
 * @param folder - Cloudinary folder to upload to
 * @returns Complete Cloudinary HTTPS URL
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = "profile_pictures"
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error(
      "Cloudinary cloud name is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your .env.local file"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    console.log(`Uploading ${file.name} to Cloudinary folder: ${folder}`);

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Cloudinary upload failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Cloudinary response for", file.name, ":", {
      secure_url: data.secure_url,
      url: data.url,
      public_id: data.public_id,
      format: data.format,
    });

    // Get the URL from response (prefer secure_url)
    let imageUrl = data.secure_url || data.url;

    if (!imageUrl) {
      console.error("No URL in Cloudinary response:", data);
      throw new Error("Cloudinary did not return a URL");
    }

    // Ensure the URL is complete
    const completeUrl = ensureCompleteUrl(imageUrl, CLOUDINARY_CLOUD_NAME);
    console.log("Final complete URL:", completeUrl);

    // Validate the final URL
    if (!completeUrl.startsWith("https://")) {
      throw new Error(`Invalid URL format: ${completeUrl}`);
    }

    return completeUrl;
  } catch (error) {
    console.error("Cloudinary upload error for", file.name, ":", error);
    throw error;
  }
}

/**
 * Upload multiple images to Cloudinary with progress tracking
 * @param files - Array of image files
 * @param folder - Cloudinary folder
 * @param onProgress - Progress callback (0-100)
 * @returns Array of complete Cloudinary HTTPS URLs
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  folder: string = "user_photos",
  onProgress?: (progress: number) => void
): Promise<string[]> {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload");
  }

  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary cloud name is not configured");
  }

  console.log(`Starting upload of ${files.length} files to folder: ${folder}`);

  const urls: string[] = [];
  const totalFiles = files.length;

  for (let i = 0; i < totalFiles; i++) {
    try {
      console.log(`Uploading file ${i + 1}/${totalFiles}:`, files[i].name);

      const url = await uploadToCloudinary(files[i], folder);
      urls.push(url);

      // Update progress
      if (onProgress) {
        const progress = ((i + 1) / totalFiles) * 100;
        onProgress(progress);
      }

      console.log(`Successfully uploaded ${i + 1}/${totalFiles}:`, url);
    } catch (error) {
      console.error(
        `Failed to upload file ${i + 1} (${files[i].name}):`,
        error
      );
      throw new Error(
        `Failed to upload ${files[i].name}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  console.log("All files uploaded successfully:", urls);

  // Final validation - ensure all URLs are complete HTTPS URLs
  const invalidUrls = urls.filter((url) => !url.startsWith("https://"));
  if (invalidUrls.length > 0) {
    console.error("Invalid URLs detected:", invalidUrls);
    throw new Error("Some URLs are not complete HTTPS URLs");
  }

  return urls;
}

/**
 * Validate if a URL is a valid Cloudinary URL
 * @param url - URL to validate
 * @returns boolean
 */
export function isValidCloudinaryUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);
    return (
      urlObj.protocol === "https:" && urlObj.hostname === "res.cloudinary.com"
    );
  } catch {
    return false;
  }
}

/**
 * Extract public_id from Cloudinary URL
 * Useful for deletion or transformation operations
 * @param url - Complete Cloudinary URL
 * @returns public_id or null
 */
export function getPublicIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const uploadIndex = pathParts.indexOf("upload");

    if (uploadIndex !== -1 && pathParts.length > uploadIndex + 1) {
      // Get everything after /upload/ and remove file extension
      const publicIdWithExtension = pathParts.slice(uploadIndex + 2).join("/");
      const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
      return publicId;
    }

    return null;
  } catch {
    return null;
  }
}
