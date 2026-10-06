"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaGift,
  FaMountain,
  FaShareAlt,
  FaTrophy,
  FaNewspaper,
  FaCommentDots,
  FaHandshake,
  FaShieldAlt,
  FaHeadphones,
  FaGlobe,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { triggerDemoNotice } from "./DemoNoticeModal";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenChat?: () => void;
  onOpenDemoNotice?: () => void;
  isMobile?: boolean;
}

const menuItems = [
  {
    label: "Promotions",
    icon: FaGift,
    dropdown: true,
  },
  {
    label: "Challenges",
    icon: FaMountain,
  },
  {
    label: "Affiliate",
    icon: FaShareAlt,
  },
  {
    label: "VIP Club",
    icon: FaTrophy,
  },
  {
    label: "Blog",
    icon: FaNewspaper,
  },
  {
    label: "Forum",
    icon: FaCommentDots,
  },
];

const bottomItems = [
  {
    label: "Sponsorships",
    icon: FaHandshake,
    dropdown: true,
  },
  {
    label: "Responsible Gambling",
    icon: FaShieldAlt,
  },
  {
    label: "Live Support (1234567890)",
    icon: FaHeadphones,
  },
  {
    label: "Language: English",
    icon: FaGlobe,
    dropdown: true,
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onClose,
  collapsed: propCollapsed,
  onToggleCollapse,
  onOpenChat,
  onOpenDemoNotice,
  isMobile = false,
}) => {
  const [localCollapsed, setLocalCollapsed] = useState(true);
  const rawCollapsed = propCollapsed !== undefined ? propCollapsed : localCollapsed;
  // On mobile screens, the navigation drawer is ALWAYS fully expanded (never collapsed)
  const isCollapsed = isMobile ? false : rawCollapsed;

  const handleToggle = () => {
    if (isMobile) {
      onClose();
    } else {
      if (onToggleCollapse) onToggleCollapse();
      else setLocalCollapsed(!localCollapsed);
    }
  };

  const [promotionOpen, setPromotionOpen] = useState(false);
  const [sponsorshipOpen, setSponsorshipOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const openWhatsApp = () => {
    if (onOpenDemoNotice) {
      onOpenDemoNotice();
    } else {
      triggerDemoNotice();
    }
    if (isMobile) {
      onClose();
    }
  };

  const handleMenuClick = (label: string) => {
    if (label === "Promotions") {
      setPromotionOpen((prev) => !prev);
      return;
    }

    if (label === "Sponsorships") {
      setSponsorshipOpen((prev) => !prev);
      return;
    }

    if (label === "Language: English") {
      setLanguageOpen((prev) => !prev);
      return;
    }

    openWhatsApp();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity duration-300 md:hidden animate-in fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          bg-[#0f212e]
          border-r border-[#213743]
          text-white
          overflow-y-auto
          overflow-x-hidden
          scrollbar-hide
          ${
            isMobile
              ? `w-[280px] max-w-[85vw] transition-transform duration-300 ease-out ${
                  mobileOpen
                    ? "translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    : "-translate-x-full pointer-events-none"
                }`
              : `transition-[width] duration-300 ease-in-out md:translate-x-0 ${
                  isCollapsed ? "w-[78px]" : "w-[264px]"
                }`
          }
        `}
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between">
          <div>
            {/* ================= TOP BAR ================= */}
            <div
              className={`
                flex
                items-center
                gap-3
                mb-5
                ${isMobile ? "justify-between" : isCollapsed ? "justify-center" : "justify-between"}
              `}
            >
              {/* Desktop Toggle or Mobile Close Button */}
              {isMobile ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="relative h-7 w-7 shrink-0">
                      <Image
                        src="/img/logo.webp"
                        alt="Logo"
                        fill
                        sizes="28px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-black tracking-wider text-white uppercase">
                      NON STOP
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      cursor-pointer
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-[#b1bad3]
                      hover:bg-[#1a2c38]
                      hover:text-white
                      transition-colors
                    "
                    aria-label="Close menu"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleToggle}
                  className="
                    cursor-pointer
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-[#b1bad3]
                    transition-colors
                    hover:bg-[#1a2c38]
                    hover:text-white
                  "
                  aria-label="Toggle sidebar"
                >
                  <FaBars size={18} />
                </button>
              )}

              {/* Casino / Sports Switcher (Desktop expanded only) */}
              {!isMobile && !isCollapsed && (
                <div className="flex items-center gap-2 bg-[#0f212e] p-1 rounded-lg border border-[#213743]">
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="
                      rounded-md
                      bg-[#213743]
                      px-3.5
                      py-1.5
                      text-xs
                      font-bold
                      text-white
                      transition
                      hover:bg-[#2b4859]
                      cursor-pointer
                    "
                  >
                    🎰 Casino
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="
                      rounded-md
                      bg-[#1475e1]
                      px-3.5
                      py-1.5
                      text-xs
                      font-bold
                      text-white
                      transition
                      hover:bg-[#1d82f5]
                      cursor-pointer
                    "
                  >
                    ⚽ Sports
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Mode Switcher Banner */}
            {isMobile && (
              <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-xl bg-[#14242f] border border-[#213743]">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="
                    rounded-lg
                    bg-[#213743]
                    py-2
                    text-xs
                    font-bold
                    text-white
                    text-center
                    transition
                    hover:bg-[#2b4859]
                    cursor-pointer
                  "
                >
                  🎰 Casino
                </button>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="
                    rounded-lg
                    bg-[#1475e1]
                    py-2
                    text-xs
                    font-bold
                    text-white
                    text-center
                    transition
                    hover:bg-[#1d82f5]
                    cursor-pointer
                  "
                >
                  ⚽ Sports
                </button>
              </div>
            )}

            {/* ================= MENU BOX ================= */}
            <div
              className={`
                rounded-xl
                bg-[#1a2c38]
                border border-[#213743]
                py-2
                ${isCollapsed ? "md:bg-transparent md:border-transparent" : ""}
              `}
            >
              {/* MAIN MENU */}
              <div className="space-y-0.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleMenuClick(item.label)}
                        className={`
                          cursor-pointer
                          group
                          flex
                          w-full
                          items-center
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-xs sm:text-sm
                          font-semibold
                          text-[#b1bad3]
                          transition-colors
                          hover:bg-[#213743]
                          hover:text-white
                          ${isCollapsed ? "justify-center px-0" : ""}
                        `}
                      >
                        <Icon
                          className="
                            shrink-0
                            text-[#b1bad3]
                            transition-colors
                            group-hover:text-white
                          "
                          size={17}
                        />

                        {!isCollapsed && (
                          <>
                            <span className="ml-3 flex-1 text-xs sm:text-sm font-semibold">
                              {item.label}
                            </span>

                            {item.dropdown && (
                              <FaChevronDown
                                size={11}
                                className={`
                                  text-[#557086]
                                  transition-transform duration-200
                                  ${
                                    item.label === "Promotions" && promotionOpen
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            )}
                          </>
                        )}
                      </button>

                      {/* Promotions Dropdown */}
                      {item.label === "Promotions" &&
                        promotionOpen &&
                        !isCollapsed && (
                          <div className="ml-9 my-1 space-y-1">
                            <button
                              type="button"
                              onClick={openWhatsApp}
                              className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer transition-colors"
                            >
                              Latest Promotions
                            </button>

                            <button
                              type="button"
                              onClick={openWhatsApp}
                              className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer transition-colors"
                            >
                              Bonus Offers
                            </button>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* ================= DIVIDER ================= */}
              {!isCollapsed && (
                <div className="mx-3 my-2 border-t border-[#213743]" />
              )}

              {/* ================= BOTTOM MENU ================= */}
              <div className="space-y-0.5">
                {bottomItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleMenuClick(item.label)}
                        className={`
                          cursor-pointer
                          group
                          flex
                          w-full
                          items-center
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-xs sm:text-sm
                          font-semibold
                          text-[#b1bad3]
                          transition-colors
                          hover:bg-[#213743]
                          hover:text-white
                          ${isCollapsed ? "justify-center px-0" : ""}
                        `}
                      >
                        <Icon
                          size={17}
                          className="
                            shrink-0
                            text-[#b1bad3]
                            transition-colors
                            group-hover:text-white
                          "
                        />

                        {!isCollapsed && (
                          <>
                            <span className="ml-3 flex-1 text-xs sm:text-sm font-semibold truncate">
                              {item.label}
                            </span>

                            {item.dropdown && (
                              <FaChevronDown
                                size={11}
                                className={`
                                  text-[#557086]
                                  transition-transform duration-200
                                  ${
                                    item.label === "Sponsorships" && sponsorshipOpen
                                      ? "rotate-180"
                                      : ""
                                  }
                                  ${
                                    item.label === "Language: English" && languageOpen
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            )}
                          </>
                        )}
                      </button>

                      {/* Sponsorship Dropdown */}
                      {item.label === "Sponsorships" &&
                        sponsorshipOpen &&
                        !isCollapsed && (
                          <div className="ml-9 my-1">
                            <button
                              type="button"
                              onClick={openWhatsApp}
                              className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer transition-colors"
                            >
                              Our Partners
                            </button>
                          </div>
                        )}

                      {/* Language Dropdown */}
                      {item.label === "Language: English" &&
                        languageOpen &&
                        !isCollapsed && (
                          <div className="ml-9 my-1 space-y-1">
                            <button
                              type="button"
                              onClick={openWhatsApp}
                              className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer transition-colors"
                            >
                              English
                            </button>

                            <button
                              type="button"
                              onClick={openWhatsApp}
                              className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer transition-colors"
                            >
                              Hindi
                            </button>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer note inside mobile drawer */}
          {isMobile && (
            <div className="mt-4 pt-3 border-t border-[#213743] text-center text-[11px] text-[#557086]">
              Non Stop Betting & Casino • 24/7 Support
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;