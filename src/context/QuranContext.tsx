import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { SurahMeta, Reciter, Bookmark, ReadingSettings, Ayah, NavigationTab } from '../types/quran';
import { RECITERS_LIST } from '../data/reciters';
import { SURAHS_LIST } from '../data/surahs';
import { getAyahAudioUrl } from '../services/quranApi';

export interface AdhkarReminders {
  morningEnabled: boolean;
  morningTime: string;
  eveningEnabled: boolean;
  eveningTime: string;
}

export const playChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.2); // A5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {}
};

interface QuranContextType {
  // Navigation & View
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedSurahNumber: number;
  setSelectedSurahNumber: (num: number) => void;
  openSurah: (surahNumber: number, targetAyahNumber?: number) => void;
  targetAyahScroll: number | null;
  clearTargetAyahScroll: () => void;

  // Audio Playback
  isPlaying: boolean;
  activePlayingSurah: number | null;
  activePlayingAyah: number | null;
  currentTime: number;
  duration: number;
  reciter: Reciter;
  setReciter: (reciter: Reciter) => void;
  playAyah: (surahNumber: number, ayahNumberInSurah: number, directAudioUrl?: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  togglePlay: () => void;
  playNextAyah: () => void;
  playPrevAyah: () => void;
  seekAudio: (seconds: number) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  repeatMode: 'none' | 'ayah' | 'surah';
  setRepeatMode: (mode: 'none' | 'ayah' | 'surah') => void;

  // Bookmarks & Last Read
  bookmarks: Bookmark[];
  toggleBookmark: (ayah: Ayah, surah: SurahMeta) => void;
  isBookmarked: (surahNumber: number, ayahNumberInSurah: number) => boolean;
  lastRead: { surahNumber: number; ayahNumber: number; surahName: string; timestamp: number } | null;
  saveLastRead: (surahNumber: number, ayahNumber: number) => void;

  // Settings & Theme
  settings: ReadingSettings;
  updateSettings: (newSettings: Partial<ReadingSettings>) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;

  // Adhkar Reminders
  adhkarReminders: AdhkarReminders;
  updateAdhkarReminders: (newReminders: Partial<AdhkarReminders>) => void;
  sendTestAdhkarNotification: (type?: 'morning' | 'evening') => void;

  // Modals & PWA
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isQRCodeOpen: boolean;
  setIsQRCodeOpen: (open: boolean) => void;
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;
  installPWA: () => void;
  canInstallPWA: boolean;
  isMobileLocked: boolean;
  setIsMobileLocked: (locked: boolean) => void;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  arabicFontSize: 28,
  translationFontSize: 16,
  fontFamily: 'amiri',
  showTranslation: true,
  showTransliteration: true,
  selectedTranslation: 'en.sahih',
  autoScrollToPlayingAyah: true,
  theme: 'light',
  playbackSpeed: 1.0,
  repeatMode: 'none',
};

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('surahs');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [targetAyahScroll, setTargetAyahScroll] = useState<number | null>(null);

  // Adhkar Reminders
  const [adhkarReminders, setAdhkarReminders] = useState<AdhkarReminders>(() => {
    try {
      const saved = localStorage.getItem('quran_adhkar_reminders');
      return saved ? JSON.parse(saved) : {
        morningEnabled: true,
        morningTime: '06:30',
        eveningEnabled: true,
        eveningTime: '17:30',
      };
    } catch {
      return {
        morningEnabled: true,
        morningTime: '06:30',
        eveningEnabled: true,
        eveningTime: '17:30',
      };
    }
  });

  const updateAdhkarReminders = (newReminders: Partial<AdhkarReminders>) => {
    setAdhkarReminders((prev) => {
      const updated = { ...prev, ...newReminders };
      try {
        localStorage.setItem('quran_adhkar_reminders', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (('Notification' in window) && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  const sendTestAdhkarNotification = (type: 'morning' | 'evening' = 'morning') => {
    playChime();
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const title = type === 'morning' ? '🌅 Morning Adhkar Reminder (أذكار الصباح)' : '🌇 Evening Adhkar Reminder (أذكار المساء)';
        const body = type === 'morning'
          ? "Start your day in the protection and remembrance of Allah. Tap to recite morning adhkar."
          : "Seek peace and divine protection for your evening. Tap to recite evening adhkar.";
        new Notification(title, {
          body,
          icon: '/quran-icon.svg',
          badge: '/quran-icon.svg',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            sendTestAdhkarNotification(type);
          }
        });
      }
    }
  };

  // Background reminder scheduler
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const lastFiredKey = `adhkar_last_fired_${now.toDateString()}`;
      const lastFired = localStorage.getItem(lastFiredKey) || '';

      if (adhkarReminders.morningEnabled && adhkarReminders.morningTime === currentTimeStr && !lastFired.includes('morning')) {
        sendTestAdhkarNotification('morning');
        localStorage.setItem(lastFiredKey, `${lastFired};morning`);
      }

      if (adhkarReminders.eveningEnabled && adhkarReminders.eveningTime === currentTimeStr && !lastFired.includes('evening')) {
        sendTestAdhkarNotification('evening');
        localStorage.setItem(lastFiredKey, `${lastFired};evening`);
      }
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [adhkarReminders]);

  const [settings, setSettings] = useState<ReadingSettings>(() => {
    try {
      const saved = localStorage.getItem('quran_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const isDarkMode = settings.theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-parchment', 'theme-emerald');
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'parchment') {
      root.classList.add('theme-parchment');
    } else {
      // Light theme default
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('quran_settings', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const toggleTheme = () => {
    updateSettings({
      theme: settings.theme === 'dark' ? 'light' : 'dark'
    });
  };

  const [reciter, setReciterState] = useState<Reciter>(() => {
    try {
      const saved = localStorage.getItem('quran_reciter');
      if (saved) {
        const found = RECITERS_LIST.find((r) => r.id === saved);
        if (found) return found;
      }
    } catch {}
    return RECITERS_LIST[0];
  });

  const setReciter = (newReciter: Reciter) => {
    setReciterState(newReciter);
    try {
      localStorage.setItem('quran_reciter', newReciter.id);
    } catch {}
    if (activePlayingSurah && activePlayingAyah) {
      const surahMeta = SURAHS_LIST.find((s) => s.number === activePlayingSurah);
      if (surahMeta) {
        playAyah(activePlayingSurah, activePlayingAyah);
      }
    }
  };

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (ayah: Ayah, surah: SurahMeta) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.surahNumber === surah.number && b.ayahNumber === ayah.numberInSurah);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => !(b.surahNumber === surah.number && b.ayahNumber === ayah.numberInSurah));
      } else {
        const newBm: Bookmark = {
          id: `${surah.number}_${ayah.numberInSurah}_${Date.now()}`,
          surahNumber: surah.number,
          ayahNumber: ayah.numberInSurah,
          surahName: surah.name,
          surahEnglishName: surah.englishName,
          ayahText: ayah.text,
          translationText: ayah.translation || '',
          createdAt: Date.now()
        };
        updated = [newBm, ...prev];
      }
      try {
        localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const isBookmarked = (surahNumber: number, ayahNumberInSurah: number) => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumberInSurah);
  };

  const [lastRead, setLastRead] = useState<{ surahNumber: number; ayahNumber: number; surahName: string; timestamp: number } | null>(() => {
    try {
      const saved = localStorage.getItem('quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveLastRead = (surahNumber: number, ayahNumber: number) => {
    const surah = SURAHS_LIST.find((s) => s.number === surahNumber);
    const item = {
      surahNumber,
      ayahNumber,
      surahName: surah ? surah.englishName : `Surah ${surahNumber}`,
      timestamp: Date.now(),
    };
    setLastRead(item);
    try {
      localStorage.setItem('quran_last_read', JSON.stringify(item));
    } catch {}
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePlayingSurah, setActivePlayingSurah] = useState<number | null>(null);
  const [activePlayingAyah, setActivePlayingAyah] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState<'none' | 'ayah' | 'surah'>('none');
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(1.0);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPWA, setCanInstallPWA] = useState<boolean>(false);
  const [isMobileLocked, setIsMobileLocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('quran_mobile_locked');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleMobileLock = (locked: boolean) => {
    setIsMobileLocked(locked);
    try {
      localStorage.setItem('quran_mobile_locked', JSON.stringify(locked));
    } catch {}
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          setCanInstallPWA(false);
          setDeferredPrompt(null);
        }
      });
    } else {
      setIsInstallModalOpen(true);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const playAyah = (surahNumber: number, ayahNumberInSurah: number, directAudioUrl?: string) => {
    const surahMeta = SURAHS_LIST.find((s) => s.number === surahNumber);
    if (!surahMeta) return;

    let globalAyahNumber = 0;
    for (const s of SURAHS_LIST) {
      if (s.number < surahNumber) {
        globalAyahNumber += s.numberOfAyahs;
      } else {
        break;
      }
    }
    globalAyahNumber += ayahNumberInSurah;

    const url = directAudioUrl || getAyahAudioUrl(globalAyahNumber, reciter.apiIdentifier);

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setActivePlayingSurah(surahNumber);
          setActivePlayingAyah(ayahNumberInSurah);
          saveLastRead(surahNumber, ayahNumberInSurah);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    } else if (selectedSurahNumber) {
      playAyah(selectedSurahNumber, 1);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const playNextAyah = () => {
    if (!activePlayingSurah || !activePlayingAyah) {
      playAyah(selectedSurahNumber, 1);
      return;
    }

    const currentSurah = SURAHS_LIST.find((s) => s.number === activePlayingSurah);
    if (!currentSurah) return;

    if (activePlayingAyah < currentSurah.numberOfAyahs) {
      playAyah(activePlayingSurah, activePlayingAyah + 1);
    } else if (activePlayingSurah < 114) {
      playAyah(activePlayingSurah + 1, 1);
      setSelectedSurahNumber(activePlayingSurah + 1);
    } else {
      pauseAudio();
    }
  };

  const playPrevAyah = () => {
    if (!activePlayingSurah || !activePlayingAyah) return;

    if (activePlayingAyah > 1) {
      playAyah(activePlayingSurah, activePlayingAyah - 1);
    } else if (activePlayingSurah > 1) {
      const prevSurah = SURAHS_LIST.find((s) => s.number === activePlayingSurah - 1);
      if (prevSurah) {
        playAyah(activePlayingSurah - 1, prevSurah.numberOfAyahs);
        setSelectedSurahNumber(activePlayingSurah - 1);
      }
    }
  };

  const seekAudio = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === 'ayah') {
        if (activePlayingSurah && activePlayingAyah) {
          playAyah(activePlayingSurah, activePlayingAyah);
        }
      } else {
        playNextAyah();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, activePlayingSurah, activePlayingAyah, reciter]);

  const openSurah = (surahNumber: number, targetAyahNumber?: number) => {
    setSelectedSurahNumber(surahNumber);
    if (targetAyahNumber) {
      setTargetAyahScroll(targetAyahNumber);
    }
    setCurrentTab('surah-detail');
  };

  const clearTargetAyahScroll = () => {
    setTargetAyahScroll(null);
  };

  return (
    <QuranContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedSurahNumber,
        setSelectedSurahNumber,
        openSurah,
        targetAyahScroll,
        clearTargetAyahScroll,

        isPlaying,
        activePlayingSurah,
        activePlayingAyah,
        currentTime,
        duration,
        reciter,
        setReciter,
        playAyah,
        pauseAudio,
        resumeAudio,
        togglePlay,
        playNextAyah,
        playPrevAyah,
        seekAudio,
        playbackSpeed,
        setPlaybackSpeed,
        repeatMode,
        setRepeatMode,

        bookmarks,
        toggleBookmark,
        isBookmarked,
        lastRead,
        saveLastRead,

        settings,
        updateSettings,
        toggleTheme,
        isDarkMode,

        adhkarReminders,
        updateAdhkarReminders,
        sendTestAdhkarNotification,

        isSidebarOpen,
        setIsSidebarOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isQRCodeOpen,
        setIsQRCodeOpen,
        isInstallModalOpen,
        setIsInstallModalOpen,
        installPWA,
        canInstallPWA,
        isMobileLocked,
        setIsMobileLocked: toggleMobileLock,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = (): QuranContextType => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
