"use client";

import { useState } from "react";
import {
  FaHeadset,
  FaFacebook,
  FaBitcoin,
  FaCommentDots,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";


export default function RegionPopup() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-3 py-5 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[455px] overflow-hidden rounded-[10px] bg-[#172f3f] shadow-2xl">

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 z-10 text-[34px] font-light leading-none text-[#a8c5d8] transition hover:text-white"
        >
          ×
        </button>

        {/* Content */}
        <div className="px-5 pt-4 sm:px-6">

          {/* Logo */}
          <div className="mb-6 text-center">
            <h1 className="font-serif text-[45px] italic leading-none text-white">
              NonStop Betting
            </h1>
          </div>

          {/* Heading */}
          <h2 className="px-5 text-center text-[15px] font-bold leading-[1.7] text-[#f1f5f8] sm:text-[18px]">
            Sorry, Non stop betting and casino is not available in your region,
            <br />
            but Non stop betting and casino is!
          </h2>

          {/* Flag Image */}
          <div className="mt-5 overflow-hidden">
          <Image
  src="/img/flagkd.webp"
  alt="European Union Flag"
  width={1200}
  height={212}
  className="h-[182px] w-full object-cover sm:h-[182px]"
/>
          </div>

          {/* Description */}
          <p className="px-3 py-5 text-center text-[17px] leading-[1.75] text-[#a9c4d6] sm:px-4 sm:text-[16px]">
            Due to our gaming license, we cannot accept customers from
            Germany. However you are welcome to sign up for our social
            casino Non stop betting and casino.
          </p>

          {/* CTA Button */}
          <button className="w-full rounded-[10px] bg-[#1979df] py-4 text-[16px] font-bold text-white shadow-md transition hover:bg-[#2688ed]">
            Start Playing on Non stop betting and casino
          </button>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-12 py-7 text-[22px] text-[#e4edf3]">
            <FaHeadset />
            <FaFacebook />
            <FaXTwitter className="text-[21px]" />
            <FaBitcoin className="rounded-full bg-[#f7931a] p-[3px] text-[18px] text-white" />
            <FaCommentDots />
          </div>
        </div>
      </div>
    </div>
  );
}