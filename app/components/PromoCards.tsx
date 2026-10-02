"use client";

import React from "react";
import {
  FaChartLine,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";

type Game = {
  title: string;
  image: string;
  players: number;
  badge?: boolean;
};

const games: Game[] = [
  {
    title: "Gates of Olympus Super Scatter",
    image: "/games/gates-of-olympus.webp",
    players: 747,
    badge: true,
  },
  {
    title: "Odin's Vault",
    image: "/games/odins-vault.webp",
    players: 454,
    badge: true,
  },
  {
    title: "Big Buck Splash 1000",
    image: "/games/big-buck.webp",
    players: 207,
    badge: true,
  },
  {
    title: "Dr Zappo",
    image: "/games/dr-zappo.webp",
    players: 254,
    badge: true,
  },
  {
    title: "Retro Gangster",
    image: "/games/retro-gangster.webp",
    players: 244,
    badge: true,
  },
  {
    title: "Waylanders Forge",
    image: "/games/waylanders.webp",
    players: 409,
    badge: true,
  },
  {
    title: "Decay",
    image: "/games/decay.webp",
    players: 95,
    badge: true,
  },
  {
    title: "Big Bass Rock and Roll",
    image: "/games/big-bass.webp",
    players: 279,
    badge: true,
  },
];

export default function PromoCards() {
  return (
    <section className="w-full bg-[#172c3a] px-2 py-7 sm:px-6 lg:px-[2.8%]">
      
      {/* Heading */}
      <div className="mb-5 flex items-center gap-2">
        <FaChartLine className="text-[24px] text-[#9bc2df] sm:text-[27px]" />

        <h2 className="text-[21px] font-bold tracking-[-0.4px] text-white sm:text-[24px]">
          Trending Games
        </h2>

        <FaChevronRight className="ml-1 text-[15px] text-[#b7d0df]" />
      </div>

      {/* Games */}
      <div
        className="
          flex gap-3
          overflow-x-auto
          pb-2
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-[#405967]
          sm:gap-3.5
          lg:grid
          lg:grid-cols-8
          lg:overflow-visible
        "
      >
        {games.map((game, index) => (
          <GameCard key={game.title} game={game} featured={index === 3} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#3b5260]" />

        <button
          type="button"
          className="
            shrink-0
            text-[16px]
            font-semibold
            text-[#a5bdcc]
            transition
            hover:text-white
          "
        >
          Load More
        </button>

        <div className="h-px flex-1 bg-[#3b5260]" />
      </div>
    </section>
  );
}

function GameCard({
  game,
  featured,
}: {
  game: Game;
  featured?: boolean;
}) {
  return (
    <div
      className="
        group
        min-w-[176px]
        w-[176px]
        shrink-0
        sm:min-w-[180px]
        sm:w-[180px]
        md:min-w-[190px]
        md:w-[190px]
        lg:min-w-0
        lg:w-full
      "
    >
      {/* Image Card */}
      <div
        className="
          relative
          aspect-[0.82/1]
          overflow-hidden
          rounded-[10px]
          bg-[#263d4b]
          cursor-pointer
        "
      >
        <img
          src={game.image}
          alt={game.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-[1.04]
          "
        />

        {/* Top badge */}
        {game.badge && (
          <div
            className="
              absolute
              left-2
              top-2
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              rounded-full
              bg-[#f4f8fa]
              text-[18px]
              font-bold
              text-[#172c3a]
              shadow-md
            "
          >
            $
          </div>
        )}

        {/* External icon */}
        {featured && (
          <button
            type="button"
            aria-label="Open game"
            className="
              absolute
              bottom-4
              right-3
              flex
              h-[45px]
              w-[45px]
              items-center
              justify-center
              rounded-[10px]
              bg-[#465b66]
              text-white
              shadow-lg
              transition
              hover:bg-[#607581]
            "
          >
            <FaExternalLinkAlt className="text-[16px]" />
          </button>
        )}
      </div>

      {/* Players */}
      <div className="mt-2 flex items-center gap-1.5">
        <span className="h-[7px] w-[7px] rounded-full bg-[#20e326]" />

        <span className="text-[14px] font-medium text-[#d5e0e6]">
          {game.players} playing
        </span>
      </div>
    </div>
  );
}