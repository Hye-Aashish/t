"use client";

import React, { useState } from "react";

interface MobileBottomNavProps {
  onOpenSearch: () => void;
  onOpenChat: () => void;
}

const BrowseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="5" width="8" height="2.5" rx="1.2" fill="currentColor" />
    <rect x="3" y="11" width="6" height="2.5" rx="1.2" fill="currentColor" />
    <rect x="3" y="17" width="10" height="2.5" rx="1.2" fill="currentColor" />
    <circle cx="16.5" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
    <path d="M19 10l2.5 2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const CasinoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="5" width="11" height="15" rx="2" fill="currentColor" opacity="0.6" />
    <rect x="9" y="3" width="12" height="16" rx="2.5" fill="currentColor" />
    <path d="M15 8.3c-.7-1-2.2-.3-2.2.8 0 1.4 2.2 3 2.2 3s2.2-1.6 2.2-3c0-1.1-1.5-1.8-2.2-.8z" fill="#0f212e" />
  </svg>
);

const ForYouIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4.5A2.5 2.5 0 019.5 2h5A2.5 2.5 0 0117 4.5V6H7V4.5z" opacity="0.5" />
    <rect x="4" y="6" width="16" height="15" rx="3" fill="currentColor" />
    <path d="M12 9.5c0 1.8-.7 2.5-2.5 2.5 1.8 0 2.5.7 2.5 2.5 0-1.8.7-2.5 2.5-2.5-1.8 0-2.5-.7-2.5-2.5z" fill="#0f212e" />
  </svg>
);

const SportsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="9.5" fill="currentColor" />
    <path d="M12 2.5v19M2.5 12h19" stroke="#0f212e" strokeWidth="1.8" />
    <path d="M5.5 5.5c3.2 3.2 3.2 9.8 0 13M18.5 5.5c-3.2 3.2-3.2 9.8 0 13" stroke="#0f212e" strokeWidth="1.8" fill="none" />
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 3.58-9 8 0 2.58 1.41 4.88 3.63 6.33-.24 1.1-.9 2.45-2.13 3.32 0 0 2.55.3 4.95-1.12.82.25 1.68.39 2.55.39 4.97 0 9-3.58 9-8s-4.03-8-9-8z" />
    <circle cx="8.5" cy="11" r="1.2" fill="#0f212e" />
    <circle cx="12" cy="11" r="1.2" fill="#0f212e" />
    <circle cx="15.5" cy="11" r="1.2" fill="#0f212e" />
  </svg>
);

export default function MobileBottomNav({
  onOpenSearch,
  onOpenChat,
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<string>("browse");

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    {
      id: "browse",
      label: "Browse",
      icon: BrowseIcon,
      onClick: () => {
        setActiveTab("browse");
        onOpenSearch();
      },
    },
    {
      id: "casino",
      label: "Casino",
      icon: CasinoIcon,
      onClick: () => {
        setActiveTab("casino");
        scrollToSection("casino-section");
      },
    },
    {
      id: "foryou",
      label: "For You",
      icon: ForYouIcon,
      onClick: () => {
        setActiveTab("foryou");
        scrollToSection("foryou-section");
      },
    },
    {
      id: "sports",
      label: "Sports",
      icon: SportsIcon,
      onClick: () => {
        setActiveTab("sports");
        scrollToSection("sports-section");
      },
    },
    {
      id: "chat",
      label: "Chat",
      icon: ChatIcon,
      onClick: () => {
        setActiveTab("chat");
        onOpenChat();
      },
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0f212e] border-t border-[#1a2c38] shadow-[0_-4px_20px_rgba(0,0,0,0.6)] py-1 px-2 h-[60px] flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 group ${
              isActive ? "text-white scale-105" : "text-[#94a3b8] hover:text-white"
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? "translate-y-[-1px]" : ""}`}>
              <Icon />
            </div>
            <span
              className={`text-[12px] font-semibold tracking-tight mt-0.5 transition-colors ${
                isActive ? "text-white font-bold" : "text-[#94a3b8] group-hover:text-white"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
