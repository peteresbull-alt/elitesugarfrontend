// components/profile/LoadingSpinner.tsx
import { Loader, AlertCircle } from "lucide-react";

interface LoadingSpinnerProps {
  error?: string;
}

export default function LoadingSpinner({ error }: LoadingSpinnerProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#E94057" }} />
    </div>
  );
}
