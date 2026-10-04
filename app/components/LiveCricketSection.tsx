"use client";

import { useEffect, useState, useRef } from "react";
import { FaSyncAlt, FaChevronLeft, FaChevronRight, FaTrophy, FaCheckCircle, FaClock, FaCheck } from "react-icons/fa";
import { triggerDemoNotice } from "./DemoNoticeModal";

interface CricketMatch {
  id: string;
  title: string;
  category: "live" | "upcoming" | "recent";
  team1: {
    name: string;
    score: string;
    isBatting: boolean;
  };
  team2: {
    name: string;
    score: string;
    isBatting: boolean;
  };
  statusText: string;
  tournament: string;
  link: string;
  odds: {
    team1: string;
    team2: string;
    draw?: string;
  };
}

export default function LiveCricketSection() {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "recent">("live");
  const [matches, setMatches] = useState<{
    live: CricketMatch[];
    upcoming: CricketMatch[];
    recent: CricketMatch[];
  }>({
    live: [],
    upcoming: [],
    recent: [],
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedOdd, setSelectedOdd] = useState<{ matchId: string; team: string; odds: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchMatches = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/cricket");
      const data = await res.json();
      if (data && (data.live || data.upcoming || data.recent)) {
        setMatches({
          live: data.live || [],
          upcoming: data.upcoming || [],
          recent: data.recent || [],
        });
        if (data.live?.length === 0 && activeTab === "live") {
          if (data.upcoming?.length > 0) setActiveTab("upcoming");
          else if (data.recent?.length > 0) setActiveTab("recent");
        }
      }
    } catch (e) {
      console.error("Failed to load live cricket matches:", e);
    } finally {
      setLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(() => {
      fetchMatches();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentList = matches[activeTab] || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const getTeamInitials = (name: string) => {
    const words = name.replace(/[^a-zA-Z\s]/g, "").split(" ").filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 3).toUpperCase();
  };

  const handleSelectOdd = (matchId: string, team: string, odds: string) => {
    if (selectedOdd?.matchId === matchId && selectedOdd?.team === team) {
      setSelectedOdd(null);
      setToastMessage(null);
    } else {
      setSelectedOdd({ matchId, team, odds });
      setToastMessage(`Added to Betslip: ${team} @ ${odds}`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    }
  };

  return (
    <section className="w-full mt-6 mb-3 relative z-20">
      {/* ========================================================
          STAKE.COM HEADER WITH LIVE PILLS & TABS
      ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#213743]">
        {/* Left: Cricket Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex-shrink-0">
            <span className="text-xl">🏏</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                Live Cricket
              </h2>
              {matches.live.length > 0 && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/40 text-[11px] font-bold text-red-400 tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  LIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-time ICC, T20 & Domestic Matches • Stake Style Sportsbook
            </p>
          </div>
        </div>

        {/* Center / Right: Tabs & Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto scrollbar-hide">
          {/* Tab: Live */}
          <button
            id="cricket-tab-live"
            type="button"
            onClick={() => setActiveTab("live")}
            className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap select-none ${
              activeTab === "live"
                ? "bg-[#1475e1] text-white shadow-md shadow-blue-500/20"
                : "bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live
            <span className="px-1.5 py-0.2 rounded bg-black/30 text-[10px] ml-0.5">
              {matches.live.length}
            </span>
          </button>

          {/* Tab: Upcoming */}
          <button
            id="cricket-tab-upcoming"
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap select-none ${
              activeTab === "upcoming"
                ? "bg-[#1475e1] text-white shadow-md shadow-blue-500/20"
                : "bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948]"
            }`}
          >
            <FaClock className="text-[11px]" />
            Upcoming
            <span className="px-1.5 py-0.2 rounded bg-black/30 text-[10px] ml-0.5">
              {matches.upcoming.length}
            </span>
          </button>

          {/* Tab: Recent / Finished */}
          <button
            id="cricket-tab-recent"
            type="button"
            onClick={() => setActiveTab("recent")}
            className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap select-none ${
              activeTab === "recent"
                ? "bg-[#1475e1] text-white shadow-md shadow-blue-500/20"
                : "bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948]"
            }`}
          >
            <FaCheckCircle className="text-[11px]" />
            Finished
            <span className="px-1.5 py-0.2 rounded bg-black/30 text-[10px] ml-0.5">
              {matches.recent.length}
            </span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => fetchMatches(true)}
            title="Refresh Live Scores"
            className="cursor-pointer p-2 rounded-lg bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948] transition-all ml-1 flex-shrink-0"
          >
            <FaSyncAlt className={`text-xs ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
          </button>

          {/* Arrow Buttons for scrolling */}
          <div className="hidden md:flex items-center gap-1 ml-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="cursor-pointer p-2 rounded-lg bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948] transition-all"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="cursor-pointer p-2 rounded-lg bg-[#1a2c38] text-slate-400 hover:text-white hover:bg-[#223948] transition-all"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MATCH CARDS LIST / CAROUSEL
      ======================================================== */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-44 rounded-xl bg-[#13222d] border border-[#213743] animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="h-4 w-1/3 bg-slate-700/40 rounded" />
              <div className="space-y-3">
                <div className="h-5 bg-slate-700/40 rounded w-4/5" />
                <div className="h-5 bg-slate-700/40 rounded w-3/5" />
              </div>
              <div className="h-9 bg-slate-700/40 rounded" />
            </div>
          ))}
        </div>
      ) : currentList.length === 0 ? (
        <div className="py-10 text-center rounded-xl bg-[#13222d] border border-[#213743]">
          <span className="text-4xl">🏏</span>
          <p className="mt-2 text-sm text-slate-300 font-medium">
            No {activeTab} matches currently available
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Check the upcoming tab for scheduled fixtures
          </p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-hide snap-x"
        >
          {currentList.map((match) => {
            const isTeam1Selected = selectedOdd?.matchId === match.id && selectedOdd?.team === match.team1.name;
            const isTeam2Selected = selectedOdd?.matchId === match.id && selectedOdd?.team === match.team2.name;

            return (
              <div
                key={match.id}
                className="w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0 snap-start rounded-xl bg-[#13222d] hover:bg-[#162734] border border-[#213743] hover:border-[#2b4453] transition-all duration-200 p-3.5 flex flex-col justify-between group shadow-lg hover:shadow-xl"
              >
                {/* Card Top: Tournament & Status */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#1f3340]">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 truncate">
                      <FaTrophy className="text-amber-400/80 text-[10px] flex-shrink-0" />
                      <span className="truncate">{match.tournament}</span>
                    </div>

                    {match.category === "live" ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold tracking-wider uppercase flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        Live
                      </span>
                    ) : match.category === "upcoming" ? (
                      <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-semibold flex-shrink-0">
                        Upcoming
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex-shrink-0">
                        Finished
                      </span>
                    )}
                  </div>

                  {/* Team 1 Row */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-[10px] font-bold text-amber-300 flex-shrink-0 shadow-inner">
                        {getTeamInitials(match.team1.name)}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-semibold text-white truncate group-hover:text-amber-200 transition-colors">
                          {match.team1.name}
                        </span>
                        {match.team1.isBatting && (
                          <span
                            title="Currently Batting"
                            className="text-xs text-yellow-400 animate-bounce flex-shrink-0"
                          >
                            🏏
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-400 flex-shrink-0">
                      {match.team1.score || "—"}
                    </span>
                  </div>

                  {/* Team 2 Row */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-[10px] font-bold text-cyan-300 flex-shrink-0 shadow-inner">
                        {getTeamInitials(match.team2.name)}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-semibold text-white truncate group-hover:text-amber-200 transition-colors">
                          {match.team2.name}
                        </span>
                        {match.team2.isBatting && (
                          <span
                            title="Currently Batting"
                            className="text-xs text-yellow-400 animate-bounce flex-shrink-0"
                          >
                            🏏
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-amber-400 flex-shrink-0">
                      {match.team2.score || "—"}
                    </span>
                  </div>

                  {/* Match Sub-Status */}
                  <div className="mt-1 text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-slate-500" />
                    <span>{match.statusText}</span>
                  </div>
                </div>

                {/* Card Bottom: Stake-Style Odds Buttons */}
                <div className="mt-3.5 pt-3 border-t border-[#1f3340]">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Team 1 Odds */}
                    <button
                      type="button"
                      onClick={() => handleSelectOdd(match.id, match.team1.name, match.odds.team1)}
                      className={`cursor-pointer flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        isTeam1Selected
                          ? "bg-[#1475e1] border-blue-400 text-white shadow-[0_0_12px_rgba(20,117,225,0.5)]"
                          : "bg-[#1a2c38] border-[#294252] text-slate-300 hover:bg-[#233b4b] hover:text-white hover:border-[#38596f]"
                      }`}
                    >
                      <span className="text-[11px] text-slate-400">1</span>
                      <span className="font-mono text-white font-bold flex items-center gap-1">
                        {isTeam1Selected && <FaCheck className="text-[9px] text-white" />}
                        {match.odds.team1}
                      </span>
                    </button>

                    {/* Team 2 Odds */}
                    <button
                      type="button"
                      onClick={() => handleSelectOdd(match.id, match.team2.name, match.odds.team2)}
                      className={`cursor-pointer flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        isTeam2Selected
                          ? "bg-[#1475e1] border-blue-400 text-white shadow-[0_0_12px_rgba(20,117,225,0.5)]"
                          : "bg-[#1a2c38] border-[#294252] text-slate-300 hover:bg-[#233b4b] hover:text-white hover:border-[#38596f]"
                      }`}
                    >
                      <span className="text-[11px] text-slate-400">2</span>
                      <span className="font-mono text-white font-bold flex items-center gap-1">
                        {isTeam2Selected && <FaCheck className="text-[9px] text-white" />}
                        {match.odds.team2}
                      </span>
                    </button>
                  </div>

                  {/* Quick Stake-Style Markets Count */}
                  <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 font-medium">
                    <span
                      onClick={() => triggerDemoNotice()}
                      className="hover:text-blue-400 cursor-pointer transition-colors"
                    >
                      +24 Markets
                    </span>
                    <span className="text-slate-500">Match Winner</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Stake Quick Bet Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#1475e1] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold animate-bounce border border-blue-300/30">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
