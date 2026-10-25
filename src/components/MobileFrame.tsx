import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Lock, 
  Download, 
  Smartphone, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { isMobileLocked, setIsMobileLocked, setIsInstallModalOpen } = useQuran();
  const [timeStr, setTimeStr] = useState<string>('');
  const [isNativeMobile, setIsNativeMobile] = useState<boolean>(false);

  useEffect(() => {
    // Update live clock
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);

    // Check if running on real mobile device or standalone PWA
    const checkNativeMobile = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isSmallScreen = window.innerWidth < 640;
      setIsNativeMobile(isStandalone || isSmallScreen);
    };

    checkNativeMobile();
    window.addEventListener('resize', checkNativeMobile);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkNativeMobile);
    };
  }, []);

  // If running on a physical mobile device or standalone PWA, render directly without the simulated desktop phone frame
  if (isNativeMobile || !isMobileLocked) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#0a1118] text-slate-800 dark:text-slate-100 max-w-lg mx-auto relative shadow-2xl">
        {!isNativeMobile && (
          <div className="sticky top-0 z-50 bg-emerald-950 text-white text-[11px] py-1 px-3 flex items-center justify-between border-b border-emerald-800/40">
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Mobile View</span>
            </span>
            <button
              onClick={() => setIsMobileLocked(true)}
              className="flex items-center gap-1 text-emerald-300 hover:text-white font-semibold"
            >
              <Minimize2 className="w-3 h-3" />
              <span>Lock in Phone Frame</span>
            </button>
          </div>
        )}
        {children}
      </div>
    );
  }

  // Desktop / Tablet View: Locked inside a gorgeous, ultra-realistic smartphone interface!
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-[#071d18] to-[#04120e] flex flex-col items-center justify-start sm:py-6 px-2 overflow-x-hidden select-none">
      
      {/* Top Desktop Helper & Control Bar */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between gap-2 px-2 text-white">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>Mobile Interface (Locked)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md transition-all shadow-sm"
            title="Download & Install App"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            onClick={() => setIsMobileLocked(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white backdrop-blur-md transition-all"
            title="Toggle Full Width View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Realistic Mobile Smartphone Chassis */}
      <div className="relative w-full max-w-[420px] h-[880px] max-h-[92vh] bg-slate-900 rounded-[52px] p-[10px] shadow-[0_25px_80px_rgba(0,0,0,0.7)] border-4 border-slate-700/60 ring-1 ring-white/10 flex flex-col">
        
        {/* Hardware Side Button Accents */}
        <div className="absolute -left-[14px] top-28 w-[4px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[14px] top-44 w-[4px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -right-[14px] top-36 w-[4px] h-16 bg-slate-700 rounded-r-sm" />

        {/* Mobile Screen Container */}
        <div className="relative w-full h-full bg-slate-50 dark:bg-[#0a1118] text-slate-800 dark:text-slate-100 rounded-[42px] overflow-hidden flex flex-col shadow-inner">
          
          {/* Native Mobile Status Bar */}
          <div className="h-10 bg-white/95 dark:bg-[#0c1622]/95 backdrop-blur-md px-6 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100 shrink-0 z-40 select-none">
            {/* Clock */}
            <span className="font-mono tracking-tight text-[11px] font-bold">
              {timeStr || '09:41'}
            </span>

            {/* Dynamic Island / Speaker Pill */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
            </div>

            {/* Status Icons: Cellular, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <Signal className="w-3 h-3 fill-current" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-mono font-bold">98%</span>
                <Battery className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Mobile Screen Viewport (Scrollable with hidden scrollbar) */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-none flex flex-col">
            {children}
          </div>

          {/* iOS / Android Home Swipe Indicator Bar */}
          <div className="h-4 bg-white/95 dark:bg-[#0c1622]/95 flex items-center justify-center shrink-0 z-40">
            <div className="w-28 h-1 rounded-full bg-slate-400/50 dark:bg-slate-600/60" />
          </div>

        </div>

      </div>

    </div>
  );
};
