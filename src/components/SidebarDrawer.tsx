import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  X, 
  BookOpen, 
  Layers, 
  SunMedium, 
  Clock, 
  CircleDot, 
  Bookmark, 
  Download, 
  QrCode, 
  Sliders, 
  Star, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  ChevronRight,
  Search
} from 'lucide-react';

export const SidebarDrawer: React.FC = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    currentTab,
    setCurrentTab,
    bookmarks,
    reciter,
    isDarkMode,
    toggleTheme,
    setIsSearchOpen,
    setIsSettingsOpen,
    setIsQRCodeOpen,
    setIsInstallModalOpen,
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

  const handleNavigate = (tab: any) => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setCurrentTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Darkened Backdrop Overlay */}
      <div 
        className={`fixed sm:absolute inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Slide-out Sidebar Panel */}
      <aside
        className={`fixed sm:absolute top-0 bottom-0 left-0 z-50 w-72 sm:w-80 max-w-[85%] bg-white dark:bg-[#0c1622] text-slate-800 dark:text-slate-100 shadow-2xl border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-transform duration-300 ease-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-r from-emerald-900/10 via-transparent to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <BookOpen className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base text-emerald-950 dark:text-emerald-400 tracking-tight">
                  Al-Qur'an
                </span>
                <span className="font-arabic font-bold text-base text-emerald-700 dark:text-emerald-300">
                  القرآن
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                The Noble Quran & Adhkar
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 text-xs font-medium scrollbar-none">
          
          {/* Section 1: Quran & Reading */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Holy Quran
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNavigate('surahs')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'surahs' || currentTab === 'surah-detail'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Surahs (114)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => handleNavigate('juz')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'juz'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4" />
                  <span>Juz Index (30)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => handleNavigate('bookmarks')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'bookmarks'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4" />
                  <span>Saved & Bookmarks</span>
                </div>
                {bookmarks.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Section 2: Daily Worship & Remembrance */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Daily Worship
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNavigate('adhkar')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'adhkar'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <SunMedium className="w-4 h-4 text-amber-500" />
                  <span>Morning & Evening Adhkar</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => handleNavigate('prayer-times')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'prayer-times'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span>Prayer Times & Qibla</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => handleNavigate('tasbih')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'tasbih'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CircleDot className="w-4 h-4 text-emerald-500" />
                  <span>Digital Tasbih Counter</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* Section 3: Tools & Modals */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tools & Offline
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsInstallModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all text-amber-800 dark:text-amber-300 font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-amber-500" />
                  <span>Download App & Offline Pack</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Offline
                </span>
              </button>

              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsQRCodeOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-4 h-4 text-slate-500" />
                  <span>Expo Go & Phone QR</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Search Quran (⌘K)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4 text-slate-500" />
                  <span>Audio & Display Settings</span>
                </div>
                <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                  {reciter.name.split(' ')[0]}
                </span>
              </button>
            </div>
          </div>

          {/* Section 4: Author & Dedication */}
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Creator & Dedication
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNavigate('author')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all ${
                  currentTab === 'author'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/author.jpg"
                    alt="Abu Lawizat"
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500 shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span>About Author (Abu Lawizat)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <a
                href="https://github.com/abulawiz/quran-app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span>Star on GitHub</span>
                </div>
                <span className="text-[10px] text-slate-400">@abulawiz</span>
              </a>
            </div>
          </div>

        </div>

        {/* Drawer Bottom Footer */}
        <div className="p-3.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all font-semibold"
          >
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-700" />
              )}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <span className="text-[10px] text-slate-400">Toggle</span>
          </button>

          {/* Network & Version Pill */}
          <div className="flex items-center justify-between px-1 text-[10px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 font-medium">
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span>100% Offline Ready</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-500" />
                  <span>Offline Mode Active</span>
                </>
              )}
            </div>
            <span className="font-mono">v2.5.0 PWA</span>
          </div>

        </div>

      </aside>
    </>
  );
};
