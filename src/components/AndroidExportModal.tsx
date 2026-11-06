import React, { useState } from 'react';
import { Code, Copy, Check, Download, BookOpen, Smartphone, ExternalLink } from 'lucide-react';
import { ANDROID_PROJECT_FILES, ANDROID_BUILD_GUIDE } from '../data/androidSourceBundle';
import { soundManager } from '../services/sound';

interface AndroidExportModalProps {
  onClose: () => void;
}

export const AndroidExportModal: React.FC<AndroidExportModalProps> = ({ onClose }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'code' | 'guide'>('code');

  const currentFile = ANDROID_PROJECT_FILES[selectedFileIndex];

  const handleCopy = () => {
    soundManager.playTap();
    const textToCopy = activeView === 'code' ? currentFile.content : ANDROID_BUILD_GUIDE;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    soundManager.playCoin();
    const allContent = ANDROID_PROJECT_FILES.map(
      (f) => `// ==================================================\n// FILE: ${f.path}\n// DESC: ${f.description}\n// ==================================================\n\n${f.content}\n\n`
    ).join('\n');

    const blob = new Blob([allContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DarkMind_Android_Kotlin_Source.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between max-w-xl mx-auto p-3 select-none text-right">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <span>پروژه کامل اندروید (Kotlin + Jetpack Compose)</span>
            </h2>
            <p className="text-xs text-slate-400">
              سورس کامل معماری MVVM و Room Database آماده کامپایل در Android Studio
            </p>
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

        {/* View Switcher & Action buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveView('code')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeView === 'code' ? 'bg-purple-900/60 text-purple-200' : 'text-slate-400'
              }`}
            >
              کدهای سورس ({ANDROID_PROJECT_FILES.length} فایل)
            </button>
            <button
              onClick={() => setActiveView('guide')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeView === 'guide' ? 'bg-purple-900/60 text-purple-200' : 'text-slate-400'
              }`}
            >
              راهنمای ساخت APK
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:border-purple-400 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'کپی شد!' : 'کپی کد'}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all active:scale-95"
              title="دانلود کل سورس‌ها به صورت یک فایل متنی"
            >
              <Download className="w-3.5 h-3.5" />
              <span>دانلود سورس</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {activeView === 'code' ? (
        <div className="flex flex-col gap-2 my-3">
          {/* File selector pill strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {ANDROID_PROJECT_FILES.map((f, i) => (
              <button
                key={i}
                onClick={() => {
                  soundManager.playTap();
                  setSelectedFileIndex(i);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono whitespace-nowrap transition-all ${
                  selectedFileIndex === i
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {f.path.split('/').pop()}
              </button>
            ))}
          </div>

          {/* Current file path and description */}
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-purple-300 font-bold">{currentFile.path}</span>
            <span className="text-[11px] text-slate-400">{currentFile.description}</span>
          </div>

          {/* Code Viewer */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-3 max-h-[320px] overflow-auto text-left" dir="ltr">
            <pre className="font-mono text-[11px] text-slate-300 whitespace-pre leading-relaxed">
              {currentFile.content}
            </pre>
          </div>
        </div>
      ) : (
        /* Guide View */
        <div className="my-3 p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 max-h-[380px] overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
            <h4 className="font-bold mb-1">نصب مستقیم و فوری بدون نیاز به سیستم و Android Studio:</h4>
            <p className="text-[11px] text-slate-300">
              این بازی با استاندارد Progressive Web App (PWA) سازگار است. می‌توانید همین الان در مرورگر کروم گوشی اندرویدی، گزینه «افزودن به صفحه اصلی / Add to Home Screen» یا دکمه نصب را بزنید تا بازی با آیکون اختصاصی و بدون نیاز به اینترنت مانند یک برنامه بومی روی گوشی نصب شود!
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">مراحل تولید فایل APK در Android Studio:</h4>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-sans text-slate-300 whitespace-pre-line leading-relaxed" dir="rtl">
              {ANDROID_BUILD_GUIDE}
            </pre>
          </div>
        </div>
      )}

      {/* Footer Notice */}
      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>پلتفرم: Android 8.0+ · Jetpack Compose · Room DB</span>
        <span className="text-emerald-400 font-bold">۱۰۰٪ آفلاین</span>
      </div>
    </div>
  );
};
