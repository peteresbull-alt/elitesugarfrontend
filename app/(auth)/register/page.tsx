"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Heart,
  Check,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const step2Schema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().min(2, "Place of birth is required"),
  nationality: z.string().min(2, "Nationality is required"),
  cityCountry: z.string().min(2, "City/Country is required"),
});

const step3Schema = z.object({
  gender: z.enum(["male", "female", "other"], {
    error: "Please select a gender",
  }),
  fullAddress: z.string().min(10, "Please enter a complete address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

const step4Schema = z.object({
  membershipType: z.enum(["regular", "gold", "platinum"], {
    error: "Please select a membership type",
  }),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests"),
});

const step5Schema = z.object({
  photos: z
    .any()
    .refine((files) => files?.length >= 2, "Please upload at least 2 photos"),
});

const registerSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

type RegisterFormData = z.infer<typeof registerSchema>;

const INTERESTS_OPTIONS = [
  "Travel",
  "Wine & Dining",
  "Fitness",
  "Reading",
  "Art",
  "Music",
  "Theater",
  "Golf",
  "Tennis",
  "Yoga",
  "Cooking",
  "Photography",
  "Fashion",
  "Technology",
  "Hiking",
  "Sailing",
  "Dancing",
  "Volunteering",
];

// API Configuration
const API_BASE_URL = BACKEND_URL;

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const [apiSuccess, setApiSuccess] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      cityCountry: "",
      gender: undefined,
      fullAddress: "",
      phoneNumber: "",
      membershipType: undefined,
      interests: [],
      photos: [],
    },
    mode: "onChange",
  });

  const watchedFields = watch();
  const totalSteps = 5;

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = [
          "firstName",
          "lastName",
          "email",
          "password",
          "confirmPassword",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "dateOfBirth",
          "placeOfBirth",
          "nationality",
          "cityCountry",
        ];
        break;
      case 3:
        fieldsToValidate = ["gender", "fullAddress", "phoneNumber"];
        break;
      case 4:
        fieldsToValidate = ["membershipType", "interests"];
        break;
      case 5:
        fieldsToValidate = ["photos"];
        break;
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setApiError("");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setApiError("");
    }
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = watchedFields.interests || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];

    setValue("interests", newInterests, { shouldValidate: true });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      const updatedPhotos = [...photoFiles, ...newPhotos].slice(0, 6);
      setPhotoFiles(updatedPhotos);
      setValue("photos", updatedPhotos, { shouldValidate: true });
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photoFiles.filter((_, i) => i !== index);
    setPhotoFiles(updatedPhotos);
    setValue("photos", updatedPhotos, { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError("");
      setApiSuccess("");

      // Create FormData for multipart/form-data request
      const formData = new FormData();

      // Map frontend field names to backend field names
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirmPassword);
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("date_of_birth", data.dateOfBirth);
      formData.append("place_of_birth", data.placeOfBirth);
      formData.append("nationality", data.nationality);
      formData.append("city_country", data.cityCountry);
      formData.append("gender", data.gender);
      formData.append("full_address", data.fullAddress);
      formData.append("phone_number", data.phoneNumber);
      formData.append("membership_type", data.membershipType);
      formData.append("interests", JSON.stringify(data.interests));

      // Append photos
      photoFiles.forEach((photo) => {
        formData.append("photos", photo);
      });

      // Make API request
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Show success message
        setApiSuccess(result.message || "Registration successful!");

        // Redirect based on approval status
        setTimeout(() => {
          if (result.is_approved) {
            router.push("/dashboard");
          } else {
            // Show approval pending page/message
            router.push("/pending-approval");
          }
        }, 2000);
      } else {
        // Handle validation errors
        if (result.email) {
          setApiError(result.email[0]);
        } else if (result.confirm_password) {
          setApiError(result.confirm_password[0]);
        } else if (result.error) {
          setApiError(result.error);
        } else {
          setApiError("Registration failed. Please check your information.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
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
                style={
                  watchedFields.confirmPassword ? { color: "#E94057" } : {}
                }
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

      case 2:
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

      case 3:
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
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

      case 4:
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
                          <div className="text-sm text-gray-600">
                            3 Months Access
                          </div>
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: "#E94057" }}
                        >
                          $49
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
                          <div className="text-xl font-bold text-gray-900">
                            Gold
                          </div>
                          <div className="text-sm text-gray-600">
                            6 Months Access
                          </div>
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: "#E94057" }}
                        >
                          $89
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
                          <div className="text-sm text-gray-600">
                            12 Months Access
                          </div>
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: "#E94057" }}
                        >
                          $149
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
              <p className="text-red-500 text-sm">
                {errors.membershipType.message}
              </p>
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

      case 5:
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: "#E94057" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-rose-600/20"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Join EliteSugar Today
            </h1>
            <p className="text-xl text-white/90">
              Where successful women find lasting love
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md w-full">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop"
                alt="EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mt-8">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop"
                alt="EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl -mt-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
                alt="EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl mt-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
                alt="EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          <div className="mt-12 flex gap-8 text-white">
            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-90">Find Love</div>
            </div>
            <div className="text-center">
              <Check className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-90">Verified</div>
            </div>
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div className="text-sm opacity-90">Secure</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="lg:hidden text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#E94057" }}
            >
              EliteSugar
            </h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${(currentStep / totalSteps) * 100}%`,
                  backgroundColor: "#E94057",
                }}
              ></div>
            </div>
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {apiSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">Success!</h4>
                <p className="text-sm text-green-700">{apiSuccess}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}

            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="flex-1 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#E94057" }}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || photoFiles.length < 2}
                  className="flex-1 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#E94057" }}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: "#E94057" }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
