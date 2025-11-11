// components/register/AlertMessage.tsx
import { AlertCircle, Check } from "lucide-react";

interface AlertMessageProps {
  type: "error" | "success";
  message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  if (type === "error") {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-red-800">Error</h4>
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-green-800">Success!</h4>
        <p className="text-sm text-green-700">{message}</p>
      </div>
    </div>
  );
}
