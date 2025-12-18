// UI wiring and simple screen navigation for Igethouse game.

const SCREENS = {
  HOME: "screen-home",
  CATEGORY: "screen-category",
  GAME: "screen-game",
  SUMMARY: "screen-summary",
  LEADERBOARD: "screen-leaderboard",
};

const uiState = {
  currentScreenId: SCREENS.HOME,
  selectedDifficulty: null,
  selectedCategoryId: null,
  currentLevel: null,
  progress: null,
};

function igH_showScreen(screenId) {
  uiState.currentScreenId = screenId;
  Object.values(SCREENS).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("screen-active", id === screenId);
  });
}

function igH_renderCategories() {
  const grid = document.getElementById("category-grid");
  const pill = document.getElementById("category-selected-difficulty");
  if (!grid || !pill || !uiState.selectedDifficulty) return;

  const categories = getCategoriesForDifficulty(uiState.selectedDifficulty);
  pill.textContent = uiState.selectedDifficulty.toUpperCase();

  grid.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("button");
    card.className = "category-card";
    card.dataset.categoryId = cat.id;
    card.innerHTML = `
      <div class="category-card-title">${cat.label}</div>
      <div class="category-card-meta">${cat.description}</div>
      <div class="category-card-tag">Tap to play</div>
    `;
    card.addEventListener("click", () => {
      uiState.selectedCategoryId = cat.id;
      const levels = getLevelsForCategoryAndDifficulty(
        cat.id,
        uiState.selectedDifficulty,
      );
      if (levels.length > 0) {
        startLevel(levels[0].id);
      }
    });
    grid.appendChild(card);
  });
}

function igH_renderLeaderboard() {
  const tbody = document.getElementById("leaderboard-body");
  if (!tbody) return;

  const rows = igH_loadLeaderboard();
  tbody.innerHTML = "";

  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = "No scores yet. Play a few rounds to populate this table.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  rows.forEach((entry, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${entry.levelName}</td>
      <td>${entry.difficulty.toUpperCase()}</td>
      <td>${entry.score}</td>
      <td>${entry.timeFormatted}</td>
    `;
    tbody.appendChild(tr);
  });
}

function igH_setupNav() {
  const difficultyButtons = document.querySelectorAll(".difficulty-card");
  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const difficulty = btn.dataset.difficulty;
      uiState.selectedDifficulty = difficulty;
      igH_renderCategories();
      igH_showScreen(SCREENS.CATEGORY);
    });
  });

  document.querySelectorAll(".back-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target === "home") igH_showScreen(SCREENS.HOME);
      if (target === "category") igH_showScreen(SCREENS.CATEGORY);
    });
  });

  const leaderboardBtn = document.getElementById("btn-open-leaderboard");
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener("click", () => {
      igH_renderLeaderboard();
      igH_showScreen(SCREENS.LEADERBOARD);
    });
  }

  const clearBtn = document.getElementById("btn-clear-leaderboard");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (
        confirm(
          "Clear all local progress and leaderboard scores on this device?",
        )
      ) {
        igH_clearAllData();
        igH_renderLeaderboard();
      }
    });
  }
}

function igH_setupSummaryButtons() {
  const again = document.getElementById("btn-play-again");
  const home = document.getElementById("btn-summary-home");
  if (again) {
    again.addEventListener("click", () => {
      if (uiState.currentLevel) {
        startLevel(uiState.currentLevel.id);
      }
    });
  }
  if (home) {
    home.addEventListener("click", () => {
      igH_showScreen(SCREENS.HOME);
    });
  }
}

function igH_updateFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  uiState.progress = igH_loadProgress();
  igH_setupNav();
  igH_setupSummaryButtons();
  igH_updateFooterYear();
});


