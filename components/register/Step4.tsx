// components/register/Step4.tsx
import { Controller, Control, FieldErrors } from "react-hook-form";
import { RegisterFormData, INTERESTS_OPTIONS } from "@/types/register";

interface Step4Props {
  control: Control<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watchedFields: Partial<RegisterFormData>;
  toggleInterest: (interest: string) => void;
}

export default function Step4({
  control,
  errors,
  watchedFields,
  toggleInterest,
}: Step4Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Choose your membership
      </h3>

      <Controller
        name="membershipType"
        control={control}
        render={({ field }) => (
          <div className="space-y-4">
            <label className="relative block">
              <input
                type="radio"
                {...field}
                value="regular"
                checked={field.value === "regular"}
                className="peer sr-only"
              />
              <div className="block p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-pink-300 transition-all peer-checked:border-pink-500 peer-checked:bg-pink-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      Regular
                    </div>
                    {/* <div className="text-sm text-gray-600">3 Months Access</div> */}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#E94057" }}
                  >
                    $1,000
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Perfect for exploring the platform
                </p>
              </div>
            </label>

            <label className="relative block">
              <input
                type="radio"
                {...field}
                value="gold"
                checked={field.value === "gold"}
                className="peer sr-only"
              />
              <div className="block p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-pink-300 transition-all peer-checked:border-pink-500 peer-checked:bg-pink-50 relative">
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xl font-bold text-gray-900">Gold</div>
                    {/* <div className="text-sm text-gray-600">6 Months Access</div> */}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#E94057" }}
                  >
                    $2,000
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Best value with extended features
                </p>
              </div>
            </label>

            <label className="relative block">
              <input
                type="radio"
                {...field}
                value="platinum"
                checked={field.value === "platinum"}
                className="peer sr-only"
              />
              <div className="block p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-pink-300 transition-all peer-checked:border-pink-500 peer-checked:bg-pink-50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      Platinum
                    </div>
                    {/* <div className="text-sm text-gray-600">
                      12 Months Access
                    </div> */}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "#E94057" }}
                  >
                    $1500
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Ultimate experience with all premium features
                </p>
              </div>
            </label>
          </div>
        )}
      />
      {errors.membershipType && (
        <p className="text-red-500 text-sm">{errors.membershipType.message}</p>
      )}

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Select your interests (choose at least 3)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INTERESTS_OPTIONS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-3 rounded-full border-2 transition-all text-sm font-medium ${
                (watchedFields.interests || []).includes(interest)
                  ? "border-pink-600 text-white bg-pink-600"
                  : "border-gray-300 text-gray-700 hover:border-pink-300"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        {errors.interests && (
          <p className="text-red-500 text-sm mt-2">
            {errors.interests.message}
          </p>
        )}
      </div>
    </div>
  );
}
