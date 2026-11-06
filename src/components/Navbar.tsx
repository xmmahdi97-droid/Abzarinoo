import React from 'react';
import { Volume2, VolumeX, Music, Music2, ArrowRight, Smartphone, Coins } from 'lucide-react';
import { GameScreen, GameSettings } from '../types/game';
import { soundManager } from '../services/sound';

interface NavbarProps {
  currentScreen: GameScreen;
  onNavigate: (screen: GameScreen) => void;
  coins: number;
  levelTitle?: string;
  levelNumber?: number;
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  coins,
  levelTitle,
  levelNumber,
  settings,
  onUpdateSettings,
}) => {
  const toggleSound = () => {
    const updated = !settings.soundEnabled;
    const newSettings = { ...settings, soundEnabled: updated };
    onUpdateSettings(newSettings);
    soundManager.updateSettings(updated, settings.musicEnabled, settings.soundVolume, settings.musicVolume);
    if (updated) soundManager.playTap();
  };

  const toggleMusic = () => {
    const updated = !settings.musicEnabled;
    const newSettings = { ...settings, musicEnabled: updated };
    onUpdateSettings(newSettings);
    soundManager.updateSettings(settings.soundEnabled, updated, settings.soundVolume, settings.musicVolume);
    if (settings.soundEnabled) soundManager.playTap();
  };

  const toggleFrame = () => {
    const newSettings = { ...settings, showAndroidFrame: !settings.showAndroidFrame };
    onUpdateSettings(newSettings);
    if (settings.soundEnabled) soundManager.playTap();
  };

  return (
    <header className="w-full max-w-xl mx-auto px-4 py-3 flex items-center justify-between z-30 select-none">
      {/* Right / Start: Back button or Brand logo */}
      <div className="flex items-center gap-2">
        {currentScreen !== 'HOME' ? (
          <button
            onClick={() => {
              soundManager.playTap();
              onNavigate('HOME');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-200 hover:text-white hover:border-purple-500/50 transition-colors text-xs font-medium"
            title="بازگشت به صفحه اصلی"
          >
            <ArrowRight className="w-4 h-4" />
            <span>منو</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-xs">
              DM
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-100 hidden sm:inline">
              DARK MIND
            </span>
          </div>
        )}

        {/* Level Title in Playing mode */}
        {currentScreen === 'PLAYING' && levelNumber && (
          <div className="flex items-center gap-1.5 text-xs text-purple-300 font-semibold bg-purple-950/40 border border-purple-500/30 px-2.5 py-1 rounded-lg">
            <span>مرحله {levelNumber}</span>
            {levelTitle && <span className="text-slate-400 font-normal hidden xs:inline">· {levelTitle}</span>}
          </div>
        )}
      </div>

      {/* Center: Coins readout */}
      <div 
        onClick={() => {
          soundManager.playCoin();
          onNavigate('STATS');
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-sm cursor-pointer hover:border-amber-400 transition-colors"
        title="موجودی سکه (مشاهده آمار و تاریخچه)"
      >
        <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="font-mono tabular-nums text-sm font-bold text-amber-300">
          {coins.toLocaleString('fa-IR')}
        </span>
      </div>

      {/* Left: Audio controls & Frame Toggle */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg transition-colors ${
            settings.soundEnabled
              ? 'text-purple-400 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/50'
              : 'text-slate-500 bg-slate-900/50 border border-slate-800'
          }`}
          title={settings.soundEnabled ? 'قطع افکت صوتی' : 'وصل افکت صوتی'}
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleMusic}
          className={`p-2 rounded-lg transition-colors ${
            settings.musicEnabled
              ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50'
              : 'text-slate-500 bg-slate-900/50 border border-slate-800'
          }`}
          title={settings.musicEnabled ? 'قطع موسیقی' : 'وصل موسیقی'}
        >
          {settings.musicEnabled ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleFrame}
          className={`p-2 rounded-lg transition-colors hidden md:flex ${
            settings.showAndroidFrame
              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
              : 'text-slate-400 bg-slate-900/50 border border-slate-800 hover:text-slate-200'
          }`}
          title={settings.showAndroidFrame ? 'حالت تمام صفحه' : 'شبیه‌ساز قاب گوشی اندروید'}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
