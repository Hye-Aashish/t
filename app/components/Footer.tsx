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
  FaShieldHalved,
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa6";

import { BsChatDotsFill } from "react-icons/bs";
import { SiTether, SiLitecoin, SiDogecoin, SiBinance, SiRipple } from "react-icons/si";

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
      { label: "Providers" },
      { label: "Promotions & Races" },
      { label: "Stake Originals", external: true },
      { label: "VIP Club" },
    ],
  },
  {
    title: "Sports",
    links: [
      { label: "Sportsbook Home" },
      { label: "Live Cricket" },
      { label: "Soccer / Football" },
      { label: "Basketball" },
      { label: "Tennis" },
      { label: "Esports" },
      { label: "Bet Multipliers" },
      { label: "Sports Betting Rules" },
      { label: "Live Streaming" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center 24/7", external: true },
      { label: "Provably Fair" },
      { label: "Responsible Gambling" },
      { label: "Live Chat Support" },
      { label: "WhatsApp Official" },
      { label: "Gambling Helpline", external: true },
      { label: "Self Exclusion" },
      { label: "AML & KYC Policy" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "VIP Program" },
      { label: "Affiliate System" },
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
      { label: "Official Partners" },
      { label: "Blog & News" },
    ],
  },
  {
    title: "Payment Info",
    links: [
      { label: "Deposit & Withdraw" },
      { label: "Instant Payouts" },
      { label: "Crypto Currency Guide" },
      { label: "Supported Coins" },
      { label: "The Vault Guide" },
      { label: "Bank Transfer / UPI" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Forum Discussion" },
      { label: "Telegram Community" },
      { label: "Twitter Updates" },
      { label: "Daily Bonus Drops" },
      { label: "House Edge Guide" },
    ],
  },
];

const cryptoBadges = [
  { icon: FaBitcoin, name: "Bitcoin", color: "hover:text-[#f7931a]" },
  { icon: FaEthereum, name: "Ethereum", color: "hover:text-[#627eea]" },
  { icon: SiTether, name: "USDT", color: "hover:text-[#26a17b]" },
  { icon: SiLitecoin, name: "Litecoin", color: "hover:text-[#345d9d]" },
  { icon: SiDogecoin, name: "Dogecoin", color: "hover:text-[#c2a633]" },
  { icon: SiBinance, name: "BNB", color: "hover:text-[#f3ba2f]" },
  { icon: SiRipple, name: "XRP", color: "hover:text-[#008ce7]" },
];

const socialLinks = [
  { icon: FaRegNewspaper, label: "News" },
  { icon: BsChatDotsFill, label: "Chat" },
  { icon: FaFacebook, label: "Facebook" },
  { icon: FaXTwitter, label: "X" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "Youtube" },
  { icon: FaTiktok, label: "TikTok" },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="w-full bg-[#071824] border-t border-[#213743] text-[#b1bad3] transition-colors">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 pt-12 pb-8">

        {/* Crypto Currency Logos Strip */}
        <div className="mb-10 pb-8 border-b border-[#213743] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#557086]">
              Accepted Currencies:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#557086]">
            {cryptoBadges.map((coin) => {
              const Icon = coin.icon;
              return (
                <div
                  key={coin.name}
                  title={coin.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f212e] border border-[#213743] text-[13px] font-semibold text-[#b1bad3] ${coin.color} transition-colors cursor-pointer`}
                >
                  <Icon className="text-[16px]" />
                  <span className="text-[12px]">{coin.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div
          className="
            flex flex-col
            lg:grid lg:grid-cols-6 lg:gap-x-8 lg:gap-y-0
          "
        >
          {footerColumns.map((column) => (
            <div key={column.title} className="border-b border-[#213743] lg:border-none">
              {/* Mobile Accordion Toggle */}
              <button
                onClick={() => toggleSection(column.title)}
                className="flex w-full items-center justify-between py-4 lg:hidden text-left"
              >
                <h3 className="text-[14px] font-bold text-white">
                  {column.title}
                </h3>
                <span
                  className={`text-[#557086] transition-transform duration-200 ${
                    openSection === column.title ? "rotate-180 text-white" : ""
                  }`}
                >
                  <FaChevronDown size={12} />
                </span>
              </button>

              {/* Desktop Title */}
              <h3 className="hidden mb-4 text-[14px] font-bold text-white lg:block">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {column.title}
                </a>
              </h3>

              {/* Links */}
              <ul
                className={`
                  space-y-[9px] overflow-hidden transition-all duration-300
                  ${openSection === column.title ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"}
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
                        text-[13px] font-medium leading-[1.4] text-[#b1bad3]
                        transition-colors duration-200
                        hover:text-white hover:translate-x-0.5 transform
                      "
                    >
                      {link.label}
                      {link.external && (
                        <span className="text-[11px] text-[#557086]">
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

        {/* Trust Badges & Responsible Gaming Row */}
        <div className="mt-12 pt-8 border-t border-[#213743] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center justify-center h-8 px-2.5 rounded border border-[#213743] bg-[#0f212e] text-[12px] font-black text-[#e74c3c]">
              18+
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#213743] bg-[#0f212e] text-[12px] font-semibold text-[#b1bad3]">
              <FaShieldHalved className="text-[#00e701]" />
              <span>Provably Fair</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#213743] bg-[#0f212e] text-[12px] font-semibold text-[#b1bad3]">
              <span className="h-2 w-2 rounded-full bg-[#00e701]" />
              <span>24/7 Instant Support</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-[#b1bad3]">
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
                    flex h-9 w-9 items-center justify-center rounded-lg
                    bg-[#0f212e] border border-[#213743] text-[14px]
                    transition-all duration-200
                    hover:scale-105 hover:text-white hover:border-[#1475e1] hover:bg-[#1a2c38]
                  "
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[#213743]" />

        {/* Copyright & License Description */}
        <div className="pt-8 text-center space-y-3">
          <p className="text-[13px] font-semibold text-white">
            © 2026 Non Stop Betting and Casino | All Rights Reserved.
          </p>

          <p className="mx-auto max-w-[950px] text-[12px] leading-relaxed text-[#557086]">
            Non Stop Betting and Casino is owned and operated by Medium Rare N.V., registration
            number: 145353, registered address: Korporaalweg 10, Willemstad, Curaçao.
            Licensed and regulated by the Government of Curaçao. Contact official support at{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b1bad3] hover:text-white underline underline-offset-2"
            >
              support@nonstopbettingandcasino.com
            </a>
            {" "}or WhatsApp:{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1475e1] hover:underline"
            >
              +{whatsappNumber}
            </a>
            .
          </p>

          <p className="text-[11px] text-[#557086]">
            Gambling can be addictive. Play responsibly. 1 USDT = $1.00 USD.
          </p>
        </div>

      </div>
    </footer>
  );
}