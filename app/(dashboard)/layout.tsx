"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import BottomTabNavigation from "@/components/dashboard/BottomTabNavigation";
import ProtectedRoute from "@/components/major/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [showFilters, setShowFilters] = useState(false);

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar showFilters={showFilters} setShowFilters={setShowFilters} />

          {/* Content Area - Scrollable */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomTabNavigation />
      </div>
    </ProtectedRoute>
  );
}
