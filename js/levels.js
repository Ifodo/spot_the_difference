// Level and category metadata for Igethouse Missing Items
// All data is local-only and can be expanded with real images later.

const IGH_DIFFICULTIES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

const IGH_CATEGORIES = [
  {
    id: "living-room",
    label: "Living Room",
    description: "Sofas, coffee tables, rugs, and TV units.",
    difficulty: [IGH_DIFFICULTIES.EASY, IGH_DIFFICULTIES.MEDIUM],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    description: "Beds, lamps, wardrobes, and decor.",
    difficulty: [IGH_DIFFICULTIES.EASY, IGH_DIFFICULTIES.MEDIUM],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    description: "Appliances, cabinets, and counter-top items.",
    difficulty: [IGH_DIFFICULTIES.MEDIUM, IGH_DIFFICULTIES.HARD],
  },
  {
    id: "office",
    label: "Home Office",
    description: "Desks, chairs, screens, and storage.",
    difficulty: [IGH_DIFFICULTIES.MEDIUM, IGH_DIFFICULTIES.HARD],
  },
  {
    id: "outdoor",
    label: "Outdoor Space",
    description: "Balconies, terraces, or gardens.",
    difficulty: [IGH_DIFFICULTIES.EASY, IGH_DIFFICULTIES.HARD],
  },
];

// Example placeholder levels.
// Replace `baseImage` and `alteredImage` with real assets when available.
const IGH_LEVELS = [
  {
    id: "living-easy-1",
    name: "Cozy Living – Spot 3 Differences",
    difficulty: IGH_DIFFICULTIES.EASY,
    categoryId: "living-room",
    // Using your real images: 1.jpg (left / original) and 2.jpg (right / difference)
    baseImage: "assets/images/1.jpg",
    alteredImage: "assets/images/2.jpg",
    timerSeconds: 120,
    hints: 3,
    items: [
      {
        id: "floor-plant",
        label: "Floor plant",
        x: 34.94,
        y: 48.06,
        radius: 4,
        points: 100,
      },
      {
        id: "mirror-plant-right",
        label: "Plant reflection in mirror",
        x: 68.56,
        y: 52.46,
        radius: 4,
        points: 100,
      },
      {
        id: "lit-lamp",
        label: "Lit lamp",
        x: 92.54,
        y: 46.17,
        radius: 4,
        points: 100,
      },
    ],
  },
  {
    id: "bedroom-easy-1",
    name: "Bedroom Basics",
    difficulty: IGH_DIFFICULTIES.EASY,
    categoryId: "bedroom",
    baseImage: "assets/images/bedroom1.jpg",
    alteredImage: "assets/images/bedroom2.jpg",
    timerSeconds: 120,
    hints: 3,
    items: [
      {
        id: "item-1",
        label: "Difference 1",
        x: 90.08,
        y: 72.29,
        radius: 4,
        points: 100,
      },
      {
        id: "item-2",
        label: "Difference 2",
        x: 78.75,
        y: 37.04,
        radius: 4,
        points: 100,
      },
      {
        id: "item-3",
        label: "Difference 3",
        x: 63.08,
        y: 52.46,
        radius: 4,
        points: 100,
      },
      {
        id: "item-4",
        label: "Difference 4",
        x: 37.02,
        y: 45.85,
        radius: 4,
        points: 100,
      },
      {
        id: "item-5",
        label: "Difference 5",
        x: 38.72,
        y: 66.94,
        radius: 4,
        points: 100,
      },
      {
        id: "item-6",
        label: "Difference 6",
        x: 66.48,
        y: 41.45,
        radius: 4,
        points: 100,
      },
      {
        id: "item-7",
        label: "Difference 7",
        x: 67.61,
        y: 70.09,
        radius: 4,
        points: 100,
      },
    ],
  },
  {
    id: "outdoor-easy-1",
    name: "Balcony Garden",
    difficulty: IGH_DIFFICULTIES.EASY,
    categoryId: "outdoor",
    baseImage: "assets/images/outdoor1.png",
    alteredImage: "assets/images/outdoor2.png",
    timerSeconds: 150,
    hints: 4,
    items: [
      {
        id: "item-1",
        label: "Difference 1",
        x: 47.78,
        y: 51.83,
        radius: 4,
        points: 100,
      },
      {
        id: "item-2",
        label: "Difference 2",
        x: 24.36,
        y: 53.72,
        radius: 4,
        points: 100,
      },
      {
        id: "item-3",
        label: "Difference 3",
        x: 29.27,
        y: 91.18,
        radius: 4,
        points: 100,
      },
      {
        id: "item-4",
        label: "Difference 4",
        x: 31.16,
        y: 80.16,
        radius: 4,
        points: 100,
      },
      {
        id: "item-5",
        label: "Difference 5",
        x: 39.47,
        y: 79.22,
        radius: 4,
        points: 100,
      },
      {
        id: "item-6",
        label: "Difference 6",
        x: 48.35,
        y: 91.50,
        radius: 4,
        points: 100,
      },
      {
        id: "item-7",
        label: "Difference 7",
        x: 51.18,
        y: 80.79,
        radius: 4,
        points: 100,
      },
      {
        id: "item-8",
        label: "Difference 8",
        x: 73.28,
        y: 87.72,
        radius: 4,
        points: 100,
      },
      {
        id: "item-9",
        label: "Difference 9",
        x: 80.83,
        y: 92.13,
        radius: 4,
        points: 100,
      },
      {
        id: "item-10",
        label: "Difference 10",
        x: 71.39,
        y: 67.89,
        radius: 4,
        points: 100,
      },
      {
        id: "item-11",
        label: "Difference 11",
        x: 77.05,
        y: 71.67,
        radius: 4,
        points: 100,
      },
      {
        id: "item-12",
        label: "Difference 12",
        x: 88.20,
        y: 72.61,
        radius: 4,
        points: 100,
      },
      {
        id: "item-13",
        label: "Difference 13",
        x: 44.38,
        y: 14.06,
        radius: 4,
        points: 100,
      },
    ],
  },
  {
    id: "kitchen-medium-1",
    name: "Kitchen Counter Challenge",
    difficulty: IGH_DIFFICULTIES.MEDIUM,
    categoryId: "kitchen",
    baseImage: "assets/images/placeholder-kitchen-complete.jpg",
    alteredImage: "assets/images/placeholder-kitchen-missing.jpg",
    timerSeconds: 90,
    hints: 2,
    items: [
      {
        id: "fridge",
        label: "Fridge handle",
        x: 18,
        y: 54,
        radius: 7,
        points: 140,
      },
      {
        id: "bar-stool",
        label: "Bar stool",
        x: 55,
        y: 78,
        radius: 7,
        points: 130,
      },
      {
        id: "pendant-light",
        label: "Pendant light",
        x: 70,
        y: 24,
        radius: 6,
        points: 150,
      },
      {
        id: "kettle",
        label: "Kettle",
        x: 36,
        y: 60,
        radius: 7,
        points: 120,
      },
    ],
  },
];

function getCategoriesForDifficulty(difficulty) {
  return IGH_CATEGORIES.filter((cat) => cat.difficulty.includes(difficulty));
}

function getLevelsForCategoryAndDifficulty(categoryId, difficulty) {
  return IGH_LEVELS.filter(
    (level) =>
      level.categoryId === categoryId && level.difficulty === difficulty,
  );
}


