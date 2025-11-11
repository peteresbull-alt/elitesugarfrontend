// components/register/Step3.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/types/register";

interface Step3Props {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watchedFields: Partial<RegisterFormData>;
}

export default function Step3({ register, errors, watchedFields }: Step3Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Contact information
      </h3>

      <div className="relative">
        <select
          id="gender"
          {...register("gender")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all appearance-none ${
            errors.gender
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label
          htmlFor="gender"
          className="absolute left-4 text-xs top-2"
          style={{ color: "#E94057" }}
        >
          Gender
        </label>
        <div className="absolute right-4 top-5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      <div className="relative">
        <textarea
          id="fullAddress"
          {...register("fullAddress")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all resize-none ${
            errors.fullAddress
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
          rows={3}
        />
        <label
          htmlFor="fullAddress"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.fullAddress
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.fullAddress ? { color: "#E94057" } : {}}
        >
          Full Address
        </label>
        {errors.fullAddress && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullAddress.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.phoneNumber
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="phoneNumber"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.phoneNumber
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.phoneNumber ? { color: "#E94057" } : {}}
        >
          Phone Number
        </label>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
}



