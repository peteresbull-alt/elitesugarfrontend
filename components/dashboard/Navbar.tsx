"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface NavbarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export default function Navbar({ showFilters, setShowFilters }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h2
            className="text-2xl font-bold text-gray-900 lg:hidden"
            style={{ color: "#E94057" }}
          >
            Élite
          </h2>
          <h2 className="hidden lg:block text-2xl font-bold text-gray-900">
            Discover Your Match
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 lg:p-3 rounded-full hover:bg-gray-100 transition-all relative"
          >
            <SlidersHorizontal className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
          </button>
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search profiles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-pink-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
              <option>Age Range</option>
              <option>25-30</option>
              <option>30-35</option>
              <option>35-40</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
              <option>Distance</option>
              <option>Within 5 miles</option>
              <option>Within 10 miles</option>
              <option>Within 25 miles</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500">
              <option>Verified Only</option>
              <option>All Users</option>
              <option>Verified</option>
            </select>
            <button
              className="px-4 py-2 text-white rounded-lg font-semibold"
              style={{ backgroundColor: "#E94057" }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
