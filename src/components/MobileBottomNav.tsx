import React from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  BookOpen, 
  SunMedium, 
  Clock, 
  CircleDot, 
  Bookmark as BookmarkIcon 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, bookmarks } = useQuran();

  const navItems = [
    {
      id: 'surahs' as const,
      label: 'Quran',
      icon: BookOpen,
      isActive: currentTab === 'surahs' || currentTab === 'surah-detail' || currentTab === 'juz',
    },
    {
      id: 'adhkar' as const,
      label: 'Adhkar',
      icon: SunMedium,
      isActive: currentTab === 'adhkar',
    },
    {
      id: 'prayer-times' as const,
      label: 'Prayers',
      icon: Clock,
      isActive: currentTab === 'prayer-times',
    },
    {
      id: 'tasbih' as const,
      label: 'Tasbih',
      icon: CircleDot,
      isActive: currentTab === 'tasbih',
    },
    {
      id: 'bookmarks' as const,
      label: 'Saved',
      icon: BookmarkIcon,
      isActive: currentTab === 'bookmarks',
      badge: bookmarks.length > 0 ? bookmarks.length : null,
    },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(15);
                setCurrentTab(item.id);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-all duration-200 select-none ${
                item.isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-extrabold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${item.isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {item.isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
