import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onLoaded?.();
            setTimeout(() => setShouldRender(false), 700);
          }, 300);
          return 100;
        }
        // Smooth progressive increment
        const increment = Math.floor(Math.random() * 20) + 15;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-[#073629] to-[#042018] text-white transition-all duration-700 select-none ${
        isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Islamic Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        
        {/* Animated Medallion with Quran Icon */}
        <div className="relative mb-6">
          {/* Pulsing ring */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/30 to-emerald-400/30 blur-md animate-pulse" />
          
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 border border-amber-300/40 shadow-2xl flex items-center justify-center transform hover:rotate-3 transition-transform">
            <BookOpen className="w-10 h-10 text-amber-300" />
            <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Bismillah Calligraphy */}
        <h2 className="font-arabic text-3xl sm:text-4xl text-emerald-200 font-bold mb-3 tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h2>

        {/* App Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
          Al-Qur'an Al-Kareem
        </h1>
        <p className="text-xs text-emerald-300/80 uppercase tracking-widest font-medium mb-8">
          The Noble Quran • Recitations & Translations
        </p>

        {/* Smooth Progress Bar */}
        <div className="w-64 sm:w-72 bg-emerald-950/80 border border-emerald-700/40 h-2 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-64 sm:w-72 mt-2 text-[11px] text-emerald-300/70 font-mono">
          <span>Loading verses...</span>
          <span>{progress}%</span>
        </div>

      </div>

      {/* Footer quote */}
      <div className="absolute bottom-6 text-[11px] text-emerald-200/50 text-center px-4 italic">
        "This is the Book about which there is no doubt, a guidance for those conscious of Allah." (2:2)
      </div>
    </div>
  );
};
