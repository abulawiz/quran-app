import React, { useState } from 'react';
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
  Gauge,
  ChevronDown,
  Maximize2
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

  const [isMobileExpanded, setIsMobileExpanded] = useState<boolean>(false);

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
    <>
      {/* FULLSCREEN MOBILE EXPANDED PLAYER SHEET */}
      {isMobileExpanded && (
        <div className="fixed sm:absolute inset-0 z-50 bg-gradient-to-b from-emerald-950 via-[#07241b] to-[#04140f] text-white flex flex-col justify-between p-6 animate-in slide-in-from-bottom duration-300">
          
          {/* Top Collapse Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setIsMobileExpanded(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-emerald-300/80 uppercase tracking-widest">
                Now Reciting
              </span>
              <p className="text-xs text-white/90 font-medium">
                {currentSurah?.englishName} • Ayah {activePlayingAyah}
              </p>
            </div>
            <button
              onClick={() => {
                setIsMobileExpanded(false);
                setIsSettingsOpen(true);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4 text-emerald-300" />
            </button>
          </div>

          {/* Central Calligraphy Artwork */}
          <div className="my-auto text-center px-4">
            <div className="w-48 h-48 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-800/60 to-teal-700/40 border border-emerald-500/30 shadow-2xl flex flex-col items-center justify-center p-4 relative mb-6">
              <span className="font-arabic text-5xl font-bold text-amber-200 drop-shadow">
                {currentSurah?.name}
              </span>
              <span className="text-xs text-emerald-200 mt-2 font-medium">
                {currentSurah?.englishNameTranslation}
              </span>
              <div className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-emerald-600 text-[10px] font-mono font-bold tracking-wider">
                SURAH {currentSurah?.number} : {activePlayingAyah}
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {currentSurah?.englishName}
            </h2>
            <p className="text-sm text-emerald-300/90 font-medium">
              Recited by {reciter.name}
            </p>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-4 pb-4">
            
            {/* Scrubber */}
            <div className="space-y-1.5">
              <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
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
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-emerald-200/70">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Buttons */}
            <div className="flex items-center justify-between px-2 pt-2">
              <button
                onClick={toggleRepeat}
                className={`p-3 rounded-full transition-colors ${
                  repeatMode !== 'none'
                    ? 'text-amber-300 bg-white/20'
                    : 'text-white/60 hover:text-white'
                }`}
                title={`Repeat: ${repeatMode}`}
              >
                {repeatMode === 'ayah' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
              </button>

              <button
                onClick={playPrevAyah}
                className="p-3 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 text-emerald-950 flex items-center justify-center shadow-xl shadow-emerald-950/40 active:scale-95 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              <button
                onClick={playNextAyah}
                className="p-3 rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <SkipForward className="w-6 h-6" />
              </button>

              <button
                onClick={cycleSpeed}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-white/90 flex items-center gap-1"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-300" />
                <span>{playbackSpeed}x</span>
              </button>
            </div>

            {/* Jump to Reader Button */}
            <button
              onClick={() => {
                if (activePlayingSurah) {
                  openSurah(activePlayingSurah, activePlayingAyah || 1);
                  setIsMobileExpanded(false);
                }
              }}
              className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-200 text-center transition-colors"
            >
              View Full Surah in Reader →
            </button>
          </div>

        </div>
      )}

      {/* DOCKED BOTTOM AUDIO PLAYER BAR (Positioned above bottom nav) */}
      <div className="sticky bottom-16 left-0 right-0 z-30 transition-all duration-300 px-1 pb-1 shrink-0">
        <div className="bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-xl rounded-2xl border border-emerald-900/15 dark:border-emerald-500/20 shadow-xl overflow-hidden">
          
          {/* Progress Bar (Scrubbable) */}
          <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-800 group cursor-pointer">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all"
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

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between gap-2 sm:gap-3">

              {/* Left: Surah & Ayah Info with Equalizer (Click expands mobile sheet on small screens) */}
              <div 
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsMobileExpanded(true);
                  } else if (activePlayingSurah) {
                    openSurah(activePlayingSurah, activePlayingAyah || 1);
                  }
                }}
                className="flex items-center gap-2.5 cursor-pointer group min-w-0 max-w-[200px] sm:max-w-xs select-none"
              >
                <div className="relative w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300/40 dark:border-emerald-700/40 flex items-center justify-center shrink-0">
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-1" />
                      <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-2" />
                      <span className="w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-3" />
                    </div>
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate group-hover:text-emerald-600 transition-colors">
                      {currentSurah ? currentSurah.englishName : 'Surah'}
                    </h4>
                    <span className="text-[10px] font-arabic text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                      {currentSurah?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1 py-0.2 rounded font-medium">
                      Ayah {activePlayingAyah || 1}
                    </span>
                    <span>•</span>
                    <span className="truncate">{reciter.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Center: Playback Controls */}
              <div className="flex items-center gap-1 sm:gap-3">
                <button
                  onClick={toggleRepeat}
                  className={`p-1.5 rounded-full transition-colors hidden sm:block ${
                    repeatMode !== 'none'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title={`Repeat: ${repeatMode}`}
                >
                  {repeatMode === 'ayah' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                </button>

                <button
                  onClick={playPrevAyah}
                  className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Previous Verse"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 hover:from-emerald-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={playNextAyah}
                  className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Next Verse"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={cycleSpeed}
                  className="px-1.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex items-center gap-1"
                  title="Playback Speed"
                >
                  <Gauge className="w-3 h-3 text-emerald-600" />
                  <span>{playbackSpeed}x</span>
                </button>
              </div>

              {/* Right: Expand on Mobile or Reciter on Desktop */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMobileExpanded(true)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 md:hidden"
                  title="Expand Player"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

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
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                  title="Change Reciter"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[100px] truncate">{reciter.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
