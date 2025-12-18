// Local storage helpers for Igethouse Missing Items

const IGH_STORAGE_KEYS = {
  PROGRESS: "igethouse_progress",
  LEADERBOARD: "igethouse_leaderboard",
};

function igH_safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function igH_loadProgress() {
  const raw = window.localStorage.getItem(IGH_STORAGE_KEYS.PROGRESS);
  const parsed = igH_safeParse(raw, null);

  if (!parsed || typeof parsed !== "object") {
    return {
      unlockedLevelIds: IGH_LEVELS.length > 0 ? [IGH_LEVELS[0].id] : [],
      bestScoresByLevel: {},
    };
  }

  return {
    unlockedLevelIds: Array.isArray(parsed.unlockedLevelIds)
      ? parsed.unlockedLevelIds
      : [],
    bestScoresByLevel:
      parsed.bestScoresByLevel && typeof parsed.bestScoresByLevel === "object"
        ? parsed.bestScoresByLevel
        : {},
  };
}

function igH_saveProgress(progress) {
  window.localStorage.setItem(
    IGH_STORAGE_KEYS.PROGRESS,
    JSON.stringify(progress),
  );
}

function igH_loadLeaderboard() {
  const raw = window.localStorage.getItem(IGH_STORAGE_KEYS.LEADERBOARD);
  const parsed = igH_safeParse(raw, []);
  if (!Array.isArray(parsed)) return [];
  return parsed.slice(0, 50);
}

function igH_saveLeaderboard(entries) {
  window.localStorage.setItem(
    IGH_STORAGE_KEYS.LEADERBOARD,
    JSON.stringify(entries),
  );
}

function igH_addLeaderboardEntry(entry) {
  const list = igH_loadLeaderboard();
  list.push(entry);
  list.sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds);
  igH_saveLeaderboard(list);
}

function igH_clearAllData() {
  window.localStorage.removeItem(IGH_STORAGE_KEYS.PROGRESS);
  window.localStorage.removeItem(IGH_STORAGE_KEYS.LEADERBOARD);
}


