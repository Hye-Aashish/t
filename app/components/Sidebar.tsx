"use client";

import React, { useState } from "react";
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
}) => {
  const [localCollapsed, setLocalCollapsed] = useState(true);
  const collapsed = propCollapsed !== undefined ? propCollapsed : localCollapsed;
  
  const handleToggle = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setLocalCollapsed(!localCollapsed);
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
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleMenuClick = (label: string) => {
    if (label === "Promotions") {
      setPromotionOpen((prev) => !prev);
    }

    if (label === "Sponsorships") {
      setSponsorshipOpen((prev) => !prev);
    }

    if (label === "Language: English") {
      setLanguageOpen((prev) => !prev);
    }

    openWhatsApp();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

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
          transition-all
          duration-300
          ease-in-out
         

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

          w-[264px]
          ${collapsed ? "md:w-[78px]" : "md:w-[264px]"}
          overflow-x-hidden
        `}
      >
        <div
          className={`
            h-full
            px-3
            py-4
            transition-all
            duration-300
            ease-in-out
            w-[264px]
            ${collapsed ? "md:w-[78px]" : "md:w-[264px]"}
          `}
        >
          {/* ================= TOP BAR ================= */}
          <div
            className={`
              flex
              items-center
              gap-3
              mb-5
              
              ${collapsed ? "md:justify-center" : "justify-start"}
            `}
          >
            {/* MENU BUTTON */}
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
                transition
                hover:bg-[#1a2c38]
                hover:text-white
              "
              aria-label="Toggle sidebar"
            >
              <FaBars size={18} />
            </button>

            {/* Casino / Sports */}
            {!collapsed && (
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

          {/* ================= MENU BOX ================= */}
          <div
            className={`
              rounded-xl
              bg-[#1a2c38]
              border border-[#213743]
              py-3
              transition-all
              duration-300
              ${collapsed ? "md:bg-transparent md:border-transparent" : ""}
            `}
          >
            {/* MAIN MENU */}
            <div className="space-y-1  shadow-[0_4px_12px_rgba(0,0,0,0.18),0_8px_20px_rgba(0,0,0,0.08)]">
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
                        transition-all
                        hover:bg-[#213743]
                        hover:text-white

                        ${collapsed ? "md:justify-center md:px-0" : ""}
                      `}
                    >
                      <Icon
                        className="
                          shrink-0
                          text-[#b1bad3]
                          transition
                          group-hover:text-white
                        "
                        size={17}
                      />

                      {!collapsed && (
                        <>
                          <span className="ml-3 flex-1">
                            {item.label}
                          </span>

                          {item.dropdown && (
                            <FaChevronDown
                              size={12}
                              className={`
                                text-[#557086]
                                transition-transform
                                ${
                                  item.label === "Promotions" &&
                                  promotionOpen
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
                      !collapsed && (
                        <div className="ml-10 mt-1 space-y-1">
                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer"
                          >
                            Latest Promotions
                          </button>

                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-[#b1bad3] hover:bg-[#213743] hover:text-white cursor-pointer"
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
            {!collapsed && (
              <div className="mx-3 my-3 border-t border-[#213743]" />
            )}

            {/* ================= BOTTOM MENU ================= */}
            <div className="space-y-1">
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
                        transition-all
                        hover:bg-[#213743]
                        hover:text-white

                        ${collapsed ? "md:justify-center md:px-0" : ""}
                      `}
                    >
                      <Icon
                        size={17}
                        className="
                          shrink-0
                          text-[#b1bad3]
                          transition
                          group-hover:text-white
                        "
                      />

                      {!collapsed && (
                        <>
                          <span className="ml-3 flex-1">
                            {item.label}
                          </span>

                          {item.dropdown && (
                            <FaChevronDown
                              size={14}
                              className={`
                                text-[#9fbacc]
                                transition-transform
                                ${
                                  item.label === "Sponsorships" &&
                                  sponsorshipOpen
                                    ? "rotate-180"
                                    : ""
                                }
                                ${
                                  item.label === "Language: English" &&
                                  languageOpen
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
                      !collapsed && (
                        <div className="ml-12 mt-1">
                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-[#a8c5d8] hover:bg-[#223e50] hover:text-white cursor-pointer"
                          >
                            Our Partners
                          </button>
                        </div>
                      )}

                    {/* Language Dropdown */}
                    {item.label === "Language: English" &&
                      languageOpen &&
                      !collapsed && (
                        <div className="ml-12 mt-1 space-y-1">
                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-[#a8c5d8] hover:bg-[#223e50] hover:text-white cursor-pointer"
                          >
                            English
                          </button>

                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="block w-full rounded-md px-3 py-2 text-left text-sm text-[#a8c5d8] hover:bg-[#223e50] hover:text-white cursor-pointer"
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
      </aside>
    </>
  );
};

export default Sidebar;