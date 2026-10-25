import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  BookOpen, 
  Search, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Download, 
  Wifi, 
  WifiOff, 
  ArrowLeft,
  User,
  Menu
} from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    isDarkMode,
    toggleTheme,
    setIsSearchOpen,
    setIsSettingsOpen,
    setIsInstallModalOpen,
    setIsSidebarOpen,
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
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-3 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Sidebar Menu Button & Brand/Back */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
          </button>

          {currentTab === 'surah-detail' || currentTab === 'author' ? (
            <button
              onClick={() => setCurrentTab('surahs')}
              className="flex items-center gap-1 py-1 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>Back</span>
            </button>
          ) : (
            <div 
              onClick={() => setCurrentTab('surahs')}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-1 leading-none">
                  <span className="font-bold text-xs sm:text-sm text-emerald-950 dark:text-emerald-400">
                    Al-Qur'an
                  </span>
                  <span className="font-arabic font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                    القرآن
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: Online / Offline Pill */}
        <div className="flex items-center">
          {!isOnline ? (
            <div 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[10px] font-semibold animate-pulse"
              title="Running in offline mode"
            >
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </div>
          ) : (
            <div 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium"
              title="100% Offline Ready"
            >
              <Wifi className="w-3 h-3" />
              <span>Offline Ready</span>
            </div>
          )}
        </div>

        {/* Right: Actions (Download App, Search, Theme, Settings) */}
        <div className="flex items-center gap-1">
          {/* Download / Install App Button */}
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="p-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 transition-all active:scale-95"
            title="Download & Install Mobile App for Offline Use"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title="Search Quran"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-700" />
            )}
          </button>

          {/* Author Profile */}
          <button
            onClick={() => setCurrentTab('author')}
            className={`p-1.5 rounded-xl transition-all active:scale-95 ${
              currentTab === 'author'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="About Author"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
