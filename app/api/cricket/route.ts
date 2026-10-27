import { NextResponse } from "next/server";

export interface CricketMatch {
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

type RawCricbuzzMatch = {
  matchInfo?: {
    matchId?: number | string;
    seriesName?: string;
    matchDesc?: string;
    matchFormat?: string;
    state?: string;
    status?: string;
    stateTitle?: string;
    currBatTeamId?: number;
    team1?: { teamId?: number; teamName?: string; teamSName?: string };
    team2?: { teamId?: number; teamName?: string; teamSName?: string };
    venueInfo?: { ground?: string; city?: string };
  };
  matchScore?: {
    team1Score?: Record<string, InningsScore | undefined>;
    team2Score?: Record<string, InningsScore | undefined>;
  };
};

type InningsScore = {
  inningsId?: number;
  runs?: number;
  wickets?: number;
  overs?: number;
  isDeclared?: boolean;
};

type MatchBuckets = {
  live: CricketMatch[];
  upcoming: CricketMatch[];
  recent: CricketMatch[];
};

let cache: { data: MatchBuckets & { totalCount: number; updatedAt: string; source: string }; timestamp: number } | null =
  null;
const CACHE_TTL = 25 * 1000;

const CRICBUZZ_PAGES = [
  "https://www.cricbuzz.com/cricket-match/live-scores",
  "https://www.cricbuzz.com/cricket-match/live-scores/recent-matches",
  "https://www.cricbuzz.com/cricket-match/live-scores/upcoming-matches",
] as const;

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

function extractBalancedObject(str: string, startIdx: number): string | null {
  if (str[startIdx] !== "{") return null;
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = startIdx; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return str.slice(startIdx, i + 1);
    }
  }
  return null;
}

function extractRawMatches(html: string): RawCricbuzzMatch[] {
  const matches: RawCricbuzzMatch[] = [];
  const seen = new Set<string>();
  const re = /\{\\"matchInfo\\":/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(html)) !== null) {
    const slice = html.slice(m.index, m.index + 9000);
    const unescaped = slice.replace(/\\"/g, '"').replace(/\\n/g, "\n");
    const obj = extractBalancedObject(unescaped, 0);
    if (!obj) continue;

    try {
      const parsed = JSON.parse(obj) as RawCricbuzzMatch;
      const id = parsed.matchInfo?.matchId;
      if (id == null) continue;
      const key = String(id);
      if (seen.has(key)) continue;
      seen.add(key);
      matches.push(parsed);
    } catch {
      // skip malformed payloads
    }
  }

  return matches;
}

function categorize(state = ""): "live" | "upcoming" | "recent" {
  const s = state.toLowerCase();
  if (s.includes("complete") || s.includes("abandon") || s === "result") {
    return "recent";
  }
  if (
    /progress|live|stumps|innings break|drink|tea|lunch|rain|delay|break|toss/.test(
      s
    )
  ) {
    return "live";
  }
  return "upcoming";
}

function formatInnings(innings?: InningsScore): string {
  if (!innings || innings.runs == null) return "";
  const wicketPart =
    innings.wickets != null
      ? `/${innings.wickets}`
      : "";
  const oversPart = innings.overs != null ? ` (${innings.overs})` : "";
  const declared = innings.isDeclared ? "d" : "";
  return `${innings.runs}${wicketPart}${declared}${oversPart}`;
}

function teamScore(scoreObj?: Record<string, InningsScore | undefined>): string {
  if (!scoreObj) return "";
  const parts = ["inngs1", "inngs2", "inngs3", "inngs4"]
    .map((key) => formatInnings(scoreObj[key]))
    .filter(Boolean);
  return parts.join(" & ");
}

function generateOdds(idStr: string) {
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = (hash << 5) - hash + idStr.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  const odd1 = (1.45 + (abs % 110) / 100).toFixed(2);
  const odd2 = (1.55 + ((abs >> 2) % 120) / 100).toFixed(2);
  return {
    team1: odd1,
    team2: odd2,
    draw: (3.1 + ((abs >> 4) % 150) / 100).toFixed(2),
  };
}

function priorityScore(match: CricketMatch, category: "live" | "upcoming" | "recent") {
  const text = `${match.tournament} ${match.team1.name} ${match.team2.name}`.toLowerCase();
  let score = 0;
  if (/india|australia|england|pakistan|new zealand|south africa|sri lanka|bangladesh|west indies|afghanistan/.test(text)) {
    score += 50;
  }
  if (/ipl|world cup|t20i|odi|test|asia cup|champions|ranji|bbl|psl|cpl/.test(text)) {
    score += 20;
  }
  if (category === "live") score += 10;
  return score;
}

function mapRawMatch(raw: RawCricbuzzMatch): CricketMatch | null {
  const info = raw.matchInfo;
  if (!info?.matchId || !info.team1?.teamName || !info.team2?.teamName) {
    return null;
  }

  const id = String(info.matchId);
  const category = categorize(info.state || "");
  const battingId = info.currBatTeamId;
  const team1Name = info.team1.teamName;
  const team2Name = info.team2.teamName;

  const title = `${team1Name} vs ${team2Name}${info.matchDesc ? ` - ${info.matchDesc}` : ""}`;
  const tournament =
    info.seriesName ||
    (info.matchFormat ? `${info.matchFormat} Cricket` : "International Cricket");

  let statusText = info.status || info.stateTitle || info.state || "Match update";
  if (category === "live" && !/live/i.test(statusText)) {
    statusText = `Live - ${statusText}`;
  }

  return {
    id,
    title,
    category,
    team1: {
      name: team1Name,
      score: teamScore(raw.matchScore?.team1Score),
      isBatting: category === "live" && battingId != null && battingId === info.team1.teamId,
    },
    team2: {
      name: team2Name,
      score: teamScore(raw.matchScore?.team2Score),
      isBatting: category === "live" && battingId != null && battingId === info.team2.teamId,
    },
    statusText,
    tournament,
    link: `https://www.cricbuzz.com/live-cricket-scores/${id}`,
    odds: generateOdds(id),
  };
}

async function fetchCricbuzzBuckets(): Promise<MatchBuckets | null> {
  const responses = await Promise.allSettled(
    CRICBUZZ_PAGES.map((url) =>
      fetch(url, {
        headers: FETCH_HEADERS,
        next: { revalidate: 30 },
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Cricbuzz ${res.status}`);
        return res.text();
      })
    )
  );

  const merged = new Map<string, RawCricbuzzMatch>();
  for (const result of responses) {
    if (result.status !== "fulfilled") continue;
    for (const raw of extractRawMatches(result.value)) {
      const id = raw.matchInfo?.matchId;
      if (id == null) continue;
      const key = String(id);
      const existing = merged.get(key);
      // Prefer entries that include scores
      if (!existing || (!existing.matchScore && raw.matchScore)) {
        merged.set(key, raw);
      }
    }
  }

  if (merged.size === 0) return null;

  const live: CricketMatch[] = [];
  const upcoming: CricketMatch[] = [];
  const recent: CricketMatch[] = [];

  for (const raw of merged.values()) {
    const mapped = mapRawMatch(raw);
    if (!mapped) continue;
    if (mapped.category === "live") live.push(mapped);
    else if (mapped.category === "recent") recent.push(mapped);
    else upcoming.push(mapped);
  }

  const sortFn =
    (category: "live" | "upcoming" | "recent") =>
    (a: CricketMatch, b: CricketMatch) =>
      priorityScore(b, category) - priorityScore(a, category);

  live.sort(sortFn("live"));
  upcoming.sort(sortFn("upcoming"));
  recent.sort(sortFn("recent"));

  return {
    live,
    upcoming,
    recent: recent.slice(0, 40),
  };
}

function parseEspnTeam(raw: string) {
  const isBatting = raw.includes("*");
  const cleaned = raw.replace(/\*/g, "").trim();
  const scoreMatch = cleaned.match(/\s+(\d+[\d/ &]*)$/);
  if (scoreMatch) {
    const score = scoreMatch[1].trim();
    const name = cleaned.slice(0, scoreMatch.index).trim();
    return { name: name || cleaned, score, isBatting };
  }
  return { name: cleaned, score: "", isBatting };
}

async function fetchEspnBuckets(): Promise<MatchBuckets | null> {
  const res = await fetch("https://www.espncricinfo.com/rss/livescores.xml", {
    headers: {
      ...FETCH_HEADERS,
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`ESPN ${res.status}`);

  const xml = await res.text();
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const live: CricketMatch[] = [];
  const upcoming: CricketMatch[] = [];
  const recent: CricketMatch[] = [];

  let match: RegExpExecArray | null;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1];
    const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
    const guidMatch = itemContent.match(/<guid>([\s\S]*?)<\/guid>/);

    const rawTitle = (titleMatch ? titleMatch[1] : "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();

    const link = (linkMatch ? linkMatch[1] : "").trim();
    const guid = (guidMatch ? guidMatch[1] : "").trim();
    const id =
      guid.match(/(\d+)\.html/)?.[1] ||
      Math.random().toString(36).substring(2, 9);

    if (!rawTitle || !rawTitle.includes(" v ")) continue;

    const [team1Raw, team2Raw] = rawTitle.split(" v ");
    const team1 = parseEspnTeam(team1Raw);
    const team2 = parseEspnTeam(team2Raw);
    const hasStar = rawTitle.includes("*");
    const hasScores = team1.score !== "" || team2.score !== "";

    let category: "live" | "upcoming" | "recent" = "upcoming";
    let statusText = "Starts Soon";
    if (hasStar) {
      category = "live";
      const battingTeam = team1.isBatting ? team1.name : team2.name;
      statusText = `Live • ${battingTeam} batting`;
    } else if (hasScores) {
      category = "recent";
      statusText = "Match Finished";
    }

    const matchObj: CricketMatch = {
      id,
      title: rawTitle,
      category,
      team1,
      team2,
      statusText,
      tournament: "Live Cricket",
      link,
      odds: generateOdds(id),
    };

    if (category === "live") live.push(matchObj);
    else if (category === "recent") recent.push(matchObj);
    else upcoming.push(matchObj);
  }

  if (live.length + upcoming.length + recent.length === 0) return null;
  return { live, upcoming, recent };
}

function fallbackData(): MatchBuckets & {
  totalCount: number;
  updatedAt: string;
  source: string;
} {
  const data: MatchBuckets = {
    live: [
      {
        id: "1546442",
        title: "India vs Australia - 2nd T20I",
        category: "live",
        team1: { name: "India", score: "186/4 (17.4)", isBatting: true },
        team2: { name: "Australia", score: "182/7 (20.0)", isBatting: false },
        statusText: "Live • India need 3 runs to win",
        tournament: "T20 International Series",
        link: "https://www.cricbuzz.com",
        odds: { team1: "1.25", team2: "3.90" },
      },
    ],
    upcoming: [
      {
        id: "1551849",
        title: "England vs South Africa - 1st ODI",
        category: "upcoming",
        team1: { name: "England", score: "", isBatting: false },
        team2: { name: "South Africa", score: "", isBatting: false },
        statusText: "Today • 7:00 PM IST",
        tournament: "ODI Series",
        link: "https://www.cricbuzz.com",
        odds: { team1: "1.65", team2: "2.25" },
      },
    ],
    recent: [
      {
        id: "1556697",
        title: "New Zealand vs Pakistan - 5th T20I",
        category: "recent",
        team1: { name: "New Zealand", score: "178/5 (20.0)", isBatting: false },
        team2: { name: "Pakistan", score: "162/9 (20.0)", isBatting: false },
        statusText: "New Zealand won by 16 runs",
        tournament: "T20 International Series",
        link: "https://www.cricbuzz.com",
        odds: { team1: "1.50", team2: "2.60" },
      },
      {
        id: "1556698",
        title: "India vs Afghanistan - 3rd T20I",
        category: "recent",
        team1: { name: "India", score: "221/7 (20.0)", isBatting: false },
        team2: { name: "Afghanistan", score: "94/10 (14.1)", isBatting: false },
        statusText: "India won by 127 runs",
        tournament: "Afghanistan vs India",
        link: "https://www.cricbuzz.com",
        odds: { team1: "1.20", team2: "4.50" },
      },
    ],
  };

  return {
    ...data,
    totalCount: data.live.length + data.upcoming.length + data.recent.length,
    updatedAt: new Date().toISOString(),
    source: "fallback",
  };
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ ...cache.data, cached: true });
  }

  try {
    let buckets = await fetchCricbuzzBuckets();
    let source = "cricbuzz";

    if (!buckets || buckets.live.length + buckets.upcoming.length + buckets.recent.length === 0) {
      buckets = await fetchEspnBuckets();
      source = "espn";
    }

    if (!buckets) {
      const fallback = fallbackData();
      cache = { data: fallback, timestamp: now };
      return NextResponse.json(fallback);
    }

    // If finished list is empty (common with ESPN-only), keep a small recent set from fallback
    if (buckets.recent.length === 0) {
      buckets.recent = fallbackData().recent;
    }

    const result = {
      ...buckets,
      totalCount:
        buckets.live.length + buckets.upcoming.length + buckets.recent.length,
      updatedAt: new Date().toISOString(),
      source,
    };

    cache = { data: result, timestamp: now };
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn("Cricket fetch error, returning fallback:", message);
    const fallback = fallbackData();
    return NextResponse.json(fallback);
  }
}
