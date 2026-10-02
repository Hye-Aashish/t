"use client";

import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
  FaRegNewspaper,
  FaChevronDown,
} from "react-icons/fa6";

import { BsChatDotsFill } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";

type FooterColumn = {
  title: string;
  links: {
    label: string;
    external?: boolean;
  }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Casino",
    links: [
      { label: "Casino Games" },
      { label: "Slots" },
      { label: "Live Casino" },
      { label: "Roulette" },
      { label: "Blackjack" },
      { label: "Poker" },
      { label: "Publishers" },
      { label: "Promos & Competitions" },
      { label: "Non stop betting and casino Engine", external: true },
      { label: "Non stop betting and casino Vendors", external: true },
    ],
  },
  {
    title: "Sports",
    links: [
      { label: "Sportsbook" },
      { label: "Live Sports" },
      { label: "Soccer" },
      { label: "Basketball" },
      { label: "Tennis" },
      { label: "Esports" },
      { label: "Bet Bonuses" },
      { label: "Sports Rules" },
      { label: "Racing Rules" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", external: true },
      { label: "Fairness" },
      { label: "Responsible Gambling" },
      { label: "Live Support (1234567890)" },
      { label: "WhatsApp: 1234567890" },
      { label: "Gambling Helpline", external: true },
      { label: "Self Exclusion" },
      { label: "Law Enforcement Request" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "VIP Club" },
      { label: "Affiliate" },
      { label: "Privacy Policy" },
      { label: "AML Policy" },
      { label: "Terms of Service" },
    ],
  },
  {
    title: "Payment Info",
    links: [
      { label: "Deposit & Withdrawals" },
      { label: "Currency Guide" },
      { label: "Crypto Guide" },
      { label: "Supported Crypto" },
      { label: "How to Use the Vault" },
      { label: "How Much to Bet With" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "How-to Guides" },
      { label: "Online Casino Guide" },
      { label: "Sports Betting Guide" },
      { label: "How to Live Stream Sports" },
      { label: "Non stop betting and casino VIP Guide" },
      { label: "House Edge Guide" },
    ],
  },
];

const socialLinks = [
  { icon: FaRegNewspaper, label: "News" },
  { icon: BsChatDotsFill, label: "Chat" },
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaXTwitter, label: "X" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "Youtube" },
  { icon: FaTiktok, label: "TikTok" },
  { icon: FaShoppingBasket, label: "Shop" },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="w-full bg-[#0d202c] text-[#a8c8dc]">
      <div className="mx-auto max-w-[1160px] px-6 pt-8 pb-6 lg:px-0">

        {/* Footer Links */}
        <div
          className="
            flex flex-col
            lg:grid lg:grid-cols-6 lg:gap-x-10 lg:gap-y-0
          "
        >
          {footerColumns.map((column) => (
            <div key={column.title} className="border-b border-[#1c303c] lg:border-none">
              {/* Mobile Toggle */}
              <button 
                onClick={() => toggleSection(column.title)}
                className="flex w-full items-center justify-between py-4 lg:hidden text-left"
              >
                <h3 className="text-[15px] font-bold text-white">
                  {column.title}
                </h3>
                <span className={`text-[#a9c7da] transition-transform duration-200 ${openSection === column.title ? 'rotate-180' : ''}`}>
                  <FaChevronDown size={14} />
                </span>
              </button>

              {/* Desktop Title */}
              <h3 className="hidden mb-4 text-[15px] font-bold text-white lg:block">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {column.title}
                </a>
              </h3>

              <ul 
                className={`
                  space-y-[10px] overflow-hidden transition-all duration-300
                  ${openSection === column.title ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}
                  lg:max-h-none lg:pb-0 lg:opacity-100 lg:block
                `}
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-1
                        text-[14px] font-medium leading-[1.35]
                        transition-colors duration-200
                        hover:text-white
                      "
                    >
                      {link.label}

                      {link.external && (
                        <span className="text-[12px] text-[#9bb9ca]">
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-[15px] text-[#9ebdd0]">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    flex h-5 w-5 items-center justify-center
                    text-[15px]
                    transition-all duration-200
                    hover:scale-110 hover:text-white
                  "
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[#385260]" />

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-[14px] font-medium text-[#a9c7da]">
            © 2026 Non stop betting and casino | All Rights Reserved.
          </p>
        </div>

        {/* Company Info */}
        <div className="mx-auto mt-8 max-w-[1160px] text-center">
          <p className="text-[14px] leading-6 text-[#a9c7da]">
            Non stop betting and casino is owned and operated by Medium Rare N.V., registration
            number: 145353, registered address: Seru Loraweg 17 B, Curacao.
            Payment agent companies are Medium Rare Limited and MRS Tech
            Limited. Contact us at{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              support@nonstopbettingandcasino.com
            </a>
            {" "}or Support / WhatsApp:{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline font-semibold text-white"
            >
              1234567890
            </a>
            .
          </p>
        </div>

        {/* Responsible Gambling */}
        <div className="mt-5 text-center">
          <p className="text-[14px] leading-6 text-[#a9c7da]">
            Non stop betting and casino is committed to responsible gambling, for more information
            visit{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              Gamblingtherapy.org
            </a>
          </p>
        </div>

        {/* Currency */}
        <div className="mt-7 text-center">
          <p className="text-[14px] font-medium text-[#a9c7da]">
            1 USDT = $1.00
          </p>
        </div>

      </div>
    </footer>
  );
}