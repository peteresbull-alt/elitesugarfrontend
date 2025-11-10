"use client";

import { useState } from "react";
import {
  Search,
  Crown,
  Star,
  Shield,
  Lock,
  X,
  MessageCircle,
  Instagram,
  Twitter,
  Send,
  Phone,
  ExternalLink,
  Clock,
  CheckCircle,
} from "lucide-react";

interface ChatUser {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  membershipTier: "regular" | "gold" | "platinum";
  verified: boolean;
  socialMedia: {
    whatsapp?: string;
    instagram?: string;
    twitter?: string;
    telegram?: string;
  };
}

// Simulating current user membership
const CURRENT_USER_MEMBERSHIP: "regular" | "gold" | "platinum" = "regular";

const CHAT_USERS: ChatUser[] = [
  {
    id: 1,
    name: "Sophia Anderson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    lastMessage: "That sounds amazing! I'd love to...",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    membershipTier: "platinum",
    verified: true,
    socialMedia: {
      whatsapp: "+1234567890",
      instagram: "@sophia.anderson",
      twitter: "@sophiaanderson",
      telegram: "@sophiaanderson",
    },
  },
  {
    id: 2,
    name: "Isabella Martinez",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    lastMessage: "Looking forward to our date!",
    timestamp: "15m ago",
    unreadCount: 0,
    isOnline: true,
    membershipTier: "gold",
    verified: true,
    socialMedia: {
      whatsapp: "+1234567891",
      instagram: "@isabella.martinez",
      twitter: "@isabellamartinez",
    },
  },
  {
    id: 3,
    name: "Emma Thompson",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    lastMessage: "Thanks for the recommendation!",
    timestamp: "1h ago",
    unreadCount: 1,
    isOnline: false,
    membershipTier: "regular",
    verified: false,
    socialMedia: {
      whatsapp: "+1234567892",
      instagram: "@emmathompson",
      telegram: "@emmathompson",
    },
  },
  {
    id: 4,
    name: "Olivia Chen",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    lastMessage: "Let's meet up this weekend?",
    timestamp: "3h ago",
    unreadCount: 0,
    isOnline: true,
    membershipTier: "platinum",
    verified: true,
    socialMedia: {
      whatsapp: "+1234567893",
      instagram: "@oliviachen",
      twitter: "@oliviachen",
      telegram: "@oliviachen",
    },
  },
  {
    id: 5,
    name: "Ava Williams",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    lastMessage: "That restaurant was incredible!",
    timestamp: "5h ago",
    unreadCount: 0,
    isOnline: false,
    membershipTier: "regular",
    verified: true,
    socialMedia: {
      whatsapp: "+1234567894",
      instagram: "@avawilliams",
    },
  },
  {
    id: 6,
    name: "Charlotte Davis",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    lastMessage: "You and Charlotte Davis have similar interests in common",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: true,
    membershipTier: "gold",
    verified: true,
    socialMedia: {
      whatsapp: "+1234567895",
      instagram: "@charlottedavis",
      twitter: "@charlottedavis",
      telegram: "@charlottedavis",
    },
  },
  {
    id: 7,
    name: "Amelia Taylor",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
    lastMessage: "You can now chat with Amelia Taylor",
    timestamp: "2d ago",
    unreadCount: 3,
    isOnline: false,
    membershipTier: "regular",
    verified: false,
    socialMedia: {
      instagram: "@ameliataylor",
      telegram: "@ameliataylor",
    },
  },
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const canAccessChat = (userTier: string) => {
    const tierHierarchy = { regular: 1, gold: 2, platinum: 3 };
    return (
      tierHierarchy[CURRENT_USER_MEMBERSHIP as keyof typeof tierHierarchy] >=
      tierHierarchy[userTier as keyof typeof tierHierarchy]
    );
  };

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

  const filteredChats = CHAT_USERS.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSocialMediaClick = (platform: string, handle: string) => {
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
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">
          Connect with your matches through social media
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {CHAT_USERS.filter((u) => u.unreadCount > 0).length}
          </div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {CHAT_USERS.filter((u) => u.isOnline).length}
          </div>
          <div className="text-sm text-gray-600">Online Now</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {CHAT_USERS.length}
          </div>
          <div className="text-sm text-gray-600">Total Chats</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold" style={{ color: "#E94057" }}>
            {CHAT_USERS.filter((u) => u.verified).length}
          </div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
      </div>

      {/* Current Membership Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(() => {
              const badge = getMembershipBadge(CURRENT_USER_MEMBERSHIP);
              const Icon = badge.icon;
              return (
                <>
                  <Icon className="w-6 h-6" style={{ color: badge.color }} />
                  <div>
                    <div className="font-bold text-gray-900">
                      Your Membership: {badge.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {CURRENT_USER_MEMBERSHIP === "regular" &&
                        "Upgrade to chat with premium members"}
                      {CURRENT_USER_MEMBERSHIP === "gold" &&
                        "Access to Gold and Regular members"}
                      {CURRENT_USER_MEMBERSHIP === "platinum" &&
                        "Full access to all members"}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          {CURRENT_USER_MEMBERSHIP !== "platinum" && (
            <button
              className="px-4 py-2 text-white rounded-lg font-semibold text-sm"
              style={{ backgroundColor: "#E94057" }}
            >
              Upgrade
            </button>
          )}
        </div>
      </div>

      {/* Chat List Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="divide-y divide-gray-100">
          {filteredChats.map((user) => {
            const isLocked = !canAccessChat(user.membershipTier);
            const badge = getMembershipBadge(user.membershipTier);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={user.id}
                onClick={() => !isLocked && setSelectedUser(user)}
                className={`p-4 hover:bg-gray-50 transition-all cursor-pointer relative ${
                  isLocked ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Profile Picture with Online Status */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.image}
                      alt={user.name}
                      className={`w-14 h-14 rounded-full object-cover ${
                        isLocked ? "blur-sm" : ""
                      }`}
                    />
                    {user.isOnline && !isLocked && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Chat Content */}
                  <div
                    className={`flex-1 min-w-0 ${isLocked ? "blur-sm" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      {user.verified && (
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
                    <p className="text-sm text-gray-600 truncate">
                      {user.lastMessage}
                    </p>
                  </div>

                  {/* Time and Badge */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500">
                      {user.timestamp}
                    </span>
                    {user.unreadCount > 0 && !isLocked && (
                      <span
                        className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
                        style={{ backgroundColor: "#E94057" }}
                      >
                        {user.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lock Overlay Message */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="text-center px-4">
                      <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-700">
                        {badge.label} Member
                      </p>
                      <p className="text-xs text-gray-500">
                        Upgrade to connect
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredChats.length === 0 && (
          <div className="p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No conversations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or start a new conversation
            </p>
          </div>
        )}
      </div>

      {/* Social Media Connect Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* User Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-pink-100"
                />
                {selectedUser.isOnline && (
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-3 border-white"></div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedUser.name}
                </h2>
                {selectedUser.verified && (
                  <CheckCircle
                    className="w-6 h-6"
                    style={{ color: "#E94057" }}
                    fill="#E94057"
                  />
                )}
              </div>
              <div className="flex items-center justify-center gap-2">
                {(() => {
                  const badge = getMembershipBadge(selectedUser.membershipTier);
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
            </div>

            {/* Social Media Options */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Connect via Social Media
              </h3>
              <div className="space-y-3">
                {selectedUser.socialMedia.whatsapp && (
                  <button
                    onClick={() =>
                      handleSocialMediaClick(
                        "whatsapp",
                        selectedUser.socialMedia.whatsapp!
                      )
                    }
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-all">
                      <Phone className="w-6 h-6 text-green-600 group-hover:text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        WhatsApp
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedUser.socialMedia.whatsapp}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                  </button>
                )}

                {selectedUser.socialMedia.instagram && (
                  <button
                    onClick={() =>
                      handleSocialMediaClick(
                        "instagram",
                        selectedUser.socialMedia.instagram!
                      )
                    }
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-500 hover:bg-pink-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                      <Instagram className="w-6 h-6 text-pink-600 group-hover:text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        Instagram
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedUser.socialMedia.instagram}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-pink-600" />
                  </button>
                )}

                {selectedUser.socialMedia.twitter && (
                  <button
                    onClick={() =>
                      handleSocialMediaClick(
                        "twitter",
                        selectedUser.socialMedia.twitter!
                      )
                    }
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-all">
                      <Twitter className="w-6 h-6 text-blue-600 group-hover:text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Twitter</div>
                      <div className="text-sm text-gray-600">
                        {selectedUser.socialMedia.twitter}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                )}

                {selectedUser.socialMedia.telegram && (
                  <button
                    onClick={() =>
                      handleSocialMediaClick(
                        "telegram",
                        selectedUser.socialMedia.telegram!
                      )
                    }
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-400 transition-all">
                      <Send className="w-6 h-6 text-blue-500 group-hover:text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">
                        Telegram
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedUser.socialMedia.telegram}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Info Message */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Connect with {selectedUser.name} through your preferred social
                  media platform to continue your conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
