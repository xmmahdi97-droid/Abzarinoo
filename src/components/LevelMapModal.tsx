import React, { useState } from 'react';
import { Star, Lock, CheckCircle2, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { GAME_LEVELS } from '../data/levels';
import { GameStorage } from '../services/storage';
import { soundManager } from '../services/sound';

interface LevelMapModalProps {
  currentLevelId: number;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

const CHAPTERS = [
  { id: 1, title: "فصل ۱: آموزشی و ساده", start: 1, end: 5, difficulty: "ساده" },
  { id: 2, title: "فصل ۲: متوسط", start: 6, end: 15, difficulty: "متوسط" },
  { id: 3, title: "فصل ۳: سخت و تفکرانگیز", start: 16, end: 30, difficulty: "سخت" },
  { id: 4, title: "فصل ۴: بسیار سخت", start: 31, end: 40, difficulty: "بسیار سخت" },
  { id: 5, title: "فصل ۵: نبرد نهایی و فوق‌سخت", start: 41, end: 50, difficulty: "فوق‌سخت" },
];

export const LevelMapModal: React.FC<LevelMapModalProps> = ({
  currentLevelId,
  onSelectLevel,
  onClose,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<number>(() => {
    // Select chapter corresponding to currentLevelId
    const found = CHAPTERS.find((c) => currentLevelId >= c.start && currentLevelId <= c.end);
    return found ? found.id : 1;
  });

  const progressMap = GameStorage.getProgressMap();
  const currentChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];
  const chapterLevels = GAME_LEVELS.filter(
    (l) => l.id >= currentChapter.start && l.id <= currentChapter.end
  );

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    const prev = progressMap[levelId - 1];
    return !!prev && prev.completed;
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-md mx-auto p-3 select-none text-right">
      {/* Header & Chapter Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>نقشه ۵۰ مرحله</span>
            </h2>
            <p className="text-xs text-slate-400">یک مرحله باز شده را برای بازی انتخاب کنید</p>
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

        {/* Chapter Switcher Tabs */}
        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-slate-900 border border-purple-500/20">
          <button
            disabled={activeChapterId <= 1}
            onClick={() => {
              soundManager.playTap();
              setActiveChapterId((prev) => Math.max(1, prev - 1));
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="text-xs font-black text-purple-300">{currentChapter.title}</div>
            <div className="text-[10px] text-slate-400">
              مراحل {currentChapter.start} تا {currentChapter.end} · سطح {currentChapter.difficulty}
            </div>
          </div>

          <button
            disabled={activeChapterId >= CHAPTERS.length}
            onClick={() => {
              soundManager.playTap();
              setActiveChapterId((prev) => Math.min(CHAPTERS.length, prev + 1));
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Levels Grid for Current Chapter */}
      <div className="grid grid-cols-5 gap-2.5 my-4 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 max-h-[380px] overflow-y-auto">
        {chapterLevels.map((lvl) => {
          const unlocked = isLevelUnlocked(lvl.id);
          const prog = progressMap[lvl.id];
          const isCompleted = prog && prog.completed;
          const stars = prog ? prog.stars : 0;
          const isCurrent = lvl.id === currentLevelId;

          return (
            <button
              key={lvl.id}
              disabled={!unlocked}
              onClick={() => {
                if (unlocked) {
                  soundManager.playTap();
                  onSelectLevel(lvl.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-gradient-to-tr from-purple-700 to-indigo-600 border-purple-300 shadow-lg shadow-purple-900/50 scale-105 animate-pulse'
                  : isCompleted
                  ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                  : unlocked
                  ? 'bg-slate-900 border-purple-500/30 text-slate-200 hover:border-purple-400 active:scale-95'
                  : 'bg-slate-950/60 border-slate-900 text-slate-700 cursor-not-allowed'
              }`}
            >
              {/* Level Number */}
              <span className="text-base font-black font-mono tabular-nums">
                {lvl.id}
              </span>

              {/* Status Indicator */}
              <div className="mt-1 flex items-center justify-center h-4">
                {isCompleted ? (
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-2.5 h-2.5 ${
                          s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                ) : unlocked ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chapter Overview Footer */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>مجموع کل: ۵۰ مرحله کلمات فارسی</span>
        <span className="text-purple-300 font-bold">بدون نیاز به اینترنت</span>
      </div>
    </div>
  );
};
