import React, { useEffect, useState, useRef } from 'react';
import { useQuran } from '../context/QuranContext';
import { fetchSurah, fetchAyahTafseer } from '../services/quranApi';
import type { TafseerResult } from '../services/quranApi';
import type { SurahDetail, Ayah } from '../types/quran';
import { SURAHS_LIST } from '../data/surahs';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Bookmark as BookmarkIcon, 
  Copy, 
  Check, 
  BookOpenText, 
  Volume2
} from 'lucide-react';

interface SurahViewProps {
  onOpenTafseer: (result: TafseerResult, surahName: string, ayahNumber: number, ayahArabic: string) => void;
}

export const SurahView: React.FC<SurahViewProps> = ({ onOpenTafseer }) => {
  const {
    selectedSurahNumber,
    setSelectedSurahNumber,
    setCurrentTab,
    playAyah,
    pauseAudio,
    isPlaying,
    activePlayingSurah,
    activePlayingAyah,
    reciter,
    targetAyahScroll,
    clearTargetAyahScroll,
    toggleBookmark,
    isBookmarked,
    settings,
    updateSettings,
  } = useQuran();

  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchSurah(selectedSurahNumber, settings.selectedTranslation, reciter.apiIdentifier)
      .then((data) => {
        if (isMounted) {
          setSurahDetail(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load Surah');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber, settings.selectedTranslation, reciter.apiIdentifier]);

  useEffect(() => {
    if (targetAyahScroll && !loading && ayahRefs.current[targetAyahScroll]) {
      setTimeout(() => {
        ayahRefs.current[targetAyahScroll]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        clearTargetAyahScroll();
      }, 300);
    }
  }, [targetAyahScroll, loading]);

  useEffect(() => {
    if (
      settings.autoScrollToPlayingAyah &&
      isPlaying &&
      activePlayingSurah === selectedSurahNumber &&
      activePlayingAyah &&
      ayahRefs.current[activePlayingAyah]
    ) {
      ayahRefs.current[activePlayingAyah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activePlayingAyah, isPlaying, activePlayingSurah, selectedSurahNumber, settings.autoScrollToPlayingAyah]);

  const currentSurahMeta = SURAHS_LIST.find((s) => s.number === selectedSurahNumber);

  const handleCopy = (ayah: Ayah) => {
    const textToCopy = `${ayah.text}\n\n${ayah.translation || ''}\n[Surah ${currentSurahMeta?.englishName} (${selectedSurahNumber}:${ayah.numberInSurah})]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  const handleOpenTafseer = async (ayah: Ayah) => {
    try {
      const result = await fetchAyahTafseer(selectedSurahNumber, ayah.numberInSurah);
      onOpenTafseer(
        result, 
        currentSurahMeta?.englishName || '', 
        ayah.numberInSurah,
        ayah.text
      );
    } catch {
      onOpenTafseer(
        { text: "Reflection and detailed commentary will appear here.", source: "Tafseer" },
        currentSurahMeta?.englishName || '',
        ayah.numberInSurah,
        ayah.text
      );
    }
  };

  const goToPrevSurah = () => {
    if (selectedSurahNumber > 1) {
      setSelectedSurahNumber(selectedSurahNumber - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextSurah = () => {
    if (selectedSurahNumber < 114) {
      setSelectedSurahNumber(selectedSurahNumber + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-36">
      
      {/* Top Navigation & Surah Header Banner */}
      <div className="bg-white dark:bg-[#0f1924] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden">
        
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentTab('surahs')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Surahs</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Quick Font Size Adjusters */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 mr-1">
              <button
                onClick={() => updateSettings({ arabicFontSize: Math.max(20, settings.arabicFontSize - 2) })}
                className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 active:scale-95"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => updateSettings({ arabicFontSize: Math.min(48, settings.arabicFontSize + 2) })}
                className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 active:scale-95"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <button
              onClick={goToPrevSurah}
              disabled={selectedSurahNumber <= 1}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 px-2">
              {selectedSurahNumber} / 114
            </span>
            <button
              onClick={goToNextSurah}
              disabled={selectedSurahNumber >= 114}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Next Surah"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-emerald-900/10 via-emerald-800/5 to-transparent text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <span>{currentSurahMeta?.revelationType}</span>
            <span>•</span>
            <span>{currentSurahMeta?.numberOfAyahs} Verses</span>
            <span>•</span>
            <span>Juz {currentSurahMeta?.startJuz}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {currentSurahMeta?.englishName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            "{currentSurahMeta?.englishNameTranslation}"
          </p>

          <div className="my-4 font-arabic text-4xl sm:text-5xl text-emerald-800 dark:text-emerald-300 font-bold">
            {currentSurahMeta?.name}
          </div>

          <button
            onClick={() => {
              if (activePlayingSurah === selectedSurahNumber && isPlaying) {
                pauseAudio();
              } else {
                playAyah(selectedSurahNumber, 1);
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 hover:scale-105 transition-all"
          >
            {activePlayingSurah === selectedSurahNumber && isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Recitation</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Recite Surah ({reciter.name.split(' ')[0]})</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Bismillah Header (Except Surah At-Tawbah #9) */}
      {selectedSurahNumber !== 9 && selectedSurahNumber !== 1 && (
        <div className="py-6 text-center">
          <p className="font-arabic text-2xl sm:text-3xl text-emerald-900 dark:text-emerald-200 font-bold select-none tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-xs text-slate-400 mt-1 italic">
            In the name of Allah, the Entirely Merciful, the Especially Merciful
          </p>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200 dark:border-slate-800 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-20 h-4 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="w-full h-8 rounded bg-slate-200 dark:bg-slate-800 mb-3" />
              <div className="w-3/4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-center">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => setSelectedSurahNumber(selectedSurahNumber)}
            className="mt-3 px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
          >
            Retry Loading
          </button>
        </div>
      )}

      {!loading && surahDetail && (
        <div className="space-y-4">
          {surahDetail.ayahs.map((ayah) => {
            const isPlayingThisAyah =
              activePlayingSurah === selectedSurahNumber &&
              activePlayingAyah === ayah.numberInSurah &&
              isPlaying;

            const isSaved = isBookmarked(selectedSurahNumber, ayah.numberInSurah);

            return (
              <div
                key={ayah.numberInSurah}
                ref={(el) => {
                  ayahRefs.current[ayah.numberInSurah] = el;
                }}
                className={`group rounded-2xl border p-5 sm:p-6 transition-all duration-200 bg-white dark:bg-[#0f1924] ${
                  isPlayingThisAyah
                    ? 'ayah-playing ring-2 ring-emerald-500/40 shadow-lg'
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/60">
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      {ayah.numberInSurah}
                    </div>
                    {isPlayingThisAyah && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        Reciting
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (isPlayingThisAyah) {
                          pauseAudio();
                        } else {
                          playAyah(selectedSurahNumber, ayah.numberInSurah, ayah.audio);
                        }
                      }}
                      className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                        isPlayingThisAyah
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isPlayingThisAyah ? 'Pause' : 'Play Ayah Audio'}
                    >
                      {isPlayingThisAyah ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={() => currentSurahMeta && toggleBookmark(ayah, currentSurahMeta)}
                      className={`p-2 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark Verse'}
                    >
                      <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleOpenTafseer(ayah)}
                      className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Read Tafseer / Commentary"
                    >
                      <BookOpenText className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleCopy(ayah)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Copy Ayah text & translation"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                </div>

                <div
                  dir="rtl"
                  className="font-arabic text-right leading-loose mb-4 text-slate-900 dark:text-slate-50 select-text transition-all"
                  style={{
                    fontSize: `${settings.arabicFontSize}px`,
                    fontFamily:
                      settings.fontFamily === 'amiri'
                        ? '"Amiri", serif'
                        : settings.fontFamily === 'scheherazade'
                        ? '"Scheherazade New", serif'
                        : '"Noto Naskh Arabic", serif',
                    lineHeight: 2.2,
                  }}
                >
                  {ayah.text}{' '}
                  <span className="inline-block text-emerald-700 dark:text-emerald-400 text-lg font-mono px-1 select-none">
                    ۝{ayah.numberInSurah}
                  </span>
                </div>

                {settings.showTransliteration && ayah.transliteration && (
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 italic mb-2">
                    {ayah.transliteration}
                  </p>
                )}

                {settings.showTranslation && ayah.translation && (
                  <div
                    className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1 transition-all"
                    style={{ fontSize: `${settings.translationFontSize}px` }}
                  >
                    {ayah.translation}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
