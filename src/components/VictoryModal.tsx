import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, ArrowLeft, MapPin, Coins, Sparkles } from 'lucide-react';
import { GameLevel } from '../types/game';
import { soundManager } from '../services/sound';

interface VictoryModalProps {
  level: GameLevel;
  starsEarned: number;
  rewardCoins: number;
  onNextLevel: () => void;
  onLevelMap: () => void;
  isLastLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  starsEarned,
  rewardCoins,
  onNextLevel,
  onLevelMap,
  isLastLevel,
}) => {
  useEffect(() => {
    soundManager.playVictory();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-purple-500/50 p-6 shadow-2xl space-y-5 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

        {/* Animated Trophy Icon */}
        <div className="relative inline-block">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-900/80 to-indigo-900/80 border border-purple-400/50 flex items-center justify-center text-amber-400 shadow-xl shadow-purple-950/50 animate-bounce">
            <Trophy className="w-10 h-10 drop-shadow-md" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300 animate-spin" />
        </div>

        {/* Victory Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white">مرحله تکمیل شد!</h2>
          <p className="text-xs text-purple-300 font-medium">
            مرحله {level.id} · {level.title}
          </p>
        </div>

        {/* Stars Display */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3].map((starIndex) => {
            const isEarned = starIndex <= starsEarned;
            return (
              <div
                key={starIndex}
                className={`transition-all duration-500 transform ${
                  isEarned ? 'scale-110 text-amber-400' : 'scale-90 text-slate-700'
                }`}
              >
                <Star
                  className={`w-9 h-9 ${
                    isEarned ? 'fill-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'fill-slate-800'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Reward Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/20 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">پاداش این مرحله:</span>
          <div className="flex items-center gap-1.5 text-base font-extrabold text-amber-300">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="font-mono tabular-nums">+{rewardCoins} سکه</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {!isLastLevel ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNextLevel();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-purple-900/40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>مرحله بعدی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 p-2.5 rounded-xl">
              تبریک! شما تمام ۵۰ مرحله بازی ذهن تاریک را با موفقیت تمام کردید!
            </div>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              onLevelMap();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>بازگشت به نقشه مراحل</span>
          </button>
        </div>
      </div>
    </div>
  );
};
