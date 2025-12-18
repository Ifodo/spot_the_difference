// Core game loop and click detection for Igethouse Missing Items

const gameState = {
  level: null,
  score: 0,
  hitsFound: new Set(),
  incorrectClicks: 0,
  totalClicks: 0,
  timerSecondsRemaining: 0,
  timerIntervalId: null,
  hintsLeft: 0,
  startedAt: null,
  debugMode: false,
  debugClicks: [],
};

function igH_formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const secs = (s % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function igH_updateGameHud() {
  const timerEl = document.getElementById("game-timer");
  const scoreEl = document.getElementById("game-score");
  const itemsLeftEl = document.getElementById("game-items-left");
  const hintsEl = document.getElementById("game-hints-left");

  if (timerEl) timerEl.textContent = igH_formatTime(gameState.timerSecondsRemaining);
  if (scoreEl) scoreEl.textContent = gameState.score.toString();

  if (itemsLeftEl && gameState.level) {
    const total = gameState.level.items.length;
    const found = gameState.hitsFound.size;
    itemsLeftEl.textContent = Math.max(0, total - found).toString();
  }

  if (hintsEl) hintsEl.textContent = gameState.hintsLeft.toString();
}

function igH_stopTimer() {
  if (gameState.timerIntervalId) {
    clearInterval(gameState.timerIntervalId);
    gameState.timerIntervalId = null;
  }
}

function igH_startTimer() {
  igH_stopTimer();
  gameState.timerIntervalId = setInterval(() => {
    gameState.timerSecondsRemaining -= 1;
    igH_updateGameHud();
    if (gameState.timerSecondsRemaining <= 0) {
      igH_stopTimer();
      endLevel(false);
    }
  }, 1000);
}

function igH_percentToClientCoords(container, xPercent, yPercent) {
  const rect = container.getBoundingClientRect();
  const x = rect.left + (xPercent / 100) * rect.width;
  const y = rect.top + (yPercent / 100) * rect.height;
  return { x, y };
}

function igH_handleClick(evt) {
  if (!gameState.level) return;
  const container = document.getElementById("game-click-layer");
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const clickX = ((evt.clientX - rect.left) / rect.width) * 100;
  const clickY = ((evt.clientY - rect.top) / rect.height) * 100;

  // DEBUG MODE: Record coordinates instead of checking hits
  if (gameState.debugMode) {
    gameState.debugClicks.push({
      x: clickX.toFixed(2),
      y: clickY.toFixed(2)
    });
    igH_updateDebugDisplay();
    igH_flashHint(clickX, clickY, 4, false);
    return;
  }

  gameState.totalClicks += 1;

  let hitItem = null;
  for (const item of gameState.level.items) {
    if (gameState.hitsFound.has(item.id)) continue;
    const dx = clickX - item.x;
    const dy = clickY - item.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= item.radius) {
      hitItem = item;
      break;
    }
  }

  if (hitItem) {
    gameState.hitsFound.add(hitItem.id);
    gameState.score += hitItem.points;
    igH_flashHint(hitItem.x, hitItem.y, hitItem.radius, true);
  } else {
    gameState.incorrectClicks += 1;
    gameState.score = Math.max(0, gameState.score - 20);
  }

  igH_updateGameHud();

  if (gameState.level && gameState.hitsFound.size === gameState.level.items.length) {
    // Slight delay so the player can see the success highlight
    // before the round summary appears.
    igH_stopTimer();
    setTimeout(() => endLevel(true), 700);
  }
}

function igH_flashHint(xPercent, yPercent, radiusPercent, success) {
  const overlay = document.getElementById("game-hint-overlay");
  const clickLayer = document.getElementById("game-click-layer");
  if (!overlay || !clickLayer) return;

  const rect = clickLayer.getBoundingClientRect();
  const centerX = (xPercent / 100) * rect.width;
  const centerY = (yPercent / 100) * rect.height;
  const radiusPx = (radiusPercent / 100) * Math.min(rect.width, rect.height);

  overlay.style.width = `${radiusPx * 2}px`;
  overlay.style.height = `${radiusPx * 2}px`;
  overlay.style.left = `${centerX - radiusPx}px`;
  overlay.style.top = `${centerY - radiusPx}px`;
  overlay.style.borderColor = success ? "rgba(2, 89, 64, 0.95)" : "rgba(255, 167, 38, 0.95)";
  overlay.style.boxShadow = success
    ? "0 0 0 6px rgba(2, 89, 64, 0.4)"
    : "0 0 0 6px rgba(255, 167, 38, 0.5)";

  overlay.classList.add("visible");
  setTimeout(() => {
    overlay.classList.remove("visible");
  }, 850);
}

function igH_useHint() {
  if (!gameState.level || gameState.hintsLeft <= 0) return;

  const remaining = gameState.level.items.filter(
    (item) => !gameState.hitsFound.has(item.id),
  );
  if (remaining.length === 0) return;

  const target =
    remaining.length === 1
      ? remaining[0]
      : remaining[Math.floor(Math.random() * remaining.length)];

  gameState.hintsLeft -= 1;
  igH_flashHint(target.x, target.y, target.radius, false);
  igH_updateGameHud();
}

function startLevel(levelId) {
  const level = IGH_LEVELS.find((l) => l.id === levelId);
  if (!level) return;

  gameState.level = level;
  gameState.score = 0;
  gameState.hitsFound = new Set();
  gameState.incorrectClicks = 0;
  gameState.totalClicks = 0;
  gameState.timerSecondsRemaining = level.timerSeconds;
  gameState.hintsLeft = level.hints;
  gameState.startedAt = Date.now();
  igH_stopTimer();

  const baseImg = document.getElementById("game-base-image");
  const altImg = document.getElementById("game-altered-image");
  const diffPill = document.getElementById("game-difficulty-pill");
  const catPill = document.getElementById("game-category-pill");

  if (baseImg) baseImg.src = level.baseImage;
  if (altImg) altImg.src = level.alteredImage;
  if (diffPill) diffPill.textContent = level.difficulty.toUpperCase();

  const cat = IGH_CATEGORIES.find((c) => c.id === level.categoryId);
  if (cat && catPill) catPill.textContent = cat.label;

  const clickLayer = document.getElementById("game-click-layer");
  if (clickLayer) {
    clickLayer.replaceWith(clickLayer.cloneNode(true));
  }
  const newClickLayer = document.getElementById("game-click-layer");
  if (newClickLayer) {
    newClickLayer.addEventListener("click", igH_handleClick);
  }

  const hintBtn = document.getElementById("btn-hint");
  const restartBtn = document.getElementById("btn-restart-level");
  if (hintBtn) {
    hintBtn.onclick = igH_useHint;
  }
  if (restartBtn) {
    restartBtn.onclick = () => startLevel(levelId);
  }

  uiState.currentLevel = level;
  igH_updateGameHud();
  igH_showScreen(SCREENS.GAME);
  igH_startTimer();
}

function endLevel(completedAllItems) {
  if (!gameState.level) return;

  const elapsedSeconds =
    (Date.now() - (gameState.startedAt || Date.now())) / 1000;
  const timeTaken = Math.floor(elapsedSeconds);

  let finalScore = gameState.score;
  if (completedAllItems && gameState.level) {
    const bonus = Math.max(0, gameState.level.timerSeconds - timeTaken) * 3;
    finalScore += bonus;
  }

  const accuracy =
    gameState.totalClicks === 0
      ? 0
      : Math.round(
          (gameState.hitsFound.size / Math.max(1, gameState.totalClicks)) * 100,
        );

  const summaryScore = document.getElementById("summary-score");
  const summaryTime = document.getElementById("summary-time");
  const summaryAccuracy = document.getElementById("summary-accuracy");
  const summaryBest = document.getElementById("summary-best-score");

  if (summaryScore) summaryScore.textContent = finalScore.toString();
  if (summaryTime) summaryTime.textContent = igH_formatTime(timeTaken);
  if (summaryAccuracy) summaryAccuracy.textContent = `${accuracy}%`;

  const progress = igH_loadProgress();
  const previousBest = progress.bestScoresByLevel[gameState.level.id] || 0;
  const newBest = Math.max(previousBest, finalScore);
  progress.bestScoresByLevel[gameState.level.id] = newBest;
  if (!progress.unlockedLevelIds.includes(gameState.level.id)) {
    progress.unlockedLevelIds.push(gameState.level.id);
  }
  igH_saveProgress(progress);

  if (summaryBest) summaryBest.textContent = newBest.toString();

  igH_addLeaderboardEntry({
    levelId: gameState.level.id,
    levelName: gameState.level.name,
    difficulty: gameState.level.difficulty,
    score: finalScore,
    timeSeconds: timeTaken,
    timeFormatted: igH_formatTime(timeTaken),
  });

  igH_showScreen(SCREENS.SUMMARY);
}

window.addEventListener("beforeunload", () => {
  igH_stopTimer();
});

// === DEBUG MODE FUNCTIONS ===
function igH_toggleDebugMode() {
  gameState.debugMode = !gameState.debugMode;
  const debugBtn = document.getElementById("btn-debug-mode");
  const debugPanel = document.getElementById("debug-panel");
  
  if (gameState.debugMode) {
    if (debugBtn) debugBtn.textContent = "🎯 Debug Mode: ON";
    if (debugPanel) debugPanel.style.display = "block";
    igH_stopTimer(); // Pause game in debug mode
  } else {
    if (debugBtn) debugBtn.textContent = "🎯 Debug Mode: OFF";
    if (debugPanel) debugPanel.style.display = "none";
  }
}

function igH_updateDebugDisplay() {
  const coordsList = document.getElementById("debug-coords-list");
  if (!coordsList) return;
  
  if (gameState.debugClicks.length === 0) {
    coordsList.innerHTML = "No clicks recorded yet...";
    return;
  }
  
  const labels = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  coordsList.innerHTML = gameState.debugClicks.map((click, idx) => `
    <div class="debug-coord-item">
      <strong>${idx + 1}. ${labels[idx]}</strong><br>
      x: ${click.x}%, y: ${click.y}%, radius: 4
    </div>
  `).join('');
}

function igH_clearDebugClicks() {
  gameState.debugClicks = [];
  igH_updateDebugDisplay();
}

function igH_copyDebugCoords() {
  if (gameState.debugClicks.length === 0) {
    alert("No coordinates to copy!");
    return;
  }
  
  const text = gameState.debugClicks.map((click, idx) => 
    `${idx + 1}. Item ${idx + 1}\n\nx: ${click.x}%, y: ${click.y}%, radius: 4\n`
  ).join('\n');
  
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Coordinates copied!");
  }).catch(() => {
    prompt("Copy these coordinates:", text);
  });
}

// Wire up debug mode buttons on page load
document.addEventListener("DOMContentLoaded", () => {
  const debugBtn = document.getElementById("btn-debug-mode");
  const debugClearBtn = document.getElementById("btn-debug-clear");
  const debugCopyBtn = document.getElementById("btn-debug-copy");
  
  if (debugBtn) debugBtn.onclick = igH_toggleDebugMode;
  if (debugClearBtn) debugClearBtn.onclick = igH_clearDebugClicks;
  if (debugCopyBtn) debugCopyBtn.onclick = igH_copyDebugCoords;
});


