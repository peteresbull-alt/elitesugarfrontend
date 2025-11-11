// components/register/Step5.tsx
import { Upload, X, Check } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/types/register";

interface Step5Props {
  photoFiles: File[];
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  errors: FieldErrors<RegisterFormData>;
}

export default function Step5({
  photoFiles,
  handlePhotoUpload,
  removePhoto,
  errors,
}: Step5Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Upload your photos
      </h3>
      <p className="text-gray-600 mb-4">
        Add at least 2 photos to complete your profile (maximum 6)
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {photoFiles.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
          >
            <img
              src={URL.createObjectURL(photo)}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {photoFiles.length < 6 && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 flex flex-col items-center justify-center cursor-pointer transition-all bg-gray-50">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              multiple
            />
          </label>
        )}
      </div>

      {errors.photos && (
        <p className="text-red-500 text-sm">
          {errors.photos.message as string}
        </p>
      )}

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Photo Tips:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Use clear, recent photos</li>
          <li>✓ Show your face clearly</li>
          <li>✓ Include variety (close-up, full body, activity)</li>
          <li>✓ Smile and be authentic</li>
        </ul>
      </div>

      {photoFiles.length >= 2 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            <span className="font-semibold">Profile Complete!</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            You're ready to start your journey to finding true love
          </p>
        </div>
      )}
    </div>
  );
}
