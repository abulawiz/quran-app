import React from 'react';
import { X, BookOpenText } from 'lucide-react';
import type { TafseerResult } from '../services/quranApi';

interface TafseerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tafseerData: TafseerResult | null;
  surahName: string;
  ayahNumber: number;
  ayahArabic: string;
}

export const TafseerModal: React.FC<TafseerModalProps> = ({
  isOpen,
  onClose,
  tafseerData,
  surahName,
  ayahNumber,
  ayahArabic,
}) => {
  if (!isOpen || !tafseerData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#0d1620] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <BookOpenText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tafseer & Commentary
              </h3>
              <p className="text-xs text-slate-400">
                Surah {surahName} • Verse {ayahNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50 text-right">
            <p dir="rtl" className="font-arabic text-2xl sm:text-3xl text-emerald-950 dark:text-emerald-200 leading-loose">
              {ayahArabic}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <span>Source:</span>
            <span className="text-emerald-600 dark:text-emerald-400">{tafseerData.source}</span>
          </div>

          <div className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-serif space-y-3">
            <p className="whitespace-pre-line leading-relaxed font-arabic text-xl sm:text-2xl text-right sm:text-right" dir="rtl">
              {tafseerData.text}
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
