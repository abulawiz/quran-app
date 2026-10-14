import React, { useState, useEffect, useRef } from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAHS_LIST } from '../data/surahs';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openSurah } = useQuran();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = SURAHS_LIST.filter((s) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase().trim();
    return (
      s.englishName.toLowerCase().includes(q) ||
      s.englishNameTranslation.toLowerCase().includes(q) ||
      s.name.includes(q) ||
      s.number.toString() === q
    );
  }).slice(0, 10);

  const handleSelect = (surahNumber: number) => {
    openSurah(surahNumber);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#0d1620] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Surah by name, number, or meaning..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {!query.trim() && (
            <div className="p-6 text-center text-xs text-slate-400">
              Type to search any of the 114 Surahs (e.g., "Al-Mulk", "18", "Yaseen", "Cave")
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">
              No matching Surah found for "{query}"
            </div>
          )}

          {results.map((surah) => (
            <div
              key={surah.number}
              onClick={() => handleSelect(surah.number)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center font-mono">
                  {surah.number}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                    {surah.englishName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} Verses
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-arabic text-lg font-bold text-emerald-800 dark:text-emerald-400">
                  {surah.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-[#0a1118] border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-4">
          <span>Press <kbd className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Esc</kbd> to close</span>
          <span>114 Surahs indexed</span>
        </div>
      </div>
    </div>
  );
};
