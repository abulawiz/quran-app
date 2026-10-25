import React, { useState, useMemo } from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAHS_LIST } from '../data/surahs';
import { RECITERS_LIST } from '../data/reciters';
import { 
  Search, 
  Play, 
  Pause, 
  BookOpen, 
  Sparkles, 
  BookmarkCheck, 
  Grid, 
  List as ListIcon,
  Headphones
} from 'lucide-react';

export const SurahList: React.FC = () => {
  const { 
    openSurah, 
    playAyah, 
    pauseAudio, 
    isPlaying, 
    activePlayingSurah, 
    lastRead,
    reciter,
    setReciter,
    setIsSettingsOpen
  } = useQuran();

  const [searchFilter, setSearchFilter] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSurahs = useMemo(() => {
    return SURAHS_LIST.filter((surah) => {
      const matchesSearch =
        surah.englishName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        surah.englishNameTranslation.toLowerCase().includes(searchFilter.toLowerCase()) ||
        surah.name.includes(searchFilter) ||
        surah.number.toString() === searchFilter.trim();

      const matchesType = filterType === 'all' || surah.revelationType === filterType;

      return matchesSearch && matchesType;
    });
  }, [searchFilter, filterType]);

  const handleAudioToggle = (e: React.MouseEvent, surahNumber: number) => {
    e.stopPropagation();
    if (activePlayingSurah === surahNumber && isPlaying) {
      pauseAudio();
    } else {
      playAyah(surahNumber, 1);
    }
  };

  return (
    <div className="space-y-8 pb-32">
      
      {/* Hero Islamic Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl p-6 sm:p-10 border border-emerald-700/30">
        
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-6 text-emerald-400/10 text-9xl font-arabic select-none pointer-events-none">
          قرآن
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/50 border border-emerald-500/30 text-emerald-200 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Al-Qur'an Al-Kareem • The Holy Book</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 font-sans">
            Recite, Reflect & Listen
          </h1>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6 font-arabic text-xl sm:text-2xl text-right sm:text-left">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {lastRead && (
            <div 
              onClick={() => openSurah(lastRead.surahNumber, lastRead.ayahNumber)}
              className="inline-flex items-center gap-4 p-3 pr-5 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/15 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-emerald-200/90 font-medium">Resume Reading</p>
                <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {lastRead.surahName} • Ayah {lastRead.ayahNumber}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by Surah name, meaning, or number..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All (114)
            </button>
            <button
              onClick={() => setFilterType('Meccan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === 'Meccan'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Meccan (86)
            </button>
            <button
              onClick={() => setFilterType('Medinan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === 'Medinan'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Medinan (28)
            </button>
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Quick Reciter Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Headphones className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Reciter:</span>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
          >
            {reciter.name} ({reciter.arabicName})
          </button>
        </div>

        {reciter.id !== 'okasha-kameny' ? (
          <button
            onClick={() => {
              const okasha = RECITERS_LIST.find((r) => r.id === 'okasha-kameny');
              if (okasha) setReciter(okasha);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-500/30 transition-all active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Switch to Okasha Kameny</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
            ✓ Okasha Kameny Active
          </span>
        )}
      </div>

      {/* Surahs Grid / List */}
      {filteredSurahs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">No Surahs found</h3>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search terms</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex flex-col gap-3'
          }
        >
          {filteredSurahs.map((surah) => {
            const isCurrentPlaying = activePlayingSurah === surah.number;

            return (
              <div
                key={surah.number}
                onClick={() => openSurah(surah.number)}
                className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer bg-white dark:bg-[#0f1924] hover:shadow-lg ${
                  isCurrentPlaying
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400/50 dark:hover:border-emerald-600/50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 transition-colors">
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 font-mono">
                        {surah.number}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {surah.englishName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {surah.englishNameTranslation}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          {surah.revelationType}
                        </span>
                        <span>•</span>
                        <span>{surah.numberOfAyahs} Verses</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0 h-full py-0.5">
                    <span className="font-arabic text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-300 group-hover:scale-105 transition-transform">
                      {surah.name}
                    </span>

                    <button
                      onClick={(e) => handleAudioToggle(e, surah.number)}
                      className={`mt-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrentPlaying && isPlaying
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 hover:text-emerald-700'
                      }`}
                      title={isCurrentPlaying && isPlaying ? 'Pause Surah Recitation' : 'Play Surah Recitation'}
                    >
                      {isCurrentPlaying && isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
