import React from 'react';
import { GameLevel } from '../types/game';

interface CrosswordGridProps {
  level: GameLevel;
  foundWords: string[];
  revealedCells: string[]; // Set of "row,col"
  selectedWord: string;
}

interface CellData {
  char: string;
  isWordCell: boolean;
  isRevealed: boolean;
  isJustCompleted?: boolean;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  level,
  foundWords,
  revealedCells,
  selectedWord,
}) => {
  // Compute active bounding box of cells
  const cellMap = new Map<string, { char: string; words: string[] }>();
  let minRow = 999, maxRow = -1, minCol = 999, maxCol = -1;

  level.words.forEach((w) => {
    const chars = Array.from(w.word);
    chars.forEach((ch, idx) => {
      const r = w.direction === 'across' ? w.row : w.row + idx;
      const c = w.direction === 'across' ? w.col + idx : w.col;
      const key = `${r},${c}`;

      minRow = Math.min(minRow, r);
      maxRow = Math.max(maxRow, r);
      minCol = Math.min(minCol, c);
      maxCol = Math.max(maxCol, c);

      const existing = cellMap.get(key);
      if (existing) {
        existing.words.push(w.word);
      } else {
        cellMap.set(key, { char: ch, words: [w.word] });
      }
    });
  });

  if (minRow === 999) {
    minRow = 0; maxRow = 2; minCol = 0; maxCol = 2;
  }

  const rowsCount = maxRow - minRow + 1;
  const colsCount = maxCol - minCol + 1;

  // Build grid matrix
  const matrix: (CellData | null)[][] = [];
  for (let r = 0; r < rowsCount; r++) {
    const rowArr: (CellData | null)[] = [];
    for (let c = 0; c < colsCount; c++) {
      const actualRow = minRow + r;
      const actualCol = minCol + c;
      const key = `${actualRow},${actualCol}`;
      const entry = cellMap.get(key);

      if (entry) {
        // Check if any word touching this cell is found
        const isWordFound = entry.words.some((w) => foundWords.includes(w));
        const isManuallyRevealed = revealedCells.includes(key);
        rowArr.push({
          char: entry.char,
          isWordCell: true,
          isRevealed: isWordFound || isManuallyRevealed,
        });
      } else {
        rowArr.push(null);
      }
    }
    matrix.push(rowArr);
  }

  // Size calculation: max 48px, min 34px depending on grid dimension
  const maxDimension = Math.max(rowsCount, colsCount);
  const cellSizeClass = maxDimension <= 4 
    ? 'w-12 h-12 text-lg sm:w-14 sm:h-14 sm:text-xl' 
    : maxDimension <= 6 
    ? 'w-10 h-10 text-base sm:w-11 sm:h-11 sm:text-lg'
    : 'w-8 h-8 text-sm sm:w-9 sm:h-9 sm:text-base';

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 my-auto select-none overflow-x-auto">
      <div 
        className="grid gap-1.5 p-3 rounded-2xl bg-slate-950/60 border border-purple-500/20 shadow-inner max-w-full"
        style={{
          gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
          direction: 'rtl'
        }}
      >
        {matrix.map((row, rIdx) => (
          <React.Fragment key={`row-${rIdx}`}>
            {row.map((cell, cIdx) => {
              if (!cell) {
                return (
                  <div
                    key={`empty-${rIdx}-${cIdx}`}
                    className={`${cellSizeClass} rounded-lg opacity-0 pointer-events-none`}
                  />
                );
              }

              return (
                <div
                  key={`cell-${rIdx}-${cIdx}`}
                  className={`${cellSizeClass} rounded-xl flex items-center justify-center font-black transition-all duration-300 relative ${
                    cell.isRevealed
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white border border-purple-300/60 shadow-md shadow-purple-600/30 scale-100 animate-in zoom-in-75'
                      : 'bg-slate-900/90 text-transparent border border-purple-500/20 shadow-sm'
                  }`}
                >
                  {cell.isRevealed ? (
                    <span className="drop-shadow-sm">{cell.char}</span>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/30" />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Target Words status chips */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 max-w-sm px-2">
        {level.words.map((w) => {
          const isFound = foundWords.includes(w.word);
          return (
            <div
              key={w.id}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isFound
                  ? 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400'
              }`}
            >
              <span>{isFound ? w.word : `${w.word.length} حرفی`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
