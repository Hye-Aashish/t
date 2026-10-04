"use client";

import {
  FaChartLine,
  FaFutbol,
  FaBraille,
  FaDice,
  FaHatCowboy,
  FaTrophy,
  FaGem,
  FaCircle,
  FaBolt,
} from "react-icons/fa";

import { ReactNode, useEffect, useState } from "react";
import { triggerDemoNotice } from "./DemoNoticeModal";

type Bet = {
  game: string;
  icon: ReactNode;
  user: string;
  time: string;
  amount: string;
  currency: string;
  multiplier: string;
  payout: string;
  profit: boolean;
};

type SportsBet = {
  event: string;
  user: string;
  time: string;
  odds: string;
  amount: string;
  currency: string;
};

type RacePlayer = {
  rank: number;
  user: string;
  wagered: string;
  prize: string;
  highlighted?: boolean;
};

/* =========================
   INITIAL CASINO BETS
========================= */

const initialBets: Bet[] = [
  {
    game: "Crash",
    icon: <FaChartLine />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "₹200,000.00",
    currency: "🇮🇳",
    multiplier: "3.00×",
    payout: "₹600,000.00",
    profit: true,
  },
  {
    game: "Ruleta Bola Rapi...",
    icon: <FaFutbol />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "$7,705.00",
    currency: "₮",
    multiplier: "1.01×",
    payout: "$7,815.00",
    profit: true,
  },
  {
    game: "Plinko",
    icon: <FaBraille />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "$77.17",
    currency: "Ł",
    multiplier: "29.00×",
    payout: "$2,237.98",
    profit: true,
  },
  {
    game: "Baccarat 5",
    icon: <FaDice />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "CA$1,600.00",
    currency: "🇨🇦",
    multiplier: "0.00×",
    payout: "-CA$1,600.00",
    profit: false,
  },
  {
    game: "Haunted Circus",
    icon: <FaHatCowboy />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "$20.00",
    currency: "₮",
    multiplier: "81.30×",
    payout: "$1,626.00",
    profit: true,
  },
  {
    game: "Crystal Roulette",
    icon: <FaFutbol />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "$1,342.51",
    currency: "◎",
    multiplier: "0.00×",
    payout: "-$1,342.51",
    profit: false,
  },
  {
    game: "Crash",
    icon: <FaChartLine />,
    user: "Hidden",
    time: "10:50 PM",
    amount: "$2,094.00",
    currency: "₮",
    multiplier: "2.01×",
    payout: "$4,202.74",
    profit: true,
  },
];

/* =========================
   INITIAL SPORTS BETS
========================= */

const initialSportsBets: SportsBet[] = [
  {
    event: "Francisco Cerundolo - ...",
    user: "Hidden",
    time: "12:05 AM",
    odds: "2.25",
    amount: "$5,600.00",
    currency: "◎",
  },
  {
    event: "Getafe - Celta Vigo",
    user: "Hidden",
    time: "12:05 AM",
    odds: "1.80",
    amount: "$1,162.56",
    currency: "◎",
  },
  {
    event: "Getafe - Celta Vigo",
    user: "Hidden",
    time: "12:05 AM",
    odds: "2.50",
    amount: "$26,000.00",
    currency: "₮",
  },
  {
    event: "Getafe - Celta Vigo",
    user: "Hidden",
    time: "12:04 AM",
    odds: "1.90",
    amount: "$1,053.00",
    currency: "◎",
  },
  {
    event: "Getafe - Celta Vigo",
    user: "Hidden",
    time: "12:04 AM",
    odds: "1.80",
    amount: "$15,000.00",
    currency: "₮",
  },
  {
    event: "Multi (2)",
    user: "Hidden",
    time: "12:04 AM",
    odds: "2.82",
    amount: "$1,976.35",
    currency: "₿",
  },
  {
    event: "Getafe - Celta Vigo",
    user: "Hidden",
    time: "12:04 AM",
    odds: "1.82",
    amount: "$5,000.00",
    currency: "◎",
  },
];

/* =========================
   INITIAL RACE PLAYERS
========================= */

const initialRacePlayers: RacePlayer[] = [
  {
    rank: 1,
    user: "Hidden",
    wagered: "$4,837,451.92",
    prize: "$25,000.00",
  },
  {
    rank: 2,
    user: "Hidden",
    wagered: "$3,220,744.11",
    prize: "$12,000.00",
  },
  {
    rank: 3,
    user: "Jaayskeez",
    wagered: "$2,643,603.08",
    prize: "$8,000.00",
    highlighted: true,
  },
  {
    rank: 4,
    user: "Hidden",
    wagered: "$2,042,983.82",
    prize: "$6,000.00",
  },
  {
    rank: 5,
    user: "Hidden",
    wagered: "$1,964,000.00",
    prize: "$5,000.00",
  },
  {
    rank: 6,
    user: "Hidden",
    wagered: "$1,570,849.10",
    prize: "$3,500.00",
  },
  {
    rank: 7,
    user: "Hidden",
    wagered: "$1,547,640.72",
    prize: "$2,500.00",
  },
  {
    rank: 8,
    user: "Hidden",
    wagered: "$1,489,457.77",
    prize: "$2,000.00",
  },
  {
    rank: 9,
    user: "Hidden",
    wagered: "$1,389,410.06",
    prize: "$1,500.00",
  },
];

/* =========================
   CURRENCY BADGE
========================= */

function CurrencyBadge({
  currency,
}: {
  currency: string;
}) {
  return (
    <span className="ml-1.5 inline-flex h-[19px] min-w-[19px] shrink-0 items-center justify-center rounded-full bg-[#dce3e8] px-1 text-[10px] font-bold text-[#263b49]">
      {currency}
    </span>
  );
}

/* =========================
   HIDDEN USER
========================= */

function HiddenUser() {
  return (
    <div className="group relative flex w-fit items-center gap-2 text-[#a6bfd0]">
      <FaHatCowboy className="text-[15px] text-[#a5c1d4]" />

      <span className="cursor-pointer whitespace-nowrap text-[15px] font-medium transition-colors group-hover:text-white">
        Hidden
      </span>

      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 w-max -translate-x-1/2 translate-y-2 rounded-lg bg-[#466177] px-4 py-3 text-[13px] font-semibold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        This user has privacy enabled

        <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#466177]" />
      </div>
    </div>
  );
}

/* =========================
   RANK ICON
========================= */

function RankIcon({
  rank,
}: {
  rank: number;
}) {
  if (rank === 1) {
    return (
      <FaTrophy className="text-[17px] text-[#ffb52b]" />
    );
  }

  if (rank === 2) {
    return (
      <FaTrophy className="text-[17px] text-[#48dce8]" />
    );
  }

  if (rank === 3) {
    return (
      <FaTrophy className="text-[17px] text-[#dca55b]" />
    );
  }

  return (
    <span className="whitespace-nowrap text-[14px] font-semibold text-[#dce7ed]">
      {rank}th
    </span>
  );
}

/* =========================
   DOLLAR BADGE
========================= */

function DollarBadge() {
  return (
    <span className="ml-1.5 inline-flex h-[19px] min-w-[19px] shrink-0 items-center justify-center rounded-full bg-[#56e000] px-1 text-[11px] font-black leading-none text-[#16300f]">
      $
    </span>
  );
}

/* =========================
   LIVE BADGE
========================= */

function LiveBadge({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex w-fit items-center gap-2 rounded-full bg-[#163d32] px-3 py-1.5 ${
        onClick ? "cursor-pointer hover:bg-[#1c4b3d] transition-colors" : ""
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#20e500] opacity-75" />

        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#20e500]" />
      </span>

      <span className="text-[11px] font-black tracking-wide text-[#20e500] sm:text-[12px]">
        LIVE
      </span>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

interface GameTabsProps {
  onOpenDemoNotice?: () => void;
}

export default function GameTabs({ onOpenDemoNotice }: GameTabsProps = {}) {
  const handleGameClick = () => {
    if (onOpenDemoNotice) {
      onOpenDemoNotice();
    } else {
      triggerDemoNotice();
    }
  };

  const [activeTab, setActiveTab] = useState<
    "casino" | "sports" | "race"
  >("casino");

  const [bets, setBets] = useState<Bet[]>(initialBets);

  const [sportsBets, setSportsBets] =
    useState<SportsBet[]>(initialSportsBets);

  const [racePlayers, setRacePlayers] =
    useState<RacePlayer[]>(initialRacePlayers);

  const [liveTick, setLiveTick] = useState(0);

  /* =========================
     LIVE DATA UPDATE
  ========================= */

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLiveTick((prev) => prev + 1);

      /* =========================
         CASINO LIVE UPDATE
      ========================= */

      setBets((currentBets) => {
        return currentBets.map((bet, index) => {
          const numericAmount =
            parseFloat(
              bet.amount.replace(/[^0-9.]/g, "")
            ) || 0;

          const randomChange =
            Math.random() * 0.08 - 0.02;

          const change =
            numericAmount * randomChange;

          const newAmount = Math.max(
            5,
            numericAmount + change
          );

          const multiplier = bet.profit
            ? 1 + Math.random() * 8
            : Math.random() * 1.2;

          const payout =
            newAmount * multiplier;

          let symbol = "$";

          if (bet.currency === "🇮🇳") {
            symbol = "₹";
          } else if (bet.currency === "🇨🇦") {
            symbol = "CA$";
          }

          const formattedAmount =
            newAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

          const formattedPayout =
            payout.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

          const formattedLoss =
            newAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

          return {
            ...bet,

            amount: symbol + formattedAmount,

            multiplier:
              multiplier.toFixed(2) + "×",

            payout: bet.profit
              ? symbol + formattedPayout
              : "-" + symbol + formattedLoss,

            time:
              index === 0
                ? new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : bet.time,
          };
        });
      });

      /* =========================
         SPORTS LIVE UPDATE
      ========================= */

      setSportsBets((currentSports) => {
        return currentSports.map((bet) => {
          const numericAmount =
            parseFloat(
              bet.amount.replace(/[^0-9.]/g, "")
            ) || 0;

          const newAmount =
            numericAmount *
            (1 + (Math.random() * 0.04 - 0.01));

          const currentOdds =
            parseFloat(bet.odds) || 1.01;

          const newOdds = Math.max(
            1.01,
            currentOdds +
            (Math.random() * 0.08 - 0.04)
          );

          return {
            ...bet,

            odds: newOdds.toFixed(2),

            amount:
              "$" +
              newAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),

            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });
      });

      /* =========================
         RACE LIVE UPDATE
      ========================= */

      setRacePlayers((players) => {
        return players.map((player, index) => {
          const wagered =
            parseFloat(
              player.wagered.replace(/[^0-9.]/g, "")
            ) || 0;

          const increase =
            index < 4
              ? Math.random() * 2500
              : Math.random() * 1000;

          const newWagered =
            wagered + increase;

          return {
            ...player,

            wagered:
              "$" +
              newWagered.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
          };
        });
      });
    }, 3500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="h-auto pb-12 w-full bg-[#0f212e] px-3 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1580px]">

        {/* =========================
            TOP TABS
        ========================= */}

        <div className="mb-6 flex w-full items-center justify-between gap-3">

          <div className="flex max-w-full overflow-x-auto rounded-full bg-[#1a2c38] border border-[#213743] p-1 scrollbar-hide select-none">

            {/* CASINO TAB */}

            <button
              type="button"
              onClick={() => setActiveTab("casino")}
              className={`cursor-pointer flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === "casino"
                  ? "bg-[#213743] text-white shadow-sm"
                  : "text-[#b1bad3] hover:text-white hover:bg-[#213743]/50"
              }`}
            >
              <FaChartLine className="text-[14px]" />

              <span>
                Casino Bets
              </span>

              {activeTab === "casino" && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e701]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e701]" />
                </span>
              )}
            </button>

            {/* SPORTS TAB */}

            <button
              type="button"
              onClick={() => setActiveTab("sports")}
              className={`cursor-pointer flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === "sports"
                  ? "bg-[#213743] text-white shadow-sm"
                  : "text-[#b1bad3] hover:text-white hover:bg-[#213743]/50"
              }`}
            >
              <FaFutbol className="text-[14px]" />

              <span>
                Sports Bets
              </span>
            </button>

            {/* RACE TAB */}

            <button
              type="button"
              onClick={() => setActiveTab("race")}
              className={`cursor-pointer flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === "race"
                  ? "bg-[#213743] text-white shadow-sm"
                  : "text-[#b1bad3] hover:text-white hover:bg-[#213743]/50"
              }`}
            >
              <FaTrophy className="text-[14px]" />

              <span>
                Race Leaderboard
              </span>
            </button>
          </div>

          {/* DESKTOP LIVE */}

          <div className="hidden shrink-0 sm:block">
            <LiveBadge onClick={handleGameClick} />
          </div>
        </div>

        {/* MOBILE LIVE */}

        <div className="mb-4 sm:hidden">
          <LiveBadge onClick={handleGameClick} />
        </div>

        {/* =====================================================
            SPORTS TAB
        ===================================================== */}

        {activeTab === "sports" && (
          <div className="w-full overflow-x-auto rounded-xl border border-[#213743] bg-[#1a2c38]">

            <div className="grid min-w-[850px] grid-cols-[1.6fr_1.25fr_1fr_0.8fr_1.25fr] items-center border-b border-[#213743] bg-[#1a2c38] px-5 py-4 text-xs font-bold text-[#b1bad3] uppercase tracking-wider">
              <div>Event</div>
              <div>User</div>
              <div>Time</div>
              <div>Odds</div>
              <div className="text-right">Bet Amount</div>
            </div>

            <div>
              {sportsBets.map((bet, index) => (
                <div
                  key={bet.event + "-" + index}
                  onClick={handleGameClick}
                  className="grid min-w-[850px] grid-cols-[1.6fr_1.25fr_1fr_0.8fr_1.25fr] items-center border-b border-[#213743]/50 bg-[#1a2c38] px-5 py-3.5 text-xs sm:text-sm transition-all duration-200 hover:bg-[#213743]/40 cursor-pointer"
                >
                  {/* EVENT */}
                  <div className="flex min-w-0 items-center gap-2.5 font-semibold">
                    <span className="shrink-0 text-[15px] text-[#1475e1]">
                      <FaFutbol />
                    </span>
                    <span className="truncate text-white font-medium">
                      {bet.event}
                    </span>
                  </div>

                  {/* USER */}
                  <HiddenUser />

                  {/* TIME */}
                  <div className="whitespace-nowrap text-[#b1bad3] font-mono text-xs">
                    {bet.time}
                  </div>

                  {/* ODDS */}
                  <div className="whitespace-nowrap font-mono font-bold text-white text-xs">
                    {bet.odds}
                  </div>

                  {/* AMOUNT */}
                  <div className="flex items-center justify-end whitespace-nowrap font-mono font-semibold text-white">
                    {bet.amount}
                    <CurrencyBadge currency={bet.currency} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            CASINO TAB
        ===================================================== */}

        {activeTab === "casino" && (
          <div className="w-full overflow-x-auto rounded-xl border border-[#213743] bg-[#1a2c38]">

            {/* HEADER */}
            <div className="grid grid-cols-2 md:grid-cols-[1.2fr_1.15fr_0.8fr_1.15fr_0.8fr_1fr] md:min-w-[850px] items-center border-b border-[#213743] bg-[#1a2c38] px-4 py-4 text-xs font-bold text-[#b1bad3] uppercase tracking-wider sm:px-5">
              <div>Game</div>
              <div className="hidden md:block">User</div>
              <div className="hidden md:block">Time</div>
              <div className="hidden md:block">Bet Amount</div>
              <div className="hidden md:block">Multiplier</div>
              <div className="text-right">Payout</div>
            </div>

            {/* ROWS */}
            <div>
              {bets.map((bet, index) => (
                <div
                  key={bet.game + "-" + index}
                  onClick={handleGameClick}
                  className={`grid grid-cols-2 md:grid-cols-[1.2fr_1.15fr_0.8fr_1.15fr_0.8fr_1fr] md:min-w-[850px] items-center border-b border-[#213743]/50 bg-[#1a2c38] px-4 py-3.5 text-xs sm:text-sm transition-all duration-200 hover:bg-[#213743]/40 cursor-pointer sm:px-5 ${
                    index === 0 ? "bg-[#213743]/20" : ""
                  }`}
                >
                  {/* GAME */}
                  <div className="flex min-w-0 items-center gap-2.5 font-semibold">
                    <span className="shrink-0 text-[14px] text-[#1475e1]">
                      {bet.icon}
                    </span>
                    <span className="truncate text-white font-medium max-w-[150px] sm:max-w-none">
                      {bet.game}
                    </span>
                  </div>

                  {/* USER */}
                  <div className="hidden md:block">
                    <HiddenUser />
                  </div>

                  {/* TIME */}
                  <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-[#b1bad3] font-mono text-xs">
                    {index === 0 && (
                      <FaCircle className="animate-pulse text-[6px] text-[#00e701]" />
                    )}
                    {bet.time}
                  </div>

                  {/* BET AMOUNT */}
                  <div className="hidden md:flex items-center whitespace-nowrap font-mono font-semibold text-white">
                    {bet.amount}
                    <CurrencyBadge currency={bet.currency} />
                  </div>

                  {/* MULTIPLIER */}
                  <div
                    className={`hidden md:flex items-center gap-1 whitespace-nowrap font-mono font-bold ${
                      bet.profit ? "text-[#00e701]" : "text-[#b1bad3]"
                    }`}
                  >
                    {bet.multiplier}
                    {index === 0 && (
                      <FaBolt className="animate-pulse text-[11px] text-amber-400" />
                    )}
                  </div>

                  {/* PAYOUT */}
                  <div
                    className={`flex items-center justify-end whitespace-nowrap font-mono font-bold ${
                      bet.profit ? "text-[#00e701]" : "text-[#73889b]"
                    }`}
                  >
                    {bet.payout}
                    <CurrencyBadge currency={bet.currency} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            RACE TAB
        ===================================================== */}

        {activeTab === "race" && (
          <div className="w-full overflow-x-auto">

            <div className="min-w-[760px]">

              {/* RACE TITLE */}

              <div 
                onClick={handleGameClick}
                className="mb-4 flex cursor-pointer items-center justify-between px-1 transition-opacity hover:opacity-90"
              >

                <div className="flex items-center gap-2 text-[16px] font-bold text-white">

                  <FaChartLine className="text-[20px] text-[#b1bad3]" />

                  <span>
                    $100k Race
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[14px] font-bold text-[#b1bad3]">

                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e701] opacity-75" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00e701]" />
                  </span>

                  <span>
                    Ends in 20 hours
                  </span>
                </div>
              </div>

              {/* RACE HEADER */}

              <div className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center rounded-xl bg-[#1a2c38] border border-[#213743] px-4 py-[18px] text-[14px] font-bold text-[#b1bad3] sm:px-5 sm:text-[15px]">

                <div>
                  User
                </div>

                <div className="flex items-center justify-center gap-2">

                  <span className="text-[17px] text-[#557086]">
                    ⓘ
                  </span>

                  <span>
                    Wagered
                  </span>
                </div>

                <div className="text-right">
                  Prize
                </div>
              </div>

              {/* PLAYERS */}

              <div>
                {racePlayers.map((player) => (
                  <div
                    key={player.rank}
                    onClick={handleGameClick}
                    className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center border-b border-[#213743] px-4 py-[17px] transition-all duration-300 hover:bg-[#1a2c38]/60 cursor-pointer sm:px-5"
                  >

                    {/* USER */}

                    <div className="flex min-w-0 items-center gap-2">

                      <div className="flex w-[28px] shrink-0 items-center justify-center">
                        <RankIcon
                          rank={player.rank}
                        />
                      </div>

                      {player.highlighted ? (
                        <div className="flex min-w-0 items-center gap-2">

                          <FaGem className="shrink-0 text-[15px] text-[#1475e1]" />

                          <span className="truncate text-[15px] font-semibold text-white">
                            {player.user}
                          </span>

                        </div>
                      ) : (
                        <HiddenUser />
                      )}
                    </div>

                    {/* WAGERED */}

                    <div className="flex items-center justify-center whitespace-nowrap text-[15px] font-medium text-[#b1bad3]">
                      {player.wagered}

                      <DollarBadge />
                    </div>

                    {/* PRIZE */}

                    <div className="flex items-center justify-end whitespace-nowrap text-[15px] font-semibold text-[#00e701]">
                      {player.prize}

                      <DollarBadge />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}