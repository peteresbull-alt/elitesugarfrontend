// components/register/Step1.tsx
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/types/register";

interface Step1Props {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watchedFields: Partial<RegisterFormData>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export default function Step1({
  register,
  errors,
  watchedFields,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: Step1Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Let's start with the basics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
              errors.firstName
                ? "border-red-500"
                : "border-gray-300 focus:border-pink-500"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="firstName"
            className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
              watchedFields.firstName
                ? "text-xs top-2"
                : "peer-focus:text-xs peer-focus:top-2 top-4"
            }`}
            style={watchedFields.firstName ? { color: "#E94057" } : {}}
          >
            First Name
          </label>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
              errors.lastName
                ? "border-red-500"
                : "border-gray-300 focus:border-pink-500"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="lastName"
            className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
              watchedFields.lastName
                ? "text-xs top-2"
                : "peer-focus:text-xs peer-focus:top-2 top-4"
            }`}
            style={watchedFields.lastName ? { color: "#E94057" } : {}}
          >
            Last Name
          </label>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.email
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.email ? { color: "#E94057" } : {}}
        >
          Email Address
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.password
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="password"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.password
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.password ? { color: "#E94057" } : {}}
        >
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.confirmPassword
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="confirmPassword"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.confirmPassword
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.confirmPassword ? { color: "#E94057" } : {}}
        >
          Confirm Password
        </label>
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}