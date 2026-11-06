import React from 'react';
import { BarChart3, Trophy, CheckCircle, XCircle, Flame, Clock, Lightbulb, Coins, History } from 'lucide-react';
import { GameStorage } from '../services/storage';
import { soundManager } from '../services/sound';

interface StatsModalProps {
  onClose: () => void;
  coins: number;
}

export const StatsModal: React.FC<StatsModalProps> = ({ onClose, coins }) => {
  const stats = GameStorage.getStats();
  const transactions = GameStorage.getTransactions();
  const progressMap = GameStorage.getProgressMap();

  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const progressPercent = Math.round((completedCount / 50) * 100);

  // Format play time
  const minutes = Math.floor(stats.totalPlayTimeSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  const playTimeString = hours > 0 ? `${hours} ساعت و ${remainingMins} دقیقه` : `${minutes} دقیقه`;

  const statCards = [
    {
      title: "مراحل تکمیل‌شده",
      value: `${completedCount} از ۵۰`,
      sub: `${progressPercent}٪ پیشرفت`,
      icon: Trophy,
      color: "text-purple-400 bg-purple-950/50 border-purple-500/30",
    },
    {
      title: "کلمات کشف‌شده",
      value: stats.totalWordsFound.toLocaleString('fa-IR'),
      sub: "کلمات صحیح در جداول",
      icon: CheckCircle,
      color: "text-emerald-400 bg-emerald-950/50 border-emerald-500/30",
    },
    {
      title: "پاسخ‌های اشتباه",
      value: stats.wrongGuessesCount.toLocaleString('fa-IR'),
      sub: "تلاش‌های ناموفق",
      icon: XCircle,
      color: "text-rose-400 bg-rose-950/50 border-rose-800/40",
    },
    {
      title: "مجموع سکه کسب‌شده",
      value: stats.totalCoinsEarned.toLocaleString('fa-IR'),
      sub: `موجودی فعلی: ${coins.toLocaleString('fa-IR')}`,
      icon: Coins,
      color: "text-amber-400 bg-amber-950/50 border-amber-500/30",
    },
    {
      title: "راهنماهای مصرف‌شده",
      value: stats.hintsUsedCount.toLocaleString('fa-IR'),
      sub: "حرف، کلمه و سرنخ",
      icon: Lightbulb,
      color: "text-indigo-400 bg-indigo-950/50 border-indigo-500/30",
    },
    {
      title: "رکورد ورود پیاپی",
      value: `${stats.dailyStreak} روز`,
      sub: "زنجیره استریک فعال",
      icon: Flame,
      color: "text-orange-400 bg-orange-950/50 border-orange-500/30",
    },
    {
      title: "کل زمان بازی",
      value: playTimeString,
      sub: "تمرکز و تقویت ذهن",
      icon: Clock,
      color: "text-cyan-400 bg-cyan-950/50 border-cyan-500/30",
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-md mx-auto p-3 select-none text-right">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="space-y-0.5">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>کارنامه و آمار بازیکن</span>
          </h2>
          <p className="text-xs text-slate-400">گزارش جامع دستاوردهای شما در ذهن تاریک</p>
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

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 my-3 max-h-[300px] overflow-y-auto p-1">
        {statCards.map((c, i) => {
          const IconComp = c.icon;
          return (
            <div
              key={i}
              className={`p-3 rounded-2xl border flex flex-col justify-between ${c.color} ${
                i === 0 ? 'col-span-2 flex-row items-center' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center">
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-slate-300">{c.title}</div>
              </div>
              <div className={i === 0 ? 'text-left' : 'mt-2'}>
                <div className="text-base font-black font-mono tabular-nums text-white">
                  {c.value}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{c.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction History Section */}
      <div className="space-y-2 mt-auto">
        <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <History className="w-4 h-4 text-amber-400" />
          <span>تراکنش‌های اخیر سکه</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 max-h-32 overflow-y-auto space-y-1.5">
          {transactions.length === 0 ? (
            <div className="text-[11px] text-slate-500 text-center py-2">
              هنوز تراکنشی ثبت نشده است
            </div>
          ) : (
            transactions.slice(0, 8).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between text-[11px] py-1 border-b border-slate-900 last:border-none"
              >
                <span className="text-slate-300 truncate max-w-[200px]">
                  {tx.description}
                </span>
                <span
                  className={`font-mono font-bold tabular-nums ${
                    tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount} سکه
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
