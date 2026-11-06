import React, { useState } from 'react';
import { Settings, Volume2, Music, Vibrate, Palette, Type, HelpCircle, Info, RotateCcw, AlertTriangle, Check } from 'lucide-react';
import { GameSettings, ThemeColor } from '../types/game';
import { GameStorage } from '../services/storage';
import { soundManager } from '../services/sound';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
  onClose: () => void;
  onResetComplete: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onResetComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'guide' | 'about'>('settings');
  const [showResetConfirmStep1, setShowResetConfirmStep1] = useState(false);
  const [showResetConfirmStep2, setShowResetConfirmStep2] = useState(false);

  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: next };
    onUpdateSettings(updated);
    soundManager.updateSettings(next, settings.musicEnabled, settings.soundVolume, settings.musicVolume);
    if (next) soundManager.playTap();
  };

  const handleMusicToggle = () => {
    const next = !settings.musicEnabled;
    const updated = { ...settings, musicEnabled: next };
    onUpdateSettings(updated);
    soundManager.updateSettings(settings.soundEnabled, next, settings.soundVolume, settings.musicVolume);
    if (settings.soundEnabled) soundManager.playTap();
  };

  const handleVolumeChange = (type: 'sound' | 'music', val: number) => {
    const updated = type === 'sound' 
      ? { ...settings, soundVolume: val } 
      : { ...settings, musicVolume: val };
    onUpdateSettings(updated);
    soundManager.updateSettings(
      updated.soundEnabled,
      updated.musicEnabled,
      updated.soundVolume,
      updated.musicVolume
    );
  };

  const handleThemeChange = (theme: ThemeColor) => {
    soundManager.playTap();
    onUpdateSettings({ ...settings, theme });
  };

  const handleFontSizeChange = (fontSize: 'normal' | 'large') => {
    soundManager.playTap();
    onUpdateSettings({ ...settings, fontSize });
  };

  const handleFinalReset = () => {
    soundManager.playWordError();
    GameStorage.resetAllData();
    setShowResetConfirmStep1(false);
    setShowResetConfirmStep2(false);
    onResetComplete();
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-md mx-auto p-3 select-none text-right">
      {/* Header & Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              <span>تنظیمات بازی</span>
            </h2>
            <p className="text-xs text-slate-400">شخصی‌سازی تجربه صوتی، بصری و داده‌ها</p>
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

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-purple-900/60 text-purple-200' : 'text-slate-400'
            }`}
          >
            تنظیمات
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeTab === 'guide' ? 'bg-purple-900/60 text-purple-200' : 'text-slate-400'
            }`}
          >
            راهنمای بازی
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              activeTab === 'about' ? 'bg-purple-900/60 text-purple-200' : 'text-slate-400'
            }`}
          >
            درباره بازی
          </button>
        </div>
      </div>

      {/* Tab 1: Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-3 my-3 max-h-[360px] overflow-y-auto p-1 text-xs">
          {/* Sound FX Toggle & Volume */}
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span>افکت‌های صوتی بازی</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={handleSoundToggle}
                className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
              />
            </div>
            {settings.soundEnabled && (
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-slate-400">شدت افکت:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) => handleVolumeChange('sound', parseFloat(e.target.value))}
                  className="flex-1 accent-purple-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Music Toggle & Volume */}
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <Music className="w-4 h-4 text-cyan-400" />
                <span>موسیقی متن مرموز و آرام</span>
              </div>
              <input
                type="checkbox"
                checked={settings.musicEnabled}
                onChange={handleMusicToggle}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>
            {settings.musicEnabled && (
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-slate-400">شدت موسیقی:</span>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={settings.musicVolume}
                  onChange={(e) => handleVolumeChange('music', parseFloat(e.target.value))}
                  className="flex-1 accent-cyan-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Haptic Vibration */}
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Vibrate className="w-4 h-4 text-indigo-400" />
              <span>لرزش گوشی هنگام اتصال حروف</span>
            </div>
            <input
              type="checkbox"
              checked={settings.vibrationEnabled}
              onChange={() => {
                const next = !settings.vibrationEnabled;
                onUpdateSettings({ ...settings, vibrationEnabled: next });
              }}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

          {/* Theme Selector */}
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>تم رنگی نئون</span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { id: 'purple', label: 'بنفش', color: 'bg-purple-600' },
                { id: 'cyan', label: 'آبی نئون', color: 'bg-cyan-500' },
                { id: 'emerald', label: 'زمردی', color: 'bg-emerald-500' },
                { id: 'crimson', label: 'زرشکی', color: 'bg-rose-600' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id as ThemeColor)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    settings.theme === t.id
                      ? 'border-purple-400 bg-slate-800'
                      : 'border-slate-800 bg-slate-950/60 opacity-60'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${t.color}`} />
                  <span className="text-[10px] text-slate-300 font-semibold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Type className="w-4 h-4 text-cyan-300" />
              <span>اندازه متن جدول</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleFontSizeChange('normal')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  settings.fontSize === 'normal'
                    ? 'bg-purple-900/70 text-purple-200 border border-purple-500/40'
                    : 'text-slate-400 bg-slate-950'
                }`}
              >
                استاندارد
              </button>
              <button
                onClick={() => handleFontSizeChange('large')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  settings.fontSize === 'large'
                    ? 'bg-purple-900/70 text-purple-200 border border-purple-500/40'
                    : 'text-slate-400 bg-slate-950'
                }`}
              >
                درشت
              </button>
            </div>
          </div>

          {/* Two-step Reset Progress */}
          <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-300 font-bold">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>بازنشانی کل اطلاعات بازی</span>
              </div>
              <button
                onClick={() => setShowResetConfirmStep1(true)}
                className="px-2.5 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold"
              >
                ریست داده‌ها
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              پاک‌سازی مراحل باز شده، سکه‌ها و آمار با تأیید دو مرحله‌ای
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Game Guide */}
      {activeTab === 'guide' && (
        <div className="space-y-3 my-3 max-h-[360px] overflow-y-auto p-2 text-xs leading-relaxed text-slate-300">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1.5">
            <h4 className="font-bold text-purple-300">۱. چطور کلمات را پیدا کنیم؟</h4>
            <p className="text-slate-400">
              در پایین صفحه، دایره حروف قرار دارد. انگشت خود را روی حرف اول گذاشته و بدون برداشتن انگشت، روی حروف بعدی بکشید تا کلمه ساخته شود. سپس انگشت خود را بردارید تا کلمه به طور خودکار بررسی شود.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1.5">
            <h4 className="font-bold text-cyan-300">۲. لمس تک‌تک حروف (روش دوم)</h4>
            <p className="text-slate-400">
              اگر ترجیح می‌دهید به جای کشیدن انگشت، حروف را یک‌به‌یک لمس کنید، روی هر حرف کلیک کنید و در انتها دکمه سبز «تأیید کلمه» را بزنید.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1.5">
            <h4 className="font-bold text-amber-300">۳. انواع راهنما</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>لامپ (۳۰ سکه):</strong> نمایش یک حرف در یکی از خانه‌های خالی.</li>
              <li><strong>کلید (۸۰ سکه):</strong> حل کامل یکی از کلمات سخت.</li>
              <li><strong>علامت سوال (۵۰ سکه):</strong> نمایش سرنخ و معنی کلمه.</li>
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/20 space-y-1.5">
            <h4 className="font-bold text-emerald-300">۴. کلمات امتیازی پنهان</h4>
            <p className="text-slate-400">
              برخی مراحل دارای کلمات امتیازی اضافه هستند که در جدول اصلی نیستند اما کلمات معتبر فارسی می‌باشند. پیدا کردن آن‌ها ۱۰ سکه اضافی جایزه می‌دهد!
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: About */}
      {activeTab === 'about' && (
        <div className="space-y-3 my-3 max-h-[360px] overflow-y-auto p-2 text-xs leading-relaxed text-slate-300 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 text-lg font-black shadow-xl">
            DM
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-white">ذهن تاریک | DARK MIND</h3>
            <p className="text-xs text-purple-300 font-semibold">نسخه ۱.۰.۰</p>
          </div>

          <p className="text-slate-400 text-xs px-3">
            بازی فکری دوبعدی جدول کلمات فارسی، حدس کلمه و حل معما با ۵۰ مرحله از پیش طراحی‌شده و دیتابیس کاملاً آفلاین. بدون نیاز به اینترنت و بدون نیاز به ثبت‌نام.
          </p>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1 text-right">
            <div>• موتور صوتی: پردازش سینت سایزر وب‌صوت (Web Audio API)</div>
            <div>• فونت اصلی: وزیرمتن (Vazirmatn)</div>
            <div>• خروجی اندروید: کاتلین، Jetpack Compose و Room</div>
            <div>• طراحی: دارک پریمیوم و نئون گلاسمورفیسم</div>
          </div>
        </div>
      )}

      {/* Step 1 Reset Confirmation Modal */}
      {showResetConfirmStep1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-rose-500/50 p-5 space-y-3 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-base font-bold text-white">آیا از بازنشانی داده‌ها مطمئن هستید؟</h3>
            <p className="text-xs text-slate-300">
              این کار پیشرفت شما در تمام مراحل و سکه‌ها را پاک خواهد کرد.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowResetConfirmStep1(false);
                  setShowResetConfirmStep2(true);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                بله، مرحله بعد
              </button>
              <button
                onClick={() => setShowResetConfirmStep1(false)}
                className="py-2 px-4 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 Reset Confirmation Modal */}
      {showResetConfirmStep2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="w-full max-w-sm rounded-2xl bg-rose-950 border border-rose-500 p-5 space-y-3 text-center">
            <AlertTriangle className="w-12 h-12 text-rose-300 mx-auto animate-bounce" />
            <h3 className="text-base font-black text-white">تأیید نهایی و قطعی!</h3>
            <p className="text-xs text-rose-200">
              با زدن این دکمه، بازی به روز اول بازمی‌گردد و تمام سکه‌ها و مراحل ریست می‌شوند.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleFinalReset}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-950/60"
              >
                تأیید نهایی و پاک‌سازی
              </button>
              <button
                onClick={() => setShowResetConfirmStep2(false)}
                className="py-2 px-4 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
