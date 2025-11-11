// types/register.ts
import { z } from "zod";

export const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const step2Schema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  placeOfBirth: z.string().min(2, "Place of birth is required"),
  nationality: z.string().min(2, "Nationality is required"),
  cityCountry: z.string().min(2, "City/Country is required"),
});

export const step3Schema = z.object({
  gender: z.enum(["male", "female", "other"], {
    error: "Please select a gender",
  }),
  fullAddress: z.string().min(10, "Please enter a complete address"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

export const step4Schema = z.object({
  membershipType: z.enum(["regular", "gold", "platinum"], {
    error: "Please select a membership type",
  }),
  interests: z.array(z.string()).min(3, "Please select at least 3 interests"),
});

export const step5Schema = z.object({
  photos: z
    .any()
    .refine((files) => files?.length >= 2, "Please upload at least 2 photos"),
});

export const registerSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

export type RegisterFormData = z.infer<typeof registerSchema>;

export const INTERESTS_OPTIONS = [
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
