// components/register/SidebarHero.tsx
import { Heart, Check } from "lucide-react";

export default function SidebarHero() {
  return (
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
  );
}
