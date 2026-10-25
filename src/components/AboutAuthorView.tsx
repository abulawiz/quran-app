import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Share2, 
  Check, 
  ExternalLink, 
  Wifi, 
  WifiOff, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Award,
  BookOpen,
  Star
} from 'lucide-react';

export const AboutAuthorView: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cacheSizeInfo, setCacheSizeInfo] = useState<string>('Cached for offline use');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check Cache Storage status
    if ('caches' in window) {
      caches.keys().then((keys) => {
        setCacheSizeInfo(`${keys.length} offline cache storages active`);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleShareApp = () => {
    const shareData = {
      title: "Al-Qur'an Al-Kareem (القرآن الكريم)",
      text: "Read, listen, and reflect upon the Holy Quran with synchronized recitations, translations, and morning/evening Adhkar.",
      url: window.location.origin,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-36 px-1 sm:px-0">
      
      {/* Author Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-[#032e22] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/30 text-center sm:text-left">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Author Portrait Photo */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-300 shadow-2xl ring-4 ring-emerald-500/30">
              <img
                src="/author.jpg"
                alt="Abu Lawizat (@abulawiz)"
                className="w-full h-full object-cover rounded-full shadow-inner bg-[#063024]"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-[#032e22] shadow-lg" title="Verified Creator">
              <Check className="w-4 h-4 stroke-[3px]" />
            </div>
          </div>

          {/* Bio Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Creator & Developer</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Abu Lawizat
            </h1>
            <p className="text-xs sm:text-sm font-mono text-emerald-300/90 mt-0.5">
              @abulawiz • Fullstack & Digital Solutions Engineer
            </p>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mt-3">
              Passionate about building elegant, high-performance, and privacy-first Islamic digital applications designed to serve Muslims across the globe.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-4">
              <a
                href="https://github.com/abulawiz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://github.com/abulawiz/quran-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold transition-all shadow"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>Star on GitHub</span>
              </a>

              <button
                onClick={handleShareApp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow"
              >
                <Share2 className="w-4 h-4" />
                <span>{isCopied ? 'Link Copied!' : 'Share App'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sadaqah Jariyah Dedication Card */}
      <div className="rounded-3xl border border-emerald-500/30 p-6 bg-gradient-to-r from-emerald-50/50 via-white to-amber-50/30 dark:from-[#0d1c18] dark:via-[#0f1924] dark:to-[#171c14] shadow-md text-center space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto">
          <Heart className="w-5 h-5 fill-current text-rose-500" />
        </div>
        <h3 className="font-arabic text-2xl font-bold text-emerald-900 dark:text-emerald-300">
          صَدَقَةٌ جَارِيَةٌ
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
          This application is prepared as a continuous charity (Sadaqah Jariyah). Dedicated in humble prayer for our parents, families, teachers, and the global Muslim Ummah. May Allah accept this work, forgive our shortcomings, and place it upon our scale of good deeds.
        </p>
        <p className="text-[11px] text-slate-400 italic font-arabic text-base">
          "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ"
        </p>
      </div>

      {/* Offline Status & PWA Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
            isOnline ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
          }`}>
            {isOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                {isOnline ? 'Network Connected (Online)' : 'Offline Mode Active'}
              </h4>
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {cacheSizeInfo} • All cached Surahs, translations, and Adhkar work without internet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
            PWA Enabled ✓
          </span>
        </div>
      </div>

      {/* Highlights & Architecture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Zero Ads & Zero Tracking
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Free forever, no commercial advertisements, no analytics tracking, and no paid walls. Respecting the sacred sanctity of the Holy Quran.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Installable Mobile App
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Can be added to your phone's home screen via browser ("Add to Home Screen" or Expo Go QR) for an instant fullscreen mobile app.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Medina Mushaf Script
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            High-fidelity Arabic typography with Amiri and Scheherazade New typefaces, multi-edition translations, and Tafseer commentary.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1924] border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Daily Fortress & Audio
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Morning and evening Adhkar with interactive counters, scheduled push alerts, and verse-by-verse continuous audio player.
          </p>
        </div>

      </div>

    </div>
  );
};
