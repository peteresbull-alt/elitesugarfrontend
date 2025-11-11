// types/profile.ts

export interface UserPhoto {
  id: number;
  image: string;
  is_profile_picture: boolean;
  uploaded_at: string;
  order: number;
}

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  age: number | null;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  city_country: string;
  gender: string;
  full_address: string;
  phone_number: string;
  membership_type: "regular" | "gold" | "platinum";
  interests: string[];
  bio: string;
  occupation: string;
  education: string;
  height: string;
  location: string;
  net_worth: string;
  looking_for: string;
  relationship_goals: string[];
  is_approved: boolean;
  verified: boolean;
  date_joined: string;
  profile_views: number;
  matches_count: number;
  favorites_count: number;
  photos: UserPhoto[];
  profile_picture: string | null;
}
