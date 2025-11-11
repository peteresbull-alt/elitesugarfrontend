// components/profile/AlertMessage.tsx
import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  if (type === "success") {
    return (
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <p className="text-green-800">{message}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-600" />
      <p className="text-red-800">{message}</p>
    </div>
  );
}
