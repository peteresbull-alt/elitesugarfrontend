// components/register/NavigationButtons.tsx
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  isUploading: boolean;
  photoFilesLength: number;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  isSubmitting,
  isUploading,
  photoFilesLength,
  onPrevStep,
  onNextStep,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-4 mt-8">
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrevStep}
          disabled={isSubmitting || isUploading}
          className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNextStep}
          disabled={isSubmitting || isUploading}
          className="flex-1 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#E94057" }}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || isUploading || photoFilesLength < 2}
          className="flex-1 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: "#E94057" }}
        >
          {isSubmitting || isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>
                {isUploading ? "Uploading Photos..." : "Creating Account..."}
              </span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <Check className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
