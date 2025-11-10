"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, AlertCircle, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

// API Configuration
const API_BASE_URL = BACKEND_URL;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setApiError("");
    setIsPendingApproval(false);

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Login successful - user is approved
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        router.push("/home");
      } else if (response.status === 403) {
        // User exists but not approved
        setIsPendingApproval(true);
        setApiError(
          result.message ||
            "Your account is pending approval. Please wait for admin approval."
        );
      } else if (response.status === 400) {
        // Validation errors or invalid credentials
        if (result.email) {
          setApiError(result.email[0]);
        } else if (result.password) {
          setApiError(result.password[0]);
        } else if (result.non_field_errors) {
          setApiError(result.non_field_errors[0]);
        } else {
          setApiError("Invalid email or password. Please try again.");
        }
      } else {
        setApiError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        "Unable to connect to the server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
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
              Welcome Back to EliteSugar
            </h1>
            <p className="text-xl text-white/90">
              Your perfect match is waiting for you
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md w-full">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop"
                alt="EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 mt-8">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop"
                alt=" EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 -mt-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
                alt=" EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 mt-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
                alt=" EliteSugar member"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          <div className="mt-12 flex gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-90">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">94%</div>
              <div className="text-sm opacity-90">Match Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-90">Members</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#E94057" }}
            >
              EliteSugar
            </h1>
            <p className="text-gray-600">Welcome back</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to continue</p>
          </div>

          {/* Error Message */}
          {apiError && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                isPendingApproval
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isPendingApproval ? "text-yellow-600" : "text-red-600"
                }`}
              />
              <div>
                <h4
                  className={`font-semibold ${
                    isPendingApproval ? "text-yellow-800" : "text-red-800"
                  }`}
                >
                  {isPendingApproval
                    ? "Account Pending Approval"
                    : "Login Failed"}
                </h4>
                <p
                  className={`text-sm ${
                    isPendingApproval ? "text-yellow-700" : "text-red-700"
                  }`}
                >
                  {apiError}
                </p>
                {isPendingApproval && (
                  <Link
                    href="/pending-approval"
                    className="text-sm font-semibold mt-2 inline-block hover:underline"
                    style={{ color: "#E94057" }}
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-2"
                  style={{ accentColor: "#E94057" }}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: "#E94057" }}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold hover:underline"
                style={{ color: "#E94057" }}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
