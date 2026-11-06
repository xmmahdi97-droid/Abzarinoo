import React, { useState, useEffect } from 'react';
import { GameScreen, GameSettings } from './types/game';
import { GAME_LEVELS, getLevelById } from './data/levels';
import { GameStorage } from './services/storage';
import { soundManager } from './services/sound';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { GamePlayScreen } from './components/GamePlayScreen';
import { LevelMapModal } from './components/LevelMapModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { StatsModal } from './components/StatsModal';
import { SettingsModal } from './components/SettingsModal';
import { AndroidExportModal } from './components/AndroidExportModal';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('HOME');
  const [currentLevelId, setCurrentLevelId] = useState<number>(() => GameStorage.getCurrentLevel());
  const [coins, setCoins] = useState<number>(() => GameStorage.getCoins());
  const [settings, setSettings] = useState<GameSettings>(() => GameStorage.getSettings());
  const [, setRerenderTrigger] = useState(0);

  const { isInstallable, install } = usePWAInstall();

  // Initialize Sound Settings on mount
  useEffect(() => {
    soundManager.updateSettings(
      settings.soundEnabled,
      settings.musicEnabled,
      settings.soundVolume,
      settings.musicVolume
    );
  }, []);

  // Track playtime
  useEffect(() => {
    const timer = setInterval(() => {
      const stats = GameStorage.getStats();
      stats.totalPlayTimeSeconds = (stats.totalPlayTimeSeconds || 0) + 5;
      GameStorage.saveStats(stats);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateCoins = (newBalance: number) => {
    setCoins(newBalance);
    GameStorage.setCoins(newBalance);
  };

  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    GameStorage.saveSettings(newSettings);
  };

  const handleLevelCompleted = (levelId: number, stars: number) => {
    const nextLevelId = Math.min(50, levelId + 1);
    setCurrentLevelId(nextLevelId);
    GameStorage.setCurrentLevel(nextLevelId);
    setRerenderTrigger((prev) => prev + 1);
  };

  const handleNextLevel = () => {
    const next = Math.min(50, currentLevelId + 1);
    setCurrentLevelId(next);
    GameStorage.setCurrentLevel(next);
    setCurrentScreen('PLAYING');
  };

  const handleResetComplete = () => {
    setCoins(150);
    setCurrentLevelId(1);
    setSettings(GameStorage.getSettings());
    setCurrentScreen('HOME');
    setRerenderTrigger((prev) => prev + 1);
  };

  const progressMap = GameStorage.getProgressMap();
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const currentLevel = getLevelById(currentLevelId);
  const hasDailyCompleted = GameStorage.isDailyClaimedToday();

  // Dynamic Theme Color Mapping
  const themeGlowClass = 
    settings.theme === 'cyan' ? 'shadow-[0_0_50px_rgba(6,182,212,0.15)]'
    : settings.theme === 'emerald' ? 'shadow-[0_0_50px_rgba(16,185,129,0.15)]'
    : settings.theme === 'crimson' ? 'shadow-[0_0_50px_rgba(244,63,94,0.15)]'
    : 'shadow-[0_0_50px_rgba(168,85,247,0.15)]';

  const appContent = (
    <div
      className={`w-full flex-1 flex flex-col justify-between overflow-hidden bg-[#070a13] text-slate-100 ${
        settings.fontSize === 'large' ? 'text-base' : 'text-sm'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        coins={coins}
        levelTitle={currentLevel.title}
        levelNumber={currentLevel.id}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Body View */}
      <main className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {currentScreen === 'HOME' && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            currentLevel={currentLevelId}
            completedCount={completedCount}
            totalLevels={50}
            coins={coins}
            hasDailyCompleted={hasDailyCompleted}
            isInstallable={isInstallable}
            onInstallClick={install}
          />
        )}

        {currentScreen === 'PLAYING' && (
          <GamePlayScreen
            level={currentLevel}
            coins={coins}
            onUpdateCoins={handleUpdateCoins}
            onLevelCompleted={handleLevelCompleted}
            onNextLevel={handleNextLevel}
            onOpenLevelMap={() => setCurrentScreen('LEVEL_MAP')}
            vibrationEnabled={settings.vibrationEnabled}
            isLastLevel={currentLevelId >= 50}
          />
        )}

        {currentScreen === 'LEVEL_MAP' && (
          <LevelMapModal
            currentLevelId={currentLevelId}
            onSelectLevel={(lvlId) => {
              setCurrentLevelId(lvlId);
              GameStorage.setCurrentLevel(lvlId);
              setCurrentScreen('PLAYING');
            }}
            onClose={() => setCurrentScreen('HOME')}
          />
        )}

        {currentScreen === 'DAILY_CHALLENGE' && (
          <DailyChallengeModal
            coins={coins}
            onUpdateCoins={handleUpdateCoins}
            onClose={() => setCurrentScreen('HOME')}
            vibrationEnabled={settings.vibrationEnabled}
          />
        )}

        {currentScreen === 'STATS' && (
          <StatsModal
            onClose={() => setCurrentScreen('HOME')}
            coins={coins}
          />
        )}

        {currentScreen === 'SETTINGS' && (
          <SettingsModal
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onClose={() => setCurrentScreen('HOME')}
            onResetComplete={handleResetComplete}
          />
        )}

        {currentScreen === 'ANDROID_EXPORT' && (
          <AndroidExportModal
            onClose={() => setCurrentScreen('HOME')}
          />
        )}
      </main>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030712] p-0 sm:p-4">
      {settings.showAndroidFrame ? (
        /* Realistic Android Smartphone Frame Simulator */
        <div className="relative w-full max-w-[410px] h-[840px] rounded-[48px] bg-slate-950 p-3.5 border-[6px] border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Top Notch / Camera Cutout */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-slate-900 border border-slate-800/80 z-40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700" />
          </div>

          {/* Inner Screen */}
          <div className={`w-full h-full rounded-[36px] overflow-hidden flex flex-col ${themeGlowClass}`}>
            {appContent}
          </div>

          {/* Bottom Android Home Bar Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-slate-700/80 z-40" />
        </div>
      ) : (
        /* Standard Viewport Container */
        <div className={`w-full max-w-md min-h-[92vh] sm:min-h-[820px] rounded-none sm:rounded-3xl border-0 sm:border border-purple-500/20 overflow-hidden flex flex-col ${themeGlowClass}`}>
          {appContent}
        </div>
      )}
    </div>
  );
}
