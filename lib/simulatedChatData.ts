export interface ChatUser {
  id: number;
  username: string;
  badgeType: "star" | "cyan_star" | "cake" | "c_logo" | "gold_star";
  levelBadge?: string;
  extraIcon?: string;
  messages: string[];
}

// Generates 100 unique users with 10 distinct messages each
export const generateSimulatedUsers = (): ChatUser[] => {
  const baseUsernames = [
    "Maher112", "WhenLucky69", "Chakku007", "Jemb0t", "Lukke33", "VladimirMil", "Sierrsssen",
    "AndreaMT", "CryptoKing", "StakeMaster", "LuckyStrike", "Valkyrie99", "PragmaticFan",
    "ApexPredator", "MoonShot88", "DiamondHands", "ZeusRider", "GatesOfOlympus", "SweetBonanza",
    "DragonSlayer", "BigWinBob", "HighRoller777", "ShadowNinja", "NeonRider", "CyberPunk00",
    "GoldRush", "TurboSpin", "JackpotHunter", "MultiplierGod", "RouletteAce", "BlackjackPro",
    "PlinkoKing", "CrashMaster", "KenoWinner", "DiceRoller", "BaccaratBoss", "VipClubber",
    "RocketMan", "GalaxySpin", "StarBurst", "WildWest", "BuffaloGold", "AztecTreasure",
    "ElDorado", "Spartan300", "VikingRaid", "SamuraiX", "NinjaBlade", "PirateBay",
    "OceanKing", "DeepSea", "FishermanPro", "BigBass", "CandyCrush", "SugarRush",
    "FireInTheHole", "DeadOrAlive", "RazorShark", "JamminJars", "MoneyTrain", "SanQuentin",
    "MentalPro", "Tombstone", "BookOfDead", "LegacyOfDead", "RiseOfOlympus", "MoonPrincess",
    "Reactoonz", "GonzoQuest", "StarburstSlot", "TwinSpin", "MegaMoolah", "DivineFortune",
    "HallOfGods", "MajorMillions", "WheelOfFortune", "MonopolyLive", "CrazyTime", "MegaBall",
    "DreamCatcher", "LightningRoulette", "SpeedBaccarat", "SuperSicBo", "DealOrNoDeal",
    "FunkyTime", "VegasSlots", "CasinoRoyale", "BettingGuru", "OddsMaker", "ScorePredictor",
    "MatchWinner", "GoalHunter", "CornerKing", "CardMaster", "ParlayPro", "Accumulator",
    "HighStakes", "WhalePlayer", "JackpotQueen", "LuckyCharm", "FortuneTeller"
  ];

  const badgeTypes: Array<"star" | "cyan_star" | "cake" | "c_logo" | "gold_star"> = [
    "star", "cyan_star", "cake", "c_logo", "gold_star"
  ];

  const levelBadges = ["", "I", "II", "III", "IV", "V", "VIP"];

  const messageTemplates = [
    "Nice run on Crash today!",
    "@__USER__ did ur nice run that post? shieeet",
    "@__USER__ add me in ur list dude",
    "@__USER__ @__OTHER__ thankyou 😊",
    "I hope that it's gonna be your lucky day too!",
    "Who is playing Gates of Olympus right now?",
    "Just hit a 500x multiplier on Plinko!! 🔥",
    "Congrats on the big cashout @__USER__! 🎉",
    "Sweet Bonanza giving huge multipliers today 🍭",
    "Anyone watching the live match?",
    "Let's goooo! 🚀🚀",
    "Is Roulette live working smooth for everyone?",
    "@__USER__ how much did u wager on that round?",
    "Boom! Another 100x on Crash!",
    "Good luck to all players in the race leaderboard today 🏆",
    "Thanks for the tip @__USER__!",
    "Mining for diamonds today 💎",
    "Anybody tried Non-stop originals yet?",
    "Just cashed out $2,500 on Baccarat!!",
    "Big respect @__USER__ 🤝",
    "Sending good vibes to everyone in chat 🍀",
    "Who's top of the daily leaderboard right now?",
    "Wagering for the next VIP rank level ⚡",
    "This game is super hot right now! 🔥",
    "gg @__USER__ well played!"
  ];

  return baseUsernames.map((username, index) => {
    const userBadgeType = badgeTypes[index % badgeTypes.length];
    const level = levelBadges[index % levelBadges.length];
    const extraIcon = (index % 5 === 0) ? "🎂" : undefined;

    // Generate 10 unique messages for this user
    const userMessages: string[] = [];
    for (let m = 0; m < 10; m++) {
      const template = messageTemplates[(index + m * 3) % messageTemplates.length];
      const targetUser = baseUsernames[(index + m + 1) % baseUsernames.length];
      const targetUser2 = baseUsernames[(index + m + 5) % baseUsernames.length];

      const formattedMsg = template
        .replace("__USER__", targetUser)
        .replace("__OTHER__", targetUser2);

      userMessages.push(formattedMsg);
    }

    return {
      id: index + 1,
      username,
      badgeType: userBadgeType,
      levelBadge: level,
      extraIcon,
      messages: userMessages,
    };
  });
};
