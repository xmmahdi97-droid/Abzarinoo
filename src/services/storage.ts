import { GameSettings, PlayerStats, LevelProgress, CoinTransaction } from '../types/game';

const STORAGE_KEYS = {
  COINS: 'darkmind_coins_v1',
  CURRENT_LEVEL: 'darkmind_current_level_v1',
  LEVEL_PROGRESS: 'darkmind_progress_v1',
  SETTINGS: 'darkmind_settings_v1',
  STATS: 'darkmind_stats_v1',
  TRANSACTIONS: 'darkmind_transactions_v1',
  DAILY_CLAIMED_DATE: 'darkmind_daily_date_v1',
};

export const defaultSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  soundVolume: 0.8,
  musicVolume: 0.4,
  vibrationEnabled: true,
  theme: 'purple',
  fontSize: 'normal',
  showAndroidFrame: false,
};

export const defaultStats: PlayerStats = {
  completedLevelsCount: 0,
  totalWordsFound: 0,
  wrongGuessesCount: 0,
  totalCoinsEarned: 150, // Starting bonus
  hintsUsedCount: 0,
  totalPlayTimeSeconds: 0,
  dailyStreak: 1,
  lastDailyDate: null,
};

export class GameStorage {
  public static getCoins(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COINS);
      return stored ? Math.max(0, parseInt(stored, 10)) : 150;
    } catch {
      return 150;
    }
  }

  public static setCoins(coins: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COINS, Math.max(0, coins).toString());
    } catch {
      // Storage unavailable fallback
    }
  }

  public static getCurrentLevel(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
      return stored ? Math.max(1, parseInt(stored, 10)) : 1;
    } catch {
      return 1;
    }
  }

  public static setCurrentLevel(levelId: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, levelId.toString());
    } catch {}
  }

  public static getProgressMap(): Record<number, LevelProgress> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEVEL_PROGRESS);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  public static saveLevelProgress(levelId: number, progress: Partial<LevelProgress>): LevelProgress {
    try {
      const all = this.getProgressMap();
      const current = all[levelId] || {
        levelId,
        completed: false,
        stars: 0,
        foundWords: [],
        revealedCells: [],
        hintsUsedCount: 0,
      };

      const updated: LevelProgress = {
        ...current,
        ...progress,
      };

      all[levelId] = updated;
      localStorage.setItem(STORAGE_KEYS.LEVEL_PROGRESS, JSON.stringify(all));
      return updated;
    } catch {
      return {
        levelId,
        completed: false,
        stars: 0,
        foundWords: [],
        revealedCells: [],
        hintsUsedCount: 0,
        ...progress,
      };
    }
  }

  public static getSettings(): GameSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  }

  public static saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {}
  }

  public static getStats(): PlayerStats {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      return stored ? { ...defaultStats, ...JSON.parse(stored) } : defaultStats;
    } catch {
      return defaultStats;
    }
  }

  public static saveStats(stats: PlayerStats): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch {}
  }

  public static getTransactions(): CoinTransaction[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public static addTransaction(transaction: Omit<CoinTransaction, 'id' | 'timestamp'>): void {
    try {
      const list = this.getTransactions();
      const newTx: CoinTransaction = {
        ...transaction,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
      };
      // Keep last 40 transactions
      const updated = [newTx, ...list].slice(0, 40);
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
    } catch {}
  }

  public static isDailyClaimedToday(): boolean {
    try {
      const last = localStorage.getItem(STORAGE_KEYS.DAILY_CLAIMED_DATE);
      const today = new Date().toISOString().split('T')[0];
      return last === today;
    } catch {
      return false;
    }
  }

  public static markDailyClaimed(): void {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEYS.DAILY_CLAIMED_DATE, today);
    } catch {}
  }

  public static resetAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    } catch {}
  }
}
