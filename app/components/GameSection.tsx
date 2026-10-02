"use client";

import { useState } from "react";
import { FaGoogle, FaFacebookF, FaChartLine, FaChevronRight, FaGamepad, FaVideo, FaGift, FaBolt, FaFire, FaTrophy } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { MdSportsBasketball } from "react-icons/md";
import Image from "next/image";

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
  uniqueId: `all-${index}`
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
  { id: "trending-games", title: "Trending Games", icon: FaChartLine, games: trendingGames.map(g => ({...g, uniqueId: `tg-${g.id}`})) },
  { id: "trending-sports", title: "Trending Sports", icon: MdSportsBasketball, games: trendingSports.map(g => ({...g, uniqueId: `ts-${g.id}`})) },
  { id: "non-stop", title: "Non-stop Originals", icon: FaChartLine, games: shuffle(allGames, 42).slice(0, 8) },
  { id: "slots", title: "Slots", icon: FaGamepad, games: shuffle(allGames, 1).slice(0, 8) },
  { id: "live", title: "Live Casino", icon: FaVideo, games: shuffle(allGames, 2).slice(0, 8) },
  { id: "shows", title: "Game Shows", icon: FaGift, games: shuffle(allGames, 3).slice(0, 8) },
  { id: "only", title: "Only on Non-stop", icon: FaFire, games: shuffle(allGames, 4).slice(0, 8) },
  { id: "burst", title: "Burst Games", icon: FaBolt, games: shuffle(allGames, 5).slice(0, 8) },
];


interface GameSectionProps {
  onRegisterClick?: () => void;
  searchOpen?: boolean;
  setSearchOpen?: (open: boolean) => void;
}

export default function GameSection({
  onRegisterClick,
  searchOpen: propSearchOpen,
  setSearchOpen: propSetSearchOpen,
}: GameSectionProps) {
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);

  const searchOpen = propSearchOpen !== undefined ? propSearchOpen : internalSearchOpen;
  const setSearchOpen = propSetSearchOpen !== undefined ? propSetSearchOpen : setInternalSearchOpen;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const handleGameClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <main className="min-h-screen w-full bg-[#142b3b] text-white relative">
      <div
        className="
          mx-auto
          w-full
          max-w-[1548px]
          px-[6px]
          py-[14px]

          sm:px-6
          sm:py-6

          xl:px-[34px]
          xl:py-[17px]
        "
      >
        {/* ================= HERO ================= */}
        <section
          className="
            relative
            overflow-hidden
            rounded-[9px]
            bg-[#09243a]

            min-h-[480px]

            sm:min-h-[520px]

            lg:min-h-[520px]

            xl:min-h-[520px]
            xl:rounded-[9px]
          "
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 h-full w-full object-cover"
          >
            <source src="/img/bg.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/60
            "
          />

          {/* HERO CONTENT */}
          <div
            className="
              relative
              z-10
              flex
              min-h-[480px]
              items-end
              justify-center
              px-5
              pb-8

              sm:min-h-[520px]
              sm:pb-10

              lg:min-h-[520px]
              lg:items-end
              lg:px-0
              lg:pb-10

              xl:min-h-[520px]
            "
          >
            <div
              className="
                w-full
                max-w-[360px]
                text-center

                sm:max-w-[410px]

                lg:max-w-[460px]

                xl:max-w-[438px]
              "
            >
              {/* HEADING */}
              <h1
                className="
                  mb-5
                  text-[31px]
                  font-semibold
                  leading-[1.18]
                  tracking-[-0.7px]

                  sm:text-[36px]

                  lg:mb-5
                  lg:text-[42px]
                  lg:leading-[1.18]

                  xl:mb-[18px]
                  xl:text-[40px]
                  xl:leading-[1.25]
                  xl:tracking-[-0.8px]
                "
              >
                World's Largest Online
                <br />
                Casino and Sportsbook
              </h1>

              {/* REGISTER */}
              <button
                type="button"
                className="
                  h-[55px]
                  w-full
                  rounded-[10px]
                  bg-[#1976df]
                  text-[17px]
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-200
                  hover:bg-[#2383ed]
                  active:scale-[0.99]

                  sm:h-[54px]

                  xl:h-[55px]
                  xl:text-[17px]
                "
                onClick={onRegisterClick}
              >
                Register
              </button>

              {/* CONTINUE */}
              <p
                className="
                  mb-4
                  mt-[18px]
                  text-[16px]
                  font-medium
                  text-[#b9cee0]

                  sm:text-[15px]

                  xl:mb-[16px]
                  xl:mt-[18px]
                  xl:text-[15px]
                "
              >
                Or Continue With
              </p>

              {/* SOCIAL BUTTONS */}
              <div className="flex gap-[10px]">
                {/* Google */}
                <button
                  type="button"
                  onClick={handleGameClick}
                  aria-label="Continue with Google"
                  className="
                    flex
                    h-[45px]
                    flex-1
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#3b566b]
                    transition-all
                    duration-200
                    hover:bg-[#49677e]
                    active:scale-[0.98]
                    cursor-pointer

                    sm:h-[48px]

                    xl:h-[50px]
                  "
                >
                  <FaGoogle
                    className="
                      text-[22px]
                      text-[#4285F4]

                      xl:text-[22px]
                    "
                  />
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={handleGameClick}
                  aria-label="Continue with Facebook"
                  className="
                    flex
                    h-[45px]
                    flex-1
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#3b566b]
                    transition-all
                    duration-200
                    hover:bg-[#49677e]
                    active:scale-[0.98]
                    cursor-pointer

                    sm:h-[48px]

                    xl:h-[50px]
                  "
                >
                  <FaFacebookF
                    className="
                      text-[22px]
                      text-[#1877F2]

                      xl:text-[22px]
                    "
                  />
                </button>

                {/* Third Provider */}
                <button
                  type="button"
                  onClick={handleGameClick}
                  aria-label="Continue with provider"
                  className="
                    flex
                    h-[45px]
                    flex-1
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#3b566b]
                    transition-all
                    duration-200
                    hover:bg-[#49677e]
                    active:scale-[0.98]
                    cursor-pointer

                    sm:h-[48px]

                    xl:h-[50px]
                  "
                >
                  <span
                    className="
                      text-[25px]
                      font-black
                      leading-none
                      text-[#55ff32]
                    "
                  >
                    K
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LIVE STATS ================= */}
        <section
          className="
            mt-[20px]
            grid
            grid-cols-2
            gap-3

            md:grid-cols-2

            xl:gap-5
          "
        >
          {/* Casino */}
          <div
            className="
              flex
              h-[48px]
              items-center
              justify-between
              rounded-[8px]
              bg-[#20394b]
              px-3

              sm:h-[50px]
              sm:px-4
            "
          >
            <span
              className="
                text-[14px]
                font-bold
                sm:text-[15px]
              "
            >
              Casino
            </span>

            <div
              className="
                flex
                items-center
                gap-1.5
                text-[13px]
                sm:text-[14px]
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#20ed2a]" />
              <strong>35,997</strong>
            </div>
          </div>

          {/* Sports */}
          <div
            className="
              flex
              h-[48px]
              items-center
              justify-between
              rounded-[8px]
              bg-[#20394b]
              px-3

              sm:h-[50px]
              sm:px-4
            "
          >
            <span
              className="
                text-[14px]
                font-bold
                sm:text-[15px]
              "
            >
              Sports
            </span>

            <div
              className="
                flex
                items-center
                gap-1.5
                text-[13px]
                sm:text-[14px]
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#20ed2a]" />
              <strong>18,557</strong>
            </div>
          </div>
        </section>

        {/* ================= SEARCH ================= */}
        <section className="relative z-10 mt-[30px] sm:mt-[30px]">

          <div
            onClick={() => setSearchOpen(true)}
            className="
              flex
              h-[48px]
              items-center
              rounded-[8px]
              border
              border-[#45677d]
              bg-[#0d202d]
              px-3
              cursor-pointer

              sm:h-[50px]
              sm:px-4
            "
          >
            <FiSearch
              size={22}
              strokeWidth={1.8}
              className="
                mr-3
                shrink-0
                text-[#a9c8df]
              "
            />

            <input
              type="text"
              placeholder="Search Non stop betting and casino"
              readOnly
              onClick={() => setSearchOpen(true)}
              className="
                cursor-pointer
                min-w-0
                flex-1
                bg-transparent
                text-[14px]
                text-white
                outline-none
                placeholder:text-[#83a9c5]

                sm:text-[15px]
              "
            />

            {/* Keyboard Shortcut */}
            <div
              className="
                hidden
                items-center
                gap-1
                rounded-md
                bg-[#456278]
                px-2
                py-1
                text-[14px]
                font-semibold
                text-white

                sm:flex
              "
            >
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          </div>

        </section>

        {/* ================= GAMES SECTIONS ================= */}
        {sectionsData.map((section, sIndex) => {
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
              className={`scroll-mt-20 ${sIndex === 0 ? "mt-[40px]" : "mt-[20px]"}`}
            >
              <div className="flex items-center gap-2 mb-4 group cursor-pointer w-max">
                <section.icon className="text-[#a9c8df] text-[18px]" />
                <h2 className="text-white text-[18px] font-semibold group-hover:text-[#fff] transition">
                  {section.title}
                </h2>
                <FaChevronRight className="text-[#a9c8df] text-[14px] group-hover:translate-x-1 transition-transform" />
              </div>
            
            <div className="flex lg:grid lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {section.games.map((game) => (
                <div key={game.uniqueId} onClick={handleGameClick} className="w-[calc(33.333%-0.35rem)] sm:w-auto sm:min-w-[150px] lg:min-w-0 lg:w-full shrink-0 group cursor-pointer">
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#1a2c38] mb-2">
                    <Image 
                      src={game.image} 
                      alt={game.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-[#2c3e50]', 'to-[#e74c3c]');
                      }}
                    />
                  </div>
                  {game.playing && (
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20ed2a]" />
                      <span className="text-[#abc4d7] text-[12px] font-medium"><strong className="text-white">{game.playing}</strong> playing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center mt-4 mb-6">
              <div className="h-px bg-[#2a4051] flex-1" />
              <button className="px-4 text-[13px] font-semibold text-[#8ca3b5] hover:text-white bg-[#142b3b] transition">
                Load More
              </button>
              <div className="h-px bg-[#2a4051] flex-1" />
            </div>
          </section>
          );
        })}


      </div>

      {/* ================= SEARCH MODAL (Fixed Overlay) ================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex justify-center items-start pt-[12vh] px-4">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
            onClick={() => setSearchOpen(false)}
          />
          <div className="w-full max-w-[1000px] bg-[#1a2c38] rounded-xl shadow-2xl p-4 sm:p-6 text-white border border-[#45677d] max-h-[85vh] overflow-y-auto scrollbar-hide">
            {/* Search Input in Modal */}
            <div className="flex items-center rounded-[10px] border border-[#45677d] bg-[#0d202d] px-4 h-[60px] sm:h-[63px] mb-6">
              <FiSearch size={27} className="mr-4 text-[#a9c8df] shrink-0" strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Search Non stop betting and casino"
                autoFocus
                className="flex-1 bg-transparent text-[16px] sm:text-[18px] text-white outline-none placeholder:text-[#83a9c5]"
              />
              <button onClick={() => setSearchOpen(false)} className="ml-2 p-1 text-[#a9c8df] hover:text-white transition">
                <FiX size={27} strokeWidth={1.8} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 mb-6">
              <button className="bg-[#42627a] text-white px-5 py-2 rounded-full font-semibold text-[14px] shadow-lg">
                Casino
              </button>
              <button className="bg-[#1b3547] text-[#a9c8df] hover:bg-[#203a4d] hover:text-white px-5 py-2 rounded-full font-semibold text-[14px] transition">
                Sportsbook
              </button>
            </div>

            {/* Modal Trending Games */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-[#a9c8df] text-[18px]" />
                <h2 className="text-white text-[18px] font-semibold">Games For You</h2>
                <FaChevronRight className="text-[#a9c8df] text-[14px]" />
              </div>
              <div className="flex lg:grid lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {trendingGames.map((game) => (
                  <div key={game.id} onClick={handleGameClick} className="w-[calc(33.333%-0.35rem)] sm:w-auto sm:min-w-[150px] lg:min-w-0 lg:w-full shrink-0 group cursor-pointer">
                    <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#0d202d]">
                      <Image src={game.image} alt={game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-[#2c3e50]', 'to-[#e74c3c]'); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Trending Sports */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MdSportsBasketball className="text-[#a9c8df] text-[20px]" />
                <h2 className="text-white text-[18px] font-semibold">Trending Sports</h2>
                <FaChevronRight className="text-[#a9c8df] text-[14px]" />
              </div>
              <div className="flex lg:grid lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {trendingSports.map((sport) => (
                  <div key={sport.id} onClick={handleGameClick} className="w-[calc(33.333%-0.35rem)] sm:w-auto sm:min-w-[150px] lg:min-w-0 lg:w-full shrink-0 group cursor-pointer">
                    <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#0d202d]">
                      <Image src={sport.image} alt={sport.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-[#0052D4]', 'to-[#6FB1FC]'); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}