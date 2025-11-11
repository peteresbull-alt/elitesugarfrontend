// components/register/Step2.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterFormData } from "@/types/register";

interface Step2Props {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watchedFields: Partial<RegisterFormData>;
}

export default function Step2({ register, errors, watchedFields }: Step2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about yourself
      </h3>

      <div className="relative">
        <input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.dateOfBirth
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
        />
        <label
          htmlFor="dateOfBirth"
          className="absolute left-4 text-xs top-2"
          style={{ color: "#E94057" }}
        >
          Date of Birth
        </label>
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          id="placeOfBirth"
          type="text"
          {...register("placeOfBirth")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.placeOfBirth
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="placeOfBirth"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.placeOfBirth
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.placeOfBirth ? { color: "#E94057" } : {}}
        >
          Place of Birth
        </label>
        {errors.placeOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.placeOfBirth.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          id="nationality"
          type="text"
          {...register("nationality")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.nationality
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="nationality"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.nationality
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.nationality ? { color: "#E94057" } : {}}
        >
          Nationality
        </label>
        {errors.nationality && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nationality.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          id="cityCountry"
          type="text"
          {...register("cityCountry")}
          className={`peer w-full border rounded-lg px-4 pt-6 pb-2 bg-white focus:outline-none transition-all ${
            errors.cityCountry
              ? "border-red-500"
              : "border-gray-300 focus:border-pink-500"
          }`}
          placeholder=" "
        />
        <label
          htmlFor="cityCountry"
          className={`absolute left-4 text-gray-500 transition-all pointer-events-none ${
            watchedFields.cityCountry
              ? "text-xs top-2"
              : "peer-focus:text-xs peer-focus:top-2 top-4"
          }`}
          style={watchedFields.cityCountry ? { color: "#E94057" } : {}}
        >
          City / Country
        </label>
        {errors.cityCountry && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cityCountry.message}
          </p>
        )}
      </div>
    </div>
  );
}
