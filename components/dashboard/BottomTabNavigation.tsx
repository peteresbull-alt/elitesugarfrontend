"use client";

import { Home, Heart, MessageCircle, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BottomTabNavigation() {
  // You'll need to import these from next/navigation

  const pathname = usePathname();
  const router = useRouter();

  // For now, using a placeholder - replace with actual hooks
  //   const pathname = "/home"; // This should be: usePathname()
  const handleNavigation = (path: string) => {
    router.push(path);
    console.log("Navigate to:", path);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "explore", label: "Explore", icon: Heart, path: "/explore" },
    {
      id: "notifications",
      label: "Chat",
      icon: MessageCircle,
      path: "/notifications",
    },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 z-50 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative ${
                isActive ? "transform scale-105" : ""
              }`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="absolute -top-1 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "#E94057" }}
                ></div>
              )}
              <Icon
                className="w-6 h-6 transition-all"
                style={isActive ? { color: "#E94057" } : { color: "#6B7280" }}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className="text-xs font-medium transition-all"
                style={isActive ? { color: "#E94057" } : { color: "#6B7280" }}
              >
                {item.label}
              </span>
              {/* Notification badge for Chat */}
              
            </button>
          );
        })}
      </div>
    </nav>  
  );
}
