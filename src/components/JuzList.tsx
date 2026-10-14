import React from 'react';
import { useQuran } from '../context/QuranContext';
import { JUZS_LIST } from '../data/juzs';
import { Layers, ArrowRight } from 'lucide-react';

export const JuzList: React.FC = () => {
  const { openSurah } = useQuran();

  return (
    <div className="space-y-6 pb-32">
      {/* Juz Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/50 text-emerald-200 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>30 Equal Portions (Ajzaa)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          The 30 Juz of the Holy Quran
        </h2>
        <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
          The Quran is divided into thirty equal parts (Juz/Para), traditionally recited across the 30 days of Ramadan.
        </p>
      </div>

      {/* Juz Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {JUZS_LIST.map((juz) => (
          <div
            key={juz.juzNumber}
            onClick={() => openSurah(juz.startSurahNumber, juz.startAyah)}
            className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 bg-white dark:bg-[#0f1924] hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center font-bold text-sm text-emerald-800 dark:text-emerald-300 group-hover:scale-105 transition-transform">
                {juz.juzNumber}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    Juz {juz.juzNumber}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Starts at {juz.startSurahName} : {juz.startAyah}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-arabic text-lg font-bold text-emerald-800 dark:text-emerald-300">
                {juz.arabicName}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
