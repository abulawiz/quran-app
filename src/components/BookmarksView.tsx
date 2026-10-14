import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  Bookmark as BookmarkIcon, 
  Trash2, 
  Play, 
  Copy, 
  Check, 
  BookOpen 
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { bookmarks, openSurah, playAyah, toggleBookmark } = useQuran();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (bm: any) => {
    const text = `${bm.ayahText}\n\n${bm.translationText}\n[Surah ${bm.surahEnglishName} (${bm.surahNumber}:${bm.ayahNumber})]`;
    navigator.clipboard.writeText(text);
    setCopiedId(bm.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-24 px-4 bg-white dark:bg-[#0f1924] rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
          <BookmarkIcon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
          No Bookmarked Verses Yet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          While reciting any Surah, click the bookmark icon on any verse to save it for quick daily reflection and memorization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Saved Verses ({bookmarks.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quick access to your favorite and memorized ayahs
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bookmarks.map((bm) => (
          <div
            key={bm.id}
            className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 bg-white dark:bg-[#0f1924] hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/60">
              <div 
                onClick={() => openSurah(bm.surahNumber, bm.ayahNumber)}
                className="flex items-center gap-2 cursor-pointer group-hover:text-emerald-600 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                  {bm.surahNumber}:{bm.ayahNumber}
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {bm.surahEnglishName} ({bm.surahName})
                </h4>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => playAyah(bm.surahNumber, bm.ayahNumber)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Listen to this verse"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => handleCopy(bm)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy verse"
                >
                  {copiedId === bm.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => openSurah(bm.surahNumber, bm.ayahNumber)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Open in Surah reader"
                >
                  <BookOpen className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const fakeAyah: any = { numberInSurah: bm.ayahNumber, text: bm.ayahText };
                    const fakeSurah: any = { number: bm.surahNumber, name: bm.surahName, englishName: bm.surahEnglishName };
                    toggleBookmark(fakeAyah, fakeSurah);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p
              dir="rtl"
              className="font-arabic text-xl sm:text-2xl text-right text-slate-900 dark:text-slate-100 leading-relaxed mb-2"
            >
              {bm.ayahText}
            </p>

            {bm.translationText && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {bm.translationText}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
