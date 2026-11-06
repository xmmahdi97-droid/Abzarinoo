import { GameLevel } from '../types/game';

const DAILY_PUZZLES: Omit<GameLevel, 'id'>[] = [
  {
    title: "چالش روز: پرواز اندیشه",
    difficulty: "hard",
    letters: ["ا", "ن", "د", "ی", "ش", "ه"],
    rewardCoins: 120,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "اندیشه", clue: "فکر و تفکر عمیق و آگاهانه", row: 0, col: 0, direction: "across" },
      { id: 2, word: "دانه", clue: "بذر گیاه درون خاک", row: 0, col: 2, direction: "down" },
      { id: 3, word: "شیدا", clue: "عاشق دلباخته و شیدا", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["دین", "شاد"]
  },
  {
    title: "چالش روز: گوهر دانایی",
    difficulty: "hard",
    letters: ["د", "ا", "ن", "ا", "ی", "ی"],
    rewardCoins: 120,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "دانایی", clue: "خردورزی و تسلط بر علوم", row: 0, col: 0, direction: "across" },
      { id: 2, word: "ایران", clue: "میهن کهن و پرآوازه ما", row: 0, col: 1, direction: "down" },
      { id: 3, word: "یاس", clue: "گل سپید خوشبو", row: 0, col: 4, direction: "down" }
    ],
    bonusWords: ["دین", "ندا"]
  },
  {
    title: "چالش روز: خرد و فرزانگی",
    difficulty: "hard",
    letters: ["ف", "ر", "ز", "ا", "ن", "ه"],
    rewardCoins: 120,
    gridRows: 6,
    gridCols: 6,
    words: [
      { id: 1, word: "فرزانه", clue: "شخص خردمند و هوشیار", row: 0, col: 0, direction: "across" },
      { id: 2, word: "هزار", clue: "بلبل خوش‌آواز یا شماره ۱۰۰۰", row: 0, col: 5, direction: "down" },
      { id: 3, word: "ارزن", clue: "دانه خوراک پرندگان", row: 1, col: 2, direction: "across" }
    ],
    bonusWords: ["زهرا", "راه"]
  },
  {
    title: "چالش روز: کیهان پهناور",
    difficulty: "hard",
    letters: ["ک", "ی", "ه", "ا", "ن"],
    rewardCoins: 120,
    gridRows: 5,
    gridCols: 5,
    words: [
      { id: 1, word: "کیهان", clue: "عالم آفرینش و کل کائنات", row: 0, col: 0, direction: "across" },
      { id: 2, word: "یاک", clue: "نوعی گاو کوهی تبت", row: 0, col: 1, direction: "down" },
      { id: 3, word: "آهن", clue: "فلز سخت و مقاوم پرکاربرد", row: 0, col: 3, direction: "down" }
    ],
    bonusWords: ["کاه", "یک"]
  }
];

export function getTodayDailyPuzzle(): GameLevel {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const puzzleTemplate = DAILY_PUZZLES[dayOfYear % DAILY_PUZZLES.length];
  
  return {
    ...puzzleTemplate,
    id: 9999, // Special ID for daily puzzle
    title: `چالش روزانه (${today.toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })})`
  };
}
