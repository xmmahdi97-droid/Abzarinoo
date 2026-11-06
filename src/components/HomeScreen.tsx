import React from 'react';
import { Play, MapPin, Calendar, BarChart3, Settings, Code, Sparkles, Trophy, Download } from 'lucide-react';
import { GameScreen } from '../types/game';
import { soundManager } from '../services/sound';

interface HomeScreenProps {
  onNavigate: (screen: GameScreen) => void;
  currentLevel: number;
  completedCount: number;
  totalLevels: number;
  coins: number;
  hasDailyCompleted: boolean;
  onInstallClick?: () => void;
  isInstallable?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  currentLevel,
  completedCount,
  totalLevels,
  coins,
  hasDailyCompleted,
  onInstallClick,
  isInstallable
}) => {
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  const handleAction = (screen: GameScreen) => {
    soundManager.playTap();
    onNavigate(screen);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center px-4 py-4 max-w-md mx-auto text-center select-none">
      {/* Top Header / Logo Section */}
      <div className="w-full flex flex-col items-center mt-2 space-y-3">
        {/* Glowing Logo Icon */}
        <div className="relative group cursor-pointer" onClick={() => soundManager.playWordSuccess()}>
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-2xl bg-slate-900 border border-purple-500/50 flex flex-col items-center justify-center p-2 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="w-6 h-6 rounded bg-purple-950/80 border border-purple-400/60 flex items-center justify-center text-xs font-black text-purple-200">
                ذ
              </div>
              <div className="w-6 h-6 rounded bg-purple-950/80 border border-purple-400/60 flex items-center justify-center text-xs font-black text-purple-200">
                هـ
              </div>
              <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-xs font-black text-cyan-200">
                ن
              </div>
              <div className="w-6 h-6 rounded bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-xs font-black text-cyan-200">
                ت
              </div>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase">DARK MIND</span>
          </div>
        </div>

        {/* Title Lockup */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>ذهـن تاریک</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 font-normal">
              PRO
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            جدول کلمات فارسی و معماهای ذهن در دنیای تاریک
          </p>
        </div>

        {/* Overall Progress & Coins Strip */}
        <div className="w-full glass-panel rounded-2xl p-3 flex items-center justify-between border border-purple-500/20 shadow-lg">
          <div className="flex items-center gap-2.5 text-right">
            <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">پیشرفت کل</div>
              <div className="text-xs font-bold text-slate-200">
                {completedCount} از {totalLevels} مرحله ({progressPercent}٪)
              </div>
            </div>
          </div>

          {/* Mini progress bar */}
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="w-full space-y-2.5 my-4">
        {/* Primary CTA: Start / Continue Game */}
        <button
          onClick={() => handleAction('PLAYING')}
          className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 p-[1.5px] shadow-lg shadow-purple-900/30 active:scale-[0.98] transition-transform"
        >
          <div className="relative flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-slate-950/80 group-hover:bg-slate-950/60 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-purple-300" />
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-white">
                {completedCount > 0 ? `ادامه بازی (مرحله ${currentLevel})` : 'شروع بازی (مرحله ۱)'}
              </div>
              <div className="text-[11px] text-purple-200/80">
                ورود به معما و جدول کلمات
              </div>
            </div>
          </div>
        </button>

        {/* Secondary Grid Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Level Map */}
          <button
            onClick={() => handleAction('LEVEL_MAP')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 active:scale-95 transition-all text-right"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">انتخاب مرحله</div>
              <div className="text-[10px] text-slate-400">۵۰ مرحله طراحی‌شده</div>
            </div>
          </button>

          {/* Daily Challenge */}
          <button
            onClick={() => handleAction('DAILY_CHALLENGE')}
            className="relative flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 active:scale-95 transition-all text-right"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">چالش روزانه</div>
              <div className="text-[10px] text-slate-400">
                {hasDailyCompleted ? 'تکمیل شده' : 'پاداش ۱۲۰ سکه'}
              </div>
            </div>
            {!hasDailyCompleted && (
              <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>

          {/* Player Statistics */}
          <button
            onClick={() => handleAction('STATS')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 active:scale-95 transition-all text-right"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">آمار بازیکن</div>
              <div className="text-[10px] text-slate-400">کلمات و رکوردها</div>
            </div>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleAction('SETTINGS')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-600 active:scale-95 transition-all text-right"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100">تنظیمات</div>
              <div className="text-[10px] text-slate-400">صدا، تم و راهنما</div>
            </div>
          </button>
        </div>

        {/* Android Source Code & APK Export CTA */}
        <button
          onClick={() => handleAction('ANDROID_EXPORT')}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-950/50 via-slate-900/90 to-cyan-950/50 border border-purple-500/30 hover:border-purple-400/60 transition-colors text-right"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-200">
                سورس اندروید و ساخت APK
              </div>
              <div className="text-[10px] text-slate-400">
                پروژه کامل Kotlin Jetpack Compose + Room
              </div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
            مشاهده سورس
          </span>
        </button>

        {/* PWA Install Button on Android if applicable */}
        {isInstallable && onInstallClick && (
          <button
            onClick={onInstallClick}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>نصب مستقیم اپلیکیشن روی گوشی (آفلاین بدون اینترنت)</span>
          </button>
        )}
      </div>

      {/* Footer Info */}
      <footer className="w-full pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80">
        <span>نسخه ۱.۰.۰ · کاملاً آفلاین</span>
        <span>استودیو بازی‌سازی دارک مایند</span>
      </footer>
    </div>
  );
};
