import React from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAHS_LIST } from '../data/surahs';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Repeat1, 
  Volume2, 
  Sparkles,
  User,
  Gauge
} from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const {
    isPlaying,
    activePlayingSurah,
    activePlayingAyah,
    currentTime,
    duration,
    togglePlay,
    playNextAyah,
    playPrevAyah,
    seekAudio,
    playbackSpeed,
    setPlaybackSpeed,
    repeatMode,
    setRepeatMode,
    reciter,
    setIsSettingsOpen,
    openSurah,
    settings,
    updateSettings,
  } = useQuran();

  if (!activePlayingSurah && !isPlaying) {
    return null;
  }

  const currentSurah = SURAHS_LIST.find((s) => s.number === activePlayingSurah);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seekAudio(val);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'none') {
      setRepeatMode('ayah');
    } else if (repeatMode === 'ayah') {
      setRepeatMode('surah');
    } else {
      setRepeatMode('none');
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-xl border-t border-emerald-900/15 dark:border-emerald-500/20 shadow-2xl">
        
        {/* Progress Bar (Scrubbable) */}
        <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-800 group cursor-pointer">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 group-hover:from-emerald-500 group-hover:to-teal-300 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Seek audio position"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-3">

            {/* Left: Surah & Ayah Info with Equalizer */}
            <div 
              onClick={() => activePlayingSurah && openSurah(activePlayingSurah, activePlayingAyah || 1)}
              className="flex items-center gap-3 cursor-pointer group min-w-0 max-w-[220px] sm:max-w-xs"
            >
              <div className="relative w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/40 dark:border-emerald-700/40 flex items-center justify-center shrink-0">
                {isPlaying ? (
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-1" />
                    <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-2" />
                    <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-3" />
                  </div>
                ) : (
                  <Volume2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {currentSurah ? currentSurah.englishName : 'Surah'}
                  </h4>
                  <span className="text-[11px] font-arabic text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                    {currentSurah?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded text-[10px] font-medium">
                    Ayah {activePlayingAyah || 1}
                  </span>
                  <span>•</span>
                  <span className="truncate text-[11px]">{reciter.name.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Center: Playback Controls */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={toggleRepeat}
                  className={`p-2 rounded-full transition-colors hidden sm:block ${
                    repeatMode !== 'none'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={`Repeat: ${repeatMode}`}
                >
                  {repeatMode === 'ayah' ? (
                    <Repeat1 className="w-4 h-4" />
                  ) : (
                    <Repeat className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={playPrevAyah}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Previous Verse"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={playNextAyah}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Next Verse"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={cycleSpeed}
                  className="px-2 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1"
                  title="Playback Speed"
                >
                  <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{playbackSpeed}x</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 hidden sm:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right: Reciter & Auto-scroll Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSettings({ autoScrollToPlayingAyah: !settings.autoScrollToPlayingAyah })}
                className={`hidden md:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                  settings.autoScrollToPlayingAyah
                    ? 'border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                }`}
                title="Toggle Auto-scroll to current reciting Ayah"
              >
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Auto-scroll</span>
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                title="Change Reciter"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline max-w-[120px] truncate">{reciter.name}</span>
                <span className="md:hidden text-[11px]">Reciter</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
