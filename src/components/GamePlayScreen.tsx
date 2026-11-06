import React, { useState, useEffect } from 'react';
import { Lightbulb, Key, HelpCircle, FastForward, Sparkles, AlertCircle } from 'lucide-react';
import { GameLevel, LevelProgress, HintType } from '../types/game';
import { CrosswordGrid } from './CrosswordGrid';
import { LetterWheel } from './LetterWheel';
import { HintConfirmModal, HINT_CONFIGS } from './HintConfirmModal';
import { VictoryModal } from './VictoryModal';
import { soundManager } from '../services/sound';
import { GameStorage } from '../services/storage';

interface GamePlayScreenProps {
  level: GameLevel;
  coins: number;
  onUpdateCoins: (newCoins: number) => void;
  onLevelCompleted: (levelId: number, stars: number) => void;
  onNextLevel: () => void;
  onOpenLevelMap: () => void;
  vibrationEnabled: boolean;
  isLastLevel: boolean;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  level,
  coins,
  onUpdateCoins,
  onLevelCompleted,
  onNextLevel,
  onOpenLevelMap,
  vibrationEnabled,
  isLastLevel,
}) => {
  const [progress, setProgress] = useState<LevelProgress>(() => {
    const map = GameStorage.getProgressMap();
    return (
      map[level.id] || {
        levelId: level.id,
        completed: false,
        stars: 0,
        foundWords: [],
        revealedCells: [],
        hintsUsedCount: 0,
      }
    );
  });

  const [activeHintType, setActiveHintType] = useState<HintType | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [smartClueText, setSmartClueText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [bonusWordsFound, setBonusWordsFound] = useState<string[]>([]);

  // Sync state if level changes
  useEffect(() => {
    const map = GameStorage.getProgressMap();
    const currentProgress = map[level.id] || {
      levelId: level.id,
      completed: false,
      stars: 0,
      foundWords: [],
      revealedCells: [],
      hintsUsedCount: 0,
    };
    setProgress(currentProgress);
    setShowVictory(false);
    setSmartClueText(null);
    setBonusWordsFound([]);
  }, [level.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleWordSubmit = (word: string) => {
    if (!word || word.length < 2) return;

    // 1. Check if word is one of the main target words
    const targetWordObj = level.words.find((w) => w.word === word);
    if (targetWordObj) {
      if (progress.foundWords.includes(word)) {
        showToast('این کلمه را قبلاً پیدا کرده‌اید!');
        soundManager.playWordError();
        return;
      }

      // Valid new word found!
      soundManager.playWordSuccess();
      const updatedFound = [...progress.foundWords, word];
      const isAllFound = updatedFound.length === level.words.length;

      const updatedProgress: LevelProgress = {
        ...progress,
        foundWords: updatedFound,
        completed: isAllFound ? true : progress.completed,
      };

      setProgress(updatedProgress);
      GameStorage.saveLevelProgress(level.id, updatedProgress);

      // Update player total words stats
      const stats = GameStorage.getStats();
      stats.totalWordsFound += 1;
      GameStorage.saveStats(stats);

      if (isAllFound) {
        // Calculate stars based on hint count
        let stars = 3;
        if (progress.hintsUsedCount >= 3) stars = 1;
        else if (progress.hintsUsedCount >= 1) stars = 2;

        updatedProgress.stars = Math.max(updatedProgress.stars, stars);
        GameStorage.saveLevelProgress(level.id, updatedProgress);

        // Add coins reward
        const newBalance = coins + level.rewardCoins;
        onUpdateCoins(newBalance);
        GameStorage.addTransaction({
          amount: level.rewardCoins,
          type: 'reward',
          description: `پاداش تکمیل مرحله ${level.id}`,
        });

        stats.completedLevelsCount = Math.max(stats.completedLevelsCount, level.id);
        stats.totalCoinsEarned += level.rewardCoins;
        GameStorage.saveStats(stats);

        onLevelCompleted(level.id, stars);
        setTimeout(() => {
          setShowVictory(true);
        }, 600);
      }
      return;
    }

    // 2. Check if word is a bonus word
    if (level.bonusWords && level.bonusWords.includes(word)) {
      if (bonusWordsFound.includes(word)) {
        showToast('کلمه امتیازی تکراری است!');
      } else {
        setBonusWordsFound((prev) => [...prev, word]);
        soundManager.playCoin();
        const bonusCoins = 10;
        onUpdateCoins(coins + bonusCoins);
        GameStorage.addTransaction({
          amount: bonusCoins,
          type: 'bonus',
          description: `کلمه امتیازی "${word}" در مرحله ${level.id}`,
        });
        showToast(`کلمه امتیازی پیدا شد! (+${bonusCoins} سکه)`);
      }
      return;
    }

    // 3. Word is invalid
    soundManager.playWordError();
    showToast('کلمه نامعتبر است');
    const stats = GameStorage.getStats();
    stats.wrongGuessesCount += 1;
    GameStorage.saveStats(stats);
  };

  // Execute Hint after confirmation
  const handleApplyHint = () => {
    if (!activeHintType) return;
    const config = HINT_CONFIGS[activeHintType];
    if (coins < config.cost) return;

    // Deduct coins
    const newCoins = coins - config.cost;
    onUpdateCoins(newCoins);
    GameStorage.addTransaction({
      amount: -config.cost,
      type: 'hint',
      description: `استفاده از ${config.title} در مرحله ${level.id}`,
    });

    // Update hints used stat
    const stats = GameStorage.getStats();
    stats.hintsUsedCount += 1;
    GameStorage.saveStats(stats);

    const hintsCount = progress.hintsUsedCount + 1;

    if (activeHintType === 'SINGLE_LETTER') {
      // Find all cells that are not revealed yet
      const unrevealedCells: string[] = [];
      level.words.forEach((w) => {
        if (!progress.foundWords.includes(w.word)) {
          const chars = Array.from(w.word);
          chars.forEach((_, idx) => {
            const r = w.direction === 'across' ? w.row : w.row + idx;
            const c = w.direction === 'across' ? w.col + idx : w.col;
            const key = `${r},${c}`;
            if (!progress.revealedCells.includes(key)) {
              unrevealedCells.push(key);
            }
          });
        }
      });

      if (unrevealedCells.length > 0) {
        const randomKey = unrevealedCells[Math.floor(Math.random() * unrevealedCells.length)];
        const updatedCells = [...progress.revealedCells, randomKey];
        const updatedProgress = {
          ...progress,
          revealedCells: updatedCells,
          hintsUsedCount: hintsCount,
        };
        setProgress(updatedProgress);
        GameStorage.saveLevelProgress(level.id, updatedProgress);
        showToast('یک حرف در جدول آشکار شد!');
      } else {
        showToast('تمام خانه‌ها آشکار هستند!');
      }
    } else if (activeHintType === 'FULL_WORD') {
      // Find an unsolved word
      const unsolved = level.words.filter((w) => !progress.foundWords.includes(w.word));
      if (unsolved.length > 0) {
        const wordToSolve = unsolved[0].word;
        handleWordSubmit(wordToSolve);
        showToast(`کلمه "${wordToSolve}" در جدول ثبت شد!`);
      }
    } else if (activeHintType === 'SMART_CLUE') {
      // Find an unsolved word and show clue
      const unsolved = level.words.filter((w) => !progress.foundWords.includes(w.word));
      if (unsolved.length > 0) {
        setSmartClueText(`سرنخ کلمه: «${unsolved[0].clue}» (${unsolved[0].word.length} حرف)`);
        const updatedProgress = {
          ...progress,
          hintsUsedCount: hintsCount,
        };
        setProgress(updatedProgress);
        GameStorage.saveLevelProgress(level.id, updatedProgress);
      }
    }

    setActiveHintType(null);
  };

  const handleSkipLevel = () => {
    soundManager.playTap();
    const skipCost = 100;
    if (coins < skipCost) {
      showToast('برای رد کردن مرحله به ۱۰۰ سکه نیاز دارید!');
      return;
    }
    onUpdateCoins(coins - skipCost);
    GameStorage.addTransaction({
      amount: -skipCost,
      type: 'hint',
      description: `رد کردن مرحله ${level.id}`,
    });
    onLevelCompleted(level.id, 1);
    onNextLevel();
  };

  const remainingWordsCount = level.words.length - progress.foundWords.length;

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center max-w-md mx-auto select-none px-3 relative overflow-hidden">
      {/* Toast alert overlay */}
      {toastMessage && (
        <div className="absolute top-2 z-40 px-4 py-2 rounded-xl bg-purple-950/90 border border-purple-400 text-white text-xs font-bold shadow-xl animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Smart Clue Banner (if revealed) */}
      {smartClueText && (
        <div className="w-full mx-auto my-1 p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-medium text-center flex items-center justify-center gap-2 animate-in fade-in">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{smartClueText}</span>
        </div>
      )}

      {/* Top Crossword Matrix */}
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[220px]">
        <CrosswordGrid
          level={level}
          foundWords={progress.foundWords}
          revealedCells={progress.revealedCells}
          selectedWord=""
        />
      </div>

      {/* Hints & Actions Toolbar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 my-1 bg-slate-950/70 border border-purple-500/20 rounded-2xl">
        {/* Remaining words counter */}
        <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
          <span>باقی‌مانده:</span>
          <span className="text-purple-400 font-mono tabular-nums text-xs">
            {remainingWordsCount} کلمه
          </span>
        </div>

        {/* 3 Hint Buttons */}
        <div className="flex items-center gap-2">
          {/* Hint 1: Single letter */}
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveHintType('SINGLE_LETTER');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:border-purple-400 text-[11px] font-bold active:scale-95 transition-all"
            title="نمایش یک حرف (۳۰ سکه)"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono tabular-nums">۳۰</span>
          </button>

          {/* Hint 2: Full word */}
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveHintType('FULL_WORD');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 hover:border-indigo-400 text-[11px] font-bold active:scale-95 transition-all"
            title="حل یک کلمه (۸۰ سکه)"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono tabular-nums">۸۰</span>
          </button>

          {/* Hint 3: Smart Clue */}
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveHintType('SMART_CLUE');
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 hover:border-cyan-400 text-[11px] font-bold active:scale-95 transition-all"
            title="سرنخ کلمه (۵۰ سکه)"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono tabular-nums">۵۰</span>
          </button>

          {/* Skip level button */}
          <button
            onClick={handleSkipLevel}
            className="p-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
            title="رد کردن مرحله (۱۰۰ سکه)"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Letter Wheel with touch drag gesture and tap fallback */}
      <div className="w-full flex justify-center mt-1">
        <LetterWheel
          letters={level.letters}
          onSubmitWord={handleWordSubmit}
          vibrationEnabled={vibrationEnabled}
        />
      </div>

      {/* Confirmation Modal for Hint */}
      {activeHintType && (
        <HintConfirmModal
          hintType={activeHintType}
          coins={coins}
          onConfirm={handleApplyHint}
          onCancel={() => setActiveHintType(null)}
        />
      )}

      {/* Victory Celebration Modal */}
      {showVictory && (
        <VictoryModal
          level={level}
          starsEarned={progress.stars || 3}
          rewardCoins={level.rewardCoins}
          onNextLevel={onNextLevel}
          onLevelMap={onOpenLevelMap}
          isLastLevel={isLastLevel}
        />
      )}
    </div>
  );
};
