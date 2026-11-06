import React, { useState } from 'react';
import { Calendar, Flame, Trophy, Coins, CheckCircle, ArrowLeft } from 'lucide-react';
import { getTodayDailyPuzzle } from '../data/dailyChallenge';
import { GameStorage } from '../services/storage';
import { soundManager } from '../services/sound';
import { CrosswordGrid } from './CrosswordGrid';
import { LetterWheel } from './LetterWheel';
import confetti from 'canvas-confetti';

interface DailyChallengeModalProps {
  coins: number;
  onUpdateCoins: (newCoins: number) => void;
  onClose: () => void;
  vibrationEnabled: boolean;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  coins,
  onUpdateCoins,
  onClose,
  vibrationEnabled,
}) => {
  const isAlreadyClaimed = GameStorage.isDailyClaimedToday();
  const [dailyPuzzle] = useState(() => getTodayDailyPuzzle());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isCompletedToday, setIsCompletedToday] = useState(isAlreadyClaimed);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = GameStorage.getStats();

  const handleWordSubmit = (word: string) => {
    if (isCompletedToday) return;

    const targetWord = dailyPuzzle.words.find((w) => w.word === word);
    if (targetWord) {
      if (foundWords.includes(word)) {
        setToastMessage('این کلمه قبلاً پیدا شده است!');
        soundManager.playWordError();
        return;
      }

      soundManager.playWordSuccess();
      const nextFound = [...foundWords, word];
      setFoundWords(nextFound);

      if (nextFound.length === dailyPuzzle.words.length) {
        // Complete challenge!
        soundManager.playVictory();
        setIsCompletedToday(true);
        GameStorage.markDailyClaimed();

        // Increment streak & award coins
        const updatedStats = { ...stats };
        updatedStats.dailyStreak = (updatedStats.dailyStreak || 1) + 1;
        updatedStats.totalCoinsEarned += dailyPuzzle.rewardCoins;
        GameStorage.saveStats(updatedStats);

        const newBalance = coins + dailyPuzzle.rewardCoins;
        onUpdateCoins(newBalance);
        GameStorage.addTransaction({
          amount: dailyPuzzle.rewardCoins,
          type: 'daily',
          description: 'پاداش حل چالش روزانه',
        });

        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {}

        setToastMessage(`تبریک! چالش امروز حل شد (+${dailyPuzzle.rewardCoins} سکه)`);
      }
    } else {
      soundManager.playWordError();
      setToastMessage('کلمه در چالش امروز وجود ندارد');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-md mx-auto p-3 select-none text-right">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>{dailyPuzzle.title}</span>
            </h2>
            <p className="text-xs text-slate-400">معمای منحصر‌به‌فرد امروز برای افزایش روزهای متوالی</p>
          </div>
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            بستن
          </button>
        </div>

        {/* Streak and Reward Banner */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-950/60 to-slate-900 border border-orange-500/30 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-900/50 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">روزهای متوالی ورود</div>
              <div className="text-xs font-bold text-orange-200">
                {stats.dailyStreak} روز پیاپی
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-900/50 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400">پاداش امروز</div>
              <div className="text-xs font-bold text-cyan-200">
                +{dailyPuzzle.rewardCoins} سکه
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="my-1 p-2 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-200 text-xs font-bold text-center animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Crossword Grid / Completed Status */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-2">
        {isCompletedToday ? (
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-3 shadow-xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-black text-white">چالش امروز تکمیل شده است!</h3>
            <p className="text-xs text-slate-300">
              پاداش چالش روزانه را دریافت کرده‌اید. فردا برای چالش بعدی و حفظ رکورد بازگردید!
            </p>
          </div>
        ) : (
          <CrosswordGrid
            level={dailyPuzzle}
            foundWords={foundWords}
            revealedCells={[]}
            selectedWord=""
          />
        )}
      </div>

      {/* Wheel if not completed */}
      {!isCompletedToday && (
        <div className="w-full flex justify-center mt-2">
          <LetterWheel
            letters={dailyPuzzle.letters}
            onSubmitWord={handleWordSubmit}
            vibrationEnabled={vibrationEnabled}
          />
        </div>
      )}
    </div>
  );
};
