"use client";

import { useState, useEffect } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaChartLine,
  FaChevronRight,
  FaChevronLeft,
  FaGamepad,
  FaVideo,
  FaGift,
  FaBolt,
  FaFire,
  FaTrophy,
  FaPlay,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdSportsBasketball } from "react-icons/md";
import Image from "next/image";
import LiveCricketSection from "./LiveCricketSection";
import { triggerDemoNotice } from "./DemoNoticeModal";

const trendingGames = [
  { id: 1, title: "ODIN'S VAULT", provider: "VALKYRIE", playing: 165, image: "/trending-games/1.png" },
  { id: 2, title: "WAYLANDERS FORGE", provider: "VALKYRIE", playing: 198, image: "/trending-games/2.png" },
  { id: 3, title: "DUCK HUNTERS 2", provider: "NOLIMIT CITY", playing: 108, image: "/trending-games/3.png" },
  { id: 4, title: "THUNDER VS UNDERWORLD 250", provider: "PRAGMATIC PLAY", playing: 59, image: "/trending-games/4.png" },
  { id: 5, title: "GATES OF HEAVEN SUPER SCATTER", provider: "PRAGMATIC PLAY", playing: 93, image: "/trending-games/5.png" },
  { id: 6, title: "TOME OF HERCULES", provider: "VALKYRIE", playing: 76, image: "/trending-games/6.png" },
  { id: 7, title: "GANJA SNAIL", provider: "DONUT GAMING", playing: 109, image: "/trending-games/7.png" },
  { id: 8, title: "HAUNTED CARNIVAL", provider: "TITAN GAMING", playing: 19, image: "/trending-games/8.png" },
];

const trendingSports = [
  { id: 1, title: "SOCCER", provider: "SPORTS", playing: 840, image: "/trending-sports/1.png" },
  { id: 2, title: "TENNIS", provider: "SPORTS", playing: 320, image: "/trending-sports/2.png" },
  { id: 3, title: "BASEBALL", provider: "SPORTS", playing: 450, image: "/trending-sports/3.png" },
  { id: 4, title: "AMERICAN FOOTBALL", provider: "SPORTS", playing: 560, image: "/trending-sports/4.png" },
  { id: 5, title: "HORSE RACING", provider: "SPORTS", playing: 210, image: "/trending-sports/5.png" },
  { id: 6, title: "BASKETBALL", provider: "SPORTS", playing: 780, image: "/trending-sports/6.png" },
  { id: 7, title: "CRICKET", provider: "SPORTS", playing: 1200, image: "/trending-sports/7.png" },
  { id: 8, title: "CS2", provider: "SPORTS", playing: 950, image: "/trending-sports/8.png" },
];

const allGames = [...trendingGames, ...trendingSports].map((game, index) => ({
  ...game,
  uniqueId: `all-${index}`,
}));

const shuffle = (array: any[], seed: number) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const pseudoRandom = Math.abs(Math.sin(seed + i) * 10000);
    const j = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const sectionsData = [
  { id: "trending-games", title: "Trending Games", icon: FaChartLine, games: trendingGames.map((g) => ({ ...g, uniqueId: `tg-${g.id}` })) },
  { id: "trending-sports", title: "Trending Sports", icon: MdSportsBasketball, games: trendingSports.map((g) => ({ ...g, uniqueId: `ts-${g.id}` })) },
  { id: "non-stop", title: "Non-stop Originals", icon: FaChartLine, games: shuffle(allGames, 42).slice(0, 8) },
  { id: "slots", title: "Slots", icon: FaGamepad, games: shuffle(allGames, 1).slice(0, 8) },
  { id: "live", title: "Live Casino", icon: FaVideo, games: shuffle(allGames, 2).slice(0, 8) },
  { id: "shows", title: "Game Shows", icon: FaGift, games: shuffle(allGames, 3).slice(0, 8) },
  { id: "only", title: "Only on Non-stop", icon: FaFire, games: shuffle(allGames, 4).slice(0, 8) },
  { id: "burst", title: "Burst Games", icon: FaBolt, games: shuffle(allGames, 5).slice(0, 8) },
];

const heroPromos = [
  {
    id: 1,
    tag: "WELCOME BONUS",
    title: "200% First Deposit Bonus",
    subtitle: "Get up to ₹100,000 on your first deposit. Play 3,000+ slots, live dealers & authentic originals.",
    badge: "Instant Payouts",
    cta: "Claim 200% Bonus",
    secondaryCta: "Explore Games",
    image: "/img/hero_casino_realistic.jpg",
    action: "register",
  },
  {
    id: 2,
    tag: "LIVE SPORTSBOOK",
    title: "In-Play Cricket Betting",
    subtitle: "Live ball-by-ball odds, premier tournament coverage & instant cashouts on every cricket match.",
    badge: "Highest Market Odds",
    cta: "Bet on Cricket",
    secondaryCta: "View Matches",
    image: "/img/hero_cricket_realistic.jpg",
    action: "cricket",
  },
  {
    id: 3,
    tag: "DAILY $100K RACE",
    title: "$100,000 Daily Leaderboard",
    subtitle: "Wager on any game to automatically climb the leaderboard. $100,000 in cash distributed every 24 hours.",
    badge: "$100k Distributed Daily",
    cta: "Join Daily Race",
    secondaryCta: "View Leaderboard",
    image: "/img/hero_race_realistic.jpg",
    action: "race",
  },
];

const categoryPills = [
  { id: "all", label: "Lobby", icon: "🔥" },
  { id: "trending-games", label: "Trending", icon: "📈" },
  { id: "non-stop", label: "Originals", icon: "⚡" },
  { id: "slots", label: "Slots", icon: "🎰" },
  { id: "live", label: "Live Casino", icon: "🎥" },
  { id: "shows", label: "Game Shows", icon: "🎯" },
  { id: "trending-sports", label: "Sportsbook", icon: "⚽" },
];

interface GameSectionProps {
  onRegisterClick?: () => void;
  searchOpen?: boolean;
  setSearchOpen?: (open: boolean) => void;
  onOpenDemoNotice?: () => void;
}

export default function GameSection({
  onRegisterClick,
  searchOpen: propSearchOpen,
  setSearchOpen: propSetSearchOpen,
  onOpenDemoNotice,
}: GameSectionProps) {
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const searchOpen = propSearchOpen !== undefined ? propSearchOpen : internalSearchOpen;
  const setSearchOpen = propSetSearchOpen !== undefined ? propSetSearchOpen : setInternalSearchOpen;

  const handleGameClick = () => {
    if (onOpenDemoNotice) {
      onOpenDemoNotice();
    } else {
      triggerDemoNotice();
    }
  };

  // Auto slide promo carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % heroPromos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentPromo = heroPromos[activePromoIndex];

  return (
    <div className="w-full bg-[#0f212e] text-white">
      <div className="mx-auto w-full max-w-[1580px] px-3 sm:px-6 xl:px-8 py-4 sm:py-6">
        
        {/* ========================================================
            PROFESSIONAL STAKE-STYLE HERO CAROUSEL
        ======================================================== */}
        <section className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#213743] bg-[#071824] shadow-2xl select-none">
          {/* Main Slide Display Container */}
          <div className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center overflow-hidden">
            {heroPromos.map((promo, idx) => {
              const isActive = activePromoIndex === idx;
              return (
                <div
                  key={promo.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Background Realistic Artwork (Right-aligned) */}
                  <div className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[60%] h-full">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      priority={idx === 0}
                      className="object-cover object-right sm:object-center"
                      sizes="(max-width: 768px) 100vw, 1580px"
                    />
                    {/* Dark gradient mask fading into the background on the left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071824] via-[#071824]/85 sm:via-[#071824]/70 to-transparent" />
                    {/* Top/bottom vertical gradient fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071824] via-transparent to-[#071824]/30" />
                  </div>

                  {/* Left Content Area (Pure Responsive HTML - Never Cut Off) */}
                  <div className="relative z-20 h-full max-w-xl p-4 sm:p-7 md:p-9 flex flex-col justify-center">
                    {/* Small Subtle Brand Mark + Badge */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="relative h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-full overflow-hidden bg-[#1a2c38] border border-[#213743] p-0.5">
                        <Image
                          src="/img/logo.webp"
                          alt="Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#b1bad3] uppercase">
                        NON STOP
                      </span>
                      <span className="text-[#557086]">•</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1475e1]/15 border border-[#1475e1]/30 text-[#1475e1] text-[10px] sm:text-[11px] font-bold">
                        {promo.tag}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-1.5 sm:mb-2 drop-shadow-sm">
                      {promo.title}
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="text-xs sm:text-sm text-[#b1bad3] font-medium leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none max-w-md">
                      {promo.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (promo.action === "register" && onRegisterClick) {
                            onRegisterClick();
                          } else {
                            handleGameClick();
                          }
                        }}
                        className="cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-[#1475e1] hover:bg-[#1d82f5] text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(20,117,225,0.4)] transition-all duration-200 active:scale-95 flex items-center gap-1.5"
                      >
                        <span>{promo.cta}</span>
                        <FaChevronRight size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={handleGameClick}
                        className="cursor-pointer px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#1a2c38] hover:bg-[#213743] text-[#b1bad3] hover:text-white border border-[#213743] text-xs sm:text-sm font-semibold transition-all duration-200"
                      >
                        {promo.secondaryCta}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Slide Indicators & Controls Bar */}
          <div className="relative z-30 px-3 sm:px-6 py-2 sm:py-2.5 bg-[#1a2c38]/95 border-t border-[#213743] flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {heroPromos.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePromoIndex(idx)}
                  className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${
                    activePromoIndex === idx ? "w-7 sm:w-8 bg-[#1475e1]" : "w-2 bg-[#213743] hover:bg-[#557086]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Banner Titles Indicator (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#b1bad3]">
              <span className="text-white font-bold">{currentPromo.title}</span>
              <span className="text-[#557086]">•</span>
              <span className="text-[#00e701] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00e701] animate-ping" />
                {currentPromo.badge}
              </span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setActivePromoIndex(
                    (prev) => (prev - 1 + heroPromos.length) % heroPromos.length
                  )
                }
                className="cursor-pointer p-1.5 rounded-md bg-[#213743] hover:bg-[#2f4d5e] text-[#b1bad3] hover:text-white transition-all text-xs"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePromoIndex((prev) => (prev + 1) % heroPromos.length)
                }
                className="cursor-pointer p-1.5 rounded-md bg-[#213743] hover:bg-[#2f4d5e] text-[#b1bad3] hover:text-white transition-all text-xs"
                aria-label="Next slide"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAKE.COM LIVE METRICS TICKER
        ======================================================== */}
        <section className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex h-[46px] items-center justify-between rounded-lg bg-[#1a2c38] border border-[#213743] px-4 shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-[#b1bad3] flex items-center gap-2">
              <span>🎰</span> Casino
            </span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-[#00e701] animate-ping" />
              <span>35,997</span>
              <span className="hidden sm:inline text-[#b1bad3] font-normal text-xs font-sans">playing</span>
            </div>
          </div>

          <div className="flex h-[46px] items-center justify-between rounded-lg bg-[#1a2c38] border border-[#213743] px-4 shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-[#b1bad3] flex items-center gap-2">
              <span>⚽</span> Sports
            </span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-[#00e701] animate-ping" />
              <span>18,557</span>
              <span className="hidden sm:inline text-[#b1bad3] font-normal text-xs font-sans">playing</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAKE.COM LIVE CRICKET SPORTSBOOK SECTION
        ======================================================== */}
        <LiveCricketSection />

        {/* ========================================================
            STAKE.COM CATEGORY NAVIGATION PILLS & SEARCH BAR
        ======================================================== */}
        <section className="relative z-10 mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Stake Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide select-none">
            {categoryPills.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-[#213743] text-white border border-[#2f4d5e] shadow-sm"
                      : "bg-[#1a2c38] text-[#b1bad3] hover:text-white hover:bg-[#213743] border border-[#213743]"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Stake Search Bar */}
          <div
            onClick={() => setSearchOpen(true)}
            className="cursor-pointer flex h-[42px] items-center rounded-lg border border-[#213743] bg-[#1a2c38] hover:border-[#2f4d5e] px-3.5 transition-all w-full md:w-[280px] lg:w-[320px] shrink-0"
          >
            <FiSearch size={18} className="mr-2.5 shrink-0 text-[#b1bad3]" />
            <input
              type="text"
              placeholder="Search in Casino..."
              readOnly
              onClick={() => setSearchOpen(true)}
              className="cursor-pointer min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-[#557086] font-medium"
            />
            <div className="hidden sm:flex items-center gap-1 rounded bg-[#0f212e] border border-[#213743] px-1.5 py-0.5 text-[10px] font-mono text-[#b1bad3]">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            STAKE.COM GAMES SECTIONS & CAROUSELS
        ======================================================== */}
        {sectionsData
          .filter((section) => selectedCategory === "all" || section.id === selectedCategory)
          .map((section, sIndex) => {
            const sectionId =
              section.id === "trending-games"
                ? "casino-section"
                : section.id === "trending-sports"
                ? "sports-section"
                : section.id === "non-stop"
                ? "foryou-section"
                : section.id;

            return (
              <section
                key={section.id}
                id={sectionId}
                className={`scroll-mt-20 ${sIndex === 0 ? "mt-8" : "mt-8"}`}
              >
                {/* Header with Title and Stake Navigation Buttons */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="w-7 h-7 rounded-md bg-[#1a2c38] border border-[#213743] flex items-center justify-center text-[#b1bad3] group-hover:text-white transition-colors">
                      <section.icon size={15} />
                    </div>
                    <h2 className="text-white text-base sm:text-lg font-bold tracking-tight group-hover:text-[#1475e1] transition-colors">
                      {section.title}
                    </h2>
                    <FaChevronRight className="text-[#557086] text-xs group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Stake Arrows & View All */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleGameClick}
                      className="cursor-pointer text-xs font-semibold text-[#b1bad3] hover:text-white px-2.5 py-1 rounded bg-[#1a2c38] hover:bg-[#213743] border border-[#213743] transition-all"
                    >
                      View All
                    </button>
                  </div>
                </div>

                {/* Game Cards Grid (Stake.com Signature Aspect Ratio: 3/4) */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3 lg:gap-3.5">
                  {section.games.map((game) => (
                    <div
                      key={game.uniqueId}
                      onClick={handleGameClick}
                      className="group cursor-pointer select-none"
                    >
                      {/* Card Image Container */}
                      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#1a2c38] border border-[#213743] group-hover:border-[#2f4d5e] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
                        <Image
                          src={game.image}
                          alt={game.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.classList.add(
                              "bg-gradient-to-br",
                              "from-[#1a2c38]",
                              "to-[#213743]"
                            );
                          }}
                        />

                        {/* Top Playing Badge */}
                        {game.playing && (
                          <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 z-10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e701] animate-ping" />
                            <span className="text-[10px] font-mono font-bold text-white">
                              {game.playing}
                            </span>
                          </div>
                        )}

                        {/* Stake Hover Overlay with Play Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
                          <div className="w-10 h-10 rounded-full bg-[#00e701] text-slate-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-200 pl-0.5">
                            <FaPlay size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Title & Provider */}
                      <div className="mt-1.5 px-0.5">
                        <h3 className="text-white text-xs font-bold truncate group-hover:text-[#1475e1] transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-[#557086] text-[10px] font-semibold uppercase tracking-wider truncate">
                          {game.provider}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
}