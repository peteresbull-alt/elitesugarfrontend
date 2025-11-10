"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Crown,
  Star,
  Shield,
  X,
  MessageCircle,
  Instagram,
  Twitter,
  Send,
  Phone,
  ExternalLink,
  Clock,
  CheckCircle,
  Eye,
  Heart,
  Users,
  Mail,
  Trash2,
  Check,
  RefreshCw,
  Filter,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";

// API Configuration
const API_BASE_URL = BACKEND_URL; // Replace with your actual API URL

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  membership_type: "regular" | "gold" | "platinum";
  verified: boolean;
  profile_views: number;
  matches_count: number;
  favorites_count: number;
  profile_picture: string | null;
}

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  age: number;
  occupation: string;
  location: string;
  verified: boolean;
  profile_picture: string | null;
  membership_type: "regular" | "gold" | "platinum";
}

interface Notification {
  id: number;
  person: Person;
  notification_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  time_ago: string;
}

interface NotificationStats {
  total_notifications: number;
  unread_notifications: number;
  read_notifications: number;
  by_type: Array<{ notification_type: string; count: number }>;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notificationStats, setNotificationStats] =
    useState<NotificationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "unread" | "read">(
    "all"
  );
  const [refreshing, setRefreshing] = useState(false);

  // Get token from localStorage (adjust based on your auth implementation)
  const getAuthToken = () => {
    return localStorage.getItem("authToken") || "";
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/`, {
        headers: {
          Authorization: `Token ${getAuthToken()}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType === "unread") params.append("is_read", "false");
      if (filterType === "read") params.append("is_read", "true");
      params.append("limit", "50");

      const response = await fetch(
        `${API_BASE_URL}/notifications/?${params.toString()}`,
        {
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch Notification Stats
  const fetchNotificationStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/stats/`, {
        headers: {
          Authorization: `Token ${getAuthToken()}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotificationStats(data);
      }
    } catch (error) {
      console.error("Error fetching notification stats:", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/${notificationId}/mark-read/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, is_read: true } : n
          )
        );
        fetchNotificationStats();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/mark-all-read/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        fetchNotifications();
        fetchNotificationStats();
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/${notificationId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        fetchNotificationStats();
        if (selectedNotification?.id === notificationId) {
          setSelectedNotification(null);
        }
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Delete all read notifications
  const deleteAllRead = async () => {
    if (!confirm("Are you sure you want to delete all read notifications?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/delete-all-read/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${getAuthToken()}`,
          },
        }
      );

      if (response.ok) {
        fetchNotifications();
        fetchNotificationStats();
      }
    } catch (error) {
      console.error("Error deleting read notifications:", error);
    }
  };

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }
  };

  // Refresh all data
  const refreshData = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchNotifications(),
      fetchNotificationStats(),
      fetchUserProfile(),
    ]);
    setRefreshing(false);
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchNotifications(),
        fetchNotificationStats(),
        fetchUserProfile(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Reload when filter changes
  useEffect(() => {
    fetchNotifications();
  }, [filterType]);

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "platinum":
        return { color: "#E94057", label: "Platinum", icon: Crown };
      case "gold":
        return { color: "#FFD700", label: "Gold", icon: Star };
      default:
        return { color: "#94A3B8", label: "Regular", icon: Shield };
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "profile_view":
        return Eye;
      case "like":
        return Heart;
      case "match":
        return Users;
      case "message":
        return Mail;
      case "connection_request":
        return MessageCircle;
      default:
        return Bell;
    }
  };

  const handleSocialMediaClick = (platform: string, handle: string) => {
    if (!handle) return;
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/${handle.replace(/[^0-9]/g, "")}`;
        break;
      case "instagram":
        url = `https://instagram.com/${handle.replace("@", "")}`;
        break;
      case "twitter":
        url = `https://twitter.com/${handle.replace("@", "")}`;
        break;
      case "telegram":
        url = `https://t.me/${handle.replace("@", "")}`;
        break;
    }
    if (url) window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-600 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
        <p className="text-gray-600">Stay updated with your connections</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {notificationStats?.unread_notifications || 0}
          </div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {notificationStats?.total_notifications || 0}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {userProfile?.profile_views || 0}
          </div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {userProfile?.matches_count || 0}
          </div>
          <div className="text-sm text-gray-600">Matches</div>
        </div>
      </div>

      {/* User Membership Card */}
      {userProfile && (
        <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const badge = getMembershipBadge(userProfile.membership_type);
                const Icon = badge.icon;
                return (
                  <>
                    <Icon className="w-6 h-6" style={{ color: badge.color }} />
                    <div>
                      <div className="font-bold text-gray-900">
                        {userProfile.full_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {badge.label} Member
                        {userProfile.verified && " • Verified"}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "all"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("unread")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "unread"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilterType("read")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "read"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Read
              </button>
            </div>

            <div className="flex items-center gap-2">
              {notificationStats &&
                notificationStats.unread_notifications > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Mark All Read
                  </button>
                )}
              {notificationStats &&
                notificationStats.read_notifications > 0 && (
                  <button
                    onClick={deleteAllRead}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Read
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-600">
                {filterType === "unread"
                  ? "You're all caught up!"
                  : filterType === "read"
                  ? "No read notifications"
                  : "Check back later for updates"}
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const NotifIcon = getNotificationIcon(
                notification.notification_type
              );
              const badge = getMembershipBadge(
                notification.person.membership_type
              );
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 hover:bg-gray-50 transition-all cursor-pointer ${
                    !notification.is_read ? "bg-pink-50/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Profile Picture */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          notification.person.profile_picture ||
                          `https://ui-avatars.com/api/?name=${notification.person.full_name}&size=200`
                        }
                        alt={notification.person.full_name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                        style={{ backgroundColor: badge.color }}
                      >
                        <NotifIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {notification.person.full_name}
                        </h3>
                        {notification.person.verified && (
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "#E94057" }}
                            fill="#E94057"
                          />
                        )}
                        <BadgeIcon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: badge.color }}
                        />
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time_ago}</span>
                        {notification.person.occupation && (
                          <>
                            <span>•</span>
                            <span>{notification.person.occupation}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      {!notification.is_read && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: "#E94057" }}
                        ></div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Person Detail Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNotification(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Person Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={
                    selectedNotification.person.profile_picture ||
                    `https://ui-avatars.com/api/?name=${selectedNotification.person.full_name}&size=200`
                  }
                  alt={selectedNotification.person.full_name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-pink-100"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedNotification.person.full_name}
                </h2>
                {selectedNotification.person.verified && (
                  <CheckCircle
                    className="w-6 h-6"
                    style={{ color: "#E94057" }}
                    fill="#E94057"
                  />
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                {(() => {
                  const badge = getMembershipBadge(
                    selectedNotification.person.membership_type
                  );
                  const BadgeIcon = badge.icon;
                  return (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50">
                      <BadgeIcon
                        className="w-5 h-5"
                        style={{ color: badge.color }}
                      />
                      <span
                        className="font-semibold text-sm"
                        style={{ color: badge.color }}
                      >
                        {badge.label} Member
                      </span>
                    </div>
                  );
                })()}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                {selectedNotification.person.age && (
                  <p>{selectedNotification.person.age} years old</p>
                )}
                {selectedNotification.person.occupation && (
                  <p>{selectedNotification.person.occupation}</p>
                )}
                {selectedNotification.person.location && (
                  <p>{selectedNotification.person.location}</p>
                )}
              </div>
            </div>

            {/* Notification Message */}
            <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {selectedNotification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedNotification.time_ago}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                // Navigate to person's profile or open chat
                window.location.href = `/people/${selectedNotification.person.id}`;
              }}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
            >
              View Full Profile
            </button>

            {/* Info Message */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Visit their full profile to see more details and connect
                  through social media.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
