import React from 'react';
import { Lightbulb, Key, HelpCircle, Coins, X } from 'lucide-react';
import { HintType } from '../types/game';
import { soundManager } from '../services/sound';

interface HintConfirmModalProps {
  hintType: HintType;
  coins: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const HINT_CONFIGS: Record<HintType, { title: string; cost: number; desc: string; icon: React.FC<{ className?: string }> }> = {
  SINGLE_LETTER: {
    title: "نمایش یک حرف تصادفی",
    cost: 30,
    desc: "یک حرف صحیح در یکی از خانه‌های خالی جدول آشکار می‌شود.",
    icon: Lightbulb,
  },
  FULL_WORD: {
    title: "حل کامل یک کلمه",
    cost: 80,
    desc: "یکی از کلمات باقی‌مانده به طور کامل در جدول حل می‌شود.",
    icon: Key,
  },
  SMART_CLUE: {
    title: "راهنمای هوشمند معنایی",
    cost: 50,
    desc: "معنی و سرنخ یکی از کلمات حل‌نشده به شما نشان داده می‌شود.",
    icon: HelpCircle,
  },
};

export const HintConfirmModal: React.FC<HintConfirmModalProps> = ({
  hintType,
  coins,
  onConfirm,
  onCancel,
}) => {
  const config = HINT_CONFIGS[hintType];
  const IconComponent = config.icon;
  const canAfford = coins >= config.cost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in select-none">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-purple-500/40 p-5 shadow-2xl space-y-4 text-center">
        {/* Header Icon */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-900/30">
          <IconComponent className="w-7 h-7" />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white">{config.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{config.desc}</p>
        </div>

        {/* Cost & Balance */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="text-slate-400">هزینه راهنما:</span>
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-mono tabular-nums">{config.cost} سکه</span>
          </div>
        </div>

        {!canAfford && (
          <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 p-2 rounded-lg">
            موجودی سکه شما کافی نیست! مراحل قبلی را بازی کنید تا سکه بگیرید.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-2">
          <button
            onClick={() => {
              if (canAfford) {
                soundManager.playHint();
                onConfirm();
              }
            }}
            disabled={!canAfford}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
              canAfford
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/40 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            تأیید و استفاده
          </button>
          <button
            onClick={() => {
              soundManager.playTap();
              onCancel();
            }}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold active:scale-95 transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};
