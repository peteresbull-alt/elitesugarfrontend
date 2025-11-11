"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";
import { RegisterFormData, registerSchema } from "@/types/register";

// Components
import Step1 from "@/components/register/Step1";
import Step2 from "@/components/register/Step2";
import Step3 from "@/components/register/Step3";
import Step4 from "@/components/register/Step4";
import Step5 from "@/components/register/Step5";
import ProgressBar from "@/components/register/ProgressBar";
import AlertMessage from "@/components/register/AlertMessage";
import NavigationButtons from "@/components/register/NavigationButtons";
import SidebarHero from "@/components/register/SidebarHero";

const API_BASE_URL = BACKEND_URL;

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [apiError, setApiError] = useState<string>("");
  const [apiSuccess, setApiSuccess] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
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
      setIsUploading(true);

      // Upload photos to Cloudinary first
      const photoUrls = await uploadMultipleToCloudinary(
        photoFiles,
        "user_photos",
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setUploadProgress(100);
      setIsUploading(false);

      // Prepare data for backend
      const payload = {
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth,
        place_of_birth: data.placeOfBirth,
        nationality: data.nationality,
        city_country: data.cityCountry,
        gender: data.gender,
        full_address: data.fullAddress,
        phone_number: data.phoneNumber,
        membership_type: data.membershipType,
        interests: data.interests,
        photo_urls: photoUrls, // Send Cloudinary URLs
      };

      // Make API request with JSON
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(result.user));

        // Show success message
        setApiSuccess(result.message || "Registration successful!");

        // Redirect based on approval status
        setTimeout(() => {
          if (result.is_approved) {
            router.push("/dashboard");
          } else {
            router.push("/pending-approval");
          }
        }, 2000);
      } else {
        // Handle validation errors
        if (result.email) {
          setApiError(result.email[0]);
        } else if (result.confirm_password) {
          setApiError(result.confirm_password[0]);
        } else if (result.password) {
          setApiError(
            Array.isArray(result.password)
              ? result.password[0]
              : result.password
          );
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
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            register={register}
            errors={errors}
            watchedFields={watchedFields}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 2:
        return (
          <Step2
            register={register}
            errors={errors}
            watchedFields={watchedFields}
          />
        );
      case 3:
        return (
          <Step3
            register={register}
            errors={errors}
            watchedFields={watchedFields}
          />
        );
      case 4:
        return (
          <Step4
            control={control}
            errors={errors}
            watchedFields={watchedFields}
            toggleInterest={toggleInterest}
          />
        );
      case 5:
        return (
          <Step5
            photoFiles={photoFiles}
            handlePhotoUpload={handlePhotoUpload}
            removePhoto={removePhoto}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <SidebarHero />

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

          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {/* Show upload progress */}
          {isUploading && uploadProgress > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">
                Uploading photos... {Math.round(uploadProgress)}%
              </p>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {apiError && <AlertMessage type="error" message={apiError} />}

          {/* Success Message */}
          {apiSuccess && <AlertMessage type="success" message={apiSuccess} />}

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}

            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              isSubmitting={isSubmitting}
              isUploading={isUploading}
              photoFilesLength={photoFiles.length}
              onPrevStep={prevStep}
              onNextStep={nextStep}
            />
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
