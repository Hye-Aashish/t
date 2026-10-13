"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaTrophy,
  FaGift,
  FaCar,
  FaMotorcycle,
  FaLaptop,
  FaMobileAlt,
  FaFire,
  FaChevronRight,
  FaChevronLeft,
  FaClock,
  FaCrown,
} from "react-icons/fa";

interface TopOffersBannerProps {
  onClaimOffer?: () => void;
}

export default function TopOffersBanner({ onClaimOffer }: TopOffersBannerProps) {
  // Countdown timer calculation for luxury lucky draw
  const [timeLeft, setTimeLeft] = useState({
    days: "03",
    hours: "18",
    minutes: "42",
    seconds: "19",
  });

  const [activePrize, setActivePrize] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = new Date().getTime() + 3 * 24 * 60 * 60 * 1000 + 18 * 3600 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) return;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const offers = [
    {
      id: 1,
      rank: "1ST PRIZE",
      rankBadge: "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black",
      title: "Range Rover",
      subtitle: "Luxury SUV (Velar / Defender)",
      value: "₹ 1,25,00,000",
      icon: FaCar,
      accentColor: "from-amber-500/20 to-transparent",
      borderColor: "hover:border-amber-400/60 border-[#eab308]/40",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.25)]",
      image: "/img/offers/range_rover.jpg",
      highlight: "Grand Bumper Prize",
      tag: "🚗 Luxury Car",
    },
    {
      id: 2,
      rank: "2ND PRIZE",
      rankBadge: "bg-gradient-to-r from-slate-200 via-white to-slate-300 text-slate-900",
      title: "Harley-Davidson",
      subtitle: "Fat Boy / Cruiser Superbike",
      value: "₹ 28,50,000",
      icon: FaMotorcycle,
      accentColor: "from-blue-500/20 to-transparent",
      borderColor: "hover:border-cyan-400/60 border-cyan-500/35",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
      image: "/img/offers/harley_davidson.jpg",
      highlight: "Iconic Heavy Cruiser",
      tag: "🏍️ Superbike",
    },
    {
      id: 3,
      rank: "3RD PRIZE",
      rankBadge: "bg-gradient-to-r from-orange-400 to-amber-500 text-black",
      title: "Apple MacBook Pro",
      subtitle: "M3 Max 16-inch XDR Laptop",
      value: "₹ 3,49,900",
      icon: FaLaptop,
      accentColor: "from-purple-500/20 to-transparent",
      borderColor: "hover:border-purple-400/60 border-purple-500/35",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
      image: "/img/offers/macbook_laptop.jpg",
      highlight: "Ultimate Pro Power",
      tag: "💻 Gaming & Work",
    },
    {
      id: 4,
      rank: "4TH PRIZE",
      rankBadge: "bg-gradient-to-r from-emerald-400 to-teal-500 text-black",
      title: "iPhone 16 Pro Max",
      subtitle: "1TB Titanium Flagship Phone",
      value: "₹ 1,89,900",
      icon: FaMobileAlt,
      accentColor: "from-emerald-500/20 to-transparent",
      borderColor: "hover:border-emerald-400/60 border-emerald-500/35",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
      image: "/img/offers/iphone_16_pro.jpg",
      highlight: "Latest Apple Flagship",
      tag: "📱 Smartphone",
    },
  ];

  // Scroll to slide smoothly on mobile
  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const cards = slider.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const cardOffset = card.offsetLeft - (slider.clientWidth - card.clientWidth) / 2;
      slider.scrollTo({
        left: Math.max(0, cardOffset),
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % offers.length;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + offers.length) % offers.length;
    scrollToSlide(prev);
  };

  // Auto slide mobile carousel every 4.5 seconds
  useEffect(() => {
    if (isInteracting) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % offers.length;
        scrollToSlide(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isInteracting, offers.length]);

  // Track active slide on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const centerPoint = slider.scrollLeft + slider.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(slider.children).forEach((child, idx) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(centerPoint - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== currentSlide) {
      setCurrentSlide(closestIndex);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#0b1720] via-[#0f212e] to-[#0f212e] text-white pt-2 sm:pt-4 pb-4">
      {/* Top Banner Ticker Strip */}
      <div className="w-full bg-gradient-to-r from-amber-950/60 via-[#1a2c38] to-amber-950/60 border-y border-amber-500/20 py-2 px-3 sm:px-6">
        <div className="max-w-[1580px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <FaCrown className="text-amber-400 text-sm shrink-0" />
            <span className="tracking-wide">
              EXCLUSIVE MEGA BUMPER OFFER: Win Range Rover, Harley-Davidson, Laptop & iPhone!
            </span>
          </div>

          {/* Countdown Clock */}
          <div data-no-fluctuate="true" className="flex items-center gap-1.5 text-xs text-[#b1bad3] bg-[#071824]/80 px-2.5 py-1 rounded-full border border-amber-500/20 shrink-0">
            <FaClock className="text-amber-400" />
            <span className="text-slate-300">Draw Ends:</span>
            <span className="font-mono font-bold text-amber-300">
              {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1580px] mx-auto px-3 sm:px-6 xl:px-8 mt-3 sm:mt-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaGift className="animate-bounce text-sm" />
              <span>Festive Mega Giveaway Offers</span>
            </div>
            <h2 data-no-fluctuate="true" className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2">
              <span>Top 4 Mega Bumper Prizes</span>
              <span className="text-[11px] sm:text-xs font-semibold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                ₹1.6 Crore+ Total Value
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#93a3b8] mt-1">
              Deposit & play any game to automatically earn lucky draw tickets!
            </p>
          </div>

          {/* Header Action & Mobile Navigation Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
            {/* Mobile Carousel Arrow Controls */}
            <div data-no-fluctuate="true" className="flex sm:hidden items-center gap-1.5 bg-[#071824] p-1 rounded-lg border border-[#213743]">
              <button
                type="button"
                onClick={prevSlide}
                className="p-1.5 rounded-md text-[#b1bad3] hover:text-white hover:bg-[#1a2c38] active:scale-90 transition-all cursor-pointer"
                aria-label="Previous Prize"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <span className="text-[11px] font-bold text-amber-300 px-1 font-mono">
                {currentSlide + 1} / {offers.length}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                className="p-1.5 rounded-md text-[#b1bad3] hover:text-white hover:bg-[#1a2c38] active:scale-90 transition-all cursor-pointer"
                aria-label="Next Prize"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            <button
              onClick={onClaimOffer}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Enter Lucky Draw</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* ========================================================
            MOBILE SLIDER CAROUSEL (Visible on Mobile `< sm`)
        ======================================================== */}
        <div className="block sm:hidden relative">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setTimeout(() => setIsInteracting(false), 3000)}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-1 no-scrollbar select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {offers.map((offer, idx) => {
              const Icon = offer.icon;
              const isCurrent = currentSlide === idx;
              return (
                <div
                  key={offer.id}
                  onClick={onClaimOffer}
                  className={`
                    snap-center shrink-0 w-[84vw] max-w-[325px]
                    group relative flex flex-col justify-between overflow-hidden rounded-2xl
                    bg-[#13222e] border transition-all duration-300 cursor-pointer shadow-xl
                    ${offer.borderColor} ${offer.glowColor}
                    ${isCurrent ? "ring-1 ring-amber-400/50 scale-[1.01]" : "opacity-90"}
                  `}
                >
                  {/* Top Image Box */}
                  <div className="relative w-full h-[180px] overflow-hidden bg-[#071824]">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="84vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13222e] via-transparent to-black/40" />

                    {/* Rank Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1 ${offer.rankBadge}`}
                      >
                        <FaTrophy className="text-[10px]" />
                        {offer.rank}
                      </span>
                    </div>

                    {/* Tag Pill */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {offer.tag}
                      </span>
                    </div>

                    {/* Price Tag Overlay at Image Bottom */}
                    <div className="absolute bottom-2 left-3 z-10">
                      <div className="text-[10px] font-medium text-amber-300/90 uppercase tracking-wide">
                        Worth Value
                      </div>
                      <div className="text-base font-black text-white drop-shadow-md">
                        {offer.value}
                      </div>
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-3.5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                          {offer.title}
                        </h3>
                        <Icon className="text-base text-amber-400 shrink-0" />
                      </div>
                      <p className="text-xs text-[#94a3b8] line-clamp-1 mb-2 font-medium">
                        {offer.subtitle}
                      </p>
                    </div>

                    {/* Action CTA Button inside Card */}
                    <div className="pt-2 mt-1.5 border-t border-[#213743] flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <FaFire className="text-amber-500 animate-pulse" />
                        {offer.highlight}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        <span>Win Now</span>
                        <FaChevronRight className="text-[10px]" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom Active Glow Bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${offer.rankBadge} opacity-90`}
                  />
                </div>
              );
            })}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {offers.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? "w-7 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                    : "w-2 bg-[#213743] hover:bg-[#557086]"
                }`}
                aria-label={`Go to offer ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            DESKTOP MULTI-CARD GRID (Visible on `sm:` and above)
        ======================================================== */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 xl:gap-5">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                onClick={onClaimOffer}
                onMouseEnter={() => setActivePrize(offer.id)}
                onMouseLeave={() => setActivePrize(null)}
                className={`
                  group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl
                  bg-[#13222e] border transition-all duration-300 cursor-pointer
                  ${offer.borderColor} ${offer.glowColor}
                  hover:-translate-y-1.5 shadow-xl
                `}
              >
                {/* Top Image Box with High-End Lighting */}
                <div className="relative w-full h-[180px] sm:h-[190px] xl:h-[200px] overflow-hidden bg-[#071824]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13222e] via-transparent to-black/40" />

                  {/* Rank Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1 ${offer.rankBadge}`}
                    >
                      <FaTrophy className="text-[10px]" />
                      {offer.rank}
                    </span>
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {offer.tag}
                    </span>
                  </div>

                  {/* Price Tag Overlay at Image Bottom */}
                  <div className="absolute bottom-2.5 left-3 z-10">
                    <div className="text-[11px] font-medium text-amber-300/90 uppercase tracking-wide">
                      Worth Value
                    </div>
                    <div className="text-base sm:text-lg font-black text-white drop-shadow-md">
                      {offer.value}
                    </div>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                        {offer.title}
                      </h3>
                      <Icon className="text-base text-[#b1bad3] group-hover:text-amber-400 transition-colors shrink-0" />
                    </div>
                    <p className="text-xs text-[#94a3b8] line-clamp-1 mb-2 font-medium">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Action CTA Button inside Card */}
                  <div className="pt-2 mt-2 border-t border-[#213743] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <FaFire className="text-amber-500 animate-pulse" />
                      {offer.highlight}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      <span>Claim</span>
                      <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Bottom Active Glow Bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${offer.rankBadge} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
