import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Shuffle, X, Check } from 'lucide-react';
import { soundManager } from '../services/sound';

interface LetterWheelProps {
  letters: string[];
  onSubmitWord: (word: string) => void;
  vibrationEnabled: boolean;
}

interface LetterNode {
  char: string;
  originalIndex: number;
  x: number;
  y: number;
}

export const LetterWheel: React.FC<LetterWheelProps> = ({
  letters,
  onSubmitWord,
  vibrationEnabled,
}) => {
  const [shuffledLetters, setShuffledLetters] = useState<string[]>(letters);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync when level changes
  useEffect(() => {
    setShuffledLetters([...letters]);
    setSelectedIndices([]);
  }, [letters]);

  // Wheel layout geometry
  const wheelRadius = 90; // distance from center in px
  const center = 125; // container is 250x250

  const letterNodes: LetterNode[] = shuffledLetters.map((char, idx) => {
    const angle = (2 * Math.PI / shuffledLetters.length) * idx - (Math.PI / 2);
    return {
      char,
      originalIndex: idx,
      x: center + wheelRadius * Math.cos(angle),
      y: center + wheelRadius * Math.sin(angle),
    };
  });

  const triggerHaptic = useCallback(() => {
    if (vibrationEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
  }, [vibrationEnabled]);

  const shuffle = () => {
    soundManager.playTap();
    const copy = [...shuffledLetters];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffledLetters(copy);
    setSelectedIndices([]);
  };

  const getPointerCoord = (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const checkHoveredNode = useCallback((x: number, y: number, currentSelected: number[]) => {
    const hitRadius = 32;
    for (let i = 0; i < letterNodes.length; i++) {
      const node = letterNodes[i];
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist <= hitRadius) {
        if (!currentSelected.includes(i)) {
          soundManager.playLetterSelect(currentSelected.length);
          triggerHaptic();
          return [...currentSelected, i];
        }
      }
    }
    return currentSelected;
  }, [letterNodes, triggerHaptic]);

  // Pointer drag event handlers
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const pos = getPointerCoord(e);
    if (!pos) return;
    setIsDragging(true);
    setPointerPos(pos);

    const initial = checkHoveredNode(pos.x, pos.y, []);
    setSelectedIndices(initial);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const pos = getPointerCoord(e);
    if (!pos) return;
    setPointerPos(pos);

    setSelectedIndices((prev) => checkHoveredNode(pos.x, pos.y, prev));
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setPointerPos(null);

    if (selectedIndices.length > 0) {
      const constructedWord = selectedIndices.map((i) => shuffledLetters[i]).join('');
      onSubmitWord(constructedWord);
    }
    setSelectedIndices([]);
  };

  // Direct Tap Mode: clicking an individual letter
  const handleLetterClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging) return;

    if (!selectedIndices.includes(idx)) {
      const next = [...selectedIndices, idx];
      setSelectedIndices(next);
      soundManager.playLetterSelect(next.length - 1);
      triggerHaptic();
    }
  };

  const handleManualSubmit = () => {
    if (selectedIndices.length > 0) {
      const constructedWord = selectedIndices.map((i) => shuffledLetters[i]).join('');
      onSubmitWord(constructedWord);
      setSelectedIndices([]);
    }
  };

  const handleClear = () => {
    soundManager.playTap();
    setSelectedIndices([]);
  };

  const currentWordText = selectedIndices.map((i) => shuffledLetters[i]).join('');

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none touch-none pb-2">
      {/* Live Selected Word Preview Bubble */}
      <div className="h-10 mb-2 flex items-center justify-center">
        {currentWordText ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-500/60 shadow-lg shadow-purple-900/40 animate-in zoom-in-90">
            <span className="text-xl font-black text-white tracking-widest drop-shadow">
              {currentWordText}
            </span>
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-white p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-500 font-medium">
            حروف را لمس کنید یا انگشت را روی حروف بکشید
          </div>
        )}
      </div>

      {/* Circular Interactive Wheel Container */}
      <div
        ref={containerRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        className="relative w-[250px] h-[250px] rounded-full bg-slate-950/80 border border-purple-500/30 shadow-2xl flex items-center justify-center cursor-pointer select-none"
        style={{
          boxShadow: '0 0 35px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(15, 23, 42, 0.8)',
        }}
      >
        {/* SVG Canvas for neon connecting trace lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="lineNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a855f7" />
              <stop offset="100%" stop-color="#06b6d4" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lines connecting consecutive selected letters */}
          {selectedIndices.map((currIdx, i) => {
            if (i === 0) return null;
            const prevIdx = selectedIndices[i - 1];
            const p1 = letterNodes[prevIdx];
            const p2 = letterNodes[currIdx];
            return (
              <line
                key={`line-${i}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="url(#lineNeonGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="url(#lineGlow)"
              />
            );
          })}

          {/* Active line leading to current finger/mouse position */}
          {isDragging && pointerPos && selectedIndices.length > 0 && (
            <line
              x1={letterNodes[selectedIndices[selectedIndices.length - 1]].x}
              y1={letterNodes[selectedIndices[selectedIndices.length - 1]].y}
              x2={pointerPos.x}
              y2={pointerPos.y}
              stroke="#c084fc"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              opacity="0.85"
            />
          )}
        </svg>

        {/* Center Shuffle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            shuffle();
          }}
          className="absolute z-20 w-12 h-12 rounded-full bg-slate-900 border border-purple-500/40 hover:border-purple-400 text-purple-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
          title="بر زدن حروف"
        >
          <Shuffle className="w-5 h-5" />
        </button>

        {/* Outer Circular Ring Outline */}
        <div className="absolute inset-5 rounded-full border border-purple-500/20 pointer-events-none" />

        {/* Letter Nodes */}
        {letterNodes.map((node, idx) => {
          const isSelected = selectedIndices.includes(idx);
          const selectionOrder = selectedIndices.indexOf(idx) + 1;

          return (
            <div
              key={`letter-${idx}`}
              onClick={(e) => handleLetterClick(idx, e)}
              className={`absolute z-20 w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center text-lg font-black transition-all duration-150 shadow-lg ${
                isSelected
                  ? 'bg-gradient-to-tr from-purple-500 to-indigo-500 text-white border-2 border-white scale-110 shadow-purple-500/50'
                  : 'bg-slate-900 text-slate-100 border border-purple-500/30 hover:border-purple-400 active:scale-95'
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
              }}
            >
              <span>{node.char}</span>
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {selectionOrder}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Tap Controls (Submit & Clear buttons for accessibility) */}
      {selectedIndices.length > 0 && !isDragging && (
        <div className="flex items-center gap-3 mt-3 animate-in fade-in">
          <button
            onClick={handleManualSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/40 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>تأیید کلمه</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
            <span>پاک کردن</span>
          </button>
        </div>
      )}
    </div>
  );
};
