import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  BookOpen, 
  Layers, 
  Bookmark as BookmarkIcon, 
  CircleDot, 
  Search, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Headphones,
  QrCode,
  SunMedium,
  Clock,
  User,
  Wifi,
  WifiOff
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    bookmarks,
    reciter,
    isDarkMode,
    toggleTheme,
    setIsSearchOpen,
    setIsSettingsOpen,
    setIsQRCodeOpen,
  } = useQuran();

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0d1620]/95 backdrop-blur-md border-b border-emerald-900/10 dark:border-emerald-500/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentTab('surahs')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-emerald-950 dark:text-emerald-400 tracking-tight">
                  Al-Qur'an
                </span>
                <span className="font-arabic font-bold text-lg text-emerald-700 dark:text-emerald-300">
                  القرآن الكريم
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                The Noble Quran • Recitation & Adhkar
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl">
            <button
              onClick={() => setCurrentTab('surahs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'surahs' || currentTab === 'surah-detail'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Surahs
            </button>

            <button
              onClick={() => setCurrentTab('juz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'juz'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Juz
            </button>

            <button
              onClick={() => setCurrentTab('adhkar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'adhkar'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              Adhkar
            </button>

            <button
              onClick={() => setCurrentTab('prayer-times')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'prayer-times'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Prayers
            </button>

            <button
              onClick={() => setCurrentTab('tasbih')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'tasbih'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              Tasbih
            </button>

            <button
              onClick={() => setCurrentTab('bookmarks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'bookmarks'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <BookmarkIcon className="w-3.5 h-3.5" />
              Saved
              {bookmarks.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {bookmarks.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('author')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'author'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Author
            </button>
          </nav>

          {/* Quick Actions Toolbar */}
          <div className="flex items-center gap-2">
            {/* Offline Status Badge */}
            {!isOnline ? (
              <div 
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold animate-pulse"
                title="Application running in offline PWA cache mode"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Offline</span>
              </div>
            ) : (
              <div 
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                title="PWA Service Worker active: Full offline caching enabled"
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Offline Ready</span>
              </div>
            )}

            {/* Author Button (Quick Access) */}
            <button
              onClick={() => setCurrentTab('author')}
              className={`p-2 rounded-2xl transition-all ${
                currentTab === 'author'
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="About Author (Abu Lawizat)"
            >
              <User className="w-4 h-4" />
            </button>
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
              title="Search Quran (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Reciter Pill */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium hover:bg-emerald-100 transition-colors"
              title="Change Reciter"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span className="max-w-[90px] truncate">{reciter.name.split(' ')[0]}</span>
            </button>

            {/* Mobile / Expo Go QR Hub Trigger */}
            <button
              onClick={() => setIsQRCodeOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-sm"
              title="Scan or generate QR Code for Expo Go / Phone"
            >
              <QrCode className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline font-semibold">Expo / QR</span>
            </button>

            {/* Prominent Dark / Light Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all group shadow-sm"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <div className="flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span className="text-[11px] font-semibold hidden xl:inline text-amber-300">Light</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-emerald-700 group-hover:-rotate-12 transition-transform" />
                  <span className="text-[11px] font-semibold hidden xl:inline text-emerald-800">Dark</span>
                </div>
              )}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
