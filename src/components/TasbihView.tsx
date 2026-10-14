import React, { useState } from 'react';
import { RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface DhikrPreset {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  target: number;
}

const PRESETS: DhikrPreset[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhan-Allah',
    translation: 'Glory be to Allah',
    target: 33,
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Al-Hamdulillah',
    translation: 'Praise be to Allah',
    target: 33,
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    target: 34,
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    target: 100,
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'La Ilaha Illallah',
    translation: 'There is no god but Allah',
    target: 100,
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    transliteration: 'Allahumma Salli Ala Muhammad',
    translation: 'O Allah, send blessings upon Muhammad',
    target: 100,
  },
];

export const TasbihView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DhikrPreset>(PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(() => {
    try {
      const s = localStorage.getItem('tasbih_total_count');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const incrementCount = () => {
    setCount((prev) => prev + 1);
    setTotalCount((prev) => {
      const updated = prev + 1;
      try {
        localStorage.setItem('tasbih_total_count', updated.toString());
      } catch {}
      return updated;
    });

    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  const isCompleted = count >= selectedPreset.target;
  const progressPercent = Math.min((count / selectedPreset.target) * 100, 100);

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-32">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Electronic Tasbih • Remembrance of Allah</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Digital Tasbih Counter
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Total Lifetime Dhikr: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{totalCount}</strong>
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPreset(p);
              setCount(0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 transition-all ${
              selectedPreset.id === p.id
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {p.transliteration} ({p.target})
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0f1924] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-8 shadow-xl text-center flex flex-col items-center">
        <div className="mb-6">
          <p className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">
            {selectedPreset.arabic}
          </p>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            {selectedPreset.transliteration}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
            "{selectedPreset.translation}"
          </p>
        </div>

        <div className="relative my-4">
          <button
            onClick={incrementCount}
            className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full flex flex-col items-center justify-center select-none shadow-2xl transition-all duration-150 active:scale-95 ${
              isCompleted
                ? 'bg-gradient-to-tr from-amber-600 to-amber-400 text-white ring-8 ring-amber-400/20'
                : 'bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 hover:from-emerald-700 hover:to-teal-500 text-white ring-8 ring-emerald-600/15'
            }`}
          >
            <span className="text-6xl sm:text-7xl font-mono font-extrabold tracking-tight">
              {count}
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-100/80 mt-1 font-semibold">
              Target: {selectedPreset.target}
            </span>
            <span className="text-[11px] text-white/60 mt-2">
              (Tap Anywhere)
            </span>
          </button>

          {isCompleted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1 animate-bounce">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Goal Reached!
            </div>
          )}
        </div>

        <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden my-4">
          <div
            className={`h-full transition-all duration-200 ${
              isCompleted ? 'bg-amber-500' : 'bg-emerald-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <button
          onClick={resetCount}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Counter</span>
        </button>
      </div>
    </div>
  );
};
