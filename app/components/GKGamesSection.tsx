"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaPause,
  FaArrowRight,
} from "react-icons/fa";
import { triggerDemoNotice } from "./DemoNoticeModal";

interface GKGame {
  id: string;
  title: string;
  category: string;
  provider: string;
  image: string;
  badge: string;
  badgeColor: string;
  players: string;
  rtp: string;
  minBet: string;
}

const gkGamesList: GKGame[] = [
  {
    id: "fun-aviator",
    title: "Fun Aviator",
    category: "Crash Multiplier",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/fun-aviator.jpg",
    badge: "🔥 HOT MULTIPLIER",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    players: "2,840",
    rtp: "99.0%",
    minBet: "₹10",
  },
  {
    id: "7up-7down",
    title: "7Up 7Down",
    category: "High / Low Cards",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/7up-7down.jpg",
    badge: "⭐ TOP RATED",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    players: "1,920",
    rtp: "98.5%",
    minBet: "₹5",
  },
  {
    id: "bingo",
    title: "Bingo Super (Bi)",
    category: "6-Card Royal Jackpot",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/bingo.jpg",
    badge: "👑 D-UP BONUS",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    players: "1,140",
    rtp: "97.8%",
    minBet: "₹1",
  },
  {
    id: "fun-ab",
    title: "Fun AB (Andar Bahar)",
    category: "Live Indian Cards",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/fun-ab.jpg",
    badge: "⚡ DESI HIT",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    players: "3,410",
    rtp: "98.2%",
    minBet: "₹10",
  },
  {
    id: "triple-fun",
    title: "Triple Fun",
    category: "3-Reel 777 Jackpot",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/triple-fun.jpg",
    badge: "🎰 777 JACKPOT",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    players: "1,750",
    rtp: "97.5%",
    minBet: "₹5",
  },
  {
    id: "fun-target",
    title: "Fun Target",
    category: "10x Wheel Spinner",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/fun-target.jpg",
    badge: "🎯 50X MULTIPLIER",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    players: "2,260",
    rtp: "98.0%",
    minBet: "₹5",
  },
  {
    id: "roulette",
    title: "European Roulette",
    category: "VIP Table Game",
    provider: "GK EXCLUSIVE",
    image: "/gk-games/roulette.jpg",
    badge: "💎 VIP LIVE",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    players: "980",
    rtp: "97.3%",
    minBet: "₹10",
  },
  {
    id: "gk-lobby",
    title: "Point Transfer & Clan",
    category: "P2P Multiplayer Room",
    provider: "GK PLATFORM",
    image: "/gk-games/point-transfer.jpg",
    badge: "🛡️ MULTIPLAYER",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    players: "4,620",
    rtp: "100%",
    minBet: "₹1",
  },
];

interface GKGamesSectionProps {
  onOpenDemoNotice?: () => void;
}

export default function GKGamesSection({ onOpenDemoNotice }: GKGamesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Mouse Drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const handleGameClick = () => {
    if (onOpenDemoNotice) {
      onOpenDemoNotice();
    } else {
      triggerDemoNotice();
    }
  };

  const updateScrollButtons = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    setIsDraggingState(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
    setIsHovered(false);
  };

  // Convert vertical mouse wheel to horizontal scroll inside carousel
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
      updateScrollButtons();
    }
  };

  // Handle card click (prevent if user was dragging)
  const handleCardClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleGameClick();
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  // Smooth periodic auto-scroll every 3 seconds (when not hovered, not dragging, and autoPlay is on)
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container || isDraggingRef.current) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [autoPlay, isHovered]);

  return (
    <section className="relative w-full bg-[#0b1720]/95 py-10 px-3 sm:px-6 lg:px-8 border-t border-[#1c3241] overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-48 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1580px]">
        {/* ================= SECTION HEADER ================= */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a2c38] border border-[#264153] text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Exclusive Multiplayer & Club Games</span>
              <span className="text-[#557086]">•</span>
              <span className="text-white/80">GK Originals</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Popular Club & Arcade Games</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                8 Live
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#b1bad3] mt-1">
              Scroll side-by-side (swipe, drag, or use arrows) to explore authentic live multiplier games & card tables.
            </p>
          </div>

          {/* Carousel Navigation Buttons & Auto-scroll Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              className={`h-9 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                autoPlay
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                  : "bg-[#1a2c38] border-[#213743] text-[#8ba3b5] hover:text-white"
              }`}
              title={autoPlay ? "Pause Auto-scroll" : "Resume Auto-scroll"}
            >
              {autoPlay ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Auto-Scroll: ON</span>
                </>
              ) : (
                <>
                  <FaPause size={10} />
                  <span>Paused</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => scroll("left")}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-[#213743] bg-[#1a2c38] text-white transition-all duration-200 cursor-pointer shadow-md ${
                canScrollLeft
                  ? "hover:bg-[#264153] hover:border-amber-400/50 hover:text-amber-400 active:scale-95"
                  : "opacity-40"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft size={13} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-[#213743] bg-[#1a2c38] text-white transition-all duration-200 cursor-pointer shadow-md ${
                canScrollRight
                  ? "hover:bg-[#264153] hover:border-amber-400/50 hover:text-amber-400 active:scale-95"
                  : "opacity-40"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ================= HORIZONTAL SCROLL CAROUSEL ================= */}
        <div className="relative group/carousel">
          {/* Left Floating Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-[#0f212e]/90 border border-white/20 text-white shadow-2xl backdrop-blur-md hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll carousel left"
          >
            <FaChevronLeft size={15} />
          </button>

          {/* Right Floating Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-[#0f212e]/90 border border-white/20 text-white shadow-2xl backdrop-blur-md hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll carousel right"
          >
            <FaChevronRight size={15} />
          </button>

          {/* Cards Track Container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className={`flex gap-4 sm:gap-5 overflow-x-auto py-2 scroll-smooth scrollbar-hide ${
              isDraggingState ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Duplicated list for abundant side-by-side scrolling */}
            {[...gkGamesList, ...gkGamesList].map((game, index) => (
              <div
                key={`${game.id}-${index}`}
                onClick={handleCardClick}
                className="group relative flex-shrink-0 w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl bg-[#1a2c38] border border-[#213743] hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(251,191,36,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden flex flex-col"
              >
                {/* TOP IMAGE CONTAINER */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0f212e]">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 330px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-108 pointer-events-none select-none"
                    draggable={false}
                  />

                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2c38] via-transparent to-black/40 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase border backdrop-blur-md shadow-md ${game.badgeColor}`}
                    >
                      {game.badge}
                    </span>
                  </div>

                  {/* Live Online Counter */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/90 pointer-events-none">
                    <FaUsers className="text-emerald-400 text-[11px]" />
                    <span>{game.players}</span>
                  </div>

                  {/* Hover Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.7)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FaPlay className="ml-1 text-lg" />
                    </div>
                  </div>
                </div>

                {/* CARD DETAILS */}
                <div className="p-4 flex flex-col flex-1 justify-between bg-[#1a2c38]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">
                        {game.provider}
                      </span>
                      <span className="text-[10px] font-semibold text-[#8ba3b5]">
                        RTP {game.rtp}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors truncate">
                      {game.title}
                    </h3>

                    <p className="text-xs text-[#8ba3b5] truncate mt-0.5">
                      {game.category}
                    </p>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="mt-3.5 pt-3 border-t border-[#213743] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-[#b1bad3]">
                      <span>Min Bet:</span>
                      <span className="font-bold text-white font-mono">{game.minBet}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 group-hover:text-emerald-300">
                      <span>Play Now</span>
                      <FaArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#14242f] border border-[#213743] px-4 py-3 text-xs text-[#8ba3b5]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
              ✓
            </span>
            <span>Drag mouse, swipe with finger, or click arrows to scroll games side by side.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#557086] hidden md:inline">Click any game to open:</span>
            <button
              type="button"
              onClick={handleGameClick}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
            >
              Demo Account Notice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
