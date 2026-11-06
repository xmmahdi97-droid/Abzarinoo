export type GameScreen = 
  | 'HOME' 
  | 'PLAYING' 
  | 'LEVEL_MAP' 
  | 'DAILY_CHALLENGE' 
  | 'STATS' 
  | 'SETTINGS' 
  | 'ANDROID_EXPORT';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

export interface LevelWord {
  id: number;
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
}

export interface GameLevel {
  id: number;
  title: string;
  difficulty: Difficulty;
  letters: string[];
  words: LevelWord[];
  bonusWords?: string[];
  rewardCoins: number;
  gridRows: number;
  gridCols: number;
}

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  stars: number; // 1 to 3
  foundWords: string[];
  revealedCells: string[]; // "row,col"
  hintsUsedCount: number;
}

export interface PlayerStats {
  completedLevelsCount: number;
  totalWordsFound: number;
  wrongGuessesCount: number;
  totalCoinsEarned: number;
  hintsUsedCount: number;
  totalPlayTimeSeconds: number;
  dailyStreak: number;
  lastDailyDate: string | null;
}

export interface CoinTransaction {
  id: string;
  amount: number;
  type: 'reward' | 'hint' | 'daily' | 'bonus';
  description: string;
  timestamp: number;
}

export type ThemeColor = 'purple' | 'cyan' | 'emerald' | 'crimson';

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number; // 0 to 1
  musicVolume: number; // 0 to 1
  vibrationEnabled: boolean;
  theme: ThemeColor;
  fontSize: 'normal' | 'large';
  showAndroidFrame: boolean;
}

export type HintType = 'SINGLE_LETTER' | 'FULL_WORD' | 'SMART_CLUE';
